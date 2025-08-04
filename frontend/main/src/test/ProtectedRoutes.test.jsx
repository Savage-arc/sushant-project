import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../components/protected/ProtectedRoute'
import AdminProtectedRoute from '../components/protected/AdminProtectedRoute'
import UserProtectedRoute from '../components/protected/UserProtectedRoute'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Protected Route Components', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  // Test 11: PASSING - Should render protected content when token exists
  it('should render protected content when token exists', () => {
    localStorage.getItem.mockReturnValue('valid.token.here')
    
    renderWithRouter(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>
    )
    
    expect(screen.getByTestId('protected-content')).toBeInTheDocument()
  })

  // Test 12: PASSING - Should redirect to login when no token
  it('should redirect to login when no token is present', () => {
    localStorage.getItem.mockReturnValue(null)
    
    renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )
    
    // The component should redirect, so protected content should not be visible
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  // Test 13: PASSING - Should allow admin access to admin routes
  it('should allow admin access to admin protected routes', () => {
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkB0ZXN0LmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDU2MjQwMH0.mock'
    localStorage.getItem.mockReturnValue(adminToken)
    
    renderWithRouter(
      <AdminProtectedRoute>
        <div data-testid="admin-content">Admin Content</div>
      </AdminProtectedRoute>
    )
    
    expect(screen.getByTestId('admin-content')).toBeInTheDocument()
  })
}) 