import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Wallet, 
  Award, 
  Sun, 
  Globe, 
  ChevronRight, 
  Menu, 
  X,
  Layers,
  FileText,
  CheckCircle2,
  Pickaxe,
  Landmark,
  Calculator,
  MapPin,
  TrendingUp,
  Leaf,
  Calendar,
  Zap,
  Gavel,
  AlertTriangle,
  Clock,
  CircleDashed,
  QrCode,
  Smartphone,
  Languages,
  MessageCircle,
  Cpu,
  Coins,
  ArrowRight,
  RefreshCcw,
  Bitcoin,
  ScanLine
} from "lucide-react";

// --- Configuration & Constants ---

type CurrencyKey = 'USDC' | 'USD' | 'INR' | 'BTC' | 'ETH';

const CURRENCY_RATES: Record<CurrencyKey, { rate: number, symbol: string, decimals: number }> = {
  USDC: { rate: 1, symbol: "USDC", decimals: 2 },
  USD: { rate: 1, symbol: "$", decimals: 2 },
  INR: { rate: 87.5, symbol: "₹", decimals: 0 },
  BTC: { rate: 0.0000105, symbol: "₿", decimals: 6 },
  ETH: { rate: 0.00032, symbol: "Ξ", decimals: 5 }
};

// --- Translations ---

const enTranslations = {
  nav: {
    whitepaper: "Whitepaper",
    roadmap: "Roadmap",
    dapp: "dApp",
    connect: "Connect Wallet / Pay"
  },
  hero: {
    tag: "HeliosHash DAO",
    title: "India's First Community-Owned Solar-Powered Bitcoin Mining Park",
    subtitle: "A New Model for Rural India. Helios#Baghpat uses free sunlight to run Bitcoin mining computers 24/7. All profits are shared monthly with 750 member-families and the landowner.",
    cta: "Join as Core Member",
    waitlist: "550 Spots Remaining",
    badge_loc: "Baghpat District, Uttar Pradesh",
    badge_cap: "750 Member Capacity"
  },
  stats: {
    capacity: "Capacity Goal",
    members: "Community Owners",
    raised: "Total Raised"
  },
  tabs: {
    overview: "Overview",
    calculator: "Calculator",
    pricing: "Pricing",
    roadmap: "Roadmap",
    whitepaper: "Whitepaper",
    faq: "FAQ"
  },
  common: {
      payment_note: "Payment via USDC (Crypto) or UPI (INR equivalent). Total raise target: 300,000 USDC.",
      funding_summary: "Funding Summary",
      source: "Source",
      target: "Target Amount",
      notes: "Notes",
      table: {
          dao_members: "750 DAO Members",
          dao_note: "~₹2.5 Cr. Fast filling.",
          subsidies: "Subsidies (UPNEDA)",
          subsidies_amt: "30% of Capex",
          subsidies_note: "~₹7 Cr eq. Pending funding for approvals.",
          treasury: "Treasury Reinvestment",
          treasury_amt: "20% of Profits",
          treasury_note: "Builds post-pilot",
          total: "Total for Phase 1",
          total_note: "Covers approvals, build & ops"
      },
      contact: "Contact",
      rights: "Helios#Baghpat Initiative. All rights reserved."
  },
  howItWorks: {
      title: "Helios#Baghpat",
      subtitle: "A New Model for Rural India",
      desc: "Helios#Baghpat is a community-owned solar park. It uses free sunlight to run Bitcoin mining computers 24/7. All profits are shared monthly with 750 member-families and the landowner.",
      list: [
          "Zero electricity bill – 100% solar powered",
          "Surplus electricity given FREE to nearby schools & hospitals",
          "Landowner gets 7% of net profit (no rent model)",
          "Backed by UP Solar Policy (30% capital grant)",
          "Registered Section-8 non-profit company"
      ],
      steps: [
          { title: "1. Sun Powers All", desc: "500kW panels generate 8L units/yr" },
          { title: "2. Mining 24/7", desc: "ASICs earn BTC using free power" },
          { title: "3. Surplus Power", desc: "Free to schools & PHCs" },
          { title: "4. Monthly Profit", desc: "Shared with 1500 members" }
      ]
  },
  tiers: {
    title: "Membership Tiers",
    subtitle: "Secure your voting power and revenue share.",
    reserve: "Buy Now",
    sold_out: "Sold Out",
    header_tier: "Tier Plan",
    header_avail: "Available / Total",
    header_vote: "Vote Weight",
    header_price: "Price",
    items: [
        { name: "Tier 1", seats: 6, avail: 6, cost: 3162.50, votes: 64 },
        { name: "Tier 2", seats: 12, avail: 12, cost: 1581.25, votes: 32 },
        { name: "Tier 3", seats: 23, avail: 23, cost: 841.28, votes: 16 },
        { name: "Tier 4", seats: 47, avail: 47, cost: 420.64, votes: 8 },
        { name: "Tier 5", seats: 94, avail: 94, cost: 209.21, votes: 4 },
        { name: "Tier 6", seats: 189, avail: 189, cost: 139.52, votes: 2 },
        { name: "Tier 7", seats: 379, avail: 379, cost: 69.76, votes: 1 },
    ]
  },
  calc: {
    title: "Voting Power Calculator",
    subtitle: "Estimate your governance influence and stake.",
    currency_label: "Currency",
    contribution: "Tier Cost",
    votes: "Voting Power",
    est_yield: "Est. Annual Yield",
    roi_note: "Yields are estimates based on BTC price & mining difficulty."
  },
  roadmap: {
      title: "Revised Project Roadmap (v2.0)",
      subtitle: "Based on Current Status as of December 04, 2025",
      note: "Note: Milestone '3-Acre Land MOU Signed' is complete. Immediate focus is raising funds for land conversion approvals.",
      steps: [
          { time: "2025 Q4", phase: "Pre-Launch & DAO Setup", deliverables: ["DAO launched on 1WP DaPP", "Website & Community Live", "3-acre land MOU signed"], funding: "~$167.40 raised", capacity: "0 kW", profit: "–", status: "active" },
          { time: "2026 Q1", phase: "Funding & Approvals", deliverables: ["Fundraising for land conversion", "Apply for UPNEDA subsidy", "Final procurement contract", "First 200 Core seats sold"], funding: "167K–200K USDC", capacity: "0 kW", profit: "–", status: "upcoming" },
          { time: "2026 Q2", phase: "Pilot Build-Out", deliverables: ["Land prep & fencing", "50 kW Solar + 25 kW Mining", "Net-metering UPPCL", "First free power line"], funding: "200–250K USDC", capacity: "50 kW", profit: "Trial payout", status: "upcoming" },
          { time: "2026 Q3–Q4", phase: "First Revenue", deliverables: ["Full mining revenue", "Tax compliance", "Surplus power to 3 buildings", "Engineering for 200kW"], funding: "250–300K USDC", capacity: "100 kW", profit: "₹37k–45k/mo", status: "upcoming" },
          { time: "2027", phase: "Scale to 250 kW", deliverables: ["150 kW expansion", "Battery buffer", "Heat reuse pilot"], funding: "Reinvest", capacity: "250 kW", profit: "₹54k–69k/mo", status: "upcoming" },
          { time: "2028+", phase: "Full Scale & Growth", deliverables: ["500 kW Operational", "3 PH/s Hashrate", "Expansion to Park #2"], funding: "Self-sustaining", capacity: "500 kW+", profit: "₹68k–87k/mo", status: "upcoming" }
      ]
  },
  whitepaper: {
      title: "HeliosHash DAO — Whitepaper v1.0",
      abstract_title: "1. Abstract",
      abstract_text: "HeliosHash DAO (HHDAO) enables Indian citizens to co-own solar-powered Bitcoin mining parks. It delivers monthly INR profits, free electricity to rural schools, and revenue share to landowners.",
      vision_title: "2. Vision & Mission",
      vision_text: "To deploy 50 MW of community-owned infrastructure by 2030, creating income for 7,500 families.",
      why_title: "3. The India Opportunity",
      why_points: ["UP has high sunlight (5.5 kWh/m²)", "Bitcoin mining is legal (30% Tax)", "Zero energy cost with Solar", "Farmers need secondary income"],
      status_title: "4. Current Status",
      status_points: ["1WP DaPP Live", "3-acre Land MOU Signed", "Raising capital for approvals"],
      join_title: "Join the 750 Co-Owners",
      join_text: "We are selling lifetime ownership in real solar panels and miners that pay you monthly."
  },
  faq: {
      title: "Frequently Asked Questions",
      items: [
          { q: "Is Bitcoin mining legal in India?", a: "Yes. The Supreme Court overturned the RBI ban. Income is taxed at 30% flat." },
          { q: "What if BTC price crashes?", a: "We use free solar power. Even at low prices, the project remains profitable due to zero energy costs." },
          { q: "Can NRIs join?", a: "Yes – via NRO account and standard KYC procedures." },
          { q: "When is the first payout?", a: "Expected within 60 days of pilot live (April 2026)." }
      ]
  },
  modal: {
    title: "Select Payment Method",
    desc: "Choose how you want to contribute to the DAO.",
    upi: "Pay via UPI (INR)",
    crypto: "Crypto Wallet (USDC)",
    upi_desc: "Zero fees. Instant settlement via BHIM, GPay, PhonePe.",
    crypto_desc: "Pay using USDC on Polygon/ICP network.",
    pay_btn_upi: "Open UPI App to Pay",
    pay_btn_crypto: "Connect Wallet",
    scan_text: "Scan with BHIM, PhonePe, GPay, Paytm"
  }
};

const translations = {
  en: enTranslations,
  hi: { 
    nav: { whitepaper: "श्वेत पत्र", roadmap: "रोडमैप", dapp: "डैप", connect: "जुड़ें / भुगतान करें" }, 
    hero: { tag: "HeliosHash DAO", title: "सौर-संचालित बिटकॉइन माइनिंग पार्क", subtitle: "ग्रामीण भारत के लिए सूर्य की रोशनी को धन, नौकरियों और मुफ्त बिजली में बदलना।", cta: "मुख्य सदस्य बनें", waitlist: "550 स्थान शेष", badge_loc: "बागपत जिला, उत्तर प्रदेश", badge_cap: "750 सदस्यों की क्षमता" }, 
    stats: { capacity: "क्षमता लक्ष्य", members: "सामुदायिक मालिक", raised: "जुटाया गया फंड" }, 
    tabs: { overview: "अवलोकन", calculator: "कैलकुलेटर", pricing: "मूल्य निर्धारण", roadmap: "रोडमैप", whitepaper: "श्वेत पत्र", faq: "सामान्य प्रश्न" }, 
    common: { payment_note: "भुगतान USDC या UPI। कुल लक्ष्य: 300,000 USDC.", funding_summary: "फंडिंग सारांश", source: "स्रोत", target: "लक्ष्य राशि", notes: "टिप्पणियाँ", table: { dao_members: "750 DAO सदस्य", dao_note: "तेजी से भर रहा है।", subsidies: "सब्सिडी (UPNEDA)", subsidies_amt: "Capex का 30%", subsidies_note: "अनुमोदन लंबित", treasury: "कोषागार पुनर्निवेश", treasury_amt: "लाभ का 20%", treasury_note: "पायलट के बाद", total: "चरण 1 के लिए कुल", total_note: "संचालन शामिल" }, contact: "संपर्क करें", rights: "सर्वाधिकार सुरक्षित।" }, 
    howItWorks: { title: "ग्रामीण भारत के लिए नया मॉडल", subtitle: "HeliosHash बागपत एक सौर पार्क है।", desc: "HeliosHash बागपत मुफ्त धूप से बिटकॉइन माइनिंग करता है।", list: ["शून्य बिजली बिल", "मुफ्त बिजली", "जमीन मालिक को लाभ", "यूपी सौर नीति", "धारा-8 कंपनी"], steps: [{title: "सूर्य शक्ति", desc: "500kW"}, {title: "माइनिंग", desc: "ASIC"}, {title: "अधिशेष", desc: "मुफ्त"}, {title: "लाभ", desc: "साझा"}] }, 
    tiers: { 
        title: "सदस्यता श्रेणियाँ", 
        subtitle: "वोटिंग शक्ति सुरक्षित करें।", 
        reserve: "अभी शामिल हों", 
        sold_out: "बिक गया", 
        header_tier: "श्रेणी", 
        header_avail: "उपलब्ध", 
        header_vote: "वोट", 
        header_price: "मूल्य", 
        items: enTranslations.tiers.items 
    }, 
    calc: { title: "कैलकुलेटर", subtitle: "अनुमान लगाएं", currency_label: "मुद्रा", contribution: "लागत", votes: "शक्ति", est_yield: "वार्षिक उपज", roi_note: "अनुमानित" }, 
    roadmap: { title: "रोडमैप", subtitle: "स्थिति", note: "नोट", steps: [] }, 
    whitepaper: { title: "श्वेत पत्र", abstract_title: "सार", abstract_text: "HeliosHash...", vision_title: "दृष्टि", vision_text: "...", why_title: "क्यों", why_points: [], status_title: "स्थिति", status_points: [], join_title: "शामिल हों", join_text: "..." }, 
    faq: { title: "प्रश्न", items: [] }, 
    modal: { title: "भुगतान", desc: "चुनें", upi: "UPI", crypto: "Crypto", upi_desc: "Zero fees", crypto_desc: "Polygon", pay_btn_upi: "Pay UPI", pay_btn_crypto: "Connect", scan_text: "Scan" } 
  },
  mr: enTranslations,
  gu: enTranslations,
  ta: enTranslations,
  ml: enTranslations,
};

type LanguageKey = keyof typeof translations;

// --- Helper Functions ---

const formatCurrency = (amountUSDC: number, currency: CurrencyKey) => {
  const info = CURRENCY_RATES[currency];
  const val = amountUSDC * info.rate;
  return val.toLocaleString(undefined, { 
    minimumFractionDigits: 0,
    maximumFractionDigits: info.decimals 
  });
};

// --- Core UI Components ---

// Tabs Components
const TabsContext = React.createContext<{ value: string; onValueChange: (v: string) => void }>({ value: "", onValueChange: () => {} });

const Tabs: React.FC<{ value: string; onValueChange: (v: string) => void; children?: React.ReactNode; className?: string }> = ({ value, onValueChange, children, className }) => (
  <TabsContext.Provider value={{ value, onValueChange }}>
    <div className={`w-full ${className}`}>{children}</div>
  </TabsContext.Provider>
);

const TabsList: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`flex overflow-x-auto no-scrollbar gap-1 p-1.5 bg-[#0F121C]/90 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] ${className}`}>
    {children}
  </div>
);

const TabsTrigger: React.FC<{ value: string; children?: React.ReactNode; icon?: any; className?: string }> = ({ value, children, icon: Icon, className }) => {
  const { value: activeValue, onValueChange } = React.useContext(TabsContext);
  const isActive = activeValue === value;
  
  return (
    <button
      onClick={() => onValueChange(value)}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap relative ${
        isActive ? "text-white shadow-lg" : "text-gray-500 hover:text-white hover:bg-white/5"
      } ${className}`}
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      {Icon && <Icon size={18} className={`relative z-10 ${isActive ? "text-orange-400 drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]" : ""}`} />}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

// Table Components
const Table: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`overflow-x-auto bg-[#0A0C14] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] ${className}`}>
    <table className="w-full text-left border-collapse">{children}</table>
  </div>
);

const TableHeader: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => (
  <thead className={`bg-blue-900/10 text-xs uppercase text-gray-400 tracking-wider ${className}`}>
    {children}
  </thead>
);

const TableBody: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => (
  <tbody className={`divide-y divide-white/5 ${className}`}>
    {children}
  </tbody>
);

const TableRow: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => (
  <tr className={`transition-colors hover:bg-white/5 ${className}`}>
    {children}
  </tr>
);

const TableHead: React.FC<{ children?: React.ReactNode; className?: string; align?: "left" | "center" | "right" }> = ({ children, className, align = "left" }) => (
  <th className={`py-5 px-6 font-bold text-${align} ${className}`}>{children}</th>
);

const TableCell: React.FC<{ children?: React.ReactNode; className?: string; align?: "left" | "center" | "right" }> = ({ children, className, align = "left" }) => (
  <td className={`py-5 px-6 text-${align} ${className}`}>{children}</td>
);


// --- Feature Components ---

const ProgressBar = ({ current, total, colorClass = "bg-orange-500" }: { current: number; total: number; colorClass?: string }) => {
  const percentage = Math.min((current / total) * 100, 100);
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-2">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`h-full ${colorClass} shadow-[0_0_10px_currentColor]`}
      />
    </div>
  );
};

// Updated StatCard with Theme Support
const StatCard = ({ icon: Icon, label, value, subtext, progress, theme = 'orange' }: { icon: any; label: string; value: string; subtext?: string; progress?: { current: number, total: number }, theme?: 'orange' | 'blue' | 'green' }) => {
  const themes = {
    orange: {
      bg: "hover:shadow-orange-500/10",
      gradient: "from-orange-500/10",
      iconBg: "from-orange-500/20 to-yellow-500/10 text-orange-400 border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)]",
      bar: "bg-gradient-to-r from-orange-500 to-yellow-400",
      subtext: "text-orange-400/80"
    },
    blue: {
      bg: "hover:shadow-blue-500/10",
      gradient: "from-blue-500/10",
      iconBg: "from-blue-500/20 to-cyan-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
      bar: "bg-gradient-to-r from-blue-500 to-cyan-400",
      subtext: "text-blue-400/80"
    },
    green: {
      bg: "hover:shadow-green-500/10",
      gradient: "from-green-500/10",
      iconBg: "from-green-500/20 to-emerald-500/10 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]",
      bar: "bg-gradient-to-r from-green-500 to-emerald-400",
      subtext: "text-green-400/80"
    }
  };
  
  const t = themes[theme];

  // Logic to prevent 100% display if not actually complete
  let displayPercent = "0";
  if (progress) {
      if (progress.current >= progress.total) {
          displayPercent = "100";
      } else {
          const ratio = progress.current / progress.total;
          const percentVal = ratio * 100;
          
          if (percentVal > 99) {
             // For 99.1% to 99.99...%, show decimals
             displayPercent = percentVal.toFixed(1);
             // Ensure rounding didn't push it to 100.0
             if (displayPercent === "100.0" || displayPercent === "100") {
                 displayPercent = "99.9";
             }
          } else {
             // For standard values, round normally
             displayPercent = Math.round(percentVal).toString();
          }
      }
  }

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-black/40 border border-white/10 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group shadow-lg ${t.bg} transition-all duration-300`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">{label}</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight drop-shadow-lg">{value}</h3>
          {subtext && <p className={`text-xs mt-1 font-medium ${t.subtext}`}>{subtext}</p>}
        </div>
        <div className={`p-3 bg-gradient-to-br rounded-xl border ${t.iconBg}`}>
          <Icon size={24} />
        </div>
      </div>
      {progress && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1 font-mono">
            <span>Progress</span>
            <span>{displayPercent}%</span>
          </div>
          <ProgressBar current={progress.current} total={progress.total} colorClass={t.bar} />
        </div>
      )}
    </motion.div>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-8 relative">
    <h2 className="text-3xl font-bold brand-font text-white mb-2 inline-block relative z-10">
      {title}
      <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></span>
    </h2>
    {subtitle && <p className="text-gray-400 max-w-2xl mt-2">{subtitle}</p>}
  </div>
);

const PaymentModal = ({ isOpen, onClose, lang }: { isOpen: boolean; onClose: () => void; lang: LanguageKey }) => {
  const [method, setMethod] = useState<'upi' | 'crypto'>('upi');
  const t = translations[lang];

  // UPI Intent Link
  const upiId = "heliosdao@upi";
  const upiName = "HeliosHashDAO";
  const upiLink = `upi://pay?pa=${upiId}&pn=${upiName}&cu=INR`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-[#0F121C] border border-orange-500/20 rounded-3xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.15)]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div>
                <h3 className="text-xl font-bold text-white">{t.modal.title}</h3>
                <p className="text-sm text-gray-400">{t.modal.desc}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex p-2 gap-2 bg-black/40 m-6 mb-0 rounded-xl border border-white/5">
              <button 
                onClick={() => setMethod('upi')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${method === 'upi' ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-900/50' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <Smartphone size={16} /> UPI (INR)
              </button>
              <button 
                onClick={() => setMethod('crypto')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${method === 'crypto' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-900/50' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <Wallet size={16} /> Crypto (USDC)
              </button>
            </div>

            {/* Content */}
            <div className="p-6 pt-4">
              {method === 'upi' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center">
                  <div className="bg-white p-4 rounded-2xl inline-block mx-auto border-4 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                     <QrCode size={140} className="text-black" />
                  </div>
                  <p className="text-gray-300 text-sm font-medium">{t.modal.scan_text}</p>
                  
                  <div className="bg-black/40 rounded-xl p-3 border border-white/10 flex items-center justify-between">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">VPA ID</span>
                    <span className="font-mono text-orange-400 font-bold tracking-wide">{upiId}</span>
                  </div>

                  <div className="text-left bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 mt-4">
                    <h5 className="text-orange-400 text-sm font-bold flex items-center gap-2">
                       <CheckCircle2 size={14} /> {t.modal.upi}
                    </h5>
                    <p className="text-xs text-gray-400 mt-1">{t.modal.upi_desc}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  
                  <div className="text-center mb-6">
                    <h4 className="text-white font-bold text-lg">Please connect your wallet</h4>
                    <p className="text-gray-400 text-xs mt-1">Please connect your wallet to move forward</p>
                  </div>

                  <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                     <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-3 text-left">Wallets supported with 1WP</p>
                     
                     <div className="space-y-2">
                        <button className="w-full flex items-center justify-between p-3 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 transition-all group">
                           <span className="flex items-center gap-3 font-bold text-sm text-blue-100">
                             <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                               <Wallet size={16} className="text-white" />
                             </div>
                             Wallet Connect
                           </span>
                           <ChevronRight size={16} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button className="w-full flex items-center justify-between p-3 rounded-lg bg-orange-600/10 hover:bg-orange-600/20 border border-orange-500/20 transition-all group">
                           <span className="flex items-center gap-3 font-bold text-sm text-orange-100">
                             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-orange-500/30 overflow-hidden p-1">
                               <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MM" className="w-full h-full object-contain" /> 
                             </div>
                             MetaMask
                           </span>
                           <ChevronRight size={16} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                           <span className="flex items-center gap-3 font-bold text-sm text-gray-300">
                             <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                               <ScanLine size={16} />
                             </div>
                             Multi-Option QR Code
                           </span>
                           <ChevronRight size={16} className="text-gray-500 group-hover:translate-x-1 transition-transform" />
                        </button>
                     </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/40">
              {method === 'upi' ? (
                 <a 
                   href={upiLink}
                   className={`block text-center w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-orange-600/20 transform active:scale-95 transition-all bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500`}
                 >
                   {t.modal.pay_btn_upi}
                 </a>
              ) : (
                <p className="text-center text-[10px] text-gray-500 mt-1 font-medium tracking-wide">
                  Standard network gas fees apply for transactions.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const EcosystemInfographic = () => {
  return (
    <div className="w-full py-12 relative overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>

       <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto items-center justify-items-center">
          {/* Step 1: Sun */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_40px_rgba(234,179,8,0.4)] flex items-center justify-center relative">
              <Sun size={40} className="text-white animate-spin-slow" />
              <div className="absolute inset-0 rounded-full border border-white/20 scale-125 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
          </motion.div>

          {/* Step 2: Mining */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center text-center group"
          >
             <div className="w-20 h-20 rounded-2xl bg-black border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] flex items-center justify-center relative">
                <Cpu size={32} className="text-blue-400" />
             </div>
          </motion.div>

          {/* Step 3: DAO Treasury */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-20 h-20 rounded-2xl bg-black border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)] flex items-center justify-center relative">
               <Coins size={32} className="text-green-400" />
            </div>
          </motion.div>
       </div>
    </div>
  )
}

const ROICalculator = ({ lang, currency }: { lang: LanguageKey, currency: CurrencyKey }) => {
  const [selectedTierIndex, setSelectedTierIndex] = useState(6); // Default to Tier 7
  
  const t = translations[lang];
  const items = t.tiers.items;
  const current = items[selectedTierIndex];

  // Calculations based on currency
  const currencyInfo = CURRENCY_RATES[currency];
  const formattedCost = formatCurrency(current.cost, currency);
  
  // Estimate yield value (approx 24% of cost)
  const estimatedYieldValue = formatCurrency(current.cost * 0.24, currency);

  return (
    <div className="bg-[#0A0C14] border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-green-500/10 transition-colors duration-500"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 relative z-10">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <Calculator className="text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" /> {t.calc.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1 font-medium">{t.calc.subtitle}</p>
        </div>
        
        {/* Tier Selector Dropdown */}
        <div className="relative w-full md:w-auto">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Award size={14} />
           </div>
           <select 
             className="appearance-none bg-black/40 border border-white/20 text-white py-2 pl-9 pr-10 rounded-xl font-bold focus:outline-none focus:border-green-500 transition-colors cursor-pointer w-full"
             value={selectedTierIndex}
             onChange={(e) => setSelectedTierIndex(Number(e.target.value))}
           >
              {items.map((item, idx) => (
                <option key={idx} value={idx}>{item.name}</option>
              ))}
           </select>
           <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
             <ChevronRight size={16} className="rotate-90" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center relative z-10">
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 shadow-lg">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">{t.calc.contribution}</p>
          <p className="text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-1">
            {currencyInfo.symbol} {formattedCost}
          </p>
        </div>
        <div className="bg-green-500/5 rounded-2xl p-5 border border-green-500/10 shadow-[0_0_15px_rgba(74,222,128,0.05)]">
          <p className="text-green-500/60 text-[10px] uppercase tracking-widest font-bold mb-2">{t.calc.votes}</p>
          <p className="text-xl font-bold text-green-400 tracking-tight">{current.votes} PTS</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-2xl p-5 border border-green-500/20 shadow-[0_0_20px_rgba(74,222,128,0.1)] relative overflow-hidden">
          <p className="text-green-400 text-[10px] uppercase tracking-widest font-bold mb-2">{t.calc.est_yield}</p>
          <p className="text-xl font-bold text-white tracking-tight">~18-24%</p>
          <p className="text-[10px] text-green-300/70 mt-1 font-mono">
            ~ {currencyInfo.symbol} {estimatedYieldValue} / yr
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center bg-white/5 rounded-xl p-4 border border-white/5 backdrop-blur-sm">
         <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
           <AlertTriangle size={12} className="text-yellow-500" />
           {t.calc.roi_note}
         </p>
      </div>
    </div>
  );
};

const DetailedRoadmapItem: React.FC<{ 
  time: string; 
  phase: string; 
  deliverables: string[]; 
  funding: string; 
  capacity: string; 
  profit: string;
  status?: "done" | "active" | "upcoming";
}> = ({ 
  time, 
  phase, 
  deliverables, 
  funding, 
  capacity, 
  profit, 
  status = "upcoming" 
}) => {
  const styles = {
    done: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      text: "text-green-400",
      icon: CheckCircle2,
      dot: "bg-green-500 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.6)]",
      line: "from-green-500 to-green-500/20"
    },
    active: {
      bg: "bg-gradient-to-r from-orange-500/10 to-transparent",
      border: "border-orange-500/50",
      text: "text-orange-400",
      icon: Clock,
      dot: "bg-orange-500 border-orange-300 shadow-[0_0_20px_rgba(249,115,22,0.8)] animate-pulse",
      line: "from-orange-500 to-transparent"
    },
    upcoming: {
      bg: "bg-white/5",
      border: "border-white/10",
      text: "text-gray-500",
      icon: CircleDashed,
      dot: "bg-gray-800 border-gray-600",
      line: "from-gray-700 to-gray-800"
    }
  };

  const currentStyle = styles[status];
  const StatusIcon = currentStyle.icon;

  return (
    <div className="relative pl-8 md:pl-16 py-8 group">
      {/* Connector Line */}
      <div className={`absolute left-[0px] md:left-[9px] top-12 bottom-[-32px] w-[2px] bg-gradient-to-b ${status === 'upcoming' ? 'from-white/10 to-transparent' : currentStyle.line} z-0 opacity-50`} />
      
      {/* Timeline Dot */}
      <div className={`absolute left-[-7px] md:left-[2px] top-8 w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 ${currentStyle.dot}`} />
      
      {/* Content Card */}
      <div className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 backdrop-blur-sm ${currentStyle.bg} ${currentStyle.border} ${status === 'active' ? 'shadow-[0_0_30px_rgba(249,115,22,0.15)] transform scale-[1.02]' : 'hover:bg-white/[0.07]'}`}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
             <span className={`text-xl font-mono font-bold tracking-tight ${status === 'upcoming' ? 'text-gray-500' : 'text-white'}`}>{time}</span>
             <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${currentStyle.border} ${currentStyle.text} bg-black/40 shadow-inner`}>
                <StatusIcon size={12} />
                <span>{status === "active" ? "In Progress" : status}</span>
             </div>
          </div>
          <div className="text-xs text-gray-400 bg-black/40 px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
             <Zap size={12} className={status === 'upcoming' ? 'text-gray-600' : 'text-yellow-400'}/>
             Capacity: <span className="text-white font-semibold">{capacity}</span>
          </div>
        </div>
        
        <h3 className={`text-2xl font-bold mb-6 ${status === 'upcoming' ? 'text-gray-500' : 'text-white'}`}>{phase}</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
              <Layers size={14} className={currentStyle.text}/> Key Deliverables
            </h4>
            <ul className="grid sm:grid-cols-2 gap-3">
              {deliverables.map((item, i) => (
                <li key={i} className={`text-sm flex items-start gap-3 p-3 rounded-lg ${status === 'active' ? 'bg-orange-500/5 border border-orange-500/10' : 'bg-white/5 border border-white/5'}`}>
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${status === 'done' ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]' : status === 'active' ? 'bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.8)]' : 'bg-gray-600'}`} />
                  <span className="text-gray-300 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 bg-black/40 p-5 rounded-xl border border-white/5 h-fit">
             <div>
               <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Funding / Status</p>
               <p className="text-sm font-bold text-white tracking-wide">{funding}</p>
             </div>
             <div className="pt-3 border-t border-white/5">
               <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Est. Net Profit</p>
               <p className={`text-sm font-bold ${status === 'upcoming' ? 'text-gray-500' : 'text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.3)]'}`}>{profit}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WhitepaperSection = ({ title, children, icon: Icon }: { title: string; children?: React.ReactNode; icon?: any }) => (
  <div className="bg-[#0A0C14] border border-white/10 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden shadow-lg group hover:border-white/20 transition-colors">
     {/* Decorative Corner */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none"></div>
    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20"></div>

    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
      <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-orange-400 group-hover:text-orange-300 transition-colors">
        {Icon && <Icon size={20} />}
      </div>
      {title}
    </h3>
    <div className="text-gray-300 space-y-4 leading-relaxed relative z-10 font-light">
      {children}
    </div>
  </div>
);

const WhitepaperTable = ({ headers, rows }: { headers: string[], rows: (string|React.ReactNode)[][] }) => (
  <Table className="my-6">
    <TableHeader>
      <TableRow>
        {headers.map((h, i) => (
          <TableHead key={i}>{h}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map((row, i) => (
        <TableRow key={i}>
          {row.map((cell, j) => (
            <TableCell key={j} className="text-gray-400 font-medium">{cell}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);


// --- Main App ---

export default function HHDAOLanding() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [language, setLanguage] = useState<LanguageKey>('en');
  const [currency, setCurrency] = useState<CurrencyKey>('USDC');

  const t = translations[language];
  const currencyInfo = CURRENCY_RATES[currency];

  const DAPP_LINK = "https://dapp.oneworldproject.io/daodetail/UrgamUSmartCity";
  const DISCORD_LINK = "https://discord.gg/6P8ghYvW";

  const tabs = [
    { id: "overview", label: t.tabs.overview, icon: Globe },
    { id: "calculator", label: t.tabs.calculator, icon: Calculator },
    { id: "tiers", label: t.tabs.pricing, icon: Award },
    { id: "roadmap", label: t.tabs.roadmap, icon: Layers },
    { id: "whitepaper", label: t.tabs.whitepaper, icon: FileText },
    { id: "faq", label: t.tabs.faq, icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden font-sans selection:bg-orange-500/30">
      
      <PaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} lang={language} />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute transition-all duration-1000 -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[150px] mix-blend-screen animate-pulse`} />
        <div className={`absolute transition-all duration-1000 top-[10%] right-[0%] w-[40%] h-[40%] bg-green-900/10 rounded-full blur-[120px] mix-blend-screen`} />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-orange-900/10 rounded-full blur-[180px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#050505]/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-yellow-500 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.4)]`}>
              <Sun className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold brand-font tracking-wide text-white">HeliosHash DAO</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
             {/* Currency Switcher */}
             <div className="relative group">
                <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white px-3 py-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                  <RefreshCcw size={16} /> <span className="font-mono font-bold text-orange-400">{currency}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-32 bg-[#0F121C] border border-white/10 rounded-xl shadow-2xl overflow-hidden hidden group-hover:block z-50">
                  {Object.keys(CURRENCY_RATES).map((c) => (
                    <button 
                      key={c} 
                      onClick={() => setCurrency(c as CurrencyKey)}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${currency === c ? 'text-orange-400 font-bold' : 'text-gray-400'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
             </div>

             {/* Language Switcher */}
             <div className="relative group">
                <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white px-3 py-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                  <Languages size={16} /> <span className="uppercase font-medium">{language}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-40 bg-[#0F121C] border border-white/10 rounded-xl shadow-2xl overflow-hidden hidden group-hover:block z-50">
                  {(Object.keys(translations) as LanguageKey[]).map((l) => (
                    <button 
                      key={l} 
                      onClick={() => setLanguage(l)}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${language === l ? 'text-orange-400 font-bold' : 'text-gray-400'}`}
                    >
                      {l === 'en' ? 'English' : 
                       l === 'hi' ? 'हिंदी' : 
                       l === 'mr' ? 'मराठी' :
                       l === 'gu' ? 'ગુજરાતી' :
                       l === 'ta' ? 'தமிழ்' : 'മലയാളം'}
                    </button>
                  ))}
                </div>
             </div>

             <a href={DAPP_LINK} target="_blank" rel="noreferrer" className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-2">{t.nav.dapp}</a>
             
             <button onClick={() => setShowPaymentModal(true)} className="ml-2 bg-white text-black hover:bg-gray-100 px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transform hover:scale-105 active:scale-95">
               {t.nav.connect}
             </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/10 bg-[#0b0f19] overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-4">
                <div className="flex gap-2 mb-2 overflow-x-auto pb-2 no-scrollbar">
                   {Object.keys(CURRENCY_RATES).map((c) => (
                      <button 
                        key={c} 
                        onClick={() => setCurrency(c as CurrencyKey)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${currency === c ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-white/10 text-gray-400 bg-white/5'}`}
                      >
                        {c}
                      </button>
                   ))}
                </div>
                <div className="flex gap-2 mb-2 overflow-x-auto pb-2 no-scrollbar">
                   {(Object.keys(translations) as LanguageKey[]).map((l) => (
                      <button 
                        key={l} 
                        onClick={() => setLanguage(l)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${language === l ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-white/10 text-gray-400 bg-white/5'}`}
                      >
                        {l.toUpperCase()}
                      </button>
                   ))}
                </div>
                <a href={DAPP_LINK} className="text-gray-400 font-medium px-2">{t.nav.dapp}</a>
                <button onClick={() => { setActiveTab("whitepaper"); setMobileMenuOpen(false); }} className="text-gray-400 font-medium text-left px-2">
                  {t.nav.whitepaper}
                </button>
                <button onClick={() => { setActiveTab("roadmap"); setMobileMenuOpen(false); }} className="text-gray-400 font-medium text-left px-2">
                  {t.nav.roadmap}
                </button>
                <button onClick={() => { setShowPaymentModal(true); setMobileMenuOpen(false); }} className={`w-full py-3.5 rounded-xl font-bold text-center bg-gradient-to-r from-orange-500 to-yellow-500 text-black shadow-lg`}>
                  {t.nav.connect}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 py-12 md:py-20 w-full max-w-7xl mx-auto">
        
        {/* Helios#Baghpat Hero */}
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-16 w-full"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6">
              <a href="https://www.oneworldproject.io/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-500/20 transition-colors">
                <Globe size={10} /> A One World Project Initiative
              </a>
               <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                <Sun size={10} /> Helios#Baghpat
              </span>
              <span className="inline-block py-1 px-3 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold tracking-widest uppercase">
                {t.hero.badge_loc || "Launching Q1 2026"}
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold leading-tight brand-font bg-clip-text text-transparent bg-gradient-to-b from-white via-orange-100 to-orange-400 drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed font-light">
              {t.hero.subtitle} <br/>
              <span className="text-white font-medium">{t.hero.badge_loc}</span> • <span className="text-blue-400">{t.hero.badge_cap}</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <button onClick={() => { setActiveTab('tiers'); setShowPaymentModal(true); }} className="cursor-pointer w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 rounded-full font-bold shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-black text-lg">
                {t.hero.cta} <ChevronRight size={20} />
              </button>
              <div className="flex items-center gap-3 text-sm text-gray-400 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                {t.hero.waitlist}
              </div>
            </div>
          </motion.div>

          {/* Baghpat Stats - Updated with actuals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-24">
            <StatCard icon={Sun} label={t.stats.capacity} value="50 MW" subtext="Target by 2030" progress={{ current: 0.05, total: 50 }} theme="orange" />
            <StatCard icon={Users} label={t.stats.members} value="2 / 750" subtext="Early Adopters Joined" progress={{ current: 2, total: 750 }} theme="blue" />
            <StatCard 
              icon={TrendingUp} 
              label={t.stats.raised} 
              value={`${currencyInfo.symbol} ${formatCurrency(167.4, currency)} / ${currencyInfo.symbol} ${formatCurrency(300000, currency)}`}
              subtext="< 0.1% Funded"
              progress={{ current: 167.4, total: 300000 }} 
              theme="green" 
            />
          </div>

        {/* Custom Tab Navigation */}
        <div className="w-full mb-12 sticky top-24 z-40 flex justify-center">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
             <TabsList>
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} icon={tab.icon}>
                    {tab.label}
                  </TabsTrigger>
                ))}
             </TabsList>
          </Tabs>
        </div>

        {/* Tab Content Areas */}
        <div className="w-full min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >

              {activeTab === "overview" && (
                <div className="space-y-12 max-w-6xl mx-auto">
                   
                   <EcosystemInfographic />

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                     <div className="bg-[#0A0C14] border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group hover:border-blue-500/30 transition-colors duration-500">
                        {/* Glow Effect */}
                       <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/20 transition-colors"></div>
                       
                       <SectionTitle title={t.howItWorks.title} subtitle={t.howItWorks.subtitle} />
                       <div className="space-y-6 text-gray-300 relative z-10">
                         <p className="text-lg leading-relaxed font-light">{t.howItWorks.desc}</p>
                         <ul className="space-y-4 mt-6">
                           {t.howItWorks.list.map((item, i) => (
                             <li key={i} className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                               <div className="mt-1 p-1 rounded-full bg-green-500/20 text-green-400">
                                 <CheckCircle2 size={16} />
                               </div>
                               <span className="text-sm font-medium">{item}</span>
                             </li>
                           ))}
                         </ul>
                       </div>
                     </div>
                     
                     <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center">
                       <div className="absolute top-0 right-0 p-4 bg-gradient-to-bl from-orange-600/30 to-transparent text-orange-300 text-[10px] font-bold tracking-widest uppercase border-b border-l border-white/10 rounded-bl-2xl">HOW IT WORKS</div>
                       <div className="grid grid-cols-2 gap-6 mt-4">
                          {t.howItWorks.steps.map((step, i) => {
                             const icons = [Sun, Pickaxe, Landmark, Wallet];
                             const StepIcon = icons[i];
                             const colors = ["text-yellow-400 from-yellow-500/20 to-yellow-500/5", "text-blue-400 from-blue-500/20 to-blue-500/5", "text-green-400 from-green-500/20 to-green-500/5", "text-purple-400 from-purple-500/20 to-purple-500/5"];
                             return (
                                <motion.div 
                                  whileHover={{ y: -5 }}
                                  key={i} 
                                  className={`p-6 bg-gradient-to-br ${colors[i].split(" ")[1]} rounded-2xl text-center border border-white/10 shadow-lg`}
                                >
                                    <div className={`mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-black/40 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.3)]`}>
                                      <StepIcon className={`${colors[i].split(" ")[0]} w-6 h-6 drop-shadow-md`} />
                                    </div>
                                    <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-2">{step.title}</h4>
                                    <p className="text-xs text-gray-400 leading-snug">{step.desc}</p>
                                </motion.div>
                             )
                          })}
                       </div>
                     </div>
                   </div>
                </div>
              )}

              {activeTab === "calculator" && (
                <div className="max-w-5xl mx-auto mt-4">
                  <ROICalculator lang={language} currency={currency} />
                </div>
              )}

              {activeTab === "tiers" && (
                <div className="max-w-6xl mx-auto">
                   <div className="text-center mb-12 flex flex-col items-center">
                     <SectionTitle title={t.tiers.title} subtitle={t.tiers.subtitle} />
                     
                     <div className="flex items-center gap-2 bg-blue-900/20 px-4 py-2 rounded-full border border-blue-500/20">
                        <RefreshCcw size={14} className="text-blue-400" />
                        <span className="text-sm text-gray-400">Pricing in:</span>
                        <select 
                          className="bg-transparent text-blue-400 font-bold focus:outline-none cursor-pointer"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value as CurrencyKey)}
                        >
                          {Object.keys(CURRENCY_RATES).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                     </div>
                   </div>
                   
                   {/* Data Table for 7 Tiers */}
                   <Table>
                     <TableHeader>
                       <TableRow>
                         <TableHead>{t.tiers.header_tier}</TableHead>
                         <TableHead>{t.tiers.header_avail}</TableHead>
                         <TableHead align="right">{t.tiers.header_vote}</TableHead>
                         <TableHead align="right">{t.tiers.header_price} ({currencyInfo.symbol})</TableHead>
                         <TableHead align="center">Action</TableHead>
                       </TableRow>
                     </TableHeader>
                     <TableBody>
                       {t.tiers.items.map((tier, idx) => {
                         const isSoldOut = tier.avail === 0;
                         const isAvailable = tier.avail > 0;
                         return (
                           <TableRow key={idx} className={!isAvailable ? 'opacity-60 grayscale-[0.5]' : 'hover:bg-blue-500/5'}>
                             <TableCell className={`font-bold text-white ${isAvailable ? 'group-hover:text-blue-400' : ''}`}>
                               {tier.name}
                             </TableCell>
                             <TableCell>
                               <div className="flex items-center gap-2">
                                 <div className={`w-2 h-2 rounded-full ${isSoldOut ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></div>
                                 <span className={`text-sm ${isSoldOut ? 'text-gray-500' : 'text-green-400 font-bold'}`}>
                                   {tier.avail} / {tier.seats}
                                 </span>
                               </div>
                             </TableCell>
                             <TableCell align="right" className="font-mono text-gray-300">
                               {tier.votes} PTS
                             </TableCell>
                             <TableCell align="right" className="font-bold text-white font-mono">
                               {formatCurrency(tier.cost, currency)}
                             </TableCell>
                             <TableCell align="center">
                               {isSoldOut ? (
                                 <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-gray-500 text-xs font-bold border border-white/5">
                                   {t.tiers.sold_out}
                                 </span>
                               ) : (
                                 <button 
                                   onClick={() => setShowPaymentModal(true)}
                                   className="px-6 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white text-xs font-bold shadow-lg shadow-green-900/50 transform active:scale-95 transition-all"
                                 >
                                   {t.tiers.reserve}
                                 </button>
                               )}
                             </TableCell>
                           </TableRow>
                         );
                       })}
                     </TableBody>
                   </Table>

                   <p className="text-center text-xs text-gray-500 mt-10 opacity-70 max-w-lg mx-auto border-t border-white/5 pt-4">{t.common.payment_note}</p>
                </div>
              )}

              {activeTab === "roadmap" && (
                <div className="max-w-5xl mx-auto space-y-16">
                  <div className="text-center">
                    <SectionTitle title={t.roadmap.title} subtitle={t.roadmap.subtitle} />
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">{t.hero.badge_loc}</span>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">{t.hero.badge_cap}</span>
                    </div>
                    <p className="text-sm text-orange-400/80 italic max-w-2xl mx-auto bg-orange-500/5 p-3 rounded-xl border border-orange-500/10">
                      {t.roadmap.note}
                    </p>
                  </div>

                  <div className="space-y-0 relative border-l border-white/5 ml-4 md:ml-0">
                    {t.roadmap.steps.map((item, i) => (
                      <DetailedRoadmapItem 
                        key={i} 
                        time={item.time}
                        phase={item.phase}
                        deliverables={item.deliverables}
                        funding={item.funding}
                        capacity={item.capacity}
                        profit={item.profit}
                        status={item.status as "active" | "upcoming" | "done"}
                      />
                    ))}
                  </div>

                  {/* Funding Summary */}
                  <div className="bg-[#0A0C14] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10">
                      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                          <Wallet size={24} />
                        </div>
                        {t.common.funding_summary}
                      </h3>
                      
                      <a href={DISCORD_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-bold transition-all shadow-lg transform hover:-translate-y-0.5">
                         <MessageCircle size={18} /> Join Discord
                      </a>
                    </div>
                    
                    <div className="relative z-10">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="tracking-wider">{t.common.source}</TableHead>
                            <TableHead className="tracking-wider">{t.common.target}</TableHead>
                            <TableHead className="tracking-wider">{t.common.notes}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="text-sm bg-black/20">
                          <TableRow>
                            <TableCell className="text-white font-bold">{t.common.table.dao_members}</TableCell>
                            <TableCell className="text-white">{formatCurrency(300000, currency)}</TableCell>
                            <TableCell className="text-gray-400">{t.common.table.dao_note}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-white font-bold">{t.common.table.subsidies}</TableCell>
                            <TableCell className="text-white">{t.common.table.subsidies_amt}</TableCell>
                            <TableCell className="text-gray-400">{t.common.table.subsidies_note}</TableCell>
                          </TableRow>
                           <TableRow>
                            <TableCell className="text-white font-bold">{t.common.table.treasury}</TableCell>
                            <TableCell className="text-white">{t.common.table.treasury_amt}</TableCell>
                            <TableCell className="text-gray-400">{t.common.table.treasury_note}</TableCell>
                          </TableRow>
                          <TableRow className="bg-orange-500/5 font-bold border-t-2 border-orange-500/20">
                            <TableCell className="text-orange-400">{t.common.table.total}</TableCell>
                            <TableCell className="text-orange-400">{formatCurrency(300000, currency)}</TableCell>
                            <TableCell className="text-orange-400/80 font-normal italic">{t.common.table.total_note}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "whitepaper" && (
                <div className="max-w-5xl mx-auto space-y-12">
                  {/* ... Whitepaper content remains the same ... */}
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-3 brand-font tracking-wide">{t.whitepaper.title}</h2>
                    <div className="inline-block px-4 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 font-medium text-sm">
                      A One World Project (1WP) SubDAO • December 2025
                    </div>
                  </div>

                  <WhitepaperSection title={t.whitepaper.abstract_title} icon={FileText}>
                    <p className="text-lg">{t.whitepaper.abstract_text}</p>
                    <div className="mt-6 p-6 bg-black/40 rounded-xl border-l-4 border-orange-500 shadow-inner">
                      <p className="font-bold text-white mb-4 uppercase text-xs tracking-widest">Flagship Pilot – Helios#Baghpat:</p>
                      <ul className="space-y-3 text-sm text-gray-400">
                        {t.whitepaper.status_points.map((pt, i) => (
                           <li key={i} className="flex items-start gap-3">
                             <CheckCircle2 size={16} className="text-green-400 mt-0.5 shrink-0"/> 
                             <span className="leading-snug">{pt}</span>
                           </li>
                        ))}
                      </ul>
                    </div>
                  </WhitepaperSection>

                  <div className="grid md:grid-cols-2 gap-8">
                    <WhitepaperSection title={t.whitepaper.vision_title} icon={Globe}>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Vision</h4>
                          <p className="text-white font-medium">{t.whitepaper.vision_text}</p>
                        </div>
                        <div className="w-full h-px bg-white/5"></div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Mission</h4>
                          <ul className="space-y-2 list-disc pl-4 text-sm text-gray-400 marker:text-orange-500">
                             <li>Make Indians co-owners of clean-energy assets</li>
                             <li>Prove decentralized governance + free solar power model</li>
                             <li>Deliver 200–300% ROI while giving surplus for social good</li>
                          </ul>
                        </div>
                      </div>
                    </WhitepaperSection>

                    <WhitepaperSection title={t.whitepaper.why_title} icon={Zap}>
                      <ul className="grid gap-3 text-sm">
                        <li className="p-4 bg-white/5 rounded-xl flex gap-4 items-center border border-white/5 hover:bg-white/10 transition-colors">
                          <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400"><Sun size={20}/></div>
                          {t.whitepaper.why_points[0]}
                        </li>
                        <li className="p-4 bg-white/5 rounded-xl flex gap-4 items-center border border-white/5 hover:bg-white/10 transition-colors">
                          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Gavel size={20}/></div>
                          {t.whitepaper.why_points[1]}
                        </li>
                        <li className="p-4 bg-white/5 rounded-xl flex gap-4 items-center border border-white/5 hover:bg-white/10 transition-colors">
                          <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><Leaf size={20}/></div>
                          {t.whitepaper.why_points[2]}
                        </li>
                        <li className="p-4 bg-white/5 rounded-xl flex gap-4 items-center border border-white/5 hover:bg-white/10 transition-colors">
                          <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400"><Users size={20}/></div>
                          {t.whitepaper.why_points[3]}
                        </li>
                      </ul>
                    </WhitepaperSection>
                  </div>

                  <WhitepaperSection title={t.whitepaper.status_title} icon={Calendar}>
                    <ul className="space-y-4">
                      {t.whitepaper.status_points.map((pt, i) => (
                         <li key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                           <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/30">
                             <CheckCircle2 size={14} />
                           </div>
                           <span className="font-medium text-white">{pt}</span>
                         </li>
                      ))}
                    </ul>
                  </WhitepaperSection>
                  
                  {/* Reuse Tier Data for structure */}
                  <WhitepaperSection title="6. Membership Structure" icon={Users}>
                     <WhitepaperTable 
                      headers={["Tier", "Seats", `Price (${currency})`, "Vote Weight"]}
                      rows={t.tiers.items.map(i => [i.name, i.seats, formatCurrency(i.cost, currency), i.votes])}
                    />
                  </WhitepaperSection>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative bg-gradient-to-r from-orange-600 to-yellow-600 rounded-3xl p-10 text-center text-black shadow-2xl overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] pointer-events-none"></div>
                      
                      <h3 className="text-3xl font-bold mb-4 brand-font">{t.whitepaper.join_title}</h3>
                      <p className="max-w-2xl mx-auto mb-8 font-medium text-lg opacity-90">{t.whitepaper.join_text}</p>
                      <a href={DAPP_LINK} target="_blank" rel="noreferrer" className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-900 transition-colors shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                        Go to Official 1WP DAO Page
                      </a>
                    </div>
                  </div>

                </div>
              )}

              {activeTab === "faq" && (
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* ... FAQ content remains the same ... */}
                  <div className="text-center mb-10">
                     <SectionTitle title={t.faq.title} />
                  </div>
                  
                  {t.faq.items.map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.01 }}
                      className="bg-[#0A0C14] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300"
                    >
                      <h4 className="font-bold text-white mb-3 text-lg flex items-start gap-3">
                        <span className="text-blue-500 font-mono">Q.</span> {item.q}
                      </h4>
                      <p className="text-gray-400 leading-relaxed pl-7 border-l-2 border-white/10">{item.a}</p>
                    </motion.div>
                  ))}
                  
                  <div className="bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/20 rounded-2xl p-8 mt-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] pointer-events-none"></div>
                    
                    <h4 className="font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                      <MessageCircle className="text-blue-400" /> {t.common.contact}
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-400 relative z-10">
                       <ul className="space-y-4">
                         <li className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-white/5 hover:border-blue-500/30 transition-colors">
                           <div className="p-2 bg-blue-500/10 rounded-full text-blue-400"><Users size={16}/></div>
                           <span>Rajesh Premnath Soni (Lead)</span>
                         </li>
                         <li className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-white/5 hover:border-blue-500/30 transition-colors">
                           <div className="p-2 bg-indigo-500/10 rounded-full text-indigo-400"><MessageCircle size={16}/></div>
                           <a href={DISCORD_LINK} target="_blank" rel="noreferrer" className="hover:text-white underline decoration-indigo-500/50">Join Discord Community</a>
                         </li>
                       </ul>
                       <ul className="space-y-4">
                         <li className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-white/5 hover:border-green-500/30 transition-colors">
                           <div className="p-2 bg-green-500/10 rounded-full text-green-400"><Landmark size={16}/></div>
                           <span>Local Panchayats of Baghpat</span>
                         </li>
                         <li className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-white/5 hover:border-orange-500/30 transition-colors">
                           <div className="p-2 bg-yellow-500/10 rounded-full text-yellow-400"><TrendingUp size={16}/></div>
                           <span>Backed by 1WP Ecosystem</span>
                         </li>
                       </ul>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#030407] mt-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
              <Sun className="w-6 h-6 text-orange-500" />
              <span className="font-bold brand-font text-xl text-white">HeliosHash DAO</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Empowering rural India through decentralized solar energy and Bitcoin mining. <br/> {t.common.rights}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-sm text-gray-400">
             <div>
               <h5 className="font-bold text-white mb-3 uppercase text-xs tracking-wider">Connect</h5>
               <ul className="space-y-2">
                 <li><a href="mailto:urgamparadise@gmail.com" className="hover:text-orange-400 transition-colors">urgamparadise@gmail.com</a></li>
                 <li><a href={DISCORD_LINK} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2"><MessageCircle size={14}/> Discord Server</a></li>
                 <li><a href="https://x.com/1Wpindia" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">X (Twitter) @1Wpindia</a></li>
               </ul>
             </div>
             <div>
                <h5 className="font-bold text-white mb-3 uppercase text-xs tracking-wider">Support</h5>
                <ul className="space-y-2">
                  <li className="text-white font-medium">+91-7738901369 <span className="text-xs text-green-500 bg-green-900/20 px-1.5 py-0.5 rounded ml-2">WhatsApp</span></li>
                  <li><button onClick={() => setActiveTab('faq')} className="hover:text-white transition-colors text-left">Help & FAQ</button></li>
                </ul>
             </div>
          </div>
        </div>
        <div className="w-full h-2 bg-gradient-to-r from-orange-600 via-blue-500 to-green-500 opacity-20"></div>
      </footer>
    </div>
  );
}