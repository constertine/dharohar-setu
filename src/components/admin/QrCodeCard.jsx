import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'

export default function QrCodeCard({
  value,
  title,
  subtitle,
  siteName,
  nodeType = 'standard',
  sequenceOrder,
  onCopySuccess,
}) {
  const canvasRef = useRef(null)
  const [dataUrl, setDataUrl] = useState('')
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState(false)

  const isKing = nodeType === 'king' || sequenceOrder === 1 || value?.includes('-0')
  const nodeCode = String(value || '').trim()
  const qrUrl = nodeCode.startsWith('http://') || nodeCode.startsWith('https://')
    ? nodeCode
    : `https://dharohar-setu.onrender.com/node/${encodeURIComponent(nodeCode)}`

  useEffect(() => {
    if (!qrUrl || !canvasRef.current) return

    QRCode.toCanvas(
      canvasRef.current,
      qrUrl,
      {
        width: 220,
        margin: 2,
        color: {
          dark: '#1C160C',
          light: '#FFFDF9',
        },
        errorCorrectionLevel: 'H',
      },
      (err) => {
        if (!err && canvasRef.current) {
          setDataUrl(canvasRef.current.toDataURL('image/png'))
        }
      }
    )
  }, [qrUrl])

  const handleCopyCode = () => {
    navigator.clipboard.writeText(nodeCode)
    setCopiedCode(true)
    if (onCopySuccess) onCopySuccess(nodeCode)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(qrUrl)
    setCopiedUrl(true)
    if (onCopySuccess) onCopySuccess(qrUrl)
    setTimeout(() => setCopiedUrl(false), 2000)
  }

  const handleDownload = () => {
    if (!canvasRef.current) return

    // Create a high-res branded print card
    const printCanvas = document.createElement('canvas')
    printCanvas.width = 800
    printCanvas.height = 1000
    const ctx = printCanvas.getContext('2d')

    // Background
    ctx.fillStyle = '#FFFDF9'
    ctx.fillRect(0, 0, 800, 1000)

    // Border
    ctx.strokeStyle = '#D9CEBD'
    ctx.lineWidth = 12
    ctx.strokeRect(20, 20, 760, 960)

    // Inner accent border
    ctx.strokeStyle = isKing ? '#9E3A14' : '#1C160C'
    ctx.lineWidth = 3
    ctx.strokeRect(36, 36, 728, 928)

    // Header Badge
    ctx.fillStyle = isKing ? '#9E3A14' : '#1C160C'
    ctx.fillRect(50, 50, 700, 70)

    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 28px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('🏛 DHAROHAR SETU • HERITAGE WAYPOINT', 400, 95)

    // Site Name
    ctx.fillStyle = '#1C160C'
    ctx.font = 'bold 36px serif'
    ctx.fillText(siteName || 'Heritage Site', 400, 180)

    // Waypoint Name & Type
    ctx.fillStyle = '#9E3A14'
    ctx.font = 'bold 30px sans-serif'
    ctx.fillText(title || 'Main Checkpoint', 400, 230)

    ctx.fillStyle = '#6E6254'
    ctx.font = '22px sans-serif'
    const typeLabel = isKing ? '★ KING ENTRANCE SCANNER (TOUR START)' : `CHECKPOINT #${sequenceOrder || 1} (${nodeType.toUpperCase()})`
    ctx.fillText(typeLabel, 400, 270)

    // Draw QR in center
    const qrSize = 440
    ctx.drawImage(canvasRef.current, 180, 310, qrSize, qrSize)

    // QR Value Box
    ctx.fillStyle = '#F4EFE6'
    ctx.fillRect(100, 765, 600, 95)
    ctx.strokeStyle = '#D9CEBD'
    ctx.lineWidth = 2
    ctx.strokeRect(100, 765, 600, 95)

    ctx.fillStyle = '#1C160C'
    ctx.font = 'bold 30px monospace'
    ctx.fillText(nodeCode, 400, 805)

    ctx.fillStyle = '#9E3A14'
    ctx.font = '500 18px monospace'
    ctx.fillText(qrUrl, 400, 840)

    // Footer instruction
    ctx.fillStyle = '#6E6254'
    ctx.font = '20px sans-serif'
    ctx.fillText('Scan with Google Lens or Dharohar App to trigger location audio & tour', 400, 895)
    ctx.font = '16px sans-serif'
    ctx.fillText('dharohar-setu.onrender.com • Ministry of Tourism & Culture', 400, 928)

    // Download image
    const link = document.createElement('a')
    const sanitizedName = (title || 'qr').toLowerCase().replace(/[^a-z0-9]/g, '-')
    link.download = `dharohar-${nodeCode}-${sanitizedName}.png`
    link.href = printCanvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div
      className="qr-card"
      style={{
        background: '#FFFDF9',
        border: isKing ? '2px solid #9E3A14' : '1px solid var(--admin-line)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        boxShadow: isKing ? '0 4px 16px rgba(158,58,20,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {isKing && (
        <span
          style={{
            position: 'absolute',
            top: '-10px',
            background: '#9E3A14',
            color: '#FFF',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            padding: '2px 8px',
            borderRadius: '10px',
          }}
        >
          ★ King Node (Entrance)
        </span>
      )}

      <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--admin-ink)', marginTop: isKing ? '6px' : '0' }}>
        {title}
      </div>

      {subtitle && (
        <div style={{ fontSize: '12px', color: 'var(--admin-ink-muted)', marginBottom: '8px' }}>
          {subtitle}
        </div>
      )}

      <div
        style={{
          background: '#FFF',
          padding: '8px',
          borderRadius: '8px',
          border: '1px solid var(--admin-line)',
          margin: '8px 0',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <canvas ref={canvasRef} style={{ width: '180px', height: '180px', display: 'block' }} />
      </div>

      {/* Node Code & Deep Link URL */}
      <div
        style={{
          background: '#F4EFE6',
          padding: '6px 10px',
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontWeight: 700,
          fontSize: '13px',
          color: 'var(--admin-ink)',
          marginBottom: '4px',
          border: '1px solid #D9CEBD',
          letterSpacing: '0.05em',
        }}
      >
        {nodeCode}
      </div>

      <div
        style={{
          fontSize: '11px',
          color: '#8C7B6B',
          fontFamily: 'monospace',
          wordBreak: 'break-all',
          marginBottom: '10px',
          lineHeight: 1.3,
        }}
        title={qrUrl}
      >
        /node/{nodeCode}
      </div>

      <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
        <button
          type="button"
          className="btn-admin btn-admin-secondary"
          style={{ flex: 1, padding: '6px 4px', fontSize: '11px' }}
          onClick={handleCopyUrl}
          title="Copy full URL for Google Lens / deep link"
        >
          {copiedUrl ? '✓ Copied' : '🔗 Copy Link'}
        </button>

        <button
          type="button"
          className="btn-admin btn-admin-secondary"
          style={{ padding: '6px 8px', fontSize: '11px' }}
          onClick={handleCopyCode}
          title="Copy node code"
        >
          {copiedCode ? '✓' : '📋 Code'}
        </button>

        <button
          type="button"
          className="btn-admin btn-admin-primary"
          style={{
            flex: 1.2,
            padding: '6px 6px',
            fontSize: '11px',
            background: isKing ? '#9E3A14' : 'var(--admin-ink)',
          }}
          onClick={handleDownload}
        >
          ⬇ Poster PNG
        </button>
      </div>
    </div>
  )
}
