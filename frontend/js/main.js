import { companies, eligData } from './data.js';
import { Router } from './router.js';

// Configuration
const routes = [
  { path: '#/', page: 'home', id: 'home' },
  { path: '#/about', page: 'about', id: 'about' },
  { path: '#/eligibility', page: 'eligibility', id: 'eligibility' },
  { path: '#/data', page: 'data', id: 'data' },
  { path: '#/contact', page: 'contact', id: 'contact' }
];

// Initialize Router
const router = new Router(routes);

// Global State
let currentEligInst = 'engineering';
let currentDataTab = 'companies';

// Navigation Toggle
const toggleMenu = () => {
  document.getElementById('nav-links').classList.toggle('open');
};

// --- ELIGIBILITY LOGIC ---
const initEligPage = () => {
  populateBranches();
};

const populateBranches = () => {
  const sel = document.getElementById('e_branch');
  if (!sel) return;
  const d = eligData[currentEligInst];
  sel.innerHTML = '<option value="">Select branch</option>' + d.branches.map(b => `<option value="${b}">${b}</option>`).join('');
};

const setEligInst = (el, inst) => {
  currentEligInst = inst;
  document.querySelectorAll('.inst-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  populateBranches();
  document.getElementById('elig-right').innerHTML = `<div class="elig-placeholder"><div class="elig-placeholder-icon">🎯</div><p>Fill in your profile and hit <strong>Check My Eligibility</strong>.</p></div>`;
};

const runElig = () => {
  const branchFull = document.getElementById('e_branch').value;
  if (!branchFull) { alert('Please select your branch.'); return; }
  const branchKey = eligData[currentEligInst].keys[branchFull];
  const cgpa = parseFloat(document.getElementById('e_cgpa').value);
  if (isNaN(cgpa)) { alert('Please enter your CGPA.'); return; }
  const backlogs = parseInt(document.getElementById('e_backlogs').value) || 0;
  const tenth = parseFloat(document.getElementById('e_tenth').value) || 0;
  const twelfth = parseFloat(document.getElementById('e_twelfth').value) || 0;
  const oppType = document.getElementById('e_type').value;

  let pool = companies.filter(c => {
    if (oppType === 'placement' && c.type !== 'placement') return false;
    if (oppType === 'internship' && c.type !== 'internship') return false;
    return true;
  });

  const results = pool.map(c => {
    const reasons = [];
    if (currentEligInst === 'engineering') {
      if (!c.branches.includes(branchKey)) reasons.push('Branch not eligible');
    }
    if (cgpa < c.cgpa) reasons.push(`Min CGPA ${c.cgpa} required`);
    if (tenth && tenth < c.tenth) reasons.push(`10th ≥${c.tenth}% required`);
    if (twelfth && twelfth < c.twelfth) reasons.push(`12th ≥${c.twelfth}% required`);
    if (backlogs > c.backlogs) reasons.push('Active backlogs not allowed');
    return { ...c, eligible: reasons.length === 0, reasons };
  }).sort((a, b) => b.eligible - a.eligible);

  const eligCount = results.filter(r => r.eligible).length;
  const notCount = results.length - eligCount;

  let html = `<div style="margin-bottom:1.25rem"><div class="elig-title" style="font-size:1.4rem">Your results</div><div style="font-size:13px;color:var(--gray);margin-top:2px">${eligCount} eligible · ${notCount} not eligible</div></div>
  <div class="elig-summary">
    <div class="escard" style="background:rgba(0,201,167,0.1);border:1px solid rgba(0,201,167,0.3)"><div class="n" style="color:var(--teal)">${eligCount}</div><div class="l" style="color:var(--teal)">Eligible</div></div>
    <div class="escard" style="background:rgba(255,255,255,0.04);border:1px solid var(--border)"><div class="n" style="color:var(--gray)">${notCount}</div><div class="l" style="color:var(--gray)">Not eligible</div></div>
  </div>`;

  html += results.map(r => `
    <div class="co-row ${r.eligible ? 'elig' : 'nelig'}">
      <div class="co-av" style="background:${r.color}22;color:${r.color}">${r.logo}</div>
      <div style="flex:1">
        <div class="co-nm">${r.name} <span class="pill ${r.type === 'placement' ? 'pill-blue' : 'pill-amber'}" style="margin-left:4px">${r.type === 'placement' ? 'Placement' : 'Internship'}</span></div>
        <div class="co-rl">${r.role}</div>
        ${!r.eligible ? `<div class="co-miss">${r.reasons.join(' · ')}</div>` : ''}
      </div>
      <div class="co-pkg">
        <span class="${r.eligible ? 'co-badge-e' : 'co-badge-n'}">${r.eligible ? 'Eligible' : 'No'}</span>
        <div class="p" style="margin-top:4px">${r.package}</div>
        <div class="t">package</div>
      </div>
    </div>`).join('');

  document.getElementById('elig-right').innerHTML = html;
};

// --- DATA LOGIC ---
const initDataPage = () => {
  const placements = companies.filter(c => c.type === 'placement');
  const interns = companies.filter(c => c.type === 'internship');
  const statsEl = document.getElementById('d-stats');
  if (!statsEl) return;
  
  statsEl.innerHTML = `
    <div class="sc"><div class="sc-lbl">Total companies</div><div class="sc-val">${companies.length}</div><div class="sc-sub">All time</div></div>
    <div class="sc"><div class="sc-lbl">Placement offers</div><div class="sc-val accent">${placements.length}</div><div class="sc-sub">Full-time roles</div></div>
    <div class="sc"><div class="sc-lbl">Internship offers</div><div class="sc-val teal">${interns.length}</div><div class="sc-sub">Stipend roles</div></div>
    <div class="sc"><div class="sc-lbl">Highest package</div><div class="sc-val accent">42 LPA</div><div class="sc-sub">Microsoft</div></div>
    <div class="sc"><div class="sc-lbl">Avg CTC (2024)</div><div class="sc-val">8.4 LPA</div><div class="sc-sub">B.Tech branch</div></div>`;
  renderCompaniesTab();
};

const setDataTab = (tab, el) => {
  currentDataTab = tab;
  document.querySelectorAll('.dtab').forEach(d => d.classList.remove('active'));
  el.classList.add('active');
  if (tab === 'companies') renderCompaniesTab();
  if (tab === 'trends') renderTrendsTab();
  if (tab === 'internships') renderInternshipsTab();
};

const renderCompaniesTab = () => {
  const content = document.getElementById('data-content');
  if (!content) return;
  content.innerHTML = `
    <div class="filter-strip">
      <input type="text" id="co-search" placeholder="Search company or role..." />
      <select id="co-sector"><option value="all">All sectors</option><option>Product</option><option>IT</option><option>Finance</option><option>Consulting</option><option>Core</option></select>
      <select id="co-year"><option value="all">All years</option><option>2023-24</option><option>2022-23</option><option>2021-22</option></select>
    </div>
    <div style="overflow-x:auto">
    <table class="co-table" id="co-table">
      <thead><tr><th>Company</th><th>Role</th><th>Sector</th><th>Branches</th><th>Min CGPA</th><th>Package</th><th>Year</th></tr></thead>
      <tbody id="co-tbody"></tbody>
    </table></div>`;
  
  // Attach listeners manually since we avoid inline JS where possible
  document.getElementById('co-search').addEventListener('input', filterTable);
  document.getElementById('co-sector').addEventListener('change', filterTable);
  document.getElementById('co-year').addEventListener('change', filterTable);
  
  filterTable();
};

const filterTable = () => {
  const srch = (document.getElementById('co-search')?.value || '').toLowerCase();
  const sec = document.getElementById('co-sector')?.value || 'all';
  const yr = document.getElementById('co-year')?.value || 'all';
  const placements = companies.filter(c => {
    if (c.type !== 'placement') return false;
    if (sec !== 'all' && c.sector !== sec) return false;
    if (yr !== 'all' && c.year !== yr) return false;
    if (srch && !c.name.toLowerCase().includes(srch) && !c.role.toLowerCase().includes(srch)) return false;
    return true;
  });
  const sectorColors = { Product: 'pill-green', IT: 'pill-blue', Finance: 'pill-amber', Consulting: 'pill-purple', Core: 'pill-red' };
  const tbody = document.getElementById('co-tbody');
  if (!tbody) return;
  tbody.innerHTML = placements.length ? placements.map(c => `<tr>
    <td><span style="display:inline-flex;align-items:center;gap:8px"><span style="width:28px;height:28px;border-radius:6px;background:${c.color}22;color:${c.color};display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:700">${c.logo}</span>${c.name}</span></td>
    <td>${c.role}</td>
    <td><span class="pill ${sectorColors[c.sector] || 'pill-blue'}">${c.sector}</span></td>
    <td style="font-size:12px">${c.branches.join(', ')}</td>
    <td>${c.cgpa}</td>
    <td class="pkg-cell">${c.package}</td>
    <td style="color:var(--gray)">${c.year}</td>
  </tr>`).join('') : `<tr><td colspan="7" class="no-data">No matching companies found.</td></tr>`;
};

const renderTrendsTab = () => {
  const yearData = [{ y: '2019–20', n: 198 }, { y: '2020–21', n: 212 }, { y: '2021–22', n: 245 }, { y: '2022–23', n: 289 }, { y: '2023–24', n: 312 }];
  const sectors = [{ s: 'IT / Software', n: 142, c: '#4db8ff' }, { s: 'Product', n: 62, c: '#00c9a7' }, { s: 'Core Engineering', n: 54, c: '#ff9966' }, { s: 'Finance', n: 28, c: '#ffd166' }, { s: 'Consulting', n: 26, c: '#c084fc' }];
  const branches = [{ b: 'CSE', v: 14.2, c: '#f4a623' }, { b: 'IT', v: 12.1, c: '#f4a623' }, { b: 'ECE', v: 8.4, c: '#f4a623' }, { b: 'EEE', v: 6.5, c: '#f4a623' }, { b: 'Mech', v: 5.8, c: '#f4a623' }, { b: 'Civil', v: 4.9, c: '#f4a623' }];
  const mxY = 320, mxS = 150, mxB = 16;
  document.getElementById('data-content').innerHTML = `
    <div class="chart-row">
      <div class="chart-box">
        <h3>Students placed per year</h3>
        ${yearData.map(r => `<div class="bar-row"><div class="bar-lbl">${r.y}</div><div class="bar-wrap"><div class="bar-fill" style="width:${Math.round(r.n / mxY * 100)}%;background:#4db8ff;color:var(--navy)">${r.n}</div></div></div>`).join('')}
      </div>
      <div class="chart-box">
        <h3>Top sectors — 2023–24</h3>
        ${sectors.map(r => `<div class="bar-row"><div class="bar-lbl" style="min-width:110px">${r.s}</div><div class="bar-wrap"><div class="bar-fill" style="width:${Math.round(r.n / mxS * 100)}%;background:${r.c};color:var(--navy)">${r.n}</div></div></div>`).join('')}
      </div>
    </div>
    <div class="chart-box" style="max-width:600px">
      <h3>Average CTC by branch — 2023–24 (LPA)</h3>
      ${branches.map(r => `<div class="bar-row"><div class="bar-lbl">${r.b}</div><div class="bar-wrap"><div class="bar-fill" style="width:${Math.round(r.v / mxB * 100)}%;background:${r.c};color:var(--navy)">${r.v} L</div></div><div class="bar-num">${r.v}</div></div>`).join('')}
    </div>`;
};

const renderInternshipsTab = () => {
  const interns = companies.filter(c => c.type === 'internship');
  const sectorColors = { Product: 'pill-green', IT: 'pill-blue', Finance: 'pill-amber', Consulting: 'pill-purple', Core: 'pill-red' };
  document.getElementById('data-content').innerHTML = `
    <div style="overflow-x:auto">
    <table class="co-table">
      <thead><tr><th>Company</th><th>Role</th><th>Sector</th><th>Branches</th><th>Min CGPA</th><th>Stipend</th><th>Year</th></tr></thead>
      <tbody>${interns.map(c => `<tr>
        <td><span style="display:inline-flex;align-items:center;gap:8px"><span style="width:28px;height:28px;border-radius:6px;background:${c.color}22;color:${c.color};display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:700">${c.logo}</span>${c.name}</span></td>
        <td>${c.role}</td>
        <td><span class="pill ${sectorColors[c.sector] || 'pill-blue'}">${c.sector}</span></td>
        <td style="font-size:12px">${c.branches.join(', ')}</td>
        <td>${c.cgpa}</td>
        <td class="pkg-cell">${c.package}</td>
        <td style="color:var(--gray)">${c.year}</td>
      </tr>`).join('')}</tbody>
    </table></div>`;
};

// --- CONTACT LOGIC ---
const submitForm = () => {
  const msg = document.getElementById('success-msg');
  if (msg) {
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none' }, 5000);
  }
};

const toggleFaq = (el) => {
  el.classList.toggle('open');
};

// --- ROUTER EVENT LISTENER ---
window.addEventListener('pageLoaded', (e) => {
  const page = e.detail.page;
  if (page === 'eligibility') initEligPage();
  if (page === 'data') initDataPage();
  
  // Re-attach listeners for buttons in newly loaded fragments
  // (We can use event delegation too, but some are easier to attach directly if small)
});

// Event Delegation for Navigation & Global Actions
document.addEventListener('click', (e) => {
  // Mobile Menu Toggle
  if (e.target.id === 'hamburger' || e.target.closest('#hamburger')) {
    toggleMenu();
  }
  
  // Close menu on link click
  if (e.target.classList.contains('nav-link')) {
    document.getElementById('nav-links').classList.remove('open');
  }

  // Home CTA routes
  if (e.target.dataset.route) {
    window.location.hash = `#/${e.target.dataset.route}`;
  }
});

// Expose necessary functions to window for any remaining inline onclicks
// (Progressively moving away from this as we clean up fragments)
window.showPage = (id) => { window.location.hash = `#/${id}`; };
window.setEligInst = setEligInst;
window.runElig = runElig;
window.setDataTab = setDataTab;
window.submitForm = submitForm;
window.toggleFaq = toggleFaq;
