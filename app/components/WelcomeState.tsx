'use client';

const ACCENT = '#D4A853';

const prompts = [
  { category: 'Supplier Intelligence', text: 'Who is our preferred DMC in Sicily?' },
  { category: 'Proposal Builder', text: 'Build a 7-day luxury Amalfi itinerary.' },
  { category: 'Supplier Comparison', text: 'Compare our Rome transfer suppliers.' },
  { category: 'Contract Intelligence', text: 'What cancellation terms apply to this supplier?' },
];

const stats = [
  { value: '312', label: 'Suppliers' },
  { value: '47', label: 'Documents' },
  { value: '89', label: 'Destinations' },
  { value: '214', label: 'Proposals' },
];

interface Props {
  onSend: (text: string) => void;
}

export default function WelcomeState({ onSend }: Props) {
  return (
    <div style={{
      flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '40px 40px 0',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 580, animation: 'fadeUp .6s ease both' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 46, height: 46, border: `2px solid ${ACCENT}`,
          transform: 'rotate(45deg)', marginBottom: 28,
        }}>
          <div style={{
            transform: 'rotate(-45deg)', fontFamily: 'var(--font-sora), sans-serif',
            fontWeight: 800, fontSize: 16, color: '#15140f',
          }}>W</div>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-sora), sans-serif', fontWeight: 800,
          fontSize: 'clamp(28px, 3.4vw, 42px)', letterSpacing: '-.03em',
          margin: '0 0 14px', color: '#15140f', lineHeight: 1.05,
        }}>What would you like to know?</h1>

        <p style={{ fontSize: 16, lineHeight: 1.6, color: '#5c5b52', margin: '0 0 44px' }}>
          Ask about suppliers, destinations, contracts, proposals,<br />
          itineraries, or operational workflows.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, textAlign: 'left', marginBottom: 32 }}>
          {prompts.map((p) => (
            <button
              key={p.category}
              onClick={() => onSend(p.text)}
              style={{
                background: '#fff', border: `1px solid rgba(21,20,15,.10)`,
                borderLeft: `2px solid ${ACCENT}`, borderRadius: 14,
                padding: '16px 16px', cursor: 'pointer', textAlign: 'left',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}
            >
              <div style={{
                fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11,
                letterSpacing: '.09em', textTransform: 'uppercase', color: ACCENT,
              }}>{p.category}</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ fontSize: 14, lineHeight: 1.45, fontWeight: 500, color: '#15140f' }}>{p.text}</div>
                <span style={{ color: ACCENT, fontSize: 15, flexShrink: 0, lineHeight: 1 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 20, padding: '18px 24px',
        borderRadius: 12, background: 'rgba(21,20,15,.03)', border: '1px solid rgba(21,20,15,.07)',
        marginBottom: 20,
      }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {i > 0 && <div style={{ width: 1, height: 36, background: 'rgba(21,20,15,.09)' }} />}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-sora), sans-serif', fontWeight: 800, fontSize: 28,
                color: '#15140f', fontVariantNumeric: 'tabular-nums', letterSpacing: '-.02em',
              }}>{s.value}</div>
              <div style={{
                fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 9.5,
                letterSpacing: '.09em', textTransform: 'uppercase', color: '#9c9a90', marginTop: 3,
              }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
