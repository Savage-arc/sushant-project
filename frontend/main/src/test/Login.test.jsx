import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../pages/Loginuser'
import { loginUserApi } from '../api/api'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

// Mock the API
vi.mock('../api/api', () => ({
  loginUserApi: vi.fn()
}))

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  // Test 1: PASSING - Should render login form
  it('should render login form with email and password fields', () => {
    renderWithRouter(<Login />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login in/i })).toBeInTheDocument()
  })

  // Test 2: PASSING - Should show error for empty fields
  it('should show error message when submitting empty form', async () => {
    renderWithRouter(<Login />)
    
    const submitButton = screen.getByRole('button', { name: /login in/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/email and password are required/i)).toBeInTheDocument()
    })
  })

  // Test 3: PASSING - Should handle successful login for user
  it('should handle successful login and redirect user to user dashboard', async () => {
    const mockToken = 'mock.jwt.token'
    const mockResponse = {
      data: {
        success: true,
        token: mockToken,
        message: 'Login successful'
      }
    }
    
    loginUserApi.mockResolvedValue(mockResponse)
    
    renderWithRouter(<Login />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login in/i })
    
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken)
    })
  })

  // Test 4: FAILING - Should show welcome message with user name (intentionally failing)
  it('should display welcome message with user name after login', async () => {
    // This test will fail because we're not actually navigating to the dashboard
    // and the welcome message is in a different component
    renderWithRouter(<Login />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login in/i })
    
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    // This will fail because the welcome message is not in the Login component
    await waitFor(() => {
      expect(screen.getByText(/welcome user/i)).toBeInTheDocument()
    })
  })

  // Test 5: FAILING - Should validate email format (intentionally failing)
  it('should validate email format and show error for invalid email', async () => {
    // This test will fail because the Login component doesn't have email validation
    renderWithRouter(<Login />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /login in/i })
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)
    
    // This will fail because there's no email validation in the component
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument()
    })
  })
}) 