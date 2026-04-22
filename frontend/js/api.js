import { API_URL } from './config.js';
import { state } from './state.js';

export async function fetchCompanies() {
  console.log('📡 Fetching companies...');
  try {
    const res = await fetch(`${API_URL}/companies`);
    const json = await res.json();
    if (json.success) state.companies = json.data;
  } catch (err) {
    console.error('❌ API Error (Companies):', err);
  }
}

export async function fetchTrendStats() {
  console.log('📡 Fetching trends...');
  try {
    const res = await fetch(`${API_URL}/stats`);
    const json = await res.json();
    if (json.success) state.trendStats = json.data;
  } catch (err) {
    console.error('❌ API Error (Stats):', err);
  }
}
