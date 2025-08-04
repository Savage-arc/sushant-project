import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import UserDashboard from '../pages/component/dashboard/user'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

// Mock the sidebar component
vi.mock('../pages/component/sidebar/usersidebar', () => ({
  default: () => <div data-testid="user-sidebar">User Sidebar</div>
}))

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('UserDashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  // Test 6: PASSING - Should render user dashboard with welcome message
  it('should render user dashboard with welcome message', () => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MzQ1NjI0MDB9.mock'
    localStorage.getItem.mockReturnValue(mockToken)
    
    renderWithRouter(<UserDashboard />)
    
    expect(screen.getByText(/🏋️‍♀️ welcome john doe/i)).toBeInTheDocument()
  })

  // Test 7: PASSING - Should render workout type cards
  it('should render all three workout type cards', () => {
    renderWithRouter(<UserDashboard />)
    
    expect(screen.getByText(/cardio training/i)).toBeInTheDocument()
    expect(screen.getByText(/weight training/i)).toBeInTheDocument()
    expect(screen.getByText(/yoga sessions/i)).toBeInTheDocument()
  })

  // Test 8: PASSING - Should render sidebar
  it('should render user sidebar', () => {
    renderWithRouter(<UserDashboard />)
    
    expect(screen.getByTestId('user-sidebar')).toBeInTheDocument()
  })
}) 