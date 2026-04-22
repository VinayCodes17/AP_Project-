import { API_URL } from './config.js';
import { state, saveUser, clearUser } from './state.js';

export function updateNavbar() {
  const authDiv = document.getElementById('nav-auth');
  if (!authDiv) return;

  if (state.currentUser) {
    authDiv.innerHTML = `
      <span style="font-size:13px;color:var(--gray);margin-right:8px">Hi, ${state.currentUser.name.split(' ')[0]}</span>
      <button onclick="handleLogout()" class="nav-link">Logout</button>
      <a href="#/eligibility" class="nav-cta">Eligibility</a>`;
  } else {
    authDiv.innerHTML = `
      <a href="#/login" class="nav-link" data-route="login">Login</a>
      <a href="#/signup" class="nav-cta">Sign Up</a>`;
  }
}

export async function handleSignup() {
  const name = document.getElementById('s_name').value;
  const email = document.getElementById('s_email').value;
  const password = document.getElementById('s_pass').value;

  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const json = await res.json();
    if (json.success) {
      alert('Account created! You can now login.');
      window.location.hash = '#/login';
    } else {
      alert(json.message);
    }
  } catch (err) { console.error(err); }
}

export async function handleLogin() {
  const email = document.getElementById('l_email').value;
  const password = document.getElementById('l_pass').value;

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const json = await res.json();
    if (json.success) {
      saveUser(json.data);
      updateNavbar();
      window.location.hash = '#/';
    } else {
      alert(json.message);
    }
  } catch (err) { console.error(err); }
}

export function handleLogout() {
  clearUser();
  updateNavbar();
  window.location.hash = '#/login';
}
