// Centralized Dummy Data Architecture for Supreme Brain — The Back Room (/dashboard)

export const DUMMY_USER = {
  id: 'usr_supreme_01',
  name: 'Ahmed Jalal',
  initials: 'AJ',
  email: 'ahmed@supremebrain.ai',
  seat: 'The Enthusiast',
  seatTierId: 'enthusiast',
  memberSince: 'Nov 2025',
  avatarBg: 'from-amber-600/30 to-amber-950/60',
  notifications: {
    pourAlerts: true,
    weeklyLedger: true,
    calibrationUpdates: true,
    rateLimitWarnings: true,
  },
};

export const DUMMY_USAGE = {
  poursThisMonth: 1234,
  averageConfidenceProof: 92,
  mostUsedCocktail: 'The Oracle',
  poursRemaining: 8766,
  totalPoursAllowance: 10000,
  currentCycleStart: 'Feb 01, 2026',
  currentCycleEnd: 'Feb 28, 2026',
  houseBlend: [
    { name: 'LSTM', percentage: 45, color: '#f59e0b', desc: 'Recurrent sequence memory' },
    { name: 'Monte Carlo', percentage: 30, color: '#06b6d4', desc: 'Stochastic path dispersion' },
    { name: 'XGBoost', percentage: 15, color: '#10b981', desc: 'Gradient boosted trees' },
    { name: 'Bayesian', percentage: 7, color: '#a855f7', desc: 'Prior probability estimation' },
    { name: 'Kelly', percentage: 3, color: '#FFD700', desc: 'Optimal allocation criterion' },
  ],
  // 30 days of realistic daily pouring counts totaling ~1,234
  dailyPours: [
    { date: 'Feb 01', pours: 28 },
    { date: 'Feb 02', pours: 34 },
    { date: 'Feb 03', pours: 42 },
    { date: 'Feb 04', pours: 38 },
    { date: 'Feb 05', pours: 45 },
    { date: 'Feb 06', pours: 51 },
    { date: 'Feb 07', pours: 39 },
    { date: 'Feb 08', pours: 29 },
    { date: 'Feb 09', pours: 32 },
    { date: 'Feb 10', pours: 48 },
    { date: 'Feb 11', pours: 56 },
    { date: 'Feb 12', pours: 44 },
    { date: 'Feb 13', pours: 37 },
    { date: 'Feb 14', pours: 41 },
    { date: 'Feb 15', pours: 50 },
    { date: 'Feb 16', pours: 62 },
    { date: 'Feb 17', pours: 46 },
    { date: 'Feb 18', pours: 39 },
    { date: 'Feb 19', pours: 44 },
    { date: 'Feb 20', pours: 53 },
    { date: 'Feb 21', pours: 47 },
    { date: 'Feb 22', pours: 36 },
    { date: 'Feb 23', pours: 40 },
    { date: 'Feb 24', pours: 49 },
    { date: 'Feb 25', pours: 58 },
    { date: 'Feb 26', pours: 43 },
    { date: 'Feb 27', pours: 38 },
    { date: 'Feb 28', pours: 45 },
  ],
};

export const DUMMY_HISTORY = [
  {
    id: 'pour-1014',
    dateTime: 'Feb 28, 2026 • 11:32pm',
    timestamp: '2026-02-28T23:32:00Z',
    cocktailId: 'the-oracle',
    cocktailName: 'The Oracle',
    inputSummary: '3.2K rows · AAPL 1D Vol Surface',
    proof: 94,
    outcome: 'HIT', // 'HIT' | 'MISS' | 'PENDING'
    thesis: 'Bullish variance compression with upside skew in tech equities prior to FOMC release.',
    modules: ['LSTM', 'CNN', 'Monte Carlo', 'Bayesian', 'Kelly'],
    edge: '+4.2% expected alpha',
    positionSize: '3.8% of portfolio bankroll',
    warnings: null,
    payload: {
      symbol: 'AAPL',
      timeframe: '1D',
      price: 227.16,
      implied_volatility: 0.224,
      rsi_14: 58.2,
      confidence_interval: [0.88, 0.96],
      kelly_fraction: 0.038,
    },
  },
  {
    id: 'pour-1013',
    dateTime: 'Feb 28, 2026 • 08:15pm',
    timestamp: '2026-02-28T20:15:00Z',
    cocktailId: 'the-edge',
    cocktailName: 'The Edge',
    inputSummary: '1.8K rows · CME vs CBOE Microsecond Spread',
    proof: 91,
    outcome: 'PENDING',
    thesis: 'Cross-venue book discrepancy on Treasury futures exceeding 4.1 bps.',
    modules: ['Probability', 'Edge Calc', 'Kelly', 'Vig Removal'],
    edge: '+5.6 bps execution spread',
    positionSize: '5.2% liquidity absorption',
    warnings: 'High exchange congestion on secondary gateway',
    payload: {
      market_id: 'US_EQUITIES_ARBITRAGE',
      spread_bps: 5.6,
      book_depth_usd: 1250000,
      order_latency_us: 38,
      status: 'pending_settlement',
    },
  },
  {
    id: 'pour-1012',
    dateTime: 'Feb 27, 2026 • 04:45pm',
    timestamp: '2026-02-27T16:45:00Z',
    cocktailId: 'the-shaker',
    cocktailName: 'The Shaker',
    inputSummary: '25K paths · NVDA Earnings Dispersion',
    proof: 89,
    outcome: 'HIT',
    thesis: 'Heavy right-tail stochastic mass indicating 68% probability of post-earnings expansion.',
    modules: ['Monte Carlo', 'GPU Acceleration', 'Tail Risk'],
    edge: '+3.1% distribution mispricing',
    positionSize: '2.5% tail risk hedge',
    warnings: null,
    payload: {
      asset_name: 'NVDA_VOL_SURFACE',
      spot_price: 128.4,
      volatility_sigma: 0.44,
      simulation_paths: 25000,
      tail_risk_percentile: 0.99,
    },
  },
  {
    id: 'pour-1011',
    dateTime: 'Feb 26, 2026 • 09:12pm',
    timestamp: '2026-02-26T21:12:00Z',
    cocktailId: 'the-bitter',
    cocktailName: 'The Bitter',
    inputSummary: '4.5K votes · Sentiment Fade Dislocation',
    proof: 86,
    outcome: 'MISS',
    thesis: 'Extreme crowd euphoria on semiconductor rally triggering mean reversion trigger.',
    modules: ['Contrarian Detector', 'Sentiment Inverse', 'Mean Regression'],
    edge: '+1.8% mean reversion drift',
    positionSize: '1.2% short allocation',
    warnings: 'Momentum exceeded 2.5 standard deviations',
    payload: {
      target_event: 'SEMICONDUCTOR_BULL_RALLY',
      public_betting_pct: 0.88,
      sentiment_extreme_zscore: 2.84,
      outcome_result: 'rally_continued',
    },
  },
  {
    id: 'pour-1010',
    dateTime: 'Feb 25, 2026 • 02:20pm',
    timestamp: '2026-02-25T14:20:00Z',
    cocktailId: 'the-reserve',
    cocktailName: 'The Reserve',
    inputSummary: '100K paths · Multi-Asset Balanced Audit',
    proof: 94,
    outcome: 'HIT',
    thesis: 'Full Shapley factor decomposition verifying liquidity risk insulation across credit tranches.',
    modules: ['100K Simulations', 'Factor Decomposition', 'Audit Trail'],
    edge: '+6.4% risk-adjusted alpha',
    positionSize: 'Institutional portfolio constraint',
    warnings: null,
    payload: {
      portfolio_mandate: 'MULTI_ASSET_BALANCED',
      aum_millions: 45.0,
      var_99_limit: 0.025,
      audit_chain_record: 'sha256:8f43b2a9...',
    },
  },
  {
    id: 'pour-1009',
    dateTime: 'Feb 24, 2026 • 11:05am',
    timestamp: '2026-02-24T11:05:00Z',
    cocktailId: 'the-last-word',
    cocktailName: 'The Last Word',
    inputSummary: 'Meta-Ensemble · Macro Tech Rotation',
    proof: 96,
    outcome: 'HIT',
    thesis: 'Unanimous 4-model agreement on sovereign debt curve steepening.',
    modules: ['Meta-Ensemble', 'Cross-Cocktail Consensus', 'Conflict Resolution'],
    edge: '+7.8% consensus conviction',
    positionSize: '4.0% maximum mandate size',
    warnings: null,
    payload: {
      primary_thesis: 'GLOBAL_MACRO_TECH_ROTATION',
      macro_regime: 'EXPANSIONARY_BULL',
      confidence_weight: 0.96,
    },
  },
  {
    id: 'pour-1008',
    dateTime: 'Feb 23, 2026 • 07:40pm',
    timestamp: '2026-02-23T19:40:00Z',
    cocktailId: 'the-oracle',
    cocktailName: 'The Oracle',
    inputSummary: '2.1K rows · FX EUR/USD Intraday Momentum',
    proof: 93,
    outcome: 'PENDING',
    thesis: 'ECB rate divergence probability widening past 1.0850 barrier.',
    modules: ['LSTM', 'Bayesian', 'Calibration', 'Kelly'],
    edge: '+3.4% currency edge',
    positionSize: '2.8% FX spot allocation',
    warnings: null,
    payload: {
      pair: 'EUR_USD',
      entry_level: 1.0842,
      target_level: 1.0895,
      status: 'active_trade',
    },
  },
  {
    id: 'pour-1007',
    dateTime: 'Feb 22, 2026 • 03:15pm',
    timestamp: '2026-02-22T15:15:00Z',
    cocktailId: 'the-edge',
    cocktailName: 'The Edge',
    inputSummary: '950 rows · Inter-Exchange Crypto Spread',
    proof: 90,
    outcome: 'HIT',
    thesis: 'Spot-Perp basis divergence on BTC perpetual futures exceeding 12 bps.',
    modules: ['Probability', 'Edge Calc', 'Vig Removal'],
    edge: '+12.4 bps basis capture',
    positionSize: '6.0% delta-neutral',
    warnings: null,
    payload: {
      instrument: 'BTC_PERP_BASIS',
      funding_rate_annual: 0.18,
      execution_ms: 42,
    },
  },
  {
    id: 'pour-1006',
    dateTime: 'Feb 20, 2026 • 05:30pm',
    timestamp: '2026-02-20T17:30:00Z',
    cocktailId: 'the-shaker',
    cocktailName: 'The Shaker',
    inputSummary: '15K paths · Crude Oil Geopolitical Jump',
    proof: 88,
    outcome: 'MISS',
    thesis: 'Poisson jump-diffusion projection estimating 4.5% Brent spike.',
    modules: ['Monte Carlo', 'Tail Risk'],
    edge: '+2.1% jump risk premium',
    positionSize: '1.5% commodity options',
    warnings: 'Supply headline resolved faster than diffusion horizon',
    payload: {
      commodity: 'BRENT_CRUDE',
      jump_intensity: 0.18,
      drift: 0.05,
    },
  },
  {
    id: 'pour-1005',
    dateTime: 'Feb 19, 2026 • 10:22am',
    timestamp: '2026-02-19T10:22:00Z',
    cocktailId: 'the-oracle',
    cocktailName: 'The Oracle',
    inputSummary: '5.0K rows · SPX 0DTE Volatility Skew',
    proof: 95,
    outcome: 'HIT',
    thesis: 'Morning gamma imbalance resolving toward 5,950 dealer pinning wall.',
    modules: ['LSTM', 'CNN', 'Monte Carlo', 'Kelly'],
    edge: '+5.1% gamma rent capture',
    positionSize: '3.0% defined-risk credit spread',
    warnings: null,
    payload: {
      index: 'SPX',
      pin_target: 5950,
      zero_dte_gamma: '+1.4B/1%',
    },
  },
  {
    id: 'pour-1004',
    dateTime: 'Feb 17, 2026 • 01:10pm',
    timestamp: '2026-02-17T13:10:00Z',
    cocktailId: 'the-bitter',
    cocktailName: 'The Bitter',
    inputSummary: '3.1K rows · Retail Meme Rally Fade',
    proof: 87,
    outcome: 'HIT',
    thesis: 'Social volume peak detected with 94% retail call-buying saturation.',
    modules: ['Contrarian Detector', 'Sentiment Inverse'],
    edge: '+8.2% reversion to VWAP',
    positionSize: '2.0% short delta',
    warnings: null,
    payload: {
      ticker: 'MEME_BASKET',
      social_velocity_z: 3.4,
      reversion_target: 'VWAP_D1',
    },
  },
  {
    id: 'pour-1003',
    dateTime: 'Feb 15, 2026 • 06:45pm',
    timestamp: '2026-02-15T18:45:00Z',
    cocktailId: 'the-reserve',
    cocktailName: 'The Reserve',
    inputSummary: '50K paths · Corporate Credit Spread Stress Test',
    proof: 94,
    outcome: 'PENDING',
    thesis: 'High-yield default probability stress test across 2008 & 2020 macro shocks.',
    modules: ['100K Simulations', 'Factor Decomposition', 'Audit Trail'],
    edge: '+4.5% OAS mispricing',
    positionSize: 'Fixed income mandate allocation',
    warnings: null,
    payload: {
      index: 'CDX_HY_39',
      spread_bps: 345,
      audit_token: 'sha256:01ef94...',
    },
  },
];

export const DUMMY_RECIPES = [
  {
    id: 'recipe-01',
    name: 'MY ORACLE',
    cocktailId: 'the-oracle',
    cocktailName: 'The Oracle',
    modules: ['LSTM', 'Monte Carlo', 'Bayesian'],
    confidenceThreshold: 90,
    savedDate: 'Feb 25, 2026',
    parameters: [
      { key: 'confidence_threshold', value: '0.90' },
      { key: 'monte_carlo_paths', value: '15000' },
      { key: 'bayesian_prior_weight', value: '0.45' },
    ],
    notes: 'Tuned for high-conviction equity swings with extra stochastic depth.',
  },
  {
    id: 'recipe-02',
    name: 'SURGICAL ARBITRAGE',
    cocktailId: 'the-edge',
    cocktailName: 'The Edge',
    modules: ['Probability', 'Edge Calc', 'Kelly', 'Vig Removal'],
    confidenceThreshold: 85,
    savedDate: 'Feb 20, 2026',
    parameters: [
      { key: 'min_edge_bps', value: '4.0' },
      { key: 'max_slippage', value: '0.0008' },
      { key: 'vig_removal_model', value: 'shin_multi_book' },
    ],
    notes: 'Microsecond execution spread filter across fragmented venues.',
  },
  {
    id: 'recipe-03',
    name: 'STOCHASTIC VOL RUN',
    cocktailId: 'the-shaker',
    cocktailName: 'The Shaker',
    modules: ['Monte Carlo', 'GPU Acceleration', 'Tail Risk', 'Probability'],
    confidenceThreshold: 82,
    savedDate: 'Feb 15, 2026',
    parameters: [
      { key: 'simulation_paths', value: '30000' },
      { key: 'tail_risk_percentile', value: '0.99' },
      { key: 'jump_diffusion', value: 'merton_stochastic' },
    ],
    notes: 'Fast 30k GPU iterations assessing fat-tail option pricing risk.',
  },
];

export const DUMMY_ALERTS = [
  {
    id: 'alert-01',
    type: 'warning', // 'info' | 'warning' | 'error'
    title: 'RATE LIMIT WARNING',
    message: "You've poured 80% of your monthly allowance (8,000+ pours). Consider upgrading to The Connoisseur stool to ensure uninterrupted service.",
    timestamp: '2 hours ago',
    actionLabel: 'UPGRADE STOOL',
    actionTab: 'billing',
  },
  {
    id: 'alert-02',
    type: 'info',
    title: 'HOUSE UPDATE',
    message: 'A new calibration blend (v2.4 Bayesian Posterior Refinement) is now serving behind the bar. All new Oracle and Reserve pours benefit automatically.',
    timestamp: 'Yesterday',
    actionLabel: null,
  },
  {
    id: 'alert-03',
    type: 'error',
    title: 'ON THE ROCKS',
    message: 'One of your recent pours (pour-1006) returned incomplete market depth telemetry from the secondary liquidity gateway.',
    timestamp: '2 days ago',
    actionLabel: 'VIEW POUR',
    actionPourId: 'pour-1006',
    actionTab: 'history',
  },
];

export const DUMMY_PLANS = [
  {
    id: 'regular',
    name: 'The Regular',
    price: 49,
    period: '/mo',
    pours: '1,000 pours',
    poursLimit: 1000,
    accentColor: '#cd7f32',
    tierName: 'Bronze Tier',
    description: 'A reliable seat at the counter. Standard predictions & daily market odds.',
    features: ['Standard REST APIs', '1,000 Monthly Pours', '99.5% Uptime SLA', 'Community Support'],
  },
  {
    id: 'enthusiast',
    name: 'The Enthusiast',
    price: 149,
    period: '/mo',
    pours: '10,000 pours',
    poursLimit: 10000,
    accentColor: '#c0c0c0',
    tierName: 'Silver Tier',
    popular: false,
    description: 'For patrons who take their pours seriously. 40+ ML models & real-time streaming.',
    features: ['40+ ML Module Ensemble', '10,000 Monthly Pours', 'Sub-100ms Latency', 'Kelly Criterion Calibration'],
  },
  {
    id: 'connoisseur',
    name: 'The Connoisseur',
    price: 399,
    period: '/mo',
    pours: '50,000 pours',
    poursLimit: 50000,
    accentColor: '#FFD700',
    tierName: 'Gold Tier · Popular',
    popular: true,
    description: 'Top-shelf distillation. Sub-40ms latency, full REST & Webhook access.',
    features: ['10k Monte Carlo Paths', '50,000 Monthly Pours', 'Sub-40ms Ultra Low Latency', 'Dedicated Bartender Priority'],
  },
  {
    id: 'owner',
    name: 'The Owner',
    price: 999,
    period: '/mo',
    pours: 'Unlimited pours',
    poursLimit: 999999,
    accentColor: '#e5e4e2',
    tierName: 'Platinum Reserve',
    popular: false,
    description: 'Private booth & unlimited pour volume. Dedicated models & custom telemetry.',
    features: ['Unlimited Pour Volume', 'Dedicated GPU Node', 'Custom Predictive Weights', '24/7 Private Concierge'],
  },
];

export const DUMMY_PAYMENT_METHODS = [
  {
    id: 'pm_101',
    brand: 'VISA',
    last4: '4242',
    expMonth: '08',
    expYear: '28',
    isDefault: true,
  },
  {
    id: 'pm_102',
    brand: 'MASTERCARD',
    last4: '8831',
    expMonth: '11',
    expYear: '27',
    isDefault: false,
  },
];

export const DUMMY_INVOICES = [
  {
    id: 'INV-2026-002',
    date: 'Feb 01, 2026',
    amount: '$149.00',
    status: 'PAID',
    planName: 'The Enthusiast · Monthly Stool',
    pdfUrl: '#',
  },
  {
    id: 'INV-2026-001',
    date: 'Jan 01, 2026',
    amount: '$149.00',
    status: 'PAID',
    planName: 'The Enthusiast · Monthly Stool',
    pdfUrl: '#',
  },
  {
    id: 'INV-2025-012',
    date: 'Dec 01, 2025',
    amount: '$149.00',
    status: 'PAID',
    planName: 'The Enthusiast · Monthly Stool',
    pdfUrl: '#',
  },
];

export const DUMMY_BILLING_INFO = {
  name: 'Ahmed Jalal',
  company: 'Supreme Brain Private Member',
  address: '42 King Street, Speakeasy Lane',
  city: 'London',
  country: 'United Kingdom',
  postalCode: 'EC2V 8EH',
  vatNumber: 'GB928410291',
};

// ── LOCALSTORAGE ACCESS HELPERS ─────────────────────────────────────
const STORAGE_KEYS = {
  HISTORY: 'supreme_dashboard_history',
  RECIPES: 'supreme_dashboard_recipes',
  ALERTS: 'supreme_dashboard_alerts',
  BILLING_PLAN: 'supreme_dashboard_billing_plan',
  SUBSCRIPTION_STATUS: 'supreme_dashboard_sub_status',
  PAYMENT_METHODS: 'supreme_dashboard_payment_methods',
  USER_SETTINGS: 'supreme_dashboard_user_settings',
  DISMISSED_ALERTS: 'supreme_dashboard_dismissed_alerts',
};

export function loadStoredHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load history from localStorage', e);
  }
  return DUMMY_HISTORY;
}

export function saveStoredHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save history to localStorage', e);
  }
}

export function loadStoredRecipes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECIPES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load recipes from localStorage', e);
  }
  return DUMMY_RECIPES;
}

export function saveStoredRecipes(recipes) {
  try {
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
  } catch (e) {
    console.error('Failed to save recipes to localStorage', e);
  }
}

export function loadStoredAlerts() {
  try {
    const rawDismissed = localStorage.getItem(STORAGE_KEYS.DISMISSED_ALERTS);
    const dismissedIds = rawDismissed ? JSON.parse(rawDismissed) : [];
    return DUMMY_ALERTS.filter((a) => !dismissedIds.includes(a.id));
  } catch (e) {
    console.error('Failed to load alerts from localStorage', e);
    return DUMMY_ALERTS;
  }
}

export function saveDismissedAlert(alertId) {
  try {
    const rawDismissed = localStorage.getItem(STORAGE_KEYS.DISMISSED_ALERTS);
    const dismissedIds = rawDismissed ? JSON.parse(rawDismissed) : [];
    if (!dismissedIds.includes(alertId)) {
      dismissedIds.push(alertId);
      localStorage.setItem(STORAGE_KEYS.DISMISSED_ALERTS, JSON.stringify(dismissedIds));
    }
  } catch (e) {
    console.error('Failed to save dismissed alert to localStorage', e);
  }
}

export function loadStoredPlan() {
  try {
    const planId = localStorage.getItem(STORAGE_KEYS.BILLING_PLAN) || 'enthusiast';
    return DUMMY_PLANS.find((p) => p.id === planId) || DUMMY_PLANS[1];
  } catch (e) {
    return DUMMY_PLANS[1];
  }
}

export function saveStoredPlan(planId) {
  try {
    localStorage.setItem(STORAGE_KEYS.BILLING_PLAN, planId);
  } catch (e) {
    console.error('Failed to save plan to localStorage', e);
  }
}

export function loadSubscriptionStatus() {
  try {
    return localStorage.getItem(STORAGE_KEYS.SUBSCRIPTION_STATUS) || 'ACTIVE';
  } catch (e) {
    return 'ACTIVE';
  }
}

export function saveSubscriptionStatus(status) {
  try {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIPTION_STATUS, status);
  } catch (e) {
    console.error('Failed to save subscription status', e);
  }
}

export function loadStoredPaymentMethods() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PAYMENT_METHODS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load payment methods', e);
  }
  return DUMMY_PAYMENT_METHODS;
}

export function saveStoredPaymentMethods(methods) {
  try {
    localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(methods));
  } catch (e) {
    console.error('Failed to save payment methods', e);
  }
}

export function generateLedgerCSV(historyData) {
  const headers = ['Order ID', 'Date & Time', 'Cocktail', 'Input Summary', 'Proof', 'Outcome', 'Thesis', 'Edge', 'Position Size'];
  const rows = historyData.map((h) => [
    h.id,
    `"${h.dateTime}"`,
    `"${h.cocktailName}"`,
    `"${h.inputSummary.replace(/"/g, '""')}"`,
    `"${h.proof} Proof"`,
    h.outcome,
    `"${h.thesis.replace(/"/g, '""')}"`,
    `"${h.edge || ''}"`,
    `"${h.positionSize || ''}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  return csvContent;
}
