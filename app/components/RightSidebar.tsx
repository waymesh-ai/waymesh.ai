'use client';

const ACCENT = '#D4A853';

const domains = [
  {
    key: 'supplier',
    name: 'Supplier Intelligence',
    color: '#D4A853',
    iconColor: '#a9781f',
    iconBg: 'rgba(212,168,83,.12)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#a9781f" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12V6.5l6-3 6 3V12" /><path d="M2 12h12" /><path d="M6 12V9h4v3" />
      </svg>
    ),
    value: '312', unit: 'suppliers',
    sub: '89 preferred partners\n47 destinations',
  },
  {
    key: 'destination',
    name: 'Destination Intelligence',
    color: '#4A9B8E',
    iconColor: '#4A9B8E',
    iconBg: 'rgba(74,155,142,.12)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#4A9B8E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 14s5-4.5 5-8A5 5 0 0 0 3 6c0 3.5 5 8 5 8z" /><circle cx="8" cy="6" r="1.8" />
      </svg>
    ),
    value: '89', unit: 'destinations',
    sub: 'Safety · seasonality\nVisa rules · local insight',
  },
  {
    key: 'contract',
    name: 'Contract Intelligence',
    color: '#6B7FA3',
    iconColor: '#6B7FA3',
    iconBg: 'rgba(107,127,163,.12)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#6B7FA3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 2h5l3 3v9H4z" /><path d="M6 7.5h4M6 10h4M6 12h2.5" />
      </svg>
    ),
    value: '47', unit: 'active agreements',
    sub: 'Rates · terms · allocations\nCommissions',
  },
  {
    key: 'proposal',
    name: 'Proposal Intelligence',
    color: '#A36B7F',
    iconColor: '#A36B7F',
    iconBg: 'rgba(163,107,127,.10)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#A36B7F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2l6 3-6 3-6-3 6-3z" /><path d="M2 8l6 3 6-3M2 11l6 3 6-3" />
      </svg>
    ),
    value: '214', unit: 'itineraries',
    sub: 'Historical proposals\nClient preference patterns',
  },
  {
    key: 'agency',
    name: 'Agency Knowledge',
    color: '#6B9A6B',
    iconColor: '#6B9A6B',
    iconBg: 'rgba(107,154,107,.10)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#6B9A6B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 3A1.5 1.5 0 0 1 5 1.5h8.5v11H5A1.5 1.5 0 0 0 3.5 14z" />
        <path d="M3.5 14A1.5 1.5 0 0 1 5 12.5h8.5" />
      </svg>
    ),
    value: '124', unit: 'internal documents',
    sub: 'SOPs · operational notes\nPlaybooks',
  },
  {
    key: 'partner',
    name: 'Partner Network',
    color: '#A3724A',
    iconColor: '#A3724A',
    iconBg: 'rgba(163,114,74,.10)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#A3724A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="4" cy="4.5" r="1.7" /><circle cx="12" cy="5.5" r="1.7" /><circle cx="7.5" cy="12" r="1.7" />
        <path d="M5.4 5.3l5-0.6M5.1 5.8l1.5 4.7M9 11l2.4-4" />
      </svg>
    ),
    value: '47', unit: 'DMCs',
    sub: '93 local experts\nGround operators · regional contacts',
  },
];

interface Props {
  isConv: boolean;
  activeDomains: string[];
  isStreaming: boolean;
}

export default function RightSidebar({ isConv, activeDomains, isStreaming }: Props) {
  const activeDomainCount = activeDomains.length;
  const sourceCount = Math.max(activeDomainCount, 1);

  return (
    <aside style={{
      width: 296, minWidth: 296, display: 'flex', flexDirection: 'column',
      height: '100%', background: '#f7f6f2', borderLeft: '1px solid rgba(21,20,15,.09)',
    }}>
      <div style={{
        height: 52, minHeight: 52,
        borderBottom: '1px solid rgba(21,20,15,.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 18px',
      }}>
        <span style={{
          fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11,
          letterSpacing: '.08em', textTransform: 'uppercase', color: '#9c9a90',
        }}>Travel Intelligence</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 9.5, color: '#1f7a52' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1f7a52', animation: 'pulseAmber 2.4s ease-in-out infinite' }} />
          Live
        </span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px' }}>
        {isConv && (
          <div style={{
            marginBottom: 14, padding: '10px 12px', borderRadius: 9,
            background: 'rgba(21,20,15,.04)', border: '1px solid rgba(21,20,15,.07)',
          }}>
            <div style={{
              fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 9.5, letterSpacing: '.09em',
              textTransform: 'uppercase', color: ACCENT, marginBottom: 4,
            }}>Sources cited in this answer</div>
            <div style={{ fontSize: 12, color: '#6a695f' }}>
              {isStreaming
                ? 'Searching knowledge domains…'
                : activeDomainCount > 0
                  ? `${activeDomainCount} domain${activeDomainCount !== 1 ? 's' : ''} · ${sourceCount} source${sourceCount !== 1 ? 's' : ''} cited inline`
                  : '6 domains connected · Always on'}
            </div>
          </div>
        )}

        {!isConv && (
          <div style={{
            marginBottom: 14, padding: '9px 12px', borderRadius: 9,
            background: 'rgba(21,20,15,.04)', border: '1px solid rgba(21,20,15,.07)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1f7a52', flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: '#6a695f' }}>6 domains connected · Always on</span>
          </div>
        )}

        <p style={{ fontSize: 12.5, lineHeight: 1.5, color: '#6a695f', margin: '0 0 18px' }}>
          Every answer draws on six connected domains of your agency&apos;s knowledge.
        </p>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 13, top: 14, bottom: 14, width: 1.5,
            background: 'linear-gradient(180deg, rgba(212,168,83,.5), rgba(21,20,15,.12) 60%, transparent)',
          }} />

          {domains.map((d, i) => {
            const showActive = activeDomains.includes(d.key) && isConv;
            const isSearching = isStreaming && isConv;

            return (
              <div key={d.name} style={{
                position: 'relative', paddingLeft: 32,
                marginBottom: i < domains.length - 1 ? 11 : 0,
              }}>
                <div style={{
                  position: 'absolute', left: 9, top: 21, width: 8, height: 8,
                  borderRadius: '50%',
                  background: showActive ? ACCENT : isSearching ? 'rgba(212,168,83,.35)' : 'transparent',
                  border: showActive || isSearching ? 'none' : '2px solid #c4c3b9',
                  animation: isSearching ? 'pulseAmber 1.2s ease-in-out infinite' : 'none',
                  animationDelay: isSearching ? `${i * 0.12}s` : '0s',
                }} />

                <div style={{
                  background: '#fff', border: '1px solid rgba(21,20,15,.09)',
                  borderLeft: `2px solid ${d.color}`, borderRadius: 12, padding: '13px 14px',
                  opacity: isSearching && !showActive ? 0.75 : 1,
                  transition: 'opacity .3s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: 22, height: 22, borderRadius: 6, background: d.iconBg,
                      }}>{d.icon}</span>
                      <span style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 600, fontSize: 13, color: '#15140f' }}>{d.name}</span>
                    </div>
                    {showActive ? (
                      <span style={{
                        fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 8.5,
                        letterSpacing: '.04em', textTransform: 'uppercase',
                        color: '#15140f', background: ACCENT,
                        borderRadius: 999, padding: '2px 8px', whiteSpace: 'nowrap', fontWeight: 500,
                      }}>Active</span>
                    ) : (
                      <span style={{
                        fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 8.5,
                        letterSpacing: '.04em', textTransform: 'uppercase',
                        color: '#9c9a90', background: 'rgba(21,20,15,.07)',
                        borderRadius: 999, padding: '2px 8px', whiteSpace: 'nowrap',
                      }}>Connected</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                    <span style={{
                      fontFamily: 'var(--font-sora), sans-serif', fontWeight: 700, fontSize: 20,
                      color: '#15140f', fontVariantNumeric: 'tabular-nums',
                    }}>{d.value}</span>
                    <span style={{ fontSize: 12, color: '#6a695f' }}>{d.unit}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10.5, color: '#8a8980', whiteSpace: 'pre-line' }}>
                    {d.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {isConv && activeDomainCount > 0 && !isStreaming && (
          <div style={{
            marginTop: 14, padding: '10px 12px', borderRadius: 9,
            background: 'rgba(21,20,15,.03)', border: '1px solid rgba(21,20,15,.07)',
          }}>
            <span style={{ fontSize: 11, lineHeight: 1.5, color: '#9c9a90' }}>
              <span style={{ color: ACCENT }}>↳</span>{' '}
              This answer drew on{' '}
              <strong style={{ color: '#34332c', fontWeight: 600 }}>{activeDomainCount} domain{activeDomainCount !== 1 ? 's' : ''}</strong>
              {' '}· {sourceCount} source{sourceCount !== 1 ? 's' : ''} cited inline
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
