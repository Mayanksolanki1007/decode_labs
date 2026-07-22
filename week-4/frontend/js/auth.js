/**
 * Authentication Client Helper (EventSphere / Task API)
 * Manages JWT Token, User Sessions, Registration, Login, and Auth UI state.
 */
const API_BASE_URL = 'http://localhost:5000';

const Auth = {
  // Retrieve token from localStorage
  getToken() {
    return localStorage.getItem('auth_token');
  },

  // Retrieve current user object from localStorage
  getUser() {
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  },

  // Store session credentials
  setSession(token, user) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    this.updateUI();
  },

  // Clear session (Logout)
  logout() {
    const token = this.getToken();
    if (token) {
      fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).catch(err => console.log('Logout notification error:', err));
    }
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.updateUI();
    window.location.reload();
  },

  // Check if user is logged in
  isLoggedIn() {
    return !!this.getToken();
  },

  // User Sign Up
  async register(name, email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || (data.messages ? data.messages.join(', ') : 'Registration failed'));
    }

    if (data.token && data.user) {
      this.setSession(data.token, data.user);
    }
    return data;
  },

  // User Login
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    if (data.token && data.user) {
      this.setSession(data.token, data.user);
    }
    return data;
  },

  // Update navbar/UI auth status dynamically
  updateUI() {
    const user = this.getUser();
    const authNavContainer = document.getElementById('auth-nav-container');
    if (!authNavContainer) return;

    if (user) {
      authNavContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-weight: 500; font-size: 0.9rem;">👤 ${escapeHTML(user.name)}</span>
          <button onclick="Auth.logout()" class="btn-secondary" style="padding: 6px 14px; font-size: 0.85rem; cursor: pointer;">Logout</button>
        </div>
      `;
    } else {
      authNavContainer.innerHTML = `
        <a href="login.html" class="btn-primary" style="padding: 6px 16px; font-size: 0.9rem; text-decoration: none;">Login / Register</a>
      `;
    }
  }
};

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Auto-initialize UI state when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  Auth.updateUI();
});
