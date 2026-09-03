import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function AdminLogin({ onNavigate }) {
  const { login } = useAuth()
  const { showToast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await login(email, password)
      showToast('Welcome back to Dharohar Admin Portal!', 'success')
      onNavigate('/admin')
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.')
      showToast(err.message || 'Login failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '480px' }}>
        <div className="auth-brand">
          <img
            src="/favicon.png"
            alt="Dharohar Setu"
            style={{ width: '46px', height: '46px', objectFit: 'contain' }}
          />
          <div className="auth-brand-text">
            <h2>Dharohar Setu</h2>
            <span>Administrative Gateway</span>
          </div>
        </div>

        <h1 className="auth-title">Admin Sign In</h1>
        <p className="auth-subtitle">
          Secure restricted access for authorized heritage curators and site administrators.
        </p>

        {error && (
          <div className="auth-alert auth-alert-error" style={{ lineHeight: '1.4' }}>
            <span>⚠</span>
            <div>
              <strong>Sign In Error:</strong>
              <div style={{ marginTop: '2px', fontSize: '13px' }}>{error}</div>
            </div>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">
              Administrative Email
            </label>
            <input
              id="admin-email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label" htmlFor="admin-password">
                Password
              </label>
              <button
                type="button"
                className="link-btn"
                style={{ fontSize: '12.5px', marginBottom: '6px' }}
                onClick={() => onNavigate('/admin/forgot-password')}
              >
                Forgot Password?
              </button>
            </div>
            
            <div className="password-input-wrapper">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-admin btn-admin-primary"
            disabled={loading}
            style={{ width: '100%', marginTop: '8px' }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Admin Portal →'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            type="button"
            className="link-btn"
            style={{ fontSize: '13px', color: 'var(--admin-ink-muted)' }}
            onClick={() => onNavigate('/')}
          >
            ← Return to Dharohar Home
          </button>
        </div>
      </div>
    </div>
  )
}
