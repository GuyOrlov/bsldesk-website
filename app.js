'use strict';
// BSLDesk prototype: fictional sample records only, no persistence or patient information.
const seed = [
  {id:'BSL-001',type:'Outpatient review',date:'Mon 2 Nov · 09:30',place:'North clinic · In person',status:'Awaiting confirmation'},
  {id:'BSL-002',type:'GP consultation',date:'Mon 2 Nov · 11:00',place:'Video appointment',status:'Confirmed'},
  {id:'BSL-003',type:'Follow-up appointment',date:'Tue 3 Nov · 14:15',place:'West clinic · In person',status:'Requested'},
  {id:'BSL-004',type:'Routine assessment',date:'Wed 4 Nov · 10:00',place:'City practice · In person',status:'Awaiting confirmation'},
  {id:'BSL-005',type:'Community appointment',date:'Thu 5 Nov · 13:30',place:'Video appointment',status:'Changed'},
  {id:'BSL-006',type:'Follow-up call',date:'Fri 6 Nov · 15:15',place:'Video appointment',status:'Confirmed'},
  {id:'BSL-007',type:'Routine check-up',date:'Fri 6 Nov · 16:00',place:'East clinic · In person',status:'Cancelled'}
];
const statuses=['Requested','Awaiting confirmation','Confirmed','Changed','Cancelled'];
const statusClass={'Requested':'requested','Awaiting confirmation':'awaiting','Confirmed':'confirmed','Changed':'changed','Cancelled':'cancelled'};
const viewCopy={
  agency:['Agency overview','Track outstanding support and the person responsible for the next step.','Agency booking queue','Try changing a status to see the dashboard update.'],
  reception:['Reception view','A clear picture of support for appointments requested by your team.','Your appointment requests','Follow up with the agency for requests awaiting confirmation.'],
  interpreter:['Interpreter offers','See the status of fictional work offers and confirmed assignments.','Assignment offer view','The actual product would only show offers authorised for your account.']
};
const actions={
  agency:{'Requested':'Agency to review','Awaiting confirmation':'Obtain interpreter reply','Confirmed':'Notify client staff','Changed':'Reconfirm arrangements','Cancelled':'No action'},
  reception:{'Requested':'Await agency review','Awaiting confirmation':'Await agency confirmation','Confirmed':'Notify requester','Changed':'Check new arrangements','Cancelled':'No action'},
  interpreter:{'Requested':'Await agency offer','Awaiting confirmation':'Respond to offer','Confirmed':'Review assignment','Changed':'Check updated details','Cancelled':'No action'}
};
let records=seed.map(x=>({...x}));
function byId(key){return document.getElementById(key);}
function esc(val){return String(val).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderDemo(){
 const role=byId('role-selector').value;
 const selected=byId('status-filter').value;
 const copy=viewCopy[role];
 byId('dashboard-title').textContent=copy[0];
 byId('dashboard-description').textContent=copy[1];
 byId('table-title').textContent=copy[2];
 byId('table-description').textContent=copy[3];
 const confirmed=records.filter(x=>x.status==='Confirmed').length;
 const awaiting=records.filter(x=>x.status==='Awaiting confirmation').length;
 const outstanding=records.filter(x=>['Requested','Awaiting confirmation','Changed'].includes(x.status)).length;
 const active=records.filter(x=>x.status!=='Cancelled').length;
 const metrics=role==='interpreter'?[['Offers awaiting a reply',awaiting],['Confirmed assignments',confirmed],['All sample assignments',active]]:role==='reception'?[['Your sample requests',records.length],['Support confirmed',confirmed],['Not yet confirmed',outstanding]]:[['All sample requests',records.length],['Support confirmed',confirmed],['Needs attention',outstanding]];
 byId('metric-grid').innerHTML=metrics.map(x=>'<div class="metric-card"><span>'+esc(x[0])+'</span><strong>'+x[1]+'</strong><small>Fictional bookings</small></div>').join('');
 const shown=records.filter(x=>selected==='All'||x.status===selected);
 byId('request-rows').innerHTML=shown.length?shown.map(r=>{
   const options=statuses.map(s=>'<option value="'+esc(s)+'"'+(s===r.status?' selected':'')+'>'+esc(s)+'</option>').join('');
   return '<tr><td><span class="request-id">'+esc(r.id)+'</span><span class="request-type">'+esc(r.type)+'</span></td><td><span class="request-when">'+esc(r.date)+'<small>'+esc(r.place)+'</small></span></td><td><span class="status-pill '+statusClass[r.status]+'">'+esc(r.status)+'</span></td><td><span class="row-action">'+esc(actions[role][r.status])+'</span></td><td><select class="status-select" data-id="'+esc(r.id)+'" aria-label="Change status of '+esc(r.id)+'">'+options+'</select></td></tr>';
 }).join(''):'<tr><td class="empty-row" colspan="5">No fictional requests match this filter.</td></tr>';
 byId('status-bars').innerHTML=statuses.map(s=>{
   const n=records.filter(x=>x.status===s).length;
   return '<div class="status-line"><span>'+esc(s)+'</span><div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:'+(100*n/Math.max(records.length,1))+'%"></div></div><strong>'+n+'</strong></div>';
 }).join('');
}
document.addEventListener('DOMContentLoaded',()=>{
 byId('year').textContent=new Date().getFullYear();
 byId('role-selector').addEventListener('change',renderDemo);
 byId('status-filter').addEventListener('change',renderDemo);
 byId('request-rows').addEventListener('change',event=>{
  if(!(event.target instanceof HTMLSelectElement)) return;
  const r=records.find(x=>x.id===event.target.dataset.id);
  if(!r||!statuses.includes(event.target.value)) return;
  r.status=event.target.value;
  byId('demo-message').textContent=r.id+' marked “'+r.status+'” in this demo only. Reload to discard changes.';
  renderDemo();
 });
 byId('reset-demo').addEventListener('click',()=>{
  records=seed.map(x=>({...x}));
  byId('status-filter').value='All';
  byId('demo-message').textContent='Demo reset. Sample records only. Changes are not saved.';
  renderDemo();
 });
 const menu=document.querySelector('.menu-toggle');
 const nav=byId('primary-nav');
 menu.addEventListener('click',()=>{
  const open=menu.getAttribute('aria-expanded')!=='true';
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  nav.classList.toggle('open',open);
 });
 nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  menu.setAttribute('aria-expanded','false');
  menu.setAttribute('aria-label','Open navigation');
  nav.classList.remove('open');
 }));
 renderDemo();
});
