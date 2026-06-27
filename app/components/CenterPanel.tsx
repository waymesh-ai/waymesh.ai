'use client';

import WelcomeState from './WelcomeState';
import ConversationState from './ConversationState';
import InputBar from './InputBar';
import type { Message } from '../types';

const ACCENT = '#D4A853';

interface Props {
  view: 'welcome' | 'conversation';
  messages: Message[];
  isStreaming: boolean;
  activeDomains: string[];
  conversationTitle: string;
  onSend: (text: string) => void;
  onNewChat: () => void;
  onExport: () => void;
}

export default function CenterPanel({
  view,
  messages,
  isStreaming,
  activeDomains,
  conversationTitle,
  onSend,
  onNewChat,
  onExport,
}: Props) {
  const isConv = view === 'conversation';

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, background: '#fafaf7' }}>
      <header style={{
        height: 52, minHeight: 52,
        borderBottom: '1px solid rgba(21,20,15,.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px',
        background: 'rgba(250,250,247,.92)', backdropFilter: 'blur(8px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {!isConv && (
            <span style={{ fontSize: 14, fontWeight: 500, color: '#5c5b52' }}>Waymesh Copilot</span>
          )}
          {isConv && (
            <span style={{
              fontSize: 14, fontWeight: 600, color: '#15140f',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 400,
            }}>
              {conversationTitle || 'Conversation'}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isConv && (
            <button
              onClick={onExport}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 500, color: '#6a695f',
                padding: '6px 12px', borderRadius: 8,
                border: '1px solid rgba(21,20,15,.12)', background: '#fff', cursor: 'pointer',
                fontFamily: 'var(--font-hanken), sans-serif',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M8 2v8M4 6l4-4 4 4" />
                <path d="M2 13h12" strokeLinecap="round" />
              </svg>
              Export
            </button>
          )}
          <button
            onClick={onNewChat}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 600, color: '#15140f',
              padding: '6px 14px', borderRadius: 8,
              background: ACCENT, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-hanken), sans-serif',
            }}
          >+ New chat</button>
        </div>
      </header>

      {!isConv ? (
        <WelcomeState onSend={onSend} />
      ) : (
        <ConversationState
          messages={messages}
          isStreaming={isStreaming}
          activeDomains={activeDomains}
        />
      )}

      <InputBar onSend={onSend} isLoading={isStreaming} />
    </main>
  );
}
