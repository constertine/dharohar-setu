// src/pages/NotFoundPage.jsx
// Controlled 404 fallback page for unmatched web routes.

export default function NotFoundPage({ onNavigate }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at center, #FAF6EF 0%, #EFE8DA 100%)',
      fontFamily: "'IBM Plex Sans', sans-serif",
      padding: '24px',
      color: '#241A12',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: '440px',
        width: '100%',
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E3D9C9',
        boxShadow: '0 16px 40px rgba(36, 26, 18, 0.08)',
        padding: '40px 28px',
      }}>
        <div style={{
          fontSize: '56px',
          fontWeight: 700,
          fontFamily: "'Fraunces', Georgia, serif",
          color: '#9C4A2C',
          marginBottom: '8px',
        }}>
          404
        </div>
        <h1 style={{
          fontSize: '22px',
          fontFamily: "'Fraunces', Georgia, serif",
          margin: '0 0 12px',
        }}>
          Page Not Found
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#6B5E51',
          lineHeight: '1.5',
          margin: '0 0 24px',
        }}>
          The page or monument marker you are looking for does not exist or may have moved.
        </p>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate('/')}
          style={{
            width: '100%',
            background: '#9C4A2C',
            color: '#FFFFFF',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '10px',
            fontSize: '14.5px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Return to Dharohar Home →
        </button>
      </div>
    </div>
  )
}
