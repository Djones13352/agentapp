import React, { useState, useEffect } from "react";

// ── Persistent state hook — saves to localStorage ─────────────
function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch { return defaultValue; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch {}
  }, [key, value]);
  return [value, setValue];
}

// ── Theme — Steel Blue Professional (default) ────────────────
const T_BASE = {
  navy:      "#0369A1",
  navyMid:   "#0284C7",
  blue:      "#0284C7",
  blueLight: "#7DD3FC",
  blueDim:   "#0284C722",
  green:     "#10B981",
  greenDim:  "#10B98122",
  red:       "#EF4444",
  amber:     "#F59E0B",
  white:     "#ffffff",
  gold:      "#0284C7",
  goldLight: "#7DD3FC",
};

var T = {
  ...T_BASE,
  bg:      "#F0F9FF",
  surface: "#ffffff",
  card:    "#E0F2FE",
  border:  "#BAE6FD",
  text:    "#0C4A6E",
  sub:     "#0369A1",
  muted:   "#7DD3FC",
};

function applyBgTheme(bg) {
  T = { ...T_BASE, ...bg };
}

// Color themes agents can pick from
const BG_THEMES = [
  { name:"Steel Blue",    nav:"#0369A1", hero:"#0369A1", bg:"#F0F9FF", surface:"#ffffff", card:"#E0F2FE", border:"#BAE6FD", text:"#0C4A6E", sub:"#0369A1", muted:"#7DD3FC" },
  { name:"Deep Navy",     nav:"#0B1F3A", hero:"#0B1F3A", bg:"#F8FAFC", surface:"#ffffff", card:"#F1F5F9", border:"#E2E8F0", text:"#0F172A", sub:"#475569", muted:"#94A3B8" },
  { name:"Electric Blue", nav:"#2563EB", hero:"#2563EB", bg:"#EFF6FF", surface:"#ffffff", card:"#DBEAFE", border:"#BFDBFE", text:"#1E3A8A", sub:"#1D4ED8", muted:"#93C5FD" },
  { name:"Teal",          nav:"#0D9488", hero:"#0D9488", bg:"#F0FDFA", surface:"#ffffff", card:"#CCFBF1", border:"#99F6E4", text:"#134E4A", sub:"#0F766E", muted:"#5EEAD4" },
  { name:"Slate",         nav:"#4F46E5", hero:"#4F46E5", bg:"#EEF2FF", surface:"#ffffff", card:"#E0E7FF", border:"#C7D2FE", text:"#312E81", sub:"#4338CA", muted:"#A5B4FC" },
  { name:"Forest",        nav:"#166534", hero:"#166534", bg:"#F0FDF4", surface:"#ffffff", card:"#DCFCE7", border:"#BBF7D0", text:"#14532D", sub:"#15803D", muted:"#86EFAC" },
  { name:"Crimson",       nav:"#9F1239", hero:"#9F1239", bg:"#FFF1F2", surface:"#ffffff", card:"#FFE4E6", border:"#FECDD3", text:"#881337", sub:"#BE123C", muted:"#FDA4AF" },
  { name:"Dark Mode",     nav:"#111827", hero:"#1F2937", bg:"#111827", surface:"#1F2937", card:"#374151", border:"#4B5563", text:"#F9FAFB", sub:"#D1D5DB", muted:"#9CA3AF" },
  { name:"Warm Gold",     nav:"#92400E", hero:"#92400E", bg:"#FFFBEB", surface:"#ffffff", card:"#FEF3C7", border:"#FDE68A", text:"#78350F", sub:"#B45309", muted:"#FCD34D" },
  { name:"Coverage Firm", nav:"#0B3C5D", hero:"#0B3C5D", bg:"#F0F9FF", surface:"#ffffff", card:"#E0F2FE", border:"#BAE6FD", text:"#0C4A6E", sub:"#0369A1", muted:"#7DD3FC" },
];

// ── All insurance lines including P&C ────────────────────────
const LINE_GROUPS = {
  "Life & Health": ["Health & ACA","Medicare","Life & Annuities","Final Expense","Preneed / Burial","Supplemental","Dental & Vision","Disability","Long-Term Care","Critical Illness","Hospital Indemnity","Employer Benefits"],
  "Property & Casualty": ["Auto","Homeowners","Renters","Commercial Auto","General Liability","Commercial Property","Workers Comp","Umbrella / Excess","Flood","Cyber Liability","Professional Liability (E&O)","Bonds & Surety"],
  "Specialty": ["Pet Insurance","Travel Insurance","Farm & Ranch","Marine","Title Insurance"],
};
const LINES = Object.values(LINE_GROUPS).flat();
const PC_LINES = LINE_GROUPS["Property & Casualty"];

// ── Carrier Link Types ────────────────────────────────────────
const LINK_TYPES = [
  {id:"login",      label:"Agent Login",      icon:"🔐", color:"#1a2744"},
  {id:"quoting",    label:"Quoting Tool",     icon:"📊", color:"#2d7a4f"},
  {id:"enrollment", label:"Enrollment Portal",icon:"📋", color:"#c9a84c"},
  {id:"commission", label:"Commission Portal",icon:"💰", color:"#c0392b"},
  {id:"training",   label:"Training / Cert",  icon:"🎓", color:"#5a3a7a"},
  {id:"marketing",  label:"Marketing Portal", icon:"📣", color:"#0a1f3c"},
  {id:"other",      label:"Other",            icon:"🔗", color:"#5a5a7a"},
];

// ── Quote Status ──────────────────────────────────────────────
const QUOTE_STATUSES = [
  {id:"open",       label:"Open",       icon:"○", color:"#1a2744"},
  {id:"pending",    label:"Pending",    icon:"◐", color:"#d4850a"},
  {id:"closed_won", label:"Closed Won", icon:"✓", color:"#2d7a4f"},
  {id:"closed_lost",label:"Closed Lost",icon:"✕", color:"#c0392b"},
];
const isPCLine = (line) => PC_LINES.includes(line);

const SAMPLE_CARRIERS = [
  // Life & Health
  { id:1,  name:"Aetna",            line:"Health & ACA",                  color:"#7B2D8B", logo:"A",  phone:"1-800-872-3862", portal:"https://producer.aetna.com",          override:"8%", overrides:[{product:"Health Plans",rate:"8%"}],  notes:"Strong network in TN. Good HMO options.",                    contracts:["TN","AL","MS"] },
  { id:2,  name:"Mutual of Omaha",  line:"Medicare",                      color:"#003087", logo:"M",  phone:"1-800-775-7896", portal:"https://mutualofomaha.com/agent",      override:"22%", overrides:[{product:"Plan G",rate:"22%"},{product:"Plan N",rate:"20%"},{product:"Plan F",rate:"18%"}], notes:"Best Medigap rates for Plan G. Fast underwriting.",           contracts:["TN","AL"] },
  { id:3,  name:"Colonial Life",    line:"Supplemental",                  color:"#C8102E", logo:"C",  phone:"1-800-325-4368", portal:"https://coloniallife.com/agents",      override:"15%", overrides:[{product:"Accident",rate:"15%"},{product:"Critical Illness",rate:"15%"},{product:"Hospital",rate:"12%"},{product:"Life",rate:"10%"}], notes:"Worksite specialist. Strong accident & critical illness.",     contracts:["TN","MS","AL","KY"] },
  { id:4,  name:"Midland National", line:"Life & Annuities",              color:"#00558C", logo:"MN", phone:"1-800-923-3223", portal:"https://midlandnational.com/agent",    override:"80%", notes:"Guaranteed IUL strong performer. Good annuity rates.", contracts:["TN"], overrides:[{product:"IUL",rate:"80%"},{product:"Term",rate:"75%"},{product:"Annuity",rate:"70%"}] },
  { id:5,  name:"Illinois Mutual",  line:"Disability",                    color:"#2E7D32", logo:"IM", phone:"1-800-437-7355", portal:"https://illinoismutual.com/agents",    override:"10%", overrides:[{product:"DI - Short Term",rate:"10%"},{product:"DI - Long Term",rate:"10%"}], notes:"Best DI for small business owners.",                           contracts:["TN","AL"] },
  { id:6,  name:"Assurity",         line:"Life & Annuities",              color:"#1565C0", logo:"AS", phone:"1-800-869-0355", portal:"https://assurity.com/agents",          override:"11%", overrides:[{product:"Term Life",rate:"11%"},{product:"Simplified Issue",rate:"11%"}], notes:"Simplified issue life. Good for hard to place cases.",         contracts:["TN"] },
  // Property & Casualty
  { id:7,  name:"State Auto",       line:"Homeowners",                    color:"#B71C1C", logo:"SA", phone:"1-800-444-9950", portal:"https://stateauto.com/agents",         override:"12%", overrides:[{product:"Homeowners",rate:"12%"},{product:"Auto",rate:"10%"}], notes:"Competitive HO3 rates in TN. Good for standard risks.",        contracts:["TN","AL","MS","KY"] },
  { id:8,  name:"Progressive",      line:"Auto",                          color:"#0066CC", logo:"PR", phone:"1-800-776-4737", portal:"https://agents.progressive.com",       override:"10%", overrides:[{product:"Personal Auto",rate:"10%"},{product:"Commercial Auto",rate:"9%"}], notes:"Strong non-standard auto. Snapshot discount program.",         contracts:["TN","AL","MS"] },
  { id:9,  name:"Travelers",        line:"Commercial Property",           color:"#C8102E", logo:"TR", phone:"1-800-842-5075", portal:"https://agents.travelers.com",         override:"13%", overrides:[{product:"BOP",rate:"13%"},{product:"Commercial Property",rate:"12%"},{product:"GL",rate:"11%"}], notes:"Best for commercial BOP. Strong small biz appetite.",           contracts:["TN","AL"] },
  { id:10, name:"Employers",        line:"Workers Comp",                  color:"#2E7D32", logo:"EM", phone:"1-888-682-6671", portal:"https://employers.com/agents",         override:"9%", overrides:[{product:"Workers Comp",rate:"9%"}],  notes:"Specialist in small business WC. Fast quote turnaround.",      contracts:["TN","AL","MS"] },
  { id:11, name:"Markel",           line:"Professional Liability (E&O)",  color:"#5B2C6F", logo:"MK", phone:"1-800-362-7535", portal:"https://markel.com/agents",            override:"14%", overrides:[{product:"E&O",rate:"14%"},{product:"D&O",rate:"12%"}], notes:"Strong E&O for real estate, consultants, tech.",               contracts:["TN","AL"] },
  { id:12, name:"Neptune Flood",    line:"Flood",                         color:"#0277BD", logo:"NF", phone:"1-877-815-4832", portal:"https://neptune.com/agents",           override:"15%", overrides:[{product:"Residential Flood",rate:"15%"},{product:"Commercial Flood",rate:"13%"}], notes:"Private flood alternative to NFIP. Fast bind.",                contracts:["TN","AL","MS","KY"] },
];

const SAMPLE_CLIENTS = [
  { id:1, name:"James Stovall",          age:63,   phone:"901-555-0142", email:"jstovall@email.com",     line:"Medicare",                 status:"Active",   lastContact:"2025-05-12", notes:"Turning 65 in August. Interested in Plan G. Has diabetes.", quotes:[] },
  { id:2, name:"Ripley School District", age:null, phone:"731-555-0198", email:"hr@ripleyschools.org",   line:"Supplemental",             status:"Prospect", lastContact:"2025-05-28", notes:"150 employees. Currently with MetLife. Decision in Sept.", quotes:[] },
  { id:3, name:"Maria Gonzalez",         age:42,   phone:"901-555-0277", email:"mgonzalez@email.com",   line:"Health & ACA",             status:"Active",   lastContact:"2025-06-01", notes:"Self-employed. 2 dependents. Income ~$52k.", quotes:[] },
  { id:4, name:"Derek & Tina Williams",  age:38,   phone:"901-555-0310", email:"dwilliams@email.com",   line:"Homeowners",               status:"Active",   lastContact:"2025-05-20", notes:"New home purchase. $285k dwelling. Needs HO3 + auto bundle.", quotes:[] },
  { id:5, name:"Precision Auto Repair",  age:null, phone:"731-555-0422", email:"info@precisionauto.com", line:"General Liability",        status:"Prospect", lastContact:"2025-05-30", notes:"5 employees. Needs GL + garage keepers. ~$450k revenue.", quotes:[] },
  { id:6, name:"Sandra Keith",           age:55,   phone:"901-555-0588", email:"skeith@email.com",      line:"Auto",                     status:"Active",   lastContact:"2025-06-02", notes:"3 vehicles. Teen driver. Looking to bundle with renters.", quotes:[] },
  { id:7, name:"Henderson Family",       age:72,   phone:"731-555-0611", email:"henderson@email.com",   line:"Preneed / Burial",         status:"Prospect", lastContact:"2025-06-01", notes:"Referred by funeral home. Husband 72, wife 68. Looking for $15k preneed each. Interested in irrevocable assignment.", quotes:[] },
];

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;500;700&family=Courier+Prime:wght@400;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:#f0ede6;}
  ::-webkit-scrollbar-thumb{background:#c9a84c;border-radius:2px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes shimmer{0%{opacity:0.6}50%{opacity:1}100%{opacity:0.6}}
  @media print {
    body { background: white !important; }
    .no-print { display: none !important; }
    .print-only { display: block !important; }
    .print-page { page-break-inside: avoid; }
  }
  .print-only { display: none; }
`;

// ── Helpers ───────────────────────────────────────────────────
const statusColor = s => s==="Active"?T.green:s==="Prospect"?T.amber:T.muted;
const lineColor = l => {
  const map = {
    // Life & Health
    "Health & ACA":"#7B2D8B","Medicare":"#003087","Life & Annuities":"#00558C",
    "Supplemental":"#C8102E","Dental & Vision":"#2E7D32","Disability":"#C8630A",
    "Long-Term Care":"#5B2C6F","Critical Illness":"#AD1457","Hospital Indemnity":"#6A1B9A","Final Expense":"#795548","Preneed / Burial":"#4E342E",
    // Property & Casualty
    "Auto":"#1565C0","Homeowners":"#BF360C","Renters":"#E65100",
    "Commercial Auto":"#0D47A1","General Liability":"#1B5E20","Commercial Property":"#33691E",
    "Workers Comp":"#F57F17","Umbrella / Excess":"#4A148C","Flood":"#006064",
    "Cyber Liability":"#212121","Professional Liability (E&O)":"#880E4F","Bonds & Surety":"#4E342E",
    // Specialty
    "Pet Insurance":"#2E7D32","Travel Insurance":"#00838F","Farm & Ranch":"#558B2F",
    "Marine":"#01579B","Title Insurance":"#3E2723",
  };
  return map[l]||"#0B1F3A";
};

// ── Carrier Card ──────────────────────────────────────────────
function CarrierCard({ carrier, onClick }) {
  return (
    <div onClick={onClick} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:18, cursor:"pointer", transition:"all 0.2s", animation:"fadeUp 0.3s ease" }}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 8px 32px rgba(26,39,68,0.12)`;e.currentTarget.style.transform="translateY(-2px)";}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
        <div style={{width:44,height:44,borderRadius:12,background:carrier.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:13,fontWeight:700,fontFamily:"'Lato',sans-serif",flexShrink:0}}>
          {carrier.logo}
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>{carrier.name}</div>
          <div style={{fontSize:11,color:"#fff",background:lineColor(carrier.line),padding:"2px 8px",borderRadius:20,display:"inline-block",marginTop:3,fontFamily:"'Lato',sans-serif",fontWeight:600}}>{carrier.line}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",marginBottom:3}}>Override</div>
          {carrier.overrides?.length>0
            ? carrier.overrides.slice(0,2).map((o,i)=>(
                <div key={i} style={{fontSize:11,fontFamily:"'Courier Prime',monospace",color:T.gold,lineHeight:1.4}}>
                  <span style={{fontWeight:700}}>{o.rate}</span>
                  <span style={{fontSize:10,color:T.muted}}> {o.product}</span>
                </div>
              ))
            : <div style={{fontSize:18,fontWeight:700,color:T.gold,fontFamily:"'Courier Prime',monospace"}}>{carrier.override}</div>
          }
          {carrier.overrides?.length>2 && <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif"}}>+{carrier.overrides.length-2} more</div>}
        </div>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {carrier.contracts.map(s=>(
          <span key={s} style={{fontSize:10,background:T.bg,border:`1px solid ${T.border}`,color:T.sub,padding:"2px 7px",borderRadius:4,fontFamily:"'Lato',sans-serif",fontWeight:600}}>{s}</span>
        ))}
      </div>
      <div style={{marginTop:10,fontSize:12,color:T.sub,fontFamily:"'Lato',sans-serif",lineHeight:1.5,borderTop:`1px solid ${T.border}`,paddingTop:10}}>{carrier.notes}</div>
    </div>
  );
}

// ── Carrier Detail Modal ──────────────────────────────────────
function CarrierModal({ carrier, onClose, onEdit, onDeleteRequest }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(26,39,68,0.5)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20,animation:"fadeIn 0.2s ease"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.surface,borderRadius:24,padding:28,width:"100%",maxWidth:480,maxHeight:"85vh",overflowY:"auto",animation:"fadeUp 0.3s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
          <div style={{width:56,height:56,borderRadius:16,background:carrier.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:16,fontWeight:700,fontFamily:"'Lato',sans-serif"}}>{carrier.logo}</div>
          <div>
            <div style={{fontSize:22,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>{carrier.name}</div>
            <div style={{fontSize:12,color:"#fff",background:lineColor(carrier.line),padding:"3px 10px",borderRadius:20,display:"inline-block",marginTop:4,fontFamily:"'Lato',sans-serif",fontWeight:600}}>{carrier.line}</div>
          </div>
          <button onClick={onClose} style={{marginLeft:"auto",background:T.bg,border:`1px solid ${T.border}`,borderRadius:10,width:34,height:34,cursor:"pointer",fontSize:16,color:T.muted}}>✕</button>
        </div>

        {[
          {label:"Agent Phone", value:carrier.phone},
          {label:"Licensed States", value:carrier.contracts.join(", ")},
        ].map(({label,value})=>(
          <div key={label} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:`1px solid ${T.border}`}}>
            <div>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1}}>{label}</div>
              <div style={{fontSize:15,color:T.navy,fontFamily:"'Lato',sans-serif",fontWeight:600,marginTop:2}}>{value}</div>
            </div>
          </div>
        ))}
        {/* Commission / Override breakdown */}
        <div style={{padding:"12px 0",borderBottom:`1px solid ${T.border}`}}>
          <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Commission / Override by Product</div>
          {(carrier.overrides||[{product:"All Products",rate:carrier.override}]).map((o,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:i%2===0?T.bg:T.surface,borderRadius:8,marginBottom:4}}>
              <span style={{fontSize:13,color:T.sub,fontFamily:"'Lato',sans-serif"}}>{o.product}</span>
              <span style={{fontSize:16,fontWeight:700,color:T.gold,fontFamily:"'Courier Prime',monospace"}}>{o.rate}</span>
            </div>
          ))}
        </div>

        <div style={{marginTop:16}}>
          <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Notes</div>
          <div style={{fontSize:14,color:T.sub,fontFamily:"'Lato',sans-serif",lineHeight:1.7,background:T.bg,borderRadius:12,padding:14}}>{carrier.notes}</div>
        </div>

        <div style={{display:"flex",gap:10,marginTop:16}}>
          <a href={carrier.portal} target="_blank" rel="noreferrer" style={{flex:2,display:"block",background:T.navy,color:"#fff",textAlign:"center",padding:"14px",borderRadius:12,textDecoration:"none",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:14,letterSpacing:0.5}}>
            Open Agent Portal
          </a>
          <button onClick={()=>{onEdit(carrier);onClose();}} style={{flex:1,background:T.bg,border:`1px solid ${T.border}`,borderRadius:12,padding:"14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:14,color:T.sub,cursor:"pointer"}}>
            Edit
          </button>
        </div>

        {/* Delete — visually separated below the primary actions to prevent accidental taps */}
        {onDeleteRequest && (
          <button onClick={()=>onDeleteRequest(carrier)} style={{width:"100%",marginTop:12,padding:"11px",background:"transparent",color:T.red,border:`1px solid ${T.red}33`,borderRadius:10,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer"}}>
            Delete Carrier
          </button>
        )}
      </div>
    </div>
  );
}

// ── Carrier Hub ───────────────────────────────────────────────
function CarrierHub() {
  const [carriers, setCarriers] = useLocalStorage('acc_carriers', SAMPLE_CARRIERS);
  const [selected, setSelected] = useState(null);
  const [filterLine, setFilterLine] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [editingCarrier, setEditingCarrier] = useState(null);
  const [newCarrier, setNewCarrier] = useState({name:"",line:"Health & ACA",phone:"",portal:"",override:"",overrides:[{product:"",rate:""}],notes:""});
  const [confirmDelete, setConfirmDelete] = useState(null); // carrier pending delete confirmation
  const [showDeleted, setShowDeleted] = useState(false);

  const deleteCarrier = (carrier) => {
    // Soft delete — keeps the record (so old quotes referencing this carrier
    // by name still resolve to something) but removes it from the active
    // list, filters, and "Add Carrier" autocomplete going forward.
    setCarriers(carriers.map(c => c.id===carrier.id ? {...c, deleted:true, deletedDate:new Date().toISOString().split("T")[0]} : c));
    setConfirmDelete(null);
    setSelected(null);
  };

  const restoreCarrier = (carrier) => {
    setCarriers(carriers.map(c => c.id===carrier.id ? {...c, deleted:false, deletedDate:null} : c));
  };

  const activeCarriers = carriers.filter(c=>!c.deleted);
  const deletedCarriers = carriers.filter(c=>c.deleted);
  const filtered = (showDeleted ? deletedCarriers : activeCarriers).filter(c => filterLine==="All" || c.line===filterLine);

  const addCarrier = () => {
    if (!newCarrier.name) return;
    const firstRate = newCarrier.overrides?.[0]?.rate || newCarrier.override || "";
    const cleanOverrides = (newCarrier.overrides||[]).filter(o=>o.product||o.rate);
    if (editingCarrier) {
      setCarriers(carriers.map(c=>c.id===editingCarrier?{...c,...newCarrier,override:firstRate,overrides:cleanOverrides}:c));
      setEditingCarrier(null);
    } else {
      setCarriers([...carriers,{...newCarrier,id:Date.now(),logo:newCarrier.name.slice(0,2).toUpperCase(),color:T.navy,contracts:["TN"],override:firstRate,overrides:cleanOverrides}]);
    }
    setNewCarrier({name:"",line:"Health & ACA",phone:"",portal:"",override:"",overrides:[{product:"",rate:""}],notes:""});
    setShowAdd(false);
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>Carrier Hub</h2>
          <p style={{fontSize:13,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>{activeCarriers.length} active{deletedCarriers.length>0?` · ${deletedCarriers.length} deleted`:""} · tap to view portal & details</p>
        </div>
        <div style={{display:"flex",gap:8}}>
          {deletedCarriers.length>0 && (
            <button onClick={()=>setShowDeleted(!showDeleted)} style={{background: showDeleted ? T.navy : T.card,color: showDeleted ? "#fff" : T.sub,border:`1px solid ${showDeleted ? T.navy : T.border}`,borderRadius:12,padding:"10px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer"}}>
              {showDeleted ? "Viewing Deleted" : "View Deleted"}
            </button>
          )}
          {!showDeleted && <button onClick={()=>setShowAdd(true)} style={{background:T.navy,color:"#fff",border:"none",borderRadius:12,padding:"10px 18px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Add Carrier</button>}
        </div>
      </div>

      {/* Line filter — grouped */}
      <div style={{marginBottom:18}}>
        {[{label:"All Lines",value:"All"}, ...Object.entries(LINE_GROUPS).map(([g])=>({label:`— ${g} —`,value:g,isGroup:true})), ...Object.entries(LINE_GROUPS).flatMap(([g,ls])=>ls.map(l=>({label:l,value:l,group:g})))].reduce((acc,item)=>{
          if(!acc.shown) acc.shown=new Set();
          if(item.isGroup) return acc;
          if(item.value==="All" || !acc.shown.has(item.value)){
            if(item.value!=="All") acc.shown.add(item.value);
            acc.items.push(item);
          }
          return acc;
        },{items:[],shown:new Set()}).items.filter((_,i,arr)=>true) && null}
        <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
          {["All","Life & Health","Property & Casualty","Specialty"].map(g=>(
            <button key={g} onClick={()=>setFilterLine(g==="All"?"All":g)} style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${(filterLine==="All"&&g==="All")||(filterLine===g)?T.navy:T.border}`,background:(filterLine==="All"&&g==="All")||(filterLine===g)?T.navy:T.surface,color:(filterLine==="All"&&g==="All")||(filterLine===g)?"#fff":T.sub,cursor:"pointer",fontSize:12,fontFamily:"'Lato',sans-serif",fontWeight:700,whiteSpace:"nowrap",transition:"all 0.15s"}}>
              {g==="All"?"🗂 All":g==="Life & Health"?"❤️ L&H":g==="Property & Casualty"?"🏠 P&C":"⭐ Specialty"}
            </button>
          ))}
        </div>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
          {(filterLine==="All"?LINES:filterLine==="Life & Health"||filterLine==="Property & Casualty"||filterLine==="Specialty"?LINE_GROUPS[filterLine]||LINES:LINES).map(l=>(
            <button key={l} onClick={()=>setFilterLine(l)} style={{padding:"5px 12px",borderRadius:20,border:`1px solid ${filterLine===l?lineColor(l):T.border}`,background:filterLine===l?lineColor(l):T.surface,color:filterLine===l?"#fff":T.sub,cursor:"pointer",fontSize:11,fontFamily:"'Lato',sans-serif",fontWeight:600,whiteSpace:"nowrap",transition:"all 0.15s"}}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {showDeleted ? (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.length===0 && <div style={{textAlign:"center",padding:"40px 20px",color:T.muted,fontFamily:"'Lato',sans-serif",fontSize:13}}>No deleted carriers.</div>}
          {filtered.map(c=>(
            <div key={c.id} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,padding:14,display:"flex",alignItems:"center",gap:12,opacity:0.75}}>
              <div style={{width:40,height:40,borderRadius:10,background:T.bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:T.muted,fontFamily:"'Playfair Display',serif",fontSize:14,flexShrink:0}}>{c.logo}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>{c.name}</div>
                <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif"}}>{c.line} · Deleted {c.deletedDate}</div>
              </div>
              <button onClick={()=>restoreCarrier(c)} style={{background:T.navy,color:"#fff",border:"none",borderRadius:10,padding:"8px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",flexShrink:0}}>Restore</button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {filtered.map(c=><CarrierCard key={c.id} carrier={c} onClick={()=>setSelected(c)}/>)}
        </div>
      )}

      {selected && <CarrierModal carrier={selected} onClose={()=>setSelected(null)} onEdit={(c)=>{setNewCarrier({...c,overrides:c.overrides||[{product:'',rate:c.override||''}]});setEditingCarrier(c.id);setShowAdd(true);}} onDeleteRequest={(c)=>{setSelected(null);setConfirmDelete(c);}}/>}

      {/* Delete confirmation */}
      {confirmDelete && (
        <div style={{position:"fixed",inset:0,background:"rgba(26,39,68,0.55)",zIndex:130,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setConfirmDelete(null)}>
          <div onClick={e=>e.stopPropagation()} style={{background:T.surface,borderRadius:20,padding:24,width:"100%",maxWidth:400}}>
            <div style={{fontSize:17,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",marginBottom:8}}>Delete {confirmDelete.name}?</div>
            <p style={{fontSize:13,color:T.sub,fontFamily:"'Lato',sans-serif",lineHeight:1.6,marginBottom:18}}>
              This removes {confirmDelete.name} from your active carrier list and portal links. Any past quotes using this carrier are kept and will show as "Deleted Carrier" — nothing about your quote history is lost. You can restore this carrier anytime from the Deleted view.
            </p>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setConfirmDelete(null)} style={{flex:1,padding:"11px",background:T.bg,color:T.sub,border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>Cancel</button>
              <button onClick={()=>deleteCarrier(confirmDelete)} style={{flex:1,padding:"11px",background:T.red,color:"#fff",border:"none",borderRadius:10,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>Delete</button>
            </div>
          </div>
        </div>
      )}
      {showAdd && (
        <div style={{position:"fixed",inset:0,background:"rgba(26,39,68,0.5)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowAdd(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:T.surface,borderRadius:24,padding:28,width:"100%",maxWidth:440,animation:"fadeUp 0.3s ease"}}>
            <h3 style={{fontSize:20,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",marginBottom:18}}>{editingCarrier?"Edit Carrier":"Add Carrier"}</h3>
            {[
              {label:"Carrier Name",key:"name",type:"text",ph:"e.g. Humana"},
              {label:"Phone Number",key:"phone",type:"text",ph:"1-800-..."},
              {label:"Portal URL",key:"portal",type:"text",ph:"https://..."},
            ].map(({label,key,type,ph})=>(
              <div key={key} style={{marginBottom:12}}>
                <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>{label}</div>
                <input type={type} placeholder={ph} value={newCarrier[key]} onChange={e=>setNewCarrier({...newCarrier,[key]:e.target.value})}
                  style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
              </div>
            ))}
            {/* Multi-product overrides */}
            <div style={{marginBottom:12}}>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Commission / Override by Product</div>
              {(newCarrier.overrides||[]).map((o,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
                  <input placeholder="Product (e.g. IUL)" value={o.product} onChange={e=>{const ovs=[...newCarrier.overrides];ovs[i]={...ovs[i],product:e.target.value};setNewCarrier({...newCarrier,overrides:ovs});}}
                    style={{flex:1,padding:"8px 10px",border:`1px solid ${T.border}`,borderRadius:8,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
                  <input placeholder="Rate (e.g. 80%)" value={o.rate} onChange={e=>{const ovs=[...newCarrier.overrides];ovs[i]={...ovs[i],rate:e.target.value};setNewCarrier({...newCarrier,overrides:ovs});}}
                    style={{width:90,padding:"8px 10px",border:`1px solid ${T.border}`,borderRadius:8,fontSize:13,fontFamily:"'Courier Prime',monospace",color:T.gold,outline:"none",background:T.bg,fontWeight:700}}/>
                  <button onClick={()=>setNewCarrier({...newCarrier,overrides:newCarrier.overrides.filter((_,idx)=>idx!==i)})}
                    style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:18,padding:"0 4px"}}>✕</button>
                </div>
              ))}
              <button onClick={()=>setNewCarrier({...newCarrier,overrides:[...(newCarrier.overrides||[]),{product:"",rate:""}]})}
                style={{width:"100%",padding:"8px",background:T.bg,border:`1px dashed ${T.border}`,borderRadius:10,color:T.muted,fontSize:12,fontFamily:"'Lato',sans-serif",cursor:"pointer",fontWeight:600}}>
                + Add Product Override
              </button>
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Line of Business</div>
              <select value={newCarrier.line} onChange={e=>setNewCarrier({...newCarrier,line:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none"}}>
                {LINES.map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
            <div style={{marginBottom:18}}>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Notes</div>
              <textarea placeholder="Underwriting notes, tips, specialties..." value={newCarrier.notes} onChange={e=>setNewCarrier({...newCarrier,notes:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none",height:80,resize:"none"}}/>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setShowAdd(false)} style={{flex:1,padding:"12px",background:T.bg,border:`1px solid ${T.border}`,borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",color:T.sub}}>Cancel</button>
              <button onClick={addCarrier} style={{flex:2,padding:"12px",background:T.navy,color:"#fff",border:"none",borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",fontSize:14}}>Save Carrier</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Line-specific field templates ────────────────────────────
const LINE_FIELD_TEMPLATES = {

  "Medicare": [
    {l:"Plan Type",          p:"HMO / PPO / PFFS / MSA"},
    {l:"Part B Premium",     p:"e.g. $174.70"},
    {l:"MOOP",               p:"e.g. $3,300"},
    {l:"Primary Doctor Copay",p:"e.g. $0"},
    {l:"Specialist Copay",   p:"e.g. $40"},
    {l:"ER Copay",           p:"e.g. $120"},
    {l:"Urgent Care Copay",  p:"e.g. $65"},
    {l:"Inpatient Hospital", p:"e.g. $300/day"},
    {l:"Drug Deductible",    p:"e.g. $0"},
    {l:"Tier 1 Drug",        p:"e.g. $0"},
    {l:"Tier 2 Drug",        p:"e.g. $10"},
    {l:"Tier 3 Drug",        p:"e.g. $45"},
    {l:"Mail Order Rx",      p:"Yes / No"},
    {l:"OTC Allowance",      p:"e.g. $500/qtr"},
    {l:"Dental Included",    p:"Yes / No — coverage detail"},
    {l:"Vision Included",    p:"Yes / No — allowance amount"},
    {l:"Hearing Included",   p:"Yes / No — allowance amount"},
    {l:"Gym Benefit",        p:"e.g. SilverSneakers"},
    {l:"Transportation",     p:"e.g. 48 trips/yr"},
    {l:"Telehealth",         p:"Yes / No"},
    {l:"Meals After Hospital",p:"Yes / No"},
    {l:"Network",            p:"e.g. Local HMO"},
    {l:"Star Rating",        p:"e.g. 4.5 Stars"},
  ],

  "Health & ACA": [
    {l:"Plan Type",          p:"HMO / PPO / EPO / HDHP"},
    {l:"Metal Level",        p:"Bronze / Silver / Gold / Platinum"},
    {l:"Deductible",         p:"e.g. $2,500"},
    {l:"Out of Pocket Max",  p:"e.g. $7,000"},
    {l:"Coinsurance",        p:"e.g. 20% after deductible"},
    {l:"PCP Copay",          p:"e.g. $30"},
    {l:"Specialist Copay",   p:"e.g. $60"},
    {l:"ER Copay",           p:"e.g. $350"},
    {l:"Urgent Care Copay",  p:"e.g. $75"},
    {l:"Telehealth",         p:"e.g. $0 copay"},
    {l:"Lab Work",           p:"e.g. Covered after deductible"},
    {l:"Imaging (X-Ray/MRI)",p:"e.g. 20% after deductible"},
    {l:"Generic Rx",         p:"e.g. $15"},
    {l:"Brand Rx",           p:"e.g. $50"},
    {l:"Preventive Care",    p:"e.g. $0 covered"},
    {l:"Maternity",          p:"e.g. Covered"},
    {l:"Mental Health",      p:"e.g. $30 copay"},
    {l:"Referral Required",  p:"Yes / No"},
    {l:"HSA Compatible",     p:"Yes / No"},
    {l:"Network",            p:"e.g. BlueCare TN"},
    {l:"Subsidy Eligible",   p:"Yes / No"},
  ],

  "Life & Annuities": [
    // ── Product basics ──
    {l:"Product Type",            p:"Term / WL / IUL / GUL / Annuity"},
    {l:"Death Benefit",           p:"e.g. $500,000"},
    {l:"Death Benefit Option",    p:"Level / Increasing"},
    {l:"Monthly Premium",         p:"e.g. $250/mo"},
    {l:"Target Premium",          p:"e.g. $3,000/yr"},
    {l:"Minimum Premium",         p:"e.g. $150/mo"},
    // ── IUL Illustration ──
    {l:"Illustrated Rate",        p:"e.g. 6.5% assumed"},
    {l:"Guaranteed Illustration Rate", p:"e.g. 4%"},
    {l:"Index Strategy",          p:"e.g. S&P 500 PTP Cap"},
    {l:"Cap Rate",                p:"e.g. 11%"},
    {l:"Floor Rate",              p:"e.g. 0%"},
    {l:"Participation Rate",      p:"e.g. 100%"},
    {l:"Multiplier / Bonus",      p:"e.g. 50% bonus on gains"},
    {l:"Spread / Margin",         p:"e.g. 1.5%"},
    // ── Lapse protection ──
    {l:"No-Lapse Guarantee Age (Guaranteed)", p:"e.g. To age 90"},
    {l:"No-Lapse Guarantee Age (Non-Guaranteed)", p:"e.g. To age 121"},
    {l:"Secondary Guarantee",     p:"Yes / No — duration"},
    // ── Cash value ──
    {l:"Guaranteed Cash Value at 65",    p:"e.g. $180,000"},
    {l:"Non-Guaranteed Cash Value at 65",p:"e.g. $320,000"},
    {l:"Guaranteed Cash Value at 70",    p:"e.g. $210,000"},
    {l:"Non-Guaranteed Cash Value at 70",p:"e.g. $410,000"},
    {l:"Guaranteed Death Benefit",       p:"Yes / No — amount"},
    // ── Loans & withdrawals ──
    {l:"Loan Rate",               p:"e.g. 5% wash loan"},
    {l:"Loan Type",               p:"Fixed / Variable / Participating"},
    {l:"Free Withdrawal",         p:"e.g. 10%/yr after yr 1"},
    {l:"Surrender Period",        p:"e.g. 10 years"},
    {l:"Surrender Charge Yr 1",   p:"e.g. 10%"},
    // ── Income ──
    {l:"Income Rider",            p:"Yes / No — rider name"},
    {l:"Guaranteed Income at 65", p:"e.g. $2,200/mo"},
    {l:"Guaranteed Income at 70", p:"e.g. $2,800/mo"},
    {l:"Income Start Age",        p:"e.g. Age 65"},
    {l:"Income Duration",         p:"e.g. Lifetime / 20 years"},
    // ── Riders ──
    {l:"Living Benefits",         p:"Chronic / Critical / Terminal"},
    {l:"Waiver of Premium",       p:"Yes / No"},
    {l:"Accidental Death",        p:"Yes / No"},
    {l:"Child Rider",             p:"Yes / No — amount"},
    // ── Underwriting ──
    {l:"Guaranteed Issue",        p:"Yes / No"},
    {l:"Simplified Issue",        p:"Yes / No"},
    {l:"Table Rating",            p:"e.g. Standard / Table B"},
    {l:"Conversion Option",       p:"Yes / No"},
    // ── Term specific ──
    {l:"Term Length",             p:"e.g. 20 years"},
    // ── Annuity specific ──
    {l:"Annuitization Period",    p:"e.g. 7 years"},
    {l:"Guaranteed Income Rider", p:"Yes / No — roll-up rate"},
    {l:"Roll-Up Rate",            p:"e.g. 7% simple / 6% compound"},
  ],

  "Final Expense": [
    {l:"Face Amount",        p:"e.g. $10,000"},
    {l:"Plan Tier",          p:"Level / Graded / Guaranteed Issue"},
    {l:"Beneficiary",        p:"Name & relationship"},
    {l:"Waiting Period",     p:"e.g. 2 years / None"},
    {l:"Level Premium",      p:"Yes / No"},
    {l:"Riders Available",   p:"e.g. Accidental Death"},
  ],
  "Preneed / Burial": [
    {l:"Plan Type",          p:"Preneed / Final Expense / At-need"},
    {l:"Face Amount",        p:"e.g. $10,000"},
    {l:"Funding Type",       p:"Insurance / Trust / Both"},
    {l:"Assignment",         p:"Irrevocable / Revocable"},
    {l:"Guaranteed Issue",   p:"Yes / No"},
    {l:"Level Premium",      p:"Yes / No"},
    {l:"Waiting Period",     p:"e.g. 2 years / None"},
    {l:"Casket Allowance",   p:"e.g. $3,500 included"},
    {l:"Cremation Option",   p:"Yes / No — cost"},
    {l:"Urn Included",       p:"Yes / No"},
    {l:"Headstone / Marker", p:"Yes / No — allowance"},
    {l:"Grave Opening",      p:"Included / Not included"},
    {l:"Obituary",           p:"Included / Not included"},
    {l:"Death Certificates", p:"e.g. 5 included"},
    {l:"Funeral Home Transfer",p:"Local / National network"},
    {l:"Portability",        p:"Yes / No — nationwide"},
    {l:"Medicaid Compliant", p:"Yes / No"},
    {l:"Price Guarantee",    p:"Yes / No — locked in today's prices"},
    {l:"Carrier Approval",   p:"e.g. Same day / 48 hours"},
  ],

  "Supplemental": [
    {l:"Product Type",       p:"Accident / CI / Hospital / Cancer"},
    {l:"Accident ER Benefit",p:"e.g. $1,500"},
    {l:"Accident Follow-up", p:"e.g. $200/visit"},
    {l:"Fracture Benefit",   p:"e.g. $2,000"},
    {l:"Ambulance Benefit",  p:"e.g. $500"},
    {l:"Hospital Admission", p:"e.g. $1,500"},
    {l:"Hospital Daily",     p:"e.g. $200/day"},
    {l:"ICU Daily",          p:"e.g. $400/day"},
    {l:"CI Lump Sum",        p:"e.g. $10,000"},
    {l:"Cancer Diagnosis",   p:"e.g. $10,000 lump sum"},
    {l:"Chemo/Radiation",    p:"e.g. $300/treatment"},
    {l:"Cancer Daily Hosp",  p:"e.g. $200/day"},
    {l:"Wellness Benefit",   p:"e.g. $75/yr"},
    {l:"Portability",        p:"Yes / No"},
    {l:"Guaranteed Issue",   p:"Yes / No"},
    {l:"Worksite Only",      p:"Yes / No"},
    {l:"Dependent Coverage", p:"Yes / No"},
    {l:"Return of Premium",  p:"Yes / No"},
  ],

  "Disability": [
    {l:"Coverage Type",      p:"STD / LTD / Individual DI"},
    {l:"Monthly Benefit",    p:"e.g. $4,000/mo"},
    {l:"Benefit Period",     p:"e.g. 5 years / To age 65"},
    {l:"Elimination Period", p:"e.g. 90 days"},
    {l:"Definition of Disability",p:"Own-Occ / Any-Occ / Modified"},
    {l:"Partial Disability", p:"Yes / No"},
    {l:"COLA Rider",         p:"Yes / No — rate"},
    {l:"Future Increase",    p:"Yes / No"},
    {l:"Residual Benefit",   p:"Yes / No"},
    {l:"Catastrophic Rider", p:"Yes / No"},
    {l:"Mental/Nervous",     p:"e.g. 24 months limited"},
    {l:"Substance Abuse",    p:"e.g. 24 months limited"},
    {l:"Guaranteed Renewable",p:"Yes / No"},
    {l:"Non-Cancelable",     p:"Yes / No"},
  ],

  "Dental & Vision": [
    {l:"Plan Type",          p:"PPO / HMO / Indemnity / DHMo"},
    {l:"Annual Max",         p:"e.g. $1,500"},
    {l:"Deductible",         p:"e.g. $50"},
    {l:"Preventive",         p:"e.g. 100% no waiting"},
    {l:"Basic Services",     p:"e.g. 80% after 6 months"},
    {l:"Major Services",     p:"e.g. 50% after 12 months"},
    {l:"Ortho Benefit",      p:"Yes / No — lifetime max"},
    {l:"Implants",           p:"Yes / No"},
    {l:"Waiting Period",     p:"e.g. 12 months major"},
    {l:"Missing Tooth Clause",p:"Yes / No"},
    {l:"Vision Exam",        p:"e.g. $10 copay"},
    {l:"Frames Allowance",   p:"e.g. $150/yr"},
    {l:"Contact Allowance",  p:"e.g. $150/yr"},
    {l:"LASIK Discount",     p:"Yes / No"},
  ],

  "Hospital Indemnity": [
    {l:"Hospital Admission", p:"e.g. $1,000"},
    {l:"Daily Hospital",     p:"e.g. $200/day"},
    {l:"ICU Daily",          p:"e.g. $400/day"},
    {l:"ER Benefit",         p:"e.g. $500"},
    {l:"Observation Benefit",p:"e.g. $200"},
    {l:"Ambulance",          p:"e.g. $300"},
    {l:"Surgery Benefit",    p:"e.g. $500 outpatient"},
    {l:"Rehab Facility",     p:"e.g. $100/day"},
    {l:"Wellness Benefit",   p:"e.g. $50/yr"},
    {l:"Guaranteed Issue",   p:"Yes / No"},
    {l:"Portability",        p:"Yes / No"},
  ],

  "Critical Illness": [
    {l:"Heart Attack",       p:"e.g. $25,000 lump sum"},
    {l:"Stroke",             p:"e.g. $25,000 lump sum"},
    {l:"Cancer",             p:"e.g. $25,000 lump sum"},
    {l:"Kidney Failure",     p:"Yes / No"},
    {l:"Major Organ Transplant",p:"Yes / No"},
    {l:"ALS / MS",           p:"Yes / No"},
    {l:"Recurrence Benefit", p:"Yes / No"},
    {l:"Partial Benefit",    p:"e.g. 25% for early stage"},
    {l:"Wellness Benefit",   p:"e.g. $75/yr"},
    {l:"Guaranteed Issue",   p:"Yes / No"},
    {l:"Return of Premium",  p:"Yes / No"},
  ],

  "Long-Term Care": [
    {l:"Daily Benefit",      p:"e.g. $150/day"},
    {l:"Benefit Period",     p:"e.g. 3 years"},
    {l:"Elimination Period", p:"e.g. 90 days"},
    {l:"Inflation Protection",p:"e.g. 3% compound"},
    {l:"Home Care",          p:"Yes / No — %"},
    {l:"Assisted Living",    p:"Yes / No"},
    {l:"Memory Care",        p:"Yes / No"},
    {l:"Nursing Home",       p:"Yes / No"},
    {l:"Shared Care",        p:"Yes / No (couples)"},
    {l:"Non-Forfeiture",     p:"Yes / No"},
    {l:"Guaranteed Renewable",p:"Yes / No"},
  ],

  "Homeowners": [
    {l:"Dwelling (Coverage A)",p:"e.g. $285,000"},
    {l:"Other Structures",   p:"e.g. 10% of A"},
    {l:"Personal Property",  p:"e.g. $142,000"},
    {l:"Loss of Use (ALE)",  p:"e.g. 20% of A"},
    {l:"Liability",          p:"e.g. $300,000"},
    {l:"Medical Payments",   p:"e.g. $5,000"},
    {l:"Deductible",         p:"e.g. $1,000"},
    {l:"Wind/Hail Deductible",p:"e.g. 1% of dwelling"},
    {l:"Roof Coverage",      p:"RCV / ACV"},
    {l:"Roof Age",           p:"e.g. 8 years"},
    {l:"Water Backup",       p:"Yes / No"},
    {l:"Jewelry Rider",      p:"Yes / No"},
    {l:"Replacement Cost",   p:"Yes / No"},
    {l:"Guaranteed Replacement",p:"Yes / No"},
    {l:"Discount Applied",   p:"e.g. Bundle / New home"},
  ],

  "Auto": [
    {l:"Bodily Injury",      p:"e.g. 100/300"},
    {l:"Property Damage",    p:"e.g. $100,000"},
    {l:"Uninsured Motorist", p:"e.g. 100/300"},
    {l:"Underinsured Motorist",p:"e.g. 100/300"},
    {l:"Comp Deductible",    p:"e.g. $500"},
    {l:"Collision Deductible",p:"e.g. $500"},
    {l:"Medical Payments",   p:"e.g. $5,000"},
    {l:"Rental Reimbursement",p:"e.g. $30/day"},
    {l:"Roadside Assistance",p:"Yes / No"},
    {l:"Gap Coverage",       p:"Yes / No"},
    {l:"New Car Replacement",p:"Yes / No"},
    {l:"Accident Forgiveness",p:"Yes / No"},
    {l:"Safe Driver Discount",p:"e.g. Snapshot / DriveEasy"},
    {l:"Multi-Car Discount", p:"Yes / No"},
    {l:"Discount Applied",   p:"e.g. 15% multi-car"},
  ],

  "General Liability": [
    {l:"Per Occurrence",     p:"e.g. $1,000,000"},
    {l:"General Aggregate",  p:"e.g. $2,000,000"},
    {l:"Products/Completed Ops",p:"e.g. $2,000,000"},
    {l:"Personal & Adv Injury",p:"e.g. $1,000,000"},
    {l:"Damage to Premises", p:"e.g. $100,000"},
    {l:"Medical Expense",    p:"e.g. $5,000"},
    {l:"BOP Included",       p:"Yes / No"},
    {l:"Business Property",  p:"e.g. $50,000"},
    {l:"Business Interruption",p:"Yes / No"},
    {l:"Professional Liability",p:"Included / Separate"},
    {l:"Cyber Liability",    p:"Included / Separate"},
  ],

  "Workers Comp": [
    {l:"Class Code",         p:"e.g. 8810 — Clerical"},
    {l:"Annual Payroll",     p:"e.g. $250,000"},
    {l:"Experience Mod (EMR)",p:"e.g. 1.0"},
    {l:"Employer Liability", p:"e.g. 100/500/100"},
    {l:"State",              p:"e.g. TN"},
    {l:"Medical Benefits",   p:"Unlimited / Capped"},
    {l:"Lost Wages",         p:"e.g. 66.7% of wages"},
    {l:"Return to Work Program",p:"Yes / No"},
    {l:"Pay-as-you-go",      p:"Yes / No"},
    {l:"Safety Discount",    p:"Yes / No"},
  ],

  "Commercial Property": [
    {l:"Building Value",     p:"e.g. $500,000"},
    {l:"Business Personal Property",p:"e.g. $150,000"},
    {l:"Business Income",    p:"e.g. 12 months"},
    {l:"Deductible",         p:"e.g. $2,500"},
    {l:"Coinsurance",        p:"e.g. 80%"},
    {l:"Replacement Cost",   p:"Yes / No"},
    {l:"Equipment Breakdown",p:"Yes / No"},
    {l:"Flood",              p:"Included / Separate"},
    {l:"Earthquake",         p:"Included / Separate"},
  ],

  "Umbrella / Excess": [
    {l:"Coverage Amount",    p:"e.g. $1,000,000"},
    {l:"Underlying Required",p:"e.g. 100/300 auto + $300k HO"},
    {l:"Uninsured Motorist", p:"Yes / No"},
    {l:"Rental Properties",  p:"Yes / No"},
    {l:"Business Activities",p:"Yes / No"},
  ],

  "Professional Liability (E&O)": [
    {l:"Per Claim Limit",    p:"e.g. $1,000,000"},
    {l:"Aggregate Limit",    p:"e.g. $1,000,000"},
    {l:"Retroactive Date",   p:"e.g. Inception / Prior acts"},
    {l:"Deductible",         p:"e.g. $2,500"},
    {l:"Claims Made",        p:"Yes — tail coverage available?"},
    {l:"Defense Inside/Outside",p:"Inside / Outside limits"},
    {l:"Cyber Endorsement",  p:"Yes / No"},
    {l:"License Defense",    p:"Yes / No"},
  ],

  "Flood": [
    {l:"Building Coverage",  p:"e.g. $250,000"},
    {l:"Contents Coverage",  p:"e.g. $100,000"},
    {l:"Deductible",         p:"e.g. $1,000"},
    {l:"Replacement Cost",   p:"Building only / Contents too"},
    {l:"Basement Contents",  p:"Yes / No"},
    {l:"Loss of Use",        p:"Yes / No (private only)"},
    {l:"NFIP vs Private",    p:"NFIP / Private carrier"},
    {l:"Waiting Period",     p:"e.g. 30 days NFIP / 15 days private"},
  ],

};
const DEFAULT_FIELDS = [{l:"Coverage Amount",p:"e.g. $100,000"},{l:"Deductible",p:"e.g. $1,000"},{l:"Coverage Type",p:"e.g. Standard"}];

// ── Smart Intake / Questionnaire ──────────────────────────────────
// Question bank for the intake step between "Build Quote" and the actual
// quote/carrier portal. Keyed to the SAME line names already used by
// LINE_GROUPS/LINES, so intake doesn't introduce a second, conflicting line
// taxonomy alongside Clients and Quotes.

// Shared across nearly every line — basic identity/eligibility facts an
// agent needs on file before quoting almost anything.
const IDENTITY_QUESTIONS = [
  { key:"dateOfBirth",  label:"Date of Birth",        type:"text", placeholder:"MM/DD/YYYY" },
  { key:"ssnLast4",     label:"SSN (Last 4)",          type:"text", placeholder:"e.g. 1234" },
  { key:"address",      label:"Mailing Address",       type:"textarea", placeholder:"Street, City, State, ZIP" },
  { key:"maritalStatus",label:"Marital Status",        type:"select", options:["Single","Married","Divorced","Widowed"] },
];

// Shared across every health-related line — providers, meds, pharmacy,
// hospital. Defined once, attached to many lines, so updating it updates
// every line at once instead of needing 10 separate edits.
const HEALTH_QUESTIONS = [
  { key:"primaryProvider",   label:"Primary Care Provider", type:"text", placeholder:"Dr. name / practice" },
  { key:"specialists",       label:"Specialists Seen",      type:"textarea", placeholder:"e.g. Cardiologist - Dr. Lee; Endocrinologist - Dr. Patel" },
  { key:"medications",       label:"Current Medications",   type:"textarea", placeholder:"List medication names" },
  { key:"dosage",            label:"Dosage",                type:"text", placeholder:"e.g. 10mg, 20mg" },
  { key:"frequency",         label:"Frequency",             type:"text", placeholder:"e.g. Once daily, twice daily" },
  { key:"preferredPharmacy", label:"Preferred Pharmacy",    type:"text", placeholder:"e.g. CVS on Main St." },
  { key:"preferredHospital", label:"Preferred Hospital",    type:"text", placeholder:"e.g. Baptist Memorial" },
];

// Underwriting / health-history block for life, final expense, disability,
// critical illness, LTC — the actual conditions carriers underwrite against,
// not just "family history" in a single text box.
const UNDERWRITING_QUESTIONS = [
  { key:"heightWeight",    label:"Height / Weight",         type:"text", placeholder:"e.g. 5'9\" / 210 lbs" },
  { key:"tobaccoUse",      label:"Tobacco / Nicotine Use",   type:"select", options:["Never","Former — quit 12+ months ago","Former — quit <12 months ago","Current"] },
  { key:"heartConditions", label:"Heart Disease / Stroke History", type:"select", options:["None","Yes — explain in notes"] },
  { key:"diabetes",        label:"Diabetes", type:"select", options:["None","Type 1","Type 2 — diet controlled","Type 2 — medication/insulin"] },
  { key:"cancer",          label:"Cancer History (any type)", type:"select", options:["None","In remission 5+ years","In remission <5 years","Current treatment"] },
  { key:"copdRespiratory", label:"COPD / Respiratory Conditions", type:"select", options:["None","Yes — explain in notes"] },
  { key:"kidneyLiver",     label:"Kidney or Liver Disease", type:"select", options:["None","Yes — explain in notes"] },
  { key:"mentalHealth",    label:"Mental Health / Substance History", type:"select", options:["None","Yes — explain in notes"] },
  { key:"otherConditions", label:"Other Conditions / Surgeries / Hospitalizations (last 5 years)", type:"textarea", placeholder:"Include dates if known" },
  { key:"familyHistory",   label:"Immediate Family Health History", type:"textarea", placeholder:"e.g. Father - heart disease at 60; Mother - diabetes" },
];

// Lines that get the shared health block automatically, in addition to any
// line-specific questions below.
const HEALTH_LINES = ["Health & ACA","Medicare","Dental & Vision","Disability","Long-Term Care","Critical Illness","Hospital Indemnity","Supplemental"];

// Lines that get the full underwriting/health-history block — anything
// medically underwritten, not just lines that happen to involve a doctor visit.
const UNDERWRITING_LINES = ["Life & Annuities","Final Expense","Preneed / Burial","Disability","Long-Term Care","Critical Illness","Mortgage Protection"];

const INTAKE_QUESTIONS = {
  "Health & ACA": [
    { key:"householdSize",     label:"Household Size", type:"text", placeholder:"e.g. 3" },
    { key:"householdIncome",   label:"Estimated Annual Household Income", type:"text", placeholder:"e.g. $58,000" },
    { key:"dependentsOnPlan",  label:"Dependents to Include on Plan", type:"textarea", placeholder:"Name & DOB for each" },
    { key:"currentlyInsured",  label:"Currently Insured?", type:"select", options:["Yes","No"] },
    { key:"currentCarrierPlan",label:"Current Carrier / Plan (if any)", type:"text", placeholder:"" },
    { key:"subsidyEligible",   label:"Receiving ACA Subsidy?", type:"select", options:["Unknown","Yes","No"] },
    { key:"pregnancy",         label:"Pregnancy / Expecting", type:"select", options:["No","Yes"] },
  ],
  "Medicare": [
    { key:"medicareNumber",     label:"Medicare Number (MBI)", type:"text", placeholder:"e.g. 1EG4-TE5-MK72" },
    { key:"partAEffective",     label:"Part A Effective Date", type:"text", placeholder:"MM/DD/YYYY" },
    { key:"partBEffective",     label:"Part B Effective Date", type:"text", placeholder:"MM/DD/YYYY" },
    { key:"hasMedicaid",        label:"Has Medicaid (Dual-Eligible)?", type:"select", options:["No","Yes — Full","Yes — QMB/Partial"] },
    { key:"currentPlanType",    label:"Current Plan Type (if any)", type:"select", options:["None / Original Medicare only","Medicare Advantage","Medicare Supplement","Both Advantage & Part D"] },
    { key:"currentCarrierPlan", label:"Current Carrier / Plan Name", type:"text", placeholder:"" },
    { key:"sepReason",          label:"Enrollment Period / SEP Reason (if applicable)", type:"text", placeholder:"e.g. Turning 65, losing employer coverage, moved" },
    { key:"lowIncomeSubsidy",   label:"Extra Help / LIS Status", type:"select", options:["Unknown","None","Full","Partial"] },
  ],
  "Life & Annuities": [
    { key:"coverageGoal",       label:"Coverage Goal", type:"select", options:["Final Expense","Income Replacement","Mortgage Protection","Estate Planning","Business/Key Person","Other"] },
    { key:"desiredFaceAmount",  label:"Desired Face Amount", type:"text", placeholder:"e.g. $250,000" },
    { key:"termOrPermanent",    label:"Term or Permanent", type:"select", options:["Term","Whole Life","IUL/Universal Life","Not Sure — Recommend"] },
    { key:"termLength",         label:"Desired Term Length (if Term)", type:"select", options:["N/A","10 yr","15 yr","20 yr","30 yr"] },
    { key:"occupation",         label:"Occupation", type:"text", placeholder:"" },
    { key:"hazardousActivities",label:"Hazardous Activities / Occupation Risk", type:"text", placeholder:"e.g. Pilot, scuba diving, racing — or None" },
    { key:"beneficiaryPrimary", label:"Primary Beneficiary", type:"text", placeholder:"Name & relationship" },
    { key:"beneficiaryContingent", label:"Contingent Beneficiary", type:"text", placeholder:"Name & relationship" },
    { key:"existingCoverage",   label:"Existing Life Coverage", type:"text", placeholder:"Carrier & amount, if any" },
    { key:"replacingCoverage",  label:"Replacing Existing Coverage?", type:"select", options:["No","Yes"] },
  ],
  "Final Expense": [
    { key:"desiredFaceAmount",     label:"Desired Coverage Amount", type:"text", placeholder:"e.g. $10,000" },
    { key:"beneficiaryPrimary",    label:"Primary Beneficiary", type:"text", placeholder:"Name & relationship" },
    { key:"existingFinalExpense",  label:"Existing Final Expense Coverage?", type:"select", options:["No","Yes"] },
    { key:"planTierPreference",    label:"Plan Tier Preference", type:"select", options:["Not Sure — Recommend","Level (best health)","Graded","Guaranteed Issue"] },
  ],
  "Preneed / Burial": [
    { key:"funeralHomePreference", label:"Preferred Funeral Home", type:"text", placeholder:"" },
    { key:"desiredFaceAmount",     label:"Desired Coverage Amount", type:"text", placeholder:"e.g. $10,000" },
    { key:"beneficiaryPrimary",    label:"Primary Beneficiary", type:"text", placeholder:"Name & relationship" },
    { key:"burialOrCremation",     label:"Burial or Cremation Preference", type:"select", options:["Burial","Cremation","Undecided"] },
    { key:"existingPreneed",       label:"Existing Preneed/Burial Policy?", type:"select", options:["No","Yes"] },
  ],
  "Disability": [
    { key:"occupation",            label:"Occupation", type:"text", placeholder:"" },
    { key:"employerType",          label:"Employed / Self-Employed", type:"select", options:["W-2 Employed","Self-Employed","1099 Contractor"] },
    { key:"annualIncome",          label:"Annual Income", type:"text", placeholder:"e.g. $65,000" },
    { key:"employerCoverage",      label:"Employer-Provided Disability Coverage?", type:"select", options:["No","Yes — Short-Term Only","Yes — Long-Term Only","Yes — Both"] },
    { key:"monthlyIncomeNeeded",   label:"Monthly Income to Replace", type:"text", placeholder:"e.g. $3,500" },
    { key:"eliminationPeriod",     label:"Desired Elimination Period", type:"select", options:["Not Sure","7 days","30 days","60 days","90 days"] },
  ],
  "Long-Term Care": [
    { key:"desiredDailyBenefit",   label:"Desired Daily/Monthly Benefit", type:"text", placeholder:"e.g. $150/day" },
    { key:"benefitPeriod",         label:"Desired Benefit Period", type:"select", options:["Not Sure","2 years","3 years","5 years","Lifetime"] },
    { key:"currentLivingSituation",label:"Current Living Situation", type:"select", options:["Independent","With Family","Assisted Living","Other"] },
    { key:"existingLTC",           label:"Existing LTC Coverage?", type:"select", options:["No","Yes"] },
  ],
  "Critical Illness": [
    { key:"desiredFaceAmount",     label:"Desired Coverage Amount", type:"text", placeholder:"e.g. $20,000" },
    { key:"existingCriticalIllness", label:"Existing Critical Illness Coverage?", type:"select", options:["No","Yes"] },
  ],
  "Hospital Indemnity": [
    { key:"recentHospitalizations",label:"Hospitalizations in Past 2 Years", type:"textarea", placeholder:"Include dates & reason if known" },
    { key:"desiredDailyBenefit",   label:"Desired Daily Hospital Benefit", type:"text", placeholder:"e.g. $200/day" },
  ],
  "Mortgage Protection": [
    { key:"mortgageBalance",       label:"Mortgage Balance", type:"text", placeholder:"e.g. $185,000" },
    { key:"mortgageTermRemaining", label:"Years Remaining on Mortgage", type:"text", placeholder:"e.g. 22" },
    { key:"lender",                label:"Lender / Servicer", type:"text", placeholder:"" },
    { key:"coOwner",                label:"Co-Borrower / Co-Owner", type:"text", placeholder:"Name, if applicable" },
  ],
  "Dental & Vision": [
    { key:"lastDentalExam",        label:"Last Dental Exam", type:"text", placeholder:"MM/YYYY" },
    { key:"majorWorkNeeded",       label:"Anticipated Major Work (crowns, dentures, etc.)", type:"textarea", placeholder:"" },
    { key:"wearsGlassesContacts",  label:"Wears Glasses / Contacts", type:"select", options:["No","Yes"] },
  ],
  "Employer Benefits": [
    { key:"businessName",          label:"Business Name", type:"text", placeholder:"" },
    { key:"industry",              label:"Industry", type:"text", placeholder:"" },
    { key:"totalEmployees",        label:"Number of Employees", type:"text", placeholder:"e.g. 24" },
    { key:"fullTimeEmployees",     label:"Full-Time Employees", type:"text", placeholder:"" },
    { key:"partTimeEmployees",     label:"Part-Time Employees", type:"text", placeholder:"" },
    { key:"payrollFrequency",      label:"Payroll Frequency", type:"select", options:["Weekly","Bi-Weekly","Semi-Monthly","Monthly"] },
    { key:"currentBenefits",       label:"Current Benefits Offered", type:"textarea", placeholder:"" },
    { key:"currentCarrierBroker",  label:"Current Carrier / Broker", type:"text", placeholder:"" },
    { key:"renewalDate",           label:"Renewal Date", type:"text", placeholder:"MM/DD/YYYY" },
    { key:"employerContribution",  label:"Employer Contribution Preference", type:"text", placeholder:"e.g. 50% of employee premium" },
    { key:"decisionMaker",         label:"Decision Maker", type:"text", placeholder:"Name & title" },
    { key:"desiredProducts",       label:"Desired Products", type:"textarea", placeholder:"e.g. Group health, dental, vision, life" },
    { key:"enrollmentTimeline",    label:"Enrollment Timeline", type:"text", placeholder:"" },
    { key:"painPoints",            label:"Pain Points / Concerns", type:"textarea", placeholder:"" },
  ],
  "Auto": [
    { key:"vehicles",            label:"Vehicles (Year/Make/Model/VIN)", type:"textarea", placeholder:"" },
    { key:"drivers",             label:"Drivers on Policy (Name/DOB/License #)", type:"textarea", placeholder:"" },
    { key:"currentCarrier",      label:"Current Carrier", type:"text", placeholder:"" },
    { key:"currentLiabilityLimits", label:"Current Liability Limits", type:"text", placeholder:"e.g. 100/300/100" },
    { key:"accidentsViolations", label:"Accidents / Violations (Past 3 Years)", type:"textarea", placeholder:"" },
    { key:"vehicleUse",          label:"Primary Vehicle Use", type:"select", options:["Commute","Pleasure","Business","Rideshare/Delivery"] },
  ],
  "Homeowners": [
    { key:"propertyAddress",   label:"Property Address", type:"text", placeholder:"" },
    { key:"yearBuilt",         label:"Year Built", type:"text", placeholder:"" },
    { key:"squareFootage",     label:"Square Footage", type:"text", placeholder:"" },
    { key:"constructionType",  label:"Construction Type", type:"select", options:["Frame","Masonry","Brick Veneer","Other"] },
    { key:"roofAge",           label:"Roof Age / Type", type:"text", placeholder:"e.g. 8 years, architectural shingle" },
    { key:"currentCarrier",    label:"Current Carrier", type:"text", placeholder:"" },
    { key:"claimsHistory",     label:"Claims History (Past 5 Years)", type:"textarea", placeholder:"" },
    { key:"mortgageOnHome",    label:"Mortgage on Home?", type:"select", options:["No","Yes"] },
  ],
  "Renters": [
    { key:"propertyAddress",          label:"Rental Address", type:"text", placeholder:"" },
    { key:"personalPropertyValue",    label:"Estimated Personal Property Value", type:"text", placeholder:"" },
    { key:"liabilityCoverageDesired", label:"Desired Liability Coverage", type:"text", placeholder:"e.g. $100,000" },
  ],
  "Commercial Auto": [
    { key:"businessName",  label:"Business Name", type:"text", placeholder:"" },
    { key:"fleetSize",     label:"Number of Vehicles", type:"text", placeholder:"" },
    { key:"vehicleUseType",label:"Vehicle Use", type:"select", options:["Local Delivery","Long-Haul","Service/Trade","Passenger Transport","Other"] },
    { key:"driverList",    label:"Drivers (Name/License #/MVR on file?)", type:"textarea", placeholder:"" },
    { key:"currentCarrier",label:"Current Carrier", type:"text", placeholder:"" },
  ],
  "General Liability": [
    { key:"businessName",     label:"Business Name", type:"text", placeholder:"" },
    { key:"industryOperations", label:"Industry / Operations Description", type:"textarea", placeholder:"" },
    { key:"annualRevenue",    label:"Annual Revenue", type:"text", placeholder:"" },
    { key:"subcontractorUse", label:"Uses Subcontractors?", type:"select", options:["No","Yes"] },
    { key:"priorClaims",      label:"Prior Liability Claims", type:"textarea", placeholder:"" },
  ],
  "Commercial Property": [
    { key:"businessName",      label:"Business Name", type:"text", placeholder:"" },
    { key:"propertyAddress",   label:"Property Address", type:"text", placeholder:"" },
    { key:"buildingValue",     label:"Building Value", type:"text", placeholder:"" },
    { key:"contentsValue",     label:"Contents / Business Personal Property Value", type:"text", placeholder:"" },
    { key:"yearBuilt",         label:"Year Built", type:"text", placeholder:"" },
    { key:"sprinklered",       label:"Sprinklered?", type:"select", options:["No","Yes"] },
  ],
  "Workers Comp": [
    { key:"businessName",     label:"Business Name", type:"text", placeholder:"" },
    { key:"employeeCount",    label:"Number of Employees", type:"text", placeholder:"" },
    { key:"classCodes",       label:"Class Code(s) / Job Duties", type:"textarea", placeholder:"" },
    { key:"annualPayroll",    label:"Annual Payroll", type:"text", placeholder:"" },
    { key:"experienceMod",    label:"Experience Mod (if known)", type:"text", placeholder:"" },
    { key:"priorClaims",      label:"Prior Workers Comp Claims", type:"textarea", placeholder:"" },
  ],
  "Pet Insurance": [
    { key:"petName",      label:"Pet Name", type:"text", placeholder:"" },
    { key:"petSpeciesBreed", label:"Species / Breed", type:"text", placeholder:"" },
    { key:"petAge",        label:"Pet Age", type:"text", placeholder:"" },
    { key:"preExistingConditions", label:"Pre-Existing Conditions", type:"textarea", placeholder:"" },
  ],
};

// Returns the merged, de-duplicated question list for one or more selected
// lines, in a sensible order: identity first, then underwriting/health if
// applicable, then line-specific questions.
function getIntakeQuestions(selectedLines) {
  const questions = [];
  const seenKeys = new Set();
  const addAll = (list) => list.forEach(q => { if (!seenKeys.has(q.key)) { seenKeys.add(q.key); questions.push(q); } });

  const needsIdentity = selectedLines.some(l => l !== "" );
  if (needsIdentity && selectedLines.length>0) addAll(IDENTITY_QUESTIONS);

  selectedLines.forEach(line => {
    if (HEALTH_LINES.includes(line)) addAll(HEALTH_QUESTIONS);
    if (UNDERWRITING_LINES.includes(line)) addAll(UNDERWRITING_QUESTIONS);
    if (INTAKE_QUESTIONS[line]) addAll(INTAKE_QUESTIONS[line]);
  });
  return questions;
}

// ── Quote Readiness Score ──────────────────────────────────────────
// A REAL completion percentage computed from the client's actual intake
// answers against the actual question bank for their selected lines — not a
// fabricated or simulated number. Used by Quinn (AI Discovery & Quote
// Specialist) so "82% ready, missing: Beneficiary" is always literally true
// of what's on file, not a plausible-sounding guess.
function getReadinessScore(client) {
  const lines = client?.intake?.lines || [];
  const answers = client?.intake?.answers || {};
  if (lines.length === 0) {
    return { percent: 0, missing: [], total: 0, answered: 0, questions: [] };
  }
  const questions = getIntakeQuestions(lines);
  const missing = questions.filter(q => !answers[q.key] || String(answers[q.key]).trim()==="");
  const answered = questions.length - missing.length;
  const percent = questions.length ? Math.round((answered/questions.length)*100) : 0;
  return { percent, missing: missing.map(q=>q.label), total: questions.length, answered, questions };
}

// ── Smart Intake Modal ────────────────────────────────────────────
// Flow: pick one or more lines → answer the merged question set → save to
// the client's profile (acc_clients, under `intake`) → continue to the quote.
// Built as its own modal rather than folded into QuoteBuilder so it can also
// be opened directly from ClientProfiles without requiring a quote in progress.
function SmartIntake({ client, onClose, onComplete }) {
  const [clients, setClients] = useLocalStorage('acc_clients', SAMPLE_CLIENTS);
  const [step, setStep] = useState("lines"); // "lines" | "questions"
  const [selectedLines, setSelectedLines] = useState(client?.intake?.lines || (client?.line ? [client.line] : []));
  const existingAnswers = client?.intake?.answers || {};
  const [answers, setAnswers] = useState(existingAnswers);

  const questions = getIntakeQuestions(selectedLines);

  const toggleLine = (line) => {
    setSelectedLines(prev => prev.includes(line) ? prev.filter(l=>l!==line) : [...prev, line]);
  };

  const saveAndContinue = () => {
    const updated = clients.map(c => c.id===client.id
      ? { ...c, intake: { lines: selectedLines, answers, savedDate: new Date().toISOString().split("T")[0] } }
      : c
    );
    setClients(updated);
    onComplete(selectedLines);
  };

  return (
    <div style={{position:"fixed", inset:0, background:"rgba(26,39,68,0.55)", zIndex:250, display:"flex", alignItems:"center", justifyContent:"center", padding:16}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.surface, borderRadius:24, width:"100%", maxWidth:560, maxHeight:"88vh", overflowY:"auto", padding:26}}>

        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6}}>
          <div style={{fontSize:11, color:T.muted, fontFamily:"'Lato',sans-serif", textTransform:"uppercase", letterSpacing:1, fontWeight:700}}>
            Smart Intake — {client?.name}
          </div>
          <button onClick={onClose} style={{background:T.bg, border:`1px solid ${T.border}`, borderRadius:10, width:30, height:30, cursor:"pointer", color:T.muted}}>×</button>
        </div>

        {step === "lines" && (
          <>
            <div style={{fontSize:19, fontWeight:700, color:T.navy, fontFamily:"'Playfair Display',serif", marginBottom:4}}>Select Line(s) of Insurance</div>
            <p style={{fontSize:12.5, color:T.muted, fontFamily:"'Lato',sans-serif", marginBottom:16}}>Choose one or more — the questionnaire below will adjust to cover everything selected.</p>

            {Object.entries(LINE_GROUPS).map(([group, lines]) => (
              <div key={group} style={{marginBottom:14}}>
                <div style={{fontSize:10.5, color:T.muted, fontFamily:"'Lato',sans-serif", textTransform:"uppercase", letterSpacing:0.8, fontWeight:700, marginBottom:6}}>{group}</div>
                <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
                  {lines.map(line => (
                    <button key={line} onClick={()=>toggleLine(line)} style={{
                      padding:"7px 12px", borderRadius:20, fontSize:12.5, fontFamily:"'Lato',sans-serif", fontWeight:600, cursor:"pointer",
                      background: selectedLines.includes(line) ? T.navy : T.bg,
                      color: selectedLines.includes(line) ? "#fff" : T.sub,
                      border: `1px solid ${selectedLines.includes(line) ? T.navy : T.border}`,
                    }}>{line}</button>
                  ))}
                </div>
              </div>
            ))}

            <button onClick={()=>setStep("questions")} disabled={selectedLines.length===0} style={{
              width:"100%", marginTop:10, padding:"13px", borderRadius:12, border:"none", fontFamily:"'Lato',sans-serif", fontWeight:700, fontSize:14,
              background: selectedLines.length===0 ? T.border : T.navy, color:"#fff", cursor: selectedLines.length===0 ? "default" : "pointer",
            }}>
              Continue to Questionnaire {selectedLines.length>0 && `(${selectedLines.length} line${selectedLines.length>1?"s":""})`}
            </button>
          </>
        )}

        {step === "questions" && (
          <>
            <div style={{fontSize:19, fontWeight:700, color:T.navy, fontFamily:"'Playfair Display',serif", marginBottom:4}}>Intake Questionnaire</div>
            <p style={{fontSize:12.5, color:T.muted, fontFamily:"'Lato',sans-serif", marginBottom:16}}>
              {selectedLines.join(", ")} · {questions.length} question{questions.length!==1?"s":""}. Answers save to {client?.name}'s profile for future quotes and reviews.
            </p>

            {questions.length === 0 ? (
              <div style={{textAlign:"center", padding:"24px 0", color:T.muted, fontFamily:"'Lato',sans-serif", fontSize:13}}>
                No additional intake questions for the selected line(s) yet — you can continue straight to the quote.
              </div>
            ) : (
              <div style={{display:"flex", flexDirection:"column", gap:12, marginBottom:18}}>
                {questions.map(q => (
                  <div key={q.key}>
                    <label style={{fontSize:11.5, color:T.sub, fontFamily:"'Lato',sans-serif", fontWeight:700}}>{q.label}</label>
                    {q.type === "select" ? (
                      <select value={answers[q.key]||""} onChange={e=>setAnswers({...answers,[q.key]:e.target.value})}
                        style={{width:"100%", padding:"9px 10px", border:`1px solid ${T.border}`, borderRadius:8, fontSize:13.5, fontFamily:"'Lato',sans-serif", color:T.text, outline:"none", background:T.bg, marginTop:4}}>
                        <option value="">Select...</option>
                        {q.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : q.type === "textarea" ? (
                      <textarea value={answers[q.key]||""} onChange={e=>setAnswers({...answers,[q.key]:e.target.value})} placeholder={q.placeholder} rows={2}
                        style={{width:"100%", padding:"9px 10px", border:`1px solid ${T.border}`, borderRadius:8, fontSize:13.5, fontFamily:"'Lato',sans-serif", color:T.text, outline:"none", background:T.bg, marginTop:4, resize:"vertical"}}/>
                    ) : (
                      <input value={answers[q.key]||""} onChange={e=>setAnswers({...answers,[q.key]:e.target.value})} placeholder={q.placeholder}
                        style={{width:"100%", padding:"9px 10px", border:`1px solid ${T.border}`, borderRadius:8, fontSize:13.5, fontFamily:"'Lato',sans-serif", color:T.text, outline:"none", background:T.bg, marginTop:4}}/>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div style={{display:"flex", gap:10}}>
              <button onClick={()=>setStep("lines")} style={{flex:1, padding:"13px", borderRadius:12, border:`1px solid ${T.border}`, background:T.bg, color:T.sub, fontFamily:"'Lato',sans-serif", fontWeight:700, fontSize:13, cursor:"pointer"}}>
                Back
              </button>
              <button onClick={saveAndContinue} style={{flex:2, padding:"13px", borderRadius:12, border:"none", background:T.navy, color:"#fff", fontFamily:"'Lato',sans-serif", fontWeight:700, fontSize:14, cursor:"pointer"}}>
                Save & Continue to Quote →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Client Picker Modal ───────────────────────────────────────
// Lets an agent search and select a real client to link a quote comparison
// to — used by "Save to Client Profile" / "change" in QuoteBuilder.
function ClientPickerModal({ clients, onClose, onSelect }) {
  const [search, setSearch] = useState("");
  const activeClients = clients.filter(c=>!c.archived);
  const filtered = activeClients.filter(c=>c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(26,39,68,0.55)",zIndex:150,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.surface,borderRadius:24,padding:22,width:"100%",maxWidth:420,maxHeight:"75vh",display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontSize:18,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>Link to Client</div>
          <button onClick={onClose} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:10,width:30,height:30,cursor:"pointer",color:T.muted}}>×</button>
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search clients..." autoFocus
          style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg,marginBottom:12}}/>
        <div style={{overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:6}}>
          {filtered.length===0 && (
            <div style={{textAlign:"center",padding:"24px 0",color:T.muted,fontFamily:"'Lato',sans-serif",fontSize:13}}>
              No matching clients. Add them from the Clients tab first.
            </div>
          )}
          {filtered.map(c=>(
            <button key={c.id} onClick={()=>onSelect(c)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:T.bg,border:"none",borderRadius:10,cursor:"pointer",textAlign:"left",fontFamily:"'Lato',sans-serif"}}>
              <div style={{width:32,height:32,borderRadius:9,background:lineColor(c.line),display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,fontWeight:700,flexShrink:0}}>
                {c.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
              </div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:T.navy}}>{c.name}</div>
                <div style={{fontSize:11,color:T.muted}}>{c.line}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Quote Builder ─────────────────────────────────────────────
function QuoteBuilder({ initialClient }) {
  const blankQuote = (clientId=null) => ({id:Date.now(),clientId,carrier:"",line:"Medicare",plan:"",premium:"",notes:"",customFields:[{l:"OTC Allowance",v:"$500/qtr"},{l:"Dental Included",v:"Yes"},{l:"MOOP",v:"$3,300"}],color:T.navy,status:"open",recommendation:"",bestFor:""});

  const [quotes, setQuotes] = useLocalStorage('acc_quotes', [
    {id:1,carrier:"Humana",line:"Medicare",plan:"Gold Plus HMO H1036",premium:0,notes:"$0 premium. Strong dental & vision. SilverSneakers included.",color:"#006D9C",
     customFields:[{l:"Plan Type",v:"HMO"},{l:"OTC Allowance",v:"$500/qtr"},{l:"MOOP",v:"$3,300"},{l:"Drug Deductible",v:"$0"},{l:"Dental Included",v:"Yes"},{l:"Vision Included",v:"Yes"},{l:"Gym Benefit",v:"SilverSneakers"},{l:"Transportation",v:"Yes"}]},
    {id:2,carrier:"Aetna",line:"Medicare",plan:"Medicare Advantage Value HMO",premium:29,notes:"Low premium. Good drug formulary. No OTC.",color:"#7B2D8B",
     customFields:[{l:"Plan Type",v:"HMO"},{l:"OTC Allowance",v:"None"},{l:"MOOP",v:"$4,900"},{l:"Drug Deductible",v:"$0"},{l:"Dental Included",v:"Limited"},{l:"Vision Included",v:"Yes"},{l:"Gym Benefit",v:"No"},{l:"Transportation",v:"No"}]},
    {id:3,carrier:"UnitedHealthcare",line:"Medicare",plan:"AARP MedicareComplete HMO",premium:0,notes:"$0 premium. Strong OTC. Renew Active gym benefit.",color:"#CC0000",
     customFields:[{l:"Plan Type",v:"HMO"},{l:"OTC Allowance",v:"$300/qtr"},{l:"MOOP",v:"$3,900"},{l:"Drug Deductible",v:"$0"},{l:"Dental Included",v:"Yes"},{l:"Vision Included",v:"Yes"},{l:"Gym Benefit",v:"Renew Active"},{l:"Transportation",v:"Yes"}]},
  ]);

  const [clients] = useLocalStorage('acc_clients', SAMPLE_CLIENTS);
  const [clientName, setClientName] = useState(initialClient?.name || "James Stovall");
  const [linkedClient, setLinkedClient] = useState(initialClient || null); // the real client record this quote set is for, or null if unlinked
  const [showClientPicker, setShowClientPicker] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null); // quote id being edited
  const [emailCopied, setEmailCopied] = useState(false);
  const [newQ, setNewQ] = useState(blankQuote(initialClient?.id||null));
  const [newFieldLabel, setNewFieldLabel] = useState("");

  // Names of carriers that have been deleted from the Carrier Hub — used to
  // flag historical quotes without needing a live reference/ID on the quote
  // itself (quotes already only ever stored the carrier name as plain text).
  const deletedCarrierNames = new Set(
    JSON.parse(localStorage.getItem("acc_carriers") || "[]").filter(c=>c.deleted).map(c=>c.name)
  );

  // Carrier portal links from "My Links" tab — used for the per-quote
  // "Open Portal" dropdown so an agent can jump straight to a carrier's
  // portal from the quote they're building, without switching tabs.
  const carrierLinks = JSON.parse(localStorage.getItem("acc_links") || "[]");
  const linksForCarrier = (carrierName) => carrierLinks.filter(l =>
    carrierName && l.carrier?.toLowerCase().includes(carrierName.toLowerCase().slice(0,6))
  );

  const premiums = quotes.map(q=>Number(q.premium)||0);
  const lowest = Math.min(...premiums);
  const activeLine = quotes[0]?.line || "Medicare";
  const templates = LINE_FIELD_TEMPLATES[activeLine] || DEFAULT_FIELDS;

  // Apply a template field to the new quote
  const applyTemplate = (field) => {
    if (newQ.customFields.find(f=>f.l===field.l)) return;
    setNewQ({...newQ, customFields:[...newQ.customFields,{l:field.l,v:""}]});
  };

  const addCustomField = () => {
    if (!newFieldLabel.trim()) return;
    setNewQ({...newQ, customFields:[...newQ.customFields,{l:newFieldLabel.trim(),v:""}]});
    setNewFieldLabel("");
  };

  const updateCustomField = (i, key, val) => {
    const fields = [...newQ.customFields];
    fields[i] = {...fields[i],[key]:val};
    setNewQ({...newQ,customFields:fields});
  };

  const removeCustomField = (i) => {
    setNewQ({...newQ,customFields:newQ.customFields.filter((_,idx)=>idx!==i)});
  };

  const saveQuote = () => {
    if (!newQ.carrier || !newQ.plan) return;
    const q = {...newQ, id:editing||Date.now(), clientId:linkedClient?.id||newQ.clientId||null, premium:Number(newQ.premium)||0, color:lineColor(newQ.line)||T.navy};
    if (editing) setQuotes(quotes.map(x=>x.id===editing?q:x));
    else setQuotes([...quotes,q]);
    setNewQ(blankQuote(linkedClient?.id||null));
    setEditing(null);
    setShowAdd(false);
  };

  const startEdit = (q) => {
    setNewQ({...q});
    setEditing(q.id);
    setShowAdd(true);
  };

  // Export full quote data as JSON — backup/safety net since data only lives in this browser.
  // JSON (not CSV) because each quote has a variable set of custom fields that CSV can't represent cleanly.
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(quotes, null, 2)],{type:"application/json"});
    const url = URL.createObjectURL(blob);
    // Strip anything that isn't a letter, number, hyphen, or underscore — not
    // just whitespace — so client names with slashes, ampersands, or other
    // filesystem-unsafe characters can't produce a malformed filename.
    const safeName = clientName.trim().replace(/\s+/g,"_").replace(/[^a-zA-Z0-9_-]/g,"");
    const a = document.createElement("a"); a.href=url; a.download=`quotes-${safeName||"client"}.json`; a.click();
  };

  const printQuote = () => {
    const w = window.open("", "_blank");
    if (!w) { alert("Please allow popups for this site to use Print."); return; }

    const agentName = ((profile?.firstName||"") + " " + (profile?.lastName||"")).trim();
    const today = new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});

    // Build each quote card as an HTML table column
    let cardsHtml = "";
    quotes.forEach(function(q) {
      const isL = (Number(q.premium)||0) === lowest;
      let fieldsHtml = "";
      (q.customFields||[]).forEach(function(f) {
        if (f.v) {
          fieldsHtml += "<tr>" +
            "<td style='padding:5px 8px;font-size:11px;color:#666;border-bottom:1px solid #eee;width:55%'>" + f.l + "</td>" +
            "<td style='padding:5px 8px;font-size:11px;font-weight:700;color:#1a2744;text-align:right;border-bottom:1px solid #eee'>" + f.v + "</td>" +
            "</tr>";
        }
      });
      const notesHtml = q.notes ? "<p style='font-size:10px;color:#666;font-style:italic;margin-top:8px;line-height:1.4'>" + q.notes + "</p>" : "";
      const bestBadge = isL ? "<div style='background:#c9a84c;color:#1a2744;font-size:9px;font-weight:700;text-align:center;padding:3px;letter-spacing:1px'>⭐ LOWEST PREMIUM</div>" : "";

      cardsHtml +=
        "<td style='vertical-align:top;padding:0 6px;width:" + Math.floor(100/quotes.length) + "%'>" +
        "<div style='border:2px solid " + (isL?"#c9a84c":"#ddd") + ";border-radius:10px;overflow:hidden;height:100%'>" +
        bestBadge +
        "<div style='height:4px;background:" + (q.color||"#1a2744") + "'></div>" +
        "<div style='padding:12px'>" +
        "<div style='font-size:15px;font-weight:700;color:#1a2744;margin-bottom:2px'>" + q.carrier + "</div>" +
        "<div style='font-size:11px;color:#666;margin-bottom:6px'>" + q.plan + "</div>" +
        "<div style='display:inline-block;background:" + (q.color||"#1a2744") + ";color:#fff;font-size:9px;padding:2px 7px;border-radius:20px;margin-bottom:10px'>" + q.line + "</div>" +
        "<div style='background:#f7f5f0;border-radius:8px;padding:8px;text-align:center;margin-bottom:10px'>" +
        "<div style='font-size:9px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:2px'>Monthly Premium</div>" +
        "<div style='font-size:24px;font-weight:700;color:" + (isL?"#2d7a4f":"#1a2744") + ";font-family:Georgia,serif'>" +
        (Number(q.premium)===0?"$0":"$"+q.premium+"/mo") + "</div></div>" +
        (fieldsHtml ? "<table style='width:100%;border-collapse:collapse;margin-bottom:4px'>" + fieldsHtml + "</table>" : "") +
        notesHtml +
        "</div></div></td>";
    });

    const html =
      "<!DOCTYPE html><html><head><title>Quote — " + clientName + "</title>" +
      "<style>" +
      "body{font-family:Georgia,serif;padding:24px;color:#1a1a2e;margin:0}" +
      "h1{margin:0 0 4px;font-size:20px;color:#1a2744}" +
      "@media print{body{padding:16px}.no-print{display:none}}" +
      "</style></head><body>" +

      // Header
      "<table style='width:100%;border-bottom:3px solid #1a2744;padding-bottom:14px;margin-bottom:20px'><tr>" +
      "<td><h1>Quote Comparison</h1>" +
      "<p style='margin:2px 0;font-size:13px;color:#5a5a7a'>Prepared for: <strong>" + clientName + "</strong></p>" +
      "<p style='margin:2px 0;font-size:12px;color:#5a5a7a'>Line: " + activeLine + " &nbsp;|&nbsp; Date: " + today + "</p></td>" +
      "<td style='text-align:right'>" +
      (profile?.logoUrl ? "<img src='" + profile.logoUrl + "' style='height:50px;margin-bottom:6px;display:block;margin-left:auto'>" : "") +
      "<div style='font-weight:700;font-size:14px;color:#1a2744'>" + (profile?.agencyName||"") + "</div>" +
      "<div style='font-size:12px;color:#5a5a7a'>" + agentName + (profile?.title?" · "+profile.title:"") + "</div>" +
      "<div style='font-size:11px;color:#5a5a7a'>" + (profile?.phone||"") + (profile?.email?" &nbsp;|&nbsp; "+profile.email:"") + "</div>" +
      "<div style='font-size:11px;color:#5a5a7a'>" + (profile?.website||"") + "</div>" +
      "</td></tr></table>" +

      // Quote cards side by side
      "<table style='width:100%;border-collapse:collapse;margin-bottom:20px'><tr>" +
      cardsHtml +
      "</tr></table>" +

      // Footer
      "<table style='width:100%;border-top:2px solid #1a2744;padding-top:12px;margin-top:4px'><tr>" +
      "<td><div style='font-size:12px;font-weight:700;color:#1a2744'>" + agentName + "</div>" +
      "<div style='font-size:11px;color:#5a5a7a'>" + (profile?.agencyName||"") + (profile?.phone?" · "+profile.phone:"") + (profile?.email?" · "+profile.email:"") + "</div>" +
      "<div style='font-size:11px;color:#5a5a7a'>Licensed in: " + (profile?.states||"") + "</div></td>" +
      "<td style='text-align:right;font-size:10px;color:#999'>For illustration purposes only.<br>Rates subject to underwriting approval.</td>" +
      "</tr></table>" +

      "</body></html>";

    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(function(){ w.print(); }, 600);
  };

  const buildEmailDraft = () => {
    const subject = `Insurance Quote Comparison — ${clientName}`;
    const body =
      `Hi ${clientName},\n\nPlease find your personalized insurance quote comparison below.\n\n` +
      quotes.map(q =>
        `${q.carrier} — ${q.plan}\n` +
        `Premium: $${q.premium}/mo\n` +
        (q.customFields||[]).map(f => `${f.l}: ${f.v}`).join("\n") +
        `\nNotes: ${q.notes||""}\n`
      ).join("\n---\n") +
      `\n\nBest regards,\n${profile?.firstName||""} ${profile?.lastName||""}\n${profile?.agencyName||""}\n${profile?.phone||""}\n${profile?.email||""}`;
    return { subject, body };
  };

  // Primary path: copy the draft to clipboard. This always works regardless of
  // mail client setup, unlike mailto links which silently fail past a certain
  // length or when no default mail app is configured.
  const copyEmailDraft = async () => {
    const { subject, body } = buildEmailDraft();
    const fullText = `Subject: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    } catch (err) {
      // Clipboard API can fail on older browsers or without HTTPS — fall back
      // to a manual select-and-copy via a temporary textarea.
      const ta = document.createElement("textarea");
      ta.value = fullText;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); setEmailCopied(true); setTimeout(()=>setEmailCopied(false),2500); }
      catch { alert("Couldn't copy automatically — please select and copy the draft manually."); }
      document.body.removeChild(ta);
    }
  };

  // Secondary path: try to open the device's mail client. Works well for short
  // quotes; for longer ones, the Copy Draft button above is the reliable option.
  const openMailClient = () => {
    const { subject, body } = buildEmailDraft();
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>Quote Comparison</h2>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6,flexWrap:"wrap"}}>
            <span style={{fontSize:12,color:T.sub,fontFamily:"'Lato',sans-serif"}}>Client:</span>
            <input value={clientName} onChange={e=>setClientName(e.target.value)}
              style={{fontSize:14,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",border:"none",borderBottom:`2px solid ${T.gold}`,background:"transparent",outline:"none",padding:"2px 4px"}}/>
            {linkedClient ? (
              <span style={{display:"flex",alignItems:"center",gap:5,fontSize:10.5,color:T.green,fontFamily:"'Lato',sans-serif",fontWeight:700,background:`${T.green}14`,padding:"3px 9px",borderRadius:20}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:T.green,display:"inline-block"}}/>
                Linked to client profile
                <button onClick={()=>setShowClientPicker(true)} style={{background:"none",border:"none",color:T.green,textDecoration:"underline",cursor:"pointer",fontSize:10.5,fontFamily:"'Lato',sans-serif",fontWeight:700,padding:0,marginLeft:2}}>change</button>
              </span>
            ) : (
              <button onClick={()=>setShowClientPicker(true)} style={{fontSize:10.5,color:T.gold,background:"none",border:`1px solid ${T.gold}55`,borderRadius:20,padding:"3px 9px",cursor:"pointer",fontFamily:"'Lato',sans-serif",fontWeight:700}}>
                + Save to Client Profile
              </button>
            )}
          </div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"flex-end"}}>
          <button onClick={copyEmailDraft} style={{background: emailCopied ? T.green : T.card,border:`1px solid ${emailCopied ? T.green : T.border}`,borderRadius:12,padding:"10px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",color: emailCopied ? "#fff" : T.sub,display:"flex",alignItems:"center",gap:6,transition:"all 0.15s"}}>
            {emailCopied ? "Copied to Clipboard" : "Copy Email Draft"}
          </button>
          <button onClick={openMailClient} title="Open your device's mail app with this draft" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"10px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",color:T.sub,display:"flex",alignItems:"center",gap:6}}>
            Open Mail App
          </button>
          <button onClick={printQuote} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"10px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",color:T.sub,display:"flex",alignItems:"center",gap:6}}>
            Print / PDF
          </button>
          {quotes.length>0&&<button onClick={exportJSON} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"10px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",color:T.sub,display:"flex",alignItems:"center",gap:6}}>
            Export Data
          </button>}
          <button onClick={()=>{setNewQ(blankQuote(linkedClient?.id||null));setEditing(null);setShowAdd(true);}} style={{background:T.gold,color:"#fff",border:"none",borderRadius:12,padding:"10px 18px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Add Quote</button>
        </div>
      </div>

      {/* Summary bar */}
      <div style={{background:T.navy,borderRadius:16,padding:"14px 20px",marginBottom:18,display:"flex",gap:24,flexWrap:"wrap"}}>
        {[
          {label:"Plans Compared",value:quotes.length},
          {label:"Lowest Premium",value:lowest===0?"$0/mo (Free)":`$${lowest}/mo`},
          {label:"Line",value:activeLine},
        ].map(({label,value})=>(
          <div key={label}>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1}}>{label}</div>
            <div style={{fontSize:16,fontWeight:700,color:"#fff",fontFamily:"'Courier Prime',monospace",marginTop:2}}>{value}</div>
          </div>
        ))}
      </div>

      {/* Quote cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
        {quotes.map(q=>{
          const isLowest = (Number(q.premium)||0)===lowest;
          return (
            <div key={q.id} style={{background:T.surface,border:`2px solid ${isLowest?T.gold:T.border}`,borderRadius:18,overflow:"hidden",animation:"fadeUp 0.3s ease"}}>
              {isLowest && <div style={{background:T.gold,color:"#fff",fontSize:10,fontWeight:700,fontFamily:"'Lato',sans-serif",textAlign:"center",padding:"4px",letterSpacing:1}}>⭐ LOWEST PREMIUM</div>}
              <div style={{height:5,background:q.color||lineColor(q.line)}}/>
              <div style={{padding:16}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:2}}>
                  <div>
                    <div style={{fontSize:17,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>{q.carrier}</div>
                    {deletedCarrierNames.has(q.carrier) && (
                      <div style={{fontSize:10,color:T.red,fontFamily:"'Lato',sans-serif",fontWeight:700,marginTop:2}}>Deleted Carrier — historical quote preserved</div>
                    )}
                  </div>
                  <div style={{display:"flex",gap:6,alignItems:"center"}}>
                    {/* Portal links dropdown — only shown if matching links exist */}
                    {linksForCarrier(q.carrier).length > 0 && (
                      <select onChange={e=>{ if(e.target.value) window.open(e.target.value,"_blank"); e.target.value=""; }}
                        defaultValue=""
                        style={{padding:"3px 8px",border:`1px solid ${T.border}`,borderRadius:8,fontSize:11,color:T.navy,background:T.surface,cursor:"pointer",fontFamily:"'Lato',sans-serif",fontWeight:600}}>
                        <option value="">🔗 Portal</option>
                        {linksForCarrier(q.carrier).map(l=>(
                          <option key={l.id} value={l.url}>{l.type==="login"?"Login":l.type==="quoting"?"Quoting":l.type==="enrollment"?"Enrollment":l.type==="commission"?"Commission":l.type==="training"?"Training":l.type==="marketing"?"Marketing":"Link"}</option>
                        ))}
                      </select>
                    )}
                    <button onClick={()=>startEdit(q)} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,padding:"3px 9px",fontSize:11,color:T.sub,cursor:"pointer",fontFamily:"'Lato',sans-serif"}}>Edit</button>
                  </div>
                </div>
                {/* Status selector */}
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
                  {QUOTE_STATUSES.map(s=>(
                    <button key={s.id} onClick={()=>setQuotes(quotes.map(x=>x.id===q.id?{...x,status:s.id}:x))}
                      style={{padding:"3px 9px",borderRadius:20,border:`1px solid ${(q.status||"open")===s.id?s.color:T.border}`,background:(q.status||"open")===s.id?s.color+"18":T.surface,color:(q.status||"open")===s.id?s.color:T.sub,cursor:"pointer",fontSize:10,fontFamily:"'Lato',sans-serif",fontWeight:600,transition:"all 0.15s"}}>
                      {s.icon} {s.label}
                    </button>
                  ))}
                </div>
                <div style={{fontSize:12,color:T.sub,fontFamily:"'Lato',sans-serif",marginBottom:4}}>{q.plan}</div>
                <div style={{fontSize:11,color:"#fff",background:lineColor(q.line),padding:"2px 8px",borderRadius:20,display:"inline-block",marginBottom:12,fontFamily:"'Lato',sans-serif",fontWeight:600}}>{q.line}</div>

                {/* Premium */}
                <div style={{background:T.bg,borderRadius:12,padding:"10px 14px",marginBottom:12,textAlign:"center"}}>
                  <div style={{fontSize:10,color:T.sub,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1}}>Monthly Premium</div>
                  <div style={{fontSize:30,fontWeight:700,color:isLowest?T.green:T.navy,fontFamily:"'Courier Prime',monospace",marginTop:2}}>
                    {Number(q.premium)===0?"$0":` $${q.premium}`}
                  </div>
                  {Number(q.premium)===0&&<div style={{fontSize:10,color:T.green,fontFamily:"'Lato',sans-serif",fontWeight:700}}>$0 PREMIUM PLAN</div>}
                </div>

                {/* Custom fields */}
                {(q.customFields||[]).map((f,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${T.border}`}}>
                    <span style={{fontSize:12,color:T.sub,fontFamily:"'Lato',sans-serif"}}>{f.l}</span>
                    <span style={{fontSize:12,fontWeight:700,color:T.navy,fontFamily:"'Courier Prime',monospace",textAlign:"right",maxWidth:"55%"}}>{f.v||"—"}</span>
                  </div>
                ))}

                {q.notes && <div style={{marginTop:10,fontSize:12,color:T.sub,fontFamily:"'Lato',sans-serif",lineHeight:1.5,borderTop:`1px solid ${T.border}`,paddingTop:8}}>{q.notes}</div>}
                {q.bestFor && (
                  <div style={{marginTop:8,background:`${T.blue}10`,border:`1px solid ${T.blue}33`,borderRadius:8,padding:"8px 10px"}}>
                    <div style={{fontSize:10,color:T.blue,fontFamily:"'Lato',sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>✦ Best For</div>
                    <div style={{fontSize:12,color:T.navy,fontFamily:"'Lato',sans-serif",fontWeight:600}}>{q.bestFor}</div>
                  </div>
                )}
                {q.recommendation && (
                  <div style={{marginTop:6,background:`${T.green}10`,border:`1px solid ${T.green}33`,borderRadius:8,padding:"8px 10px"}}>
                    <div style={{fontSize:10,color:T.green,fontFamily:"'Lato',sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>💬 Agent Recommendation</div>
                    <div style={{fontSize:12,color:T.navy,fontFamily:"'Lato',sans-serif"}}>{q.recommendation}</div>
                  </div>
                )}

                <button onClick={()=>setQuotes(quotes.filter(x=>x.id!==q.id))} style={{marginTop:12,width:"100%",padding:"7px",background:"transparent",border:`1px solid ${T.border}`,borderRadius:8,color:T.sub,fontSize:11,fontFamily:"'Lato',sans-serif",cursor:"pointer"}}>Remove</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Client picker — links this entire quote comparison set to a real
          client profile, retroactively applying to quotes already in this
          comparison, not just ones added after linking. */}
      {showClientPicker && (
        <ClientPickerModal
          clients={clients}
          onClose={()=>setShowClientPicker(false)}
          onSelect={(client)=>{
            const previousClientId = linkedClient?.id || null;
            setLinkedClient(client);
            setClientName(client.name);
            // Re-link every quote that belonged to the previous link (or had
            // no link at all) to the newly selected client — this is what
            // makes "change" actually change the link for quotes already in
            // this comparison set, not just future ones.
            setQuotes(quotes.map(q => (q.clientId===previousClientId) ? {...q, clientId:client.id} : q));
            setShowClientPicker(false);
          }}
        />
      )}

      {/* Add / Edit modal */}
      {showAdd && (
        <div style={{position:"fixed",inset:0,background:"rgba(26,39,68,0.6)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowAdd(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:T.surface,borderRadius:24,padding:24,width:"100%",maxWidth:500,maxHeight:"90vh",overflowY:"auto",animation:"fadeUp 0.3s ease"}}>
            <h3 style={{fontSize:20,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",marginBottom:16}}>{editing?"Edit Quote":"Add Quote"}</h3>

            {/* Core fields */}
            {[
              {label:"Carrier Name",key:"carrier",ph:"e.g. Humana"},
              {label:"Plan Name",key:"plan",ph:"e.g. Gold Plus HMO"},
              {label:"Monthly Premium ($)",key:"premium",ph:"0 for $0 premium plans"},
            ].map(({label,key,ph})=>(
              <div key={key} style={{marginBottom:12}}>
                <div style={{fontSize:10,color:T.sub,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{label}</div>
                <input placeholder={ph} value={newQ[key]} onChange={e=>setNewQ({...newQ,[key]:e.target.value})}
                  style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
                {/* Show portal shortcut below carrier name if links exist */}
                {key==="carrier" && linksForCarrier(newQ.carrier).length > 0 && (
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:6}}>
                    {linksForCarrier(newQ.carrier).map(l=>(
                      <a key={l.id} href={l.url} target="_blank" rel="noreferrer"
                        style={{fontSize:11,color:T.navy,background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,padding:"3px 10px",textDecoration:"none",fontFamily:"'Lato',sans-serif",fontWeight:600}}>
                        🔗 {l.type==="login"?"Agent Login":l.type==="quoting"?"Quoting Tool":l.type==="enrollment"?"Enrollment":l.type==="commission"?"Commission":l.type==="training"?"Training":"Open Portal"}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Line selector */}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:10,color:T.sub,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Line of Business</div>
              <select value={newQ.line} onChange={e=>setNewQ({...newQ,line:e.target.value,customFields:[]})}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none"}}>
                {LINES.map(l=><option key={l}>{l}</option>)}
              </select>
            </div>

            {/* Smart field templates */}
            {(LINE_FIELD_TEMPLATES[newQ.line]||DEFAULT_FIELDS).length>0 && (
              <div style={{marginBottom:16,background:T.bg,borderRadius:12,padding:12,border:`1px solid ${T.border}`}}>
                <div style={{fontSize:10,color:T.navy,fontFamily:"'Lato',sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>⚡ Quick Add — {newQ.line} Fields</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {(LINE_FIELD_TEMPLATES[newQ.line]||DEFAULT_FIELDS).map(f=>{
                    const already = newQ.customFields.find(x=>x.l===f.l);
                    return (
                      <button key={f.l} onClick={()=>applyTemplate(f)} style={{padding:"4px 10px",borderRadius:20,border:`1px solid ${already?T.green:T.border}`,background:already?`${T.green}15`:T.surface,color:already?T.green:T.sub,fontSize:11,fontFamily:"'Lato',sans-serif",cursor:"pointer",fontWeight:600}}>
                        {already?"✓ ":""}{f.l}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Custom fields */}
            {newQ.customFields.length>0 && (
              <div style={{marginBottom:16}}>
                <div style={{fontSize:10,color:T.sub,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Plan Details</div>
                {newQ.customFields.map((f,i)=>(
                  <div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
                    <input value={f.l} onChange={e=>updateCustomField(i,"l",e.target.value)}
                      style={{flex:"0 0 42%",padding:"8px 10px",border:`1px solid ${T.border}`,borderRadius:8,fontSize:12,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none"}}/>
                    <input value={f.v} onChange={e=>updateCustomField(i,"v",e.target.value)} placeholder="value"
                      style={{flex:1,padding:"8px 10px",border:`1px solid ${T.border}`,borderRadius:8,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none",fontWeight:600}}/>
                    <button onClick={()=>removeCustomField(i)} style={{background:"none",border:"none",color:T.sub,cursor:"pointer",fontSize:16,padding:"0 4px"}}>✕</button>
                  </div>
                ))}
              </div>
            )}

            {/* Add custom field */}
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              <input value={newFieldLabel} onChange={e=>setNewFieldLabel(e.target.value)} placeholder="+ Add custom field (e.g. OTC Allowance)" onKeyDown={e=>e.key==="Enter"&&addCustomField()}
                style={{flex:1,padding:"9px 12px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none"}}/>
              <button onClick={addCustomField} style={{padding:"9px 14px",background:T.navy,color:"#fff",border:"none",borderRadius:10,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",fontSize:13}}>Add</button>
            </div>

            {/* Best For */}
            <div style={{marginBottom:12}}>
              <div style={{fontSize:10,color:T.sub,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Best For (client-facing)</div>
              <input placeholder="e.g. Clients who want $0 premium + OTC benefits" value={newQ.bestFor||""} onChange={e=>setNewQ({...newQ,bestFor:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none"}}/>
            </div>
            {/* Agent Recommendation */}
            <div style={{marginBottom:12}}>
              <div style={{fontSize:10,color:T.sub,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Why I Recommend This</div>
              <input placeholder="e.g. Strongest guaranteed death benefit for this age/budget" value={newQ.recommendation||""} onChange={e=>setNewQ({...newQ,recommendation:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none"}}/>
            </div>
            {/* Notes */}
            <div style={{marginBottom:18}}>
              <div style={{fontSize:10,color:T.sub,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Notes</div>
              <textarea placeholder="Highlights, network details, agent tips..." value={newQ.notes} onChange={e=>setNewQ({...newQ,notes:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none",height:70,resize:"none"}}/>
            </div>

            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>{setShowAdd(false);setEditing(null);}} style={{flex:1,padding:"12px",background:T.bg,border:`1px solid ${T.border}`,borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",color:T.sub}}>Cancel</button>
              <button onClick={saveQuote} style={{flex:2,padding:"12px",background:T.navy,color:"#fff",border:"none",borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",fontSize:14}}>{editing?"Save Changes":"Add to Comparison"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Client Quotes Section ────────────────────────────────────────
// Shown inside a client's profile. Reads from the same shared acc_quotes
// store QuoteBuilder writes to, matching by clientId (new quotes) or by name
// (quotes created before clientId existed, kept working rather than orphaned).
function ClientQuotesSection({ client }) {
  const [quotes, setQuotes] = useLocalStorage('acc_quotes', []);
  const [events, setEvents] = useLocalStorage("acc_calendar_events", []);
  const [anniversaryPrompt, setAnniversaryPrompt] = useState(null); // quote pending an anniversary-add prompt

  // Quotes created before this clientId linkage existed have no
  // client-identifying field at all and can't be matched retroactively —
  // they simply won't appear here. Only quotes saved going forward (via the
  // "Smart Intake & Build Quote" flow from this client's profile) will show.
  const clientQuotes = quotes.filter(q => q.clientId === client.id);

  const changeStatus = (quote, newStatus) => {
    setQuotes(quotes.map(q => q.id===quote.id ? {...q, status:newStatus} : q));
    if (newStatus === "closed_won" && quote.status !== "closed_won") {
      setAnniversaryPrompt({...quote, status:newStatus});
    }
  };

  const addAnniversaryToCalendar = (quote, oneYearOut) => {
    const today = new Date();
    const anniversaryDate = oneYearOut ? new Date(today.getFullYear()+1, today.getMonth(), today.getDate()) : today;
    setEvents([...events, {
      id: Date.now(),
      title: `Policy Anniversary — ${client.name} (${quote.carrier})`,
      type: "renewal",
      date: anniversaryDate.toISOString().split("T")[0],
      time: "",
      clientId: client.id,
      notes: `${quote.plan||""} · Closed Won ${today.toISOString().split("T")[0]}`,
    }]);
    setAnniversaryPrompt(null);
  };

  if (clientQuotes.length === 0) return null;

  return (
    <div style={{marginTop:16}}>
      <div style={{fontSize:11,color:T.sub,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>
        Quotes on File ({clientQuotes.length})
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {clientQuotes.map(q=>{
          const statusInfo = QUOTE_STATUSES.find(s=>s.id===(q.status||"open")) || QUOTE_STATUSES[0];
          return (
            <div key={q.id} style={{background:T.bg,borderRadius:12,padding:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.navy,fontFamily:"'Lato',sans-serif"}}>{q.carrier} — {q.plan}</div>
                  <div style={{fontSize:11,color:T.sub,fontFamily:"'Lato',sans-serif"}}>{q.line} · ${q.premium}/mo</div>
                </div>
              </div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {QUOTE_STATUSES.map(s=>(
                  <button key={s.id} onClick={()=>changeStatus(q,s.id)}
                    style={{padding:"3px 9px",borderRadius:20,border:`1px solid ${(q.status||"open")===s.id?s.color:T.border}`,background:(q.status||"open")===s.id?s.color+"18":T.surface,color:(q.status||"open")===s.id?s.color:T.sub,cursor:"pointer",fontSize:10,fontFamily:"'Lato',sans-serif",fontWeight:600,transition:"all 0.15s"}}>
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Policy anniversary prompt — shown once when a quote is marked Closed Won */}
      {anniversaryPrompt && (
        <div style={{position:"fixed",inset:0,background:"rgba(26,39,68,0.55)",zIndex:140,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setAnniversaryPrompt(null)}>
          <div onClick={e=>e.stopPropagation()} style={{background:T.surface,borderRadius:20,padding:24,width:"100%",maxWidth:380}}>
            <div style={{fontSize:17,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",marginBottom:8}}>Policy Closed — Add Anniversary?</div>
            <p style={{fontSize:13,color:T.sub,fontFamily:"'Lato',sans-serif",lineHeight:1.6,marginBottom:18}}>
              Add a policy anniversary reminder to the Calendar for {client.name}'s {anniversaryPrompt.carrier} policy, one year from today?
            </p>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setAnniversaryPrompt(null)} style={{flex:1,padding:"11px",background:T.bg,color:T.sub,border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>Skip</button>
              <button onClick={()=>addAnniversaryToCalendar(anniversaryPrompt, true)} style={{flex:1,padding:"11px",background:T.navy,color:"#fff",border:"none",borderRadius:10,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>Add to Calendar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Scope of Appointment Form ────────────────────────────────────
// Standard CMS Scope of Appointment fields. Auto-populates from the client's
// Medicare intake data and the agent's Profile. Agent fills in anything
// remaining, then prints/exports as PDF for signature and filing.
//
// COMPLIANCE NOTE: This form is a convenience tool that pre-fills known data.
// It does not constitute a legally valid electronic signature — the licensed
// agent is responsible for obtaining proper signatures per CMS requirements
// and their carrier's SOA process.
const SOA_PRODUCTS = [
  "Medicare Advantage Plans (Part C)",
  "Medicare Advantage Prescription Drug Plans (MAPD)",
  "Prescription Drug Plans (Part D)",
  "Medicare Supplement (Medigap) Plans",
  "Medicare Savings Programs / Extra Help",
  "Dental, Vision, and Hearing Plans",
  "Hospital Indemnity Plans",
  "Other Medicare-related Products",
];

function ScopeOfAppointment({ client, profile, onClose }) {
  const intake = client?.intake?.answers || {};
  const today = new Date().toLocaleDateString("en-US");
  const [form, setForm] = useState({
    beneficiaryName: client?.name || "",
    beneficiaryDOB: intake.dateOfBirth || "",
    beneficiaryPhone: client?.phone || "",
    beneficiaryAddress: intake.address || "",
    medicareNumber: intake.medicareNumber || "",
    appointmentDate: today,
    appointmentTime: "",
    contactMethod: "In Person",
    agentName: `${profile?.firstName||""} ${profile?.lastName||""}`.trim(),
    agentPhone: profile?.phone || "",
    agentNPN: profile?.npn || "",
    agentLicense: profile?.licenseNum || "",
    agencyName: profile?.agencyName || "",
    products: [],
    notes: "",
  });

  const set = (key, val) => setForm(f=>({...f,[key]:val}));
  const toggleProduct = (p) => setForm(f=>({...f, products: f.products.includes(p)?f.products.filter(x=>x!==p):[...f.products,p]}));

  const printSOA = () => {
    const w = window.open("","_blank");
    if (!w) { alert("Please allow popups to print/save the SOA."); return; }
    w.document.write(`<!DOCTYPE html><html><head>
      <title>Scope of Appointment — ${form.beneficiaryName}</title>
      <style>
        body{font-family:Arial,sans-serif;font-size:12px;margin:40px;color:#000;}
        h1{font-size:16px;text-align:center;margin-bottom:4px;}
        h2{font-size:13px;border-bottom:1px solid #000;padding-bottom:4px;margin-top:20px;}
        .subtitle{text-align:center;font-size:11px;margin-bottom:20px;color:#444;}
        .row{display:flex;gap:20px;margin-bottom:10px;}
        .field{flex:1;}
        .field label{font-weight:bold;font-size:10px;display:block;margin-bottom:2px;color:#555;text-transform:uppercase;}
        .val{border-bottom:1px solid #000;min-height:18px;padding:2px 0;font-size:12px;}
        .product{margin:5px 0;font-size:11px;}
        .box{display:inline-block;width:12px;height:12px;border:1px solid #000;margin-right:6px;vertical-align:middle;}
        .checked{background:#000;}
        .sig-row{display:flex;gap:40px;margin-top:30px;}
        .sig{flex:1;border-top:1px solid #000;padding-top:4px;font-size:10px;color:#555;}
        .note{font-size:9px;color:#666;margin-top:20px;border-top:1px solid #ccc;padding-top:8px;line-height:1.5;}
      </style></head><body>
      <h1>SCOPE OF APPOINTMENT</h1>
      <div class="subtitle">Medicare Sales Appointment Confirmation<br>This form must be completed before discussing Medicare products</div>
      <h2>Beneficiary Information</h2>
      <div class="row">
        <div class="field"><label>Full Name</label><div class="val">${form.beneficiaryName}</div></div>
        <div class="field"><label>Date of Birth</label><div class="val">${form.beneficiaryDOB}</div></div>
      </div>
      <div class="row">
        <div class="field"><label>Phone Number</label><div class="val">${form.beneficiaryPhone}</div></div>
        <div class="field"><label>Medicare Number (MBI)</label><div class="val">${form.medicareNumber}</div></div>
      </div>
      <div class="row"><div class="field"><label>Address</label><div class="val">${form.beneficiaryAddress}</div></div></div>
      <h2>Appointment Information</h2>
      <div class="row">
        <div class="field"><label>Date</label><div class="val">${form.appointmentDate}</div></div>
        <div class="field"><label>Time</label><div class="val">${form.appointmentTime}</div></div>
        <div class="field"><label>Method of Contact</label><div class="val">${form.contactMethod}</div></div>
      </div>
      <h2>Agent / Broker Information</h2>
      <div class="row">
        <div class="field"><label>Agent Name</label><div class="val">${form.agentName}</div></div>
        <div class="field"><label>Agency Name</label><div class="val">${form.agencyName}</div></div>
      </div>
      <div class="row">
        <div class="field"><label>Phone</label><div class="val">${form.agentPhone}</div></div>
        <div class="field"><label>NPN</label><div class="val">${form.agentNPN}</div></div>
        <div class="field"><label>License #</label><div class="val">${form.agentLicense}</div></div>
      </div>
      <h2>Products to Be Discussed</h2>
      <p style="font-size:11px;margin:4px 0 8px;">The beneficiary requests information on the following (check all that apply):</p>
      ${SOA_PRODUCTS.map(p=>`<div class="product"><span class="box${form.products.includes(p)?" checked":""}"></span>${p}</div>`).join("")}
      ${form.notes?`<h2>Notes</h2><p style="font-size:11px;">${form.notes}</p>`:""}
      <h2>Acknowledgment &amp; Signatures</h2>
      <p style="font-size:10px;margin-bottom:16px;">By signing below, the beneficiary confirms they requested this appointment and agrees the above products may be discussed. The agent confirms they will only discuss the selected products.</p>
      <div class="sig-row">
        <div class="sig">Beneficiary Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
        <div class="sig">Agent Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
      </div>
      <div class="note"><strong>Important:</strong> This Scope of Appointment is required by CMS before any Medicare sales appointment. Both parties must sign and date. Retain copies for 10 years per CMS guidelines. Call 1-800-MEDICARE (1-800-633-4227) with questions.</div>
      <script>window.onload=()=>window.print();</script>
    </body></html>`);
    w.document.close();
  };

  const Field = ({label, fkey, span, type, placeholder}) => (
    <div style={span?{gridColumn:"span 2"}:{}}>
      <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:0.5,marginBottom:3}}>{label}</div>
      {type==="select" ? null :
        <input type={type||"text"} value={form[fkey]} onChange={e=>set(fkey,e.target.value)} placeholder={placeholder||""}
          style={{width:"100%",padding:"8px 10px",border:`1px solid ${T.border}`,borderRadius:8,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>}
    </div>
  );

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(26,39,68,0.6)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.surface,borderRadius:24,width:"100%",maxWidth:600,maxHeight:"90vh",overflowY:"auto",padding:26}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
          <div>
            <div style={{fontSize:11,color:"#003087",fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,fontWeight:700,marginBottom:4}}>Medicare · CMS Required</div>
            <h2 style={{fontSize:22,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",margin:0}}>Scope of Appointment</h2>
            <div style={{fontSize:12,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:4}}>Pre-filled from {client.name}'s profile — review and complete before printing.</div>
          </div>
          <button onClick={onClose} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:10,width:32,height:32,cursor:"pointer",color:T.muted,fontSize:16,flexShrink:0}}>×</button>
        </div>

        {[
          {section:"Beneficiary Information", fields:[
            {label:"Full Name",key:"beneficiaryName"},{label:"Date of Birth",key:"beneficiaryDOB",placeholder:"MM/DD/YYYY"},
            {label:"Phone Number",key:"beneficiaryPhone"},{label:"Medicare Number (MBI)",key:"medicareNumber"},
            {label:"Address",key:"beneficiaryAddress",span:true},
          ]},
          {section:"Appointment Information", fields:null},
          {section:"Agent / Broker Information", fields:[
            {label:"Agent Name",key:"agentName"},{label:"Agency Name",key:"agencyName"},
            {label:"Agent Phone",key:"agentPhone"},{label:"NPN",key:"agentNPN"},{label:"License Number",key:"agentLicense"},
          ]},
        ].map(({section,fields})=>(
          <div key={section}>
            <div style={{fontSize:11,color:T.navy,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,fontWeight:700,marginBottom:10,borderBottom:`1px solid ${T.border}`,paddingBottom:6}}>{section}</div>
            {section==="Appointment Information" ? (
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
                <div><div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:0.5,marginBottom:3}}>Date</div>
                  <input value={form.appointmentDate} onChange={e=>set("appointmentDate",e.target.value)} style={{width:"100%",padding:"8px 10px",border:`1px solid ${T.border}`,borderRadius:8,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/></div>
                <div><div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:0.5,marginBottom:3}}>Time</div>
                  <input type="time" value={form.appointmentTime} onChange={e=>set("appointmentTime",e.target.value)} style={{width:"100%",padding:"8px 10px",border:`1px solid ${T.border}`,borderRadius:8,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/></div>
                <div><div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:0.5,marginBottom:3}}>Method of Contact</div>
                  <select value={form.contactMethod} onChange={e=>set("contactMethod",e.target.value)} style={{width:"100%",padding:"8px 10px",border:`1px solid ${T.border}`,borderRadius:8,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}>
                    {["In Person","Phone","Video Call","Email","Other"].map(o=><option key={o}>{o}</option>)}</select></div>
              </div>
            ) : (
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                {fields.map(f=>(
                  <div key={f.key} style={f.span?{gridColumn:"span 2"}:{}}>
                    <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:0.5,marginBottom:3}}>{f.label}</div>
                    <input value={form[f.key]} onChange={e=>set(f.key,e.target.value)} placeholder={f.placeholder||""}
                      style={{width:"100%",padding:"8px 10px",border:`1px solid ${T.border}`,borderRadius:8,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div style={{fontSize:11,color:T.navy,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,fontWeight:700,marginBottom:6,borderBottom:`1px solid ${T.border}`,paddingBottom:6}}>Products to Be Discussed</div>
        <div style={{fontSize:11.5,color:T.muted,fontFamily:"'Lato',sans-serif",marginBottom:10}}>Check all products you will discuss at this appointment:</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
          {SOA_PRODUCTS.map(p=>(
            <label key={p} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",fontSize:13,color:T.sub,fontFamily:"'Lato',sans-serif"}}>
              <input type="checkbox" checked={form.products.includes(p)} onChange={()=>toggleProduct(p)} style={{width:16,height:16,cursor:"pointer",accentColor:T.navy}}/>
              {p}
            </label>
          ))}
        </div>

        <div style={{marginBottom:14}}>
          <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:0.5,marginBottom:3}}>Notes (optional)</div>
          <textarea value={form.notes} onChange={e=>set("notes",e.target.value)} rows={2}
            style={{width:"100%",padding:"8px 10px",border:`1px solid ${T.border}`,borderRadius:8,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg,resize:"vertical"}}/>
        </div>

        <div style={{fontSize:10.5,color:T.sub,fontFamily:"'Lato',sans-serif",background:T.bg,borderRadius:10,padding:"10px 14px",marginBottom:18,lineHeight:1.6,borderLeft:"3px solid #003087"}}>
          <strong>Compliance reminder:</strong> Both parties must sign and date the printed SOA. Retain copies for 10 years per CMS requirements. This tool pre-fills known data — the licensed agent is responsible for accuracy and compliance.
        </div>

        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{flex:1,padding:"12px",background:T.bg,color:T.sub,border:`1px solid ${T.border}`,borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>Cancel</button>
          <button onClick={printSOA} style={{flex:2,padding:"12px",background:"#003087",color:"#fff",border:"none",borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>Print / Save as PDF</button>
        </div>
      </div>
    </div>
  );
}

// ── Client Profiles ───────────────────────────────────────────
function ClientProfiles({ initialClient, onQuoteClient, onDiscoverClient, setTab, profile }) {
  const [clients, setClients] = useLocalStorage('acc_clients', SAMPLE_CLIENTS);
  const [selected, setSelected] = useState(initialClient||null);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [newClient, setNewClient] = useState({name:"",age:"",dateOfBirth:"",phone:"",email:"",line:"Health & ACA",status:"Prospect",notes:""});
  const [newNote, setNewNote] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [confirmArchive, setConfirmArchive] = useState(null); // client pending archive confirmation
  const [intakeClient, setIntakeClient] = useState(null); // client currently in the Smart Intake flow, or null
  const [soaClient, setSoaClient] = useState(null); // client currently in the SOA form, or null

  const filtered = clients.filter(c=>c.name.toLowerCase().includes(search.toLowerCase()) && !!c.archived===showArchived);

  const archiveClient = (client) => {
    const updated = clients.map(c=>c.id===client.id?{...c,archived:true,archivedDate:new Date().toISOString().split("T")[0]}:c);
    setClients(updated);
    if (selected?.id===client.id) setSelected(null);
    setConfirmArchive(null);
  };

  const restoreClient = (client) => {
    const updated = clients.map(c=>c.id===client.id?{...c,archived:false,archivedDate:null}:c);
    setClients(updated);
  };

  const addClient = () => {
    if (!newClient.name) return;
    setClients([...clients,{...newClient,id:Date.now(),lastContact:new Date().toISOString().split("T")[0],quotes:[]}]);
    setNewClient({name:"",age:"",dateOfBirth:"",phone:"",email:"",line:"Health & ACA",status:"Prospect",notes:""});
    setShowAdd(false);
  };

  const addNote = () => {
    if (!newNote.trim() || !selected) return;
    const date = new Date().toLocaleDateString();
    const updated = clients.map(c=>c.id===selected.id?{...c,notes:c.notes+`\n[${date}] ${newNote}`,lastContact:new Date().toISOString().split("T")[0]}:c);
    setClients(updated);
    setSelected(updated.find(c=>c.id===selected.id));
    setNewNote("");
  };

  // Export to CSV — backup/safety net since data only lives in this browser
  const exportCSV = () => {
    const rows = [["Name","Age","Phone","Email","Line","Status","Last Contact","Notes"]];
    clients.forEach(c=>rows.push([c.name,c.age,c.phone,c.email,c.line,c.status,c.lastContact,(c.notes||"").replace(/\n/g," | ")]));
    const csv = rows.map(r=>r.map(v=>'"'+(v??"")+'"').join(",")).join("\n");
    const blob = new Blob([csv],{type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="clients.csv"; a.click();
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>Client Profiles</h2>
          <p style={{fontSize:13,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>{clients.filter(c=>!c.archived).length} active · {clients.filter(c=>c.archived).length} archived</p>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={()=>setShowArchived(!showArchived)} style={{background: showArchived ? T.navy : T.card,color: showArchived ? "#fff" : T.sub,border:`1px solid ${showArchived ? T.navy : T.border}`,borderRadius:12,padding:"10px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer"}}>
            {showArchived ? "Viewing Archived" : "View Archived"}
          </button>
          {clients.length>0&&<button onClick={exportCSV} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"10px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",color:T.sub}}>Export CSV</button>}
          {!showArchived && <button onClick={()=>setShowAdd(true)} style={{background:T.navy,color:"#fff",border:"none",borderRadius:12,padding:"10px 18px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Add Client</button>}
        </div>
      </div>

      {/* Search */}
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search clients..." style={{width:"100%",padding:"12px 16px",border:`1px solid ${T.border}`,borderRadius:12,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.surface,marginBottom:16}}/>

      {showArchived && filtered.length>0 && (
        <div style={{fontSize:12,color:T.muted,fontFamily:"'Lato',sans-serif",marginBottom:12,background:T.bg,padding:"10px 14px",borderRadius:10}}>
          Archived clients are hidden from quoting and search by default. Restore a client to make them active again.
        </div>
      )}

      {/* Client list */}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {filtered.length===0 && (
          <div style={{textAlign:"center",padding:"40px 20px",color:T.muted,fontFamily:"'Lato',sans-serif",fontSize:13}}>
            {showArchived ? "No archived clients." : "No clients found."}
          </div>
        )}
        {filtered.map(c=>(
          <div key={c.id} onClick={()=>!showArchived && setSelected(c)} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:16,padding:16,cursor: showArchived ? "default" : "pointer",display:"flex",alignItems:"center",gap:14,transition:"all 0.15s",animation:"fadeUp 0.3s ease",opacity: c.archived ? 0.7 : 1}}
            onMouseEnter={e=>{if(!showArchived){e.currentTarget.style.boxShadow="0 4px 20px rgba(26,39,68,0.08)";e.currentTarget.style.borderColor=T.navy;}}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=T.border;}}>
            <div style={{width:48,height:48,borderRadius:14,background:lineColor(c.line),display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:18,fontWeight:700,fontFamily:"'Playfair Display',serif",flexShrink:0}}>
              {c.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:16,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>{c.name}</div>
              <div style={{fontSize:12,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>
                {c.line} {c.age?`· Age ${c.age}`:""}
              </div>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>
                {c.archived ? `Archived ${c.archivedDate||""}` : `Last contact: ${c.lastContact}`}
              </div>
            </div>
            {showArchived ? (
              <button onClick={(e)=>{e.stopPropagation();restoreClient(c);}} style={{background:T.navy,color:"#fff",border:"none",borderRadius:10,padding:"8px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",flexShrink:0}}>Restore</button>
            ) : (
              <div style={{textAlign:"right"}}>
                <span style={{fontSize:11,background:`${statusColor(c.status)}18`,color:statusColor(c.status),padding:"4px 10px",borderRadius:20,fontFamily:"'Lato',sans-serif",fontWeight:700,border:`1px solid ${statusColor(c.status)}44`}}>{c.status}</span>
              </div>
            )}
          </div>
        ))}
      </div>


      {/* Client detail modal */}
      {selected && (
        <div style={{position:"fixed",inset:0,background:"rgba(26,39,68,0.5)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20,animation:"fadeIn 0.2s ease"}} onClick={()=>setSelected(null)}>
          <div onClick={e=>e.stopPropagation()} style={{background:T.surface,borderRadius:24,padding:28,width:"100%",maxWidth:500,maxHeight:"85vh",overflowY:"auto",animation:"fadeUp 0.3s ease"}}>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
              <div style={{width:54,height:54,borderRadius:16,background:lineColor(selected.line),display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:20,fontWeight:700,fontFamily:"'Playfair Display',serif"}}>
                {selected.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:22,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>{selected.name}</div>
                <span style={{fontSize:11,background:`${statusColor(selected.status)}18`,color:statusColor(selected.status),padding:"3px 10px",borderRadius:20,fontFamily:"'Lato',sans-serif",fontWeight:700}}>{selected.status}</span>
              </div>
              <button onClick={()=>setSelected(null)} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:10,width:34,height:34,cursor:"pointer",fontSize:16,color:T.muted}}>✕</button>
            </div>

            {[
              {label:"Phone",value:selected.phone},
              {label:"Email",value:selected.email},
              {label:"Line",value:selected.line},
              {label:"Age",value:selected.age||"N/A"},
            ].map(({label,value})=>(
              <div key={label} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${T.border}`}}>
                <div>
                  <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1}}>{label}</div>
                  <div style={{fontSize:14,color:T.navy,fontFamily:"'Lato',sans-serif",fontWeight:600,marginTop:1}}>{value}</div>
                </div>
              </div>
            ))}

            {/* Notes */}
            <div style={{marginTop:16}}>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Notes & Activity</div>
              <div style={{background:T.bg,borderRadius:12,padding:14,fontSize:13,color:T.sub,fontFamily:"'Lato',sans-serif",lineHeight:1.8,minHeight:80,whiteSpace:"pre-line"}}>{selected.notes||"No notes yet."}</div>
            </div>

            {/* Quotes on file for this client — pulled from the shared quotes
                store by clientId (falling back to a name match for quotes
                created before this linkage existed). Status can be changed
                right here; marking a quote Closed Won offers to add the
                policy anniversary to the Calendar. */}
            <ClientQuotesSection client={selected}/>

            {/* SOA Form — Medicare clients only */}
            {(selected.line === "Medicare" || selected.intake?.lines?.includes("Medicare")) && (
              <button onClick={()=>setSoaClient(selected)}
                style={{width:"100%",marginTop:14,padding:"13px",background:"#003087",color:"#fff",border:"none",borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                📋 Scope of Appointment for {selected.name}
              </button>
            )}

            {/* Discovery with Quinn */}
            <button onClick={()=>{onDiscoverClient && onDiscoverClient(selected); setSelected(null);}}
              style={{width:"100%",marginTop:14,padding:"13px",background:"transparent",color:"#0284C7",border:"2px solid #0284C7",borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              Start Discovery with Quinn for {selected.name} →
            </button>

            {/* Quote this client */}
            {selected.intake?.savedDate && (
              <div style={{fontSize:11, color:T.green, fontFamily:"'Lato',sans-serif", marginTop:14, display:"flex", alignItems:"center", gap:6}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:T.green,display:"inline-block"}}/>
                Intake on file ({selected.intake.lines.join(", ")}) — saved {selected.intake.savedDate}
              </div>
            )}

            {/* Skip to Quote — always available, no intake required */}
            <button onClick={()=>{ setSelected(null); onQuoteClient && onQuoteClient(selected); }}
              style={{width:"100%",marginTop:8,padding:"13px",background:T.green,color:"#fff",border:"none",borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              ✓ Skip to Quote for {selected.name}
            </button>

            <button onClick={()=>setIntakeClient(selected)}
              style={{width:"100%",marginTop:8,padding:"13px",background:T.navy,color:"#fff",border:"none",borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              {selected.intake?.savedDate ? "Review Intake & Build Quote" : "Smart Intake & Build Quote"} for {selected.name} →
            </button>

            {/* Add note */}
            <div style={{marginTop:10,display:"flex",gap:8}}>
              <input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add a note..." onKeyDown={e=>e.key==="Enter"&&addNote()}
                style={{flex:1,padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
              <button onClick={addNote} style={{padding:"10px 16px",background:T.navy,color:"#fff",border:"none",borderRadius:10,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",fontSize:13}}>Save</button>
            </div>

            {/* Archive — separated visually from primary actions to prevent accidental clicks */}
            <button onClick={()=>setConfirmArchive(selected)} style={{width:"100%",marginTop:16,padding:"11px",background:"transparent",color:T.red,border:`1px solid ${T.red}33`,borderRadius:10,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer"}}>
              Archive Client
            </button>
          </div>
        </div>
      )}

      {/* Archive confirmation */}
      {confirmArchive && (
        <div style={{position:"fixed",inset:0,background:"rgba(26,39,68,0.5)",zIndex:120,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setConfirmArchive(null)}>
          <div onClick={e=>e.stopPropagation()} style={{background:T.surface,borderRadius:20,padding:24,width:"100%",maxWidth:380}}>
            <div style={{fontSize:17,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",marginBottom:8}}>Archive {confirmArchive.name}?</div>
            <p style={{fontSize:13,color:T.sub,fontFamily:"'Lato',sans-serif",lineHeight:1.6,marginBottom:18}}>
              This client will be hidden from your active list and search. Their notes, quotes, and history are kept and nothing is permanently deleted — you can restore them anytime from the Archived view.
            </p>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setConfirmArchive(null)} style={{flex:1,padding:"11px",background:T.bg,color:T.sub,border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>Cancel</button>
              <button onClick={()=>archiveClient(confirmArchive)} style={{flex:1,padding:"11px",background:T.red,color:"#fff",border:"none",borderRadius:10,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>Archive</button>
            </div>
          </div>
        </div>
      )}

      {/* Add client modal */}
      {showAdd && (
        <div style={{position:"fixed",inset:0,background:"rgba(26,39,68,0.5)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowAdd(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:T.surface,borderRadius:24,padding:28,width:"100%",maxWidth:440,maxHeight:"85vh",overflowY:"auto",animation:"fadeUp 0.3s ease"}}>
            <h3 style={{fontSize:20,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",marginBottom:18}}>Add Client</h3>
            {[
              {label:"Full Name",key:"name",ph:"e.g. John Smith"},
              {label:"Age",key:"age",ph:"e.g. 58"},
              {label:"Phone",key:"phone",ph:"901-555-0100"},
              {label:"Email",key:"email",ph:"john@email.com"},
            ].map(({label,key,ph})=>(
              <div key={key} style={{marginBottom:12}}>
                <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>{label}</div>
                <input placeholder={ph} value={newClient[key]} onChange={e=>setNewClient({...newClient,[key]:e.target.value})}
                  style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
              </div>
            ))}
            <div style={{marginBottom:12}}>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Date of Birth</div>
              <input type="date" value={newClient.dateOfBirth} onChange={e=>setNewClient({...newClient,dateOfBirth:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
              <div style={{fontSize:10.5,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:4}}>Adds their birthday to the Calendar automatically.</div>
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Line of Business</div>
              <select value={newClient.line} onChange={e=>setNewClient({...newClient,line:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none"}}>
                {LINES.map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Status</div>
              <select value={newClient.status} onChange={e=>setNewClient({...newClient,status:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none"}}>
                {["Prospect","Active","Renewal Due","Inactive"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{marginBottom:18}}>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Notes</div>
              <textarea placeholder="Health conditions, preferences, situation..." value={newClient.notes} onChange={e=>setNewClient({...newClient,notes:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none",height:80,resize:"none"}}/>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setShowAdd(false)} style={{flex:1,padding:"12px",background:T.bg,border:`1px solid ${T.border}`,borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",color:T.sub}}>Cancel</button>
              <button onClick={addClient} style={{flex:2,padding:"12px",background:T.navy,color:"#fff",border:"none",borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",fontSize:14}}>Save Client</button>
            </div>
          </div>
        </div>
      )}

      {/* Smart Intake — opened from "Smart Intake & Build Quote"; saves to this
          client's profile, then hands off to the Quotes tab via onQuoteClient. */}
      {intakeClient && (
        <SmartIntake
          client={intakeClient}
          onClose={()=>setIntakeClient(null)}
          onComplete={()=>{
            const updatedClient = clients.find(c=>c.id===intakeClient.id) || intakeClient;
            setIntakeClient(null);
            setSelected(null);
            onQuoteClient && onQuoteClient(updatedClient);
          }}
        />
      )}

      {/* SOA Form */}
      {soaClient && (
        <ScopeOfAppointment
          client={soaClient}
          profile={profile}
          onClose={()=>setSoaClient(null)}
        />
      )}
    </div>
  );
}

// ── Carrier Links ────────────────────────────────────────────
function CarrierLinks() {
  const [links, setLinks] = useLocalStorage("acc_links", []);
  const [showAdd, setShowAdd] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [newLink, setNewLink] = useState({carrier:"", url:"", type:"login", notes:""});
  const [editId, setEditId] = useState(null);

  const filtered = filterType==="All" ? links : links.filter(l=>l.type===filterType);

  const saveLink = () => {
    if (!newLink.carrier || !newLink.url) return;
    const url = newLink.url.startsWith("http") ? newLink.url : "https://"+newLink.url;
    if (editId) {
      setLinks(links.map(l=>l.id===editId?{...newLink,url,id:editId}:l));
      setEditId(null);
    } else {
      setLinks([...links,{...newLink,url,id:Date.now()}]);
    }
    setNewLink({carrier:"",url:"",type:"login",notes:""});
    setShowAdd(false);
  };

  const deleteLink = (id) => {
    if (window.confirm("Remove this link?")) setLinks(links.filter(l=>l.id!==id));
  };

  const startEdit = (link) => {
    setNewLink({carrier:link.carrier,url:link.url,type:link.type,notes:link.notes||""});
    setEditId(link.id);
    setShowAdd(true);
  };

  // Group by carrier
  const grouped = {};
  filtered.forEach(l => {
    if (!grouped[l.carrier]) grouped[l.carrier] = [];
    grouped[l.carrier].push(l);
  });

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>My Carrier Links</h2>
          <p style={{fontSize:13,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>One-click access to all your carrier portals</p>
        </div>
        <button onClick={()=>{setNewLink({carrier:"",url:"",type:"login",notes:""});setEditId(null);setShowAdd(true);}}
          style={{background:T.navy,color:"#fff",border:"none",borderRadius:12,padding:"10px 18px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>
          + Add Link
        </button>
      </div>

      {/* Filter by type */}
      <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap"}}>
        {[{id:"All",label:"All"},...LINK_TYPES].map(t=>(
          <button key={t.id} onClick={()=>setFilterType(t.id)}
            style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${filterType===t.id?T.navy:T.border}`,background:filterType===t.id?T.navy:T.surface,color:filterType===t.id?"#fff":T.sub,cursor:"pointer",fontSize:12,fontFamily:"'Lato',sans-serif",fontWeight:600,whiteSpace:"nowrap",transition:"all 0.15s"}}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {links.length===0 && (
        <div style={{background:T.surface,border:`2px dashed ${T.border}`,borderRadius:20,padding:40,textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:12}}>🔗</div>
          <div style={{fontSize:18,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",marginBottom:8}}>No links yet</div>
          <div style={{fontSize:13,color:T.muted,fontFamily:"'Lato',sans-serif",marginBottom:16}}>Add your carrier portal links for one-click access</div>
          <button onClick={()=>setShowAdd(true)} style={{background:T.navy,color:"#fff",border:"none",borderRadius:12,padding:"10px 24px",fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer"}}>
            + Add Your First Link
          </button>
        </div>
      )}

      {/* Grouped by carrier */}
      {Object.entries(grouped).map(([carrier, carrierLinks])=>(
        <div key={carrier} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:16,marginBottom:14,overflow:"hidden",animation:"fadeUp 0.3s ease"}}>
          <div style={{background:T.navy,padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{fontSize:16,fontWeight:700,color:"#fff",fontFamily:"'Playfair Display',serif"}}>{carrier}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontFamily:"'Lato',sans-serif"}}>{carrierLinks.length} link{carrierLinks.length!==1?"s":""}</div>
          </div>
          <div style={{padding:12,display:"flex",flexDirection:"column",gap:8}}>
            {carrierLinks.map(link=>{
              const lt = LINK_TYPES.find(t=>t.id===link.type)||LINK_TYPES[6];
              return (
                <div key={link.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",background:T.bg,borderRadius:10,border:`1px solid ${T.border}`}}>
                  <div style={{width:36,height:36,borderRadius:10,background:lt.color+"18",border:`1px solid ${lt.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                    {lt.icon}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:700,color:T.navy,fontFamily:"'Lato',sans-serif"}}>{lt.label}</div>
                    <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{link.url}</div>
                    {link.notes&&<div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",fontStyle:"italic",marginTop:2}}>{link.notes}</div>}
                  </div>
                  <div style={{display:"flex",gap:6,flexShrink:0}}>
                    <a href={link.url} target="_blank" rel="noreferrer"
                      style={{background:lt.color,color:"#fff",border:"none",borderRadius:8,padding:"7px 14px",fontSize:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",gap:4}}>
                      {lt.icon} Open
                    </a>
                    <button onClick={()=>startEdit(link)} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,padding:"7px 10px",fontSize:12,color:T.muted,cursor:"pointer"}}>✏️</button>
                    <button onClick={()=>deleteLink(link.id)} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,padding:"7px 10px",fontSize:12,color:T.red,cursor:"pointer"}}>✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Add/Edit modal */}
      {showAdd && (
        <div style={{position:"fixed",inset:0,background:"rgba(26,39,68,0.5)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowAdd(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:T.surface,borderRadius:24,padding:28,width:"100%",maxWidth:440,animation:"fadeUp 0.3s ease"}}>
            <h3 style={{fontSize:20,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",marginBottom:18}}>{editId?"Edit Link":"Add Carrier Link"}</h3>

            {[
              {label:"Carrier Name",key:"carrier",ph:"e.g. Aetna, Midland National"},
              {label:"URL / Link",  key:"url",     ph:"e.g. producer.aetna.com"},
            ].map(({label,key,ph})=>(
              <div key={key} style={{marginBottom:14}}>
                <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>{label}</div>
                <input placeholder={ph} value={newLink[key]} onChange={e=>setNewLink({...newLink,[key]:e.target.value})}
                  style={{width:"100%",padding:"11px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
              </div>
            ))}

            {/* Link type */}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Link Type</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {LINK_TYPES.map(lt=>(
                  <button key={lt.id} onClick={()=>setNewLink({...newLink,type:lt.id})}
                    style={{padding:"6px 12px",borderRadius:20,border:`1px solid ${newLink.type===lt.id?lt.color:T.border}`,background:newLink.type===lt.id?lt.color+"18":T.surface,color:newLink.type===lt.id?lt.color:T.muted,cursor:"pointer",fontSize:12,fontFamily:"'Lato',sans-serif",fontWeight:600,transition:"all 0.15s"}}>
                    {lt.icon} {lt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div style={{marginBottom:20}}>
              <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Notes (optional)</div>
              <input placeholder="e.g. Use Chrome, login resets monthly..." value={newLink.notes} onChange={e=>setNewLink({...newLink,notes:e.target.value})}
                style={{width:"100%",padding:"11px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
            </div>

            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>{setShowAdd(false);setEditId(null);}} style={{flex:1,padding:"12px",background:T.bg,border:`1px solid ${T.border}`,borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",color:T.sub}}>Cancel</button>
              <button onClick={saveLink} style={{flex:2,padding:"12px",background:T.navy,color:"#fff",border:"none",borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",fontSize:14}}>Save Link</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Commission Log ────────────────────────────────────────────
function CommissionLog({ profile }) {
  const [commissions, setCommissions] = useLocalStorage("acc_commissions", []);
  const [showAdd, setShowAdd] = useState(false);
  const [filterMonth, setFilterMonth] = useState("All");
  const [newComm, setNewComm] = useState({carrier:"",client:"",line:"Health & ACA",amount:"",date:new Date().toISOString().split("T")[0],type:"First Year",notes:""});

  const addCommission = () => {
    if (!newComm.carrier || !newComm.amount) return;
    setCommissions([...commissions,{...newComm,id:Date.now(),amount:Number(newComm.amount)}]);
    setNewComm({carrier:"",client:"",line:"Health & ACA",amount:"",date:new Date().toISOString().split("T")[0],type:"First Year",notes:""});
    setShowAdd(false);
  };

  const deleteComm = (id) => {
    if (window.confirm("Delete this entry?")) setCommissions(commissions.filter(c=>c.id!==id));
  };

  // Stats
  const total = commissions.reduce((a,c)=>a+Number(c.amount),0);
  const thisMonth = commissions.filter(c=>{
    const d = new Date(c.date);
    const now = new Date();
    return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
  }).reduce((a,c)=>a+Number(c.amount),0);

  // Group by month
  const byMonth = {};
  commissions.forEach(c=>{
    const key = new Date(c.date).toLocaleDateString("en-US",{year:"numeric",month:"long"});
    if (!byMonth[key]) byMonth[key]=[];
    byMonth[key].push(c);
  });

  // Export to CSV
  const exportCSV = () => {
    const rows = [["Date","Carrier","Client","Line","Type","Amount","Notes"]];
    commissions.forEach(c=>rows.push([c.date,c.carrier,c.client,c.line,c.type, c.amount!=null ? "$"+c.amount : "", c.notes||""]));
    const csv = rows.map(r=>r.map(v=>'"'+(v??"")+'"').join(",")).join("\n");
    const blob = new Blob([csv],{type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="commissions.csv"; a.click();
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>Commission Log</h2>
          <p style={{fontSize:13,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>Track earnings by carrier and client</p>
        </div>
        <div style={{display:"flex",gap:8}}>
          {commissions.length>0&&<button onClick={exportCSV} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"10px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",color:T.sub}}>📥 Export CSV</button>}
          <button onClick={()=>setShowAdd(true)} style={{background:T.navy,color:"#fff",border:"none",borderRadius:12,padding:"10px 18px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Log Commission</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:12,marginBottom:20}}>
        {[
          {label:"This Month",value:"$"+thisMonth.toLocaleString(),color:T.green},
          {label:"All Time",value:"$"+total.toLocaleString(),color:T.navy},
          {label:"Total Entries",value:commissions.length,color:T.gold},
        ].map(({label,value,color})=>(
          <div key={label} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,padding:14,textAlign:"center"}}>
            <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{label}</div>
            <div style={{fontSize:24,fontWeight:700,color,fontFamily:"'Courier Prime',monospace"}}>{value}</div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {commissions.length===0 && (
        <div style={{background:T.surface,border:`2px dashed ${T.border}`,borderRadius:20,padding:40,textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:12}}>💰</div>
          <div style={{fontSize:18,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",marginBottom:8}}>No commissions logged yet</div>
          <div style={{fontSize:13,color:T.muted,fontFamily:"'Lato',sans-serif",marginBottom:16}}>Start tracking your earnings by carrier and client</div>
          <button onClick={()=>setShowAdd(true)} style={{background:T.navy,color:"#fff",border:"none",borderRadius:12,padding:"10px 24px",fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer"}}>+ Log First Commission</button>
        </div>
      )}

      {/* By month */}
      {Object.entries(byMonth).sort((a,b)=>new Date(b[0])-new Date(a[0])).map(([month,entries])=>{
        const monthTotal = entries.reduce((a,c)=>a+Number(c.amount),0);
        return (
          <div key={month} style={{marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontSize:14,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>{month}</div>
              <div style={{fontSize:14,fontWeight:700,color:T.green,fontFamily:"'Courier Prime',monospace"}}>${monthTotal.toLocaleString()}</div>
            </div>
            {entries.sort((a,b)=>new Date(b.date)-new Date(a.date)).map(c=>(
              <div key={c.id} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"12px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:44,height:44,borderRadius:12,background:`${T.green}15`,border:`1px solid ${T.green}33`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <div style={{fontSize:14,fontWeight:700,color:T.green,fontFamily:"'Courier Prime',monospace"}}>${Number(c.amount).toLocaleString()}</div>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:700,color:T.navy,fontFamily:"'Lato',sans-serif"}}>{c.carrier}</div>
                  <div style={{fontSize:12,color:T.muted,fontFamily:"'Lato',sans-serif"}}>{c.client&&c.client+" · "}{c.line} · {c.type}</div>
                  <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif"}}>{new Date(c.date).toLocaleDateString()}{c.notes&&" · "+c.notes}</div>
                </div>
                <button onClick={()=>deleteComm(c.id)} style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:16,padding:"4px"}}>✕</button>
              </div>
            ))}
          </div>
        );
      })}

      {/* Add modal */}
      {showAdd && (
        <div style={{position:"fixed",inset:0,background:"rgba(26,39,68,0.5)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowAdd(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:T.surface,borderRadius:24,padding:28,width:"100%",maxWidth:440,maxHeight:"90vh",overflowY:"auto",animation:"fadeUp 0.3s ease"}}>
            <h3 style={{fontSize:20,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",marginBottom:18}}>Log Commission</h3>
            {[
              {label:"Carrier",     key:"carrier", ph:"e.g. Mutual of Omaha"},
              {label:"Client Name", key:"client",  ph:"e.g. James Stovall"},
              {label:"Amount ($)",  key:"amount",  ph:"e.g. 450"},
            ].map(({label,key,ph})=>(
              <div key={key} style={{marginBottom:14}}>
                <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>{label}</div>
                <input placeholder={ph} value={newComm[key]} onChange={e=>setNewComm({...newComm,[key]:e.target.value})}
                  style={{width:"100%",padding:"11px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
              </div>
            ))}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Date Received</div>
              <input type="date" value={newComm.date} onChange={e=>setNewComm({...newComm,date:e.target.value})}
                style={{width:"100%",padding:"11px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
            </div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Line of Business</div>
              <select value={newComm.line} onChange={e=>setNewComm({...newComm,line:e.target.value})}
                style={{width:"100%",padding:"11px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none"}}>
                {LINES.map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Commission Type</div>
              <select value={newComm.type} onChange={e=>setNewComm({...newComm,type:e.target.value})}
                style={{width:"100%",padding:"11px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none"}}>
                {["First Year","Renewal","Override","Bonus","Advance","Chargeback"].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{marginBottom:20}}>
              <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Notes</div>
              <input placeholder="Optional notes..." value={newComm.notes} onChange={e=>setNewComm({...newComm,notes:e.target.value})}
                style={{width:"100%",padding:"11px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setShowAdd(false)} style={{flex:1,padding:"12px",background:T.bg,border:`1px solid ${T.border}`,borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",color:T.sub}}>Cancel</button>
              <button onClick={addCommission} style={{flex:2,padding:"12px",background:T.green,color:"#fff",border:"none",borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",fontSize:14}}>Save Commission</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── License Tracker ──────────────────────────────────────────
function LicenseTracker() {
  const [licenses, setLicenses] = useLocalStorage("acc_licenses", [
    {id:1, state:"TN", licenseNum:"", npn:"", line:"Life & Health", expDate:"2025-12-31", status:"Active", notes:""},
    {id:2, state:"AL", licenseNum:"", npn:"", line:"Life & Health", expDate:"2025-12-31", status:"Active", notes:""},
    {id:3, state:"MS", licenseNum:"", npn:"", line:"Life & Health", expDate:"2025-12-31", status:"Active", notes:""},
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newLic, setNewLic] = useState({state:"",licenseNum:"",npn:"",line:"Life & Health",expDate:"",status:"Active",notes:""});
  const [editId, setEditId] = useState(null);

  const now = new Date();

  const getDaysUntil = (dateStr) => {
    if (!dateStr) return null;
    return Math.floor((new Date(dateStr) - now) / (1000*60*60*24));
  };

  const getStatusColor = (dateStr) => {
    const days = getDaysUntil(dateStr);
    if (days === null) return T.muted;
    if (days < 0)   return T.red;
    if (days <= 30) return T.red;
    if (days <= 90) return T.amber;
    return T.green;
  };

  const getStatusLabel = (dateStr) => {
    const days = getDaysUntil(dateStr);
    if (days === null) return "No expiry";
    if (days < 0)   return "EXPIRED";
    if (days <= 30) return `${days}d left`;
    if (days <= 90) return `${days}d left`;
    return "Active";
  };

  const saveLicense = () => {
    if (!newLic.state) return;
    if (editId) {
      setLicenses(licenses.map(l=>l.id===editId?{...newLic,id:editId}:l));
      setEditId(null);
    } else {
      setLicenses([...licenses,{...newLic,id:Date.now()}]);
    }
    setNewLic({state:"",licenseNum:"",npn:"",line:"Life & Health",expDate:"",status:"Active",notes:""});
    setShowAdd(false);
  };

  const startEdit = (lic) => {
    setNewLic({...lic});
    setEditId(lic.id);
    setShowAdd(true);
  };

  const expiring = licenses.filter(l=>{
    const d = getDaysUntil(l.expDate);
    return d !== null && d >= 0 && d <= 90;
  });

  // Export to CSV — backup/safety net since data only lives in this browser
  const exportCSV = () => {
    const rows = [["State","License #","NPN","Line","Expiration","Status","Notes"]];
    licenses.forEach(l=>rows.push([l.state,l.licenseNum,l.npn,l.line,l.expDate,l.status,(l.notes||"").replace(/\n/g," | ")]));
    const csv = rows.map(r=>r.map(v=>'"'+(v??"")+'"').join(",")).join("\n");
    const blob = new Blob([csv],{type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="licenses.csv"; a.click();
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>License Tracker</h2>
          <p style={{fontSize:13,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>States, license numbers, NPN & expiration dates</p>
        </div>
        <div style={{display:"flex",gap:8}}>
          {licenses.length>0&&<button onClick={exportCSV} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"10px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",color:T.sub}}>📥 Export CSV</button>}
          <button onClick={()=>{setNewLic({state:"",licenseNum:"",npn:"",line:"Life & Health",expDate:"",status:"Active",notes:""});setEditId(null);setShowAdd(true);}}
            style={{background:T.navy,color:"#fff",border:"none",borderRadius:12,padding:"10px 18px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>
            + Add License
          </button>
        </div>
      </div>

      {/* Expiring soon alert */}
      {expiring.length>0 && (
        <div style={{background:`${T.amber}15`,border:`1px solid ${T.amber}44`,borderRadius:14,padding:14,marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:24}}>⚠️</span>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:T.amber,fontFamily:"'Lato',sans-serif"}}>
              {expiring.length} license{expiring.length!==1?"s":""} expiring within 90 days
            </div>
            <div style={{fontSize:12,color:T.sub,fontFamily:"'Lato',sans-serif"}}>
              {expiring.map(l=>`${l.state} (${getStatusLabel(l.expDate)})`).join(" · ")}
            </div>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
        {[
          {label:"Total States",  value:licenses.length,                                    color:T.blue},
          {label:"Expiring Soon", value:licenses.filter(l=>{const d=getDaysUntil(l.expDate);return d!==null&&d>=0&&d<=90;}).length, color:T.amber},
          {label:"Expired",       value:licenses.filter(l=>{const d=getDaysUntil(l.expDate);return d!==null&&d<0;}).length,         color:T.red},
        ].map(({label,value,color})=>(
          <div key={label} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,padding:14,textAlign:"center",borderTop:`3px solid ${color}`}}>
            <div style={{fontSize:28,fontWeight:700,color,fontFamily:"'Courier Prime',monospace"}}>{value}</div>
            <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:0.5,marginTop:2}}>{label}</div>
          </div>
        ))}
      </div>

      {/* License list */}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {licenses.sort((a,b)=>(getDaysUntil(a.expDate)||999)-(getDaysUntil(b.expDate)||999)).map(lic=>{
          const statusColor = getStatusColor(lic.expDate);
          const statusLabel = getStatusLabel(lic.expDate);
          return (
            <div key={lic.id} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,padding:16,display:"flex",alignItems:"center",gap:14,animation:"fadeUp 0.3s ease"}}>
              {/* State badge */}
              <div style={{width:52,height:52,borderRadius:14,background:T.navy,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <div style={{fontSize:14,fontWeight:700,color:"#fff",fontFamily:"'Lato',sans-serif",textAlign:"center",lineHeight:1.2}}>{lic.state}</div>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <div style={{fontSize:15,fontWeight:700,color:T.navy,fontFamily:"'Lato',sans-serif"}}>{lic.line}</div>
                  <span style={{fontSize:10,background:`${statusColor}18`,color:statusColor,padding:"2px 8px",borderRadius:20,fontFamily:"'Lato',sans-serif",fontWeight:700,border:`1px solid ${statusColor}44`}}>{statusLabel}</span>
                </div>
                <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                  {lic.licenseNum&&<div style={{fontSize:12,color:T.sub,fontFamily:"'Lato',sans-serif"}}>License: <strong>{lic.licenseNum}</strong></div>}
                  {lic.npn&&<div style={{fontSize:12,color:T.sub,fontFamily:"'Lato',sans-serif"}}>NPN: <strong>{lic.npn}</strong></div>}
                  {lic.expDate&&<div style={{fontSize:12,color:T.sub,fontFamily:"'Lato',sans-serif"}}>Exp: <strong>{new Date(lic.expDate).toLocaleDateString()}</strong></div>}
                </div>
                {lic.notes&&<div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:4,fontStyle:"italic"}}>{lic.notes}</div>}
              </div>
              <div style={{display:"flex",gap:6,flexShrink:0}}>
                <button onClick={()=>startEdit(lic)} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:8,padding:"6px 10px",fontSize:12,color:T.muted,cursor:"pointer"}}>✏️</button>
                <button onClick={()=>setLicenses(licenses.filter(l=>l.id!==lic.id))} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:8,padding:"6px 10px",fontSize:12,color:T.red,cursor:"pointer"}}>✕</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit modal */}
      {showAdd && (
        <div style={{position:"fixed",inset:0,background:"rgba(11,31,58,0.6)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowAdd(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:T.surface,borderRadius:24,padding:28,width:"100%",maxWidth:440,maxHeight:"90vh",overflowY:"auto",animation:"fadeUp 0.3s ease"}}>
            <h3 style={{fontSize:20,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",marginBottom:18}}>{editId?"Edit License":"Add License"}</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              {[
                {label:"State",       key:"state",      ph:"e.g. TN"},
                {label:"License #",   key:"licenseNum", ph:"e.g. 1234567"},
                {label:"NPN",         key:"npn",        ph:"e.g. 12345678"},
                {label:"Expiration",  key:"expDate",    ph:"",type:"date"},
              ].map(({label,key,ph,type})=>(
                <div key={key}>
                  <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{label}</div>
                  <input type={type||"text"} placeholder={ph} value={newLic[key]} onChange={e=>setNewLic({...newLic,[key]:e.target.value})}
                    style={{width:"100%",padding:"10px 12px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
                </div>
              ))}
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Line of Business</div>
              <select value={newLic.line} onChange={e=>setNewLic({...newLic,line:e.target.value})}
                style={{width:"100%",padding:"10px 12px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none"}}>
                {["Life & Health","Property & Casualty","Life Only","Health Only","Variable","All Lines"].map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
            <div style={{marginBottom:20}}>
              <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Notes</div>
              <input placeholder="CE requirements, renewal notes..." value={newLic.notes} onChange={e=>setNewLic({...newLic,notes:e.target.value})}
                style={{width:"100%",padding:"10px 12px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>{setShowAdd(false);setEditId(null);}} style={{flex:1,padding:"12px",background:T.bg,border:`1px solid ${T.border}`,borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",color:T.sub}}>Cancel</button>
              <button onClick={saveLicense} style={{flex:2,padding:"12px",background:T.navy,color:"#fff",border:"none",borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",fontSize:14}}>Save License</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Calendar ──────────────────────────────────────────────────
// Event types matching the spec: appointments, follow-ups, policy reviews,
// renewal reminders, employer meetings, client birthdays, task deadlines.
// Birthdays are derived automatically from client DOB on file (Smart Intake's
// dateOfBirth field) rather than needing manual re-entry — one less thing for
// the agent to keep in sync by hand.
const EVENT_TYPES = [
  { id:"appointment",    label:"Appointment",      color:"#1a2744" },
  { id:"followup",       label:"Follow-Up",        color:"#0284C7" },
  { id:"policy_review",  label:"Policy Review",    color:"#7B2D8B" },
  { id:"renewal",        label:"Renewal Reminder", color:"#d4850a" },
  { id:"employer",       label:"Employer Meeting", color:"#2d7a4f" },
  { id:"task",           label:"Task Deadline",    color:"#c0392b" },
  { id:"birthday",       label:"Client Birthday",  color:"#C9A227" },
];
const eventColor = (type) => (EVENT_TYPES.find(t=>t.id===type)||EVENT_TYPES[0]).color;

function CalendarView({ setTab }) {
  const [events, setEvents] = useLocalStorage("acc_calendar_events", []);
  const [clients] = useLocalStorage("acc_clients", SAMPLE_CLIENTS);
  const [view, setView] = useState("month"); // month | week | day | list
  const [cursor, setCursor] = useState(new Date());
  const [showAdd, setShowAdd] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title:"", type:"appointment", date:new Date().toISOString().split("T")[0], time:"", clientId:"", notes:"" });

  // Birthdays derived from whichever date-of-birth source the agent actually
  // used — the direct Date of Birth field on the client record (set when
  // adding/updating a client, stored as YYYY-MM-DD from a native date input),
  // or the free-text Smart Intake answer (MM/DD/YYYY) if that's the only one
  // on file. Shown alongside manually-created events without needing their
  // own stored event record, so they can't drift out of sync with Clients.
  const parseBirthday = (client) => {
    if (client.dateOfBirth) {
      // YYYY-MM-DD from the native date input
      const parts = client.dateOfBirth.split("-");
      if (parts.length===3) return { month:parseInt(parts[1],10), day:parseInt(parts[2],10) };
    }
    const intakeDob = client.intake?.answers?.dateOfBirth;
    if (intakeDob) {
      const parts = intakeDob.split("/");
      if (parts.length===3) return { month:parseInt(parts[0],10), day:parseInt(parts[1],10) };
    }
    return null;
  };

  const birthdayEvents = clients.filter(c=>!c.archived).map(c=>{
    const parsed = parseBirthday(c);
    if (!parsed || !parsed.month || !parsed.day) return null;
    return { id:`bday-${c.id}`, title:`${c.name}'s Birthday`, type:"birthday", date:null, recurringMonth:parsed.month, recurringDay:parsed.day, clientId:c.id, isBirthday:true };
  }).filter(Boolean);

  const allEvents = [...events, ...birthdayEvents];

  // Export to .ics — a standard calendar file any agent can import into
  // Google Calendar, Apple Calendar, or Outlook as a one-way mirror of their
  // ACC events. Not a live two-way sync (that needs real account integration,
  // which ACC doesn't have yet) — this is "take a snapshot with you."
  const exportICS = () => {
    const pad = (n) => String(n).padStart(2,"0");
    const escapeText = (s="") => String(s).replace(/\\/g,"\\\\").replace(/,/g,"\\,").replace(/;/g,"\\;").replace(/\n/g,"\\n");
    const nowStamp = () => {
      const n = new Date();
      return `${n.getUTCFullYear()}${pad(n.getUTCMonth()+1)}${pad(n.getUTCDate())}T${pad(n.getUTCHours())}${pad(n.getUTCMinutes())}${pad(n.getUTCSeconds())}Z`;
    };

    const lines = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Agent Command Center//Calendar Export//EN","CALSCALE:GREGORIAN"];

    allEvents.forEach(e => {
      const uid = `${e.id}@agentcommandcenter`;
      const summary = escapeText(e.title);
      const description = escapeText(e.notes || "");
      const typeLabel = (EVENT_TYPES.find(t=>t.id===e.type)||{}).label || "";

      lines.push("BEGIN:VEVENT");
      lines.push(`UID:${uid}`);
      lines.push(`DTSTAMP:${nowStamp()}`);
      lines.push(`SUMMARY:${summary}`);
      if (description) lines.push(`DESCRIPTION:${description}`);
      if (typeLabel) lines.push(`CATEGORIES:${escapeText(typeLabel)}`);

      if (e.isBirthday) {
        // Recurring yearly all-day event. Anchor year is arbitrary (this
        // year) — RRULE:FREQ=YEARLY repeats it on the same month/day forever.
        const anchorYear = new Date().getFullYear();
        const dtStart = `${anchorYear}${pad(e.recurringMonth)}${pad(e.recurringDay)}`;
        lines.push(`DTSTART;VALUE=DATE:${dtStart}`);
        lines.push("RRULE:FREQ=YEARLY");
      } else if (e.time) {
        // Timed event — 1 hour default duration since ACC doesn't currently
        // collect an end time.
        const [hh,mm] = e.time.split(":");
        const datePart = e.date.replace(/-/g,"");
        const startStr = `${datePart}T${pad(hh)}${pad(mm)}00`;
        const endDate = new Date(`${e.date}T${e.time}:00`);
        endDate.setHours(endDate.getHours()+1);
        const endStr = `${endDate.getFullYear()}${pad(endDate.getMonth()+1)}${pad(endDate.getDate())}T${pad(endDate.getHours())}${pad(endDate.getMinutes())}00`;
        lines.push(`DTSTART:${startStr}`);
        lines.push(`DTEND:${endStr}`);
      } else {
        // All-day event — no time specified.
        const datePart = e.date.replace(/-/g,"");
        lines.push(`DTSTART;VALUE=DATE:${datePart}`);
      }

      lines.push("END:VEVENT");
    });

    lines.push("END:VCALENDAR");
    // iCalendar spec requires CRLF line endings.
    const icsContent = lines.join("\r\n");
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "acc-calendar.ics";
    a.click();
  };

  const eventsOnDate = (date) => {
    const y=date.getFullYear(), m=date.getMonth()+1, d=date.getDate();
    const iso = `${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    return allEvents.filter(e => e.isBirthday ? (e.recurringMonth===m && e.recurringDay===d) : e.date===iso);
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    setEvents([...events, { ...newEvent, id:Date.now() }]);
    setNewEvent({ title:"", type:"appointment", date:new Date().toISOString().split("T")[0], time:"", clientId:"", notes:"" });
    setShowAdd(false);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e=>e.id!==id));
    setSelectedEvent(null);
  };

  const clientName = (id) => clients.find(c=>c.id===id)?.name || "";

  // ── Month grid helpers ──
  const monthStart = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const monthDays = [];
  const startOffset = monthStart.getDay();
  for (let i=0;i<startOffset;i++) monthDays.push(null);
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth()+1, 0).getDate();
  for (let d=1;d<=daysInMonth;d++) monthDays.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));

  const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const isToday = (date) => date && date.toDateString()===new Date().toDateString();

  const shiftMonth = (delta) => setCursor(new Date(cursor.getFullYear(), cursor.getMonth()+delta, 1));
  const shiftWeek = (delta) => setCursor(new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate()+delta*7));
  const shiftDay = (delta) => setCursor(new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate()+delta));

  const weekStart = new Date(cursor); weekStart.setDate(cursor.getDate()-cursor.getDay());
  const weekDates = Array.from({length:7}, (_,i)=>{ const d=new Date(weekStart); d.setDate(weekStart.getDate()+i); return d; });

  // Upcoming events for List view — sorted, birthdays resolved to their next occurrence this year/next year
  const upcomingList = allEvents.map(e=>{
    if (e.isBirthday) {
      const now = new Date();
      let next = new Date(now.getFullYear(), e.recurringMonth-1, e.recurringDay);
      if (next < new Date(now.getFullYear(),now.getMonth(),now.getDate())) next = new Date(now.getFullYear()+1, e.recurringMonth-1, e.recurringDay);
      return { ...e, sortDate: next };
    }
    return { ...e, sortDate: new Date(e.date+"T00:00:00") };
  }).sort((a,b)=>a.sortDate-b.sortDate).filter(e=>e.sortDate >= new Date(new Date().toDateString()));

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>Calendar</h2>
          <p style={{fontSize:13,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>{events.length} event{events.length!==1?"s":""} · {birthdayEvents.length} birthday{birthdayEvents.length!==1?"s":""} on file</p>
        </div>
        <div style={{display:"flex",gap:8}}>
          {allEvents.length>0 && (
            <button onClick={exportICS} title="Download a .ics file to import into Google Calendar, Apple Calendar, or Outlook" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"10px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",color:T.sub}}>
              Export to Calendar App
            </button>
          )}
          <button onClick={()=>setShowAdd(true)} style={{background:T.navy,color:"#fff",border:"none",borderRadius:12,padding:"10px 18px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Add Event</button>
        </div>
      </div>

      {allEvents.length>0 && (
        <div style={{fontSize:11.5,color:T.muted,fontFamily:"'Lato',sans-serif",marginBottom:16,background:T.bg,padding:"8px 14px",borderRadius:10}}>
          "Export to Calendar App" downloads a one-time snapshot of these events as a file you can import into your phone or computer's calendar. It won't stay in sync — re-export anytime you want an updated copy.
        </div>
      )}

      {/* View switcher */}
      <div style={{display:"flex",gap:6,marginBottom:16}}>
        {["month","week","day","list"].map(v=>(
          <button key={v} onClick={()=>setView(v)} style={{padding:"7px 16px",borderRadius:20,border:`1px solid ${view===v?T.navy:T.border}`,background:view===v?T.navy:T.surface,color:view===v?"#fff":T.sub,cursor:"pointer",fontSize:12,fontFamily:"'Lato',sans-serif",fontWeight:700,textTransform:"capitalize"}}>{v}</button>
        ))}
      </div>

      {/* MONTH VIEW */}
      {view==="month" && (
        <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:18,padding:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <button onClick={()=>shiftMonth(-1)} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,width:32,height:32,cursor:"pointer",color:T.sub}}>‹</button>
            <div style={{fontSize:16,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>{cursor.toLocaleString("default",{month:"long",year:"numeric"})}</div>
            <button onClick={()=>shiftMonth(1)} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,width:32,height:32,cursor:"pointer",color:T.sub}}>›</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:6}}>
            {weekDays.map(d=><div key={d} style={{textAlign:"center",fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",fontWeight:700,textTransform:"uppercase"}}>{d}</div>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
            {monthDays.map((date,i)=>(
              <div key={i} onClick={()=>date&&setCursor(date)} style={{minHeight:64,borderRadius:8,padding:4,background: isToday(date)?`${T.navy}10`:T.bg, border: isToday(date)?`1px solid ${T.navy}`:`1px solid transparent`, cursor: date?"pointer":"default"}}>
                {date && (
                  <>
                    <div style={{fontSize:11,fontWeight: isToday(date)?700:600, color: isToday(date)?T.navy:T.sub, fontFamily:"'Lato',sans-serif",marginBottom:2}}>{date.getDate()}</div>
                    <div style={{display:"flex",flexDirection:"column",gap:2}}>
                      {eventsOnDate(date).slice(0,3).map(e=>(
                        <div key={e.id} onClick={(ev)=>{ev.stopPropagation();setSelectedEvent(e);}} style={{fontSize:9,background:eventColor(e.type),color:"#fff",borderRadius:4,padding:"1px 4px",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",cursor:"pointer"}}>{e.title}</div>
                      ))}
                      {eventsOnDate(date).length>3 && <div style={{fontSize:9,color:T.muted,fontFamily:"'Lato',sans-serif"}}>+{eventsOnDate(date).length-3} more</div>}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WEEK VIEW */}
      {view==="week" && (
        <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:18,padding:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <button onClick={()=>shiftWeek(-1)} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,width:32,height:32,cursor:"pointer",color:T.sub}}>‹</button>
            <div style={{fontSize:14,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>{weekDates[0].toLocaleDateString("default",{month:"short",day:"numeric"})} – {weekDates[6].toLocaleDateString("default",{month:"short",day:"numeric"})}</div>
            <button onClick={()=>shiftWeek(1)} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,width:32,height:32,cursor:"pointer",color:T.sub}}>›</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {weekDates.map((date,i)=>(
              <div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:i<6?`1px solid ${T.border}`:"none"}}>
                <div style={{width:60,flexShrink:0,textAlign:"center"}}>
                  <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",fontWeight:700}}>{weekDays[date.getDay()]}</div>
                  <div style={{fontSize:16,fontWeight:700,color:isToday(date)?T.navy:T.sub,fontFamily:"'Playfair Display',serif"}}>{date.getDate()}</div>
                </div>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}>
                  {eventsOnDate(date).length===0 && <div style={{fontSize:12,color:T.muted,fontFamily:"'Lato',sans-serif",paddingTop:6}}>—</div>}
                  {eventsOnDate(date).map(e=>(
                    <div key={e.id} onClick={()=>setSelectedEvent(e)} style={{fontSize:12,background:`${eventColor(e.type)}18`,borderLeft:`3px solid ${eventColor(e.type)}`,borderRadius:6,padding:"6px 10px",cursor:"pointer",fontFamily:"'Lato',sans-serif",color:T.navy,fontWeight:600}}>
                      {e.time && <span style={{color:T.muted,marginRight:6}}>{e.time}</span>}{e.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DAY VIEW */}
      {view==="day" && (
        <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:18,padding:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <button onClick={()=>shiftDay(-1)} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,width:32,height:32,cursor:"pointer",color:T.sub}}>‹</button>
            <div style={{fontSize:15,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>{cursor.toLocaleDateString("default",{weekday:"long",month:"long",day:"numeric"})}</div>
            <button onClick={()=>shiftDay(1)} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,width:32,height:32,cursor:"pointer",color:T.sub}}>›</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {eventsOnDate(cursor).length===0 && <div style={{textAlign:"center",padding:"30px 0",color:T.muted,fontFamily:"'Lato',sans-serif",fontSize:13}}>No events today.</div>}
            {eventsOnDate(cursor).map(e=>(
              <div key={e.id} onClick={()=>setSelectedEvent(e)} style={{background:`${eventColor(e.type)}12`,borderLeft:`4px solid ${eventColor(e.type)}`,borderRadius:10,padding:"12px 14px",cursor:"pointer"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:14,fontWeight:700,color:T.navy,fontFamily:"'Lato',sans-serif"}}>{e.title}</div>
                  {e.time && <div style={{fontSize:12,color:T.muted,fontFamily:"'Lato',sans-serif"}}>{e.time}</div>}
                </div>
                <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:3}}>{(EVENT_TYPES.find(t=>t.id===e.type)||{}).label}{e.clientId?` · ${clientName(e.clientId)}`:""}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {view==="list" && (
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {upcomingList.length===0 && <div style={{textAlign:"center",padding:"40px 0",color:T.muted,fontFamily:"'Lato',sans-serif",fontSize:13}}>No upcoming events.</div>}
          {upcomingList.map(e=>(
            <div key={e.id} onClick={()=>setSelectedEvent(e)} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,padding:14,display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
              <div style={{width:8,height:40,borderRadius:4,background:eventColor(e.type),flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:T.navy,fontFamily:"'Lato',sans-serif"}}>{e.title}</div>
                <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>
                  {e.sortDate.toLocaleDateString("default",{month:"short",day:"numeric",year:"numeric"})}{e.time?` · ${e.time}`:""} · {(EVENT_TYPES.find(t=>t.id===e.type)||{}).label}{e.clientId?` · ${clientName(e.clientId)}`:""}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event detail */}
      {selectedEvent && (
        <div style={{position:"fixed",inset:0,background:"rgba(26,39,68,0.5)",zIndex:120,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setSelectedEvent(null)}>
          <div onClick={e=>e.stopPropagation()} style={{background:T.surface,borderRadius:20,padding:24,width:"100%",maxWidth:400}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div>
                <div style={{fontSize:18,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>{selectedEvent.title}</div>
                <span style={{fontSize:11,background:`${eventColor(selectedEvent.type)}18`,color:eventColor(selectedEvent.type),padding:"3px 10px",borderRadius:20,fontFamily:"'Lato',sans-serif",fontWeight:700,marginTop:6,display:"inline-block"}}>{(EVENT_TYPES.find(t=>t.id===selectedEvent.type)||{}).label}</span>
              </div>
              <button onClick={()=>setSelectedEvent(null)} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:10,width:30,height:30,cursor:"pointer",color:T.muted}}>×</button>
            </div>
            {!selectedEvent.isBirthday && selectedEvent.date && <div style={{fontSize:13,color:T.sub,fontFamily:"'Lato',sans-serif",marginBottom:6}}>{selectedEvent.date}{selectedEvent.time?` at ${selectedEvent.time}`:""}</div>}
            {selectedEvent.clientId && (
              <button onClick={()=>{setTab&&setTab("clients");}} style={{fontSize:12,color:T.navy,background:"none",border:"none",textDecoration:"underline",cursor:"pointer",fontFamily:"'Lato',sans-serif",padding:0,marginBottom:10,display:"block"}}>
                View {clientName(selectedEvent.clientId)}'s profile →
              </button>
            )}
            {selectedEvent.notes && <div style={{fontSize:13,color:T.sub,fontFamily:"'Lato',sans-serif",lineHeight:1.6,background:T.bg,borderRadius:10,padding:12,marginTop:8}}>{selectedEvent.notes}</div>}
            {!selectedEvent.isBirthday && (
              <button onClick={()=>deleteEvent(selectedEvent.id)} style={{width:"100%",marginTop:16,padding:"10px",background:"transparent",color:T.red,border:`1px solid ${T.red}33`,borderRadius:10,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer"}}>Delete Event</button>
            )}
          </div>
        </div>
      )}

      {/* Add event modal */}
      {showAdd && (
        <div style={{position:"fixed",inset:0,background:"rgba(26,39,68,0.5)",zIndex:120,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowAdd(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:T.surface,borderRadius:24,padding:26,width:"100%",maxWidth:440,maxHeight:"85vh",overflowY:"auto"}}>
            <h3 style={{fontSize:19,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",marginBottom:16}}>Add Calendar Event</h3>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Title</div>
              <input value={newEvent.title} onChange={e=>setNewEvent({...newEvent,title:e.target.value})} placeholder="e.g. Policy review with James Stovall"
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Type</div>
              <select value={newEvent.type} onChange={e=>setNewEvent({...newEvent,type:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none"}}>
                {EVENT_TYPES.filter(t=>t.id!=="birthday").map(t=><option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <div style={{display:"flex",gap:10,marginBottom:12}}>
              <div style={{flex:1}}>
                <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Date</div>
                <input type="date" value={newEvent.date} onChange={e=>setNewEvent({...newEvent,date:e.target.value})}
                  style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Time (optional)</div>
                <input type="time" value={newEvent.time} onChange={e=>setNewEvent({...newEvent,time:e.target.value})}
                  style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
              </div>
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Link to Client (optional)</div>
              <select value={newEvent.clientId} onChange={e=>setNewEvent({...newEvent,clientId:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none"}}>
                <option value="">None</option>
                {clients.filter(c=>!c.archived).map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div style={{marginBottom:18}}>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Notes</div>
              <textarea value={newEvent.notes} onChange={e=>setNewEvent({...newEvent,notes:e.target.value})} placeholder="Details, agenda, reminders..."
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none",height:70,resize:"none"}}/>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setShowAdd(false)} style={{flex:1,padding:"12px",background:T.bg,border:`1px solid ${T.border}`,borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",color:T.sub}}>Cancel</button>
              <button onClick={addEvent} style={{flex:2,padding:"12px",background:T.navy,color:"#fff",border:"none",borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",fontSize:14}}>Save Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────
function Dashboard({ setTab, profile, bg }) {
  // Pull live data from localStorage
  const clients     = JSON.parse(localStorage.getItem("acc_clients")     || "[]");
  const quotes      = JSON.parse(localStorage.getItem("acc_quotes")      || "[]");
  const commissions = JSON.parse(localStorage.getItem("acc_commissions") || "[]");
  const licenses    = JSON.parse(localStorage.getItem("acc_licenses")    || "[]");

  const [noticeDismissed, setNoticeDismissed] = useLocalStorage("acc_storage_notice_dismissed", false);

  // Calculate daily stats
  const activeClients   = clients.filter(c=>c.status==="Active").length;
  const prospects       = clients.filter(c=>c.status==="Prospect").length;
  const pendingQuotes   = quotes.filter(q=>(q.status||"open")==="pending").length;
  const closedWon       = quotes.filter(q=>q.status==="closed_won").length;
  const openQuotes      = quotes.filter(q=>(q.status||"open")==="open").length;

  const now = new Date();
  const thisMonth = commissions.filter(c=>{
    const d = new Date(c.date);
    return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
  }).reduce((a,c)=>a+Number(c.amount),0);

  const expiringLicenses = licenses.filter(l=>{
    if (!l.expDate) return false;
    const exp = new Date(l.expDate);
    const diff = (exp-now)/(1000*60*60*24);
    return diff>=0 && diff<=90;
  }).length;

  const today = now.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"});

  const upcoming = [
    {name:"James Stovall",         action:"T65 Review — Plan G",         date:"Aug 2025", line:"Medicare",        urgent:true},
    {name:"Derek & Tina Williams", action:"Home + Auto Bundle Quote",    date:"Jun 2025", line:"Homeowners",      urgent:true},
    {name:"Ripley School District",action:"Open Enrollment Follow-up",   date:"Sep 2025", line:"Supplemental",    urgent:false},
    {name:"Precision Auto Repair", action:"GL + Workers Comp Quote",     date:"Jul 2025", line:"General Liability",urgent:false},
    {name:"Maria Gonzalez",        action:"ACA Renewal",                 date:"Nov 2025", line:"Health & ACA",    urgent:false},
    {name:"Henderson Family",      action:"Preneed Planning Review",     date:"Jul 2025", line:"Preneed / Burial", urgent:false},
  ];

  return (
    <div style={{animation:"fadeUp 0.3s ease"}}>

      {/* Welcome header */}
      <div style={{background:`linear-gradient(135deg, ${T.navy} 0%, #1a3a6b 100%)`,borderRadius:20,padding:"24px 28px",marginBottom:20,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:-30,width:160,height:160,borderRadius:"50%",background:"rgba(37,99,235,0.15)"}}/>
        <div style={{position:"absolute",bottom:-20,right:60,width:80,height:80,borderRadius:"50%",background:"rgba(37,99,235,0.08)"}}/>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:2,marginBottom:6}}>{today}</div>
        <div style={{fontSize:28,fontWeight:700,color:"#fff",fontFamily:"'Playfair Display',serif",lineHeight:1.2}}>
          {profile.firstName||"Agent"} {profile.lastName}
        </div>
        <div style={{fontSize:13,color:T.blueLight,fontFamily:"'Lato',sans-serif",marginTop:6}}>
          {profile.agencyName||"Agent Command Center"} {profile.states?`· ${profile.states}`:""}
        </div>
      </div>

      {/* Data storage notice — dismissable, re-appears in a new browser/device since it's per-browser */}
      {!noticeDismissed && (
        <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"12px 16px",marginBottom:20,display:"flex",alignItems:"flex-start",gap:10}}>
          <span style={{fontSize:16,flexShrink:0}}>ℹ️</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:T.navy,fontFamily:"'Lato',sans-serif"}}>Your data is saved on this device only</div>
            <div style={{fontSize:12,color:T.sub,fontFamily:"'Lato',sans-serif",marginTop:2,lineHeight:1.5}}>
              Clients, quotes, commissions, and licenses are stored in this browser — there's no cloud account yet. Use the <strong>Export</strong> button on each tab regularly so you never lose your work, especially before clearing browser data or switching devices.
            </div>
          </div>
          <button onClick={()=>setNoticeDismissed(true)} style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:18,lineHeight:1,padding:0,flexShrink:0}}>×</button>
        </div>
      )}

      {/* Daily stats grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:12,marginBottom:20}}>
        {[
          {label:"Active Clients",    value:activeClients,                        icon:"👥", color:T.blue,  tab:"clients"},
          {label:"Prospects",         value:prospects,                            icon:"🎯", color:T.amber, tab:"clients"},
          {label:"Open Quotes",       value:openQuotes,                           icon:"📋", color:T.blue,  tab:"quotes"},
          {label:"Pending",           value:pendingQuotes,                        icon:"⏳", color:T.amber, tab:"quotes"},
          {label:"Closed Won",        value:closedWon,                            icon:"✅", color:T.green, tab:"quotes"},
          {label:"This Month",        value:"$"+thisMonth.toLocaleString(),       icon:"💰", color:T.green, tab:"commissions"},
          {label:"Licenses Expiring", value:expiringLicenses,                    icon:"⚠️", color:expiringLicenses>0?T.red:T.green, tab:"licenses"},
        ].map(({label,value,icon,color,tab})=>(
          <div key={label} onClick={()=>setTab(tab)}
            style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:16,padding:16,cursor:"pointer",transition:"all 0.15s",borderLeft:`3px solid ${color}`}}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 4px 20px rgba(37,99,235,0.1)`;e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
            <div style={{fontSize:22,marginBottom:6}}>{icon}</div>
            <div style={{fontSize:24,fontWeight:700,color,fontFamily:"'Courier Prime',monospace"}}>{value}</div>
            <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2,textTransform:"uppercase",letterSpacing:0.5}}>{label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10,marginBottom:20}}>
        {[
          {label:"New Quote",       icon:"📊", tab:"quotes",      color:T.blue},
          {label:"Add Client",      icon:"👤", tab:"clients",     color:T.navy},
          {label:"Carrier Links",   icon:"🔗", tab:"links",       color:T.green},
          {label:"Log Commission",  icon:"💰", tab:"commissions", color:T.amber},
          {label:"Licenses",        icon:"🪪", tab:"licenses",    color:T.navy},
          {label:"My Profile",      icon:"⚙️", tab:"profile",     color:T.muted},
        ].map(({label,icon,tab,color})=>(
          <button key={label} onClick={()=>setTab(tab)}
            style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,padding:"14px 10px",cursor:"pointer",textAlign:"center",transition:"all 0.15s",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}
            onMouseEnter={e=>{e.currentTarget.style.background=color;e.currentTarget.style.borderColor=color;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background=T.surface;e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.sub;}}>
            <span style={{fontSize:24}}>{icon}</span>
            <div style={{fontSize:12,fontWeight:700,fontFamily:"'Lato',sans-serif"}}>{label}</div>
          </button>
        ))}
      </div>

      {/* Upcoming actions */}
      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:18,padding:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:16,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>Upcoming Actions</div>
          <button onClick={()=>setTab("clients")} style={{background:"none",border:"none",fontSize:12,color:T.blue,cursor:"pointer",fontFamily:"'Lato',sans-serif",fontWeight:600}}>View all →</button>
        </div>
        {upcoming.map((u,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<upcoming.length-1?`1px solid ${T.border}`:"none"}}>
            <div style={{width:38,height:38,borderRadius:10,background:lineColor(u.line)+"18",border:`1px solid ${lineColor(u.line)}33`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:11,fontWeight:700,fontFamily:"'Lato',sans-serif",flexShrink:0}}>
              {u.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:700,color:T.navy,fontFamily:"'Lato',sans-serif"}}>{u.name}</div>
              <div style={{fontSize:12,color:T.sub,fontFamily:"'Lato',sans-serif"}}>{u.action}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:12,color:u.urgent?T.red:T.muted,fontFamily:"'Lato',sans-serif",fontWeight:u.urgent?700:400}}>{u.date}</div>
              <div style={{fontSize:10,color:"#fff",background:lineColor(u.line),padding:"2px 7px",borderRadius:10,marginTop:3,fontFamily:"'Lato',sans-serif"}}>{u.line}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Agent Profile ─────────────────────────────────────────────
function AgentProfile({ profile, setProfile, bg = {} }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]     = useState(profile);
  const [logoPreview, setLogoPreview] = useState(profile.logoUrl||null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setLogoPreview(ev.target.result);
      setDraft({...draft, logoUrl: ev.target.result});
    };
    reader.readAsDataURL(file);
  };

  const save = () => { setProfile(draft); setEditing(false); };
  const cancel = () => { setDraft(profile); setLogoPreview(profile.logoUrl||null); setEditing(false); };

  const Field = ({label, value}) => (
    <div style={{padding:"12px 0",borderBottom:`1px solid ${T.border}`}}>
      <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1.5,marginBottom:3}}>{label}</div>
      <div style={{fontSize:15,color:T.navy,fontFamily:"'Lato',sans-serif",fontWeight:600}}>{value||<span style={{color:T.muted,fontStyle:"italic"}}>Not set</span>}</div>
    </div>
  );

  return (
    <div style={{maxWidth:640,margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>Agent Profile</h2>
          <p style={{fontSize:13,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>Your info appears on quotes and client documents</p>
        </div>
        {!editing && (
          <button onClick={()=>{setDraft(profile);setEditing(true);}} style={{background:T.navy,color:"#fff",border:"none",borderRadius:12,padding:"10px 20px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>
            ✏️ Edit Profile
          </button>
        )}
      </div>

      {/* Logo + name hero */}
      <div style={{background:profile.heroColor||T.navy,borderRadius:20,padding:"28px",marginBottom:20,display:"flex",alignItems:"center",gap:20,position:"relative",overflow:"hidden",transition:"background 0.4s"}}>
        <div style={{position:"absolute",top:-20,right:-20,width:120,height:120,borderRadius:"50%",background:"rgba(201,168,76,0.12)"}}/>
        {/* Logo circle */}
        <div style={{width:80,height:80,borderRadius:20,background:profile.logoUrl?"transparent":T.gold,border:`3px solid ${T.gold}`,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
          {profile.logoUrl
            ? <img src={profile.logoUrl} alt="logo" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            : <span style={{fontSize:28,fontWeight:900,color:T.navy,fontFamily:"'Playfair Display',serif"}}>{(profile.agencyName||profile.firstName||"A").charAt(0)}</span>
          }
        </div>
        <div>
          <div style={{fontSize:22,fontWeight:700,color:profile.heroTextColor==="dark"?"#1a1a2e":"#fff",fontFamily:"'Playfair Display',serif",lineHeight:1.2}}>
            {profile.firstName||"Your Name"} {profile.lastName}
          </div>
          {profile.title && <div style={{fontSize:13,color:profile.heroTextColor==="dark"?"#3a3a3a":T.goldLight,fontFamily:"'Lato',sans-serif",marginTop:3}}>{profile.title}</div>}
          {profile.agencyName && <div style={{fontSize:14,color:profile.heroTextColor==="dark"?"rgba(0,0,0,0.6)":"rgba(255,255,255,0.7)",fontFamily:"'Lato',sans-serif",marginTop:2}}>{profile.agencyName}</div>}
          {profile.npn && <div style={{fontSize:12,color:profile.heroTextColor==="dark"?"rgba(0,0,0,0.4)":"rgba(255,255,255,0.4)",fontFamily:"'Courier Prime',monospace",marginTop:4}}>NPN: {profile.npn}</div>}
        </div>
      </div>

      {!editing ? (
        // ── View mode ──────────────────────────────────────────
        <div style={{background:T.surface,borderRadius:20,padding:24,border:`1px solid ${T.border}`}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 24px"}}>
            <Field label="First Name"     value={profile.firstName}/>
            <Field label="Last Name"      value={profile.lastName}/>
            <Field label="Title / Role"   value={profile.title}/>
            <Field label="Agency / Firm"  value={profile.agencyName}/>
            <Field label="Phone"          value={profile.phone}/>
            <Field label="Email"          value={profile.email}/>
            <Field label="License #"      value={profile.licenseNum}/>
            <Field label="NPN"            value={profile.npn}/>
            <Field label="Website"        value={profile.website}/>
            <Field label="State(s)"       value={profile.states}/>
          </div>
          <div style={{marginTop:4}}>
            <Field label="Address / Office" value={profile.address}/>
            <Field label="Tagline / Bio"    value={profile.tagline}/>
          </div>

          {/* Lines of business badges */}
          {profile.linesOfBusiness?.length>0 && (
            <div style={{marginTop:16}}>
              <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1.5,marginBottom:8}}>Licensed Lines</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {profile.linesOfBusiness.map(l=>(
                  <span key={l} style={{fontSize:11,background:lineColor(l)+"18",color:lineColor(l),border:`1px solid ${lineColor(l)}44`,padding:"3px 12px",borderRadius:20,fontFamily:"'Lato',sans-serif",fontWeight:700}}>{l}</span>
                ))}
              </div>
            </div>
          )}

          {/* Quote footer preview */}
          <div style={{marginTop:20,background:T.bg,borderRadius:12,padding:16,border:`1px solid ${T.border}`}}>
            <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1.5,marginBottom:10}}>Quote Footer Preview</div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              {profile.logoUrl && <img src={profile.logoUrl} alt="logo" style={{width:36,height:36,borderRadius:8,objectFit:"cover"}}/>}
              <div>
                <div style={{fontSize:13,fontWeight:700,color:T.navy,fontFamily:"'Lato',sans-serif"}}>{profile.firstName} {profile.lastName} {profile.title?`· ${profile.title}`:""}</div>
                <div style={{fontSize:11,color:T.sub,fontFamily:"'Lato',sans-serif"}}>{profile.agencyName} {profile.phone?`· ${profile.phone}`:""} {profile.email?`· ${profile.email}`:""}</div>
                {profile.tagline && <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",fontStyle:"italic",marginTop:2}}>"{profile.tagline}"</div>}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // ── Edit mode ──────────────────────────────────────────
        <div style={{background:T.surface,borderRadius:20,padding:24,border:`1px solid ${T.border}`}}>

          {/* Logo upload */}
          <div style={{marginBottom:20,display:"flex",alignItems:"center",gap:16}}>
            <div style={{width:72,height:72,borderRadius:16,background:logoPreview?"transparent":T.bg,border:`2px dashed ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
              {logoPreview
                ? <img src={logoPreview} alt="logo" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                : <span style={{fontSize:28}}>🏢</span>
              }
            </div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:T.navy,fontFamily:"'Lato',sans-serif",marginBottom:6}}>Agency Logo</div>
              <label style={{background:T.navy,color:"#fff",padding:"8px 16px",borderRadius:10,fontSize:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer"}}>
                📁 Upload Logo
                <input type="file" accept="image/*" onChange={handleLogoUpload} style={{display:"none"}}/>
              </label>
              {logoPreview && <button onClick={()=>{setLogoPreview(null);setDraft({...draft,logoUrl:""});}} style={{marginLeft:8,background:"none",border:`1px solid ${T.border}`,borderRadius:8,padding:"7px 12px",fontSize:12,color:T.muted,cursor:"pointer",fontFamily:"'Lato',sans-serif"}}>Remove</button>}
            </div>
          </div>

          {/* Fields grid */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[
              {label:"First Name",   key:"firstName",  ph:"Deidre"},
              {label:"Last Name",    key:"lastName",   ph:"Jones"},
              {label:"Title / Role", key:"title",      ph:"Independent Insurance Agent"},
              {label:"Agency / Firm",key:"agencyName", ph:"The Coverage Firm"},
              {label:"Phone",        key:"phone",      ph:"901-555-0100"},
              {label:"Email",        key:"email",      ph:"deidre@thecoveragefirm.com"},
              {label:"License #",    key:"licenseNum", ph:"TN-12345678"},
              {label:"NPN",          key:"npn",        ph:"e.g. 12345678"},
              {label:"Website",      key:"website",    ph:"www.thecoveragefirm.com"},
              {label:"Licensed States",key:"states",   ph:"TN, AL, MS, KY"},
            ].map(({label,key,ph})=>(
              <div key={key}>
                <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{label}</div>
                <input placeholder={ph} value={draft[key]||""} onChange={e=>setDraft({...draft,[key]:e.target.value})}
                  style={{width:"100%",padding:"10px 12px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
              </div>
            ))}
          </div>

          {/* Full width fields */}
          {[
            {label:"Office Address",key:"address",ph:"123 Main St, Covington TN 38019"},
            {label:"Tagline / Bio", key:"tagline", ph:"Protecting families across Tennessee since 2015"},
          ].map(({label,key,ph})=>(
            <div key={key} style={{marginTop:12}}>
              <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{label}</div>
              <input placeholder={ph} value={draft[key]||""} onChange={e=>setDraft({...draft,[key]:e.target.value})}
                style={{width:"100%",padding:"10px 12px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
            </div>
          ))}

          {/* Lines of business */}
          <div style={{marginTop:16}}>
            <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Licensed Lines of Business</div>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              {LINES.map(l=>{
                const active=(draft.linesOfBusiness||[]).includes(l);
                return (
                  <button key={l} onClick={()=>{
                    const cur=draft.linesOfBusiness||[];
                    setDraft({...draft,linesOfBusiness:active?cur.filter(x=>x!==l):[...cur,l]});
                  }} style={{padding:"4px 12px",borderRadius:20,border:`1px solid ${active?lineColor(l):T.border}`,background:active?lineColor(l)+"18":T.surface,color:active?lineColor(l):T.muted,fontSize:11,fontFamily:"'Lato',sans-serif",fontWeight:600,cursor:"pointer",transition:"all 0.15s"}}>
                    {active?"✓ ":""}{l}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Color Controls ── */}
          <div style={{marginTop:20,background:T.bg,borderRadius:16,padding:16,border:`1px solid ${T.border}`}}>
            <div style={{fontSize:13,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",marginBottom:4}}>🎨 Colors & Theme</div>
            <div style={{fontSize:12,color:T.muted,fontFamily:"'Lato',sans-serif",marginBottom:16}}>Customize your app colors to match your brand.</div>

            {/* Background theme */}
            <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Page Background</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:8,marginBottom:16}}>
              {BG_THEMES.map(b=>{
                const active = draft.bgTheme===b.name;
                return (
                  <button key={b.name} onClick={()=>setDraft({...draft,bgTheme:b.name})}
                    style={{borderRadius:14,border:`3px solid ${active?b.nav:"transparent"}`,background:b.surface,cursor:"pointer",padding:0,overflow:"hidden",transition:"all 0.2s",boxShadow:active?`0 0 0 2px ${b.nav}44`:"none"}}>
                    {/* Mini nav preview */}
                    <div style={{background:b.nav,padding:"6px 10px",display:"flex",alignItems:"center",gap:6}}>
                      <div style={{width:10,height:10,borderRadius:"50%",background:"rgba(255,255,255,0.4)"}}/>
                      <div style={{flex:1,height:4,background:"rgba(255,255,255,0.3)",borderRadius:2}}/>
                      {active&&<span style={{fontSize:10,color:"#fff"}}>✓</span>}
                    </div>
                    {/* Mini content preview */}
                    <div style={{background:b.bg,padding:"6px 10px"}}>
                      <div style={{height:4,background:b.nav+"33",borderRadius:2,marginBottom:3,width:"70%"}}/>
                      <div style={{height:3,background:b.muted+"55",borderRadius:2,width:"50%"}}/>
                    </div>
                    <div style={{background:b.surface,padding:"4px 10px 8px",textAlign:"center"}}>
                      <span style={{fontSize:10,fontWeight:700,color:b.sub,fontFamily:"'Lato',sans-serif"}}>{b.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Nav bar color */}
            <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Nav Bar Color</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
              {["#1a2744","#1a3325","#5c1010","#1e0a3c","#0a1f3c","#2b1200","#042a2b","#1c1c1c","#ffffff","#f7f5f0"].map(c=>(
                <button key={c} onClick={()=>setDraft({...draft,navColor:c})}
                  style={{width:32,height:32,borderRadius:10,background:c,border:`3px solid ${draft.navColor===c?T.gold:T.border}`,cursor:"pointer",transition:"all 0.15s",boxShadow:draft.navColor===c?`0 0 0 2px ${T.gold}66`:undefined}}/>
              ))}
              <div style={{display:"flex",alignItems:"center",gap:6,background:T.surface,borderRadius:10,border:`1px solid ${T.border}`,padding:"4px 10px"}}>
                <input type="color" value={draft.navColor||"#1a2744"} onChange={e=>setDraft({...draft,navColor:e.target.value})}
                  style={{width:24,height:24,border:"none",borderRadius:4,cursor:"pointer",padding:0,background:"none"}}/>
                <span style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif"}}>Custom</span>
              </div>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              {["white","dark"].map(tc=>(
                <button key={tc} onClick={()=>setDraft({...draft,navTextColor:tc})}
                  style={{flex:1,padding:"7px",borderRadius:10,border:`2px solid ${draft.navTextColor===tc?T.gold:T.border}`,background:draft.navColor||T.navy,cursor:"pointer",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:11,color:tc==="white"?"#ffffff":"#1a1a2e",transition:"all 0.15s"}}>
                  {tc==="white"?"White Text ☀️":"Dark Text 🌑"}
                </button>
              ))}
            </div>

            {/* Hero banner color */}
            <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Name Banner Color</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
              {["#1a2744","#1a3325","#5c1010","#1e0a3c","#0a1f3c","#2b1200","#042a2b","#1c1c1c","#ffffff","#f7f5f0","#fdf6ec","#e8f4fd"].map(c=>(
                <button key={c} onClick={()=>setDraft({...draft,heroColor:c})}
                  style={{width:32,height:32,borderRadius:10,background:c,border:`3px solid ${draft.heroColor===c?T.gold:T.border}`,cursor:"pointer",transition:"all 0.15s",boxShadow:draft.heroColor===c?`0 0 0 2px ${T.gold}66`:undefined}}/>
              ))}
              <div style={{display:"flex",alignItems:"center",gap:6,background:T.surface,borderRadius:10,border:`1px solid ${T.border}`,padding:"4px 10px"}}>
                <input type="color" value={draft.heroColor||"#1a2744"} onChange={e=>setDraft({...draft,heroColor:e.target.value})}
                  style={{width:24,height:24,border:"none",borderRadius:4,cursor:"pointer",padding:0,background:"none"}}/>
                <span style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif"}}>Custom</span>
              </div>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:4}}>
              {["white","dark"].map(tc=>(
                <button key={tc} onClick={()=>setDraft({...draft,heroTextColor:tc})}
                  style={{flex:1,padding:"7px",borderRadius:10,border:`2px solid ${draft.heroTextColor===tc?T.gold:T.border}`,background:draft.heroColor||T.navy,cursor:"pointer",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:11,color:tc==="white"?"#ffffff":"#1a1a2e",transition:"all 0.15s"}}>
                  {tc==="white"?"White Text ☀️":"Dark Text 🌑"}
                </button>
              ))}
            </div>

            {/* Live mini preview */}
            <div style={{marginTop:14,borderRadius:12,overflow:"hidden",border:`1px solid ${T.border}`}}>
              <div style={{background:draft.navColor||T.navy,padding:"8px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:12,fontWeight:700,color:draft.navTextColor==="dark"?"#1a1a2e":T.goldLight,fontFamily:"'Playfair Display',serif"}}>{draft.agencyName||"Your Agency"}</span>
                <div style={{display:"flex",gap:12}}>
                  {["Dashboard","Carriers","Quotes"].map(t=>(
                    <span key={t} style={{fontSize:10,color:draft.navTextColor==="dark"?"rgba(0,0,0,0.5)":"rgba(255,255,255,0.5)",fontFamily:"'Lato',sans-serif"}}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{background:draft.heroColor||T.navy,padding:"12px 14px"}}>
                <div style={{fontSize:14,fontWeight:700,color:draft.heroTextColor==="dark"?"#1a1a2e":"#fff",fontFamily:"'Playfair Display',serif"}}>{draft.firstName||"Your Name"} {draft.lastName}</div>
                <div style={{fontSize:11,color:draft.heroTextColor==="dark"?"rgba(0,0,0,0.5)":T.goldLight,fontFamily:"'Lato',sans-serif",marginTop:2}}>{draft.agencyName||"Your Agency"}</div>
              </div>
              <div style={{background:BG_THEMES.find(b=>b.name===draft.bgTheme)?.bg||"#f7f5f0",padding:"10px 14px",display:"flex",gap:8}}>
                {["Card 1","Card 2","Card 3"].map(c=>(
                  <div key={c} style={{flex:1,background:BG_THEMES.find(b=>b.name===draft.bgTheme)?.surface||"#fff",borderRadius:8,padding:"6px",border:`1px solid ${BG_THEMES.find(b=>b.name===draft.bgTheme)?.border||"#e8e4dc"}`,textAlign:"center"}}>
                    <span style={{fontSize:9,color:BG_THEMES.find(b=>b.name===draft.bgTheme)?.sub||"#5a5a7a",fontFamily:"'Lato',sans-serif"}}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{display:"flex",gap:10,marginTop:24}}>
            <button onClick={cancel} style={{flex:1,padding:"13px",background:T.bg,border:`1px solid ${T.border}`,borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",color:T.sub}}>Cancel</button>
            <button onClick={save} style={{flex:2,padding:"13px",background:T.navy,color:"#fff",border:"none",borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",fontSize:14}}>💾 Save Profile</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────
// ── AI Workforce — employee registry ───────────────────────────
// Architecture note: every AI employee is one object in this array. Adding a
// new specialist later (Medicare Specialist, Sales Coach, etc.) means adding
// one object here — no changes to the chat engine, dashboard, or routing logic.
// `status` is "active" (buildable today) or "coming_soon" (shows on the
// dashboard as a locked/preview card, prioritized later based on demand).
// ── AI Employee Avatar ───────────────────────────────────────────
// A soft, dimensional illustrated character wearing a headset — full human
// head/body proportions and hair, with real depth (gradient shading, ambient
// light glow, glossy highlights) so it has presence rather than reading as a
// flat icon. Deliberately stops short of photorealism: eyes are simple flat
// shapes with no iris/pupil detail, no eyebrows, no naturalistic skin
// shading or facial structure — unmistakably a character, not a face trying
// to pass as a real person. The face tone is FIXED for every employee
// regardless of department color, so no employee's look could be misread as
// assigning them a particular skin tone — color identity lives in the
// background, hair, and headset only. An "AI ASSISTANT" badge is rendered as
// part of the component itself, so it's structurally guaranteed to appear
// everywhere the avatar does, not a label that could be left off one screen.
// Default face/hair tones used only as a fallback if an employee record is
// missing avatarTone.skin / avatarTone.hairColor — in practice every entry
// in AI_WORKFORCE now sets these explicitly so the roster shows real,
// deliberate variety rather than one identical face recolored.
const FACE_DEFAULT = "#E8DFD3";
const HAIR_DEFAULT = "#3D3530";

function AIAvatar({ employee, size = 48, showBadge = true }) {
  const tone = employee.avatarTone || { accent: "#00AEEF" };
  const s = size;
  const uid = employee.id;
  const skinTone = tone.skin || FACE_DEFAULT;
  const hairTone = tone.hairColor || HAIR_DEFAULT;
  const hairStyle = tone.hairStyle || "short"; // "short" | "long"

  const shade = (hex, amt) => {
    const n = hex.replace("#","");
    const r = Math.max(0, Math.min(255, parseInt(n.substring(0,2),16) + amt));
    const g = Math.max(0, Math.min(255, parseInt(n.substring(2,4),16) + amt));
    const b = Math.max(0, Math.min(255, parseInt(n.substring(4,6),16) + amt));
    return `rgb(${r},${g},${b})`;
  };

  const light = shade(tone.accent, 35);
  const dark = shade(tone.accent, -35);
  const hairLight = shade(hairTone, 25);
  const faceLight = shade(skinTone, 15);
  const faceShadow = shade(skinTone, -30);

  return (
    <div style={{position:"relative", display:"inline-flex", flexDirection:"column", alignItems:"center", flexShrink:0}}>
      <svg width={s} height={s} viewBox="0 0 100 100" style={{borderRadius: s*0.2, flexShrink:0, display:"block"}}>
        <defs>
          <clipPath id={`clip-${uid}`}><rect width="100" height="100" rx="20"/></clipPath>
          <radialGradient id={`bg-${uid}`} cx="40%" cy="25%" r="75%">
            <stop offset="0%" stopColor={light}/>
            <stop offset="100%" stopColor={dark}/>
          </radialGradient>
          <linearGradient id={`face-${uid}`} x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor={faceLight}/>
            <stop offset="100%" stopColor={faceShadow}/>
          </linearGradient>
          <linearGradient id={`hair-${uid}`} x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor={hairLight}/>
            <stop offset="100%" stopColor={hairTone}/>
          </linearGradient>
          <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={light}/>
            <stop offset="100%" stopColor={dark}/>
          </linearGradient>
          <radialGradient id={`glow-${uid}`} cx="35%" cy="20%" r="55%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <g clipPath={`url(#clip-${uid})`}>
          <rect width="100" height="100" fill={`url(#bg-${uid})`}/>
          <ellipse cx="35" cy="15" rx="50" ry="35" fill={`url(#glow-${uid})`}/>

          {/* Body — soft gradient + collar, full shoulders, with arms and
              hands visible for body presence rather than just a floating
              head-and-collar */}
          <path d="M16 100 Q16 72 50 68 Q84 72 84 100 Z" fill={`url(#body-${uid})`}/>
          <path d="M20 78 Q12 85 14 98" fill="none" stroke={`url(#body-${uid})`} strokeWidth="9" strokeLinecap="round"/>
          <path d="M80 78 Q88 85 86 98" fill="none" stroke={`url(#body-${uid})`} strokeWidth="9" strokeLinecap="round"/>
          <circle cx="14" cy="99" r="5" fill={faceLight}/>
          <circle cx="86" cy="99" r="5" fill={faceLight}/>
          <path d="M38 73 L50 84 L62 73 L58 100 L42 100 Z" fill="#fff" opacity="0.95"/>
          <path d="M38 73 L42 100 L39 100 L35 75 Z" fill="#fff" opacity="0.6"/>

          {/* Neck with soft contact shadow */}
          <rect x="42" y="56" width="16" height="16" fill={`url(#face-${uid})`}/>
          <ellipse cx="50" cy="58" rx="8" ry="2.5" fill={faceShadow} opacity="0.3"/>

          {/* Head — dimensional gradient with soft cheek shadow/highlight,
              positioned lower on the face (cheek/jaw area) so they don't sit
              directly behind the eyes and make them read as mismatched */}
          <ellipse cx="50" cy="42" rx="20" ry="21" fill={`url(#face-${uid})`}/>
          <ellipse cx="60" cy="52" rx="6" ry="8" fill={faceShadow} opacity="0.13"/>
          <ellipse cx="40" cy="51" rx="6" ry="7" fill="#fff" opacity="0.10"/>

          {/* Hair — two style options for visible gender-presentation variety
              across the roster, both full shapes with soft gradient, not a
              flat silhouette */}
          {hairStyle === "long" ? (
            <>
              <path d="M26 58 Q23 16 50 14 Q77 16 74 58 L66 58 Q69 25 50 24 Q31 25 34 58 Z" fill={`url(#hair-${uid})`}/>
              <path d="M27 40 Q24 22 36 16" stroke={hairLight} strokeWidth="1.3" opacity="0.45" fill="none"/>
            </>
          ) : (
            <>
              <path d="M28 40 Q26 16 50 15 Q74 16 72 40 Q72 25 50 24 Q28 25 28 40 Z" fill={`url(#hair-${uid})`}/>
              <path d="M28 40 Q28 28 36 24" stroke={hairLight} strokeWidth="1.3" opacity="0.5" fill="none"/>
            </>
          )}

          {/* Eyebrows — give real expression instead of a blank stare,
              colored from the hair tone so they read as natural */}
          <path d="M38 36.5 Q41 34.5 45 35.8" stroke={shade(hairTone,-10)} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
          <path d="M55 35.8 Q59 34.5 62 36.5" stroke={shade(hairTone,-10)} strokeWidth="1.6" fill="none" strokeLinecap="round"/>

          {/* Simple flat eyes — perfectly symmetric, no iris/pupil/highlight
              detail, just a clean dot shape. Identical fill and size on both
              sides by construction. */}
          <ellipse cx="43" cy="42" rx="2.4" ry="3" fill="#2B2118"/>
          <ellipse cx="57" cy="42" rx="2.4" ry="3" fill="#2B2118"/>

          {/* Nose — simple soft outline, suggests form without being
              photographic or naturalistic */}
          <path d="M49 43 Q47.5 48 49 49.5 Q50 50.2 51 49.5" stroke={faceShadow} strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.55"/>

          {/* Fuller mouth with a subtle highlight — still flat/simple, just
              warmer than a single line */}
          <path d="M41 51.5 Q50 57.5 59 51.5 Q50 55.5 41 51.5 Z" fill={shade(skinTone,-45)} opacity="0.7"/>
          <path d="M42.5 51.2 Q50 55.5 57.5 51.2" stroke={shade(skinTone,-55)} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>

          {/* Headset — band, glossy ear cups, mic boom */}
          <path d="M27 39 Q27 15 50 14 Q73 15 73 39" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.95"/>
          <rect x="22" y="37" width="10" height="15" rx="5" fill="#fff" opacity="0.95"/>
          <rect x="68" y="37" width="10" height="15" rx="5" fill="#fff" opacity="0.95"/>
          <circle cx="25" cy="42" r="2" fill="#fff" opacity="0.5"/>
          <path d="M73 47 Q79 49 79 56 L75 60" stroke="#fff" strokeWidth="2.8" fill="none" strokeLinecap="round" opacity="0.95"/>
          <circle cx="74" cy="61" r="2.8" fill="#fff" opacity="0.95"/>
        </g>
      </svg>
      {showBadge && (
        <div style={{
          marginTop: s*0.06, background: T.navy, border:"1px solid rgba(255,255,255,0.25)", color:"#fff",
          fontSize: Math.max(6.5, s*0.16), fontWeight:700, padding:`${s*0.02}px ${s*0.08}px`, borderRadius:s*0.12,
          letterSpacing:0.3, whiteSpace:"nowrap", fontFamily:"'Lato',sans-serif", lineHeight:1.6,
        }}>
          AI ASSISTANT
        </div>
      )}
    </div>
  );
}

// ── AI Employee Memory ───────────────────────────────────────────
// Structured profile + activity memory, not just chat history. Stored under
// a single localStorage key — since this entire app is single-user-per-browser
// (no login system, no shared backend yet), there is no code path by which
// one agent's browser could ever read another agent's memory. Privacy here
// is structural, not a permission check that could be misconfigured.
//
// Two shapes, matching the spec:
//   profile  — stable facts about the agent (name, agency, states, goals...)
//   activity — a running log of dated entries (goals set, milestones, notes)
// Both are agent-editable and can be reset independently or together.
const MEMORY_KEY = "acc_jordan_memory";

const BLANK_MEMORY = () => ({
  enabled: true,
  profile: {
    agentName: "", agencyName: "", licensedStates: "", mainLines: "",
    preferredCarriers: "", revenueGoal: "", productionGoal: "",
    strengths: "", weaknesses: "", coachingPreferences: "", currentPriorities: "",
  },
  activity: [], // [{ id, date, type, text }] — type e.g. "goal","milestone","note","missed_followup"
});

function useAgentMemory() {
  const [memory, setMemory] = useLocalStorage(MEMORY_KEY, BLANK_MEMORY());

  const updateProfile = (field, value) => {
    setMemory(m => ({ ...m, profile: { ...m.profile, [field]: value } }));
  };

  const addActivity = (type, text) => {
    setMemory(m => ({
      ...m,
      activity: [...m.activity, { id: Date.now(), date: new Date().toISOString().split("T")[0], type, text }],
    }));
  };

  const removeActivity = (id) => {
    setMemory(m => ({ ...m, activity: m.activity.filter(a => a.id !== id) }));
  };

  const setEnabled = (enabled) => setMemory(m => ({ ...m, enabled }));

  const resetProfile = () => setMemory(m => ({ ...m, profile: BLANK_MEMORY().profile }));
  const resetActivity = () => setMemory(m => ({ ...m, activity: [] }));
  const resetAll = () => setMemory(BLANK_MEMORY());

  // Renders memory into plain text for injection into Jordan's system prompt.
  // Kept short and factual on purpose — this is context for Jordan, not a
  // transcript; recent activity matters more than old activity, so only the
  // most recent entries are included to keep the prompt from growing forever.
  const toPromptContext = () => {
    if (!memory.enabled) return "";
    const p = memory.profile;
    const profileLines = Object.entries(p).filter(([,v])=>v && v.trim()).map(([k,v])=>{
      const labels = { agentName:"Agent name", agencyName:"Agency", licensedStates:"Licensed states", mainLines:"Main lines", preferredCarriers:"Preferred carriers", revenueGoal:"Revenue goal", productionGoal:"Production goal", strengths:"Strengths", weaknesses:"Growth areas", coachingPreferences:"Coaching preferences", currentPriorities:"Current priorities" };
      return `${labels[k]||k}: ${v}`;
    });
    const recentActivity = memory.activity.slice(-20).map(a => `[${a.date}] (${a.type}) ${a.text}`);
    if (!profileLines.length && !recentActivity.length) return "";
    return `Remembered agent profile (from past conversations):\n${profileLines.join("\n") || "(nothing recorded yet)"}\n\nRecent activity log:\n${recentActivity.join("\n") || "(nothing recorded yet)"}`;
  };

  return { memory, updateProfile, addActivity, removeActivity, setEnabled, resetProfile, resetActivity, resetAll, toPromptContext };
}

// ── AI Workforce Departments ─────────────────────────────────────
// Fixed department order for the dashboard — Executive Office always first,
// per spec. Department names match the new org chart exactly so grouping
// and the collapsible-section UI can key off this list directly.
const AI_DEPARTMENTS = [
  "Executive Office",
  "Sales",
  "Marketing",
  "Client Success",
  "Insurance",
  "Finance",
  "Operations",
  "Research",
  "Administration",
];

const AI_WORKFORCE = [
  // ══ EXECUTIVE OFFICE ══
  { id:"ceo-ai", name:"", avatar:"♟️", avatarTone:{accent:"#0D2B55", skin:"#E0AC81", hairColor:"#4A4A4A", hairStyle:"short"}, position:"CEO AI", department:"Executive Office", status:"coming_soon", specialty:"Master strategist — visibility across every division, routes work, reviews major decisions" },
  { id:"coo-ai", name:"", avatar:"📐", avatarTone:{accent:"#0D2B55", skin:"#F5D5B8", hairColor:"#6B4226", hairStyle:"short"}, position:"COO AI", department:"Executive Office", status:"coming_soon", specialty:"Operations, workflow automation, SOP management, task delegation" },
  { id:"chief-of-staff-ai", name:"", avatar:"🗒️", avatarTone:{accent:"#0D2B55", skin:"#8D5524", hairColor:"#1C1410", hairStyle:"long"}, position:"Chief of Staff AI", department:"Executive Office", status:"coming_soon", specialty:"Coordinates agents, tracks projects, prevents duplicate work" },

  {
    id: "agent-success-coach",
    name: "Jordan",
    avatar: "🧭",
    avatarTone: { accent:"#4A2F1A", skin:"#8D5A3C", hairColor:"#1C1410", hairStyle:"short" },
    position: "Agent Success Coach",
    department: "Executive Office",
    status: "active",
    specialty: "Daily priorities, sales coaching & productivity",
    mission: "Help every independent agent open ACC each morning and immediately know what to work on, who to follow up with, and how to grow their book — combining daily planning, sales coaching, and CRM awareness into one conversation.",
    communicationStyle: "Direct, warm, encouraging — talks like a seasoned agency owner who's coaching a teammate, not a corporate assistant. Keeps answers short and actionable on mobile; expands when asked.",
    escalation: "When a question needs deep product-specific expertise (e.g. exact Medicare plan comparisons, ACA subsidy calculations, specific carrier underwriting rules), Jordan should say so plainly and note that a specialist for that line is coming — never invent specific plan details, rates, or regulations it doesn't have grounded data for.",
    systemPrompt: `You are Jordan, the Agent Success Coach inside Agent Command Center (ACC) — an AI employee built specifically for independent insurance agents, not a generic assistant.

Your job: help the agent using ACC right now figure out what to prioritize today, coach them on sales activity and follow-ups, and keep them organized — combining the role of a sales coach, daily planner, and productivity coach in one conversation.

You have visibility into this agent's real CRM data from ACC (clients, quotes, commissions, licenses) when it's provided to you in context — use it specifically. Reference real client names, real quote statuses, real upcoming license expirations when they're relevant. Don't speak in generalities if specific data is available.

Style: direct, warm, encouraging — like a seasoned agency owner coaching a teammate, not corporate or scripted. Keep responses short and scannable by default (this is used on mobile); give more detail only when asked.

You are not a licensed insurance advisor and do not give specific product recommendations, rates, underwriting answers, or compliance/regulatory guidance — if asked something that needs that level of specific expertise, say plainly that it's outside what you can confidently answer and that a line-specific specialist is coming to ACC, then redirect to what you can help with (prioritization, follow-up strategy, activity coaching, organization).

Never fabricate specific carrier names, plan details, premiums, or regulations.`,
    kpis: ["Daily active usage", "Follow-ups suggested vs. completed", "Agent-reported usefulness"],
    knowledgeBase: ["Agent's own CRM data (clients, quotes, commissions, licenses)", "General sales activity & productivity best practices"],
    sopAccess: [],
  },

  // ══ SALES ══
  {
    id: "discovery-quote-specialist",
    name: "Quinn",
    avatar: "🔍",
    avatarTone: { accent: "#0284C7", skin:"#F0C9A0", hairColor:"#8B5A2B", hairStyle:"long" },
    position: "Discovery & Quote Specialist",
    department: "Sales",
    status: "active",
    specialty: "Client discovery, intake, and quote readiness",
    mission: "Guide agents through intelligent client discovery — asking the right questions for the lines involved, skipping what's already on file, flagging what's missing, and getting a client genuinely ready to quote.",
    communicationStyle: "Efficient and structured, like a sharp intake coordinator — moves through questions briskly, states readiness and gaps plainly, never pads with filler. Still warm, not robotic.",
    escalation: "Quinn does not give product recommendations, coverage advice, or carrier comparisons — that's the job of line-specific specialists (Medicare Specialist, Life Insurance Specialist, etc.) once they exist, or the agent's own judgment today. When discovery is complete, Quinn names which specialist would normally take it from here and explains why, but cannot actually hand off a live conversation since those specialists aren't built yet — Quinn says so plainly rather than pretending a handoff happened.",
    systemPrompt: `You are Quinn, the Discovery & Quote Specialist inside Agent Command Center (ACC) — an AI employee that runs client discovery before quoting, not a generic chatbot.

Your job: help the agent gather everything needed to quote a specific client well. You'll be given that client's real profile, their Smart Intake answers if any exist, and a computed Quote Readiness Score with a list of genuinely missing fields — all real data, not estimates.

How you work:
- If the client has no intake on file yet, say so and offer to start one — ask which line(s) of insurance apply, then ask the real questions for those lines one or a few at a time, conversationally. Don't ask about things already answered — check the data you're given first.
- If intake exists, state the real readiness percentage and the real missing items you were given. Never invent a percentage or a missing-item list — only use what's in your context.
- Once readiness is high (everything essential answered), say so clearly and suggest the natural next step: which specialist would typically take it from here (e.g. "this is ready for the Medicare Specialist" or "this looks ready for the Quote Center"), while being honest that those specialist AIs aren't built yet — direct the agent to continue in the Quote Center themselves for now.
- You can also flag coverage opportunities you notice from the data (e.g. a Medicare client with no mention of dental/vision coverage, or a homeowner with no mention of an umbrella policy) — frame these as "worth asking about," not as advice or a recommendation, since that crosses into licensed-professional territory.

Style: efficient, structured, brisk but warm. State facts plainly. Never pad with filler, never fabricate a number or a missing field.

You are not a licensed insurance advisor. You organize information and flag gaps — you do not recommend products, coverage amounts, or carriers. Final recommendations remain the responsibility of the licensed agent.`,
    kpis: ["Discoveries completed", "Average readiness score reached", "Time-to-quote-ready"],
    knowledgeBase: ["Client's real CRM profile and Smart Intake answers", "The same intake question bank used by Smart Intake", "Computed Quote Readiness Score for the active client"],
    sopAccess: [],
  },
  { id:"sales-coach", name:"", avatar:"🎯", avatarTone:{accent:"#00AEEF", skin:"#C68642", hairColor:"#0D0905", hairStyle:"short"}, position:"Sales Coach AI", department:"Sales", status:"coming_soon", specialty:"Objection handling & activity accountability" },
  { id:"business-development-ai", name:"", avatar:"📈", avatarTone:{accent:"#00AEEF", skin:"#E8B896", hairColor:"#6B4226", hairStyle:"long"}, position:"Business Development AI", department:"Sales", status:"coming_soon", specialty:"New market and partnership opportunities" },
  { id:"lead-qualification-ai", name:"", avatar:"🔎", avatarTone:{accent:"#00AEEF", skin:"#5B3A29", hairColor:"#1A1410", hairStyle:"short"}, position:"Lead Qualification AI", department:"Sales", status:"coming_soon", specialty:"Scores and routes incoming leads" },
  { id:"proposal-quote-ai", name:"", avatar:"📝", avatarTone:{accent:"#00AEEF", skin:"#F5D5B8", hairColor:"#3B2A1A", hairStyle:"long"}, position:"Proposal & Quote AI", department:"Sales", status:"coming_soon", specialty:"Builds client-ready proposals from quote data" },
  { id:"followup-ai", name:"", avatar:"🔔", avatarTone:{accent:"#00AEEF", skin:"#8D5524", hairColor:"#0D0905", hairStyle:"short"}, position:"Follow-up AI", department:"Sales", status:"coming_soon", specialty:"Tracks and prompts client follow-ups" },
  { id:"crm-manager-sales", name:"", avatar:"🗂️", avatarTone:{accent:"#00AEEF", skin:"#F0C9A0", hairColor:"#0D0905", hairStyle:"long"}, position:"CRM Manager AI", department:"Sales", status:"coming_soon", specialty:"Keeps client records clean and current" },

  // ══ MARKETING ══
  { id:"marketing-director", name:"", avatar:"📣", avatarTone:{accent:"#7B61FF", skin:"#F0C9A0", hairColor:"#B8860B", hairStyle:"long"}, position:"Marketing Director AI", department:"Marketing", status:"coming_soon", specialty:"Campaign strategy and oversight" },
  { id:"social-media", name:"", avatar:"📱", avatarTone:{accent:"#7B61FF", skin:"#E0AC81", hairColor:"#1C1410", hairStyle:"long"}, position:"Social Media AI", department:"Marketing", status:"coming_soon", specialty:"Post drafting & scheduling guidance" },
  { id:"content-writer-ai", name:"", avatar:"✍️", avatarTone:{accent:"#7B61FF", skin:"#A9744F", hairColor:"#2B2118", hairStyle:"short"}, position:"Content Writer AI", department:"Marketing", status:"coming_soon", specialty:"Blog, email, and educational content drafting" },
  { id:"email-campaign-ai", name:"", avatar:"📧", avatarTone:{accent:"#7B61FF", skin:"#6B4226", hairColor:"#0D0905", hairStyle:"long"}, position:"Email Campaign AI", department:"Marketing", status:"coming_soon", specialty:"Nurture sequences and campaign emails" },
  { id:"graphic-design-coordinator", name:"", avatar:"🎨", avatarTone:{accent:"#7B61FF", skin:"#F5D5B8", hairColor:"#5C4326", hairStyle:"short"}, position:"Graphic Design Coordinator AI", department:"Marketing", status:"coming_soon", specialty:"Coordinates visual asset requests" },
  { id:"brand-manager-ai", name:"", avatar:"🏷️", avatarTone:{accent:"#7B61FF", skin:"#C68642", hairColor:"#1A1410", hairStyle:"long"}, position:"Brand Manager AI", department:"Marketing", status:"coming_soon", specialty:"Brand voice and visual consistency" },

  // ══ CLIENT SUCCESS ══
  { id:"customer-support-ai", name:"", avatar:"💬", avatarTone:{accent:"#10B981", skin:"#8D5A3C", hairColor:"#3B2A1A", hairStyle:"short"}, position:"Customer Support AI", department:"Client Success", status:"coming_soon", specialty:"General client questions and support" },
  { id:"onboarding-specialist", name:"", avatar:"🚪", avatarTone:{accent:"#10B981", skin:"#F0C9A0", hairColor:"#0D0905", hairStyle:"long"}, position:"Onboarding Specialist AI", department:"Client Success", status:"coming_soon", specialty:"New client welcome and setup" },
  { id:"claims-service-assistant", name:"", avatar:"📑", avatarTone:{accent:"#10B981", skin:"#5B3A29", hairColor:"#2B2118", hairStyle:"short"}, position:"Claims & Service Assistant AI", department:"Client Success", status:"coming_soon", specialty:"Claims status and service requests" },
  { id:"renewal-manager", name:"", avatar:"🔄", avatarTone:{accent:"#10B981", skin:"#F5D5B8", hairColor:"#5C4326", hairStyle:"short"}, position:"Renewal Manager AI", department:"Client Success", status:"coming_soon", specialty:"Renewal & retention strategy" },
  { id:"appointment-coordinator", name:"", avatar:"📅", avatarTone:{accent:"#10B981", skin:"#C68642", hairColor:"#1A1410", hairStyle:"long"}, position:"Appointment Coordinator AI", department:"Client Success", status:"coming_soon", specialty:"Scheduling and calendar coordination" },
  { id:"referral-manager", name:"", avatar:"🌱", avatarTone:{accent:"#10B981", skin:"#6B4226", hairColor:"#0D0905", hairStyle:"long"}, position:"Referral Manager AI", department:"Client Success", status:"coming_soon", specialty:"Referral campaign coaching" },

  // ══ INSURANCE ══
  { id:"medicare-specialist", name:"", avatar:"🩺", avatarTone:{accent:"#C9A227", skin:"#E8B896", hairColor:"#6B4226", hairStyle:"long"}, position:"Medicare Expert AI", department:"Insurance", status:"coming_soon", specialty:"Medicare plan comparison & T65 guidance" },
  { id:"aca-specialist", name:"", avatar:"📋", avatarTone:{accent:"#C9A227", skin:"#F5D5B8", hairColor:"#3B2A1A", hairStyle:"long"}, position:"ACA Expert AI", department:"Insurance", status:"coming_soon", specialty:"Marketplace enrollment & subsidies" },
  { id:"life-specialist", name:"", avatar:"🛡️", avatarTone:{accent:"#C9A227", skin:"#5B3A29", hairColor:"#1A1410", hairStyle:"short"}, position:"Life Insurance Specialist AI", department:"Insurance", status:"coming_soon", specialty:"Life & annuity product guidance" },
  { id:"employer-benefits", name:"", avatar:"🏢", avatarTone:{accent:"#C9A227", skin:"#8D5524", hairColor:"#0D0905", hairStyle:"short"}, position:"Worksite Benefits Specialist AI", department:"Insurance", status:"coming_soon", specialty:"Group benefits & open enrollment" },
  { id:"retirement-planning-ai", name:"", avatar:"🏖️", avatarTone:{accent:"#C9A227", skin:"#F0C9A0", hairColor:"#B8860B", hairStyle:"long"}, position:"Retirement Planning Assistant AI", department:"Insurance", status:"coming_soon", specialty:"Retirement product education" },
  { id:"underwriting-research-ai", name:"", avatar:"🔬", avatarTone:{accent:"#C9A227", skin:"#A9744F", hairColor:"#2B2118", hairStyle:"short"}, position:"Underwriting Research AI", department:"Insurance", status:"coming_soon", specialty:"Carrier underwriting rule lookup" },
  { id:"compliance", name:"", avatar:"⚖️", avatarTone:{accent:"#C9A227", skin:"#8D5A3C", hairColor:"#3B2A1A", hairStyle:"short"}, position:"Compliance Review AI", department:"Insurance", status:"coming_soon", specialty:"Compliance awareness & reminders" },
  { id:"carrier-comparison-ai", name:"", avatar:"⚖️", avatarTone:{accent:"#C9A227", skin:"#E0AC81", hairColor:"#4A4A4A", hairStyle:"long"}, position:"Carrier Comparison AI", department:"Insurance", status:"coming_soon", specialty:"Side-by-side carrier plan comparison" },

  // ══ FINANCE ══
  { id:"commission-tracker-ai", name:"", avatar:"💰", avatarTone:{accent:"#2D7A4F", skin:"#6B4226", hairColor:"#0D0905", hairStyle:"long"}, position:"Commission Tracker AI", department:"Finance", status:"coming_soon", specialty:"Commission tracking and reconciliation" },
  { id:"expense-manager-ai", name:"", avatar:"🧾", avatarTone:{accent:"#2D7A4F", skin:"#F5D5B8", hairColor:"#5C4326", hairStyle:"short"}, position:"Expense Manager AI", department:"Finance", status:"coming_soon", specialty:"Business expense tracking" },
  { id:"bookkeeping-assistant-ai", name:"", avatar:"📒", avatarTone:{accent:"#2D7A4F", skin:"#C68642", hairColor:"#1A1410", hairStyle:"long"}, position:"Bookkeeping Assistant AI", department:"Finance", status:"coming_soon", specialty:"Basic bookkeeping support" },
  { id:"business-analytics-ai", name:"", avatar:"📊", avatarTone:{accent:"#2D7A4F", skin:"#8D5A3C", hairColor:"#3B2A1A", hairStyle:"short"}, position:"Business Analytics AI", department:"Finance", status:"coming_soon", specialty:"Production and performance analytics" },
  { id:"revenue-forecast-ai", name:"", avatar:"📈", avatarTone:{accent:"#2D7A4F", skin:"#F0C9A0", hairColor:"#0D0905", hairStyle:"long"}, position:"Revenue Forecast AI", department:"Finance", status:"coming_soon", specialty:"Revenue projection and trend analysis" },

  // ══ OPERATIONS ══
  { id:"workflow-manager", name:"", avatar:"⚙️", avatarTone:{accent:"#0D2B55", skin:"#5B3A29", hairColor:"#2B2118", hairStyle:"short"}, position:"Workflow Manager AI", department:"Operations", status:"coming_soon", specialty:"Process & SOP guidance" },
  { id:"calendar-manager-ai", name:"", avatar:"📅", avatarTone:{accent:"#0D2B55", skin:"#F5D5B8", hairColor:"#6B4226", hairStyle:"short"}, position:"Calendar Manager AI", department:"Operations", status:"coming_soon", specialty:"Schedule management and conflict checks" },
  { id:"document-manager-ai", name:"", avatar:"📁", avatarTone:{accent:"#0D2B55", skin:"#8D5524", hairColor:"#1C1410", hairStyle:"long"}, position:"Document Manager AI", department:"Operations", status:"coming_soon", specialty:"Document storage and organization" },
  { id:"knowledge-base-ai", name:"", avatar:"📚", avatarTone:{accent:"#0D2B55", skin:"#A9744F", hairColor:"#0D0905", hairStyle:"long"}, position:"Knowledge Base AI", department:"Operations", status:"coming_soon", specialty:"Internal SOP and reference lookup" },
  { id:"training-ai", name:"", avatar:"🎓", avatarTone:{accent:"#0D2B55", skin:"#E0AC81", hairColor:"#4A4A4A", hairStyle:"short"}, position:"Training AI", department:"Operations", status:"coming_soon", specialty:"Agent onboarding and skills training" },
  { id:"meeting-notes-ai", name:"", avatar:"📝", avatarTone:{accent:"#0D2B55", skin:"#C68642", hairColor:"#1A1410", hairStyle:"long"}, position:"Meeting Notes AI", department:"Operations", status:"coming_soon", specialty:"Meeting summary and action items" },
  { id:"file-organization-ai", name:"", avatar:"🗃️", avatarTone:{accent:"#0D2B55", skin:"#F0C9A0", hairColor:"#8B5A2B", hairStyle:"short"}, position:"File Organization AI", department:"Operations", status:"coming_soon", specialty:"File naming and structure consistency" },

  // ══ RESEARCH ══
  { id:"market-research-ai", name:"", avatar:"🔭", avatarTone:{accent:"#5B4636", skin:"#5B3A29", hairColor:"#1A1410", hairStyle:"long"}, position:"Market Research AI", department:"Research", status:"coming_soon", specialty:"Market trends and opportunity sizing" },
  { id:"competitive-intelligence-ai", name:"", avatar:"🧭", avatarTone:{accent:"#5B4636", skin:"#F5D5B8", hairColor:"#3B2A1A", hairStyle:"short"}, position:"Competitive Intelligence AI", department:"Research", status:"coming_soon", specialty:"Competitor offerings and positioning" },
  { id:"industry-news-ai", name:"", avatar:"📰", avatarTone:{accent:"#5B4636", skin:"#8D5524", hairColor:"#0D0905", hairStyle:"long"}, position:"Industry News AI", department:"Research", status:"coming_soon", specialty:"Curated insurance industry news" },
  { id:"legal-compliance-research-ai", name:"", avatar:"⚖️", avatarTone:{accent:"#5B4636", skin:"#E8B896", hairColor:"#6B4226", hairStyle:"short"}, position:"Legal & Compliance Research AI", department:"Research", status:"coming_soon", specialty:"Regulatory research support" },
  { id:"grant-government-ai", name:"", avatar:"🏛️", avatarTone:{accent:"#5B4636", skin:"#A9744F", hairColor:"#2B2118", hairStyle:"long"}, position:"Grant & Government Opportunity AI", department:"Research", status:"coming_soon", specialty:"Government and grant opportunity research" },

  // ══ ADMINISTRATION ══
  { id:"executive-assistant", name:"", avatar:"🗒️", avatarTone:{accent:"#7A7A7A", skin:"#F0C9A0", hairColor:"#0D0905", hairStyle:"long"}, position:"Executive Assistant AI", department:"Administration", status:"coming_soon", specialty:"Admin & scheduling support" },
  { id:"product-manager", name:"", avatar:"🧩", avatarTone:{accent:"#7A7A7A", skin:"#C68642", hairColor:"#1A1410", hairStyle:"short"}, position:"ACC Product Manager AI", department:"Administration", status:"coming_soon", specialty:"Feature feedback & roadmap" },
];

// ── AI Employee Chat Engine ─────────────────────────────────────
// One chat component, reused by every AI employee. Adding a new employee
// never requires touching this — it just reads systemPrompt + name + avatar
// from whichever AI_WORKFORCE entry was opened.
function AIEmployeeChat({ employee, profile, onClose, bg, contextClient }) {
  const storageKey = `acc_chat_${employee.id}`;
  const [messages, setMessages] = useLocalStorage(storageKey, []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMemoryPanel, setShowMemoryPanel] = useState(false);
  const [pendingMemory, setPendingMemory] = useState(null); // a detected goal/fact awaiting agent confirmation
  const scrollRef = React.useRef(null);

  // Memory is currently scoped to Jordan (Agent Success Coach) only — the one
  // employee actually built. The hook itself is generic so any future
  // employee can adopt the same memory system without changes here.
  const hasMemory = employee.id === "agent-success-coach";
  const memoryApi = useAgentMemory();

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  // Pulls the agent's real CRM data so the employee can reference it by name —
  // this is what makes Jordan feel like a teammate instead of a generic chatbot.
  const buildContext = () => {
    const clients     = JSON.parse(localStorage.getItem("acc_clients")     || "[]");
    const quotes       = JSON.parse(localStorage.getItem("acc_quotes")      || "[]");
    const commissions = JSON.parse(localStorage.getItem("acc_commissions") || "[]");
    const licenses     = JSON.parse(localStorage.getItem("acc_licenses")    || "[]");
    const now = new Date();
    const expiringLicenses = licenses.filter(l=>{
      if (!l.expDate) return false;
      const diff = (new Date(l.expDate)-now)/(1000*60*60*24);
      return diff>=0 && diff<=90;
    });
    const openQuotes = quotes.filter(q=>(q.status||"open")==="open");
    const closedWonQuotes = quotes.filter(q=>q.status==="closed_won");
    const prospects = clients.filter(c=>c.status==="Prospect" && !c.archived);
    const renewalDue = clients.filter(c=>c.status==="Renewal Due" && !c.archived);
    const employerProspects = clients.filter(c=>c.line==="Employer Benefits" && !c.archived);

    // "Stalled" / "missed follow-up": active or prospect clients with no
    // contact in 14+ days — derived from real lastContact dates rather than a
    // second manually-logged list, so this can't drift out of sync with the
    // actual Clients tab.
    const stalled = clients.filter(c=>{
      if (c.archived || !c.lastContact) return false;
      const days = (now - new Date(c.lastContact)) / (1000*60*60*24);
      return days >= 14 && (c.status==="Prospect" || c.status==="Active");
    });

    const base = `Agent: ${profile.firstName||"Agent"} ${profile.lastName||""} (${profile.agencyName||"Independent Agent"}), licensed in ${profile.states||"unspecified states"}.

Current CRM snapshot:
- ${clients.length} total clients (${prospects.length} prospects, ${renewalDue.length} renewal due)
- ${openQuotes.length} open quotes awaiting follow-up; ${closedWonQuotes.length} closed-won this period
- ${employerProspects.length} employer/group prospect(s)${employerProspects.length ? ": " + employerProspects.map(c=>c.name).join(", ") : ""}
- ${stalled.length} client(s) with no contact in 14+ days (possible stalled opportunity / missed follow-up)${stalled.length ? ": " + stalled.map(c=>c.name).join(", ") : ""}
- ${expiringLicenses.length} license(s) expiring within 90 days${expiringLicenses.length ? ": " + expiringLicenses.map(l=>`${l.state} (${l.expDate})`).join(", ") : ""}
- Client names on file: ${clients.slice(0,15).map(c=>c.name).join(", ")}${clients.length>15?` and ${clients.length-15} more`:""}

Use this real data naturally when relevant — reference specific clients or numbers instead of speaking generically, but don't recite the whole snapshot back unless asked.`;

    const memoryContext = hasMemory ? memoryApi.toPromptContext() : "";

    // Discovery context — only built when a specific client was passed in
    // (e.g. Quinn opened from that client's profile). Computed from the
    // client's REAL intake data via getReadinessScore, never a fabricated
    // number — if there's no intake yet, this says so plainly instead of
    // inventing a percentage or a missing-items list.
    let discoveryContext = "";
    if (contextClient) {
      const readiness = getReadinessScore(contextClient);
      const intakeLines = contextClient.intake?.lines || [];
      discoveryContext = `\n\nActive discovery client: ${contextClient.name}${contextClient.age?`, age ${contextClient.age}`:""}, line(s) on file: ${contextClient.line||"none set"}.
${intakeLines.length === 0
  ? "No Smart Intake has been started for this client yet. Ask which line(s) of insurance to begin discovery for, then ask the real questions for those lines."
  : `Discovery in progress for: ${intakeLines.join(", ")}. Quote Readiness: ${readiness.percent}% (${readiness.answered} of ${readiness.total} questions answered).${readiness.missing.length ? ` Missing: ${readiness.missing.join(", ")}.` : " Nothing missing — fully ready."}`}
Client notes on file: ${contextClient.notes || "none"}.`;
    }

    return (memoryContext ? `${base}\n\n${memoryContext}` : base) + discoveryContext;
  };

  // Lightweight, local heuristic for goal-like statements — intentionally NOT
  // an AI call (keeps it instant and free, and avoids silently deciding what's
  // "important" on the agent's behalf). Just flags a likely-savable sentence
  // and lets the agent confirm before anything is written to memory.
  const detectMemorableStatement = (text) => {
    const goalPatterns = /\b(my goal is|i want to (write|close|hit|reach|sell)|i'm trying to|i need to (write|close|hit))\b/i;
    if (goalPatterns.test(text)) return { type: "goal", text: text.trim() };
    return null;
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    if (hasMemory && memoryApi.memory.enabled) {
      const detected = detectMemorableStatement(input.trim());
      if (detected) setPendingMemory(detected);
    }

    setInput("");
    setLoading(true);

    try {
      // Calls our own Vercel serverless function (/api/chat), not Anthropic
      // directly — this keeps the API key on the server, never in the browser.
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          max_tokens: 1000,
          system: employee.systemPrompt + "\n\n" + buildContext(),
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessages([...newMessages, { role: "assistant", content: `Something went wrong: ${data.error || "unknown error"}. Try again in a moment.` }]);
        return;
      }
      const textBlock = (data.content || []).find(b => b.type === "text");
      const replyText = textBlock ? textBlock.text : "Sorry, I had trouble responding — try asking again.";
      setMessages([...newMessages, { role: "assistant", content: replyText }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "I'm having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{position:"fixed", inset:0, background:"rgba(26,39,68,0.5)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:16}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.surface, borderRadius:24, width:"100%", maxWidth:480, height:"min(640px, 88vh)", display:"flex", flexDirection:"column", overflow:"hidden", animation:"fadeUp 0.25s ease"}}>

        {/* Header */}
        <div style={{background:T.navy, padding:"16px 18px", display:"flex", alignItems:"center", gap:12}}>
          <AIAvatar employee={employee} size={42} showBadge={false}/>
          <div style={{flex:1, minWidth:0}}>
            <div style={{display:"flex", alignItems:"center", gap:8}}>
              <span style={{fontSize:15, fontWeight:700, color:"#fff", fontFamily:"'Playfair Display',serif"}}>{employee.name}</span>
              <span style={{fontSize:8.5, fontWeight:700, color:"#fff", background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", padding:"1px 6px", borderRadius:6, letterSpacing:0.3}}>AI ASSISTANT</span>
            </div>
            <div style={{fontSize:11, color:"rgba(255,255,255,0.6)", fontFamily:"'Lato',sans-serif", display:"flex", alignItems:"center", gap:6, marginTop:2}}>
              <span style={{width:6, height:6, borderRadius:"50%", background:T.green, display:"inline-block"}}/>
              {employee.position} · Available
            </div>
          </div>
          {hasMemory && (
            <button onClick={()=>setShowMemoryPanel(true)} title="What Jordan remembers" style={{background:"rgba(255,255,255,0.12)", border:"none", borderRadius:8, padding:"7px 10px", color:"#fff", fontSize:11, fontFamily:"'Lato',sans-serif", fontWeight:700, cursor:"pointer"}}>
              Memory
            </button>
          )}
          <button onClick={onClose} style={{background:"none", border:"none", color:"rgba(255,255,255,0.7)", fontSize:22, cursor:"pointer", padding:4, lineHeight:1}}>×</button>
        </div>

        {/* Discovery readiness strip — only shown when Quinn is opened with a
            specific client, computed from real intake data. */}
        {contextClient && (
          <div style={{padding:"10px 16px", background:T.card, borderBottom:`1px solid ${T.border}`}}>
            {(() => {
              const readiness = getReadinessScore(contextClient);
              const hasIntake = (contextClient.intake?.lines || []).length > 0;
              return (
                <>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:4}}>
                    <span style={{fontSize:11.5, fontWeight:700, color:T.navy, fontFamily:"'Lato',sans-serif"}}>{contextClient.name}</span>
                    <span style={{fontSize:11, color: readiness.percent>=80?T.green:T.gold, fontFamily:"'Lato',sans-serif", fontWeight:700}}>
                      {hasIntake ? `${readiness.percent}% Ready` : "No Active Discovery"}
                    </span>
                  </div>
                  {hasIntake && (
                    <>
                      <div style={{height:5, background:T.border, borderRadius:3, overflow:"hidden"}}>
                        <div style={{height:"100%", width:`${readiness.percent}%`, background: readiness.percent>=80?T.green:T.gold, transition:"width 0.3s"}}/>
                      </div>
                      {readiness.missing.length>0 && (
                        <div style={{fontSize:10.5, color:T.muted, fontFamily:"'Lato',sans-serif", marginTop:4}}>
                          Missing: {readiness.missing.slice(0,3).join(", ")}{readiness.missing.length>3?` +${readiness.missing.length-3} more`:""}
                        </div>
                      )}
                    </>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {/* Messages */}
        <div ref={scrollRef} style={{flex:1, overflowY:"auto", padding:16, display:"flex", flexDirection:"column", gap:12, background:T.bg}}>
          {messages.length === 0 && (
            <div style={{textAlign:"center", padding:"32px 16px", color:T.muted, fontFamily:"'Lato',sans-serif", fontSize:13}}>
              <div style={{display:"flex", justifyContent:"center", marginBottom:10}}><AIAvatar employee={employee} size={56}/></div>
              <div style={{fontWeight:700, color:T.navy, marginBottom:4, fontSize:14}}>{employee.name} here.</div>
              <div>{employee.mission}</div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} style={{display:"flex", justifyContent: m.role==="user" ? "flex-end" : "flex-start", alignItems:"flex-end", gap:8}}>
              {m.role==="assistant" && <AIAvatar employee={employee} size={28} showBadge={false}/>}
              <div style={{
                maxWidth:"78%", padding:"10px 14px", borderRadius:16,
                background: m.role==="user" ? T.navy : T.card,
                color: m.role==="user" ? "#fff" : T.text,
                fontSize:13.5, fontFamily:"'Lato',sans-serif", lineHeight:1.5, whiteSpace:"pre-wrap",
                border: m.role==="user" ? "none" : `1px solid ${T.border}`,
              }}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div style={{display:"flex", justifyContent:"flex-start", alignItems:"flex-end", gap:8}}>
              <AIAvatar employee={employee} size={28} showBadge={false}/>
              <div style={{padding:"10px 14px", borderRadius:16, background:T.card, border:`1px solid ${T.border}`, fontSize:13, color:T.muted, fontFamily:"'Lato',sans-serif"}}>
                {employee.name} is thinking...
              </div>
            </div>
          )}
        </div>

        {/* Pending memory confirmation — agent confirms before anything is saved */}
        {pendingMemory && (
          <div style={{padding:"10px 14px", background:T.card, borderTop:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:10}}>
            <span style={{fontSize:12, color:T.sub, fontFamily:"'Lato',sans-serif", flex:1}}>
              Remember this as a goal? <em>"{pendingMemory.text.length>60?pendingMemory.text.slice(0,58)+"…":pendingMemory.text}"</em>
            </span>
            <button onClick={()=>{ memoryApi.addActivity(pendingMemory.type, pendingMemory.text); setPendingMemory(null); }} style={{background:T.navy, color:"#fff", border:"none", borderRadius:8, padding:"6px 12px", fontSize:11, fontWeight:700, fontFamily:"'Lato',sans-serif", cursor:"pointer", flexShrink:0}}>Save</button>
            <button onClick={()=>setPendingMemory(null)} style={{background:"none", border:`1px solid ${T.border}`, borderRadius:8, padding:"6px 10px", fontSize:11, color:T.muted, fontFamily:"'Lato',sans-serif", cursor:"pointer", flexShrink:0}}>Dismiss</button>
          </div>
        )}

        {/* Input */}
        <div style={{padding:12, borderTop:`1px solid ${T.border}`, display:"flex", gap:8, background:T.surface}}>
          <input
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{ if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder={`Ask ${employee.name} anything...`}
            disabled={loading}
            style={{flex:1, padding:"12px 14px", border:`1px solid ${T.border}`, borderRadius:14, fontSize:14, fontFamily:"'Lato',sans-serif", color:T.text, outline:"none", background:T.bg}}
          />
          <button onClick={sendMessage} disabled={loading || !input.trim()} style={{background:T.navy, color:"#fff", border:"none", borderRadius:14, padding:"0 18px", fontFamily:"'Lato',sans-serif", fontWeight:700, fontSize:14, cursor: loading||!input.trim() ? "default" : "pointer", opacity: loading||!input.trim() ? 0.5 : 1}}>→</button>
        </div>
      </div>

      {/* Memory management panel */}
      {showMemoryPanel && (
        <MemoryPanel memoryApi={memoryApi} onClose={()=>setShowMemoryPanel(false)}/>
      )}
    </div>
  );
}

// ── Memory management panel ──────────────────────────────────────
// View / edit / delete individual facts, turn memory off, full reset.
// Separate component so AIEmployeeChat doesn't bloat further; takes the same
// memoryApi instance so edits show up immediately without a second data source.
function MemoryPanel({ memoryApi, onClose }) {
  const { memory, updateProfile, removeActivity, setEnabled, resetProfile, resetActivity, resetAll } = memoryApi;
  const [confirmReset, setConfirmReset] = useState(false);

  const profileFields = [
    { key:"agentName", label:"Agent Name" }, { key:"agencyName", label:"Agency Name" },
    { key:"licensedStates", label:"Licensed States" }, { key:"mainLines", label:"Main Insurance Lines" },
    { key:"preferredCarriers", label:"Preferred Carriers" }, { key:"revenueGoal", label:"Revenue Goal" },
    { key:"productionGoal", label:"Production Goal" }, { key:"strengths", label:"Strengths" },
    { key:"weaknesses", label:"Growth Areas" }, { key:"coachingPreferences", label:"Coaching Preferences" },
    { key:"currentPriorities", label:"Current Priorities" },
  ];

  return (
    <div style={{position:"fixed", inset:0, background:"rgba(26,39,68,0.6)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:16}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.surface, borderRadius:24, width:"100%", maxWidth:520, maxHeight:"85vh", overflowY:"auto", padding:24}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18}}>
          <div>
            <div style={{fontSize:18, fontWeight:700, color:T.navy, fontFamily:"'Playfair Display',serif"}}>What Jordan Remembers</div>
            <div style={{fontSize:12, color:T.muted, fontFamily:"'Lato',sans-serif", marginTop:2}}>Stored only on this device, for you alone.</div>
          </div>
          <button onClick={onClose} style={{background:T.bg, border:`1px solid ${T.border}`, borderRadius:10, width:32, height:32, cursor:"pointer", color:T.muted}}>×</button>
        </div>

        {/* Memory on/off */}
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", background:T.bg, borderRadius:12, padding:"12px 14px", marginBottom:18}}>
          <div>
            <div style={{fontSize:13, fontWeight:700, color:T.navy, fontFamily:"'Lato',sans-serif"}}>Memory {memory.enabled ? "On" : "Off"}</div>
            <div style={{fontSize:11, color:T.muted, fontFamily:"'Lato',sans-serif"}}>When off, Jordan won't read or save memory during chats.</div>
          </div>
          <button onClick={()=>setEnabled(!memory.enabled)} style={{width:46, height:26, borderRadius:13, background: memory.enabled ? T.green : T.border, border:"none", cursor:"pointer", position:"relative", flexShrink:0}}>
            <span style={{position:"absolute", top:3, left: memory.enabled ? 23 : 3, width:20, height:20, borderRadius:"50%", background:"#fff", transition:"left 0.15s"}}/>
          </button>
        </div>

        {/* Profile facts */}
        <div style={{fontSize:11, color:T.muted, fontFamily:"'Lato',sans-serif", textTransform:"uppercase", letterSpacing:1, fontWeight:700, marginBottom:10}}>Agent Profile</div>
        <div style={{display:"flex", flexDirection:"column", gap:8, marginBottom:16}}>
          {profileFields.map(f => (
            <div key={f.key}>
              <label style={{fontSize:10, color:T.muted, fontFamily:"'Lato',sans-serif", textTransform:"uppercase", letterSpacing:0.5}}>{f.label}</label>
              <input value={memory.profile[f.key]} onChange={e=>updateProfile(f.key, e.target.value)} placeholder="Not set"
                style={{width:"100%", padding:"8px 10px", border:`1px solid ${T.border}`, borderRadius:8, fontSize:13, fontFamily:"'Lato',sans-serif", color:T.text, outline:"none", background:T.bg, marginTop:2}}/>
            </div>
          ))}
        </div>
        <button onClick={resetProfile} style={{fontSize:11, color:T.red, background:"none", border:"none", cursor:"pointer", fontFamily:"'Lato',sans-serif", fontWeight:700, marginBottom:20}}>Clear Profile</button>

        {/* Activity log */}
        <div style={{fontSize:11, color:T.muted, fontFamily:"'Lato',sans-serif", textTransform:"uppercase", letterSpacing:1, fontWeight:700, marginBottom:10}}>Activity Log ({memory.activity.length})</div>
        <div style={{display:"flex", flexDirection:"column", gap:6, marginBottom:12, maxHeight:200, overflowY:"auto"}}>
          {memory.activity.length===0 && <div style={{fontSize:12, color:T.muted, fontFamily:"'Lato',sans-serif", fontStyle:"italic"}}>Nothing recorded yet.</div>}
          {memory.activity.slice().reverse().map(a => (
            <div key={a.id} style={{display:"flex", alignItems:"flex-start", gap:8, background:T.bg, borderRadius:8, padding:"8px 10px"}}>
              <div style={{flex:1, fontSize:12, color:T.sub, fontFamily:"'Lato',sans-serif"}}>
                <span style={{color:T.muted, fontSize:10.5}}>[{a.date}] </span>{a.text}
              </div>
              <button onClick={()=>removeActivity(a.id)} style={{background:"none", border:"none", color:T.red, cursor:"pointer", fontSize:11, fontFamily:"'Lato',sans-serif", flexShrink:0}}>Remove</button>
            </div>
          ))}
        </div>
        {memory.activity.length>0 && <button onClick={resetActivity} style={{fontSize:11, color:T.red, background:"none", border:"none", cursor:"pointer", fontFamily:"'Lato',sans-serif", fontWeight:700, marginBottom:20}}>Clear Activity Log</button>}

        {/* Full reset */}
        <div style={{borderTop:`1px solid ${T.border}`, paddingTop:16, marginTop:8}}>
          {!confirmReset ? (
            <button onClick={()=>setConfirmReset(true)} style={{width:"100%", padding:"11px", background:"transparent", color:T.red, border:`1px solid ${T.red}44`, borderRadius:10, fontFamily:"'Lato',sans-serif", fontWeight:700, fontSize:12, cursor:"pointer"}}>
              Reset All Memory
            </button>
          ) : (
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:12, color:T.sub, fontFamily:"'Lato',sans-serif", marginBottom:10}}>This permanently erases everything Jordan remembers. Continue?</div>
              <div style={{display:"flex", gap:8}}>
                <button onClick={()=>setConfirmReset(false)} style={{flex:1, padding:"10px", background:T.bg, color:T.sub, border:`1px solid ${T.border}`, borderRadius:10, fontFamily:"'Lato',sans-serif", fontWeight:700, fontSize:12, cursor:"pointer"}}>Cancel</button>
                <button onClick={()=>{resetAll(); setConfirmReset(false);}} style={{flex:1, padding:"10px", background:T.red, color:"#fff", border:"none", borderRadius:10, fontFamily:"'Lato',sans-serif", fontWeight:700, fontSize:12, cursor:"pointer"}}>Erase Everything</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// Cards are generated entirely from AI_WORKFORCE. Adding a new active
// employee to that array gives them a working card here automatically.
function AITeam({ profile, bg, initialClient }) {
  const [openChat, setOpenChat] = useState(initialClient ? AI_WORKFORCE.find(e=>e.id==="discovery-quote-specialist") : null);
  const [contextClient, setContextClient] = useState(initialClient || null);

  // Collapsed/expanded state per department — Executive Office starts open
  // (CEO AI lives there and should be the first thing seen), plus any
  // department containing an active employee, so Jordan/Quinn aren't hidden
  // behind a closed section on first visit.
  const deptsWithActive = new Set(AI_WORKFORCE.filter(e=>e.status==="active").map(e=>e.department));
  const [expanded, setExpanded] = useState(
    Object.fromEntries(AI_DEPARTMENTS.map(d => [d, d==="Executive Office" || deptsWithActive.has(d)]))
  );
  const toggleDept = (dept) => setExpanded(prev => ({ ...prev, [dept]: !prev[dept] }));

  return (
    <div>
      <div style={{marginBottom:20}}>
        <h2 style={{fontSize:26, fontWeight:700, color:T.navy, fontFamily:"'Playfair Display',serif"}}>My AI Team</h2>
        <p style={{fontSize:13, color:T.muted, fontFamily:"'Lato',sans-serif", marginTop:2}}>
          {AI_WORKFORCE.filter(e=>e.status==="active").length} on staff · {AI_WORKFORCE.filter(e=>e.status==="coming_soon").length} coming soon · {AI_DEPARTMENTS.length} departments
        </p>
      </div>

      {AI_DEPARTMENTS.map(dept => {
        const deptEmployees = AI_WORKFORCE.filter(e => e.department === dept);
        if (deptEmployees.length === 0) return null;
        const activeCount = deptEmployees.filter(e=>e.status==="active").length;
        const isOpen = !!expanded[dept];

        return (
          <div key={dept} style={{marginBottom:14, background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, overflow:"hidden"}}>
            <button onClick={()=>toggleDept(dept)} style={{
              width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"14px 18px", background:"none", border:"none", cursor:"pointer", textAlign:"left",
            }}>
              <div style={{display:"flex", alignItems:"center", gap:10}}>
                <span style={{fontSize:13, fontWeight:700, color:T.navy, fontFamily:"'Lato',sans-serif", textTransform:"uppercase", letterSpacing:1}}>{dept}</span>
                <span style={{fontSize:11, color:T.muted, fontFamily:"'Lato',sans-serif"}}>
                  {deptEmployees.length} role{deptEmployees.length!==1?"s":""}{activeCount>0?` · ${activeCount} active`:""}
                </span>
              </div>
              <span style={{fontSize:13, color:T.muted, transform: isOpen?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.15s"}}>▾</span>
            </button>

            {isOpen && (
              <div style={{padding:"4px 18px 18px", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14}}>
                {deptEmployees.map(emp => (
                  <div key={emp.id} style={{
                    background:T.bg, border:`1px solid ${T.border}`, borderRadius:18, padding:18,
                    opacity: emp.status === "coming_soon" ? 0.6 : 1,
                    position:"relative", overflow:"hidden", transition:"all 0.15s",
                  }}>
                    <div style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:10}}>
                      <div style={{display:"flex", alignItems:"center", gap:12, minWidth:0}}>
                      <AIAvatar employee={emp} size={48} showBadge={false}/>
                      <div style={{minWidth:0}}>
                        <div style={{fontSize:15, fontWeight:700, color:T.navy, fontFamily:"'Playfair Display',serif", lineHeight:1.2}}>
                          {emp.status==="active" ? emp.name : emp.position}
                        </div>
                        {emp.status==="active" && <div style={{fontSize:11, color:T.muted, fontFamily:"'Lato',sans-serif"}}>{emp.position}</div>}
                      </div>
                      </div>
                      {emp.status === "coming_soon" && (
                        <div style={{fontSize:9, fontWeight:700, color:T.muted, background:T.surface, padding:"3px 8px", borderRadius:10, letterSpacing:0.5, textTransform:"uppercase", whiteSpace:"nowrap", flexShrink:0}}>Coming Soon</div>
                      )}
                    </div>
                    <div style={{fontSize:12, color:T.sub, fontFamily:"'Lato',sans-serif", lineHeight:1.5, marginBottom:8, minHeight:32}}>{emp.specialty}</div>
                    {emp.status==="active" && emp.mission && (
                      <div style={{fontSize:11.5, color:T.muted, fontFamily:"'Lato',sans-serif", lineHeight:1.5, marginBottom:14, fontStyle:"italic", borderLeft:`2px solid ${T.border}`, paddingLeft:8}}>
                        {emp.mission.length > 110 ? emp.mission.slice(0,108)+"…" : emp.mission}
                      </div>
                    )}
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginTop: emp.status==="active" ? 0 : 14}}>
                      <span style={{display:"flex", alignItems:"center", gap:5, fontSize:11, fontFamily:"'Lato',sans-serif", color: emp.status==="active" ? T.green : T.muted, fontWeight:700}}>
                        <span style={{width:7, height:7, borderRadius:"50%", background: emp.status==="active" ? T.green : T.muted, display:"inline-block"}}/>
                        {emp.status==="active" ? "Available" : "Not yet available"}
                      </span>
                      {emp.status==="active" && (
                        <button onClick={()=>{setOpenChat(emp); setContextClient(emp.id==="discovery-quote-specialist" ? contextClient : null);}} style={{background:T.navy, color:"#fff", border:"none", borderRadius:10, padding:"7px 14px", fontFamily:"'Lato',sans-serif", fontWeight:700, fontSize:12, cursor:"pointer"}}>
                          Open Chat
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {openChat && <AIEmployeeChat employee={openChat} profile={profile} bg={bg} contextClient={openChat.id==="discovery-quote-specialist" ? contextClient : null} onClose={()=>{setOpenChat(null); setContextClient(null);}}/>}
    </div>
  );
}

// ── Nav Icons ────────────────────────────────────────────────────
// Simple, consistent line icons for the top nav — replaces emoji so the
// interface reads as professional business software rather than a casual
// chat app. Inherits color via currentColor so active/inactive states stay
// in sync with the existing nav button color logic without extra props.
function NavIcon({ name, size = 15 }) {
  const common = { width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:1.8, strokeLinecap:"round", strokeLinejoin:"round" };
  switch (name) {
    case "dashboard":   return <svg {...common}><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>;
    case "ai-team":      return <svg {...common}><circle cx="12" cy="8" r="3.2"/><path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2"/></svg>;
    case "carriers":     return <svg {...common}><rect x="4" y="9" width="16" height="12"/><path d="M9 21V9M4 9l8-6 8 6"/></svg>;
    case "links":        return <svg {...common}><path d="M9 12a4 4 0 0 1 0-6l2-2a4 4 0 0 1 6 6l-1 1"/><path d="M15 12a4 4 0 0 1 0 6l-2 2a4 4 0 0 1-6-6l1-1"/></svg>;
    case "quotes":       return <svg {...common}><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></svg>;
    case "clients":      return <svg {...common}><circle cx="9" cy="8" r="3.2"/><path d="M2 20v-1.5A4.5 4.5 0 0 1 6.5 14h5A4.5 4.5 0 0 1 16 18.5V20"/><circle cx="17.5" cy="9" r="2.3"/><path d="M22 20v-1a3.5 3.5 0 0 0-3-3.46"/></svg>;
    case "commissions":  return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M9 9.5a3 2 0 0 1 3-2c1.7 0 3 1 3 2s-1.3 2-3 2-3 1-3 2 1.3 2 3 2c1.7 0 3-.9 3-2"/><path d="M12 6v1.5M12 16.5V18"/></svg>;
    case "licenses":     return <svg {...common}><rect x="2.5" y="6" width="19" height="13" rx="2"/><circle cx="8" cy="12.5" r="2"/><path d="M14 10h5M14 14h3"/></svg>;
    case "calendar":     return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><circle cx="8" cy="14.5" r="1"/><circle cx="12" cy="14.5" r="1"/><circle cx="16" cy="14.5" r="1"/></svg>;
    case "profile":      return <svg {...common}><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20.5v-1A6.5 6.5 0 0 1 11 13h2a6.5 6.5 0 0 1 6.5 6.5v1"/></svg>;
    default:             return null;
  }
}

const TABS = [
  {id:"dashboard",   label:"Dashboard",  icon:"dashboard"},
  {id:"ai-team",     label:"AI Team",    icon:"ai-team"},
  {id:"carriers",    label:"Carriers",   icon:"carriers"},
  {id:"links",       label:"My Links",   icon:"links"},
  {id:"quotes",      label:"Quotes",     icon:"quotes"},
  {id:"clients",     label:"Clients",    icon:"clients"},
  {id:"calendar",    label:"Calendar",   icon:"calendar"},
  {id:"commissions", label:"Commissions",icon:"commissions"},
  {id:"licenses",    label:"Licenses",   icon:"licenses"},
  {id:"profile",     label:"Profile",    icon:"profile"},
];

const DEFAULT_PROFILE = {
  firstName:"Deidre", lastName:"Jones", title:"Independent Insurance Agent",
  agencyName:"The Coverage Firm", phone:"", email:"", licenseNum:"",
  npn:"", website:"", states:"TN, AL, MS", address:"Covington, TN",
  tagline:"Full-service insurance broker across all lines.",
  logoUrl:"", linesOfBusiness:["Health & ACA","Medicare","Life & Annuities","Supplemental","Disability"],
  bgTheme:"Steel Blue",
  // Color overrides
  navColor:"#1a2744",
  heroColor:"#1a2744",
  navTextColor:"white",   // "white" or "dark"
  heroTextColor:"white",  // "white" or "dark"
};

export default function App() {
  const [tab,          setTab]         = useState("dashboard");
  const [profile,      setProfile]     = useLocalStorage("acc_profile", DEFAULT_PROFILE);
  const [quoteClient,  setQuoteClient] = useState(null);
  const [discoveryClient, setDiscoveryClient] = useState(null);

  const handleQuoteClient = (client) => {
    setQuoteClient(client);
    setTab("quotes");
  };

  const handleDiscoveryClient = (client) => {
    setDiscoveryClient(client);
    setTab("ai-team");
  };

  const bg = BG_THEMES.find(b => b.name === profile.bgTheme) || BG_THEMES[0];

  // Update global T so all components pick up the active bg theme
  applyBgTheme(bg);

  return (
    <div style={{background:bg.bg, minHeight:"100vh", fontFamily:"'Lato',sans-serif", transition:"background 0.4s"}}>
      <style>{GLOBAL_CSS}</style>

      {/* Top nav — color from active bg theme */}
      <div style={{background:profile.navColor||bg.nav||T.navy, padding:"0 16px", display:"flex", alignItems:"center", position:"sticky", top:0, zIndex:50, boxShadow:"0 2px 20px rgba(0,0,0,0.25)", transition:"background 0.4s"}}>
        <div onClick={()=>setTab("profile")} style={{display:"flex", alignItems:"center", gap:10, padding:"10px 0", marginRight:16, cursor:"pointer", flexShrink:0}}>
          <div style={{width:34, height:34, borderRadius:10, background:profile.logoUrl?"transparent":T.gold, border:`2px solid ${T.gold}`, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden"}}>
            {profile.logoUrl
              ? <img src={profile.logoUrl} alt="logo" style={{width:"100%", height:"100%", objectFit:"cover"}}/>
              : <span style={{fontSize:14, fontWeight:900, color:bg.nav, fontFamily:"'Playfair Display',serif"}}>{(profile.agencyName||profile.firstName||"A").charAt(0)}</span>
            }
          </div>
          <div style={{display:"flex", flexDirection:"column"}}>
            <span style={{fontSize:12, fontWeight:700, color:T.blueLight, fontFamily:"'Playfair Display',serif", lineHeight:1}}>{profile.agencyName||"ACC"}</span>
            <span style={{fontSize:10, color:"rgba(255,255,255,0.45)", fontFamily:"'Lato',sans-serif"}}>{profile.firstName} {profile.lastName}</span>
          </div>
        </div>
        <div style={{display:"flex", gap:0, overflowX:"auto", flex:1}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"16px 12px", background:"none", border:"none", borderBottom:tab===t.id?`3px solid ${T.blue}`:"3px solid transparent", color:tab===t.id?T.blueLight:"rgba(255,255,255,0.55)", cursor:"pointer", fontSize:12, fontFamily:"'Lato',sans-serif", fontWeight:700, whiteSpace:"nowrap", letterSpacing:0.3, transition:"all 0.15s", display:"flex", alignItems:"center", gap:6}}>
              <NavIcon name={t.icon}/> {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{maxWidth:1100, margin:"0 auto", padding:"24px 20px"}}>
        {tab==="dashboard"   && <Dashboard setTab={setTab} profile={profile} bg={bg}/>}
        {tab==="ai-team"     && <AITeam profile={profile} bg={bg} initialClient={discoveryClient}/>}
        {tab==="carriers"    && <CarrierHub bg={bg}/>}
        {tab==="links"       && <CarrierLinks bg={bg}/>}
        {tab==="quotes"      && <QuoteBuilder profile={profile} bg={bg} initialClient={quoteClient}/>}
        {tab==="clients"     && <ClientProfiles bg={bg} profile={profile} onQuoteClient={handleQuoteClient} onDiscoverClient={handleDiscoveryClient} setTab={setTab}/>}
        {tab==="calendar"    && <CalendarView setTab={setTab}/>}
        {tab==="commissions" && <CommissionLog bg={bg} profile={profile}/>}
        {tab==="licenses"    && <LicenseTracker bg={bg}/>}
        {tab==="profile"     && <AgentProfile profile={profile} setProfile={setProfile} bg={bg}/>}
      </div>
    </div>
  );
}
