export const state = {
  companies: [],
  trendStats: null,
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  currentEligInst: 'engineering',
  activeDataTab: 'companies'
};

export function saveUser(user) {
  state.currentUser = user;
  localStorage.setItem('user', JSON.stringify(user));
}

export function clearUser() {
  state.currentUser = null;
  localStorage.removeItem('user');
}
