import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AdminDashboard from '../pages/component/dashboard/admin'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

// Mock the sidebar component
vi.mock('../pages/component/sidebar/adminsidebar', () => ({
  default: () => <div data-testid="admin-sidebar">Admin Sidebar</div>
}))

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('AdminDashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  // Test 9: PASSING - Should render admin dashboard with welcome message
  it('should render admin dashboard with welcome message', () => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM0NTYyNDAwfQ.mock'
    localStorage.getItem.mockReturnValue(mockToken)
    
    renderWithRouter(<AdminDashboard />)
    
    expect(screen.getByText(/🛠️ welcome admin user/i)).toBeInTheDocument()
  })

  // Test 10: PASSING - Should render admin management sections
  it('should render all admin management sections', () => {
    renderWithRouter(<AdminDashboard />)
    
    expect(screen.getByText(/🏃‍♂️ cardio section/i)).toBeInTheDocument()
    expect(screen.getByText(/🏋️ weight training/i)).toBeInTheDocument()
    expect(screen.getByText(/🧘 yoga section/i)).toBeInTheDocument()
  })
}) 