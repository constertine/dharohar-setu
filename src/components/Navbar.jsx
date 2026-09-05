import { useState } from 'react'
import { getAndroidDownloadUrl } from '../config/appConfig'

export default function Navbar({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const downloadUrl = getAndroidDownloadUrl()

  const handleAnchorClick = (hash) => (e) => {
    closeMenu()
    if (onNavigate && window.location.pathname !== '/') {
      e.preventDefault()
      onNavigate(hash)
    }
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        <a
          href="#top"
          className="wordmark"
          onClick={(e) => {
            closeMenu()
            if (onNavigate && window.location.pathname !== '/') {
              e.preventDefault()
              onNavigate('/')
            }
          }}
        >
          <span className="dot"></span>Dharohar Setu
        </a>
        <button
          className="menu-btn"
          type="button"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <nav className={`navlinks ${menuOpen ? 'open' : ''}`} id="main-navigation">
          <a href="#how" onClick={handleAnchorClick('#how')}>How it works</a>
          <a href="#features" onClick={handleAnchorClick('#features')}>Features</a>
          <a href="#sites" onClick={handleAnchorClick('#sites')}>Heritage sites</a>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="menu-download"
            onClick={closeMenu}
          >
            Download for Android
          </a>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary nav-download"
          >
            Download App
          </a>
        </div>
      </div>
    </header>
  )
}
