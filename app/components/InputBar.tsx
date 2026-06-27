'use client';

import { useState, useRef, useEffect } from 'react';

const ACCENT = '#D4A853';

interface Props {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export default function InputBar({ onSend, isLoading }: Props) {
  const [value, setValue] = useState('');
  const [toast, setToast] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  }, [value]);

  const handleSubmit = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const chipStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    fontSize: 12.5, fontWeight: 500, color: '#6a695f',
    padding: '5px 10px', borderRadius: 7,
    border: '1px solid rgba(21,20,15,.12)', background: 'none', cursor: 'pointer',
    fontFamily: 'var(--font-hanken), sans-serif',
  };

  return (
    <div style={{ padding: '14px 24px 18px', borderTop: '1px solid rgba(21,20,15,.07)', background: '#fafaf7' }}>
      {toast && (
        <div style={{
          marginBottom: 10, padding: '9px 14px', borderRadius: 9,
          background: '#15140f', color: '#f7f6f2', fontSize: 12.5,
          fontFamily: 'var(--font-hanken), sans-serif',
          animation: 'fadeUp .25s ease both',
        }}>
          {toast}
        </div>
      )}

      <div style={{
        border: '1px solid rgba(21,20,15,.15)', borderRadius: 14,
        background: '#fff', boxShadow: '0 4px 16px -8px rgba(21,20,15,.16)',
        overflow: 'hidden',
      }}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your suppliers, destinations, or build a proposal…"
          rows={1}
          disabled={isLoading}
          style={{
            width: '100%', padding: '14px 16px 6px', fontSize: 14.5,
            lineHeight: 1.5, color: '#15140f', minHeight: 46, maxHeight: 120,
            opacity: isLoading ? 0.55 : 1,
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button
              style={chipStyle}
              onClick={() => showToast('Coming soon — document ingestion launching next')}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M9.5 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5.5M9.5 2l3.5 3.5M9.5 2v3.5H13" />
              </svg>
              Attach doc
            </button>
            <button
              style={chipStyle}
              onClick={() => showToast('Coming soon — document ingestion launching next')}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <rect x="2" y="5" width="12" height="9" rx="1.5" />
                <path d="M5 5V4a3 3 0 0 1 6 0v1" />
              </svg>
              Supplier
            </button>
            <button
              style={chipStyle}
              onClick={() => showToast('Coming soon — document ingestion launching next')}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <circle cx="8" cy="7" r="3" />
                <path d="M8 10v2M4.5 12.5S5 10 8 10s3.5 2.5 3.5 2.5" />
              </svg>
              Destination
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, color: '#c4c3b9' }}>⌘K</span>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !value.trim()}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 34, height: 34, borderRadius: 9,
                background: ACCENT, border: 'none', cursor: isLoading || !value.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !value.trim() ? 0.45 : 1,
                transition: 'opacity .15s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="#15140f">
                <path d="M14 8L2 14l3-6-3-6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 8, fontSize: 11, color: '#a8a79d' }}>
        Every answer is sourced. Every quote requires your approval.
      </div>
    </div>
  );
}
