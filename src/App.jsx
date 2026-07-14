const T = {
  bg: "#F7F3EC",
  surface: "#FFFFFF",
  surface2: "#F0EAE0",
  ink: "#20242B",
  inkSoft: "#565B66",
  muted: "#9A9488",
  border: "#E4DFD3",
  accent: "#2B6E63",
  accentSoft: "#DCEDE9",
  accent2: "#B5563C",
  good: "#2F7D4F",
  goodSoft: "#E3F0E7",
  warn: "#B98A2E",
  warnSoft: "rgba(185,138,46,0.15)",
};

const FONT_HEAD = "'Lora', serif";
const FONT_BODY = "'Libre Franklin', sans-serif";

const LINES = [
  "Health & ACA", "Medicare", "Life & Annuities", "Supplemental", "Disability",
  "Auto", "Homeowners", "Renters", "Commercial Auto", "General Liability",
  "Commercial Property", "Workers Comp", "Umbrella / Excess", "Flood",
  "Professional Liability (E&O)",
];

const LINE_COLORS = {
  "Health & ACA": "#7B2D8B", "Medicare": "#0B3C6B", "Life & Annuities": "#00558C",
  "Supplemental": "#C8102E", "Disability": "#C8630A", "Auto": "#1565C0",
  "Homeowners": "#BF360C", "Renters": "#E65100", "Commercial Auto": "#0D47A1",
  "General Liability": "#1B5E20", "Commercial Property": "#33691E",
  "Workers Comp": "#F57F17", "Umbrella / Excess": "#4A148C", "Flood": "#006064",
  "Professional Liability (E&O)": "#880E4F",
};
const lineColor = (l) => LINE_COLORS[l] || T.accent;

const STATUS_COLORS = { Active: T.good, Prospect: T.warn };

const QUOTE_STATUSES = [
  { id: "open", label: "Open", color: "#3E6FA6" },
  { id: "pending", label: "Pending", color: T.warn },
  { id: "closed_won", label: "Closed Won", color: T.good },
  { id: "closed_lost", label: "Closed Lost", color: T.accent2 },
];

const EVENT_TYPES = [
  { id: "appointment", label: "Appointment", color: "#3E6FA6" },
  { id: "followup", label: "Follow-Up", color: T.warn },
  { id: "policy_review", label: "Policy Review", color: "#7B2D8B" },
  { id: "renewal", label: "Renewal Reminder", color: T.accent2 },
  { id: "birthday", label: "Client Birthday", color: "#C9A227" },
  { id: "task", label: "Task Deadline", color: T.good },
];

const SOA_PRODUCTS = [
  "Medicare Advantage Plans (Part C)",
  "Medicare Advantage Prescription Drug Plans (MAPD)",
  "Prescription Drug Plans (Part D)",
  "Medicare Supplement (Medigap) Plans",
  "Medicare Savings Programs / Extra Help",
  "Dental, Vision, and Hearing Plans",
  "Hospital Indemnity Plans",
];

const ACA_CONSENT_ITEMS = [
  "Consent to be contacted about health coverage options (phone, email, or text)",
  "Authorization for this agent/broker to assist with my Marketplace application",
  "Authorization to access my eligibility and enrollment information on my behalf",
  "Understanding that my information will be used only to help me apply for and enroll in coverage",
];

const AI_TEAM = [
  {
    id: "jordan", name: "Jordan", position: "Agent Success Coach", department: "Executive Office",
    specialty: "Daily priorities, sales coaching & productivity",
    systemPrompt: "You are Jordan, the Agent Success Coach inside Agent Command Center. Help the agent prioritize their day, coach them on sales activity and follow-ups, and reference their real CRM data (clients, quotes, commissions, licenses) when given it in context. Be direct, warm, and encouraging. Never invent specific carrier plan details, rates, or regulations.",
  },
  {
    id: "quinn", name: "Quinn", position: "Discovery & Quote Specialist", department: "Sales",
    specialty: "Client discovery, intake, and quote readiness",
    systemPrompt: "You are Quinn, the Discovery & Quote Specialist. Guide the agent through client discovery — asking the right questions for the client's line(s) of insurance, flagging what's missing before a quote can be built. Efficient, structured, brisk but warm. Never give product recommendations or coverage advice — that's the licensed agent's job.",
  },
  {
    id: "ceo-ai", name: "CEO AI", position: "Strategy Assistant", department: "Executive Office",
    specialty: "High-level business strategy and prioritization",
    systemPrompt: "You are CEO AI, a strategic thinking partner for an independent insurance agency owner. Help them think through growth decisions, prioritization, and business strategy. Be concise and business-minded.",
  },
  {
    id: "sales-coach", name: "Sales Coach AI", position: "Sales Coach", department: "Sales",
    specialty: "Objection handling & activity accountability",
    systemPrompt: "You are Sales Coach AI. Help the agent practice objection handling, stay accountable to daily sales activity, and improve their close rate. Be direct and encouraging, like a sales manager who wants them to win.",
  },
  {
    id: "medicare-expert", name: "Medicare Expert AI", position: "Medicare Specialist", department: "Insurance",
    specialty: "Medicare plan types, T65 timelines & enrollment periods",
    systemPrompt: "You are Medicare Expert AI. Help agents understand Medicare plan types (MA, MAPD, PDP, Medigap), T65 timelines, and enrollment periods in general terms. IMPORTANT: you do not have a live connection to CMS data — you must never state specific current-year plan premiums, specific carrier rates, or specific regulatory numbers as fact. When asked for something that requires live CMS data, say so plainly and suggest the agent verify on Medicare.gov or the carrier's current plan documents.",
  },
];

// ── Storage helpers ──
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function saveJSON(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
function loadAccounts() { return loadJSON("acc_accounts", []); }
function loadSession() { return loadJSON("acc_session", null); }
function loadCollection(email, key, fallbackFn) {
  if (!email) return fallbackFn();
  const stored = loadJSON(`acc_data_${email}_${key}`, null);
  return stored !== null ? stored : fallbackFn();
}
function saveCollection(email, key, val) {
  if (email) saveJSON(`acc_data_${email}_${key}`, val);
}
function loadOnboarding(email) {
  return email ? loadJSON(`acc_onboarding_${email}`, blankOnboarding()) : blankOnboarding();
}
function blankOnboarding() {
  return { profile: false, carrier: false, client: false, quote: false, chat: false, dismissed: false };
}

let _id = 1000;
function nextId() { return ++_id; }

// ── Seed data (only used for a brand-new account with no saved data —
//    real new signups start empty; this is just so you can see the app
//    populated during development) ──
function seedClients() {
  return [
    { id: nextId(), name: "James Stovall", line: "Medicare", status: "Active", phone: "901-555-0142", lastContact: "2026-05-12", notes: [{ date: "2026-05-12", text: "Turning 65 in August. Interested in Plan G." }] },
    { id: nextId(), name: "Maria Gonzalez", line: "Health & ACA", status: "Prospect", phone: "901-555-0277", lastContact: "2026-06-01", notes: [] },
  ];
}
function seedCarriers() {
  return [
    { id: nextId(), name: "Mutual of Omaha", line: "Medicare", phone: "1-800-775-7896", portal: "https://mutualofomaha.com/agent", override: "22%", notes: "Best Medigap rates for Plan G." },
    { id: nextId(), name: "Aetna", line: "Health & ACA", phone: "1-800-872-3862", portal: "https://producer.aetna.com", override: "8%", notes: "Strong network, good HMO options." },
  ];
}
function seedQuotes() { return []; }
function seedCommissions() { return []; }
function seedLicenses() { return []; }
function seedEvents() { return []; }

function initials(name) {
  return (name || "").split(" ").map((n) => n[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}

// ── Small shared UI bits ──
function Label({ children }) {
  return <div style={{ fontSize: 9.5, color: T.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{children}</div>;
}
function TextInput(props) {
  return (
    <input
      {...props}
      style={{
        width: "100%", padding: "10px 12px", border: `1px solid ${T.border}`, borderRadius: 10,
        fontSize: 13.5, color: T.ink, outline: "none", background: T.surface2, fontFamily: FONT_BODY, ...(props.style || {}),
      }}
    />
  );
}
function Select({ value, onChange, options, style }) {
  return (
    <select value={value} onChange={onChange} style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13.5, color: T.ink, outline: "none", background: T.surface2, fontFamily: FONT_BODY, ...(style || {}) }}>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
function Modal({ onClose, maxWidth = 440, children }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(32,36,43,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: T.surface, borderRadius: 22, padding: 26, width: "100%", maxWidth, maxHeight: "88vh", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}
function ModalButtons({ onCancel, onSave, saveLabel = "Save", saveColor = T.accent }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <button onClick={onCancel} style={{ flex: 1, padding: 12, background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 11, fontWeight: 700, cursor: "pointer", color: T.inkSoft }}>Cancel</button>
      <button onClick={onSave} style={{ flex: 2, padding: 12, background: saveColor, color: "#fff", border: "none", borderRadius: 11, fontWeight: 700, cursor: "pointer", fontSize: 13.5 }}>{saveLabel}</button>
    </div>
  );
}
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ══════════════════════════════════════════════════════════════
// AUTH GATE
// ══════════════════════════════════════════════════════════════
function AuthGate({ onLoggedIn }) {
  const [view, setView] = useState("login"); // "login" | "signup"
  const [draft, setDraft] = useState({ name: "", agencyName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [magicSent, setMagicSent] = useState(false);

  const set = (k) => (e) => setDraft({ ...draft, [k]: e.target.value });

  const doSignup = () => {
    if (!draft.name.trim() || !draft.email.trim() || !draft.password) { setError("Please fill in your name, email, and password."); return; }
    const email = draft.email.trim().toLowerCase();
    const accounts = loadAccounts();
    if (accounts.some((a) => a.email === email)) { setError("An account already exists for that email — log in instead."); return; }
    const account = { name: draft.name.trim(), agencyName: draft.agencyName.trim(), email, password: draft.password };
    saveJSON("acc_accounts", [...accounts, account]);
    onLoggedIn(account, true);
  };
  const doLogin = () => {
    const email = draft.email.trim().toLowerCase();
    const account = loadAccounts().find((a) => a.email === email);
    if (!account) { setError("No account found for that email — sign up first."); return; }
    if (account.password !== draft.password) { setError("Incorrect password."); return; }
    onLoggedIn(account, false);
  };
  const sendMagicLink = () => {
    const email = draft.email.trim().toLowerCase();
    if (!email) { setError("Enter your email first."); return; }
    const accounts = loadAccounts();
    let account = accounts.find((a) => a.email === email);
    const isNew = !account;
    if (!account) {
      account = { name: draft.name.trim() || email.split("@")[0], agencyName: draft.agencyName.trim(), email, password: "" };
      saveJSON("acc_accounts", [...accounts, account]);
    }
    setMagicSent(true);
    setError("");
    // NOTE: replace with a real Supabase magic-link email in production.
    setTimeout(() => onLoggedIn(account, isNew), 900);
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: FONT_BODY }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 19, fontWeight: 700, fontFamily: FONT_HEAD, margin: "0 auto 12px" }}>A</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD }}>Agent Command Center</div>
          <div style={{ fontSize: 12.5, color: T.muted, marginTop: 3 }}>Your independent agency, organized.</div>
        </div>

        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 18, padding: 24 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 18, background: T.surface2, borderRadius: 11, padding: 4 }}>
            <button onClick={() => { setView("login"); setError(""); }} style={{ flex: 1, padding: 10, border: "none", borderRadius: 8, background: view === "login" ? T.ink : "transparent", color: view === "login" ? "#fff" : T.inkSoft, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Log In</button>
            <button onClick={() => { setView("signup"); setError(""); }} style={{ flex: 1, padding: 10, border: "none", borderRadius: 8, background: view === "signup" ? T.accent : "transparent", color: view === "signup" ? "#fff" : T.inkSoft, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Sign Up</button>
          </div>

          {view === "signup" && (
            <>
              <div style={{ marginBottom: 12 }}><Label>Full Name</Label><TextInput value={draft.name} onChange={set("name")} placeholder="Deidra Jones" /></div>
              <div style={{ marginBottom: 12 }}><Label>Agency Name</Label><TextInput value={draft.agencyName} onChange={set("agencyName")} placeholder="The Coverage Firm" /></div>
            </>
          )}
          <div style={{ marginBottom: 12 }}><Label>Email</Label><TextInput type="email" value={draft.email} onChange={set("email")} placeholder="you@agency.com" /></div>
          <div style={{ marginBottom: 6 }}><Label>Password</Label><TextInput type="password" value={draft.password} onChange={set("password")} placeholder="••••••••" /></div>

          {error && <div style={{ marginTop: 10, fontSize: 12, color: T.accent2, background: "rgba(181,86,60,0.1)", padding: "8px 12px", borderRadius: 8 }}>{error}</div>}

          {view === "login"
            ? <button onClick={doLogin} style={{ width: "100%", padding: 14, background: T.ink, color: "#fff", border: "none", borderRadius: 11, fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 14 }}>Log In</button>
            : <button onClick={doSignup} style={{ width: "100%", padding: 14, background: T.accent, color: "#fff", border: "none", borderRadius: 11, fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 14 }}>Create Account</button>}

          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "16px 0" }}>
            <div style={{ flex: 1, height: 1, background: T.border }} />
            <span style={{ fontSize: 10.5, color: T.muted }}>or</span>
            <div style={{ flex: 1, height: 1, background: T.border }} />
          </div>

          {magicSent
            ? <div style={{ textAlign: "center", fontSize: 12.5, color: T.good, padding: 12, background: T.goodSoft, borderRadius: 10 }}>Magic link sent — signing you in…</div>
            : <button onClick={sendMagicLink} style={{ width: "100%", padding: 13, background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 11, color: T.inkSoft, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Email me a magic link</button>}
        </div>
        <div style={{ textAlign: "center", fontSize: 10.5, color: T.muted, marginTop: 14, lineHeight: 1.6 }}>
          Demo auth — replace with real Supabase Auth before production use.
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════════════════════════
function Dashboard({ data, setTab, onboarding, setOnboarding }) {
  const { clients, quotes, commissions, licenses } = data;
  const openQuotes = quotes.filter((q) => (q.status || "open") === "open").length;
  const activeClients = clients.filter((c) => c.status === "Active").length;
  const soon = licenses.filter((l) => {
    if (!l.expDate) return false;
    const days = (new Date(l.expDate) - new Date()) / 86400000;
    return days >= 0 && days <= 90;
  }).length;

  const steps = [
    { key: "profile", label: "Add your profile" },
    { key: "carrier", label: "Add your first carrier" },
    { key: "client", label: "Add your first client" },
    { key: "quote", label: "Build your first quote" },
    { key: "chat", label: "Chat with Jordan" },
  ];
  const doneCount = steps.filter((s) => onboarding[s.key]).length;
  const showOnboarding = !onboarding.dismissed && doneCount < steps.length;

  const stats = [
    { label: "Active Clients", value: activeClients, onClick: () => setTab("clients") },
    { label: "Open Quotes", value: openQuotes, onClick: () => setTab("quotes") },
    { label: "Commissions Logged", value: commissions.length, onClick: () => setTab("commissions") },
    { label: "Licenses Expiring Soon", value: soon, onClick: () => setTab("licenses") },
  ];

  return (
    <div>
      <div style={{ background: T.ink, borderRadius: 18, padding: "26px 28px", marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>{new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", fontFamily: FONT_HEAD }}>Welcome back</div>
        <div style={{ fontSize: 13, color: T.accentSoft, marginTop: 5 }}>Here's where things stand today.</div>
      </div>

      {showOnboarding && (
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: 20, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 700, fontFamily: FONT_HEAD, color: T.ink }}>Get Set Up ({doneCount}/5)</div>
            <button onClick={() => setOnboarding({ ...onboarding, dismissed: true })} style={{ background: "none", border: "none", color: T.muted, cursor: "pointer", fontSize: 16 }}>✕</button>
          </div>
          <div style={{ height: 6, background: T.surface2, borderRadius: 3, overflow: "hidden", margin: "10px 0 14px" }}>
            <div style={{ height: "100%", background: T.accent, width: `${(doneCount / 5) * 100}%` }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {steps.map((s) => (
              <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: onboarding[s.key] ? T.muted : T.ink, textDecoration: onboarding[s.key] ? "line-through" : "none" }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${onboarding[s.key] ? T.good : T.border}`, background: onboarding[s.key] ? T.good : "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, flexShrink: 0 }}>{onboarding[s.key] ? "✓" : ""}</span>
                {s.label}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 14 }}>
        {stats.map((s) => (
          <button key={s.label} onClick={s.onClick} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 16, cursor: "pointer", textAlign: "left", borderLeft: `3px solid ${T.accent}` }}>
            <div style={{ fontSize: 23, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD }}>{s.value}</div>
            <div style={{ fontSize: 10.5, color: T.muted, marginTop: 3, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// AI TEAM (chat + simple 2-step handoff)
// ══════════════════════════════════════════════════════════════
function AIChatModal({ employee, contextText, onClose, chatHistory, setChatHistory }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const fileRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [chatHistory, loading]);

  const handleFiles = async (e) => {
    const picked = Array.from(e.target.files || []).slice(0, 4 - files.length);
    const loaded = await Promise.all(picked.map(async (f) => ({ name: f.name, isImage: f.type.startsWith("image/"), dataUrl: await fileToDataUrl(f) })));
    setFiles((prev) => [...prev, ...loaded].slice(0, 4));
    e.target.value = "";
  };

  const send = async () => {
    if (!input.trim() && files.length === 0) return;
    const userMsg = { role: "user", text: input.trim(), files };
    const next = [...chatHistory, userMsg];
    setChatHistory(next);
    setInput(""); setFiles([]); setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          max_tokens: 1200,
          system: employee.systemPrompt + (contextText ? "\n\n" + contextText : ""),
          messages: next.map((m) => ({ role: m.role, content: m.text || "(attachment)" })),
        }),
      });
      const data = await res.json();
      const textBlock = (data.content || []).find((b) => b.type === "text");
      setChatHistory([...next, { role: "assistant", text: textBlock ? textBlock.text : "Sorry, I had trouble responding." }]);
    } catch {
      setChatHistory([...next, { role: "assistant", text: "I'm having trouble connecting right now — check that /api/chat is deployed." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} maxWidth={480}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: T.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontFamily: FONT_HEAD }}>{initials(employee.name)}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD }}>{employee.name}</div>
          <div style={{ fontSize: 11, color: T.muted }}>{employee.position}</div>
        </div>
        <button onClick={onClose} style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 9, width: 32, height: 32, cursor: "pointer", color: T.muted }}>✕</button>
      </div>
      <div ref={scrollRef} style={{ height: 320, overflowY: "auto", background: T.surface2, borderRadius: 12, padding: 12, display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
        {chatHistory.length === 0 && <div style={{ fontSize: 12.5, color: T.muted, textAlign: "center", padding: "24px 8px" }}>{employee.specialty}</div>}
        {chatHistory.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", background: m.role === "user" ? T.ink : T.surface, color: m.role === "user" ? "#fff" : T.ink, padding: "8px 12px", borderRadius: 12, fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
            {m.files && m.files.length > 0 && (
              <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                {m.files.map((f, fi) => f.isImage ? <img key={fi} src={f.dataUrl} alt={f.name} style={{ width: 48, height: 48, borderRadius: 6, objectFit: "cover" }} /> : <span key={fi} style={{ fontSize: 10, background: "rgba(255,255,255,0.15)", padding: "3px 8px", borderRadius: 6 }}>📄 {f.name}</span>)}
              </div>
            )}
            {m.text}
          </div>
        ))}
        {loading && <div style={{ fontSize: 12, color: T.muted }}>{employee.name} is thinking…</div>}
      </div>
      {files.length > 0 && (
        <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
          {files.map((f, i) => <span key={i} style={{ fontSize: 10, background: T.surface2, padding: "3px 8px", borderRadius: 6 }}>{f.isImage ? "🖼️" : "📄"} {f.name}</span>)}
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <input ref={fileRef} type="file" accept="image/*,.pdf" multiple onChange={handleFiles} style={{ display: "none" }} />
        <button onClick={() => fileRef.current?.click()} disabled={files.length >= 4} style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 12, width: 44, height: 44, cursor: "pointer", fontSize: 16 }}>📎</button>
        <TextInput value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder={`Ask ${employee.name} anything…`} style={{ flex: 1 }} />
        <button onClick={send} disabled={loading} style={{ background: T.ink, color: "#fff", border: "none", borderRadius: 12, padding: "0 18px", fontWeight: 700, cursor: "pointer" }}>→</button>
      </div>
    </Modal>
  );
}

function AITeam({ data }) {
  const [openId, setOpenId] = useState(null);
  const [histories, setHistories] = useState({}); // { employeeId: [{role,text,files}] }
  const employee = AI_TEAM.find((e) => e.id === openId);

  const buildContext = () => {
    const { clients, quotes, licenses } = data;
    const soon = licenses.filter((l) => l.expDate && (new Date(l.expDate) - new Date()) / 86400000 <= 90);
    return `CRM snapshot: ${clients.length} clients, ${quotes.filter((q) => (q.status || "open") === "open").length} open quotes, ${soon.length} license(s) expiring within 90 days. Client names: ${clients.map((c) => c.name).join(", ") || "none yet"}.`;
  };

  const departments = [...new Set(AI_TEAM.map((e) => e.department))];

  return (
    <div>
      <h2 style={{ fontSize: 23, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD, marginBottom: 4 }}>My AI Team</h2>
      <p style={{ fontSize: 13, color: T.muted, marginBottom: 18 }}>{AI_TEAM.length} on staff</p>
      {departments.map((dept) => (
        <div key={dept} style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 10 }}>{dept}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
            {AI_TEAM.filter((e) => e.department === dept).map((e) => (
              <div key={e.id} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: 16 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: T.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontFamily: FONT_HEAD }}>{initials(e.name)}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD }}>{e.name}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>{e.position}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: T.inkSoft, marginBottom: 12, minHeight: 32 }}>{e.specialty}</div>
                <button onClick={() => setOpenId(e.id)} style={{ background: T.ink, color: "#fff", border: "none", borderRadius: 10, padding: "8px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Open Chat</button>
              </div>
            ))}
          </div>
        </div>
      ))}
      {employee && (
        <AIChatModal
          employee={employee}
          contextText={buildContext()}
          chatHistory={histories[employee.id] || []}
          setChatHistory={(h) => setHistories({ ...histories, [employee.id]: h })}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// CARRIERS
// ══════════════════════════════════════════════════════════════
function Carriers({ carriers, setCarriers, markOnboarding }) {
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState(null);
  const [draft, setDraft] = useState({ name: "", phone: "", portal: "", override: "", line: LINES[0], notes: "" });

  const save = () => {
    if (!draft.name.trim()) return;
    const portal = draft.portal ? (draft.portal.startsWith("http") ? draft.portal : "https://" + draft.portal) : "#";
    setCarriers([...carriers, { id: nextId(), ...draft, portal }]);
    setShowAdd(false);
    setDraft({ name: "", phone: "", portal: "", override: "", line: LINES[0], notes: "" });
    markOnboarding("carrier");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ fontSize: 23, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD }}>Carrier Hub</h2>
        <button onClick={() => setShowAdd(true)} style={{ background: T.accent, color: "#fff", border: "none", borderRadius: 11, padding: "10px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>+ Add Carrier</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
        {carriers.map((c) => (
          <div key={c.id} onClick={() => setSelected(c)} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: 16, cursor: "pointer" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: lineColor(c.line), color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{initials(c.name)}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD }}>{c.name}</div>
                <span style={{ fontSize: 10, color: "#fff", background: lineColor(c.line), padding: "2px 8px", borderRadius: 20 }}>{c.line}</span>
              </div>
            </div>
            <div style={{ fontSize: 12, color: T.inkSoft }}>{c.phone}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.accent2, marginTop: 6 }}>{c.override}</div>
          </div>
        ))}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: lineColor(selected.line), color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 17 }}>{initials(selected.name)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 19, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD }}>{selected.name}</div>
              <span style={{ fontSize: 10.5, color: "#fff", background: lineColor(selected.line), padding: "2px 9px", borderRadius: 20 }}>{selected.line}</span>
            </div>
            <button onClick={() => setSelected(null)} style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 9, width: 32, height: 32, cursor: "pointer", color: T.muted }}>✕</button>
          </div>
          <div style={{ padding: "10px 0", borderBottom: `1px solid ${T.border}` }}><Label>Phone</Label><div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{selected.phone}</div></div>
          <div style={{ padding: "10px 0", borderBottom: `1px solid ${T.border}` }}><Label>Override</Label><div style={{ fontSize: 18, fontWeight: 700, color: T.accent2 }}>{selected.override}</div></div>
          <div style={{ padding: "12px 0" }}><Label>Notes</Label><div style={{ fontSize: 13, color: T.inkSoft, background: T.surface2, borderRadius: 10, padding: 12 }}>{selected.notes}</div></div>
          <a href={selected.portal} target="_blank" rel="noreferrer" style={{ display: "block", background: T.ink, color: "#fff", textAlign: "center", padding: 13, borderRadius: 11, textDecoration: "none", fontWeight: 700 }}>Open Agent Portal</a>
        </Modal>
      )}

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <h3 style={{ fontSize: 19, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD, marginBottom: 16 }}>Add Carrier</h3>
          <div style={{ marginBottom: 12 }}><Label>Carrier Name</Label><TextInput value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></div>
          <div style={{ marginBottom: 12 }}><Label>Phone</Label><TextInput value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></div>
          <div style={{ marginBottom: 12 }}><Label>Portal URL</Label><TextInput value={draft.portal} onChange={(e) => setDraft({ ...draft, portal: e.target.value })} /></div>
          <div style={{ marginBottom: 12 }}><Label>Override %</Label><TextInput value={draft.override} onChange={(e) => setDraft({ ...draft, override: e.target.value })} /></div>
          <div style={{ marginBottom: 12 }}><Label>Line of Business</Label><Select value={draft.line} onChange={(e) => setDraft({ ...draft, line: e.target.value })} options={LINES} /></div>
          <div style={{ marginBottom: 20 }}><Label>Notes</Label><TextInput value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} /></div>
          <ModalButtons onCancel={() => setShowAdd(false)} onSave={save} saveLabel="Save Carrier" />
        </Modal>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// QUOTES
// ══════════════════════════════════════════════════════════════
function QuoteCard({ q, carriers, isLowest, onStatusChange, onRemove, onAttachBrochure, onRemoveBrochure }) {
  const [preOpen, setPreOpen] = useState(false);
  const matchedCarrier = carriers.find((c) => c.name.toLowerCase() === (q.carrier || "").toLowerCase());
  const fileRef = useRef(null);

  return (
    <div style={{ background: T.surface, border: `2px solid ${isLowest ? T.accent2 : T.border}`, borderRadius: 16, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD }}>{q.carrier}</div>
          <div style={{ fontSize: 12, color: T.inkSoft }}>{q.plan}</div>
        </div>
        <button onClick={onRemove} style={{ background: "none", border: "none", color: T.muted, cursor: "pointer" }}>✕</button>
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD, margin: "8px 0" }}>{q.premium === 0 ? "$0" : `$${q.premium}`}<span style={{ fontSize: 12, color: T.muted, fontWeight: 400 }}>/mo</span></div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {QUOTE_STATUSES.map((st) => (
          <button key={st.id} onClick={() => onStatusChange(st.id)} style={{ fontSize: 10.5, fontWeight: 700, padding: "4px 10px", borderRadius: 20, border: `1px solid ${st.color}`, background: (q.status || "open") === st.id ? st.color : "transparent", color: (q.status || "open") === st.id ? "#fff" : st.color, cursor: "pointer" }}>{st.label}</button>
        ))}
      </div>
      <div style={{ fontSize: 12, color: T.inkSoft, marginBottom: 10 }}>{q.highlights}</div>

      {q.brochure ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: T.surface2, borderRadius: 8, marginBottom: 8 }}>
          {q.brochure.isImage && <img src={q.brochure.dataUrl} alt="" style={{ width: 34, height: 34, borderRadius: 6, objectFit: "cover" }} />}
          <span style={{ flex: 1, fontSize: 11.5, color: T.inkSoft, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>📎 {q.brochure.name}</span>
          <button onClick={onRemoveBrochure} style={{ background: "none", border: "none", color: T.muted, cursor: "pointer" }}>✕</button>
        </div>
      ) : (
        <label style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 10, border: `1px dashed ${T.border}`, borderRadius: 8, color: T.inkSoft, fontSize: 11.5, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>
          📎 Attach Brochure
          <input ref={fileRef} type="file" accept="image/*,.pdf" onChange={onAttachBrochure} style={{ display: "none" }} />
        </label>
      )}

      <button onClick={() => setPreOpen(!preOpen)} style={{ width: "100%", padding: 8, background: "transparent", border: `1px solid ${T.border}`, borderRadius: 8, color: T.inkSoft, fontSize: 11.5, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>{preOpen ? "Hide Pre-Screening ▲" : "Pre-Screening Questions ▼"}</button>

      {matchedCarrier ? (
        <a href={matchedCarrier.portal} target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", padding: 9, background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 9, color: T.ink, textDecoration: "none", fontSize: 12, fontWeight: 700 }}>Open Carrier Portal</a>
      ) : (
        <div style={{ textAlign: "center", padding: 9, background: T.surface2, border: `1px dashed ${T.border}`, borderRadius: 9, color: T.muted, fontSize: 11 }}>No carrier portal linked</div>
      )}
    </div>
  );
}

function Quotes({ data, setData, markOnboarding }) {
  const { quotes, clients, carriers } = data;
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState({ clientName: "", clientId: null, carrier: "", plan: "", premium: "", line: LINES[0], highlights: "" });

  const setQuotes = (updater) => setData((d) => ({ ...d, quotes: typeof updater === "function" ? updater(d.quotes) : updater }));

  const save = () => {
    if (!draft.carrier.trim() || !draft.clientName.trim()) return;
    const matched = draft.clientId ? clients.find((c) => c.id === draft.clientId) : clients.find((c) => c.name.trim().toLowerCase() === draft.clientName.trim().toLowerCase());
    setQuotes((qs) => [...qs, { id: nextId(), clientName: draft.clientName, clientId: matched ? matched.id : null, carrier: draft.carrier, plan: draft.plan, line: draft.line, premium: Number(draft.premium) || 0, highlights: draft.highlights, status: "open", preScreen: {} }]);
    setShowAdd(false);
    setDraft({ clientName: "", clientId: null, carrier: "", plan: "", premium: "", line: LINES[0], highlights: "" });
    markOnboarding("quote");
  };

  const setStatus = (id, status) => {
    const quote = quotes.find((q) => q.id === id);
    const wasWon = quote && quote.status === "closed_won";
    setQuotes((qs) => qs.map((q) => q.id === id ? { ...q, status } : q));
    if (status === "closed_won" && quote && !wasWon) {
      const today = new Date().toISOString().split("T")[0];
      const anniv = new Date(); anniv.setFullYear(anniv.getFullYear() + 1);
      setData((d) => ({
        ...d,
        commissions: [...d.commissions, { id: nextId(), carrier: quote.carrier, client: quote.clientName, line: quote.line, amount: 0, date: today, type: "First Year", needsReview: true }],
        events: [...d.events, { id: nextId(), title: `Policy Anniversary — ${quote.clientName} (${quote.carrier})`, type: "renewal", date: anniv.toISOString().split("T")[0], clientName: quote.clientName, clientId: quote.clientId || null }],
      }));
    }
  };

  const attachBrochure = (id) => async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) { alert("File must be under 8MB."); return; }
    const dataUrl = await fileToDataUrl(file);
    setQuotes((qs) => qs.map((q) => q.id === id ? { ...q, brochure: { name: file.name, isImage: file.type.startsWith("image/"), dataUrl } } : q));
  };
  const removeBrochure = (id) => setQuotes((qs) => qs.map((q) => q.id === id ? { ...q, brochure: null } : q));

  const premiumsByClient = {};
  quotes.forEach((q) => { const cur = premiumsByClient[q.clientName]; premiumsByClient[q.clientName] = cur === undefined ? q.premium : Math.min(cur, q.premium); });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ fontSize: 23, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD }}>Quotes</h2>
        <button onClick={() => setShowAdd(true)} style={{ background: T.accent, color: "#fff", border: "none", borderRadius: 11, padding: "10px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>+ Add Quote</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
        {quotes.map((q) => (
          <QuoteCard key={q.id} q={q} carriers={carriers} isLowest={q.premium === premiumsByClient[q.clientName]}
            onStatusChange={(st) => setStatus(q.id, st)} onRemove={() => setQuotes((qs) => qs.filter((x) => x.id !== q.id))}
            onAttachBrochure={attachBrochure(q.id)} onRemoveBrochure={() => removeBrochure(q.id)} />
        ))}
      </div>

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <h3 style={{ fontSize: 19, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD, marginBottom: 16 }}>Add Quote</h3>
          <div style={{ marginBottom: 12 }}><Label>Client Name</Label><TextInput value={draft.clientName} onChange={(e) => setDraft({ ...draft, clientName: e.target.value })} /></div>
          <div style={{ marginBottom: 12 }}>
            <Label>Carrier</Label>
            <TextInput list="carrier-options" value={draft.carrier} onChange={(e) => setDraft({ ...draft, carrier: e.target.value })} />
            <datalist id="carrier-options">{carriers.map((c) => <option key={c.id} value={c.name} />)}</datalist>
            <div style={{ fontSize: 10.5, color: T.muted, marginTop: 4 }}>Matching a name from Carrier Hub links the portal.</div>
          </div>
          <div style={{ marginBottom: 12 }}><Label>Plan Name</Label><TextInput value={draft.plan} onChange={(e) => setDraft({ ...draft, plan: e.target.value })} /></div>
          <div style={{ marginBottom: 12 }}><Label>Monthly Premium ($)</Label><TextInput value={draft.premium} onChange={(e) => setDraft({ ...draft, premium: e.target.value })} /></div>
          <div style={{ marginBottom: 12 }}><Label>Line of Business</Label><Select value={draft.line} onChange={(e) => setDraft({ ...draft, line: e.target.value })} options={LINES} /></div>
          <div style={{ marginBottom: 20 }}><Label>Highlights</Label><TextInput value={draft.highlights} onChange={(e) => setDraft({ ...draft, highlights: e.target.value })} /></div>
          <ModalButtons onCancel={() => setShowAdd(false)} onSave={save} saveLabel="Add to Comparison" />
        </Modal>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SOA / ACA forms
// ══════════════════════════════════════════════════════════════
function printDoc(title, bodyHtml) {
  const w = window.open("", "_blank");
  if (!w) { alert("Please allow popups to print."); return; }
  w.document.write(`<!DOCTYPE html><html><head><title>${title}</title><style>
    body{font-family:Arial,sans-serif;font-size:12px;margin:40px;color:#000;}
    h1{font-size:16px;text-align:center;margin-bottom:4px;}
    h2{font-size:13px;border-bottom:1px solid #000;padding-bottom:4px;margin-top:20px;}
    .row{display:flex;gap:20px;margin-bottom:10px;} .field{flex:1;}
    .field label{font-weight:bold;font-size:10px;display:block;margin-bottom:2px;color:#555;text-transform:uppercase;}
    .val{border-bottom:1px solid #000;min-height:18px;padding:2px 0;font-size:12px;}
    .sig-row{display:flex;gap:40px;margin-top:30px;} .sig{flex:1;border-top:1px solid #000;padding-top:4px;font-size:10px;color:#555;}
  </style></head><body>${bodyHtml}<script>window.onload=function(){window.print();};</script></body></html>`);
  w.document.close();
}

function SOAModal({ client, onClose }) {
  const [form, setForm] = useState({ beneficiaryName: client.name, beneficiaryDOB: "", beneficiaryPhone: client.phone || "", medicareNumber: "", appointmentDate: new Date().toISOString().split("T")[0], appointmentTime: "", contactMethod: "In Person", products: [], notes: "" });
  const toggle = (p) => setForm((f) => ({ ...f, products: f.products.includes(p) ? f.products.filter((x) => x !== p) : [...f.products, p] }));
  const print = () => printDoc(`SOA — ${form.beneficiaryName}`, `
    <h1>SCOPE OF APPOINTMENT</h1>
    <div style="text-align:center;font-size:11px;color:#444;margin-bottom:16px;">Medicare Sales Appointment Confirmation</div>
    <h2>Beneficiary Information</h2>
    <div class="row"><div class="field"><label>Name</label><div class="val">${form.beneficiaryName}</div></div><div class="field"><label>DOB</label><div class="val">${form.beneficiaryDOB}</div></div></div>
    <div class="row"><div class="field"><label>Phone</label><div class="val">${form.beneficiaryPhone}</div></div><div class="field"><label>Medicare #</label><div class="val">${form.medicareNumber}</div></div></div>
    <h2>Appointment</h2>
    <div class="row"><div class="field"><label>Date</label><div class="val">${form.appointmentDate}</div></div><div class="field"><label>Time</label><div class="val">${form.appointmentTime}</div></div><div class="field"><label>Method</label><div class="val">${form.contactMethod}</div></div></div>
    <h2>Products To Discuss</h2>
    ${SOA_PRODUCTS.map((p) => `<div style="font-size:11px;margin:4px 0;"><span style="display:inline-block;width:12px;height:12px;border:1px solid #000;margin-right:6px;vertical-align:middle;background:${form.products.includes(p) ? "#000" : "transparent"}"></span>${p}</div>`).join("")}
    ${form.notes ? `<h2>Notes</h2><p>${form.notes}</p>` : ""}
    <h2>Signatures</h2>
    <div class="sig-row"><div class="sig">Beneficiary Signature — Date</div><div class="sig">Agent Signature — Date</div></div>
  `);

  return (
    <Modal onClose={onClose} maxWidth={520}>
      <div style={{ fontSize: 10.5, color: T.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>Medicare · CMS Required</div>
      <h3 style={{ fontSize: 19, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD, marginBottom: 16 }}>Scope of Appointment</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <div><Label>Beneficiary Name</Label><TextInput value={form.beneficiaryName} onChange={(e) => setForm({ ...form, beneficiaryName: e.target.value })} /></div>
        <div><Label>DOB</Label><TextInput value={form.beneficiaryDOB} onChange={(e) => setForm({ ...form, beneficiaryDOB: e.target.value })} /></div>
        <div><Label>Phone</Label><TextInput value={form.beneficiaryPhone} onChange={(e) => setForm({ ...form, beneficiaryPhone: e.target.value })} /></div>
        <div><Label>Medicare Number</Label><TextInput value={form.medicareNumber} onChange={(e) => setForm({ ...form, medicareNumber: e.target.value })} /></div>
        <div><Label>Appointment Date</Label><TextInput type="date" value={form.appointmentDate} onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })} /></div>
        <div><Label>Time</Label><TextInput type="time" value={form.appointmentTime} onChange={(e) => setForm({ ...form, appointmentTime: e.target.value })} /></div>
      </div>
      <Label>Products to Be Discussed</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, margin: "8px 0 14px" }}>
        {SOA_PRODUCTS.map((p) => (
          <label key={p} style={{ display: "flex", gap: 8, fontSize: 12.5, color: T.inkSoft, cursor: "pointer" }}>
            <input type="checkbox" checked={form.products.includes(p)} onChange={() => toggle(p)} /> {p}
          </label>
        ))}
      </div>
      <div style={{ marginBottom: 16 }}><Label>Notes</Label><TextInput value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
      <ModalButtons onCancel={onClose} onSave={print} saveLabel="Print / Save as PDF" saveColor="#20242B" />
    </Modal>
  );
}

function ACAModal({ client, onClose }) {
  const [form, setForm] = useState({ consumerName: client.name, consumerDOB: "", consumerPhone: client.phone || "", householdSize: "", consentDate: new Date().toISOString().split("T")[0], consentMethod: "In Person", items: [], notes: "" });
  const toggle = (p) => setForm((f) => ({ ...f, items: f.items.includes(p) ? f.items.filter((x) => x !== p) : [...f.items, p] }));
  const print = () => printDoc(`ACA Consent — ${form.consumerName}`, `
    <h1>MARKETPLACE CONSENT &amp; AUTHORIZATION</h1>
    <h2>Consumer Information</h2>
    <div class="row"><div class="field"><label>Name</label><div class="val">${form.consumerName}</div></div><div class="field"><label>DOB</label><div class="val">${form.consumerDOB}</div></div></div>
    <div class="row"><div class="field"><label>Phone</label><div class="val">${form.consumerPhone}</div></div><div class="field"><label>Household Size</label><div class="val">${form.householdSize}</div></div></div>
    <h2>Consumer Consents To</h2>
    ${ACA_CONSENT_ITEMS.map((p) => `<div style="font-size:11px;margin:4px 0;"><span style="display:inline-block;width:12px;height:12px;border:1px solid #000;margin-right:6px;vertical-align:middle;background:${form.items.includes(p) ? "#000" : "transparent"}"></span>${p}</div>`).join("")}
    ${form.notes ? `<h2>Notes</h2><p>${form.notes}</p>` : ""}
    <h2>Signatures</h2>
    <div class="sig-row"><div class="sig">Consumer Signature — Date</div><div class="sig">Agent Signature — Date</div></div>
  `);

  return (
    <Modal onClose={onClose} maxWidth={520}>
      <div style={{ fontSize: 10.5, color: T.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>Health &amp; ACA · Marketplace</div>
      <h3 style={{ fontSize: 19, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD, marginBottom: 16 }}>Consent &amp; Authorization</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <div><Label>Full Name</Label><TextInput value={form.consumerName} onChange={(e) => setForm({ ...form, consumerName: e.target.value })} /></div>
        <div><Label>DOB</Label><TextInput value={form.consumerDOB} onChange={(e) => setForm({ ...form, consumerDOB: e.target.value })} /></div>
        <div><Label>Phone</Label><TextInput value={form.consumerPhone} onChange={(e) => setForm({ ...form, consumerPhone: e.target.value })} /></div>
        <div><Label>Household Size</Label><TextInput value={form.householdSize} onChange={(e) => setForm({ ...form, householdSize: e.target.value })} /></div>
      </div>
      <Label>Consumer Consents To</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, margin: "8px 0 14px" }}>
        {ACA_CONSENT_ITEMS.map((p) => (
          <label key={p} style={{ display: "flex", gap: 8, fontSize: 12.5, color: T.inkSoft, cursor: "pointer" }}>
            <input type="checkbox" checked={form.items.includes(p)} onChange={() => toggle(p)} /> {p}
          </label>
        ))}
      </div>
      <div style={{ marginBottom: 16 }}><Label>Notes</Label><TextInput value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
      <ModalButtons onCancel={onClose} onSave={print} saveLabel="Print / Save as PDF" saveColor="#20242B" />
    </Modal>
  );
}

// ══════════════════════════════════════════════════════════════
// CLIENTS
// ══════════════════════════════════════════════════════════════
function Clients({ data, setData, markOnboarding, goToQuotes }) {
  const { clients, quotes } = data;
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState(null);
  const [draft, setDraft] = useState({ name: "", phone: "", line: LINES[0] });
  const [noteText, setNoteText] = useState("");
  const [showSOA, setShowSOA] = useState(false);
  const [showACA, setShowACA] = useState(false);

  const setClients = (updater) => setData((d) => ({ ...d, clients: typeof updater === "function" ? updater(d.clients) : updater }));

  const save = () => {
    if (!draft.name.trim()) return;
    setClients((cs) => [...cs, { id: nextId(), name: draft.name, phone: draft.phone, line: draft.line, status: "Prospect", lastContact: new Date().toISOString().split("T")[0], notes: [] }]);
    setShowAdd(false);
    setDraft({ name: "", phone: "", line: LINES[0] });
    markOnboarding("client");
  };

  const addNote = () => {
    if (!noteText.trim() || !selected) return;
    const date = new Date().toISOString().split("T")[0];
    setClients((cs) => cs.map((c) => c.id === selected.id ? { ...c, notes: [...c.notes, { date, text: noteText.trim() }], lastContact: date } : c));
    setSelected((s) => ({ ...s, notes: [...s.notes, { date, text: noteText.trim() }] }));
    setNoteText("");
  };

  const clientQuotes = selected ? quotes.filter((q) => q.clientId === selected.id || (!q.clientId && q.clientName.trim().toLowerCase() === selected.name.trim().toLowerCase())) : [];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ fontSize: 23, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD }}>Clients</h2>
        <button onClick={() => setShowAdd(true)} style={{ background: T.accent, color: "#fff", border: "none", borderRadius: 11, padding: "10px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>+ Add Client</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
        {clients.map((c) => (
          <div key={c.id} onClick={() => setSelected(c)} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: 16, cursor: "pointer" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: lineColor(c.line), color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{initials(c.name)}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD }}>{c.name}</div>
                <span style={{ fontSize: 10, color: "#fff", background: lineColor(c.line), padding: "2px 8px", borderRadius: 20 }}>{c.line}</span>
              </div>
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: STATUS_COLORS[c.status] || T.muted }}>{c.status}</span>
          </div>
        ))}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: lineColor(selected.line), color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 17 }}>{initials(selected.name)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 19, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD }}>{selected.name}</div>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: STATUS_COLORS[selected.status] || T.muted }}>{selected.status}</span>
            </div>
            <button onClick={() => setSelected(null)} style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 9, width: 32, height: 32, cursor: "pointer", color: T.muted }}>✕</button>
          </div>

          {["Active", "Prospect"].map((st) => (
            <button key={st} onClick={() => { setClients((cs) => cs.map((c) => c.id === selected.id ? { ...c, status: st } : c)); setSelected((s) => ({ ...s, status: st })); }}
              style={{ marginRight: 8, marginBottom: 14, padding: "6px 14px", borderRadius: 20, border: `1px solid ${STATUS_COLORS[st]}`, background: selected.status === st ? STATUS_COLORS[st] : "transparent", color: selected.status === st ? "#fff" : STATUS_COLORS[st], fontSize: 11.5, fontWeight: 700, cursor: "pointer" }}>{st}</button>
          ))}

          {clientQuotes.length > 0 && (
            <>
              <Label>{clientQuotes.length} quote{clientQuotes.length === 1 ? "" : "s"} on file</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                {clientQuotes.map((q) => {
                  const st = QUOTE_STATUSES.find((x) => x.id === (q.status || "open")) || QUOTE_STATUSES[0];
                  return (
                    <div key={q.id} style={{ background: T.surface2, borderRadius: 10, padding: "10px 12px", display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>{q.carrier} — {q.plan}</div>
                        <div style={{ fontSize: 11, color: T.muted }}>{q.premium === 0 ? "$0/mo" : `$${q.premium}/mo`}</div>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: st.color, background: st.color + "22", padding: "3px 9px", borderRadius: 20 }}>{st.label}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <Label>Notes</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
            {selected.notes.map((n, i) => <div key={i} style={{ background: T.surface2, borderRadius: 10, padding: "10px 12px", fontSize: 12.5, color: T.inkSoft }}><span style={{ color: T.muted, fontSize: 10.5 }}>{n.date} — </span>{n.text}</div>)}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <TextInput value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Add a note…" style={{ flex: 1 }} />
            <button onClick={addNote} style={{ background: T.ink, color: "#fff", border: "none", borderRadius: 10, padding: "9px 15px", fontWeight: 700, cursor: "pointer" }}>Save</button>
          </div>

          {selected.line === "Medicare" && <button onClick={() => setShowSOA(true)} style={{ width: "100%", padding: 13, background: "#20242B", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, cursor: "pointer", marginBottom: 10 }}>Scope of Appointment (CMS Required)</button>}
          {selected.line === "Health & ACA" && <button onClick={() => setShowACA(true)} style={{ width: "100%", padding: 13, background: "#20242B", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, cursor: "pointer", marginBottom: 10 }}>ACA Consent &amp; Authorization</button>}
          <button onClick={() => { goToQuotes(selected); setSelected(null); }} style={{ width: "100%", padding: 13, background: T.accent, color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, cursor: "pointer" }}>Build a Quote for {selected.name} →</button>
        </Modal>
      )}

      {showSOA && selected && <SOAModal client={selected} onClose={() => setShowSOA(false)} />}
      {showACA && selected && <ACAModal client={selected} onClose={() => setShowACA(false)} />}

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <h3 style={{ fontSize: 19, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD, marginBottom: 16 }}>Add Client</h3>
          <div style={{ marginBottom: 12 }}><Label>Name</Label><TextInput value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></div>
          <div style={{ marginBottom: 12 }}><Label>Phone</Label><TextInput value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></div>
          <div style={{ marginBottom: 20 }}><Label>Line of Business</Label><Select value={draft.line} onChange={(e) => setDraft({ ...draft, line: e.target.value })} options={LINES} /></div>
          <ModalButtons onCancel={() => setShowAdd(false)} onSave={save} saveLabel="Save Client" />
        </Modal>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// CALENDAR
// ══════════════════════════════════════════════════════════════
function Calendar({ events, setEvents }) {
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState({ title: "", clientName: "", date: "", type: "appointment" });
  const save = () => {
    if (!draft.title.trim() || !draft.date) return;
    setEvents([...events, { id: nextId(), ...draft }]);
    setShowAdd(false);
    setDraft({ title: "", clientName: "", date: "", type: "appointment" });
  };
  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ fontSize: 23, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD }}>Calendar</h2>
        <button onClick={() => setShowAdd(true)} style={{ background: T.accent, color: "#fff", border: "none", borderRadius: 11, padding: "10px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>+ Add Event</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sorted.map((e) => {
          const meta = EVENT_TYPES.find((t) => t.id === e.type) || EVENT_TYPES[0];
          return (
            <div key={e.id} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 7, height: 38, borderRadius: 4, background: meta.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>{e.title}</div>
                <div style={{ fontSize: 11.5, color: T.muted }}>{e.date} · {meta.label}{e.clientName ? ` · ${e.clientName}` : ""}</div>
              </div>
              <button onClick={() => setEvents(events.filter((x) => x.id !== e.id))} style={{ background: "none", border: "none", color: T.muted, cursor: "pointer" }}>✕</button>
            </div>
          );
        })}
        {sorted.length === 0 && <div style={{ color: T.muted, fontSize: 13, textAlign: "center", padding: 30 }}>No events yet.</div>}
      </div>

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <h3 style={{ fontSize: 19, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD, marginBottom: 16 }}>Add Event</h3>
          <div style={{ marginBottom: 12 }}><Label>Title</Label><TextInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></div>
          <div style={{ marginBottom: 12 }}><Label>Client Name</Label><TextInput value={draft.clientName} onChange={(e) => setDraft({ ...draft, clientName: e.target.value })} /></div>
          <div style={{ marginBottom: 12 }}><Label>Date</Label><TextInput type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} /></div>
          <div style={{ marginBottom: 20 }}><Label>Type</Label><Select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })} options={EVENT_TYPES.map((t) => t.id)} /></div>
          <ModalButtons onCancel={() => setShowAdd(false)} onSave={save} saveLabel="Save Event" />
        </Modal>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// COMMISSIONS
// ══════════════════════════════════════════════════════════════
function Commissions({ commissions, setCommissions }) {
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState({ carrier: "", client: "", amount: "", line: LINES[0], type: "First Year" });
  const save = () => {
    if (!draft.carrier.trim() || !draft.amount) return;
    setCommissions([...commissions, { id: nextId(), ...draft, amount: Number(draft.amount), date: new Date().toISOString().split("T")[0] }]);
    setShowAdd(false);
    setDraft({ carrier: "", client: "", amount: "", line: LINES[0], type: "First Year" });
  };
  const sorted = [...commissions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ fontSize: 23, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD }}>Commissions</h2>
        <button onClick={() => setShowAdd(true)} style={{ background: T.good, color: "#fff", border: "none", borderRadius: 11, padding: "10px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>+ Log Commission</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sorted.map((c) => (
          <div key={c.id} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 66, height: 44, borderRadius: 11, background: T.goodSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.good }}>{c.needsReview ? "Add amt" : `$${Number(c.amount).toLocaleString()}`}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, display: "flex", alignItems: "center", gap: 7 }}>
                {c.carrier}
                {c.needsReview && <span style={{ fontSize: 9.5, fontWeight: 700, color: T.warn, background: T.warnSoft, padding: "2px 8px", borderRadius: 10 }}>Auto-added · needs amount</span>}
              </div>
              <div style={{ fontSize: 11.5, color: T.muted }}>{c.client} · {c.line} · {c.type} · {c.date}</div>
            </div>
            <button onClick={() => setCommissions(commissions.filter((x) => x.id !== c.id))} style={{ background: "none", border: "none", color: T.muted, cursor: "pointer" }}>✕</button>
          </div>
        ))}
        {sorted.length === 0 && <div style={{ color: T.muted, fontSize: 13, textAlign: "center", padding: 30 }}>No commissions logged yet.</div>}
      </div>

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <h3 style={{ fontSize: 19, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD, marginBottom: 16 }}>Log Commission</h3>
          <div style={{ marginBottom: 12 }}><Label>Carrier</Label><TextInput value={draft.carrier} onChange={(e) => setDraft({ ...draft, carrier: e.target.value })} /></div>
          <div style={{ marginBottom: 12 }}><Label>Client</Label><TextInput value={draft.client} onChange={(e) => setDraft({ ...draft, client: e.target.value })} /></div>
          <div style={{ marginBottom: 12 }}><Label>Amount ($)</Label><TextInput value={draft.amount} onChange={(e) => setDraft({ ...draft, amount: e.target.value })} /></div>
          <div style={{ marginBottom: 20 }}><Label>Line of Business</Label><Select value={draft.line} onChange={(e) => setDraft({ ...draft, line: e.target.value })} options={LINES} /></div>
          <ModalButtons onCancel={() => setShowAdd(false)} onSave={save} saveLabel="Save Commission" saveColor={T.good} />
        </Modal>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// LICENSES
// ══════════════════════════════════════════════════════════════
function Licenses({ licenses, setLicenses }) {
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState({ state: "", licenseNum: "", line: "", expDate: "" });
  const save = () => {
    if (!draft.state.trim()) return;
    setLicenses([...licenses, { id: nextId(), ...draft }]);
    setShowAdd(false);
    setDraft({ state: "", licenseNum: "", line: "", expDate: "" });
  };
  const urgency = (l) => {
    if (!l.expDate) return T.muted;
    const days = (new Date(l.expDate) - new Date()) / 86400000;
    if (days < 0) return T.accent2;
    if (days <= 90) return T.warn;
    return T.good;
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ fontSize: 23, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD }}>Licenses</h2>
        <button onClick={() => setShowAdd(true)} style={{ background: T.accent, color: "#fff", border: "none", borderRadius: 11, padding: "10px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>+ Add License</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {licenses.map((l) => (
          <div key={l.id} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: urgency(l), color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{l.state}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>{l.line} · #{l.licenseNum}</div>
              <div style={{ fontSize: 11.5, color: T.muted }}>Expires {l.expDate || "—"}</div>
            </div>
            <button onClick={() => setLicenses(licenses.filter((x) => x.id !== l.id))} style={{ background: "none", border: "none", color: T.muted, cursor: "pointer" }}>✕</button>
          </div>
        ))}
        {licenses.length === 0 && <div style={{ color: T.muted, fontSize: 13, textAlign: "center", padding: 30 }}>No licenses on file.</div>}
      </div>

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <h3 style={{ fontSize: 19, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD, marginBottom: 16 }}>Add License</h3>
          <div style={{ marginBottom: 12 }}><Label>State</Label><TextInput value={draft.state} onChange={(e) => setDraft({ ...draft, state: e.target.value })} /></div>
          <div style={{ marginBottom: 12 }}><Label>License Number</Label><TextInput value={draft.licenseNum} onChange={(e) => setDraft({ ...draft, licenseNum: e.target.value })} /></div>
          <div style={{ marginBottom: 12 }}><Label>Line</Label><TextInput value={draft.line} onChange={(e) => setDraft({ ...draft, line: e.target.value })} /></div>
          <div style={{ marginBottom: 20 }}><Label>Expiration Date</Label><TextInput type="date" value={draft.expDate} onChange={(e) => setDraft({ ...draft, expDate: e.target.value })} /></div>
          <ModalButtons onCancel={() => setShowAdd(false)} onSave={save} saveLabel="Save License" />
        </Modal>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PROFILE
// ══════════════════════════════════════════════════════════════
function Profile({ session, profile, setProfile }) {
  const [draft, setDraft] = useState(profile);
  const [editing, setEditing] = useState(false);
  const save = () => { setProfile(draft); setEditing(false); };

  return (
    <div style={{ maxWidth: 480 }}>
      <h2 style={{ fontSize: 23, fontWeight: 700, color: T.ink, fontFamily: FONT_HEAD, marginBottom: 18 }}>Profile</h2>
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: 20 }}>
        {editing ? (
          <>
            <div style={{ marginBottom: 12 }}><Label>Full Name</Label><TextInput value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></div>
            <div style={{ marginBottom: 12 }}><Label>Agency Name</Label><TextInput value={draft.agencyName} onChange={(e) => setDraft({ ...draft, agencyName: e.target.value })} /></div>
            <div style={{ marginBottom: 12 }}><Label>Phone</Label><TextInput value={draft.phone || ""} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></div>
            <div style={{ marginBottom: 20 }}><Label>Licensed States</Label><TextInput value={draft.states || ""} onChange={(e) => setDraft({ ...draft, states: e.target.value })} /></div>
            <ModalButtons onCancel={() => { setDraft(profile); setEditing(false); }} onSave={save} saveLabel="Save" />
          </>
        ) : (
          <>
            <div style={{ marginBottom: 12 }}><Label>Full Name</Label><div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{profile.name}</div></div>
            <div style={{ marginBottom: 12 }}><Label>Agency Name</Label><div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{profile.agencyName}</div></div>
            <div style={{ marginBottom: 12 }}><Label>Email</Label><div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{session.email}</div></div>
            <button onClick={() => setEditing(true)} style={{ background: T.accent, color: "#fff", border: "none", borderRadius: 11, padding: "10px 18px", fontWeight: 700, cursor: "pointer" }}>Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════
const TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "ai-team", label: "AI Team" },
  { id: "carriers", label: "Carriers" },
  { id: "quotes", label: "Quotes" },
  { id: "clients", label: "Clients" },
  { id: "calendar", label: "Calendar" },
  { id: "commissions", label: "Commissions" },
  { id: "licenses", label: "Licenses" },
  { id: "profile", label: "Profile" },
];

export default function App() {
  const [session, setSession] = useState(() => loadSession());
  const [tab, setTab] = useState("dashboard");
  const [onboarding, setOnboardingState] = useState(() => loadOnboarding(session?.email));
  const [profile, setProfileState] = useState(() => (session ? loadJSON(`acc_data_${session.email}_profile`, { name: session.name, agencyName: session.agencyName }) : { name: "", agencyName: "" }));

  const [data, setData] = useState(() => {
    const email = session?.email;
    return {
      clients: loadCollection(email, "clients", seedClients),
      carriers: loadCollection(email, "carriers", seedCarriers),
      quotes: loadCollection(email, "quotes", seedQuotes),
      commissions: loadCollection(email, "commissions", seedCommissions),
      licenses: loadCollection(email, "licenses", seedLicenses),
      events: loadCollection(email, "events", seedEvents),
    };
  });

  useEffect(() => {
    if (!session) return;
    saveCollection(session.email, "clients", data.clients);
    saveCollection(session.email, "carriers", data.carriers);
    saveCollection(session.email, "quotes", data.quotes);
    saveCollection(session.email, "commissions", data.commissions);
    saveCollection(session.email, "licenses", data.licenses);
    saveCollection(session.email, "events", data.events);
  }, [data, session]);

  useEffect(() => { if (session) saveJSON(`acc_onboarding_${session.email}`, onboarding); }, [onboarding, session]);
  useEffect(() => { if (session) saveCollection(session.email, "profile", profile); }, [profile, session]);

  const markOnboarding = (key) => setOnboardingState((o) => (o[key] ? o : { ...o, [key]: true }));

  const handleLoggedIn = (account, isNew) => {
    saveJSON("acc_session", { name: account.name, agencyName: account.agencyName, email: account.email });
    setSession({ name: account.name, agencyName: account.agencyName, email: account.email });
    setOnboardingState(loadOnboarding(account.email));
    setProfileState(loadJSON(`acc_data_${account.email}_profile`, { name: account.name, agencyName: account.agencyName }));
    setData({
      clients: loadCollection(account.email, "clients", isNew ? () => [] : seedClients),
      carriers: loadCollection(account.email, "carriers", isNew ? () => [] : seedCarriers),
      quotes: loadCollection(account.email, "quotes", isNew ? () => [] : seedQuotes),
      commissions: loadCollection(account.email, "commissions", isNew ? () => [] : seedCommissions),
      licenses: loadCollection(account.email, "licenses", isNew ? () => [] : seedLicenses),
      events: loadCollection(account.email, "events", isNew ? () => [] : seedEvents),
    });
    setTab("dashboard");
  };

  const logout = () => { localStorage.removeItem("acc_session"); setSession(null); };

  const goToQuotesForClient = (client) => {
    setTab("quotes");
  };

  if (!session) return <AuthGate onLoggedIn={handleLoggedIn} />;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: FONT_BODY }}>
      <div style={{ position: "sticky", top: 0, zIndex: 40, background: T.ink, padding: "0 20px", display: "flex", alignItems: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.18)" }}>
        <button onClick={() => setTab("profile")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px 12px 0", marginRight: 8, background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: FONT_HEAD }}>{initials(profile.agencyName || profile.name)}</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#fff", fontFamily: FONT_HEAD, lineHeight: 1.2 }}>{profile.agencyName || "Your Agency"}</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>{profile.name}</span>
          </div>
        </button>
        <div style={{ display: "flex", overflowX: "auto", flex: 1 }}>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "15px 13px", background: "none", border: "none", borderBottom: `2px solid ${tab === t.id ? T.accent : "transparent"}`, color: tab === t.id ? "#fff" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, fontFamily: FONT_BODY, fontWeight: 700, whiteSpace: "nowrap" }}>{t.label}</button>
          ))}
        </div>
        <button onClick={logout} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.45)", cursor: "pointer", fontSize: 11.5, fontWeight: 700, padding: "15px 4px", flexShrink: 0 }}>Log Out</button>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
        {tab === "dashboard" && <Dashboard data={data} setTab={setTab} onboarding={onboarding} setOnboarding={setOnboardingState} />}
        {tab === "ai-team" && <AITeam data={data} />}
        {tab === "carriers" && <Carriers carriers={data.carriers} setCarriers={(v) => setData((d) => ({ ...d, carriers: typeof v === "function" ? v(d.carriers) : v }))} markOnboarding={markOnboarding} />}
        {tab === "quotes" && <Quotes data={data} setData={setData} markOnboarding={markOnboarding} />}
        {tab === "clients" && <Clients data={data} setData={setData} markOnboarding={markOnboarding} goToQuotes={goToQuotesForClient} />}
        {tab === "calendar" && <Calendar events={data.events} setEvents={(v) => setData((d) => ({ ...d, events: v }))} />}
        {tab === "commissions" && <Commissions commissions={data.commissions} setCommissions={(v) => setData((d) => ({ ...d, commissions: v }))} />}
        {tab === "licenses" && <Licenses licenses={data.licenses} setLicenses={(v) => setData((d) => ({ ...d, licenses: v }))} />}
        {tab === "profile" && <Profile session={session} profile={profile} setProfile={setProfileState} />}
      </div>
    </div>
  );
}
