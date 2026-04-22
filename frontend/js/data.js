import { state } from './state.js';
import { fetchTrendStats } from './api.js';

export function initDataPage() {
  const statsEl = document.getElementById('d-stats');
  if (!statsEl) return;

  if (state.companies.length === 0) {
    statsEl.innerHTML = `<div class="sc" style="grid-column:1/-1;text-align:center"><div class="sc-lbl">Notice</div><div class="sc-val" style="font-size:1.2rem">No data available. Check server.</div></div>`;
    return;
  }

  const placements = state.companies.filter(c => c.type === 'placement');
  const interns = state.companies.filter(c => c.type === 'internship');

  statsEl.innerHTML = `
    <div class="sc"><div class="sc-lbl">Total companies</div><div class="sc-val">${state.companies.length}</div><div class="sc-sub">All time</div></div>
    <div class="sc"><div class="sc-lbl">Placement offers</div><div class="sc-val accent">${placements.length}</div><div class="sc-sub">Full-time</div></div>
    <div class="sc"><div class="sc-lbl">Internship offers</div><div class="sc-val teal">${interns.length}</div><div class="sc-sub">Stipend roles</div></div>
    <div class="sc"><div class="sc-lbl">Active Recruiting</div><div class="sc-val accent">${state.companies.filter(c => c.year === '2023-24').length}</div><div class="sc-sub">2023-24 Cycle</div></div>
    <div class="sc"><div class="sc-lbl">Avg CGPA Req</div><div class="sc-val">6.8</div><div class="sc-sub">Across sectors</div></div>`;

  renderCompaniesTab();
}

export function setDataTab(tab, el) {
  state.activeDataTab = tab;
  document.querySelectorAll('.dtab').forEach(d => d.classList.remove('active'));
  el.classList.add('active');

  if (tab === 'companies') renderCompaniesTab();
  if (tab === 'trends') state.trendStats ? renderTrendsTab() : fetchTrendStats().then(renderTrendsTab);
  if (tab === 'internships') renderInternshipsTab();
}

export function renderCompaniesTab() {
  const content = document.getElementById('data-content');
  if (!content) return;

  content.innerHTML = `
    <div class="filter-strip">
      <input type="text" id="co-search" placeholder="Search company or role..." />
      <select id="co-sector"><option value="all">All sectors</option><option>Product</option><option>IT</option><option>Finance</option><option>Consulting</option><option>Core</option></select>
      <select id="co-year"><option value="all">All years</option><option>2023-24</option><option>2022-23</option><option>2021-22</option></select>
    </div>
    <div style="overflow-x:auto">
      <table class="co-table">
        <thead><tr><th>Company</th><th>Role</th><th>Sector</th><th>Branches</th><th>Min CGPA</th><th>Year</th></tr></thead>
        <tbody id="co-tbody"></tbody>
      </table>
    </div>`;

  document.getElementById('co-search').addEventListener('input', filterDataTable);
  document.getElementById('co-sector').addEventListener('change', filterDataTable);
  document.getElementById('co-year').addEventListener('change', filterDataTable);

  filterDataTable();
}

export function filterDataTable() {
  const search = (document.getElementById('co-search')?.value || '').toLowerCase();
  const sector = document.getElementById('co-sector')?.value || 'all';
  const year = document.getElementById('co-year')?.value || 'all';

  const filtered = state.companies.filter(c => {
    if (c.type !== 'placement') return false;
    if (sector !== 'all' && c.sector !== sector) return false;
    if (year !== 'all' && c.year !== year) return false;
    if (search && !c.name.toLowerCase().includes(search) && !c.role.toLowerCase().includes(search)) return false;
    return true;
  });

  const sectorColors = { Product: 'pill-green', IT: 'pill-blue', Finance: 'pill-amber', Consulting: 'pill-purple', Core: 'pill-red' };
  const tbody = document.getElementById('co-tbody');
  if (!tbody) return;

  tbody.innerHTML = filtered.length ? filtered.map(c => `
    <tr>
      <td><span style="display:inline-flex;align-items:center;gap:8px"><span style="width:28px;height:28px;border-radius:6px;background:${c.color}22;color:${c.color};display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:700">${c.logo}</span>${c.name}</span></td>
      <td>${c.role}</td>
      <td><span class="pill ${sectorColors[c.sector] || 'pill-blue'}">${c.sector}</span></td>
      <td style="font-size:12px">${c.branches.join(', ')}</td>
      <td>${c.cgpa}</td>
      <td style="color:var(--gray)">${c.year}</td>
    </tr>`).join('') : `<tr><td colspan="6" class="no-data">No results found.</td></tr>`;
}

export function renderTrendsTab() {
  const content = document.getElementById('data-content');
  if (!content) return;
  if (!state.trendStats) return content.innerHTML = `<div class="no-data">Loading...</div>`;

  const { yearData, sectors, branches } = state.trendStats;
  const mxY = Math.max(...yearData.map(r => r.n), 1);
  const mxS = Math.max(...sectors.map(r => r.n), 1);
  const mxB = Math.max(...branches.map(r => r.v), 1);

  content.innerHTML = `
    <div class="chart-row">
      <div class="chart-box">
        <h3>Students placed per year</h3>
        ${yearData.map(r => `<div class="bar-row"><div class="bar-lbl">${r.y}</div><div class="bar-wrap"><div class="bar-fill" style="width:${Math.round(r.n / mxY * 100)}%;background:#4db8ff;color:var(--navy)">${r.n}</div></div></div>`).join('')}
      </div>
      <div class="chart-box">
        <h3>Top sectors</h3>
        ${sectors.map(r => `<div class="bar-row"><div class="bar-lbl" style="min-width:110px">${r.s}</div><div class="bar-wrap"><div class="bar-fill" style="width:${Math.round(r.n / mxS * 100)}%;background:${r.c};color:var(--navy)">${r.n}</div></div></div>`).join('')}
      </div>
    </div>
    <div class="chart-box" style="max-width:600px">
      <h3>Avg CTC by branch (LPA)</h3>
      ${branches.map(r => `<div class="bar-row"><div class="bar-lbl">${r.b}</div><div class="bar-wrap"><div class="bar-fill" style="width:${Math.round(r.v / mxB * 100)}%;background:${r.c};color:var(--navy)">${r.v} L</div></div></div>`).join('')}
    </div>`;
}

export function renderInternshipsTab() {
  const interns = state.companies.filter(c => c.type === 'internship');
  const sectorColors = { Product: 'pill-green', IT: 'pill-blue', Finance: 'pill-amber', Consulting: 'pill-purple', Core: 'pill-red' };

  const content = document.getElementById('data-content');
  if (!content) return;

  content.innerHTML = `
    <div style="overflow-x:auto">
      <table class="co-table">
        <thead><tr><th>Company</th><th>Role</th><th>Sector</th><th>Branches</th><th>Min CGPA</th><th>Year</th></tr></thead>
        <tbody>${interns.map(c => `
          <tr>
            <td><span style="display:inline-flex;align-items:center;gap:8px"><span style="width:28px;height:28px;border-radius:6px;background:${c.color}22;color:${c.color};display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:700">${c.logo}</span>${c.name}</span></td>
            <td>${c.role}</td>
            <td><span class="pill ${sectorColors[c.sector] || 'pill-blue'}">${c.sector}</span></td>
            <td style="font-size:12px">${c.branches.join(', ')}</td>
            <td>${c.cgpa}</td>
            <td style="color:var(--gray)">${c.year}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}
