import { useState, useEffect, useRef } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'


// Public Pages
import Home from './pages/Home'

// Admin Flow Pages
import AdminLogin from './pages/AdminLogin'
import AdminForgotPassword from './pages/AdminForgotPassword'
import AdminResetPassword from './pages/AdminResetPassword'
import AdminAcceptInvite from './pages/AdminAcceptInvite'
import AdminForcePasswordChange from './pages/AdminForcePasswordChange'

// Admin Views
import AdminLayout from './components/admin/AdminLayout'
import AdminRoute from './components/admin/AdminRoute'
import DashboardView from './pages/admin/DashboardView'
import SitesView from './pages/admin/SitesView'
import TripsView from './pages/admin/TripsView'
import UsersView from './pages/admin/UsersView'
import ReviewsView from './pages/admin/ReviewsView'
import ManageAdminsView from './pages/admin/ManageAdminsView'
import SettingsView from './pages/admin/SettingsView'

import './styles/global.css'
import './styles/admin.css'

function AppRouter({ currentPath, navigate }) {
  const { mustChangePassword } = useAuth()

  // 1. Node Deep Link Route (/node/:node_id e.g. /node/IIITS-0-KING)
  // When scanned with Google Lens without app installed, redirect directly to the Heritage Sites section
  // with the mapped site modal open and app download featured.
  const nodeMatch = currentPath.match(/^\/node(?:\/([^/?#]+))?\/?$/)
  if (nodeMatch) {
    const rawNodeId = nodeMatch[1] ? decodeURIComponent(nodeMatch[1]).trim() : ''
    return <Home onNavigate={navigate} initialNodeId={rawNodeId} />
  }

  // 2. Root Landing Page (or /#top)
  if (currentPath === '/' || currentPath === '' || currentPath.startsWith('/#')) {
    return <Home onNavigate={navigate} />
  }

  // 3. Dedicated Admin Login
  if (currentPath === '/admin-login') {
    return <AdminLogin onNavigate={navigate} />
  }

  // 4. Admin Password Recovery Flow
  if (currentPath === '/admin/forgot-password') {
    return <AdminForgotPassword onNavigate={navigate} />
  }

  if (currentPath.startsWith('/admin/reset-password')) {
    return <AdminResetPassword onNavigate={navigate} />
  }

  // 5. Staff Onboarding Invitation Acceptance Flow
  if (currentPath.startsWith('/admin/accept-invite')) {
    return <AdminAcceptInvite onNavigate={navigate} />
  }

  // 6. Forced Password Change Page
  if (mustChangePassword || currentPath === '/admin/change-password' || currentPath === '/admin/set-new-password') {
    return (
      <AdminRoute onNavigate={navigate}>
        <AdminForcePasswordChange onNavigate={navigate} />
      </AdminRoute>
    )
  }

  // 7. Protected Admin Portal Sub-routes
  if (currentPath.startsWith('/admin')) {
    return (
      <AdminRoute onNavigate={navigate}>
        <AdminLayout currentPath={currentPath} onNavigate={navigate}>
          {(() => {
            switch (currentPath) {
              case '/admin':
              case '/admin/dashboard':
                return <DashboardView onNavigate={navigate} />
              case '/admin/sites':
                return <SitesView onNavigate={navigate} />
              case '/admin/trips':
                return <TripsView onNavigate={navigate} />
              case '/admin/users':
                return <UsersView onNavigate={navigate} />
              case '/admin/reviews':
                return <ReviewsView onNavigate={navigate} />
              case '/admin/manage-admins':
                return <ManageAdminsView onNavigate={navigate} />
              case '/admin/settings':
                return <SettingsView onNavigate={navigate} />
              default:
                return <DashboardView onNavigate={navigate} />
            }
          })()}
        </AdminLayout>
      </AdminRoute>
    )
  }

  // 8. Controlled 404 Fallback Page
  return <NotFoundPage onNavigate={navigate} />
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/')

  // Listen to browser back/forward and hash navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/')
    }
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('hashchange', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('hashchange', handlePopState)
    }
  }, [])

  const prevPathRef = useRef(currentPath)

  // Scroll to anchor or top
  useEffect(() => {
    if (window.location.hash) {
      const targetEl = document.querySelector(window.location.hash)
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }

    const wasNodeRoute = prevPathRef.current && prevPathRef.current.startsWith('/node')
    prevPathRef.current = currentPath

    // If closing modal from /node/:id to '/', stay smoothly at the current scroll position (#sites)
    if (!currentPath.startsWith('/node') && !(wasNodeRoute && currentPath === '/')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [currentPath])

  const navigate = (path) => {
    if (path.startsWith('/#') || path.startsWith('#')) {
      const hash = path.startsWith('/#') ? path.substring(1) : path
      window.history.pushState({}, '', '/' + hash)
      setCurrentPath('/')
      const targetEl = document.querySelector(hash)
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  return (
    <AuthProvider>
      <ToastProvider>
        <AppRouter currentPath={currentPath} navigate={navigate} />
      </ToastProvider>
    </AuthProvider>
  )
}

function NotFoundPage({ onNavigate }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px', background: '#FAF6EF' }}>
      <div style={{ maxWidth: '420px' }}>
        <h1 style={{ fontSize: '3.5rem', margin: 0, color: '#9E3A14', fontFamily: 'Fraunces, serif' }}>404</h1>
        <h2 style={{ fontSize: '1.25rem', marginTop: '8px', color: '#1B140E' }}>Page Not Found</h2>
        <p style={{ color: '#665C54', marginTop: '8px', lineHeight: 1.5 }}>
          The requested waypoint or dashboard route does not exist.
        </p>
        <button
          type="button"
          onClick={() => (onNavigate ? onNavigate('/') : (window.location.href = '/'))}
          className="btn btn-primary"
          style={{ marginTop: '20px', padding: '10px 24px', cursor: 'pointer', border: 'none', borderRadius: '8px', background: '#9E3A14', color: '#fff', fontWeight: 600 }}
        >
          Return to Dharohar Setu
        </button>
      </div>
    </div>
  )
}
