import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Calendrier PME Québec - Ne manquez plus aucune échéance';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #19747E 0%, #4A9B8F 50%, #A9D6E5 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#19747E',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            }}
          >
            C
          </div>
          <div style={{ display: 'flex', fontSize: '48px', fontWeight: 'bold' }}>
            <span style={{ color: 'white' }}>Calendrier</span>
            <span style={{ color: '#D1E8E2', marginLeft: '10px' }}>PME</span>
          </div>
        </div>

        {/* Main text */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: '20px',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          Ne manquez plus aucune échéance
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          Échéances fiscales • Subventions • Obligations légales
        </div>

        {/* Badge */}
        <div
          style={{
            marginTop: '40px',
            padding: '12px 24px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50px',
            fontSize: '20px',
            color: 'white',
            border: '2px solid rgba(255,255,255,0.3)',
          }}
        >
          100% gratuit pour les PME québécoises
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
