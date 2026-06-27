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
  "Life & Health": ["Health & ACA","Medicare","Life & Annuities","Preneed / Burial","Supplemental","Dental & Vision","Disability","Long-Term Care","Critical Illness","Hospital Indemnity"],
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
  {id:"open",       label:"Open",       icon:"📋", color:"#1a2744"},
  {id:"pending",    label:"Pending",    icon:"⏳", color:"#d4850a"},
  {id:"closed_won", label:"Closed Won", icon:"✅", color:"#2d7a4f"},
  {id:"closed_lost",label:"Closed Lost",icon:"❌", color:"#c0392b"},
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
    "Long-Term Care":"#5B2C6F","Critical Illness":"#AD1457","Hospital Indemnity":"#6A1B9A","Preneed / Burial":"#4E342E",
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
function CarrierModal({ carrier, onClose, onEdit }) {
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
          {label:"Agent Phone", value:carrier.phone, icon:"📞"},
          {label:"Licensed States", value:carrier.contracts.join(", "), icon:"📍"},
        ].map(({label,value,icon})=>(
          <div key={label} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:`1px solid ${T.border}`}}>
            <span style={{fontSize:20}}>{icon}</span>
            <div>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1}}>{label}</div>
              <div style={{fontSize:15,color:T.navy,fontFamily:"'Lato',sans-serif",fontWeight:600,marginTop:2}}>{value}</div>
            </div>
          </div>
        ))}
        {/* Commission / Override breakdown */}
        <div style={{padding:"12px 0",borderBottom:`1px solid ${T.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <span style={{fontSize:20}}>💰</span>
            <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1}}>Commission / Override by Product</div>
          </div>
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
            🔗 Open Agent Portal
          </a>
          <button onClick={()=>{onEdit(carrier);onClose();}} style={{flex:1,background:T.bg,border:`1px solid ${T.border}`,borderRadius:12,padding:"14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:14,color:T.sub,cursor:"pointer"}}>
            ✏️ Edit
          </button>
        </div>
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

  const filtered = filterLine==="All" ? carriers : carriers.filter(c=>c.line===filterLine);

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
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>Carrier Hub</h2>
          <p style={{fontSize:13,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>{carriers.length} carriers · tap to view portal & details</p>
        </div>
        <button onClick={()=>setShowAdd(true)} style={{background:T.navy,color:"#fff",border:"none",borderRadius:12,padding:"10px 18px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Add Carrier</button>
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

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
        {filtered.map(c=><CarrierCard key={c.id} carrier={c} onClick={()=>setSelected(c)}/>)}
      </div>

      {selected && <CarrierModal carrier={selected} onClose={()=>setSelected(null)} onEdit={(c)=>{setNewCarrier({...c,overrides:c.overrides||[{product:'',rate:c.override||''}]});setEditingCarrier(c.id);setShowAdd(true);}}/>}

      {/* Add carrier modal */}
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

// ── Quote Builder ─────────────────────────────────────────────
function QuoteBuilder({ initialClient }) {
  const blankQuote = () => ({id:Date.now(),carrier:"",line:"Medicare",plan:"",premium:"",notes:"",customFields:[{l:"OTC Allowance",v:"$500/qtr"},{l:"Dental Included",v:"Yes"},{l:"MOOP",v:"$3,300"}],color:T.navy,status:"open",recommendation:"",bestFor:""});

  const [quotes, setQuotes] = useLocalStorage('acc_quotes', [
    {id:1,carrier:"Humana",line:"Medicare",plan:"Gold Plus HMO H1036",premium:0,notes:"$0 premium. Strong dental & vision. SilverSneakers included.",color:"#006D9C",
     customFields:[{l:"Plan Type",v:"HMO"},{l:"OTC Allowance",v:"$500/qtr"},{l:"MOOP",v:"$3,300"},{l:"Drug Deductible",v:"$0"},{l:"Dental Included",v:"Yes"},{l:"Vision Included",v:"Yes"},{l:"Gym Benefit",v:"SilverSneakers"},{l:"Transportation",v:"Yes"}]},
    {id:2,carrier:"Aetna",line:"Medicare",plan:"Medicare Advantage Value HMO",premium:29,notes:"Low premium. Good drug formulary. No OTC.",color:"#7B2D8B",
     customFields:[{l:"Plan Type",v:"HMO"},{l:"OTC Allowance",v:"None"},{l:"MOOP",v:"$4,900"},{l:"Drug Deductible",v:"$0"},{l:"Dental Included",v:"Limited"},{l:"Vision Included",v:"Yes"},{l:"Gym Benefit",v:"No"},{l:"Transportation",v:"No"}]},
    {id:3,carrier:"UnitedHealthcare",line:"Medicare",plan:"AARP MedicareComplete HMO",premium:0,notes:"$0 premium. Strong OTC. Renew Active gym benefit.",color:"#CC0000",
     customFields:[{l:"Plan Type",v:"HMO"},{l:"OTC Allowance",v:"$300/qtr"},{l:"MOOP",v:"$3,900"},{l:"Drug Deductible",v:"$0"},{l:"Dental Included",v:"Yes"},{l:"Vision Included",v:"Yes"},{l:"Gym Benefit",v:"Renew Active"},{l:"Transportation",v:"Yes"}]},
  ]);

  const [clientName, setClientName] = useState(initialClient?.name || "James Stovall");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null); // quote id being edited
  const [newQ, setNewQ] = useState(blankQuote());
  const [newFieldLabel, setNewFieldLabel] = useState("");

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
    const q = {...newQ, id:editing||Date.now(), premium:Number(newQ.premium)||0, color:lineColor(newQ.line)||T.navy};
    if (editing) setQuotes(quotes.map(x=>x.id===editing?q:x));
    else setQuotes([...quotes,q]);
    setNewQ(blankQuote());
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
    const a = document.createElement("a"); a.href=url; a.download=`quotes-${clientName.replace(/\s+/g,"_")}.json`; a.click();
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

    const emailQuote = () => {
    const subject = encodeURIComponent(`Insurance Quote Comparison — ${clientName}`);
    const body = encodeURIComponent(
      `Hi ${clientName},\n\nPlease find your personalized insurance quote comparison below.\n\n` +
      quotes.map(q =>
        `${q.carrier} — ${q.plan}\n` +
        `Premium: $${q.premium}/mo\n` +
        (q.customFields||[]).map(f => `${f.l}: ${f.v}`).join("\n") +
        `\nNotes: ${q.notes||""}\n`
      ).join("\n---\n") +
      `\n\nBest regards,\n${profile?.firstName||""} ${profile?.lastName||""}\n${profile?.agencyName||""}\n${profile?.phone||""}\n${profile?.email||""}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>Quote Comparison</h2>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
            <span style={{fontSize:12,color:T.muted,fontFamily:"'Lato',sans-serif"}}>Client:</span>
            <input value={clientName} onChange={e=>setClientName(e.target.value)}
              style={{fontSize:14,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",border:"none",borderBottom:`2px solid ${T.gold}`,background:"transparent",outline:"none",padding:"2px 4px"}}/>
          </div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"flex-end"}}>
          <button onClick={emailQuote} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"10px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",color:T.sub,display:"flex",alignItems:"center",gap:6}}>
            ✉️ Email
          </button>
          <button onClick={printQuote} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"10px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",color:T.sub,display:"flex",alignItems:"center",gap:6}}>
            🖨️ Print / PDF
          </button>
          {quotes.length>0&&<button onClick={exportJSON} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"10px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",color:T.sub,display:"flex",alignItems:"center",gap:6}}>
            📥 Export Data
          </button>}
          <button onClick={()=>{setNewQ(blankQuote());setEditing(null);setShowAdd(true);}} style={{background:T.gold,color:T.navy,border:"none",borderRadius:12,padding:"10px 18px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Add Quote</button>
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
            <div style={{fontSize:16,fontWeight:700,color:T.goldLight,fontFamily:"'Courier Prime',monospace",marginTop:2}}>{value}</div>
          </div>
        ))}
      </div>

      {/* Quote cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
        {quotes.map(q=>{
          const isLowest = (Number(q.premium)||0)===lowest;
          return (
            <div key={q.id} style={{background:T.surface,border:`2px solid ${isLowest?T.gold:T.border}`,borderRadius:18,overflow:"hidden",animation:"fadeUp 0.3s ease"}}>
              {isLowest && <div style={{background:T.gold,color:T.navy,fontSize:10,fontWeight:700,fontFamily:"'Lato',sans-serif",textAlign:"center",padding:"4px",letterSpacing:1}}>⭐ LOWEST PREMIUM</div>}
              <div style={{height:5,background:q.color||lineColor(q.line)}}/>
              <div style={{padding:16}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:2}}>
                  <div style={{fontSize:17,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>{q.carrier}</div>
                  <button onClick={()=>startEdit(q)} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,padding:"3px 9px",fontSize:11,color:T.muted,cursor:"pointer",fontFamily:"'Lato',sans-serif"}}>Edit</button>
                </div>
                {/* Status selector */}
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
                  {QUOTE_STATUSES.map(s=>(
                    <button key={s.id} onClick={()=>setQuotes(quotes.map(x=>x.id===q.id?{...x,status:s.id}:x))}
                      style={{padding:"3px 9px",borderRadius:20,border:`1px solid ${(q.status||"open")===s.id?s.color:T.border}`,background:(q.status||"open")===s.id?s.color+"18":T.surface,color:(q.status||"open")===s.id?s.color:T.muted,cursor:"pointer",fontSize:10,fontFamily:"'Lato',sans-serif",fontWeight:600,transition:"all 0.15s"}}>
                      {s.icon} {s.label}
                    </button>
                  ))}
                </div>
                <div style={{fontSize:12,color:T.sub,fontFamily:"'Lato',sans-serif",marginBottom:4}}>{q.plan}</div>
                <div style={{fontSize:11,color:"#fff",background:lineColor(q.line),padding:"2px 8px",borderRadius:20,display:"inline-block",marginBottom:12,fontFamily:"'Lato',sans-serif",fontWeight:600}}>{q.line}</div>

                {/* Premium */}
                <div style={{background:T.bg,borderRadius:12,padding:"10px 14px",marginBottom:12,textAlign:"center"}}>
                  <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1}}>Monthly Premium</div>
                  <div style={{fontSize:30,fontWeight:700,color:isLowest?T.green:T.navy,fontFamily:"'Courier Prime',monospace",marginTop:2}}>
                    {Number(q.premium)===0?"$0":` $${q.premium}`}
                  </div>
                  {Number(q.premium)===0&&<div style={{fontSize:10,color:T.green,fontFamily:"'Lato',sans-serif",fontWeight:700}}>$0 PREMIUM PLAN</div>}
                </div>

                {/* Custom fields */}
                {(q.customFields||[]).map((f,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${T.border}`}}>
                    <span style={{fontSize:12,color:T.muted,fontFamily:"'Lato',sans-serif"}}>{f.l}</span>
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

                <button onClick={()=>setQuotes(quotes.filter(x=>x.id!==q.id))} style={{marginTop:12,width:"100%",padding:"7px",background:"transparent",border:`1px solid ${T.border}`,borderRadius:8,color:T.muted,fontSize:11,fontFamily:"'Lato',sans-serif",cursor:"pointer"}}>Remove</button>
              </div>
            </div>
          );
        })}
      </div>

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
                <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{label}</div>
                <input placeholder={ph} value={newQ[key]} onChange={e=>setNewQ({...newQ,[key]:e.target.value})}
                  style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
              </div>
            ))}

            {/* Line selector */}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Line of Business</div>
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
                <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Plan Details</div>
                {newQ.customFields.map((f,i)=>(
                  <div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
                    <input value={f.l} onChange={e=>updateCustomField(i,"l",e.target.value)}
                      style={{flex:"0 0 42%",padding:"8px 10px",border:`1px solid ${T.border}`,borderRadius:8,fontSize:12,fontFamily:"'Lato',sans-serif",color:T.muted,background:T.bg,outline:"none"}}/>
                    <input value={f.v} onChange={e=>updateCustomField(i,"v",e.target.value)} placeholder="value"
                      style={{flex:1,padding:"8px 10px",border:`1px solid ${T.border}`,borderRadius:8,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none",fontWeight:600}}/>
                    <button onClick={()=>removeCustomField(i)} style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:16,padding:"0 4px"}}>✕</button>
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
              <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Best For (client-facing)</div>
              <input placeholder="e.g. Clients who want $0 premium + OTC benefits" value={newQ.bestFor||""} onChange={e=>setNewQ({...newQ,bestFor:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none"}}/>
            </div>
            {/* Agent Recommendation */}
            <div style={{marginBottom:12}}>
              <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Why I Recommend This</div>
              <input placeholder="e.g. Strongest guaranteed death benefit for this age/budget" value={newQ.recommendation||""} onChange={e=>setNewQ({...newQ,recommendation:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,background:T.bg,outline:"none"}}/>
            </div>
            {/* Notes */}
            <div style={{marginBottom:18}}>
              <div style={{fontSize:10,color:T.muted,fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Notes</div>
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

// ── Client Profiles ───────────────────────────────────────────
function ClientProfiles({ initialClient, onQuoteClient, setTab }) {
  const [clients, setClients] = useLocalStorage('acc_clients', SAMPLE_CLIENTS);
  const [selected, setSelected] = useState(initialClient||null);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [newClient, setNewClient] = useState({name:"",age:"",phone:"",email:"",line:"Health & ACA",status:"Prospect",notes:""});
  const [newNote, setNewNote] = useState("");

  const filtered = clients.filter(c=>c.name.toLowerCase().includes(search.toLowerCase()));

  const addClient = () => {
    if (!newClient.name) return;
    setClients([...clients,{...newClient,id:Date.now(),lastContact:new Date().toISOString().split("T")[0],quotes:[]}]);
    setNewClient({name:"",age:"",phone:"",email:"",line:"Health & ACA",status:"Prospect",notes:""});
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
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>Client Profiles</h2>
          <p style={{fontSize:13,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>{clients.length} clients · notes, quotes & follow-ups</p>
        </div>
        <div style={{display:"flex",gap:8}}>
          {clients.length>0&&<button onClick={exportCSV} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"10px 14px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",color:T.sub}}>📥 Export CSV</button>}
          <button onClick={()=>setShowAdd(true)} style={{background:T.navy,color:"#fff",border:"none",borderRadius:12,padding:"10px 18px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Add Client</button>
        </div>
      </div>

      {/* Search */}
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search clients..." style={{width:"100%",padding:"12px 16px",border:`1px solid ${T.border}`,borderRadius:12,fontSize:14,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.surface,marginBottom:16}}/>

      {/* Client list */}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {filtered.map(c=>(
          <div key={c.id} onClick={()=>setSelected(c)} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:16,padding:16,cursor:"pointer",display:"flex",alignItems:"center",gap:14,transition:"all 0.15s",animation:"fadeUp 0.3s ease"}}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 20px rgba(26,39,68,0.08)";e.currentTarget.style.borderColor=T.navy;}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=T.border;}}>
            <div style={{width:48,height:48,borderRadius:14,background:lineColor(c.line),display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:18,fontWeight:700,fontFamily:"'Playfair Display',serif",flexShrink:0}}>
              {c.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:16,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>{c.name}</div>
              <div style={{fontSize:12,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>
                {c.line} {c.age?`· Age ${c.age}`:""}
              </div>
              <div style={{fontSize:11,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>Last contact: {c.lastContact}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <span style={{fontSize:11,background:`${statusColor(c.status)}18`,color:statusColor(c.status),padding:"4px 10px",borderRadius:20,fontFamily:"'Lato',sans-serif",fontWeight:700,border:`1px solid ${statusColor(c.status)}44`}}>{c.status}</span>
            </div>
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
              {icon:"📞",label:"Phone",value:selected.phone},
              {icon:"✉️",label:"Email",value:selected.email},
              {icon:"📋",label:"Line",value:selected.line},
              {icon:"🎂",label:"Age",value:selected.age||"N/A"},
            ].map(({icon,label,value})=>(
              <div key={label} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${T.border}`}}>
                <span style={{fontSize:18}}>{icon}</span>
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

            {/* Quote this client button */}
            <button onClick={()=>{ onQuoteClient&&onQuoteClient(selected); setSelected(null); }} 
              style={{width:"100%",marginTop:14,padding:"13px",background:T.navy,color:"#fff",border:"none",borderRadius:12,fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              📊 Build Quote for {selected.name} →
            </button>

            {/* Add note */}
            <div style={{marginTop:10,display:"flex",gap:8}}>
              <input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add a note..." onKeyDown={e=>e.key==="Enter"&&addNote()}
                style={{flex:1,padding:"10px 14px",border:`1px solid ${T.border}`,borderRadius:10,fontSize:13,fontFamily:"'Lato',sans-serif",color:T.text,outline:"none",background:T.bg}}/>
              <button onClick={addNote} style={{padding:"10px 16px",background:T.navy,color:"#fff",border:"none",borderRadius:10,fontFamily:"'Lato',sans-serif",fontWeight:700,cursor:"pointer",fontSize:13}}>Save</button>
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
        {["All",...LINK_TYPES.map(l=>l.label)].map(t=>(
          <button key={t} onClick={()=>setFilterType(t)}
            style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${filterType===t?T.navy:T.border}`,background:filterType===t?T.navy:T.surface,color:filterType===t?"#fff":T.sub,cursor:"pointer",fontSize:12,fontFamily:"'Lato',sans-serif",fontWeight:600,whiteSpace:"nowrap",transition:"all 0.15s"}}>
            {t}
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
    commissions.forEach(c=>rows.push([c.date,c.carrier,c.client,c.line,c.type,"$"+c.amount,c.notes||""]));
    const csv = rows.map(r=>r.map(v=>'"'+v+'"').join(",")).join("\n");
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
const AI_WORKFORCE = [
  {
    id: "agent-success-coach",
    name: "Jordan",
    avatar: "🧭",
    position: "Agent Success Coach",
    department: "Executive Leadership",
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

  // ── Coming soon — specced, not built. Order here is the current best guess
  // at priority; actual build order is driven by agent demand post-validation.
  { id:"sales-coach",        name:"", avatar:"🎯", position:"Sales Coach",                department:"Sales",              status:"coming_soon", specialty:"Objection handling & activity accountability" },
  { id:"medicare-specialist",name:"", avatar:"🩺", position:"Medicare Specialist",         department:"Sales",              status:"coming_soon", specialty:"Medicare plan comparison & T65 guidance" },
  { id:"life-specialist",    name:"", avatar:"🛡️", position:"Life Insurance Specialist",   department:"Sales",              status:"coming_soon", specialty:"Life & annuity product guidance" },
  { id:"aca-specialist",     name:"", avatar:"📋", position:"ACA Specialist",              department:"Sales",              status:"coming_soon", specialty:"Marketplace enrollment & subsidies" },
  { id:"employer-benefits",  name:"", avatar:"🏢", position:"Employer Benefits Consultant",department:"Sales",              status:"coming_soon", specialty:"Group benefits & open enrollment" },
  { id:"marketing-director", name:"", avatar:"📣", position:"Marketing Director",         department:"Marketing",          status:"coming_soon", specialty:"Campaign strategy" },
  { id:"content-director",   name:"", avatar:"✍️", position:"Content Director",           department:"Marketing",          status:"coming_soon", specialty:"Content planning & repurposing" },
  { id:"social-media",       name:"", avatar:"📱", position:"Social Media Manager",       department:"Marketing",          status:"coming_soon", specialty:"Post drafting & scheduling guidance" },
  { id:"client-success",     name:"", avatar:"🤝", position:"Client Success Manager",     department:"Client Success",     status:"coming_soon", specialty:"Client check-ins & satisfaction" },
  { id:"retention",          name:"", avatar:"🔄", position:"Retention Specialist",       department:"Client Success",     status:"coming_soon", specialty:"Renewal & retention strategy" },
  { id:"referral-manager",   name:"", avatar:"🌱", position:"Referral Manager",           department:"Client Success",     status:"coming_soon", specialty:"Referral campaign coaching" },
  { id:"compliance",         name:"", avatar:"⚖️", position:"Compliance Officer",         department:"Operations",         status:"coming_soon", specialty:"Compliance awareness & reminders" },
  { id:"crm-manager",        name:"", avatar:"🗂️", position:"CRM Manager",                department:"Operations",         status:"coming_soon", specialty:"Data cleanup & organization" },
  { id:"workflow-manager",   name:"", avatar:"⚙️", position:"Workflow Manager",           department:"Operations",         status:"coming_soon", specialty:"Process & SOP guidance" },
  { id:"ceo-advisor",        name:"", avatar:"♟️", position:"CEO Strategic Advisor",      department:"Executive Leadership",status:"coming_soon", specialty:"Business strategy" },
  { id:"executive-assistant",name:"", avatar:"🗒️", position:"Executive Assistant",        department:"Executive Leadership",status:"coming_soon", specialty:"Admin & scheduling support" },
  { id:"coo",                name:"", avatar:"📐", position:"Chief Operating Officer",    department:"Executive Leadership",status:"coming_soon", specialty:"Operations strategy" },
  { id:"product-manager",    name:"", avatar:"🧩", position:"ACC Product Manager",        department:"Product",            status:"coming_soon", specialty:"Feature feedback & roadmap" },
];

// ── AI Employee Chat Engine ─────────────────────────────────────
// One chat component, reused by every AI employee. Adding a new employee
// never requires touching this — it just reads systemPrompt + name + avatar
// from whichever AI_WORKFORCE entry was opened.
function AIEmployeeChat({ employee, profile, onClose, bg }) {
  const storageKey = `acc_chat_${employee.id}`;
  const [messages, setMessages] = useLocalStorage(storageKey, []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = React.useRef(null);

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
    const prospects = clients.filter(c=>c.status==="Prospect");
    const renewalDue = clients.filter(c=>c.status==="Renewal Due");

    return `Agent: ${profile.firstName||"Agent"} ${profile.lastName||""} (${profile.agencyName||"Independent Agent"}), licensed in ${profile.states||"unspecified states"}.

Current CRM snapshot:
- ${clients.length} total clients (${prospects.length} prospects, ${renewalDue.length} renewal due)
- ${openQuotes.length} open quotes awaiting follow-up
- ${expiringLicenses.length} license(s) expiring within 90 days${expiringLicenses.length ? ": " + expiringLicenses.map(l=>`${l.state} (${l.expDate})`).join(", ") : ""}
- Client names on file: ${clients.slice(0,15).map(c=>c.name).join(", ")}${clients.length>15?` and ${clients.length-15} more`:""}

Use this real data naturally when relevant — reference specific clients or numbers instead of speaking generically, but don't recite the whole snapshot back unless asked.`;
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
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
          <div style={{width:42, height:42, borderRadius:12, background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0}}>{employee.avatar}</div>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontSize:15, fontWeight:700, color:"#fff", fontFamily:"'Playfair Display',serif"}}>{employee.name}</div>
            <div style={{fontSize:11, color:"rgba(255,255,255,0.6)", fontFamily:"'Lato',sans-serif"}}>{employee.position}</div>
          </div>
          <button onClick={onClose} style={{background:"none", border:"none", color:"rgba(255,255,255,0.7)", fontSize:22, cursor:"pointer", padding:4, lineHeight:1}}>×</button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{flex:1, overflowY:"auto", padding:16, display:"flex", flexDirection:"column", gap:12, background:T.bg}}>
          {messages.length === 0 && (
            <div style={{textAlign:"center", padding:"32px 16px", color:T.muted, fontFamily:"'Lato',sans-serif", fontSize:13}}>
              <div style={{fontSize:32, marginBottom:10}}>{employee.avatar}</div>
              <div style={{fontWeight:700, color:T.navy, marginBottom:4, fontSize:14}}>{employee.name} here.</div>
              <div>{employee.mission}</div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} style={{display:"flex", justifyContent: m.role==="user" ? "flex-end" : "flex-start"}}>
              <div style={{
                maxWidth:"82%", padding:"10px 14px", borderRadius:16,
                background: m.role==="user" ? T.navy : T.card,
                color: m.role==="user" ? "#fff" : T.text,
                fontSize:13.5, fontFamily:"'Lato',sans-serif", lineHeight:1.5, whiteSpace:"pre-wrap",
                border: m.role==="user" ? "none" : `1px solid ${T.border}`,
              }}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div style={{display:"flex", justifyContent:"flex-start"}}>
              <div style={{padding:"10px 14px", borderRadius:16, background:T.card, border:`1px solid ${T.border}`, fontSize:13, color:T.muted, fontFamily:"'Lato',sans-serif"}}>
                {employee.name} is thinking...
              </div>
            </div>
          )}
        </div>

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
    </div>
  );
}

// ── My AI Team — dashboard of all AI employees ──────────────────
// Cards are generated entirely from AI_WORKFORCE. Adding a new active
// employee to that array gives them a working card here automatically.
function AITeam({ profile, bg }) {
  const [openChat, setOpenChat] = useState(null); // the employee object currently in chat, or null

  const departments = [...new Set(AI_WORKFORCE.map(e => e.department))];

  return (
    <div>
      <div style={{marginBottom:20}}>
        <h2 style={{fontSize:26, fontWeight:700, color:T.navy, fontFamily:"'Playfair Display',serif"}}>My AI Team</h2>
        <p style={{fontSize:13, color:T.muted, fontFamily:"'Lato',sans-serif", marginTop:2}}>
          {AI_WORKFORCE.filter(e=>e.status==="active").length} on staff · {AI_WORKFORCE.filter(e=>e.status==="coming_soon").length} coming soon
        </p>
      </div>

      {departments.map(dept => (
        <div key={dept} style={{marginBottom:28}}>
          <div style={{fontSize:11, color:T.muted, fontFamily:"'Lato',sans-serif", textTransform:"uppercase", letterSpacing:1.5, marginBottom:10, fontWeight:700}}>{dept}</div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14}}>
            {AI_WORKFORCE.filter(e => e.department === dept).map(emp => (
              <div key={emp.id} style={{
                background:T.surface, border:`1px solid ${T.border}`, borderRadius:18, padding:18,
                opacity: emp.status === "coming_soon" ? 0.55 : 1,
                position:"relative", transition:"all 0.15s",
              }}>
                {emp.status === "coming_soon" && (
                  <div style={{position:"absolute", top:12, right:12, fontSize:9, fontWeight:700, color:T.muted, background:T.bg, padding:"3px 8px", borderRadius:10, letterSpacing:0.5, textTransform:"uppercase"}}>Coming Soon</div>
                )}
                <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:10}}>
                  <div style={{width:48, height:48, borderRadius:14, background: emp.status==="active" ? T.navy : T.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0}}>
                    {emp.avatar}
                  </div>
                  <div style={{minWidth:0}}>
                    <div style={{fontSize:15, fontWeight:700, color:T.navy, fontFamily:"'Playfair Display',serif", lineHeight:1.2}}>
                      {emp.status==="active" ? emp.name : emp.position}
                    </div>
                    {emp.status==="active" && <div style={{fontSize:11, color:T.muted, fontFamily:"'Lato',sans-serif"}}>{emp.position}</div>}
                  </div>
                </div>
                <div style={{fontSize:12, color:T.sub, fontFamily:"'Lato',sans-serif", lineHeight:1.5, marginBottom:14, minHeight:32}}>{emp.specialty}</div>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <span style={{display:"flex", alignItems:"center", gap:5, fontSize:11, fontFamily:"'Lato',sans-serif", color: emp.status==="active" ? T.green : T.muted, fontWeight:700}}>
                    <span style={{width:7, height:7, borderRadius:"50%", background: emp.status==="active" ? T.green : T.muted, display:"inline-block"}}/>
                    {emp.status==="active" ? "Available" : "Not yet available"}
                  </span>
                  {emp.status==="active" && (
                    <button onClick={()=>setOpenChat(emp)} style={{background:T.navy, color:"#fff", border:"none", borderRadius:10, padding:"7px 14px", fontFamily:"'Lato',sans-serif", fontWeight:700, fontSize:12, cursor:"pointer"}}>
                      Open Chat
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {openChat && <AIEmployeeChat employee={openChat} profile={profile} bg={bg} onClose={()=>setOpenChat(null)}/>}
    </div>
  );
}

const TABS = [
  {id:"dashboard",   label:"Dashboard",  icon:"⚡"},
  {id:"ai-team",     label:"AI Team",    icon:"🧠"},
  {id:"carriers",    label:"Carriers",   icon:"🏢"},
  {id:"links",       label:"My Links",   icon:"🔗"},
  {id:"quotes",      label:"Quotes",     icon:"📊"},
  {id:"clients",     label:"Clients",    icon:"👥"},
  {id:"commissions", label:"Commissions",icon:"💰"},
  {id:"licenses",    label:"Licenses",   icon:"🪪"},
  {id:"profile",     label:"Profile",    icon:"👤"},
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

  const handleQuoteClient = (client) => {
    setQuoteClient(client);
    setTab("quotes");
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
            <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"16px 12px", background:"none", border:"none", borderBottom:tab===t.id?`3px solid ${T.blue}`:"3px solid transparent", color:tab===t.id?T.blueLight:"rgba(255,255,255,0.55)", cursor:"pointer", fontSize:12, fontFamily:"'Lato',sans-serif", fontWeight:700, whiteSpace:"nowrap", letterSpacing:0.3, transition:"all 0.15s"}}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{maxWidth:1100, margin:"0 auto", padding:"24px 20px"}}>
        {tab==="dashboard"   && <Dashboard setTab={setTab} profile={profile} bg={bg}/>}
        {tab==="ai-team"     && <AITeam profile={profile} bg={bg}/>}
        {tab==="carriers"    && <CarrierHub bg={bg}/>}
        {tab==="links"       && <CarrierLinks bg={bg}/>}
        {tab==="quotes"      && <QuoteBuilder profile={profile} bg={bg} initialClient={quoteClient}/>}
        {tab==="clients"     && <ClientProfiles bg={bg} onQuoteClient={handleQuoteClient} setTab={setTab}/>}
        {tab==="commissions" && <CommissionLog bg={bg} profile={profile}/>}
        {tab==="licenses"    && <LicenseTracker bg={bg}/>}
        {tab==="profile"     && <AgentProfile profile={profile} setProfile={setProfile} bg={bg}/>}
      </div>
    </div>
  );
}
