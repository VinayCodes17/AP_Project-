import { ELIG_DATA } from './config.js';
import { state } from './state.js';
import { fetchCompanies } from './api.js';

export function initEligPage() {
  populateBranches();
}

export function populateBranches() {
  const sel = document.getElementById('e_branch');
  if (!sel) return;
  const branches = ELIG_DATA[state.currentEligInst].branches;
  sel.innerHTML = '<option value="">Select branch</option>' + 
    branches.map(b => `<option value="${b}">${b}</option>`).join('');
}

export function setEligInst(el, inst) {
  state.currentEligInst = inst;
  document.querySelectorAll('.inst-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  populateBranches();
  document.getElementById('elig-right').innerHTML = `
    <div class="elig-placeholder">
      <div class="elig-placeholder-icon">🎯</div>
      <p>Fill in your profile and hit <strong>Check My Eligibility</strong>.</p>
    </div>`;
}

export async function runElig() {
  if (state.companies.length === 0) await fetchCompanies();
  if (state.companies.length === 0) return alert('Error: No data found.');

  const branchFull = document.getElementById('e_branch').value;
  if (!branchFull) return alert('Select branch');
  
  const branchKey = ELIG_DATA[state.currentEligInst].keys[branchFull];
  const cgpa = parseFloat(document.getElementById('e_cgpa').value) || 0;
  const backlogs = parseInt(document.getElementById('e_backlogs').value) || 0;
  const tenth = parseFloat(document.getElementById('e_tenth').value) || 0;
  const twelfth = parseFloat(document.getElementById('e_twelfth').value) || 0;
  const oppType = document.getElementById('e_type').value;

  const pool = state.companies.filter(c => {
    if (oppType === 'placement' && c.type !== 'placement') return false;
    if (oppType === 'internship' && c.type !== 'internship') return false;
    return true;
  });

  const results = pool.map(c => {
    const reasons = [];
    if (state.currentEligInst === 'engineering' && !c.branches.includes(branchKey)) reasons.push('Branch not eligible');
    if (cgpa < c.cgpa) reasons.push(`Min CGPA ${c.cgpa} required`);
    if (tenth < c.tenth) reasons.push(`10th ≥${c.tenth}% required`);
    if (twelfth < c.twelfth) reasons.push(`12th ≥${c.twelfth}% required`);
    if (backlogs > c.backlogs) reasons.push('Backlogs not allowed');
    
    return { ...c, eligible: reasons.length === 0, reasons };
  }).sort((a, b) => b.eligible - a.eligible);

  renderEligResults(results);
}

function renderEligResults(results) {
  const eligible = results.filter(r => r.eligible).length;
  const total = results.length;
  const eligRight = document.getElementById('elig-right');
  if (!eligRight) return;

  let html = `
    <div style="margin-bottom:1.25rem">
      <div class="elig-title" style="font-size:1.4rem">Your results</div>
      <div style="font-size:13px;color:var(--gray);margin-top:2px">${eligible} eligible · ${total - eligible} not eligible</div>
    </div>
    <div class="elig-summary">
      <div class="escard" style="background:rgba(0,201,167,0.1);border:1px solid rgba(0,201,167,0.3)"><div class="n" style="color:var(--teal)">${eligible}</div><div class="l" style="color:var(--teal)">Eligible</div></div>
      <div class="escard" style="background:rgba(255,255,255,0.04);border:1px solid var(--border)"><div class="n" style="color:var(--gray)">${total - eligible}</div><div class="l" style="color:var(--gray)">Not eligible</div></div>
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
      </div>
    </div>`).join('');

  eligRight.innerHTML = html;
}
