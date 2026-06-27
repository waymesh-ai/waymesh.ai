'use client';

import { useEffect, useRef } from 'react';
import type { Message } from '../types';

const ACCENT = '#D4A853';

function renderInline(text: string): React.ReactNode {
  const segments = text.split(/(\*\*[^*\n]+\*\*)/g);
  if (segments.length === 1) return text;
  return (
    <>
      {segments.map((seg, i) =>
        seg.startsWith('**') && seg.endsWith('**') && seg.length > 4
          ? <strong key={i} style={{ color: '#15140f', fontWeight: 700 }}>{seg.slice(2, -2)}</strong>
          : <span key={i}>{seg}</span>
      )}
    </>
  );
}

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const output: React.ReactNode[] = [];
  let listItems: { ordered: boolean; content: React.ReactNode }[] = [];
  let listOrdered = false;
  let keyCounter = 0;
  const k = () => keyCounter++;

  const flushList = () => {
    if (listItems.length === 0) return;
    const Tag = listOrdered ? 'ol' : 'ul';
    output.push(
      <Tag key={k()} style={{ margin: '6px 0 10px', paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {listItems.map((item, i) => (
          <li key={i} style={{ fontSize: 14, lineHeight: 1.55, color: '#34332c' }}>{item.content}</li>
        ))}
      </Tag>
    );
    listItems = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isUnordered = /^[-*•] (.*)/.exec(line);
    const isOrdered = /^\d+\. (.*)/.exec(line);
    const isH3 = line.startsWith('### ');
    const isH2 = line.startsWith('## ');
    const isH1 = line.startsWith('# ') && !line.startsWith('## ');
    const isHR = /^[-=]{3,}$/.test(line.trim());
    const isBlank = line.trim() === '';

    if (!isUnordered && !isOrdered) flushList();

    if (isH3) {
      output.push(
        <div key={k()} style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 700, fontSize: 14, color: '#15140f', margin: '14px 0 5px' }}>
          {renderInline(line.slice(4))}
        </div>
      );
    } else if (isH2) {
      output.push(
        <div key={k()} style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 700, fontSize: 15, color: '#15140f', margin: '18px 0 7px' }}>
          {renderInline(line.slice(3))}
        </div>
      );
    } else if (isH1) {
      output.push(
        <div key={k()} style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 800, fontSize: 17, color: '#15140f', margin: '20px 0 9px' }}>
          {renderInline(line.slice(2))}
        </div>
      );
    } else if (isHR) {
      output.push(<hr key={k()} style={{ border: 'none', borderTop: '1px solid rgba(21,20,15,.09)', margin: '10px 0' }} />);
    } else if (isUnordered) {
      listOrdered = false;
      listItems.push({ ordered: false, content: renderInline(isUnordered[1]) });
    } else if (isOrdered) {
      listOrdered = true;
      listItems.push({ ordered: true, content: renderInline(isOrdered[1]) });
    } else if (isBlank) {
      if (output.length > 0) output.push(<div key={k()} style={{ height: 6 }} />);
    } else {
      output.push(
        <p key={k()} style={{ fontSize: 14.5, lineHeight: 1.6, color: '#34332c', margin: '0 0 4px' }}>
          {renderInline(line)}
        </p>
      );
    }
  }

  flushList();
  return <div style={{ display: 'flex', flexDirection: 'column' }}>{output}</div>;
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 5, padding: '4px 0', alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <div
          key={i}
          style={{
            width: 7, height: 7, borderRadius: '50%', background: ACCENT,
            animation: `pulseAmber 1.4s ease-in-out ${i * 0.22}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function AIMessage({ msg, isLast, isStreaming, activeDomains }: {
  msg: Message;
  isLast: boolean;
  isStreaming: boolean;
  activeDomains: string[];
}) {
  const isThinking = msg.content === '' && isLast && isStreaming;
  const domainCount = activeDomains.length;
  const sourceCount = Math.max(domainCount, 1);
  const timeStr = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ display: 'flex', gap: 14, animation: 'msgIn .7s cubic-bezier(.2,.8,.2,1) both' }}>
      <div style={{
        width: 30, height: 30, minWidth: 30,
        border: `1.5px solid ${ACCENT}`, borderRadius: 6,
        transform: 'rotate(45deg)', marginTop: 4,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ transform: 'rotate(-45deg)', fontFamily: 'var(--font-sora), sans-serif', fontWeight: 700, fontSize: 10, color: '#a9781f' }}>W</div>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 700, fontSize: 14, color: '#15140f' }}>Waymesh</span>
          <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10.5, color: '#9c9a90' }}>{timeStr}</span>
          {domainCount > 0 && !isThinking && (
            <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10.5, color: ACCENT }}>
              · {sourceCount} source{sourceCount !== 1 ? 's' : ''} ↗
            </span>
          )}
        </div>

        {isThinking ? (
          <TypingDots />
        ) : (
          <div style={{
            borderLeft: `2px solid ${ACCENT}`, paddingLeft: 16,
          }}>
            {renderMarkdown(msg.content)}
          </div>
        )}

        {!isThinking && msg.content && (
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            {domainCount > 0 ? (
              <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10.5, color: '#9c9a90' }}>
                {domainCount} domain{domainCount !== 1 ? 's' : ''} active · {sourceCount} source{sourceCount !== 1 ? 's' : ''} cited
              </span>
            ) : (
              <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10.5, color: '#9c9a90' }}>
                Sourced from agency knowledge
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function UserMessage({ msg }: { msg: Message }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{
        maxWidth: '68%', background: '#f0ede4', border: '1px solid rgba(21,20,15,.09)',
        borderRadius: '18px 18px 4px 18px', padding: '14px 18px',
      }}>
        <p style={{ fontSize: 15, lineHeight: 1.5, color: '#15140f', margin: 0 }}>
          {msg.content}
        </p>
      </div>
    </div>
  );
}

interface Props {
  messages: Message[];
  isStreaming: boolean;
  activeDomains: string[];
}

export default function ConversationState({ messages, isStreaming, activeDomains }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px 8px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {messages.map((msg, idx) =>
        msg.role === 'user' ? (
          <UserMessage key={msg.id} msg={msg} />
        ) : (
          <AIMessage
            key={msg.id}
            msg={msg}
            isLast={idx === messages.length - 1}
            isStreaming={isStreaming}
            activeDomains={activeDomains}
          />
        )
      )}
      <div ref={bottomRef} />
    </div>
  );
}
