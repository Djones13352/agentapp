import React, { useState } from "react";

// ── Theme base (navy/gold always fixed) ───────────────────────
const T_BASE = {
  navy:     "#1a2744",
  navyMid:  "#243660",
  gold:     "#c9a84c",
  goldLight:"#f0d98a",
  green:    "#2d7a4f",
  red:      "#c0392b",
  amber:    "#d4850a",
  white:    "#ffffff",
};

// T defaults - gets overridden by applyBgTheme at render time
var T = {
  ...T_BASE,
  bg:      "#f7f5f0",
  surface: "#ffffff",
  card:    "#fafaf8",
  border:  "#e8e4dc",
  text:    "#1a1a2e",
  sub:     "#5a5a7a",
  muted:   "#9a9ab0",
};

function applyBgTheme(bg) {
  T = { ...T_BASE, ...bg };
}

// Background color swatches — each controls the full app palette including nav
const BG_THEMES = [
  { name:"Classic Cream",  nav:"#1a2744", navText:"#ffffff", hero:"#1a2744", bg:"#f7f5f0", surface:"#ffffff", card:"#fafaf8", border:"#e8e4dc", text:"#1a1a2e", sub:"#5a5a7a",  muted:"#9a9ab0" },
  { name:"Pure White",     nav:"#1a2744", navText:"#ffffff", hero:"#1a2744", bg:"#ffffff", surface:"#f8f8f8", card:"#f2f2f2", border:"#e0e0e0", text:"#1a1a2e", sub:"#5a5a7a",  muted:"#9a9ab0" },
  { name:"Soft Gray",      nav:"#1a2744", navText:"#ffffff", hero:"#1a2744", bg:"#f0f0f0", surface:"#fafafa", card:"#f4f4f4", border:"#dcdcdc", text:"#1a1a2e", sub:"#5a5a7a",  muted:"#9a9ab0" },
  { name:"Dark Mode",      nav:"#0a0a0f", navText:"#ffffff", hero:"#111118", bg:"#0e0e14", surface:"#16161f", card:"#1c1c28", border:"#2a2a40", text:"#eeeef5", sub:"#9090b0",  muted:"#505068" },
  { name:"Deep Navy",      nav:"#081528", navText:"#ffffff", hero:"#0d1b2a", bg:"#0d1b2a", surface:"#162032", card:"#1c2a3e", border:"#243650", text:"#e8edf5", sub:"#8090a8",  muted:"#4a5a70" },
  { name:"Warm Sand",      nav:"#2a1f0e", navText:"#ffffff", hero:"#2a1f0e", bg:"#fdf6ec", surface:"#fffdf8", card:"#fef9f0", border:"#ecdfc8", text:"#2a1f0e", sub:"#6a5a40",  muted:"#a08060" },
  { name:"Forest",         nav:"#1a3325", navText:"#ffffff", hero:"#1a3325", bg:"#f0f5f1", surface:"#ffffff", card:"#f4faf5", border:"#d0e8d5", text:"#0e2018", sub:"#3a6045",  muted:"#7a9a80" },
  { name:"Royal Purple",   nav:"#1e0a3c", navText:"#ffffff", hero:"#1e0a3c", bg:"#f5f0ff", surface:"#ffffff", card:"#f8f4ff", border:"#ddd0f0", text:"#1e0a3c", sub:"#5a3a7a",  muted:"#9a80b0" },
];

// ── All insurance lines including P&C ────────────────────────
const LINE_GROUPS = {
  "Life & Health": ["Health & ACA","Medicare","Life & Annuities","Preneed / Burial","Supplemental","Dental & Vision","Disability","Long-Term Care","Critical Illness","Hospital Indemnity"],
  "Property & Casualty": ["Auto","Homeowners","Renters","Commercial Auto","General Liability","Commercial Property","Workers Comp","Umbrella / Excess","Flood","Cyber Liability","Professional Liability (E&O)","Bonds & Surety"],
  "Specialty": ["Pet Insurance","Travel Insurance","Farm & Ranch","Marine","Title Insurance"],
};
const LINES = Object.values(LINE_GROUPS).flat();
const PC_LINES = LINE_GROUPS["Property & Casualty"];
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
  return map[l]||"#1a2744";
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
  const [carriers, setCarriers] = useState(SAMPLE_CARRIERS);
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
    {l:"Product Type",       p:"Term / WL / IUL / UL / Annuity"},
    {l:"Death Benefit",      p:"e.g. $500,000"},
    {l:"Term Length",        p:"e.g. 20 years (Term only)"},
    {l:"Monthly Premium",    p:"e.g. $85/mo"},
    {l:"Cash Value",         p:"Yes / No"},
    {l:"Index Strategy",     p:"e.g. S&P 500 PTP"},
    {l:"Cap Rate",           p:"e.g. 11% (IUL)"},
    {l:"Floor Rate",         p:"e.g. 0% (IUL)"},
    {l:"Participation Rate", p:"e.g. 100%"},
    {l:"Surrender Period",   p:"e.g. 10 years"},
    {l:"Surrender Charge Yr1",p:"e.g. 10%"},
    {l:"Free Withdrawal",    p:"e.g. 10%/yr after yr 1"},
    {l:"Annuitization Period",p:"e.g. 7 years"},
    {l:"Income Rider",       p:"Yes / No — rate detail"},
    {l:"Guaranteed Income",  p:"e.g. $2,200/mo at 70"},
    {l:"Waiver of Premium",  p:"Yes / No"},
    {l:"Accidental Death",   p:"Yes / No"},
    {l:"Living Benefits",    p:"Yes / No — chronic/critical/terminal"},
    {l:"Guaranteed Issue",   p:"Yes / No"},
    {l:"Simplified Issue",   p:"Yes / No"},
    {l:"Conversion Option",  p:"Yes / No"},
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
function QuoteBuilder() {
  const blankQuote = () => ({id:Date.now(),carrier:"",line:"Medicare",plan:"",premium:"",notes:"",customFields:[{l:"OTC Allowance",v:"$500/qtr"},{l:"Dental Included",v:"Yes"},{l:"MOOP",v:"$3,300"}],color:T.navy});

  const [quotes, setQuotes] = useState([
    {id:1,carrier:"Humana",line:"Medicare",plan:"Gold Plus HMO H1036",premium:0,notes:"$0 premium. Strong dental & vision. SilverSneakers included.",color:"#006D9C",
     customFields:[{l:"Plan Type",v:"HMO"},{l:"OTC Allowance",v:"$500/qtr"},{l:"MOOP",v:"$3,300"},{l:"Drug Deductible",v:"$0"},{l:"Dental Included",v:"Yes"},{l:"Vision Included",v:"Yes"},{l:"Gym Benefit",v:"SilverSneakers"},{l:"Transportation",v:"Yes"}]},
    {id:2,carrier:"Aetna",line:"Medicare",plan:"Medicare Advantage Value HMO",premium:29,notes:"Low premium. Good drug formulary. No OTC.",color:"#7B2D8B",
     customFields:[{l:"Plan Type",v:"HMO"},{l:"OTC Allowance",v:"None"},{l:"MOOP",v:"$4,900"},{l:"Drug Deductible",v:"$0"},{l:"Dental Included",v:"Limited"},{l:"Vision Included",v:"Yes"},{l:"Gym Benefit",v:"No"},{l:"Transportation",v:"No"}]},
    {id:3,carrier:"UnitedHealthcare",line:"Medicare",plan:"AARP MedicareComplete HMO",premium:0,notes:"$0 premium. Strong OTC. Renew Active gym benefit.",color:"#CC0000",
     customFields:[{l:"Plan Type",v:"HMO"},{l:"OTC Allowance",v:"$300/qtr"},{l:"MOOP",v:"$3,900"},{l:"Drug Deductible",v:"$0"},{l:"Dental Included",v:"Yes"},{l:"Vision Included",v:"Yes"},{l:"Gym Benefit",v:"Renew Active"},{l:"Transportation",v:"Yes"}]},
  ]);

  const [clientName, setClientName] = useState("James Stovall");
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
        <button onClick={()=>{setNewQ(blankQuote());setEditing(null);setShowAdd(true);}} style={{background:T.gold,color:T.navy,border:"none",borderRadius:12,padding:"10px 18px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Add Quote</button>
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
function ClientProfiles() {
  const [clients, setClients] = useState(SAMPLE_CLIENTS);
  const [selected, setSelected] = useState(null);
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

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif"}}>Client Profiles</h2>
          <p style={{fontSize:13,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>{clients.length} clients · notes, quotes & follow-ups</p>
        </div>
        <button onClick={()=>setShowAdd(true)} style={{background:T.navy,color:"#fff",border:"none",borderRadius:12,padding:"10px 18px",fontFamily:"'Lato',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Add Client</button>
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

            {/* Add note */}
            <div style={{marginTop:14,display:"flex",gap:8}}>
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

// ── Dashboard ─────────────────────────────────────────────────
function Dashboard({ setTab, profile, bg = {} }) {
  const stats = [
    {label:"Total Carriers",value:SAMPLE_CARRIERS.length,icon:"🏢",tab:"carriers"},
    {label:"Active Clients",value:SAMPLE_CLIENTS.filter(c=>c.status==="Active").length,icon:"👥",tab:"clients"},
    {label:"Prospects",value:SAMPLE_CLIENTS.filter(c=>c.status==="Prospect").length,icon:"🎯",tab:"clients"},
    {label:"Lines Covered",value:LINES.length,icon:"📋",tab:"carriers"},
    {label:"P&C Carriers",value:SAMPLE_CARRIERS.filter(c=>isPCLine(c.line)).length,icon:"🏠",tab:"carriers"},
  ];

  const upcoming = [
    {name:"James Stovall",action:"T65 Review — Plan G",date:"Aug 2025",line:"Medicare",urgent:true},
    {name:"Derek & Tina Williams",action:"Home + Auto Bundle Quote",date:"Jun 2025",line:"Homeowners",urgent:true},
    {name:"Ripley School District",action:"Open Enrollment Follow-up",date:"Sep 2025",line:"Supplemental",urgent:false},
    {name:"Precision Auto Repair",action:"GL + Workers Comp Quote",date:"Jul 2025",line:"General Liability",urgent:false},
    {name:"Maria Gonzalez",action:"ACA Renewal",date:"Nov 2025",line:"Health & ACA",urgent:false},
    {name:"Henderson Family",action:"Preneed Planning Review",date:"Jul 2025",line:"Preneed / Burial",urgent:false},
  ];

  return (
    <div style={{animation:"fadeUp 0.3s ease"}}>
      {/* Welcome */}
      <div style={{background:profile.heroColor||T.navy,borderRadius:20,padding:"24px 28px",marginBottom:22,position:"relative",overflow:"hidden",transition:"background 0.4s"}}>
        <div style={{position:"absolute",top:-20,right:-20,width:120,height:120,borderRadius:"50%",background:`rgba(201,168,76,0.15)`}}/>
        <div style={{position:"absolute",bottom:-30,right:40,width:80,height:80,borderRadius:"50%",background:`rgba(201,168,76,0.08)`}}/>
        {(()=>{
          const tc = profile.heroTextColor==="dark";
          return (<>
            <div style={{fontSize:12,color:tc?"rgba(0,0,0,0.5)":"rgba(255,255,255,0.5)",fontFamily:"'Lato',sans-serif",textTransform:"uppercase",letterSpacing:2,marginBottom:6}}>Welcome back</div>
            <div style={{fontSize:28,fontWeight:700,color:tc?"#1a1a2e":"#fff",fontFamily:"'Playfair Display',serif",lineHeight:1.2}}>{profile.firstName||"Agent"} {profile.lastName}</div>
            <div style={{fontSize:13,color:tc?"#3a3a3a":T.goldLight,fontFamily:"'Lato',sans-serif",marginTop:6}}>{profile.agencyName||"Agent Command Center"} {profile.states?`· ${profile.states}`:""}</div>
            {profile.tagline&&<div style={{fontSize:12,color:tc?"rgba(0,0,0,0.35)":"rgba(255,255,255,0.4)",fontFamily:"'Lato',sans-serif",marginTop:4,fontStyle:"italic"}}>"{profile.tagline}"</div>}
          </>);
        })()}
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginBottom:22,gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))"}}>
        {stats.map(({label,value,icon,tab})=>(
          <div key={label} onClick={()=>setTab(tab)} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:16,padding:16,cursor:"pointer",transition:"all 0.15s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.navy;e.currentTarget.style.boxShadow="0 4px 16px rgba(26,39,68,0.1)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.boxShadow="none";}}>
            <div style={{fontSize:28,marginBottom:6}}>{icon}</div>
            <div style={{fontSize:28,fontWeight:700,color:T.navy,fontFamily:"'Courier Prime',monospace"}}>{value}</div>
            <div style={{fontSize:12,color:T.muted,fontFamily:"'Lato',sans-serif",marginTop:2}}>{label}</div>
          </div>
        ))}
      </div>

      {/* Upcoming actions */}
      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:18,padding:20}}>
        <div style={{fontSize:16,fontWeight:700,color:T.navy,fontFamily:"'Playfair Display',serif",marginBottom:14}}>Upcoming Actions</div>
        {upcoming.map((u,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<upcoming.length-1?`1px solid ${T.border}`:"none"}}>
            <div style={{width:36,height:36,borderRadius:10,background:lineColor(u.line),display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:11,fontWeight:700,fontFamily:"'Lato',sans-serif",flexShrink:0}}>
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
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
              {BG_THEMES.map(b=>{
                const active = draft.bgTheme===b.name;
                return (
                  <button key={b.name} onClick={()=>setDraft({...draft,bgTheme:b.name})}
                    style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:20,border:`2px solid ${active?T.gold:T.border}`,background:b.surface,cursor:"pointer",transition:"all 0.15s"}}>
                    <div style={{width:14,height:14,borderRadius:"50%",background:b.bg,border:`1px solid ${T.border}`}}/>
                    <span style={{fontSize:11,fontWeight:700,color:b.text,fontFamily:"'Lato',sans-serif"}}>{b.name}</span>
                    {active&&<span style={{fontSize:10,color:T.gold}}>✓</span>}
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
const TABS = [
  {id:"dashboard", label:"Dashboard", icon:"⚡"},
  {id:"carriers",  label:"Carriers",  icon:"🏢"},
  {id:"quotes",    label:"Quotes",    icon:"📊"},
  {id:"clients",   label:"Clients",   icon:"👥"},
  {id:"profile",   label:"Profile",   icon:"👤"},
];

const DEFAULT_PROFILE = {
  firstName:"Deidre", lastName:"Jones", title:"Independent Insurance Agent",
  agencyName:"The Coverage Firm", phone:"", email:"", licenseNum:"",
  npn:"", website:"", states:"TN, AL, MS", address:"Covington, TN",
  tagline:"Full-service insurance broker across all lines.",
  logoUrl:"", linesOfBusiness:["Health & ACA","Medicare","Life & Annuities","Supplemental","Disability"],
  bgTheme:"Classic Cream",
  // Color overrides
  navColor:"#1a2744",
  heroColor:"#1a2744",
  navTextColor:"white",   // "white" or "dark"
  heroTextColor:"white",  // "white" or "dark"
};

export default function App() {
  const [tab,     setTab]     = useState("dashboard");
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

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
            <span style={{fontSize:12, fontWeight:700, color:profile.navTextColor==="dark"?"#1a1a2e":T.goldLight, fontFamily:"'Playfair Display',serif", lineHeight:1}}>{profile.agencyName||"ACC"}</span>
            <span style={{fontSize:10, color:profile.navTextColor==="dark"?"rgba(0,0,0,0.5)":"rgba(255,255,255,0.4)", fontFamily:"'Lato',sans-serif"}}>{profile.firstName} {profile.lastName}</span>
          </div>
        </div>
        <div style={{display:"flex", gap:0, overflowX:"auto", flex:1}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"16px 12px", background:"none", border:"none", borderBottom:tab===t.id?`3px solid ${profile.navTextColor==="dark"?"#1a1a2e":T.gold}`:"3px solid transparent", color:tab===t.id?(profile.navTextColor==="dark"?"#1a1a2e":T.goldLight):(profile.navTextColor==="dark"?"rgba(0,0,0,0.45)":"rgba(255,255,255,0.5)"), cursor:"pointer", fontSize:12, fontFamily:"'Lato',sans-serif", fontWeight:700, whiteSpace:"nowrap", letterSpacing:0.3, transition:"all 0.15s"}}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{maxWidth:1100, margin:"0 auto", padding:"24px 20px"}}>
        {tab==="dashboard" && <Dashboard setTab={setTab} profile={profile} bg={bg}/>}
        {tab==="carriers"  && <CarrierHub bg={bg}/>}
        {tab==="quotes"    && <QuoteBuilder profile={profile} bg={bg}/>}
        {tab==="clients"   && <ClientProfiles bg={bg}/>}
        {tab==="profile"   && <AgentProfile profile={profile} setProfile={setProfile} bg={bg}/>}
      </div>
    </div>
  );
}
