import { Router } from './router.js';
import { state } from './state.js';
import { fetchCompanies, fetchTrendStats } from './api.js';
import { updateNavbar, handleSignup, handleLogin, handleLogout } from './auth.js';
import { initEligPage, setEligInst, runElig } from './eligibility.js';
import { initDataPage, setDataTab } from './data.js';
import { handleSubmitSupport } from './support.js';

// 1. ROUTE CONFIG
const routes = [
  { path: '#/',            page: 'home',        id: 'home' },
  { path: '#/eligibility', page: 'eligibility', id: 'eligibility' },
  { path: '#/data',        page: 'data',        id: 'data' },
  { path: '#/contact',     page: 'contact',     id: 'contact' },
  { path: '#/login',       page: 'login',       id: 'login' },
  { path: '#/signup',      page: 'signup',      id: 'signup' }
];

// 2. INITIALIZE ROUTER
const router = new Router(routes);

// 3. PAGE TRANSITION LOGIC
window.addEventListener('pageLoaded', async (e) => {
  const page = e.detail.page;
  updateNavbar();

  // AUTH GUARD
  const authPages = ['login', 'signup'];
  const publicPages = ['contact', ...authPages];

  if (!state.currentUser && !publicPages.includes(page)) {
    window.location.hash = '#/login';
    return;
  }
  
  if (state.currentUser && authPages.includes(page)) {
    window.location.hash = '#/';
    return;
  }
  
  // Data Fetching
  if ((page === 'eligibility' || page === 'data') && state.companies.length === 0) await fetchCompanies();
  if (page === 'data' && !state.trendStats) await fetchTrendStats();

  // Page Initializers
  if (page === 'eligibility') initEligPage();
  if (page === 'data') initDataPage();
});

// 4. GLOBAL EVENT DELEGATION
document.addEventListener('click', (e) => {
  // Mobile Menu
  if (e.target.id === 'hamburger' || e.target.closest('#hamburger')) {
    document.getElementById('nav-links').classList.toggle('open');
  }
  
  // Close menu on link click
  if (e.target.classList.contains('nav-link')) {
    document.getElementById('nav-links').classList.remove('open');
  }

  // Routing via data-route attribute
  if (e.target.dataset.route) {
    window.location.hash = `#/${e.target.dataset.route}`;
  }
});

// 5. EXPOSE TO WINDOW (for inline HTML events)
window.setEligInst = setEligInst;
window.runElig = runElig;
window.setDataTab = setDataTab;
window.handleSignup = handleSignup;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.handleSubmitSupport = handleSubmitSupport;
window.toggleFaq = (el) => el.classList.toggle('open');
window.submitForm = () => {
  const msg = document.getElementById('success-msg');
  if (msg) {
    msg.style.display = 'block';
    setTimeout(() => msg.style.display = 'none', 5000);
  }
};
