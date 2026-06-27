'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import LeftSidebar from './components/LeftSidebar';
import CenterPanel from './components/CenterPanel';
import RightSidebar from './components/RightSidebar';
import type { Message, Conversation } from './types';

const STORAGE_KEY = 'waymesh_conversations';

export function detectDomains(text: string): string[] {
  const t = text.toLowerCase();
  const active: string[] = [];
  if (/supplier|hotel|resort|villa|property|accommodation|lodge|retreat/.test(t)) active.push('supplier');
  if (/destination|city|country|region|coast|island|amalfi|italy|sicily|rome|positano|ravello|capri|tuscany|morocco|greece|spain|france/.test(t)) active.push('destination');
  if (/\brate\b|contract|commission|agreement|allotment|net rate|pricing|markup|margin|terms/.test(t)) active.push('contract');
  if (/proposal|itinerary|quote|day \d|day-by-day|program|honeymoon|package|trip/.test(t)) active.push('proposal');
  if (/sop|document|policy|playbook|procedure|internal|agency knowledge|guideline/.test(t)) active.push('agency');
  if (/\bdmc\b|local expert|ground operator|partner network|regional contact|ground/.test(t)) active.push('partner');
  return active;
}

function groupConversations(conversations: Conversation[]) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today); weekAgo.setDate(weekAgo.getDate() - 7);

  return {
    todayItems: conversations.filter(c => c.createdAt >= today.getTime()),
    yesterdayItems: conversations.filter(c => c.createdAt >= yesterday.getTime() && c.createdAt < today.getTime()),
    weekItems: conversations.filter(c => c.createdAt >= weekAgo.getTime() && c.createdAt < yesterday.getTime()),
  };
}

export default function CopilotPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeDomains, setActiveDomains] = useState<string[]>([]);

  const activeConvIdRef = useRef<string | null>(null);
  useEffect(() => { activeConvIdRef.current = activeConvId; }, [activeConvId]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setConversations(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch { /* ignore */ }
  }, [conversations]);

  const activeConversation = conversations.find(c => c.id === activeConvId) ?? null;
  const view: 'welcome' | 'conversation' =
    activeConvId != null && (activeConversation?.messages.length ?? 0) > 0
      ? 'conversation'
      : 'welcome';

  const handleSend = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const existingApiMsgs: { role: 'user' | 'assistant'; content: string }[] = conversations
      .find(c => c.id === activeConvIdRef.current)
      ?.messages.map(m => ({ role: m.role, content: m.content })) ?? [];

    let convId = activeConvIdRef.current;
    if (!convId) {
      convId = `conv_${Date.now()}`;
      setConversations(prev => [
        { id: convId!, title: text.slice(0, 50), messages: [], createdAt: Date.now() },
        ...prev,
      ]);
      setActiveConvId(convId);
      activeConvIdRef.current = convId;
    }

    const userMsgId = `umsg_${Date.now()}`;
    const assistantMsgId = `amsg_${Date.now() + 1}`;

    const userMsg: Message = { id: userMsgId, role: 'user', content: text, timestamp: Date.now() };
    const assistantMsg: Message = { id: assistantMsgId, role: 'assistant', content: '', timestamp: Date.now() + 1 };

    setConversations(prev =>
      prev.map(c =>
        c.id === convId
          ? { ...c, messages: [...c.messages, userMsg, assistantMsg] }
          : c
      )
    );

    setIsStreaming(true);
    setActiveDomains([]);

    const apiMessages = [...existingApiMsgs, { role: 'user' as const, content: text }];

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`API error ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              fullText += parsed.text;
              const snapshot = fullText;
              setConversations(prev =>
                prev.map(c =>
                  c.id === convId
                    ? {
                        ...c,
                        messages: c.messages.map(m =>
                          m.id === assistantMsgId ? { ...m, content: snapshot } : m
                        ),
                      }
                    : c
                )
              );
            }
          } catch { /* skip malformed SSE line */ }
        }
      }

      setActiveDomains(detectDomains(fullText));
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setConversations(prev =>
        prev.map(c =>
          c.id === convId
            ? {
                ...c,
                messages: c.messages.map(m =>
                  m.id === assistantMsgId ? { ...m, content: `⚠️ ${errMsg}` } : m
                ),
              }
            : c
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }, [isStreaming, conversations]);

  const handleNewChat = useCallback(() => {
    setActiveConvId(null);
    setActiveDomains([]);
  }, []);

  const handleSelectConv = useCallback((id: string) => {
    setActiveConvId(id);
    const conv = conversations.find(c => c.id === id);
    if (conv) {
      const allAssistantText = conv.messages
        .filter(m => m.role === 'assistant')
        .map(m => m.content)
        .join(' ');
      setActiveDomains(detectDomains(allAssistantText));
    }
  }, [conversations]);

  const handleExport = useCallback(() => {
    if (!activeConversation || activeConversation.messages.length === 0) return;
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    const body = activeConversation.messages
      .map(m => `${m.role === 'user' ? 'You' : 'Waymesh Copilot'}:\n${m.content}`)
      .join('\n\n');
    const content = `WAYMESH COPILOT EXPORT\n${date}\n\n${body}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeConversation.title.replace(/[^a-z0-9 ]/gi, '').trim().replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [activeConversation]);

  const { todayItems, yesterdayItems, weekItems } = groupConversations(conversations);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#f7f6f2' }}>
      <LeftSidebar
        view={view}
        activeConvId={activeConvId}
        todayConvs={todayItems}
        yesterdayConvs={yesterdayItems}
        weekConvs={weekItems}
        onNewChat={handleNewChat}
        onSelectConv={handleSelectConv}
      />
      <CenterPanel
        view={view}
        messages={activeConversation?.messages ?? []}
        isStreaming={isStreaming}
        activeDomains={activeDomains}
        conversationTitle={activeConversation?.title ?? ''}
        onSend={handleSend}
        onNewChat={handleNewChat}
        onExport={handleExport}
      />
      <RightSidebar
        isConv={view === 'conversation'}
        activeDomains={activeDomains}
        isStreaming={isStreaming}
      />
    </div>
  );
}
