'use client';

import type { Conversation } from '../types';

const ACCENT = '#D4A853';

interface Props {
  view: 'welcome' | 'conversation';
  activeConvId: string | null;
  todayConvs: Conversation[];
  yesterdayConvs: Conversation[];
  weekConvs: Conversation[];
  onNewChat: () => void;
  onSelectConv: (id: string) => void;
}

export default function LeftSidebar({
  view,
  activeConvId,
  todayConvs,
  yesterdayConvs,
  weekConvs,
  onNewChat,
  onSelectConv,
}: Props) {
  const chatBtnStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 8, width: '100%',
    padding: '8px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
    fontSize: 13, fontFamily: 'var(--font-hanken), sans-serif',
    background: active ? 'rgba(21,20,15,.08)' : 'none',
    color: active ? '#15140f' : '#4a4942',
    fontWeight: active ? 500 : 400,
  });

  const groupLabelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, letterSpacing: '.08em',
    textTransform: 'uppercase', color: '#9c9a90', padding: '10px 8px 6px',
  };

  const hasAny = todayConvs.length + yesterdayConvs.length + weekConvs.length > 0;

  return (
    <aside style={{
      width: 248, minWidth: 248, display: 'flex', flexDirection: 'column',
      height: '100%', background: '#efede6', borderRight: '1px solid rgba(21,20,15,.09)',
    }}>
      <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(21,20,15,.08)', cursor: 'pointer' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px',
          borderRadius: 9, background: 'rgba(21,20,15,.05)',
        }}>
          <span style={{
            display: 'inline-block', width: 11, height: 11,
            border: `2px solid ${ACCENT}`, transform: 'rotate(45deg)', flexShrink: 0,
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-sora), sans-serif', fontWeight: 700, fontSize: 14,
              letterSpacing: '-.01em', color: '#15140f',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>Adriana Travel Co</div>
            <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, color: '#9c9a90', marginTop: 1 }}>
              Boutique Agency
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#9c9a90" strokeWidth="1.5" style={{ flexShrink: 0 }}>
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </div>

      <div style={{ padding: '14px 16px 10px' }}>
        <button
          onClick={onNewChat}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, width: '100%',
            padding: '9px 13px', borderRadius: 9, border: '1px solid rgba(21,20,15,.14)',
            background: '#faf9f6', cursor: 'pointer', fontSize: 13.5, fontWeight: 500,
            color: '#15140f', fontFamily: 'var(--font-hanken), sans-serif',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#15140f" strokeWidth="1.5" strokeLinecap="round">
            <path d="M8 3v10M3 8h10" />
          </svg>
          New Chat
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 10px 10px' }}>
        {!hasAny && (
          <div style={{
            padding: '24px 8px', textAlign: 'center',
            fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10.5,
            color: '#b4b3a9', lineHeight: 1.6,
          }}>
            No chats yet.<br />Start a conversation below.
          </div>
        )}

        {todayConvs.length > 0 && (
          <>
            <div style={groupLabelStyle}>Today</div>
            {todayConvs.map(conv => {
              const active = conv.id === activeConvId;
              return (
                <button key={conv.id} onClick={() => onSelectConv(conv.id)} style={chatBtnStyle(active)}>
                  <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {conv.title}
                  </span>
                  {active && (
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </>
        )}

        {yesterdayConvs.length > 0 && (
          <>
            <div style={groupLabelStyle}>Yesterday</div>
            {yesterdayConvs.map(conv => {
              const active = conv.id === activeConvId;
              return (
                <button key={conv.id} onClick={() => onSelectConv(conv.id)} style={chatBtnStyle(active)}>
                  <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {conv.title}
                  </span>
                  {active && (
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </>
        )}

        {weekConvs.length > 0 && (
          <>
            <div style={groupLabelStyle}>This week</div>
            {weekConvs.map(conv => {
              const active = conv.id === activeConvId;
              return (
                <button key={conv.id} onClick={() => onSelectConv(conv.id)} style={chatBtnStyle(active)}>
                  <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {conv.title}
                  </span>
                  {active && (
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </>
        )}
      </div>

      <div style={{ borderTop: '1px solid rgba(21,20,15,.08)', padding: '8px 12px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 9, padding: '7px 10px',
          cursor: 'pointer', borderRadius: 8,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%', background: '#e0ddd6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600, color: '#5c5b52', flexShrink: 0,
          }}>SL</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#34332c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Sofía López
            </div>
            <div style={{ fontSize: 11, color: '#9c9a90' }}>Travel Designer</div>
          </div>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#b4b3a9" strokeWidth="1.3" strokeLinecap="round">
            <circle cx="8" cy="8" r="1.8" />
            <path d="M8 1.5v1.2M8 13.3v1.2M1.5 8h1.2M13.3 8h1.2M3.4 3.4l.85.85M11.75 11.75l.85.85M3.4 12.6l.85-.85M11.75 4.25l.85-.85" />
          </svg>
        </div>
      </div>
    </aside>
  );
}
