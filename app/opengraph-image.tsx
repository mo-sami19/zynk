import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Zynk Digital Agency';
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
          fontSize: 128,
          background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#CFFF04',
          fontWeight: 'bold',
        }}
      >
        <div style={{ display: 'flex', fontSize: 180 }}>zynk</div>
        <div style={{ fontSize: 48, color: '#fff', marginTop: 20 }}>
          THINK BIG, ZYNK BIGGER
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
