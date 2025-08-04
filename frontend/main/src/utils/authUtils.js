// Utility functions for tab-specific authentication

// Get the current tab ID
export const getTabId = () => {
  return sessionStorage.getItem('tabId');
};

// Get token for current tab
export const getToken = () => {
  const tabId = getTabId();
  if (!tabId) return null;
  return sessionStorage.getItem(`token_${tabId}`);
};

// Set token for current tab
export const setToken = (token) => {
  const tabId = getTabId();
  if (!tabId) return;
  sessionStorage.setItem(`token_${tabId}`, token);
};

// Get user data for current tab
export const getUser = () => {
  const tabId = getTabId();
  if (!tabId) return null;
  const userData = sessionStorage.getItem(`user_${tabId}`);
  return userData ? JSON.parse(userData) : null;
};

// Set user data for current tab
export const setUser = (user) => {
  const tabId = getTabId();
  if (!tabId) return;
  sessionStorage.setItem(`user_${tabId}`, JSON.stringify(user));
};

// Clear authentication for current tab
export const clearAuth = () => {
  const tabId = getTabId();
  if (!tabId) return;
  sessionStorage.removeItem(`token_${tabId}`);
  sessionStorage.removeItem(`user_${tabId}`);
};

// Logout function
export const logout = () => {
  clearAuth();
  // Redirect to login page
  window.location.href = '/login';
};

// Check if user is authenticated in current tab
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

 