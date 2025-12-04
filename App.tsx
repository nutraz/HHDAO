import React, { useState } from "react";
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
  Languages
} from "lucide-react";

// --- Translations ---

const translations = {
  en: {
    nav: {
      whitepaper: "Whitepaper",
      roadmap: "Roadmap",
      dapp: "dApp",
      connect: "Connect Wallet / Pay"
    },
    hero: {
      tag: "India's First Community-Owned",
      title: "Solar-Powered Bitcoin Mining Park",
      subtitle: "Turning sunlight into wealth, jobs, and free electricity for rural India.",
      cta: "Join as Core Member",
      waitlist: "Waitlist: 750 Spots Only",
      badge_loc: "Baghpat District, Uttar Pradesh",
      badge_cap: "750 Member Capacity"
    },
    stats: {
      capacity: "Capacity Goal",
      members: "Community Owners",
      raised: "Funds Raised"
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
        payment_note: "Payment only via UPI / Bank Transfer (100% KYC compliant). Total raise target: ₹16.5 Crore.",
        funding_summary: "Funding Summary (USDC Primary)",
        source: "Source",
        target: "Target Amount",
        notes: "Notes",
        table: {
            dao_members: "750 DAO Members",
            dao_note: "~₹2.5 Cr. Only 2 seats sold - urgent push needed.",
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
        title: "A New Model for Rural India",
        subtitle: "HeliosHash Baghpat is a community-owned solar park.",
        desc: "HeliosHash Baghpat uses free sunlight to run Bitcoin mining computers 24/7. All profits are shared monthly with 750 member-families and the landowner.",
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
            { title: "4. Monthly Profit", desc: "Shared with 750 members" }
        ]
    },
    tiers: {
      title: "Membership Tiers",
      subtitle: "One-Time Contribution for Lifetime Monthly Income",
      reserve: "Reserve Seat",
      income: "Monthly Income (Y5)",
      votes: "Votes",
      left: "Left",
      best_value: "BEST VALUE",
      items: [
          { name: "Core Founder", seats: 150, cost: "₹3,50,000", income: "₹68k - ₹87k", votes: 4 },
          { name: "Mid Member", seats: 300, cost: "₹2,25,000", income: "₹54k - ₹69k", votes: 2 },
          { name: "Base Member", seats: 300, cost: "₹1,50,000", income: "₹47k - ₹60k", votes: 1 }
      ]
    },
    calc: {
      title: "Returns Calculator",
      subtitle: "Conservative estimates after 30% tax & expenses",
      contribution: "Contribution",
      y1: "Year 1 / Month",
      y3: "Year 3 / Month",
      y5: "Year 5 / Month",
      roi: "Projected ROI"
    },
    roadmap: {
        title: "Revised Project Roadmap (v2.0)",
        subtitle: "Based on Current Status as of December 04, 2025",
        note: "Note: Milestone '3-Acre Land MOU Signed' is complete. Immediate focus is raising funds for land conversion approvals.",
        steps: [
            { time: "2025 Q4", phase: "Pre-Launch & DAO Setup", deliverables: ["DAO launched on 1WP DaPP", "Website & Community Live", "3-acre land MOU signed"], funding: "~167 USDC raised", capacity: "0 kW", profit: "–", status: "active" },
            { time: "2026 Q1", phase: "Funding & Approvals", deliverables: ["Fundraising for land conversion", "Apply for UPNEDA subsidy", "Final procurement contract", "First 100 Core seats sold"], funding: "50–100K USDC", capacity: "0 kW", profit: "–", status: "upcoming" },
            { time: "2026 Q2", phase: "Pilot Build-Out", deliverables: ["Land prep & fencing", "50 kW Solar + 25 kW Mining", "Net-metering UPPCL", "First free power line"], funding: "100–150K USDC", capacity: "50 kW", profit: "Trial payout", status: "upcoming" },
            { time: "2026 Q3–Q4", phase: "First Revenue", deliverables: ["Full mining revenue", "Tax compliance", "Surplus power to 3 buildings", "Engineering for 200kW"], funding: "150–200K USDC", capacity: "100 kW", profit: "₹37k–45k/mo", status: "upcoming" },
            { time: "2027", phase: "Scale to 250 kW", deliverables: ["150 kW expansion", "Battery buffer", "Heat reuse pilot"], funding: "200–250K USDC", capacity: "250 kW", profit: "₹54k–69k/mo", status: "upcoming" },
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
  },
  hi: { // Hindi
    nav: {
      whitepaper: "श्वेत पत्र",
      roadmap: "रोडमैप",
      dapp: "डैप",
      connect: "जुड़ें / भुगतान करें"
    },
    hero: {
      tag: "भारत का पहला सामुदायिक स्वामित्व वाला",
      title: "सौर-संचालित बिटकॉइन माइनिंग पार्क",
      subtitle: "ग्रामीण भारत के लिए सूर्य की रोशनी को धन, नौकरियों और मुफ्त बिजली में बदलना।",
      cta: "मुख्य सदस्य बनें",
      waitlist: "प्रतीक्षा सूची: केवल 750 स्थान",
      badge_loc: "बागपत जिला, उत्तर प्रदेश",
      badge_cap: "750 सदस्यों की क्षमता"
    },
    stats: {
      capacity: "क्षमता लक्ष्य",
      members: "सामुदायिक मालिक",
      raised: "जुटाया गया फंड"
    },
    tabs: {
      overview: "अवलोकन",
      calculator: "कैलकुलेटर",
      pricing: "मूल्य निर्धारण",
      roadmap: "रोडमैप",
      whitepaper: "श्वेत पत्र",
      faq: "सामान्य प्रश्न"
    },
    common: {
        payment_note: "भुगतान केवल UPI / बैंक ट्रांसफर (100% KYC अनुपालन) के माध्यम से। कुल लक्ष्य: ₹16.5 करोड़।",
        funding_summary: "फंडिंग सारांश (USDC प्राथमिक)",
        source: "स्रोत",
        target: "लक्ष्य राशि",
        notes: "टिप्पणियाँ",
        table: {
            dao_members: "750 DAO सदस्य",
            dao_note: "~₹2.5 करोड़। केवल 2 सीटें बिकीं - तत्काल आवश्यकता।",
            subsidies: "सब्सिडी (UPNEDA)",
            subsidies_amt: "Capex का 30%",
            subsidies_note: "~₹7 करोड़। अनुमोदन के लिए लंबित।",
            treasury: "कोषागार पुनर्निवेश",
            treasury_amt: "लाभ का 20%",
            treasury_note: "पायलट के बाद बनेगा",
            total: "चरण 1 के लिए कुल",
            total_note: "अनुमोदन, निर्माण और संचालन शामिल"
        },
        contact: "संपर्क करें",
        rights: "Helios#Baghpat पहल। सर्वाधिकार सुरक्षित।"
    },
    howItWorks: {
        title: "ग्रामीण भारत के लिए एक नया मॉडल",
        subtitle: "HeliosHash बागपत एक सामुदायिक स्वामित्व वाला सौर पार्क है।",
        desc: "HeliosHash बागपत 24/7 बिटकॉइन माइनिंग कंप्यूटर चलाने के लिए मुफ्त सूर्य की रोशनी का उपयोग करता है। सभी लाभ 750 सदस्य परिवारों और ज़मीन मालिक के साथ मासिक रूप से साझा किए जाते हैं।",
        list: [
            "शून्य बिजली बिल - 100% सौर ऊर्जा संचालित",
            "पास के स्कूलों और अस्पतालों को मुफ्त बिजली",
            "ज़मीन मालिक को शुद्ध लाभ का 7% (कोई किराया नहीं)",
            "यूपी सौर नीति द्वारा समर्थित (30% पूंजी अनुदान)",
            "पंजीकृत धारा-8 गैर-लाभकारी कंपनी"
        ],
        steps: [
            { title: "1. सूर्य की शक्ति", desc: "500kW पैनल 8 लाख यूनिट/वर्ष उत्पन्न करते हैं" },
            { title: "2. 24/7 माइनिंग", desc: "ASIC मुफ्त बिजली का उपयोग करके BTC कमाते हैं" },
            { title: "3. अधिशेष बिजली", desc: "स्कूलों और PHC के लिए मुफ्त" },
            { title: "4. मासिक लाभ", desc: "750 सदस्यों के साथ साझा" }
        ]
    },
    tiers: {
      title: "सदस्यता श्रेणियाँ",
      subtitle: "आजीवन मासिक आय के लिए एकमुश्त योगदान",
      reserve: "सीट आरक्षित करें",
      income: "मासिक आय (वर्ष 5)",
      votes: "वोट",
      left: "बचे हैं",
      best_value: "सर्वोत्तम मूल्य",
      items: [
          { name: "मुख्य संस्थापक (Core)", seats: 150, cost: "₹3,50,000", income: "₹68k - ₹87k", votes: 4 },
          { name: "मध्य सदस्य (Mid)", seats: 300, cost: "₹2,25,000", income: "₹54k - ₹69k", votes: 2 },
          { name: "आधार सदस्य (Base)", seats: 300, cost: "₹1,50,000", income: "₹47k - ₹60k", votes: 1 }
      ]
    },
    calc: {
      title: "रिटर्न कैलकुलेटर",
      subtitle: "30% कर और खर्चों के बाद अनुमान",
      contribution: "योगदान",
      y1: "वर्ष 1 / माह",
      y3: "वर्ष 3 / माह",
      y5: "वर्ष 5 / माह",
      roi: "अनुमानित ROI"
    },
    roadmap: {
        title: "संशोधित प्रोजेक्ट रोडमैप (v2.0)",
        subtitle: "04 दिसंबर 2025 की स्थिति के आधार पर",
        note: "नोट: '3-एकड़ भूमि समझौता' पूरा हो गया है। तत्काल ध्यान भूमि रूपांतरण अनुमोदन के लिए धन जुटाने पर है।",
        steps: [
            { time: "2025 Q4", phase: "प्री-लॉन्च और DAO सेटअप", deliverables: ["DAO लॉन्च हुआ", "वेबसाइट लाइव", "3-एकड़ भूमि समझौता हस्ताक्षरित"], funding: "~167 USDC जुटाए गए", capacity: "0 kW", profit: "–", status: "active" },
            { time: "2026 Q1", phase: "फंडिंग और अनुमोदन", deliverables: ["भूमि रूपांतरण के लिए धन जुटाना", "UPNEDA सब्सिडी आवेदन", "अंतिम अनुबंध", "पहली 100 कोर सीटें बिकीं"], funding: "50–100K USDC", capacity: "0 kW", profit: "–", status: "upcoming" },
            { time: "2026 Q2", phase: "पायलट निर्माण", deliverables: ["भूमि की तैयारी", "50 kW सौर + 25 kW माइनिंग", "नेट-मीटरिंग UPPCL", "पहली मुफ्त बिजली लाइन"], funding: "100–150K USDC", capacity: "50 kW", profit: "ट्रायल भुगतान", status: "upcoming" },
            { time: "2026 Q3–Q4", phase: "पहला राजस्व", deliverables: ["पूर्ण माइनिंग राजस्व", "कर अनुपालन", "3 इमारतों को अधिशेष बिजली", "200kW के लिए इंजीनियरिंग"], funding: "150–200K USDC", capacity: "100 kW", profit: "₹37k–45k/माह", status: "upcoming" },
            { time: "2027", phase: "250 kW तक विस्तार", deliverables: ["150 kW विस्तार", "बैटरी बफर", "हीट रीयूज पायलट"], funding: "200–250K USDC", capacity: "250 kW", profit: "₹54k–69k/माह", status: "upcoming" },
            { time: "2028+", phase: "पूर्ण पैमाना और वृद्धि", deliverables: ["500 kW परिचालन", "3 PH/s हैशरेट", "पार्क #2 का विस्तार"], funding: "आत्मनिर्भर", capacity: "500 kW+", profit: "₹68k–87k/माह", status: "upcoming" }
        ]
    },
    whitepaper: {
        title: "HeliosHash DAO — श्वेत पत्र v1.0",
        abstract_title: "1. सार",
        abstract_text: "HeliosHash DAO (HHDAO) भारतीय नागरिकों को सौर-संचालित बिटकॉइन माइनिंग पार्कों का सह-मालिक बनने में सक्षम बनाता है। यह मासिक INR लाभ, ग्रामीण स्कूलों को मुफ्त बिजली और ज़मीन मालिकों को राजस्व हिस्सा देता है।",
        vision_title: "2. दृष्टि और मिशन",
        vision_text: "2030 तक 50 मेगावाट सामुदायिक स्वामित्व वाले बुनियादी ढांचे को तैनात करना, जिससे 7,500 परिवारों के लिए आय का सृजन हो।",
        why_title: "3. भारत का अवसर",
        why_points: ["यूपी में उच्च धूप (5.5 kWh/m²)", "बिटकॉइन माइनिंग कानूनी है (30% कर)", "सौर ऊर्जा के साथ शून्य लागत", "किसानों को द्वितीयक आय की आवश्यकता है"],
        status_title: "4. वर्तमान स्थिति",
        status_points: ["1WP DaPP लाइव", "3-एकड़ भूमि समझौता हस्ताक्षरित", "अनुमोदन के लिए पूंजी जुटाना"],
        join_title: "750 सह-मालिकों में शामिल हों",
        join_text: "हम आजीवन स्वामित्व बेच रहे हैं जो आपको मासिक भुगतान करता है।"
    },
    faq: {
        title: "सामान्य प्रश्न",
        items: [
            { q: "क्या भारत में बिटकॉइन माइनिंग कानूनी है?", a: "हां। सुप्रीम कोर्ट ने प्रतिबंध हटा दिया। आय पर 30% कर लगता है।" },
            { q: "अगर BTC की कीमत गिरती है तो क्या होगा?", a: "हम मुफ्त सौर ऊर्जा का उपयोग करते हैं। कम कीमतों पर भी, शून्य ऊर्जा लागत के कारण परियोजना लाभदायक रहती है।" },
            { q: "क्या NRI शामिल हो सकते हैं?", a: "हां - NRO खाते और मानक KYC प्रक्रियाओं के माध्यम से।" },
            { q: "पहला भुगतान कब होगा?", a: "पायलट लाइव होने के 60 दिनों के भीतर (अपेक्षित अप्रैल 2026)।" }
        ]
    },
    modal: {
      title: "भुगतान विधि चुनें",
      desc: "चुनें कि आप DAO में कैसे योगदान करना चाहते हैं।",
      upi: "UPI द्वारा भुगतान (INR)",
      crypto: "क्रिप्टो वॉलेट (USDC)",
      upi_desc: "शून्य शुल्क। BHIM, GPay, PhonePe द्वारा तत्काल निपटान।",
      crypto_desc: "Polygon/ICP नेटवर्क पर USDC का उपयोग करें।",
      pay_btn_upi: "UPI ऐप खोलें",
      pay_btn_crypto: "वॉलेट कनेक्ट करें",
      scan_text: "BHIM, PhonePe, GPay, Paytm से स्कैन करें"
    }
  },
  mr: { // Marathi
    nav: {
      whitepaper: "श्वेतपत्रिका",
      roadmap: "रोडमॅप",
      dapp: "डॅप",
      connect: "जोडा / पैसे द्या"
    },
    hero: {
      tag: "भारताचे पहिले समुदाय-मालकीचे",
      title: "सौर-चालित बिटकॉइन माइनिंग पार्क",
      subtitle: "सूर्यप्रकाश ग्रामीण भारतासाठी संपत्ती, रोजगार आणि मोफत विजेमध्ये बदलणे.",
      cta: "कोअर सदस्य व्हा",
      waitlist: "प्रतीक्षा यादी: फक्त 750 जागा",
      badge_loc: "बागपत जिल्हा, उत्तर प्रदेश",
      badge_cap: "750 सदस्य क्षमता"
    },
    stats: {
      capacity: "क्षमता ध्येय",
      members: "समुदाय मालक",
      raised: "जमा झालेला निधी"
    },
    tabs: {
      overview: "आढावा",
      calculator: "कॅल्क्युलेटर",
      pricing: "किंमत",
      roadmap: "रोडमॅप",
      whitepaper: "श्वेतपत्रिका",
      faq: "प्रश्न"
    },
    common: {
        payment_note: "पेमेंट फक्त UPI / बँक ट्रान्सफर (100% KYC आवश्यक). एकूण लक्ष्य: ₹16.5 कोटी.",
        funding_summary: "निधी सारांश (USDC प्राथमिक)",
        source: "स्रोत",
        target: "लक्ष्य रक्कम",
        notes: "टीपा",
        table: {
            dao_members: "750 DAO सदस्य",
            dao_note: "~₹2.5 कोटी. फक्त 2 जागा विकल्या - तातडीची गरज.",
            subsidies: "अनुदान (UPNEDA)",
            subsidies_amt: "Capex च्या 30%",
            subsidies_note: "~₹7 कोटी. मंजुरीसाठी प्रलंबित.",
            treasury: "तिजोरी पुनर्गुंतवणूक",
            treasury_amt: "नफ्याच्या 20%",
            treasury_note: "पायलट नंतर तयार होईल",
            total: "फेज 1 साठी एकूण",
            total_note: "मंजुरी, बांधकाम आणि ऑपरेशन्स समाविष्ट"
        },
        contact: "संपर्क",
        rights: "Helios#Baghpat पुढाकार. सर्व हक्क राखीव."
    },
    howItWorks: {
        title: "ग्रामीण भारतासाठी नवीन मॉडेल",
        subtitle: "हेलिओस हॅश बागपत एक समुदाय-मालकीचे सौर पार्क आहे.",
        desc: "हेलिओस हॅश बागपत 24/7 बिटकॉइन माइनिंग संगणक चालवण्यासाठी मोफत सूर्यप्रकाश वापरते. सर्व नफा 750 सदस्य कुटुंबे आणि जमीनमालकासह मासिक सामायिक केला जातो.",
        list: [
            "शून्य वीज बिल - 100% सौर ऊर्जेवर",
            "जवळच्या शाळा आणि रुग्णालयांना मोफत वीज",
            "जमीनमालकाला निव्वळ नफ्याचा 7% (भाडे नाही)",
            "यूपी सौर धोरणाद्वारे समर्थित (30% भांडवली अनुदान)",
            "नोंदणीकृत कलम-8 ना-नफा कंपनी"
        ],
        steps: [
            { title: "1. सूर्याची शक्ती", desc: "500kW पॅनल्स 8 लाख युनिट्स/वर्ष तयार करतात" },
            { title: "2. 24/7 माइनिंग", desc: "ASIC मोफत वीज वापरून BTC कमावतात" },
            { title: "3. अतिरिक्त वीज", desc: "शाळा आणि PHC साठी मोफत" },
            { title: "4. मासिक नफा", desc: "750 सदस्यांसह सामायिक" }
        ]
    },
    tiers: {
      title: "सदस्यत्व श्रेणी",
      subtitle: "आजीवन मासिक उत्पन्नासाठी एकवेळचे योगदान",
      reserve: "जागा आरक्षित करा",
      income: "मासिक उत्पन्न (वर्ष 5)",
      votes: "मते",
      left: "शिल्लक",
      best_value: "सर्वोत्तम मूल्य",
      items: [
          { name: "कोअर संस्थापक", seats: 150, cost: "₹3,50,000", income: "₹68k - ₹87k", votes: 4 },
          { name: "मध्यम सदस्य", seats: 300, cost: "₹2,25,000", income: "₹54k - ₹69k", votes: 2 },
          { name: "पाया सदस्य", seats: 300, cost: "₹1,50,000", income: "₹47k - ₹60k", votes: 1 }
      ]
    },
    calc: {
      title: "परतावा कॅल्क्युलेटर",
      subtitle: "30% कर आणि खर्च वजा जाता",
      contribution: "योगदान",
      y1: "वर्ष 1 / महिना",
      y3: "वर्ष 3 / महिना",
      y5: "वर्ष 5 / महिना",
      roi: "अंदाजित ROI"
    },
    roadmap: {
        title: "सुधारित प्रकल्प रोडमॅप (v2.0)",
        subtitle: "04 डिसेंबर 2025 च्या स्थितीनुसार",
        note: "टीप: '3-एकर जमीन करार' पूर्ण झाला आहे. जमीन रूपांतरण मंजुरीसाठी निधी उभारण्यावर त्वरित लक्ष केंद्रित केले आहे.",
        steps: [
            { time: "2025 Q4", phase: "प्री-लॉन्च आणि DAO सेटअप", deliverables: ["DAO लाँच झाला", "वेबसाइट लाइव्ह", "3-एकर जमीन करार स्वाक्षरी"], funding: "~167 USDC उभारले", capacity: "0 kW", profit: "–", status: "active" },
            { time: "2026 Q1", phase: "निधी आणि मंजुरी", deliverables: ["जमीन रूपांतरणासाठी निधी उभारणे", "UPNEDA अनुदान अर्ज", "अंतिम करार", "पहिल्या 100 कोअर जागा विकल्या"], funding: "50–100K USDC", capacity: "0 kW", profit: "–", status: "upcoming" },
            { time: "2026 Q2", phase: "पायलट बांधकाम", deliverables: ["जमीन तयारी", "50 kW सौर + 25 kW माइनिंग", "नेट-मीटरिंग UPPCL", "पहिली मोफत वीज लाईन"], funding: "100–150K USDC", capacity: "50 kW", profit: "ट्रायल पेआउट", status: "upcoming" },
            { time: "2026 Q3–Q4", phase: "पहिला महसूल", deliverables: ["पूर्ण माइनिंग महसूल", "कर पालन", "3 इमारतींना अतिरिक्त वीज", "200kW साठी अभियांत्रिकी"], funding: "150–200K USDC", capacity: "100 kW", profit: "₹37k–45k/महिना", status: "upcoming" },
            { time: "2027", phase: "250 kW पर्यंत विस्तार", deliverables: ["150 kW विस्तार", "बॅटरी बफर", "हीट रीयूज पायलट"], funding: "200–250K USDC", capacity: "250 kW", profit: "₹54k–69k/महिना", status: "upcoming" },
            { time: "2028+", phase: "पूर्ण क्षमता आणि वाढ", deliverables: ["500 kW कार्यरत", "3 PH/s हॅशरेट", "पार्क #2 विस्तार"], funding: "स्वयंपूर्ण", capacity: "500 kW+", profit: "₹68k–87k/महिना", status: "upcoming" }
        ]
    },
    whitepaper: {
        title: "HeliosHash DAO — श्वेतपत्रिका v1.0",
        abstract_title: "1. सारांश",
        abstract_text: "HeliosHash DAO (HHDAO) भारतीय नागरिकांना सौर-चालित बिटकॉइन माइनिंग पार्कचे सह-मालक बनण्यास सक्षम करते. हे मासिक INR नफा, ग्रामीण शाळांना मोफत वीज आणि जमीनमालकांना महसूल वाटा देते.",
        vision_title: "2. दृष्टी आणि ध्येय",
        vision_text: "2030 पर्यंत 50 मेगावॅट समुदाय-मालकीच्या पायाभूत सुविधांची उभारणी करणे, ज्यामुळे 7,500 कुटुंबांसाठी उत्पन्न मिळेल.",
        why_title: "3. भारताची संधी",
        why_points: ["यूपीमध्ये भरपूर सूर्यप्रकाश (5.5 kWh/m²)", "बिटकॉइन माइनिंग कायदेशीर आहे (30% कर)", "सौरसह शून्य ऊर्जा खर्च", "शेतकऱ्यांना दुय्यम उत्पन्नाची गरज आहे"],
        status_title: "4. सद्यस्थिती",
        status_points: ["1WP DaPP लाइव्ह", "3-एकर जमीन करार स्वाक्षरी", "मंजुरीसाठी भांडवल उभारणे"],
        join_title: "750 सह-मालकांमध्ये सामील व्हा",
        join_text: "आम्ही आजीवन मालकी विकत आहोत जे तुम्हाला मासिक पैसे देते."
    },
    faq: {
        title: "सामान्य प्रश्न",
        items: [
            { q: "भारतात बिटकॉइन माइनिंग कायदेशीर आहे का?", a: "होय. सर्वोच्च न्यायालयाने बंदी उठवली. उत्पन्नावर 30% कर आकारला जातो." },
            { q: "जर BTC ची किंमत पडली तर?", a: "आम्ही मोफत सौर ऊर्जा वापरतो. कमी किमतीतही, शून्य ऊर्जा खर्चामुळे प्रकल्प फायदेशीर राहतो." },
            { q: "NRI सामील होऊ शकतात का?", a: "होय - NRO खाते आणि मानक KYC प्रक्रियेद्वारे." },
            { q: "पहिला पेआउट कधी मिळेल?", a: "पायलट लाइव्ह झाल्यानंतर 60 दिवसांच्या आत (अपेक्षित एप्रिल 2026)." }
        ]
    },
    modal: {
      title: "पेमेंट पद्धत निवडा",
      desc: "तुम्ही DAO मध्ये कसे योगदान देऊ इच्छिता ते निवडा.",
      upi: "UPI द्वारे पैसे द्या (INR)",
      crypto: "क्रिप्टो वॉलेट (USDC)",
      upi_desc: "शून्य शुल्क. BHIM, GPay, PhonePe द्वारे त्वरित पेमेंट.",
      crypto_desc: "Polygon/ICP नेटवर्कवर USDC वापरा.",
      pay_btn_upi: "UPI ॲप उघडा",
      pay_btn_crypto: "वॉलेट कनेक्ट करा",
      scan_text: "BHIM, PhonePe, GPay ने स्कॅन करा"
    }
  },
  gu: { // Gujarati
    nav: {
      whitepaper: "વ્હાઇટપેપર",
      roadmap: "રોડમેપ",
      dapp: "ડીએપ",
      connect: "જોડાવો / ચૂકવણી"
    },
    hero: {
      tag: "ભારતનો પ્રથમ સમુદાય-માલિકીનો",
      title: "સોલર-પાવર્ડ બિટકોઈન માઈનિંગ પાર્ક",
      subtitle: "ગ્રામીણ ભારત માટે સૂર્યપ્રકાશને સંપત્તિ, નોકરીઓ અને મફત વીજળીમાં ફેરવવું.",
      cta: "મુખ્ય સભ્ય બનો",
      waitlist: "વેઇટલિસ્ટ: માત્ર 750 બેઠકો",
      badge_loc: "બાગપત જિલ્લો, ઉત્તર પ્રદેશ",
      badge_cap: "750 સભ્ય ક્ષમતા"
    },
    stats: {
      capacity: "ક્ષમતા લક્ષ્ય",
      members: "સમુદાયના માલિકો",
      raised: "એકત્ર ભંડોળ"
    },
    tabs: {
      overview: "ઝાંખી",
      calculator: "કેલ્ક્યુલેટર",
      pricing: "કિંમત",
      roadmap: "રોડમેપ",
      whitepaper: "વ્હાઇટપેપર",
      faq: "પ્રશ્નો"
    },
    common: {
        payment_note: "ચુકવણી માત્ર UPI / બેંક ટ્રાન્સફર (100% KYC સુસંગત). કુલ લક્ષ્ય: ₹16.5 કરોડ.",
        funding_summary: "ભંડોળ સારાંશ (USDC પ્રાથમિક)",
        source: "સ્ત્રોત",
        target: "લક્ષ્ય રકમ",
        notes: "નોંધો",
        table: {
            dao_members: "750 DAO સભ્યો",
            dao_note: "~₹2.5 કરોડ. માત્ર 2 બેઠકો વેચાઈ - તાત્કાલિક જરૂર.",
            subsidies: "સબસિડી (UPNEDA)",
            subsidies_amt: "Capex ના 30%",
            subsidies_note: "~₹7 કરોડ. મંજૂરી માટે બાકી.",
            treasury: "ટ્રેઝરી પુનઃરોકાણ",
            treasury_amt: "નફાના 20%",
            treasury_note: "પાયલટ પછી બનશે",
            total: "તબક્કા 1 માટે કુલ",
            total_note: "મંજૂરી, બાંધકામ અને કામગીરી શામેલ"
        },
        contact: "સંપર્ક",
        rights: "Helios#Baghpat પહેલ. સર્વાધિકાર સુરક્ષિત."
    },
    howItWorks: {
        title: "ગ્રામીણ ભારત માટે નવું મોડેલ",
        subtitle: "હેલિયોસ હેશ બાગપત સમુદાય-માલિકીનું સોલર પાર્ક છે.",
        desc: "હેલિયોસ હેશ બાગપત 24/7 બિટકોઈન માઈનિંગ કમ્પ્યુટર ચલાવવા માટે મફત સૂર્યપ્રકાશનો ઉપયોગ કરે છે. તમામ નફો 750 સભ્ય પરિવારો અને જમીનમાલિક સાથે માસિક વહેંચવામાં આવે છે.",
        list: [
            "શૂન્ય વીજળી બિલ - 100% સૌર ઊર્જા સંચાલિત",
            "નજીકની શાળાઓ અને હોસ્પિટલોને મફત વીજળી",
            "જમીનમાલિકને ચોખ્ખા નફાના 7% (ભાડું નહીં)",
            "યુપી સૌર નીતિ દ્વારા સમર્થિત (30% મૂડી અનુદાન)",
            "નોંધાયેલ કલમ-8 નોન-પ્રોફિટ કંપની"
        ],
        steps: [
            { title: "1. સૂર્યની શક્તિ", desc: "500kW પેનલ્સ 8 લાખ યુનિટ/વર્ષ જનરેટ કરે છે" },
            { title: "2. 24/7 માઈનિંગ", desc: "ASIC મફત પાવરનો ઉપયોગ કરીને BTC કમાય છે" },
            { title: "3. વધારાની વીજળી", desc: "શાળાઓ અને PHC માટે મફત" },
            { title: "4. માસિક નફો", desc: "750 સભ્યો સાથે વહેંચાયેલ" }
        ]
    },
    tiers: {
      title: "સભ્યપદ શ્રેણીઓ",
      subtitle: "આજીવન માસિક આવક માટે એક વખતનું યોગદાન",
      reserve: "બેઠક આરક્ષિત કરો",
      income: "માસિક આવક (વર્ષ 5)",
      votes: "મત",
      left: "બાકી",
      best_value: "શ્રેષ્ઠ મૂલ્ય",
      items: [
          { name: "મુખ્ય સ્થાપક (Core)", seats: 150, cost: "₹3,50,000", income: "₹68k - ₹87k", votes: 4 },
          { name: "મધ્ય સભ્ય (Mid)", seats: 300, cost: "₹2,25,000", income: "₹54k - ₹69k", votes: 2 },
          { name: "આધાર સભ્ય (Base)", seats: 300, cost: "₹1,50,000", income: "₹47k - ₹60k", votes: 1 }
      ]
    },
    calc: {
      title: "રિટર્ન કેલ્ક્યુલેટર",
      subtitle: "30% ટેક્સ અને ખર્ચ પછીનો અંદાજ",
      contribution: "યોગદાન",
      y1: "વર્ષ 1 / મહિનો",
      y3: "વર્ષ 3 / મહિનો",
      y5: "વર્ષ 5 / મહિનો",
      roi: "અંદાજિત ROI"
    },
    roadmap: {
        title: "સુધારેલ પ્રોજેક્ટ રોડમેપ (v2.0)",
        subtitle: "04 ડિસેમ્બર 2025 ની સ્થિતિ મુજબ",
        note: "નોંધ: '3-એકર જમીન કરાર' પૂર્ણ થયો છે. જમીન રૂપાંતર મંજૂરી માટે ભંડોળ એકત્ર કરવા પર તાત્કાલિક ધ્યાન કેન્દ્રિત છે.",
        steps: [
            { time: "2025 Q4", phase: "પ્રી-લોન્ચ અને DAO સેટઅપ", deliverables: ["DAO લોન્ચ થયું", "વેબસાઇટ લાઈવ", "3-એકર જમીન કરાર હસ્તાક્ષર"], funding: "~167 USDC એકત્ર", capacity: "0 kW", profit: "–", status: "active" },
            { time: "2026 Q1", phase: "ભંડોળ અને મંજૂરી", deliverables: ["જમીન રૂપાંતર ભંડોળ", "UPNEDA સબસિડી અરજી", "અંતિમ કરાર", "પ્રથમ 100 કોર બેઠકો વેચાઈ"], funding: "50–100K USDC", capacity: "0 kW", profit: "–", status: "upcoming" },
            { time: "2026 Q2", phase: "પાયલટ બાંધકામ", deliverables: ["જમીન તૈયારી", "50 kW સોલર + 25 kW માઈનિંગ", "નેટ-મીટરિંગ UPPCL", "પ્રથમ મફત પાવર લાઈન"], funding: "100–150K USDC", capacity: "50 kW", profit: "ટ્રાયલ પેઆઉટ", status: "upcoming" },
            { time: "2026 Q3–Q4", phase: "પ્રથમ આવક", deliverables: ["પૂર્ણ માઈનિંગ આવક", "ટેક્સ પાલન", "3 ઇમારતોને વધારાની વીજળી", "200kW એન્જિનિયરિંગ"], funding: "150–200K USDC", capacity: "100 kW", profit: "₹37k–45k/મહિનો", status: "upcoming" },
            { time: "2027", phase: "250 kW સુધી વિસ્તરણ", deliverables: ["150 kW વિસ્તરણ", "બેટરી બફર", "હીટ રીયુઝ પાયલટ"], funding: "200–250K USDC", capacity: "250 kW", profit: "₹54k–69k/મહિનો", status: "upcoming" },
            { time: "2028+", phase: "પૂર્ણ ક્ષમતા અને વૃદ્ધિ", deliverables: ["500 kW કાર્યરત", "3 PH/s હેશરેટ", "પાર્ક #2 વિસ્તરણ"], funding: "આત્મનિર્ભર", capacity: "500 kW+", profit: "₹68k–87k/મહિનો", status: "upcoming" }
        ]
    },
    whitepaper: {
        title: "HeliosHash DAO — વ્હાઇટપેપર v1.0",
        abstract_title: "1. સારાંશ",
        abstract_text: "HeliosHash DAO (HHDAO) ભારતીય નાગરિકોને સોલર-પાવર્ડ બિટકોઈન માઈનિંગ પાર્કના સહ-માલિક બનવા માટે સક્ષમ બનાવે છે. તે માસિક INR નફો, ગ્રામીણ શાળાઓને મફત વીજળી અને જમીનમાલિકોને આવકનો હિસ્સો આપે છે.",
        vision_title: "2. દ્રષ્ટિ અને મિશન",
        vision_text: "2030 સુધીમાં 50 મેગાવોટ સમુદાય-માલિકીના ઈન્ફ્રાસ્ટ્રક્ચરને જમાવવું, જેનાથી 7,500 પરિવારો માટે આવક ઉભી થાય.",
        why_title: "3. ભારતની તક",
        why_points: ["યુપીમાં ઉચ્ચ સૂર્યપ્રકાશ (5.5 kWh/m²)", "બિટકોઈન માઈનિંગ કાનૂની છે (30% ટેક્સ)", "સોલર સાથે શૂન્ય ઊર્જા ખર્ચ", "ખેડૂતોને ગૌણ આવકની જરૂર છે"],
        status_title: "4. વર્તમાન સ્થિતિ",
        status_points: ["1WP DaPP લાઈવ", "3-એકર જમીન કરાર હસ્તાક્ષર", "મંજૂરી માટે મૂડી એકત્ર"],
        join_title: "750 સહ-માલિકોમાં જોડાઓ",
        join_text: "અમે આજીવન માલિકી વેચી રહ્યા છીએ જે તમને માસિક ચૂકવણી કરે છે."
    },
    faq: {
        title: "સામાન્ય પ્રશ્નો",
        items: [
            { q: "શું ભારતમાં બિટકોઈન માઈનિંગ કાનૂની છે?", a: "હા. સુપ્રીમ કોર્ટે પ્રતિબંધ હટાવ્યો. આવક પર 30% ટેક્સ લાગે છે." },
            { q: "જો BTC કિંમત ઘટે તો?", a: "અમે મફત સોલર પાવર વાપરીએ છીએ. ઓછી કિંમતે પણ, શૂન્ય ઊર્જા ખર્ચને કારણે પ્રોજેક્ટ નફાકારક રહે છે." },
            { q: "શું NRI જોડાઈ શકે છે?", a: "હા - NRO ખાતા અને માનક KYC પ્રક્રિયાઓ દ્વારા." },
            { q: "પહેલો પેઆઉટ ક્યારે મળશે?", a: "પાયલટ લાઈવ થયાના 60 દિવસમાં (અપેક્ષિત એપ્રિલ 2026)." }
        ]
    },
    modal: {
      title: "ચુકવણી પદ્ધતિ પસંદ કરો",
      desc: "તમે DAO માં કેવી રીતે યોગદાન આપવા માંગો છો તે પસંદ કરો.",
      upi: "UPI દ્વારા ચૂકવણી (INR)",
      crypto: "ક્રિપ્ટો વોલેટ (USDC)",
      upi_desc: "શૂન્ય ફી. BHIM, GPay, PhonePe દ્વારા ત્વરિત પતાવટ.",
      crypto_desc: "Polygon/ICP નેટવર્ક પર USDC નો ઉપયોગ કરો.",
      pay_btn_upi: "UPI એપ્લિકેશન ખોલો",
      pay_btn_crypto: "વોલેટ કનેક્ટ કરો",
      scan_text: "BHIM, PhonePe, GPay થી સ્કેન કરો"
    }
  },
  ta: { // Tamil
    nav: {
      whitepaper: "வெள்ளை அறிக்கை",
      roadmap: "திட்ட வரைபடம்",
      dapp: "dApp",
      connect: "இணைக்க / செலுத்த"
    },
    hero: {
      tag: "இந்தியாவின் முதல் சமூகத்திற்கு சொந்தமான",
      title: "சூரிய சக்தியில் இயங்கும் பிட்காயின் சுரங்கம்",
      subtitle: "சூரிய ஒளியை கிராமப்புற இந்தியாவுக்கான செல்வம், வேலைகள் மற்றும் இலவச மின்சாரமாக மாற்றுதல்.",
      cta: "முக்கிய உறுப்பினராக சேரவும்",
      waitlist: "காத்திருப்பு பட்டியல்: 750 இடங்கள் மட்டுமே",
      badge_loc: "பாக்பத் மாவட்டம், உத்தரப் பிரதேசம்",
      badge_cap: "750 உறுப்பினர் திறன்"
    },
    stats: {
      capacity: "திறன் இலக்கு",
      members: "சமூக உரிமையாளர்கள்",
      raised: "திரட்டப்பட்ட நிதி"
    },
    tabs: {
      overview: "கண்ணோட்டம்",
      calculator: "கால்குலேட்டர்",
      pricing: "விலை",
      roadmap: "வரைபடம்",
      whitepaper: "அறிக்கை",
      faq: "கேள்விகள்"
    },
    common: {
        payment_note: "UPI / வங்கி பரிமாற்றம் வழியாக மட்டுமே (100% KYC இணக்கம்). மொத்த இலக்கு: ₹16.5 கோடி.",
        funding_summary: "நிதி சுருக்கம் (USDC முதன்மை)",
        source: "மூலம்",
        target: "இலக்கு தொகை",
        notes: "குறிப்புகள்",
        table: {
            dao_members: "750 DAO உறுப்பினர்கள்",
            dao_note: "~₹2.5 கோடி. 2 இடங்கள் மட்டுமே விற்கப்பட்டன - அவசர தேவை.",
            subsidies: "மானியங்கள் (UPNEDA)",
            subsidies_amt: "Capex-ல் 30%",
            subsidies_note: "~₹7 கோடி. ஒப்புதலுக்காக நிலுவையில் உள்ளது.",
            treasury: "கருவூல மறுமுதலீடு",
            treasury_amt: "லாபத்தில் 20%",
            treasury_note: "பைலட்டுக்குப் பின் உருவாக்கப்படும்",
            total: "கட்டம் 1-க்கான மொத்தம்",
            total_note: "ஒப்புதல், கட்டுமானம் மற்றும் செயல்பாடுகள் அடங்கும்"
        },
        contact: "தொடர்பு",
        rights: "Helios#Baghpat முயற்சி. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
    },
    howItWorks: {
        title: "கிராமப்புற இந்தியாவுக்கான புதிய மாதிரி",
        subtitle: "ஹீலியோஸ் ஹாஷ் பாக்பத் ஒரு சமூகத்திற்குச் சொந்தமான சோலார் பூங்கா.",
        desc: "ஹீலியோஸ் ஹாஷ் பாக்பத் 24/7 பிட்காயின் சுரங்க கணினிகளை இயக்க இலவச சூரிய ஒளியைப் பயன்படுத்துகிறது. அனைத்து லாபங்களும் 750 உறுப்பினர் குடும்பங்கள் மற்றும் நில உரிமையாளருடன் மாதந்தோறும் பகிரப்படுகின்றன.",
        list: [
            "பூஜ்ஜிய மின் கட்டணம் - 100% சூரிய சக்தி",
            "அருகிலுள்ள பள்ளிகள் மற்றும் மருத்துவமனைகளுக்கு இலவச மின்சாரம்",
            "நில உரிமையாளருக்கு நிகர லாபத்தில் 7% (வாடகை இல்லை)",
            "UP சூரியக் கொள்கையால் ஆதரிக்கப்படுகிறது (30% மூலதன மானியம்)",
            "பதிவுசெய்யப்பட்ட பிரிவு-8 லாப நோக்கற்ற நிறுவனம்"
        ],
        steps: [
            { title: "1. சூரிய சக்தி", desc: "500kW பேனல்கள் ஆண்டுக்கு 8 லட்சம் யூனிட்களை உருவாக்குகின்றன" },
            { title: "2. 24/7 சுரங்கம்", desc: "ASIC-கள் இலவச சக்தியைப் பயன்படுத்தி BTC ஈட்டுகின்றன" },
            { title: "3. உபரி மின்சாரம்", desc: "பள்ளிகள் மற்றும் PHC-களுக்கு இலவசம்" },
            { title: "4. மாத லாபம்", desc: "750 உறுப்பினர்களுடன் பகிரப்படுகிறது" }
        ]
    },
    tiers: {
      title: "உறுப்பினர் நிலைகள்",
      subtitle: "வாழ்நாள் மாத வருமானத்திற்கான ஒரு முறை பங்களிப்பு",
      reserve: "இடத்தை பதிவு செய்",
      income: "மாத வருமானம் (ஆண்டு 5)",
      votes: "வாக்குகள்",
      left: "மீதமுள்ளது",
      best_value: "சிறந்த மதிப்பு",
      items: [
          { name: "முக்கிய நிறுவனர் (Core)", seats: 150, cost: "₹3,50,000", income: "₹68k - ₹87k", votes: 4 },
          { name: "நடுத்தர உறுப்பினர் (Mid)", seats: 300, cost: "₹2,25,000", income: "₹54k - ₹69k", votes: 2 },
          { name: "அடிப்படை உறுப்பினர் (Base)", seats: 300, cost: "₹1,50,000", income: "₹47k - ₹60k", votes: 1 }
      ]
    },
    calc: {
      title: "வருவாய் கால்குலேட்டர்",
      subtitle: "30% வரி மற்றும் செலவுகளுக்குப் பிறகு மதிப்பீடு",
      contribution: "பங்களிப்பு",
      y1: "ஆண்டு 1 / மாதம்",
      y3: "ஆண்டு 3 / மாதம்",
      y5: "ஆண்டு 5 / மாதம்",
      roi: "திட்டமிடப்பட்ட ROI"
    },
    roadmap: {
        title: "திருத்தப்பட்ட திட்ட வரைபடம் (v2.0)",
        subtitle: "டிசம்பர் 04, 2025 நிலவரப்படி",
        note: "குறிப்பு: '3-ஏக்கர் நில ஒப்பந்தம்' முடிந்தது. நில மாற்ற ஒப்புதலுக்காக நிதி திரட்டுவதில் உடனடி கவனம்.",
        steps: [
            { time: "2025 Q4", phase: "முன் வெளியீடு & DAO அமைப்பு", deliverables: ["DAO தொடங்கப்பட்டது", "இணையதளம் நேரலை", "3-ஏக்கர் நில ஒப்பந்தம் கையெழுத்தானது"], funding: "~167 USDC திரட்டப்பட்டது", capacity: "0 kW", profit: "–", status: "active" },
            { time: "2026 Q1", phase: "நிதி மற்றும் ஒப்புதல்", deliverables: ["நில மாற்றத்திற்கான நிதி திரட்டல்", "UPNEDA மானிய விண்ணப்பம்", "இறுதி ஒப்பந்தம்", "முதல் 100 கோர் இடங்கள் விற்கப்பட்டன"], funding: "50–100K USDC", capacity: "0 kW", profit: "–", status: "upcoming" },
            { time: "2026 Q2", phase: "பைலட் கட்டுமானம்", deliverables: ["நிலம் தயாரித்தல்", "50 kW சோலார் + 25 kW சுரங்கம்", "நெட்-மீட்டரிங் UPPCL", "முதல் இலவச மின் இணைப்பு"], funding: "100–150K USDC", capacity: "50 kW", profit: "சோதனை வருமானம்", status: "upcoming" },
            { time: "2026 Q3–Q4", phase: "முதல் வருவாய்", deliverables: ["முழு சுரங்க வருவாய்", "வரி இணக்கம்", "3 கட்டிடங்களுக்கு உபரி மின்சாரம்", "200kW-க்கான பொறியியல்"], funding: "150–200K USDC", capacity: "100 kW", profit: "₹37k–45k/மாதம்", status: "upcoming" },
            { time: "2027", phase: "250 kW வரை விரிவாக்கம்", deliverables: ["150 kW விரிவாக்கம்", "பேட்டரி பஃபர்", "வெப்ப மறுபயன்பாட்டு பைலட்"], funding: "200–250K USDC", capacity: "250 kW", profit: "₹54k–69k/மாதம்", status: "upcoming" },
            { time: "2028+", phase: "முழு அளவு மற்றும் வளர்ச்சி", deliverables: ["500 kW செயல்பாட்டில்", "3 PH/s ஹாஷ்ரேட்", "பூங்கா #2 விரிவாக்கம்"], funding: "சுயச்சார்பு", capacity: "500 kW+", profit: "₹68k–87k/மாதம்", status: "upcoming" }
        ]
    },
    whitepaper: {
        title: "HeliosHash DAO — வெள்ளை அறிக்கை v1.0",
        abstract_title: "1. சுருக்கம்",
        abstract_text: "HeliosHash DAO (HHDAO) இந்திய குடிமக்களை சூரிய சக்தியில் இயங்கும் பிட்காயின் சுரங்க பூங்காக்களின் இணை உரிமையாளர்களாக மாற்றுகிறது. இது மாதந்தோறும் INR லாபம், கிராமப்புற பள்ளிகளுக்கு இலவச மின்சாரம் மற்றும் நில உரிமையாளர்களுக்கு வருவாய் பங்கினை வழங்குகிறது.",
        vision_title: "2. பார்வை மற்றும் நோக்கம்",
        vision_text: "2030-க்குள் 50 மெகாவாட் சமூகத்திற்குச் சொந்தமான உள்கட்டமைப்பை உருவாக்குதல், இதன் மூலம் 7,500 குடும்பங்களுக்கு வருமானம் உருவாக்குதல்.",
        why_title: "3. இந்தியாவுக்கான வாய்ப்பு",
        why_points: ["UP-ல் அதிக சூரிய ஒளி (5.5 kWh/m²)", "பிட்காயின் சுரங்கம் சட்டப்பூர்வமானது (30% வரி)", "சோலார் மூலம் பூஜ்ஜிய ஆற்றல் செலவு", "விவசாயிகளுக்கு இரண்டாம் நிலை வருமானம் தேவை"],
        status_title: "4. தற்போதைய நிலை",
        status_points: ["1WP DaPP நேரலை", "3-ஏக்கர் நில ஒப்பந்தம் கையெழுத்தானது", "ஒப்புதலுக்கான மூலதனம் திரட்டல்"],
        join_title: "750 இணை உரிமையாளர்களுடன் சேரவும்",
        join_text: "நாங்கள் வாழ்நாள் உரிமையை விற்கிறோம், இது உங்களுக்கு மாதந்தோறும் பணம் செலுத்துகிறது."
    },
    faq: {
        title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
        items: [
            { q: "இந்தியாவில் பிட்காயின் சுரங்கம் சட்டப்பூர்வமானதா?", a: "ஆம். உச்ச நீதிமன்றம் தடையை நீக்கியது. வருமானத்திற்கு 30% வரி விதிக்கப்படுகிறது." },
            { q: "BTC விலை குறைந்தால் என்ன செய்வது?", a: "நாங்கள் இலவச சூரிய சக்தியைப் பயன்படுத்துகிறோம். குறைந்த விலையிலும், பூஜ்ஜிய ஆற்றல் செலவு காரணமாக திட்டம் லாபகரமானது." },
            { q: "NRI-கள் சேரலாமா?", a: "ஆம் - NRO கணக்கு மற்றும் நிலையான KYC நடைமுறைகள் மூலம்." },
            { q: "முதல் கட்டணம் எப்போது கிடைக்கும்?", a: "பைலட் நேரலைக்கு வந்த 60 நாட்களுக்குள் (ஏப்ரல் 2026 எதிர்பார்க்கப்படுகிறது)." }
        ]
    },
    modal: {
      title: "கட்டண முறையைத் தேர்ந்தெடுக்கவும்",
      desc: "DAO விற்கு நீங்கள் எவ்வாறு பங்களிக்க விரும்புகிறீர்கள் என்பதைத் தேர்வுசெய்யவும்.",
      upi: "UPI வழியாக செலுத்தவும் (INR)",
      crypto: "கிரிப்டோ வாலட் (USDC)",
      upi_desc: "பூஜ்ஜிய கட்டணம். BHIM, GPay, PhonePe வழியாக உடனடி தீர்வு.",
      crypto_desc: "Polygon/ICP நெட்வொர்க்கில் USDC ஐப் பயன்படுத்தவும்.",
      pay_btn_upi: "UPI செயலியைத் திறக்கவும்",
      pay_btn_crypto: "வாலட்டை இணைக்கவும்",
      scan_text: "BHIM, PhonePe, GPay மூலம் ஸ்கேன் செய்யவும்"
    }
  },
  ml: { // Malayalam
    nav: {
      whitepaper: "ധവളപത്രം",
      roadmap: "റോഡ്മാപ്പ്",
      dapp: "dApp",
      connect: "ബന്ധിപ്പിക്കുക / പണമടയ്ക്കുക"
    },
    hero: {
      tag: "ഇന്ത്യയിലെ ആദ്യത്തെ കമ്മ്യൂണിറ്റി ഉടമസ്ഥതയിലുള്ള",
      title: "സോളാർ പവർഡ് ബിറ്റ്കോയിൻ മൈനിംഗ് പാർക്ക്",
      subtitle: "സൂര്യപ്രകാശത്തെ ഗ്രാമീണ ഇന്ത്യയ്ക്ക് സമ്പത്ത്, തൊഴിൽ, സൗജന്യ വൈദ്യുതി എന്നിവയാക്കി മാറ്റുന്നു.",
      cta: "കോർ അംഗമായി ചേരുക",
      waitlist: "വെയ്റ്റ്‌ലിസ്റ്റ്: 750 സീറ്റുകൾ മാത്രം",
      badge_loc: "ബാഗ്പത് ജില്ല, ഉത്തർപ്രദേശ്",
      badge_cap: "750 അംഗ ശേഷി"
    },
    stats: {
      capacity: "ലക്ഷ്യം",
      members: "ഉടമകൾ",
      raised: "സമാഹരിച്ച ഫണ്ട്"
    },
    tabs: {
      overview: "അവലോകനം",
      calculator: "കാൽക്കുലേറ്റർ",
      pricing: "വില",
      roadmap: "റോഡ്മാപ്പ്",
      whitepaper: "ധവളപത്രം",
      faq: "ചോദ്യങ്ങൾ"
    },
    common: {
        payment_note: "പേയ്മെന്റ് UPI / ബാങ്ക് ട്രാൻസ്ഫർ വഴി മാത്രം (100% KYC). ആകെ ലക്ഷ്യം: ₹16.5 കോടി.",
        funding_summary: "ഫണ്ടിംഗ് സംഗ്രഹം (USDC പ്രൈമറി)",
        source: "സ്രോതസ്സ്",
        target: "ലക്ഷ്യ തുക",
        notes: "കുറിപ്പുകൾ",
        table: {
            dao_members: "750 DAO അംഗങ്ങൾ",
            dao_note: "~₹2.5 കോടി. 2 സീറ്റുകൾ മാത്രം വിറ്റു - അടിയന്തിര ആവശ്യം.",
            subsidies: "സബ്സിഡികൾ (UPNEDA)",
            subsidies_amt: "Capex-ന്റെ 30%",
            subsidies_note: "~₹7 കോടി. അംഗീകാരത്തിനായി കാത്തിരിക്കുന്നു.",
            treasury: "ട്രഷറി പുനർനിക്ഷേപം",
            treasury_amt: "ലാഭത്തിന്റെ 20%",
            treasury_note: "പൈലറ്റിന് ശേഷം രൂപീകരിക്കും",
            total: "ഘട്ടം 1-ന് ആകെ",
            total_note: "അംഗീകാരം, നിർമ്മാണം, പ്രവർത്തനങ്ങൾ എന്നിവ ഉൾപ്പെടുന്നു"
        },
        contact: "ബന്ധപ്പെടുക",
        rights: "Helios#Baghpat സംരംഭം. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം."
    },
    howItWorks: {
        title: "ഗ്രാമീണ ഇന്ത്യയ്ക്ക് ഒരു പുതിയ മാതൃക",
        subtitle: "ഹെലിയോസ് ഹാഷ് ബാഗ്പത് ഒരു കമ്മ്യൂണിറ്റി ഉടമസ്ഥതയിലുള്ള സോളാർ പാർക്കാണ്.",
        desc: "ഹെലിയോസ് ഹാഷ് ബാഗ്പത് 24/7 ബിറ്റ്കോയിൻ മൈനിംഗ് കമ്പ്യൂട്ടറുകൾ പ്രവർത്തിപ്പിക്കാൻ സൗജന്യ സൂര്യപ്രകാശം ഉപയോഗിക്കുന്നു. എല്ലാ ലാഭവും 750 അംഗ കുടുംബങ്ങളുമായും ഭൂവുടമയുമായും പ്രതിമാസം പങ്കിടുന്നു.",
        list: [
            "പൂജ്യം വൈദ്യുതി ബിൽ - 100% സോളാർ",
            "സമീപത്തെ സ്കൂളുകൾക്കും ആശുപത്രികൾക്കും സൗജന്യ വൈദ്യുതി",
            "ഭൂവുടമയ്ക്ക് അറ്റാദായത്തിന്റെ 7% (വാടകയില്ല)",
            "UP സോളാർ പോളിസിയുടെ പിന്തുണ (30% ക്യാപിറ്റൽ ഗ്രാന്റ്)",
            "രജിസ്റ്റർ ചെയ്ത സെക്ഷൻ-8 നോൺ-പ്രോഫിറ്റ് കമ്പനി"
        ],
        steps: [
            { title: "1. സൂര്യന്റെ ശക്തി", desc: "500kW പാനലുകൾ പ്രതിവർഷം 8 ലക്ഷം യൂണിറ്റ് ഉത്പാദിപ്പിക്കുന്നു" },
            { title: "2. 24/7 മൈനിംഗ്", desc: "ASIC-കൾ സൗജന്യ വൈദ്യുതി ഉപയോഗിച്ച് BTC നേടുന്നു" },
            { title: "3. അധിക വൈദ്യുതി", desc: "സ്കൂളുകൾക്കും PHC-കൾക്കും സൗജന്യം" },
            { title: "4. പ്രതിമാസ ലാഭം", desc: "750 അംഗങ്ങളുമായി പങ്കിടുന്നു" }
        ]
    },
    tiers: {
      title: "അംഗത്വ നിലകൾ",
      subtitle: "ആജീവനാന്ത മാസ വരുമാനത്തിന് ഒറ്റത്തവണ സംഭാവന",
      reserve: "സീറ്റ് ബുക്ക് ചെയ്യുക",
      income: "മാസ വരുമാനം (വർഷം 5)",
      votes: "വോട്ടുകൾ",
      left: "ബാക്കിയുള്ളവ",
      best_value: "മികച്ച മൂല്യം",
      items: [
          { name: "കോർ സ്ഥാപകൻ", seats: 150, cost: "₹3,50,000", income: "₹68k - ₹87k", votes: 4 },
          { name: "മിഡ് അംഗം", seats: 300, cost: "₹2,25,000", income: "₹54k - ₹69k", votes: 2 },
          { name: "ബേസ് അംഗം", seats: 300, cost: "₹1,50,000", income: "₹47k - ₹60k", votes: 1 }
      ]
    },
    calc: {
      title: "റിട്ടേൺസ് കാൽക്കുലേറ്റർ",
      subtitle: "30% നികുതിക്കും ചിലവുകൾക്കും ശേഷം",
      contribution: "സംഭാവന",
      y1: "വർഷം 1 / മാസം",
      y3: "വർഷം 3 / മാസം",
      y5: "വർഷം 5 / മാസം",
      roi: "പ്രതീക്ഷിക്കുന്ന ROI"
    },
    roadmap: {
        title: "പുതുക്കിയ പ്രോജക്റ്റ് റോഡ്മാപ്പ് (v2.0)",
        subtitle: "2025 ഡിസംബർ 04 പ്രകാരം",
        note: "ശ്രദ്ധിക്കുക: '3-ഏക്കർ ഭൂമി കരാർ' പൂർത്തിയായി. ഭൂമി മാറ്റത്തിനുള്ള അംഗീകാരത്തിനായി ഫണ്ട് സമാഹരിക്കുന്നതിലാണ് അടിയന്തിര ശ്രദ്ധ.",
        steps: [
            { time: "2025 Q4", phase: "പ്രീ-ലോഞ്ചും DAO സജ്ജീകരണവും", deliverables: ["DAO ആരംഭിച്ചു", "വെബ്സൈറ്റ് ലൈവ്", "3-ഏക്കർ ഭൂമി കരാർ ഒപ്പിട്ടു"], funding: "~167 USDC സമാഹരിച്ചു", capacity: "0 kW", profit: "–", status: "active" },
            { time: "2026 Q1", phase: "ഫണ്ടിംഗും അംഗീകാരവും", deliverables: ["ഭൂമി മാറ്റത്തിനുള്ള ഫണ്ട് സമാഹരണം", "UPNEDA സബ്സിഡി അപേക്ഷ", "അന്തിമ കരാർ", "ആദ്യ 100 കോർ സീറ്റുകൾ വിറ്റു"], funding: "50–100K USDC", capacity: "0 kW", profit: "–", status: "upcoming" },
            { time: "2026 Q2", phase: "പൈലറ്റ് നിർമ്മാണം", deliverables: ["ഭൂമി ഒരുക്കൽ", "50 kW സോളാർ + 25 kW മൈനിംഗ്", "നെറ്റ്-മീറ്ററിംഗ് UPPCL", "ആദ്യ സൗജന്യ വൈദ്യുതി ലൈൻ"], funding: "100–150K USDC", capacity: "50 kW", profit: "ട്രയൽ പേഔട്ട്", status: "upcoming" },
            { time: "2026 Q3–Q4", phase: "ആദ്യ വരുമാനം", deliverables: ["പൂർണ്ണ മൈനിംഗ് വരുമാനം", "നികുതി പാലിക്കൽ", "3 കെട്ടിടങ്ങൾക്ക് അധിക വൈദ്യുതി", "200kW-നുള്ള എഞ്ചിനീയറിംഗ്"], funding: "150–200K USDC", capacity: "100 kW", profit: "₹37k–45k/മാസം", status: "upcoming" },
            { time: "2027", phase: "250 kW വരെ വിപുലീകരണം", deliverables: ["150 kW വിപുലീകരണം", "ബാറ്ററി ബഫർ", "ഹീറ്റ് റീയൂസ് പൈലറ്റ്"], funding: "200–250K USDC", capacity: "250 kW", profit: "₹54k–69k/മാസം", status: "upcoming" },
            { time: "2028+", phase: "പൂർണ്ണ ശേഷിയും വളർച്ചയും", deliverables: ["500 kW പ്രവർത്തനക്ഷമം", "3 PH/s ഹാഷ്‌റേറ്റ്", "പാർക്ക് #2 വിപുലീകരണം"], funding: "സ്വയംപര്യാപ്തം", capacity: "500 kW+", profit: "₹68k–87k/മാസം", status: "upcoming" }
        ]
    },
    whitepaper: {
        title: "HeliosHash DAO — ധവളപത്രം v1.0",
        abstract_title: "1. സംഗ്രഹം",
        abstract_text: "HeliosHash DAO (HHDAO) ഇന്ത്യൻ പൗരന്മാരെ സോളാർ പവർഡ് ബിറ്റ്കോയിൻ മൈനിംഗ് പാർക്കുകളുടെ സഹ ഉടമകളാകാൻ പ്രാപ്തരാക്കുന്നു. ഇത് പ്രതിമാസ INR ലാഭം, ഗ്രാമീണ സ്കൂളുകൾക്ക് സൗജന്യ വൈദ്യുതി, ഭൂവുടമകൾക്ക് വരുമാന വിഹിതം എന്നിവ നൽകുന്നു.",
        vision_title: "2. കാഴ്ചപ്പാടും ദൗത്യവും",
        vision_text: "2030-ഓടെ 50 മെഗാവാട്ട് കമ്മ്യൂണിറ്റി ഉടമസ്ഥതയിലുള്ള അടിസ്ഥാന സൗകര്യങ്ങൾ വിന്യസിക്കുക, അതിലൂടെ 7,500 കുടുംബങ്ങൾക്ക് വരുമാനം സൃഷ്ടിക്കുക.",
        why_title: "3. ഇന്ത്യയിലെ അവസരം",
        why_points: ["UP-യിൽ ഉയർന്ന സൂര്യപ്രകാശം (5.5 kWh/m²)", "ബിറ്റ്കോയിൻ മൈനിംഗ് നിയമപരമാണ് (30% നികുതി)", "സോളാർ വഴി പൂജ്യം ഊർജ്ജ ചെലവ്", "കർഷകർക്ക് ദ്വിതീയ വരുമാനം ആവശ്യമാണ്"],
        status_title: "4. നിലവിലെ അവസ്ഥ",
        status_points: ["1WP DaPP ലൈവ്", "3-ഏക്കർ ഭൂമി കരാർ ഒപ്പിട്ടു", "അംഗീകാരത്തിനായി മൂലധനം സമാഹരിക്കുന്നു"],
        join_title: "750 സഹ ഉടമകൾക്കൊപ്പം ചേരുക",
        join_text: "ഞങ്ങൾ ആജീവനാന്ത ഉടമസ്ഥാവകാശമാണ് വിൽക്കുന്നത്, അത് നിങ്ങൾക്ക് പ്രതിമാസം പണം നൽകുന്നു."
    },
    faq: {
        title: "ചോദ്യങ്ങൾ",
        items: [
            { q: "ഇന്ത്യയിൽ ബിറ്റ്കോയിൻ മൈനിംഗ് നിയമപരമാണോ?", a: "അതെ. സുപ്രീം കോടതി നിരോധനം നീക്കി. വരുമാനത്തിന് 30% നികുതി ബാധകമാണ്." },
            { q: "BTC വില കുറഞ്ഞാൽ എന്ത് സംഭവിക്കും?", a: "ഞങ്ങൾ സൗജന്യ സോളാർ പവറാണ് ഉപയോഗിക്കുന്നത്. കുറഞ്ഞ വിലയിലും, പൂജ്യം ഊർജ്ജ ചെലവ് കാരണം പദ്ധതി ലാഭകരമാണ്." },
            { q: "NRI-കൾക്ക് ചേരാമോ?", a: "അതെ - NRO അക്കൗണ്ട് വഴിയും സാധാരണ KYC നടപടിക്രമങ്ങൾ വഴിയും." },
            { q: "ആദ്യ പേഔട്ട് എപ്പോൾ ലഭിക്കും?", a: "പൈലറ്റ് ലൈവ് ആയി 60 ദിവസത്തിനുള്ളിൽ (ഏപ്രിൽ 2026 പ്രതീക്ഷിക്കുന്നു)." }
        ]
    },
    modal: {
      title: "പേയ്മെന്റ് രീതി തിരഞ്ഞെടുക്കുക",
      desc: "നിങ്ങൾ DAO-ലേക്ക് എങ്ങനെ സംഭാവന നൽകണമെന്ന് തിരഞ്ഞെടുക്കുക.",
      upi: "UPI വഴി പണമടയ്ക്കുക (INR)",
      crypto: "ക്രിപ്റ്റോ വാലറ്റ് (USDC)",
      upi_desc: "ഫീസില്ല. BHIM, GPay, PhonePe വഴി തൽക്ഷണ സെറ്റിൽമെന്റ്.",
      crypto_desc: "Polygon/ICP നെറ്റ്‌വർക്കിൽ USDC ഉപയോഗിക്കുക.",
      pay_btn_upi: "UPI ആപ്പ് തുറക്കുക",
      pay_btn_crypto: "വാലറ്റ് ബന്ധിപ്പിക്കുക",
      scan_text: "BHIM, PhonePe, GPay വഴി സ്കാൻ ചെയ്യുക"
    }

  },

  te: {

    nav: {

      whitepaper: "వైట్‌పేపర్",

      roadmap: "రోడ్‌మ్యాప్",

      dapp: "డ్యాప్",

      connect: "కనెక్ట్ / చెల్లించు"

    },

    hero: {

      tag: "ఇండియా యొక్క మొదటి కమ్యూనిటీ-ఆధారిత",

      title: "సోలార్-పవర్డ్ బిట్‌కాయిన్ మైనింగ్ పార్క్",

      subtitle: "గ్రామీణ ఇండియాకు సూర్యకిరణాలను సంపద, ఉద్యోగాలు మరియు ఉచిత విద్యుత్‌గా మార్చడం।",

      cta: "ముఖ్య సభ్యుడిగా చేరండి",

      waitlist: "వెయిట్‌లిస్ట్: 750 సీట్లు మాత్రమే",

      badge_loc: "బాగ్‌పట్ జిల్లా, ఉత్తరప్రదేశ్",

      badge_cap: "750 సభ్యుల సామర్థ్యం"

    },

    stats: {

      capacity: "సామర్థ్య లక్ష్యం",

      members: "కమ్యూనిటీ యజమానులు",

      raised: "సేకరించిన నిధులు"

    },

    tabs: {

      overview: "అవలోకనం",

      calculator: "క్యాల్క్యులేటర్",

      pricing: "ధరలు",

      roadmap: "రోడ్‌మ్యాప్",

      whitepaper: "వైట్‌పేపర్",

      faq: "ప్రశ్నలు"

    },

    common: {

        payment_note: "చెల్లింపు UPI / బ్యాంక్ ట్రాన్స్ఫర్ మూలమే (100% KYC అనుగుణంగా). మొత్తం లక్ష్యం: ₹16.5 కోట్లు।",

        funding_summary: "నిధుల సారాంశం (USDC ప్రాథమిక)",

        source: "మూలం",

        target: "లక్ష్య మొత్తం",

        notes: "గమనికలు",

        table: {

            dao_members: "750 DAO సభ్యులు",

            dao_note: "~₹2.5 కోట్లు. 2 సీట్లు మాత్రమే విక్రయించబడ్డాయి - అత్యవసర పుష్ అవసరం।",

            subsidies: "సబ్సిడీలు (UPNEDA)",

            subsidies_amt: "Capex యొక్క 30%",

            subsidies_note: "~₹7 కోట్లు. మంజూరుల కోసం పెండింగ్।",

            treasury: "ట్రెజరీ పునర్నివేశం",

            treasury_amt: "లాభాల యొక్క 20%",

            treasury_note: "పైలట్ తర్వాత నిర్మించబడుతుంది",

            total: "ఫేజ్ 1 కోసం మొత్తం",

            total_note: "మంజూరులు, నిర్మాణం మరియు ఆపరేషన్స్ కవర్ చేస్తుంది"

        },

        contact: "సంప్రదించండి",

        rights: "Helios#Baghpat ప్రారంభం. అన్ని హక్కులు సురక్షితం।"

    },

    howItWorks: {

        title: "గ్రామీణ ఇండియా కోసం కొత్త మోడల్",

        subtitle: "HeliosHash బాగ్‌పట్ ఒక కమ్యూనిటీ-ఆధారిత సోలార్ పార్క్।",

        desc: "HeliosHash బాగ్‌పట్ 24/7 బిట్‌కాయిన్ మైనింగ్ కంప్యూటర్‌లను నడపడానికి ఉచిత సూర్యకిరణాలను ఉపయోగిస్తుంది. అన్ని లాభాలు 750 సభ్య కుటుంబాలు మరియు భూమి యజమానితో నెలవారీగా పంచుకోబడతాయి।",

        list: [

            "శూన్య విద్యుత్ బిల్ - 100% సోలార్ శక్తి",

            "సమీప పాఠశాలలు మరియు ఆసుపత్రులకు ఉచిత విద్యుత్",

            "భూమి యజమానికి నికర లాభం యొక్క 7% (వాటా లేదు)",

            "UP సోలార్ పాలసీ ద్వారా మద్దతు (30% మూలధన మంజూరు)",

            "రిజిస్టర్డ్ సెక్షన్-8 నాన్-ప్రాఫిట్ కంపెనీ"

        ],

        steps: [

            { title: "1. సూర్యం అంతా శక్తి", desc: "500kW ప్యానెల్స్ 8L యూనిట్స్/వర్షం ఉత్పత్తి చేస్తాయి" },

            { title: "2. 24/7 మైనింగ్", desc: "ASICలు ఉచిత శక్తిని ఉపయోగించి BTC సంపాదిస్తాయి" },

            { title: "3. అదనపు శక్తి", desc: "పాఠశాలలు మరియు PHCలకు ఉచితం" },

            { title: "4. నెలవారీ లాభం", desc: "750 సభ్యులతో పంచుకోబడుతుంది" }

        ]

    },

    tiers: {

      title: "సభ్యత్వ స్థాయిలు",

      subtitle: "ఆజీవన నెలవారీ ఆదాయం కోసం ఒక్కసారి సహాయం",

      reserve: "సీట్ రిజర్వ్ చేయండి",

      income: "నెలవారీ ఆదాయం (వర్షం 5)",

      votes: "వోట్లు",

      left: "మిగిలి ఉన్నాయి",

      best_value: "ఉత్తమ విలువ",

      items: [

          { name: "కోర్ ఫౌండర్", seats: 150, cost: "₹3,50,000", income: "₹68k - ₹87k", votes: 4 },

          { name: "మిడ్ మెంబర్", seats: 300, cost: "₹2,25,000", income: "₹54k - ₹69k", votes: 2 },

          { name: "బేస్ మెంబర్", seats: 300, cost: "₹1,50,000", income: "₹47k - ₹60k", votes: 1 }

      ]

    },

    calc: {

      title: "రిటర్న్స్ క్యాల్క్యులేటర్",

      subtitle: "30% పన్ను మరియు ఖర్చుల తర్వాత అంచనాలు",

      contribution: "సహాయం",

      y1: "వర్షం 1 / నెల",

      y3: "వర్షం 3 / నెల",

      y5: "వర్షం 5 / నెల",

      roi: "అంచనా ROI"

    },

    roadmap: {

        title: "సవరించిన ప్రాజెక్ట్ రోడ్‌మ్యాప్ (v2.0)",

        subtitle: "04 డిసెంబర్ 2025 నాడు ప్రస్తుత స్థితి ఆధారంగా",

        note: "గమనిక: '3-ఏకర్ భూమి ఒప్పందం' పూర్తైంది. భూమి మార్పు మంజూరుల కోసం నిధుల సేకరణపై తక్షణ దృష్టి।",

        steps: [

            { time: "2025 Q4", phase: "ప్రీ-లాంచ్ & DAO సెటప్", deliverables: ["DAO లాంచ్ అయింది", "వెబ్‌సైట్ లైవ్", "3-ఏకర్ భూమి ఒప్పందం సంతకం చేయబడింది"], funding: "~167 USDC సేకరించబడింది", capacity: "0 kW", profit: "–", status: "active" },

            { time: "2026 Q1", phase: "నిధులు & మంజూరులు", deliverables: ["భూమి మార్పు నిధులు", "UPNEDA సబ్సిడీ అప్లై", "అంతిమ కాంట్రాక్ట్", "మొదటి 100 కోర్ సీట్లు విక్రయించబడ్డాయి"], funding: "50–100K USDC", capacity: "0 kW", profit: "–", status: "upcoming" },

            { time: "2026 Q2", phase: "పైలట్ బిల్డ్-అవుట్", deliverables: ["భూమి ప్రిప్ & ఫెన్సింగ్", "50 kW సోలార్ + 25 kW మైనింగ్", "నెట్-మీటరింగ్ UPPCL", "మొదటి ఉచిత పవర్ లైన్"], funding: "100–150K USDC", capacity: "50 kW", profit: "ట్రయల్ పేఆవుట్", status: "upcoming" },

            { time: "2026 Q3–Q4", phase: "మొదటి రెవెన్యూ", deliverables: ["పూర్తి మైనింగ్ రెవెన్యూ", "ట్యాక్స్ కంప్లైన్స్", "3 బిల్డింగ్‌లకు అదనపు పవర్", "200kW కోసం ఇంజినీరింగ్"], funding: "150–200K USDC", capacity: "100 kW", profit: "₹37k–45k/నెల", status: "upcoming" },

            { time: "2027", phase: "250 kW వరకు స్కేల్", deliverables: ["150 kW ఎక్స్‌ప్యాన్షన్", "బ్యాటరీ బఫర్", "హీట్ రీయూస్ పైలట్"], funding: "200–250K USDC", capacity: "250 kW", profit: "₹54k–69k/నెల", status: "upcoming" },

            { time: "2028+", phase: "పూర్తి స్కేల్ & గ్రోత్", deliverables: ["500 kW ఆపరేషనల్", "3 PH/s హాష్‌రేట్", "పార్క్ #2 ఎక్స్‌ప్యాన్షన్"], funding: "సెల్ఫ్-సస్టైనింగ్", capacity: "500 kW+", profit: "₹68k–87k/నెల", status: "upcoming" }

        ]

    },

    whitepaper: {

        title: "HeliosHash DAO — వైట్‌పేపర్ v1.0",

        abstract_title: "1. సారాంశం",

        abstract_text: "HeliosHash DAO (HHDAO) ఇండియన్ పౌరులకు సోలార్-పవర్డ్ బిట్‌కాయిన్ మైనింగ్ పార్క్‌లలో సహ-యజమానులు కావడానికి సక్షమం చేస్తుంది. ఇది నెలవారీ INR లాభాలు, గ్రామీణ పాఠశాలలకు ఉచిత విద్యుత్ మరియు భూమి యజమానులకు ఆదాయ విహితాన్ని అందిస్తుంది।",

        vision_title: "2. దృష్టి మరియు మిషన్",

        vision_text: "2030 వరకు 50 MW కమ్యూనిటీ-ఆధారిత బౌల్డర్స్‌ను అమలు చేయడం, 7,500 కుటుంబాలకు ఆదాయం సృష్టించడం।",

        why_title: "3. ఇండియా అవకాశం",

        why_points: ["UPలో అధిక సూర్యకిరణం (5.5 kWh/m²)", "బిట్‌కాయిన్ మైనింగ్ చట్టపరంగా ఉంది (30% పన్ను)", "సోలార్‌తో శూన్య శక్తి ఖర్చు", "వ్యవసాయికులకు రెండవ ఆదాయం అవసరం"],

        status_title: "4. ప్రస్తుత స్థితి",

        status_points: ["1WP DaPP లైవ్", "3-ఏకర్ భూమి ఒప్పందం సంతకం చేయబడింది", "మంజూరుల కోసం మూలధనం సేకరించడం"],

        join_title: "750 సహ-యజమానులలో చేరండి",

        join_text: "మేము మీకు నెలవారీ చెల్లింపు చేసే ఆజీవన యజమానిత్వాన్ని విక్రయిస్తున్నాము।"

    },

    faq: {

        title: "తరచుగా అడిగే ప్రశ్నలు",

        items: [

            { q: "ఇండియాలో బిట్‌కాయిన్ మైనింగ్ చట్టపరంగా ఉందా?", a: "అవును. సుప్రీం కోర్టు నిషేధాన్ని తొలగించింది. ఆదాయానికి 30% పన్ను విధించబడుతుంది।" },

            { q: "BTC విలువ పడిపోతే ఏమి చేయాలి?", a: "మేము ఉచిత సోలార్ శక్తిని ఉపయోగిస్తాము. తక్కువ విలువలలో కూడా, శూన్య శక్తి ఖర్చు కారణంగా ప్రాజెక్ట్ లాభకరంగా ఉంటుంది।" },

            { q: "NRIలు చేరవచ్చా?", a: "అవును - NRO ఖాతా మరియు ప్రామాణిక KYC ప్రక్రియల ద్వారా।" },

            { q: "మొదటి చెల్లింపు ఎప్పుడు?", a: "పైలట్ లైవ్ అయిన 60 రోజులలో (అప్రిల్ 2026 అంచనా)।" }

        ]

    },

    modal: {

      title: "చెల్లింపు పద్ధతిని ఎంచుకోండి",

      desc: "DAOకి మీరు ఎలా సహాయం చేయాలనుకుంటున్నారో ఎంచుకోండి।",

      upi: "UPI ద్వారా చెల్లించండి (INR)",

      crypto: "క్రిప్టో వాలెట్ (USDC)",

      upi_desc: "శూన్య ఫీలు. BHIM, GPay, PhonePe ద్వారా తక్షణ పతావళి।",

      crypto_desc: "Polygon/ICP నెట్‌వర్క్‌లో USDCని ఉపయోగించండి।",

      pay_btn_upi: "UPI యాప్‌లో చెల్లించడానికి తెరవండి",

      pay_btn_crypto: "వాలెట్ కనెక్ట్ చేయండి",

      scan_text: "BHIM, PhonePe, GPay, Paytmతో స్కాన్ చేయండి"

    }

  },

  bn: {
    nav: {
      whitepaper: "সাদা কাগজ",
      roadmap: "রোডম্যাপ",
      dapp: "dApp",
      connect: "সংযোগ করুন / অর্থ প্রদান করুন"
    },
    hero: {
      tag: "ভারতের প্রথম সম্প্রদায়-মালিকানাধীন",
      title: "সৌর-চালিত বিটকয়েন মাইনিং পার্ক",
      subtitle: "গ্রামীণ ভারতের জন্য সূর্যের আলোকে সম্পদ, চাকরি এবং বিনামূল্যে বিদ্যুতে পরিণত করা।",
      cta: "মূল সদস্য হিসেবে যোগ দিন",
      waitlist: "অপেক্ষা তালিকা: শুধুমাত্র 750টি আসন",
      badge_loc: "বাগপত জেলা, উত্তর প্রদেশ",
      badge_cap: "750 সদস্য ক্ষমতা"
    },
    stats: {
      capacity: "ক্ষমতা লক্ষ্য",
      members: "সম্প্রদায় মালিক",
      raised: "সংগৃহীত তহবিল"
    },
    tabs: {
      overview: "অভিগমন",
      calculator: "ক্যালকুলেটর",
      pricing: "মূল্য নির্ধারণ",
      roadmap: "রোডম্যাপ",
      whitepaper: "সাদা কাগজ",
      faq: "প্রশ্নাবলী"
    },
    common: {
        payment_note: "অর্থ প্রদান শুধুমাত্র UPI / ব্যাংক ট্রান্সফার (100% KYC সম্মত)। মোট লক্ষ্য: ₹16.5 কোটি।",
        funding_summary: "তহবিল সারাংশ (USDC প্রাথমিক)",
        source: "উৎস",
        target: "লক্ষ্য পরিমাণ",
        notes: "নোট",
        table: {
            dao_members: "750 DAO সদস্য",
            dao_note: "~₹2.5 কোটি। শুধুমাত্র 2টি আসন বিক্রি হয়েছে - জরুরী প্রয়োজন।",
            subsidies: "ভর্তুকি (UPNEDA)",
            subsidies_amt: "Capex-এর 30%",
            subsidies_note: "~₹7 কোটি। অনুমোদনের জন্য অপেক্ষমান।",
            treasury: "খজানা পুনঃবিনিয়োগ",
            treasury_amt: "লাভের 20%",
            treasury_note: "পাইলটের পরে তৈরি হবে",
            total: "পর্যায় 1-এর জন্য মোট",
            total_note: "অনুমোদন, নির্মাণ এবং অপারেশন কভার করে"
        },
        contact: "যোগাযোগ করুন",
        rights: "Helios#Baghpat উদ্যোগ। সমস্ত অধিকার সংরক্ষিত।"
    },
    howItWorks: {
        title: "গ্রামীণ ভারতের জন্য একটি নতুন মডেল",
        subtitle: "HeliosHash বাগপত একটি সম্প্রদায়-মালিকানাধীন সৌর পার্ক।",
        desc: "HeliosHash বাগপত 24/7 বিটকয়েন মাইনিং কম্পিউটার চালানোর জন্য বিনামূল্যে সূর্যের আলো ব্যবহার করে। সমস্ত লাভ 750 সদস্য পরিবার এবং ভূমি মালিকের সাথে মাসিক ভাগ করা হয়।",
        list: [
            "শূন্য বিদ্যুত বিল - 100% সৌর শক্তি",
            "নিকটবর্তী স্কুল এবং হাসপাতালে বিনামূল্যে বিদ্যুত",
            "ভূমি মালিককে নিট লাভের 7% (কোন ভাড়া নয়)",
            "UP সৌর নীতি দ্বারা সমর্থিত (30% মূলধন অনুদান)",
            "নিবন্ধিত ধারা-8 অলাভজনক কোম্পানি"
        ],
        steps: [
            { title: "1. সূর্যের শক্তি সব", desc: "500kW প্যানেল বছরে 8L ইউনিট উৎপাদন করে" },
            { title: "2. 24/7 মাইনিং", desc: "ASIC বিনামূল্যে শক্তি ব্যবহার করে BTC অর্জন করে" },
            { title: "3. অতিরিক্ত শক্তি", desc: "স্কুল এবং PHC-এর জন্য বিনামূল্যে" },
            { title: "4. মাসিক লাভ", desc: "750 সদস্যের সাথে ভাগ করা" }
        ]
    },
    tiers: {
      title: "সদস্যতা স্তর",
      subtitle: "আজীবন মাসিক আয়ের জন্য একক অবদান",
      reserve: "আসন সংরক্ষণ করুন",
      income: "মাসিক আয় (বছর 5)",
      votes: "ভোট",
      left: "বাকি",
      best_value: "সেরা মূল্য",
      items: [
          { name: "মূল প্রতিষ্ঠাতা", seats: 150, cost: "₹3,50,000", income: "₹68k - ₹87k", votes: 4 },
          { name: "মধ্য সদস্য", seats: 300, cost: "₹2,25,000", income: "₹54k - ₹69k", votes: 2 },
          { name: "ভিত্তি সদস্য", seats: 300, cost: "₹1,50,000", income: "₹47k - ₹60k", votes: 1 }
      ]
    },
    calc: {
      title: "রিটার্ন ক্যালকুলেটর",
      subtitle: "30% কর এবং খরচের পরে অনুমান",
      contribution: "অবদান",
      y1: "বছর 1 / মাস",
      y3: "বছর 3 / মাস",
      y5: "বছর 5 / মাস",
      roi: "অনুমানিত ROI"
    },
    roadmap: {
        title: "সংশোধিত প্রকল্প রোডম্যাপ (v2.0)",
        subtitle: "04 ডিসেম্বর 2025-এর বর্তমান অবস্থার উপর ভিত্তি করে",
        note: "নোট: '3-একর ভূমি চুক্তি' সম্পন্ন হয়েছে। ভূমি রূপান্তর অনুমোদনের জন্য তহবিল সংগ্রহে তাৎক্ষণিক ফোকাস।",
        steps: [
            { time: "2025 Q4", phase: "প্রাক-লঞ্চ এবং DAO সেটআপ", deliverables: ["DAO লঞ্চ হয়েছে", "ওয়েবসাইট লাইভ", "3-একর ভূমি চুক্তি স্বাক্ষরিত"], funding: "~167 USDC সংগৃহীত", capacity: "0 kW", profit: "–", status: "active" },
            { time: "2026 Q1", phase: "তহবিল এবং অনুমোদন", deliverables: ["ভূমি রূপান্তর তহবিল", "UPNEDA ভর্তুকি আবেদন", "চূড়ান্ত চুক্তি", "প্রথম 100 মূল আসন বিক্রি হয়েছে"], funding: "50–100K USDC", capacity: "0 kW", profit: "–", status: "upcoming" },
            { time: "2026 Q2", phase: "পাইলট নির্মাণ", deliverables: ["ভূমি প্রস্তুতি এবং বেড়া", "50 kW সৌর + 25 kW মাইনিং", "নেট-মিটারিং UPPCL", "প্রথম বিনামূল্যে শক্তি লাইন"], funding: "100–150K USDC", capacity: "50 kW", profit: "ট্রায়াল পেআউট", status: "upcoming" },
            { time: "2026 Q3–Q4", phase: "প্রথম রাজস্ব", deliverables: ["পূর্ণ মাইনিং রাজস্ব", "কর সম্মতি", "3 ভবনের জন্য অতিরিক্ত শক্তি", "200kW-এর জন্য প্রকৌশল"], funding: "150–200K USDC", capacity: "100 kW", profit: "₹37k–45k/মাস", status: "upcoming" },
            { time: "2027", phase: "250 kW পর্যন্ত স্কেল", deliverables: ["150 kW সম্প্রসারণ", "ব্যাটারি বাফার", "হিট রিইউজ পাইলট"], funding: "200–250K USDC", capacity: "250 kW", profit: "₹54k–69k/মাস", status: "upcoming" },
            { time: "2028+", phase: "পূর্ণ স্কেল এবং বৃদ্ধি", deliverables: ["500 kW কার্যকর", "3 PH/s হ্যাশরেট", "পার্ক #2 সম্প্রসারণ"], funding: "স্ব-স্থায়ী", capacity: "500 kW+", profit: "₹68k–87k/মাস", status: "upcoming" }
        ]
    },
    whitepaper: {
        title: "HeliosHash DAO — সাদা কাগজ v1.0",
        abstract_title: "1. সারাংশ",
        abstract_text: "HeliosHash DAO (HHDAO) ভারতীয় নাগরিকদের সৌর-চালিত বিটকয়েন মাইনিং পার্কের সহ-মালিক হতে সক্ষম করে। এটি মাসিক INR লাভ, গ্রামীণ স্কুলে বিনামূল্যে বিদ্যুত এবং ভূমি মালিকদের রাজস্ব ভাগ প্রদান করে।",
        vision_title: "2. দৃষ্টি এবং মিশন",
        vision_text: "2030 পর্যন্ত 50 MW সম্প্রদায়-মালিকানাধীন অবকাঠামো স্থাপন করা, 7,500 পরিবারের জন্য আয় তৈরি করা।",
        why_title: "3. ভারতের সুযোগ",
        why_points: ["UP-তে উচ্চ সূর্যালোক (5.5 kWh/m²)", "বিটকয়েন মাইনিং বৈধ (30% কর)", "সৌরের সাথে শূন্য শক্তি খরচ", "কৃষকদের দ্বিতীয় আয়ের প্রয়োজন"],
        status_title: "4. বর্তমান অবস্থা",
        status_points: ["1WP DaPP লাইভ", "3-একর ভূমি চুক্তি স্বাক্ষরিত", "অনুমোদনের জন্য মূলধন সংগ্রহ"],
        join_title: "750 সহ-মালিকদের সাথে যোগ দিন",
        join_text: "আমরা আপনাকে মাসিক অর্থ প্রদান করে এমন আজীবন মালিকানা বিক্রি করছি।"
    },
    faq: {
        title: "সাধারণ প্রশ্ন",
        items: [
            { q: "ভারতে বিটকয়েন মাইনিং বৈধ কি?", a: "হ্যাঁ। সুপ্রিম কোর্ট নিষেধাজ্ঞা তুলে নিয়েছে। আয়ে 30% কর লাগে।" },
            { q: "BTC মূল্য পড়লে কী হবে?", a: "আমরা বিনামূল্যে সৌর শক্তি ব্যবহার করি। কম মূল্যেও, শূন্য শক্তি খরচের কারণে প্রকল্প লাভজনক থাকে।" },
            { q: "NRI যোগ দিতে পারে?", a: "হ্যাঁ - NRO অ্যাকাউন্ট এবং স্ট্যান্ডার্ড KYC প্রক্রিয়ার মাধ্যমে।" },
            { q: "প্রথম অর্থ প্রদান কখন?", a: "পাইলট লাইভ হওয়ার 60 দিনের মধ্যে (অপ্রিল 2026 অনুমান)।" }
        ]
    },
    modal: {
      title: "অর্থ প্রদান পদ্ধতি নির্বাচন করুন",
      desc: "DAO-তে আপনি কীভাবে অবদান রাখতে চান তা নির্বাচন করুন।",
      upi: "UPI দিয়ে অর্থ প্রদান (INR)",
      crypto: "ক্রিপ্টো ওয়ালেট (USDC)",
      upi_desc: "শূন্য ফি। BHIM, GPay, PhonePe দিয়ে তাৎক্ষণিক নিষ্পত্তি।",
      crypto_desc: "Polygon/ICP নেটওয়ার্কে USDC ব্যবহার করুন।",
      pay_btn_upi: "UPI অ্যাপ খুলে অর্থ প্রদান করুন",
      pay_btn_crypto: "ওয়ালেট সংযোগ করুন",
      scan_text: "BHIM, PhonePe, GPay, Paytm দিয়ে স্ক্যান করুন"
    }
  }

};

type LanguageKey = keyof typeof translations;

// --- Components ---

const ProgressBar = ({ current, total, colorClass = "bg-orange-500" }: { current: number; total: number; colorClass?: string }) => {
  const percentage = Math.min((current / total) * 100, 100);
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-2">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`h-full ${colorClass}`}
      />
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, subtext, progress }: { icon: any; label: string; value: string; subtext?: string; progress?: { current: number, total: number } }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 flex items-start justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
      </div>
      <div className="p-3 bg-white/10 rounded-xl text-orange-400">
        <Icon size={24} />
      </div>
    </div>
    {progress && (
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span>{Math.round((progress.current / progress.total) * 100)}%</span>
        </div>
        <ProgressBar current={progress.current} total={progress.total} colorClass="bg-gradient-to-r from-orange-500 to-yellow-500" />
      </div>
    )}
  </motion.div>
);

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold brand-font text-white mb-2">{title}</h2>
    {subtitle && <p className="text-gray-400 max-w-2xl">{subtitle}</p>}
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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-[#0F121C] border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">{t.modal.title}</h3>
                <p className="text-sm text-gray-400">{t.modal.desc}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex p-2 gap-2 bg-black/20 m-6 mb-0 rounded-xl">
              <button 
                onClick={() => setMethod('upi')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${method === 'upi' ? 'bg-orange-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                <Smartphone size={16} /> UPI (INR)
              </button>
              <button 
                onClick={() => setMethod('crypto')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${method === 'crypto' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                <Wallet size={16} /> Crypto (USDC)
              </button>
            </div>

            {/* Content */}
            <div className="p-6 pt-4">
              {method === 'upi' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center">
                  <div className="bg-white p-4 rounded-2xl inline-block mx-auto border-4 border-orange-500/20">
                     <QrCode size={140} className="text-black" />
                  </div>
                  <p className="text-gray-300 text-sm">{t.modal.scan_text}</p>
                  
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-center justify-between">
                    <span className="text-xs text-gray-500 uppercase">VPA ID</span>
                    <span className="font-mono text-orange-400">{upiId}</span>
                  </div>

                  <div className="text-left bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mt-4">
                    <h5 className="text-orange-400 text-sm font-bold flex items-center gap-2">
                       <CheckCircle2 size={14} /> {t.modal.upi}
                    </h5>
                    <p className="text-xs text-gray-400 mt-1">{t.modal.upi_desc}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center">
                  <div className="w-full bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[180px]">
                    <Wallet size={48} className="text-blue-400 mb-4" />
                    <p className="text-white font-medium">Connect Web3 Wallet</p>
                    <p className="text-xs text-gray-500 mt-1">Metamask, Phantom, Rabby</p>
                  </div>
                  
                  <div className="text-left bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mt-4">
                    <h5 className="text-blue-400 text-sm font-bold flex items-center gap-2">
                       <Globe size={14} /> {t.modal.crypto}
                    </h5>
                    <p className="text-xs text-gray-400 mt-1">{t.modal.crypto_desc}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/20">
              {method === 'upi' ? (
                 <a 
                   href={upiLink}
                   className={`block text-center w-full py-4 rounded-xl font-bold text-white shadow-lg transform active:scale-95 transition-all bg-gradient-to-r from-orange-600 to-yellow-600`}
                 >
                   {t.modal.pay_btn_upi}
                 </a>
              ) : (
                <button className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transform active:scale-95 transition-all bg-blue-600`}>
                  {t.modal.pay_btn_crypto}
                </button>
              )}
              
              <p className="text-center text-[10px] text-gray-600 mt-3">
                Secure SSL Encrypted Payment. {method === 'upi' ? 'No platform fees apply.' : 'Standard network gas fees apply.'}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ROICalculator = ({ lang }: { lang: LanguageKey }) => {
  const [selectedTier, setSelectedTier] = useState<"Base" | "Mid" | "Core">("Base");
  const t = translations[lang];

  const data = {
    Base: {
      label: t.tiers.items[2].name,
      cost: t.tiers.items[2].cost,
      y1: "₹27,000 – ₹33,000",
      y3: "₹38,000 – ₹48,000",
      y5: "₹47,000 – ₹60,000",
      roi: "220-280%"
    },
    Mid: {
      label: t.tiers.items[1].name,
      cost: t.tiers.items[1].cost,
      y1: "₹40,500 – ₹49,500",
      y3: "₹57,000 – ₹72,000",
      y5: "₹70,500 – ₹90,000",
      roi: "230-290%"
    },
    Core: {
      label: t.tiers.items[0].name,
      cost: t.tiers.items[0].cost,
      y1: "₹63,000 – ₹77,000",
      y3: "₹88,000 – ₹1,12,000",
      y5: "₹1,09,000 – ₹1,40,000",
      roi: "240-300%"
    }
  };

  const current = data[selectedTier];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calculator className="text-green-400" /> {t.calc.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{t.calc.subtitle}</p>
        </div>
        <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
          {(["Base", "Mid", "Core"] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                selectedTier === tier 
                  ? "bg-green-600 text-white shadow-lg" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {data[tier].label.split(" ")[0]} 
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">{t.calc.contribution}</p>
          <p className="text-2xl font-bold text-white">{current.cost}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">{t.calc.y1}</p>
          <p className="text-xl font-bold text-green-400">{current.y1}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">{t.calc.y3}</p>
          <p className="text-xl font-bold text-green-400">{current.y3}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">{t.calc.y5}</p>
          <p className="text-xl font-bold text-green-400">{current.y5}</p>
        </div>
      </div>
      
      <div className="mt-6 text-center">
         <p className="text-sm text-gray-500">
           {t.calc.roi}: <span className="text-white font-bold">{current.roi}</span> in 5 years.
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
      dot: "bg-green-500 border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.4)]",
      line: "border-green-500/30"
    },
    active: {
      bg: "bg-orange-500/10",
      border: "border-orange-500/50",
      text: "text-orange-400",
      icon: Clock,
      dot: "bg-orange-500 border-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.6)] animate-pulse",
      line: "border-white/10"
    },
    upcoming: {
      bg: "bg-white/5",
      border: "border-white/10",
      text: "text-gray-400",
      icon: CircleDashed,
      dot: "bg-gray-900 border-gray-600",
      line: "border-white/10"
    }
  };

  const currentStyle = styles[status];
  const StatusIcon = currentStyle.icon;

  return (
    <div className="relative pl-8 md:pl-12 py-6 border-l-2 border-white/10 last:border-0 group">
      {/* Timeline Dot */}
      <div className={`absolute left-[-9px] top-8 w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 ${currentStyle.dot}`} />
      
      {/* Content Card */}
      <div className={`p-6 rounded-2xl border transition-all duration-300 ${currentStyle.bg} ${currentStyle.border} ${status === 'active' ? 'shadow-[0_0_20px_rgba(249,115,22,0.1)]' : 'hover:bg-white/[0.07]'}`}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
             <span className={`font-mono font-bold ${status === 'upcoming' ? 'text-gray-400' : 'text-orange-400'}`}>{time}</span>
             <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${currentStyle.border} ${currentStyle.text} bg-black/20`}>
                <StatusIcon size={12} />
                <span>{status === "active" ? "In Progress" : status}</span>
             </div>
          </div>
          <div className="text-xs text-gray-400 bg-black/20 px-3 py-1 rounded-lg border border-white/5">
             Target Capacity: <span className="text-white font-semibold">{capacity}</span>
          </div>
        </div>
        
        <h3 className={`text-xl font-bold mb-4 ${status === 'upcoming' ? 'text-gray-300' : 'text-white'}`}>{phase}</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
              <Layers size={14} className={currentStyle.text}/> Deliverables
            </h4>
            <ul className="space-y-2">
              {deliverables.map((item, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${status === 'done' ? 'bg-green-500' : status === 'active' ? 'bg-orange-500' : 'bg-gray-600'}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 bg-black/20 p-4 rounded-xl border border-white/5">
             <div>
               <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Funding Used / Status</p>
               <p className="text-sm font-medium text-white">{funding}</p>
             </div>
             <div>
               <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Monthly Net Profit (Est)</p>
               <p className={`text-sm font-medium ${status === 'upcoming' ? 'text-gray-400' : 'text-green-400'}`}>{profit}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WhitepaperSection = ({ title, children, icon: Icon }: { title: string; children?: React.ReactNode; icon?: any }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
      {Icon && <Icon className="text-orange-400" size={24} />}
      {title}
    </h3>
    <div className="text-gray-300 space-y-4 leading-relaxed">
      {children}
    </div>
  </div>
);

const WhitepaperTable = ({ headers, rows }: { headers: string[], rows: (string|React.ReactNode)[][] }) => (
  <div className="overflow-x-auto my-4 bg-black/20 rounded-xl border border-white/5">
    <table className="w-full text-left border-collapse text-sm">
      <thead>
        <tr className="border-b border-white/10 bg-white/5">
          {headers.map((h, i) => (
            <th key={i} className="py-3 px-4 font-semibold text-gray-300 whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-white/5">
            {row.map((cell, j) => (
              <td key={j} className="py-3 px-4 text-gray-400">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


// --- Main App ---

export default function HHDAOLanding() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [language, setLanguage] = useState<LanguageKey>('en');

  const t = translations[language];

  const DAPP_LINK = "https://dapp.oneworldproject.io/daodetail/UrgamUSmartCity";

  const tabs = [
    { id: "overview", label: t.tabs.overview, icon: Globe },
    { id: "calculator", label: t.tabs.calculator, icon: Calculator },
    { id: "tiers", label: t.tabs.pricing, icon: Award },
    { id: "roadmap", label: t.tabs.roadmap, icon: Layers },
    { id: "whitepaper", label: t.tabs.whitepaper, icon: FileText },
    { id: "faq", label: t.tabs.faq, icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden font-sans selection:bg-orange-500/30">
      
      <PaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} lang={language} />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute transition-all duration-1000 -top-[20%] -left-[10%] w-[50%] h-[50%] bg-orange-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse`} />
        <div className={`absolute transition-all duration-1000 top-[20%] right-[0%] w-[40%] h-[40%] bg-yellow-900/10 rounded-full blur-[100px] mix-blend-screen`} />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-orange-900/20 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">

            <img 

              src="/hhdaologo.avif" 

              alt="HeliosHash DAO Logo" 

              className="w-10 h-10 object-contain"

            />

            <span className="text-lg font-bold brand-font tracking-wide">HeliosHash DAO</span>

          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
             {/* Language Switcher */}
             <div className="relative group">
                <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                  <Languages size={16} /> <span className="uppercase">{language}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-32 bg-[#0F121C] border border-white/10 rounded-xl shadow-xl overflow-hidden hidden group-hover:block">
                  {(Object.keys(translations) as LanguageKey[]).map((l) => (
                    <button 
                      key={l} 
                      onClick={() => setLanguage(l)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 ${language === l ? 'text-orange-400 font-bold' : 'text-gray-400'}`}
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

             <a href={DAPP_LINK} target="_blank" rel="noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">{t.nav.dapp}</a>
             <button onClick={() => setActiveTab("whitepaper")} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
               {t.nav.whitepaper}
             </button>
             <button onClick={() => setActiveTab("roadmap")} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
               {t.nav.roadmap}
             </button>
             <button onClick={() => setShowPaymentModal(true)} className="bg-white text-black hover:bg-gray-200 px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
               {t.nav.connect}
             </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
                <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
                   {(Object.keys(translations) as LanguageKey[]).map((l) => (
                      <button 
                        key={l} 
                        onClick={() => setLanguage(l)}
                        className={`px-3 py-1 rounded-md text-xs border ${language === l ? 'border-orange-400 text-orange-400' : 'border-white/10 text-gray-400'}`}
                      >
                        {l.toUpperCase()}
                      </button>
                   ))}
                </div>
                <a href={DAPP_LINK} className="text-gray-400">{t.nav.dapp}</a>
                <button onClick={() => { setActiveTab("whitepaper"); setMobileMenuOpen(false); }} className="text-gray-400 text-left">
                  {t.nav.whitepaper}
                </button>
                <button onClick={() => { setActiveTab("roadmap"); setMobileMenuOpen(false); }} className="text-gray-400 text-left">
                  {t.nav.roadmap}
                </button>
                <button onClick={() => { setShowPaymentModal(true); setMobileMenuOpen(false); }} className={`w-full py-3 rounded-xl font-bold text-center bg-gradient-to-r from-orange-500 to-yellow-500 text-black`}>
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
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="inline-block py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase">
                Helios#Baghpat
              </span>
              <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold tracking-widest uppercase">
                {t.hero.badge_loc || "Launching Q1 2026"}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight brand-font bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 to-orange-600 drop-shadow-2xl">
              {t.hero.tag} <br/> {t.hero.title}
            </h1>
            <p className="text-lg text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle} <br/>
              <span className="text-white font-semibold">{t.hero.badge_loc}</span> • {t.hero.badge_cap}.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <button onClick={() => { setActiveTab('tiers'); setShowPaymentModal(true); }} className="cursor-pointer w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 rounded-full font-semibold shadow-lg shadow-orange-900/20 transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-black">
                {t.hero.cta} <ChevronRight size={18} />
              </button>
              <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                {t.hero.waitlist}
              </div>
            </div>
          </motion.div>

          {/* Baghpat Stats - Updated with actuals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-20">
            <StatCard icon={Sun} label={t.stats.capacity} value="50 MW" subtext="Target by 2030" progress={{ current: 0.05, total: 50 }} />
            <StatCard icon={Users} label={t.stats.members} value="2 / 750" subtext="Early Adopters (Urgent Push)" progress={{ current: 2, total: 750 }} />
            <StatCard icon={TrendingUp} label={t.stats.raised} value="167 USDC" subtext="Target: 300K USDC" progress={{ current: 167, total: 300000 }} />
          </div>

        {/* Custom Tab Navigation */}
        <div className="w-full mb-8 sticky top-20 z-40">
          <div className="flex overflow-x-auto no-scrollbar gap-2 p-2 bg-[#0F121C]/80 border border-white/10 rounded-2xl backdrop-blur-xl max-w-fit mx-auto shadow-2xl">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap relative ${
                    isActive 
                      ? "text-white" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    />
                  )}
                  <TabIcon size={16} className={isActive ? "text-yellow-400" : ""} />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Areas */}
        <div className="w-full min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >

              {activeTab === "overview" && (
                <div className="space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                     <div>
                       <SectionTitle title={t.howItWorks.title} subtitle={t.howItWorks.subtitle} />
                       <div className="space-y-6 text-gray-300">
                         <p>{t.howItWorks.desc}</p>
                         <ul className="space-y-3">
                           {t.howItWorks.list.map((item, i) => (
                             <li key={i} className="flex items-center gap-3">
                               <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                               <span>{item}</span>
                             </li>
                           ))}
                         </ul>
                       </div>
                     </div>
                     <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 bg-orange-600/20 text-orange-400 text-xs font-bold rounded-bl-xl border-l border-b border-orange-500/20">HOW IT WORKS</div>
                       <div className="grid grid-cols-2 gap-4 mt-6">
                          {t.howItWorks.steps.map((step, i) => {
                             const icons = [Sun, Pickaxe, Landmark, Wallet];
                             const StepIcon = icons[i];
                             const colors = ["text-yellow-400", "text-blue-400", "text-green-400", "text-purple-400"];
                             return (
                                <div key={i} className="p-4 bg-black/20 rounded-xl text-center">
                                    <StepIcon className={`mx-auto mb-2 ${colors[i]}`} />
                                    <h4 className="font-bold text-sm">{step.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
                                </div>
                             )
                          })}
                       </div>
                     </div>
                   </div>
                </div>
              )}

              {activeTab === "calculator" && (
                <div className="max-w-4xl mx-auto">
                  <ROICalculator lang={language} />
                </div>
              )}

              {activeTab === "tiers" && (
                <div className="max-w-5xl mx-auto">
                   <SectionTitle title={t.tiers.title} subtitle={t.tiers.subtitle} />
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {t.tiers.items.map((tier, idx) => (
                       <div key={idx} className={`relative bg-white/5 border ${idx === 0 ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/10'} rounded-2xl p-6 flex flex-col hover:transform hover:scale-105 transition-all duration-300`}>
                         {idx === 0 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">{t.tiers.best_value}</div>}
                         <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                         <p className="text-sm text-gray-400 mb-4">{tier.seats} Seats Total • {tier.seats - 2} {t.tiers.left}</p>
                         
                         <div className="text-3xl font-bold text-white mb-1">{tier.cost}</div>
                         <p className="text-xs text-gray-500 uppercase tracking-wide mb-6">{t.tiers.subtitle}</p>
                         
                         <div className="space-y-3 mb-8 flex-1">
                           <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                             <span className="text-gray-400">{t.tiers.income}</span>
                             <span className="text-green-400 font-semibold">{tier.income}</span>
                           </div>
                           <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                             <span className="text-gray-400">{t.tiers.votes}</span>
                             <span className="text-white font-semibold">{tier.votes}</span>
                           </div>
                         </div>
                         
                         <button onClick={() => setShowPaymentModal(true)} className={`w-full py-3 rounded-xl font-bold text-sm ${idx === 0 ? 'bg-orange-500 hover:bg-orange-600 text-black' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                           {t.tiers.reserve}
                         </button>
                       </div>
                     ))}
                   </div>
                   <p className="text-center text-xs text-gray-500 mt-6">{t.common.payment_note}</p>
                </div>
              )}

              {activeTab === "roadmap" && (
                <div className="max-w-5xl mx-auto space-y-12">
                  <div className="text-center">
                    <SectionTitle title={t.roadmap.title} subtitle={t.roadmap.subtitle} />
                    <p className="text-sm text-orange-400 bg-orange-500/10 inline-block px-4 py-1 rounded-full border border-orange-500/20 mb-4">
                      {t.hero.badge_loc} • {t.hero.badge_cap}
                    </p>
                    <p className="text-xs text-gray-500 italic max-w-2xl mx-auto">
                      {t.roadmap.note}
                    </p>
                  </div>

                  <div className="space-y-2">
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
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mt-12">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Wallet size={20} className="text-green-400" /> {t.common.funding_summary}
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="text-xs uppercase text-gray-500 border-b border-white/10">
                            <th className="pb-3 px-2">{t.common.source}</th>
                            <th className="pb-3 px-2">{t.common.target}</th>
                            <th className="pb-3 px-2">{t.common.notes}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                          <tr>
                            <td className="py-3 px-2 text-white font-medium">{t.common.table.dao_members}</td>
                            <td className="py-3 px-2 text-white">300K USDC</td>
                            <td className="py-3 px-2 text-gray-400">{t.common.table.dao_note}</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-2 text-white font-medium">{t.common.table.subsidies}</td>
                            <td className="py-3 px-2 text-white">{t.common.table.subsidies_amt}</td>
                            <td className="py-3 px-2 text-gray-400">{t.common.table.subsidies_note}</td>
                          </tr>
                           <tr>
                            <td className="py-3 px-2 text-white font-medium">{t.common.table.treasury}</td>
                            <td className="py-3 px-2 text-white">{t.common.table.treasury_amt}</td>
                            <td className="py-3 px-2 text-gray-400">{t.common.table.treasury_note}</td>
                          </tr>
                          <tr className="bg-white/5 font-bold">
                            <td className="py-3 px-2 text-orange-400">{t.common.table.total}</td>
                            <td className="py-3 px-2 text-orange-400">300K USDC</td>
                            <td className="py-3 px-2 text-orange-400">{t.common.table.total_note}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "whitepaper" && (
                <div className="max-w-5xl mx-auto space-y-12">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2 brand-font">{t.whitepaper.title}</h2>
                    <p className="text-orange-400 font-medium">A One World Project (1WP) SubDAO • December 2025</p>
                  </div>

                  <WhitepaperSection title={t.whitepaper.abstract_title} icon={FileText}>
                    <p>{t.whitepaper.abstract_text}</p>
                    <div className="mt-4 p-4 bg-black/20 rounded-xl border-l-4 border-orange-500">
                      <p className="font-semibold text-white mb-2">Flagship Pilot – Helios#Baghpat:</p>
                      <ul className="space-y-2 text-sm text-gray-400">
                        {t.whitepaper.status_points.map((pt, i) => (
                           <li key={i} className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-400 mt-1"/> {pt}</li>
                        ))}
                      </ul>
                    </div>
                  </WhitepaperSection>

                  <WhitepaperSection title={t.whitepaper.vision_title} icon={Globe}>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Vision</h4>
                        <p>{t.whitepaper.vision_text}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Mission</h4>
                        <ul className="space-y-2 list-disc pl-4 text-sm text-gray-300">
                           <li>Make Indians co-owners of clean-energy assets</li>
                           <li>Prove decentralized governance + free solar power model</li>
                           <li>Deliver 200–300% ROI while giving surplus for social good</li>
                        </ul>
                      </div>
                    </div>
                  </WhitepaperSection>

                  <WhitepaperSection title={t.whitepaper.why_title} icon={Zap}>
                    <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                      <li className="p-3 bg-white/5 rounded-lg flex gap-3 items-center"><Sun size={18} className="text-yellow-400"/> {t.whitepaper.why_points[0]}</li>
                      <li className="p-3 bg-white/5 rounded-lg flex gap-3 items-center"><Gavel size={18} className="text-blue-400"/> {t.whitepaper.why_points[1]}</li>
                      <li className="p-3 bg-white/5 rounded-lg flex gap-3 items-center"><Leaf size={18} className="text-green-400"/> {t.whitepaper.why_points[2]}</li>
                      <li className="p-3 bg-white/5 rounded-lg flex gap-3 items-center"><Users size={18} className="text-orange-400"/> {t.whitepaper.why_points[3]}</li>
                    </ul>
                  </WhitepaperSection>

                  <WhitepaperSection title={t.whitepaper.status_title} icon={Calendar}>
                    <ul className="space-y-3">
                      {t.whitepaper.status_points.map((pt, i) => (
                         <li key={i} className="flex items-center gap-3"><CheckCircle2 size={16} className="text-green-500"/> {pt}</li>
                      ))}
                    </ul>
                  </WhitepaperSection>
                  
                  {/* Reuse Tier Data for structure */}
                  <WhitepaperSection title="6. Membership Structure" icon={Users}>
                     <WhitepaperTable 
                      headers={["Tier", "Seats", "Price (INR)", "Profit Pool", "Est. Monthly (Y5)"]}
                      rows={t.tiers.items.map(i => [i.name, i.seats, i.cost, "Varies", i.income])}
                    />
                  </WhitepaperSection>

                  <div className="bg-gradient-to-r from-orange-600 to-yellow-600 rounded-2xl p-8 text-center text-black shadow-2xl">
                    <h3 className="text-2xl font-bold mb-4 brand-font">{t.whitepaper.join_title}</h3>
                    <p className="max-w-2xl mx-auto mb-6 font-medium">{t.whitepaper.join_text}</p>
                    <a href={DAPP_LINK} target="_blank" rel="noreferrer" className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-900 transition-colors shadow-lg">
                      Go to Official 1WP DAO Page
                    </a>
                  </div>

                </div>
              )}

              {activeTab === "faq" && (
                <div className="max-w-3xl mx-auto space-y-4">
                  <SectionTitle title={t.faq.title} />
                  {t.faq.items.map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                      <h4 className="font-bold text-white mb-2 text-lg">{item.q}</h4>
                      <p className="text-gray-400">{item.a}</p>
                    </div>
                  ))}
                  
                  <div className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 border border-orange-500/20 rounded-xl p-6 mt-8">
                    <h4 className="font-bold text-white mb-4">{t.common.contact}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
                       <ul className="space-y-2">
                         <li className="flex items-center gap-2"><Users size={14} className="text-orange-400"/> Rajesh Premnath Soni (Project Lead)</li>
                         <li className="flex items-center gap-2"><TrendingUp size={14} className="text-orange-400"/> Backed by 1WP</li>
                       </ul>
                       <ul className="space-y-2">
                         <li className="flex items-center gap-2"><Landmark size={14} className="text-orange-400"/> Local Panchayats of Baghpat</li>
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
      <footer className="border-t border-white/5 bg-[#050505] mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <Sun className="w-5 h-5 text-orange-400" />
              <span className="font-bold brand-font text-white">HeliosHash DAO</span>
            </div>
            <p className="text-xs text-gray-500 max-w-xs">
              {t.common.rights}
            </p>
          </div>
          <div className="text-sm text-gray-500 text-center md:text-right">
            <p>{t.common.contact}: <a href="mailto:urgamparadise@gmail.com" className="hover:text-white transition-colors">urgamparadise@gmail.com</a></p>
            <p>WhatsApp: <span className="text-white">+91-7738901369</span></p>
            <p className="mt-1">X (Twitter): <a href="https://x.com/1Wpindia" target="_blank" rel="noreferrer" className="text-orange-400 hover:underline">@1Wpindia</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}