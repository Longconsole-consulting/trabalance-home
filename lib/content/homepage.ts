import {
  Banknote,
  BarChart3,
  Building2,
  FileCheck,
  FileText,
  GitBranch,
  Globe,
  Home,
  Landmark,
  Package,
  Send,
  Shield,
  ShoppingCart,
  TrendingUp,
  Users,
  Wallet,
  Wifi,
  type LucideIcon,
} from "lucide-react";

export const navMenu = [
  {
    id: "product",
    label: "Product",
    type: "mega",
    items: [
      {
        title: "Sales",
        description: "Invoicing, orders, revenue tracking",
        href: "#",
      },
      {
        title: "Purchases",
        description: "Bills, POs, vendor management",
        href: "#",
      },
      {
        title: "Finance",
        description: "General ledger & statements",
        href: "#",
      },
      {
        title: "Operations",
        description: "Inventory, production, projects",
        href: "#",
      },
      {
        title: "People",
        description: "Payroll, HR, requisitions",
        href: "#",
      },
      {
        title: "Reports",
        description: "54 report types",
        href: "#",
      },
    ],
    footer: {
      note: "All six modules, one platform.",
      link: { label: "See pricing", href: "#pricing" },
    },
  },
  {
    id: "solutions",
    label: "Solutions",
    type: "grouped",
    groups: [
      {
        label: "By Industry",
        items: [
          { label: "Retail", href: "#" },
          { label: "Services", href: "#" },
          { label: "Manufacturing", href: "#" },
        ],
      },
      {
        label: "By Workflow",
        items: [
          { label: "Accounts Receivable", href: "#" },
          { label: "Accounts Payable", href: "#" },
          { label: "Requisitions", href: "#" },
        ],
      },
    ],
  },
  {
    id: "developers",
    label: "Developers",
    type: "mega",
    items: [
      {
        title: "API reference",
        description: "REST endpoints, OAuth 2, webhooks",
        href: "#developers",
      },
      {
        title: "Documentation",
        description: "Every feature, workflow, report",
        href: "#",
      },
      {
        title: "Changelog",
        description: "What shipped this month",
        href: "#",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    type: "link",
    href: "#pricing",
  },
] as const;

export type NavMenuItem = (typeof navMenu)[number];
export type NavMenuId = NavMenuItem["id"];

export const headerCta = {
  label: "Start free",
  href: "#demo",
};

export const signInLink = {
  label: "Sign in",
  href: "#",
};

export const announcement = {
  message: "We are launching our warehouse AI-native solution soon.",
  cta: "Learn more",
  href: "#intelligence",
  storageKey: "trabalance-announcement-dismissed",
} as const;

export const hero = {
  eyebrow: ["Operations.", "Accounting.", "Intelligence."],
  headline: "Your whole business. One set of books.",
  subhead:
    "Run the whole flow of your business — from what you stock, to what you make, to the jobs you deliver — on one platform. Every sale, build and job updates your books the moment it happens.",
  cta: "Start free",
  ctaHref: "#demo",
  secondaryCta: "See pricing",
  secondaryHref: "#pricing",
  reassurance: "Free trial. No card. Most teams are live the same afternoon.",
  highlight: {
    title: "One ledger.",
    subtitle: "Always balanced.",
  },
  video: {
    src: "/videos/hero-loop.mp4",
    poster: "/images/posters/hero-loop.svg",
    label: "Product overview",
  },
};

export const heroStats = [
  {
    value: 2500,
    display: "2,500",
    suffix: "+",
    label: "businesses on Trabalance",
    isText: true,
  },
  {
    value: 1_200_000,
    suffix: " $+",
    label: "figures processed every day",
    isText: false,
  },
  {
    value: 99.9,
    display: "99.9",
    suffix: "%",
    label: "platform uptime",
    isText: true,
  },
  {
    value: 4.9,
    display: "4.9",
    suffix: "/5",
    label: "average from 5-star reviews",
    isText: true,
  },
] as const;

export const stats = [
  {
    value: 1,
    display: "1",
    suffix: "",
    label: "ledger — one spine for operations and books",
    isText: true,
  },
  {
    value: 1,
    display: "Real-time",
    suffix: "",
    label: "trial balance correct every second",
    isText: true,
  },
  {
    value: 1,
    display: "Multi-currency",
    suffix: "",
    label: "currency on every record",
    isText: true,
  },
  {
    value: 14,
    suffix: "",
    display: "14 days",
    label: "free trial, no card required",
    isText: true,
  },
] as const;

export const platform = {
  eyebrow: "01 · One platform",
  headline: "Everything your business runs on, in one system.",
  subhead:
    "From the front counter to the shop floor to the back office — one set of books underneath.",
  footnote: "Every module posts to the same double-entry ledger.",
  modules: [
    {
      icon: ShoppingCart,
      name: "At the counter",
      description:
        "Ring up sales fast — in store, at the table, on the move. Loyalty, pricing and receipts built in.",
      href: "#",
    },
    {
      icon: Banknote,
      name: "Money in & out",
      description:
        "Chase what you're owed and pay suppliers on time. Invoices, quotes, bills and expenses in one place — payment links, statements and three-way match.",
      href: "#",
    },
    {
      icon: Package,
      name: "What you stock & make",
      description:
        "Real-time stock by location. Turn raw materials into finished goods at true cost. Job costing with profit and break-even.",
      href: "#",
    },
    {
      icon: Users,
      name: "Your team",
      description:
        "Pay on time with payslips. Approve staff requests and outgoing money. Staff, contractor and rate records in one place.",
      href: "#",
    },
    {
      icon: Wallet,
      name: "Stay in control",
      description:
        "Self-keeping books. Country-appropriate tax. Multi-currency and multi-company. Real-time profit, cash and net worth.",
      href: "#",
    },
    {
      icon: Building2,
      name: "CRM",
      description:
        "All customers and contacts in one place. Track deals from first hello to close. Full history beside their books.",
      href: "#",
    },
  ] as { icon: LucideIcon; name: string; description: string; href: string }[],
};

export const fourPillars = {
  eyebrow: "02 · Built for makers & movers",
  headline: "Four things, done deeply. Not forty, done thinly.",
  subhead:
    "Go deep where a make-and-move business actually lives — the counter, the warehouse, the shop floor and the books.",
  pillars: [
    {
      number: "01",
      title: "POS",
      tagline: "Sell across the counter.",
      cardTitle: "Sell at the counter, books updated instantly.",
      cardSummary:
        "Fast retail and restaurant POS. Every sale posts revenue and cost of goods the moment the receipt closes.",
      description:
        "Fast retail and restaurant point of sale. Works paired or in a browser. The receipt posts revenue and COGS the instant the sale closes.",
      media: {
        src: "/home/images/pos.jpg",
        alt: "Point of sale at the counter",
      },
      detail: {
        intro:
          "Ring up sales in store, at the table or on the move — and see revenue and cost of goods land in your books the moment the receipt closes. No end-of-day export, no second tally.",
        sections: [
          {
            title: "At the counter",
            body: "Fast retail and restaurant point of sale. Works on dedicated hardware or in a browser. Loyalty, pricing, modifiers and receipts built in.",
          },
          {
            title: "What posts to the books",
            body: "Every sale posts revenue and cost of goods instantly. Your trial balance stays current while the shop floor is still open.",
          },
        ],
        quote: {
          text: "The receipt hits the ledger when the sale closes. I finally trust Friday's number before I lock up.",
          author: "Marcus T.",
          role: "Owner, Corner Café",
        },
      },
    },
    {
      number: "02",
      title: "Inventory",
      tagline: "Know what you have, everywhere.",
      cardTitle: "Know what you have, at every location.",
      cardSummary:
        "Real-time stock at weighted-average cost — what you hold, what it is worth, and what moved.",
      description:
        "Real-time, multi-location stock at weighted-average cost. One engine answers what you have, what it's worth and what moved.",
      media: {
        src: "/home/images/inventory.jpg",
        alt: "Inventory across locations",
      },
      detail: {
        intro:
          "See what you hold, what it is worth and what moved — across every shop, branch and store room. One stock engine answers all three, at weighted-average cost, in real time.",
        sections: [
          {
            title: "Every location, one view",
            body: "Track stock by site, bin and batch. Transfers, adjustments and counts update every location the moment they happen.",
          },
          {
            title: "Cost you can trust",
            body: "Weighted-average cost rolls forward with every receipt and sale. Know the true value of what is on your shelves without a spreadsheet war.",
          },
        ],
        quote: {
          text: "We got a stock-out warning six days before we'd have run dry. One tap to draft the PO. That alone paid for the year.",
          author: "Elena R.",
          role: "Owner, Harbour Provisions",
        },
      },
    },
    {
      number: "03",
      title: "Production",
      tagline: "Build, and cost it as you go.",
      cardTitle: "Build it, cost it as you go.",
      cardSummary:
        "Bills of materials roll in material, labour and overhead. Finished goods land valued without a month-end scramble.",
      description:
        "Bill of materials and cost cards rolling in material, labour and overhead. Finished goods land valued. Journals post themselves.",
      media: {
        src: "/home/images/production.jpg",
        alt: "Production on the shop floor",
      },
      detail: {
        intro:
          "Build finished goods with bills of materials that roll in material, labour and overhead as work happens. Finished stock lands at true cost — and the journals post themselves.",
        sections: [
          {
            title: "Cost cards that stay current",
            body: "Define recipes and assemblies once. Material issues, labour time and overhead flow into the cost of each build as the job runs.",
          },
          {
            title: "Profit on every job",
            body: "See margin and break-even on each production run. Finished goods hit stock at the right value, ready for sale or dispatch.",
          },
        ],
        quote: {
          text: "Job costing used to be a spreadsheet nightmare. Now I see margin on every build as it runs.",
          author: "David K.",
          role: "Director, Northline Manufacturing",
        },
      },
    },
    {
      number: "04",
      title: "Accounting",
      tagline: "Books that keep themselves.",
      cardTitle: "Books that keep themselves current.",
      cardSummary:
        "Native double-entry ledger — not a sync. P&L, balance sheet and cash flow update as work happens.",
      description:
        "Native double-entry ledger — not a sync. Automatic journal posting. Real-time P&L, Balance Sheet and Cash Flow.",
      media: {
        src: "/home/images/accounting.jpg",
        alt: "Ledger and financial reporting",
      },
      detail: {
        intro:
          "A native double-entry ledger at the core — not a sync from somewhere else. Every document posts its own journal, so profit, cash and net worth stay current while the business is still running.",
        sections: [
          {
            title: "Books that update as work happens",
            body: "Sales, purchases, payroll and stock moves post automatically. No month-end scramble to make the numbers match.",
          },
          {
            title: "Reports you can act on",
            body: "P&L, balance sheet and cash flow update in real time. Multi-currency and multi-company built in, market by market.",
          },
        ],
        quote: {
          text: "I'm not an accountant. I run the floor. Trabalance gives me profit and cash without waiting for month-end.",
          author: "Priya S.",
          role: "Owner, Atlas Workshop",
        },
      },
    },
  ],
};

export const theShift = {
  eyebrow: "The shift",
  headline: "Your operations and your books, finally one system.",
  problem: {
    title: "The old way",
    points: [
      "Run the work in one tool and the accounting in another",
      "Export, import and reconcile at month-end — hoping the numbers match",
      "Profit and stock always a report away from the truth",
    ],
  },
  solution: {
    title: "With Trabalance",
    points: [
      "Every sale, purchase, stock move and build posts to the books instantly",
      "One real double-entry ledger — trial balance correct every second of every day",
      "The intelligence layer reads it all and tells you what to do next",
    ],
    cta: "Book a Demo",
    ctaHref: "#demo",
  },
  oldWayVisual: {
    nodes: [
      {
        id: "pos",
        type: "image",
        src: "/home/images/pos.jpg",
        alt: "Point of sale",
        x: 3,
        y: 5,
        w: 78,
        h: 50,
      },
      {
        id: "sheets",
        type: "image",
        src: "/home/images/accounting.jpg",
        alt: "Spreadsheets",
        x: 74,
        y: 3,
        w: 78,
        h: 50,
      },
      {
        id: "warehouse",
        type: "image",
        src: "/home/images/inventory.jpg",
        alt: "Warehouse app",
        x: 2,
        y: 70,
        w: 78,
        h: 50,
      },
      {
        id: "production",
        type: "image",
        src: "/home/images/production.jpg",
        alt: "Production tracking",
        x: 20,
        y: 42,
        w: 78,
        h: 50,
      },
      {
        id: "invoicing",
        type: "image",
        src: "/home/images/e-invoicing.jpg",
        alt: "E-invoicing",
        x: 58,
        y: 8,
        w: 78,
        h: 50,
      },
      {
        id: "custom",
        type: "image",
        src: "/home/images/custom-software.jpg",
        alt: "Custom software",
        x: 34,
        y: 74,
        w: 78,
        h: 50,
      },
      {
        id: "payments",
        type: "image",
        src: "/home/images/money.jpeg",
        alt: "Payments",
        x: 76,
        y: 48,
        w: 78,
        h: 50,
      },
      {
        id: "support",
        type: "image",
        src: "/home/images/it-support.jpg",
        alt: "IT support",
        x: 46,
        y: 52,
        w: 78,
        h: 50,
      },
      {
        id: "qb",
        type: "logo",
        src: "/logos/quickbooks.svg",
        alt: "QuickBooks",
        x: 60,
        y: 30,
        w: 96,
        h: 62,
      },
      {
        id: "xero",
        type: "logo",
        src: "/logos/xero.svg",
        alt: "Xero",
        x: 26,
        y: 14,
        w: 96,
        h: 62,
      },
      {
        id: "sage",
        type: "logo",
        src: "/logos/sage.svg",
        alt: "Sage",
        x: 6,
        y: 54,
        w: 96,
        h: 62,
      },
      {
        id: "zoho",
        type: "logo",
        src: "/logos/zoho.svg",
        alt: "Zoho",
        x: 40,
        y: 62,
        w: 96,
        h: 62,
      },
      {
        id: "m365",
        type: "logo",
        src: "/logos/microsoft-365.svg",
        alt: "Microsoft 365",
        x: 12,
        y: 26,
        w: 96,
        h: 62,
      },
      {
        id: "gws",
        type: "logo",
        src: "/logos/google-workspace.svg",
        alt: "Google Workspace",
        x: 66,
        y: 66,
        w: 96,
        h: 62,
      },
    ],
    connections: [
      { from: "pos", to: "m365" },
      { from: "m365", to: "xero" },
      { from: "xero", to: "invoicing" },
      { from: "invoicing", to: "sheets" },
      { from: "sheets", to: "qb" },
      { from: "qb", to: "payments" },
      { from: "pos", to: "sage" },
      { from: "sage", to: "production" },
      { from: "production", to: "zoho" },
      { from: "warehouse", to: "sage" },
      { from: "warehouse", to: "custom" },
      { from: "custom", to: "gws" },
      { from: "support", to: "zoho" },
      { from: "payments", to: "gws" },
      { from: "invoicing", to: "support" },
    ],
  },
  productMovement: {
    product: {
      name: "Premium Coffee Beans",
      sku: "CB-001",
      category: "Product · Beverages",
    },
    tabs: ["Overview", "Movement", "Adjustments"] as const,
    defaultTab: "Movement" as const,
    kpis: [
      {
        id: "onHand",
        label: "On hand",
        value: 400,
        display: "400",
        accent: "neutral" as const,
      },
      {
        id: "value",
        label: "Value",
        value: 5000,
        display: "£5,000",
        accent: "violet" as const,
      },
      {
        id: "sold",
        label: "Sold",
        value: 95,
        display: "95",
        accent: "primary" as const,
      },
    ],
    movementRows: [
      {
        id: "m1",
        date: "16 Jun",
        docNo: "INV-0847",
        type: "Invoice",
        out: 50,
        balance: 400,
      },
      {
        id: "m2",
        date: "15 Jun",
        docNo: "GRN-0512",
        type: "Goods received",
        in: 200,
        balance: 450,
      },
      {
        id: "m3",
        date: "14 Jun",
        docNo: "TRF-0201",
        type: "Transfer in",
        in: 150,
        balance: 250,
      },
      {
        id: "m4",
        date: "13 Jun",
        docNo: "INV-0846",
        type: "Invoice",
        out: 45,
        balance: 100,
      },
    ],
    overviewLines: [
      "Weighted cost £12.50 per unit · updated on every move",
      "Last movement 16 Jun · invoice posted to ledger",
      "Reorder at 80 units · comfortably above threshold",
    ],
    adjustmentRows: [
      { id: "a1", date: "12 Jun", reason: "Stock count correction", qty: "+5" },
      {
        id: "a2",
        date: "10 Jun",
        reason: "Damaged goods write-off",
        qty: "-3",
      },
    ],
  },
};

export const howItWorks = {
  eyebrow: "03 · Accounting",
  headline: "One ledger. Always balanced.",
  steps: [
    {
      number: "01",
      title: "One platform",
      description:
        "Front counter to shop floor to back office — everything runs on one set of books underneath.",
      video: {
        src: "/videos/step-1.mp4",
        poster: "/images/posters/step-1.svg",
        label: "One platform",
      },
    },
    {
      number: "02",
      title: "Sell & stock",
      description:
        "Ring up a sale at the counter. Revenue and COGS post the moment the receipt closes. Stock updates in real time.",
      video: {
        src: "/videos/step-2.mp4",
        poster: "/images/posters/step-2.svg",
        label: "Sell and stock",
      },
    },
    {
      number: "03",
      title: "Build & cost",
      description:
        "Run production with bills of materials and job costing. Finished goods land at true cost. Journals post themselves.",
      video: {
        src: "/videos/step-3.mp4",
        poster: "/images/posters/step-3.svg",
        label: "Build and cost",
      },
    },
    {
      number: "04",
      title: "Intelligence",
      description:
        "The AI layer reads one spine and recommends next actions — reorders, flags, margin alerts. Recommendations only, never silent changes to your books.",
      video: {
        src: "/videos/step-4.mp4",
        poster: "/images/posters/step-4.svg",
        label: "Intelligence",
      },
    },
  ],
};

export const intelligence = {
  eyebrow: "04 · Intelligence",
  headline: "It reads one spine, and tells you what to do.",
  subhead:
    "Because everything lives in one place, Trabalance answers in plain language and drafts actions — always as recommendations.",
  disclaimer:
    "Recommendations by default — never silent changes to your books.",
  chat: {
    title: "Trabalance Intelligence",
    subtitle: "Reading your ledger & inventory · Online",
    typingDelayMs: 900,
    responseDelayMs: 1200,
    introExampleIndex: 0,
    fallbackResponse:
      "I can read stock, margins, and ledger activity across your locations. Try asking about inventory, costs, or how profit is trending.",
  },
  examples: [
    {
      question: "When will I run out of Flour?",
      answer: "Centre London depletes Flour in 6 days at current velocity.",
      action:
        "Draft a purchase order for 200 units to your usual vendor at last price?",
      response:
        "Centre London depletes Flour in 6 days at current velocity. Draft a purchase order for 200 units to your usual vendor at last price?",
    },
    {
      question: "Anything wrong this week?",
      answer:
        "Centre Toronto's weighted-average cost on SKU-A drifted 14% vs last month, likely a mis-keyed receipt. Two items show negative on-hand.",
      action: "Review flagged items?",
      response:
        "Centre Toronto's weighted-average cost on SKU-A drifted 14% vs last month, likely a mis-keyed receipt. Two items show negative on-hand. Review?",
    },
    {
      question: "How are margins trending?",
      answer:
        "Gross margin slipped from 38% to 31% on the Beverages line as input costs rose. Three products now sell below target margin.",
      action: "See margin breakdown?",
      response:
        "Gross margin slipped from 38% to 31% on the Beverages line as input costs rose. Three products now sell below target margin.",
    },
  ],
  moodBoardQuestions: [
    "When will I run out of Flour?",
    "Anything wrong this week?",
    "How are margins trending?",
    "Which products are below target margin?",
    "Who hasn't paid yet?",
    "What should I reorder today?",
  ],
  capabilities: [
    {
      question: "Which products are below target margin?",
      response:
        "I can flag every product selling under your target margin — by location, category, or line. Want a breakdown for this week?",
    },
    {
      question: "Who hasn't paid yet?",
      response:
        "I read open invoices and who owes you — overdue by customer, amount, and days late. Pull up your aging list?",
    },
    {
      question: "What should I reorder today?",
      response:
        "I watch velocity and stock levels across locations, then draft reorder suggestions to your usual vendors. See today's list?",
    },
  ],
};

export const customerSpotlight = {
  eyebrow: "Customer spotlight",
  company: "Northline Roasters",
  industry: "Specialty coffee · Manchester",
  quote:
    "I used to run the café on one system and chase my accountant for a profit number weeks later. Now I see margin on every line and stock levels before we run out — same afternoon I started.",
  author: "Sarah M.",
  role: "Owner",
  stat: {
    value: "Weeks → same day",
    label: "to see profit and stock in one place",
  },
  video: {
    src: "/videos/person-interview.mp4",
    poster: "/images/posters/person-interview.png",
    label: "Customer story",
  },
};

export const whyTrabalance = {
  eyebrow: "Why Trabalance",
  headline: "Your operations and your books, finally one system.",
  subhead:
    "Most tools make you run the work in one place and the accounting in another, then reconcile the two. Trabalance runs both as one motion — so your numbers are never a reconciliation away from the truth.",
  items: [
    {
      title: "See your stock the moment it moves",
      description:
        "Know what you've got and what it's worth — down to the unit, across every shop, branch and store room.",
    },
    {
      title: "The work keeps your books for you",
      description:
        "Every sale, payment, build and stock move updates your books the instant it happens. No exports, no month-end scramble.",
    },
    {
      title: "Know the profit on every job",
      description:
        "Roll materials, labour and overhead into the real cost of each job — and see exactly what you make on it, and where you break even.",
      image: {
        src: "/home/images/money.jpeg",
        alt: "Job costing and profit on the shop floor",
      },
    },
  ],
  cta: "See demo",
  ctaHref: "#demo",
};

export const trustedBy = {
  headline:
    "Built for retailers, restaurants, manufacturers and service businesses.",
  logos: [
    { name: "QuickBooks", src: "/logos/quickbooks.svg" },
    { name: "Microsoft 365", src: "/logos/microsoft-365.svg" },
    { name: "Google Workspace", src: "/logos/google-workspace.svg" },
    { name: "Zoho", src: "/logos/zoho.svg" },
    { name: "Xero", src: "/logos/xero.svg" },
    { name: "Sage", src: "/logos/sage.svg" },
  ],
};

export const testimonialsSection = {
  eyebrow: "Voices from our users",
  headline: "Real businesses. Real results.",
  rows: [
    { direction: "left" as const, order: [0, 1, 2, 3, 4, 5] },
    { direction: "right" as const, order: [3, 4, 5, 0, 1, 2] },
    // { direction: "left" as const, order: [5, 0, 1, 2, 3, 4] },
  ],
};

export const testimonials = [
  {
    quote:
      "The receipt hits the ledger when the sale closes. I finally trust Friday's number before I lock up.",
    author: "Marcus T.",
    role: "Owner, Corner Café",
    avatar: "https://www.loremfaces.net/96/id/1.jpg",
    brandIcon: "/images/brand-icons/corner-cafe.svg",
  },
  {
    quote:
      "We got a stock-out warning six days before we'd have run dry. One tap to draft the PO. That alone paid for the year.",
    author: "Elena R.",
    role: "Owner, Harbour Provisions",
    avatar: "https://www.loremfaces.net/96/id/2.jpg",
    brandIcon: "/images/brand-icons/harbour-provisions.svg",
  },
  {
    quote:
      "Job costing used to be a spreadsheet nightmare. Now I see margin on every build as it runs.",
    author: "David K.",
    role: "Director, Northline Manufacturing",
    avatar: "https://www.loremfaces.net/96/id/3.jpg",
    brandIcon: "/images/brand-icons/northline.svg",
  },
  {
    quote:
      "I'm not an accountant. I run the floor. Trabalance gives me profit and cash without waiting for month-end.",
    author: "Priya S.",
    role: "Owner, Atlas Workshop",
    avatar: "https://www.loremfaces.net/96/id/4.jpg",
    brandIcon: "/images/brand-icons/atlas-workshop.svg",
  },
  {
    quote:
      "Payslips out in minutes. Approvals for spend in the same place as the books. My team stopped chasing me on WhatsApp.",
    author: "James L.",
    role: "Owner, Field & Hearth",
    avatar: "https://www.loremfaces.net/96/id/5.jpg",
    brandIcon: "/images/brand-icons/field-hearth.svg",
  },
  {
    quote:
      "Multi-currency just works. We invoice in three currencies and I see consolidated profit without a spreadsheet war.",
    author: "Amara O.",
    role: "Managing Director, Summit Services",
    avatar: "https://www.loremfaces.net/96/id/2.jpg",
    brandIcon: "/images/brand-icons/summit-services.svg",
  },
];

export const globalTrust = {
  eyebrow: "05 · Global from day one",
  headline: ["Multi-currency everywhere.", "Honest about every border."],
  items: [
    { icon: Globe, label: "Multi-currency everywhere" },
    { icon: FileCheck, label: "Compliance by market" },
    { icon: Shield, label: "Own your data" },
    { icon: GitBranch, label: "Leave anytime" },
    { icon: Wifi, label: "Offline-ready" },
    { icon: Landmark, label: "Role-based access" },
  ] as { icon: LucideIcon; label: string }[],
};

export const faq = {
  eyebrow: "08 · Questions worth asking",
  headline: "Straight answers, no marketing varnish.",
  items: [
    {
      question: "What happens to our data if we move on?",
      answer:
        "It is yours. Export every account, transaction and document in standard formats at any time. No notice required. No fee.",
    },
    {
      question: "We went through an ERP implementation before. It took months.",
      answer:
        "Trabalance is built to go live fast. Import accounts, items, customers, vendors and opening balances so you start with real numbers — not a blank screen. Most teams are live the same afternoon. Certified partners can handle complex migrations if you need a hand.",
    },
    {
      question: "Do you really run the whole ledger yourselves?",
      answer:
        "Yes. Native double-entry ledger at the core — not a sync to another product. Every document posts its own journal automatically. Trial balance, ledger and transactions agree to the penny, every second of every day.",
    },
    {
      question: "Is it global?",
      answer:
        "Multi-currency is on every record — currency and rate-to-base built in. Tax and statutory rules are config-driven, switched on per country as certified. Region-aware formats and a language-ready interface. We grow by deliberate rollout — no country sold before it's served.",
    },
    {
      question: "What does it actually cost?",
      answer:
        "Pay for what you run. Nothing else. Modular by capability. Customers, vendors, employees and locations are unlimited within fair use — never a per-seat charge. Every plan starts with a 14-day free trial, no card required.",
    },
  ],
};

export const closingCta = {
  headline:
    "Run the counter, the warehouse, the shop floor and the books from one platform.",
  subhead: "Free trial. No card. Most teams are live the same afternoon.",
  primaryCta: "Start free",
  primaryHref: "#demo",
  secondaryCta: "Build your plan",
  secondaryHref: "#pricing",
  ceoMessage: {
    eyebrow: "Hear from our CEO",
    themes: ["What we're building", "Our goal", "Our drive & passion"],
    video: {
      src: "/videos/ceo-speak.mp4",
      poster: "/images/posters/person-interview.png",
      label: "CEO message",
    },
    speaker: {
      name: "David Okafor",
      title: "Chief Executive Officer, Trabalance",
    },
  },
};

export const footer = {
  tagline: "Your whole business. One set of books.",
  company: "Trabalance Inc.",
  email: "hello@trabalance.com",
  newsletter: {
    headline: "Product updates",
    placeholder: "Your email",
    cta: "Subscribe",
  },
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
    { label: "Instagram", href: "#" },
  ],
  columns: [
    {
      title: "Product",
      links: [
        { label: "Sales", href: "#" },
        { label: "Purchases", href: "#" },
        { label: "Finance", href: "#" },
        { label: "Operations", href: "#" },
        { label: "People", href: "#" },
        { label: "Reports", href: "#" },
        { label: "Pricing", href: "#pricing" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Retail", href: "#" },
        { label: "Services", href: "#" },
        { label: "Manufacturing", href: "#" },
        { label: "AR Automation", href: "#" },
        { label: "AP Automation", href: "#" },
      ],
    },
    {
      title: "Developers",
      links: [
        { label: "API Reference", href: "#developers" },
        { label: "Documentation", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "System Status", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Customers", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Security", href: "#" },
        { label: "Partners", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Contact", href: "#" },
        { label: "Support", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
  brandStrip: ["Operations", "Accounting", "Intelligence"],
  image: {
    src: "/insights/images/company-stock.jpg",
    alt: "Team reviewing business performance on Trabalance",
  },
};

export type HeroDashboardTabId =
  | "pulse"
  | "sales"
  | "purchases"
  | "operations"
  | "people"
  | "finance"
  | "projects";

export type StatusChipVariant =
  | "paid"
  | "current"
  | "scheduled"
  | "onTrack"
  | "sent"
  | "ready";

export type HeroDashboardKpi = {
  label: string;
  value: string;
  change?: string;
};

export type HeroDashboardFeedItem = {
  id: string;
  time: string;
  text: string;
  amount?: string;
};

export type HeroDashboardTableColumn = {
  key: string;
  label: string;
  align?: "left" | "right";
};

export type HeroDashboardTableRow = {
  id: string;
  cells: Record<string, string>;
  status?: StatusChipVariant;
  highlight?: boolean;
};

export type HeroDashboardInventoryRow = {
  id: string;
  sku: string;
  name: string;
  qty: number;
  reorder: number;
  location: string;
  highlight?: boolean;
};

export type HeroDashboardRosterRow = {
  id: string;
  name: string;
  role: string;
  rate: string;
  hours: string;
};

export type HeroDashboardLedgerAccount = {
  code: string;
  name: string;
  debit?: string;
  credit?: string;
};

export type HeroDashboardJob = {
  id: string;
  name: string;
  client: string;
  budget: string;
  progress: number;
  margin: string;
};

type HeroDashboardTabBase = {
  id: HeroDashboardTabId;
  label: string;
  subtitle: string;
  healthBanner: { title: string; subtitle: string };
};

export type HeroDashboardTab =
  | (HeroDashboardTabBase & {
      layout: "overview";
      kpis: HeroDashboardKpi[];
      sparkline: number[];
      sparklineLabel: string;
      feed: HeroDashboardFeedItem[];
    })
  | (HeroDashboardTabBase & {
      layout: "documentTable";
      docType: "invoice" | "bill";
      tableTitle: string;
      columns: HeroDashboardTableColumn[];
      rows: HeroDashboardTableRow[];
    })
  | (HeroDashboardTabBase & {
      layout: "inventory";
      rows: HeroDashboardInventoryRow[];
    })
  | (HeroDashboardTabBase & {
      layout: "roster";
      payrollCard: { title: string; detail: string; badge: string };
      rows: HeroDashboardRosterRow[];
    })
  | (HeroDashboardTabBase & {
      layout: "ledger";
      accounts: HeroDashboardLedgerAccount[];
      footer: { label: string; difference: string };
    })
  | (HeroDashboardTabBase & {
      layout: "jobBoard";
      jobs: HeroDashboardJob[];
    });

export const heroDashboard = {
  user: {
    greeting: "Good evening",
    name: "Sarah M.",
  },
  topBar: {
    searchPlaceholder: "Search invoices, items, customers…",
    helpLabel: "Help",
  },
  windowTitle: "Trabalance",
  autoAdvanceMs: 3000,
  pauseAfterInteractionMs: 7000,
  sidebar: [
    {
      id: "dashboard",
      label: "Dashboard",
      tabId: "pulse" as HeroDashboardTabId,
      icon: Home,
    },
    {
      id: "sales",
      label: "Sales",
      tabId: "sales" as HeroDashboardTabId,
      icon: TrendingUp,
    },
    {
      id: "purchases",
      label: "Purchases",
      tabId: "purchases" as HeroDashboardTabId,
      icon: ShoppingCart,
    },
    {
      id: "operations",
      label: "Operations",
      tabId: "operations" as HeroDashboardTabId,
      icon: Package,
    },
    {
      id: "people",
      label: "People",
      tabId: "people" as HeroDashboardTabId,
      icon: Users,
    },
    {
      id: "finance",
      label: "Finance",
      tabId: "finance" as HeroDashboardTabId,
      icon: Landmark,
    },
    {
      id: "projects",
      label: "Projects",
      tabId: "projects" as HeroDashboardTabId,
      icon: GitBranch,
    },
  ] as {
    id: string;
    label: string;
    tabId: HeroDashboardTabId;
    icon: LucideIcon;
  }[],
  tabs: [
    {
      id: "pulse",
      layout: "overview",
      label: "Business Pulse",
      subtitle: "Whole business · live",
      healthBanner: {
        title: "All clear today",
        subtitle: "Trial balance balanced · books updated every second",
      },
      kpis: [
        { label: "Sales today", value: "£4,280", change: "+12% vs yesterday" },
        { label: "Gross margin", value: "38%", change: "On target" },
        { label: "Cash in bank", value: "£84,100", change: "Healthy" },
        { label: "Profit MTD", value: "£42,800", change: "Ahead of plan" },
      ],
      sparkline: [28, 35, 32, 41, 38, 44, 40, 48, 45, 52, 49, 56],
      sparklineLabel: "Revenue · last 12 days",
      feed: [
        {
          id: "f1",
          time: "2m ago",
          text: "POS sale posted to ledger",
          amount: "£84.50",
        },
        {
          id: "f2",
          time: "8m ago",
          text: "Bill #BILL-882 approved",
          amount: "£1,240",
        },
        {
          id: "f3",
          time: "14m ago",
          text: "Stock adjusted · weighted cost updated",
          amount: "12 units",
        },
        {
          id: "f4",
          time: "22m ago",
          text: "Invoice INV-1042 marked paid",
          amount: "£2,180",
        },
      ],
    },
    {
      id: "sales",
      layout: "documentTable",
      docType: "invoice",
      label: "Sales",
      subtitle: "Invoices · counter · customers",
      tableTitle: "Recent invoices",
      healthBanner: {
        title: "Sales flowing",
        subtitle: "Every invoice posts to the ledger when sent",
      },
      columns: [
        { key: "ref", label: "Invoice" },
        { key: "customer", label: "Customer" },
        { key: "date", label: "Date" },
        { key: "amount", label: "Amount", align: "right" },
      ],
      rows: [
        {
          id: "r1",
          cells: {
            ref: "INV-1042",
            customer: "Harbour Provisions",
            date: "Today",
            amount: "£2,180.00",
          },
          status: "paid",
        },
        {
          id: "r2",
          cells: {
            ref: "INV-1041",
            customer: "Northline Bakery",
            date: "Yesterday",
            amount: "£840.00",
          },
          status: "sent",
        },
        {
          id: "r3",
          cells: {
            ref: "INV-1040",
            customer: "Summit Services",
            date: "Mon 28",
            amount: "£4,620.00",
          },
          status: "current",
        },
        {
          id: "r4",
          cells: {
            ref: "INV-1039",
            customer: "Corner Café Co.",
            date: "Sun 27",
            amount: "£1,120.00",
          },
          status: "paid",
        },
        {
          id: "r5",
          cells: {
            ref: "INV-1038",
            customer: "Field & Hearth",
            date: "Sat 26",
            amount: "£3,440.00",
          },
          status: "current",
        },
      ],
    },
    {
      id: "purchases",
      layout: "documentTable",
      docType: "bill",
      label: "Purchases",
      subtitle: "Bills · POs · expenses",
      tableTitle: "Bills to pay",
      healthBanner: {
        title: "Suppliers current",
        subtitle: "Scheduled payments · nothing overdue",
      },
      columns: [
        { key: "ref", label: "Bill" },
        { key: "supplier", label: "Supplier" },
        { key: "due", label: "Due" },
        { key: "amount", label: "Amount", align: "right" },
      ],
      rows: [
        {
          id: "b1",
          cells: {
            ref: "BILL-882",
            supplier: "Fresh Foods Wholesale",
            due: "Fri",
            amount: "£1,240.00",
          },
          status: "scheduled",
        },
        {
          id: "b2",
          cells: {
            ref: "BILL-881",
            supplier: "PackRight Supplies",
            due: "Mon",
            amount: "£680.00",
          },
          status: "scheduled",
        },
        {
          id: "b3",
          cells: {
            ref: "BILL-880",
            supplier: "City Utilities",
            due: "Wed",
            amount: "£420.00",
          },
          status: "scheduled",
        },
        {
          id: "b4",
          cells: {
            ref: "BILL-879",
            supplier: "Metro Logistics",
            due: "Thu",
            amount: "£2,100.00",
          },
          status: "scheduled",
        },
        {
          id: "b5",
          cells: {
            ref: "BILL-878",
            supplier: "Office Direct",
            due: "Fri",
            amount: "£186.00",
          },
          status: "scheduled",
        },
      ],
    },
    {
      id: "operations",
      layout: "inventory",
      label: "Operations",
      subtitle: "Stock · production · sites",
      healthBanner: {
        title: "Floor and warehouse synced",
        subtitle: "142 SKUs · weighted cost current on every move",
      },
      rows: [
        {
          id: "s1",
          sku: "SKU-0142",
          name: "Organic flour 25kg",
          qty: 48,
          reorder: 20,
          location: "Warehouse A",
        },
        {
          id: "s2",
          sku: "SKU-0098",
          name: "Sourdough starter mix",
          qty: 12,
          reorder: 10,
          location: "Kitchen",
          highlight: true,
        },
        {
          id: "s3",
          sku: "SKU-0201",
          name: "Kraft boxes (large)",
          qty: 320,
          reorder: 100,
          location: "Warehouse B",
        },
        {
          id: "s4",
          sku: "SKU-0077",
          name: "Vanilla extract 1L",
          qty: 24,
          reorder: 12,
          location: "Kitchen",
        },
        {
          id: "s5",
          sku: "SKU-0115",
          name: "Butter unsalted 20kg",
          qty: 36,
          reorder: 15,
          location: "Cold store",
        },
      ],
    },
    {
      id: "people",
      layout: "roster",
      label: "People",
      subtitle: "Payroll · team · approvals",
      healthBanner: {
        title: "People and pay in sync",
        subtitle: "Wages post to the ledger when payroll runs",
      },
      payrollCard: {
        title: "Payroll run · Friday",
        detail: "14 payslips ready · £18,420 total",
        badge: "On schedule",
      },
      rows: [
        {
          id: "p1",
          name: "Amara O.",
          role: "Head baker",
          rate: "£14.50/hr",
          hours: "38h",
        },
        {
          id: "p2",
          name: "James L.",
          role: "Counter lead",
          rate: "£12.80/hr",
          hours: "40h",
        },
        {
          id: "p3",
          name: "Priya S.",
          role: "Bookkeeper",
          rate: "£16.00/hr",
          hours: "32h",
        },
        {
          id: "p4",
          name: "Marcus T.",
          role: "Delivery",
          rate: "£11.50/hr",
          hours: "36h",
        },
        {
          id: "p5",
          name: "Elena R.",
          role: "Production",
          rate: "£13.20/hr",
          hours: "38h",
        },
      ],
    },
    {
      id: "finance",
      layout: "ledger",
      label: "Finance",
      subtitle: "Ledger · tax · reports",
      healthBanner: {
        title: "Books balanced",
        subtitle: "Trial balance correct · tax rules applied",
      },
      accounts: [
        { code: "1000", name: "Cash at bank", debit: "£84,100.00" },
        { code: "1100", name: "Accounts receivable", debit: "£31,400.00" },
        { code: "1200", name: "Inventory", debit: "£18,240.00" },
        { code: "2000", name: "Accounts payable", credit: "£12,680.00" },
        { code: "2100", name: "VAT payable", credit: "£4,820.00" },
        { code: "3000", name: "Owner's equity", credit: "£45,000.00" },
        { code: "4000", name: "Sales revenue", credit: "£128,400.00" },
        { code: "5000", name: "Cost of goods sold", debit: "£79,640.00" },
        { code: "6000", name: "Operating expenses", debit: "£18,920.00" },
      ],
      footer: { label: "Trial balance", difference: "£0.00 difference" },
    },
    {
      id: "projects",
      layout: "jobBoard",
      label: "Projects",
      subtitle: "Jobs · time · billing",
      healthBanner: {
        title: "Jobs tied to the books",
        subtitle: "Time, materials and billing post as work happens",
      },
      jobs: [
        {
          id: "j1",
          name: "Café fit-out",
          client: "Corner Café Co.",
          budget: "£8,400",
          progress: 72,
          margin: "34%",
        },
        {
          id: "j2",
          name: "Weekly catering",
          client: "Summit Services",
          budget: "£2,200/wk",
          progress: 45,
          margin: "38%",
        },
        {
          id: "j3",
          name: "Wholesale rebrand",
          client: "Harbour Provisions",
          budget: "£5,600",
          progress: 88,
          margin: "29%",
        },
        {
          id: "j4",
          name: "Seasonal menu",
          client: "Northline Bakery",
          budget: "£1,800",
          progress: 60,
          margin: "41%",
        },
      ],
    },
  ] satisfies HeroDashboardTab[],
};
