import { getCocktailById } from './cocktails';

export const DEMO_PREDICTIONS = {
  'the-oracle': {
    cocktail: 'The Oracle',
    cocktailId: 'the-oracle',
    prediction: 'BULLISH',
    convictionTier: 'HIGH CONVICTION',
    confidence: 94,
    proof: 94,
    latency: 178,
    edge: '+11.2%',
    positionSize: '3.2%',
    thesis:
      'Momentum remains exceptionally strong while sentiment and volume continue to confirm the upward trend. LSTM temporal recurrence indicates a 94.4% continuation probability across 10,000 stochastic Monte Carlo paths.',
    modules: [
      'LSTM',
      'CNN',
      'Monte Carlo',
      'XGBoost',
      'Bayesian',
      'Calibration',
      'Kelly',
    ],
    warnings: [
      'Macro rate decision scheduled in 48h may induce transient volatility spikes.',
      'Implied volatility skew elevated on weekly contract strikes.',
    ],
    marketMetrics: {
      expectedReturn: '+4.85%',
      brierScore: '0.042',
      sharpeProjected: '2.84',
      downsideVar95: '-1.12%',
      kellyFraction: '0.032',
    },
    rawResponse: {
      status: 'SUCCESS',
      timestamp: '2026-09-03T21:30:00.000Z',
      pour_id: 'pour_ora_89f3a1e94c',
      cocktail: 'The Oracle',
      glass: 'Highball Crystal',
      engine: 'Supreme Brain v2.4.0-speakeasy',
      inference: {
        target: 'AAPL.US',
        direction: 'BULLISH',
        conviction: 'LOCK_TIER',
        confidence_pct: 94.4,
        proof_rating: 94.0,
        latency_ms: 178,
        quant_edge_bps: 1120,
        recommended_bankroll_fraction: 0.032,
      },
      distribution: {
        monte_carlo_runs: 10000,
        positive_paths_pct: 94.42,
        mean_expected_drift: 0.0485,
        stdev_variance: 0.0142,
      },
      modules_executed: [
        { name: 'LSTM', weight: 0.28, status: 'CONVERGED' },
        { name: 'Monte Carlo', weight: 0.24, status: 'CONVERGED' },
        { name: 'XGBoost', weight: 0.18, status: 'CONVERGED' },
        { name: 'Bayesian Priors', weight: 0.15, status: 'CALIBRATED' },
        { name: 'Kelly Sizing', weight: 0.15, status: 'OPTIMIZED' },
      ],
      cryptographic_attestation: '0x8f4b7a19283eac4710bc8921df60421e4a77b8c2',
    },
  },

  'the-edge': {
    cocktail: 'The Edge',
    cocktailId: 'the-edge',
    prediction: 'ARBITRAGE LONG',
    convictionTier: 'IMMEDIATE EXECUTION',
    confidence: 91,
    proof: 91,
    latency: 38,
    edge: '+7.8%',
    positionSize: '4.5%',
    thesis:
      'Sub-50ms dislocation detected across order books. Shin model de-vigging reveals a 5.6 bps gross spread inefficiency with minimal execution slippage risk.',
    modules: [
      'Probability',
      'Edge Calc',
      'Kelly',
      'Vig Removal',
      'Calibration',
    ],
    warnings: [],
    marketMetrics: {
      expectedReturn: '+1.42%',
      brierScore: '0.028',
      sharpeProjected: '4.15',
      downsideVar95: '-0.24%',
      kellyFraction: '0.045',
    },
    rawResponse: {
      status: 'SUCCESS',
      timestamp: '2026-09-03T21:30:00.000Z',
      pour_id: 'pour_edg_42c98d711f',
      cocktail: 'The Edge',
      glass: 'Surgical Nick & Nora',
      engine: 'Supreme Brain Sub-50ms Core',
      inference: {
        target: 'US_EQUITIES_ARBITRAGE',
        direction: 'ARBITRAGE_LONG',
        conviction: 'IMMEDIATE_EXECUTION',
        confidence_pct: 91.2,
        proof_rating: 91.0,
        latency_ms: 38,
        quant_edge_bps: 780,
        recommended_bankroll_fraction: 0.045,
      },
      distribution: {
        order_latency_us: 38,
        gross_spread_bps: 5.6,
        net_edge_bps: 78.0,
        execution_slippage_risk: 0.0008,
      },
      modules_executed: [
        { name: 'Probability Differential', status: 'ACTIVE' },
        { name: 'Vig Removal (Shin)', status: 'COMPLETED' },
        { name: 'Microsecond Kelly Calc', status: 'OPTIMIZED' },
      ],
      cryptographic_attestation: '0x19a4e7c30981dfbc22718e001948ba3356bcdef1',
    },
  },

  'the-shaker': {
    cocktail: 'The Shaker',
    cocktailId: 'the-shaker',
    prediction: 'VOLATILITY EXPANSION',
    convictionTier: 'STOCHASTIC MEAN',
    confidence: 89,
    proof: 89,
    latency: 194,
    edge: '+9.4%',
    positionSize: '2.8%',
    thesis:
      'Massive 25,000 GPU Monte Carlo simulation reveals asymmetric positive tail risk. Merton jump diffusion models indicate strong right-skewed payout potential.',
    modules: [
      'Monte Carlo',
      'GPU Acceleration',
      'Probability',
      'Confidence Intervals',
      'Tail Risk',
    ],
    warnings: [
      'Fat-tail kurtosis exceeds normal distribution threshold by 2.4 sigma.',
    ],
    marketMetrics: {
      expectedReturn: '+6.20%',
      brierScore: '0.056',
      sharpeProjected: '2.21',
      downsideVar95: '-1.85%',
      kellyFraction: '0.028',
    },
    rawResponse: {
      status: 'SUCCESS',
      timestamp: '2026-09-03T21:30:00.000Z',
      pour_id: 'pour_shk_90b14c33ea',
      cocktail: 'The Shaker',
      glass: 'Speakeasy Shaker Coupe',
      engine: 'Supreme Brain Stochastic GPU Engine',
      inference: {
        target: 'NVDA_VOL_SURFACE',
        direction: 'VOLATILITY_EXPANSION',
        conviction: 'STOCHASTIC_MEAN',
        confidence_pct: 89.1,
        proof_rating: 89.0,
        latency_ms: 194,
        quant_edge_bps: 940,
        recommended_bankroll_fraction: 0.028,
      },
      distribution: {
        simulations_executed: 25000,
        confidence_interval_95: ['+2.1%', '+14.8%'],
        tail_risk_var99: -0.024,
      },
      modules_executed: [
        { name: 'GPU Monte Carlo (25k)', status: 'COMPLETED' },
        { name: 'Merton Jump Diffusion', status: 'CONVERGED' },
        { name: 'Tail Risk Bounds', status: 'EVALUATED' },
      ],
      cryptographic_attestation: '0x7e2910fbca482019ab921de4082719c836fae512',
    },
  },

  'the-bitter': {
    cocktail: 'The Bitter',
    cocktailId: 'the-bitter',
    prediction: 'CONTRARIAN SHORT',
    convictionTier: 'FADE PUBLIC BIAS',
    confidence: 86,
    proof: 86,
    latency: 118,
    edge: '+8.6%',
    positionSize: '3.0%',
    thesis:
      'Extreme public sentiment divergence reached 2.84 Z-score. Smart money volume flow contradicts public betting by 32%, triggering an institutional fade setup.',
    modules: [
      'Contrarian Detector',
      'Sentiment Inverse',
      'Mean Regression',
      'Value Finder',
      'Calibration',
    ],
    warnings: [
      'Public momentum may persist until terminal liquidity event.',
    ],
    marketMetrics: {
      expectedReturn: '+5.15%',
      brierScore: '0.062',
      sharpeProjected: '2.45',
      downsideVar95: '-1.40%',
      kellyFraction: '0.030',
    },
    rawResponse: {
      status: 'SUCCESS',
      timestamp: '2026-09-03T21:30:00.000Z',
      pour_id: 'pour_bit_55a29f88d1',
      cocktail: 'The Bitter',
      glass: 'Heavy Cut Crystal Old Fashioned',
      engine: 'Supreme Brain Contrarian Alpha Engine',
      inference: {
        target: 'CHELSEA_VS_ARSENAL',
        direction: 'CONTRARIAN_SHORT',
        conviction: 'FADE_PUBLIC_BIAS',
        confidence_pct: 86.5,
        proof_rating: 86.0,
        latency_ms: 118,
        quant_edge_bps: 860,
        recommended_bankroll_fraction: 0.030,
      },
      distribution: {
        public_sentiment_pct: 88.0,
        sharp_money_divergence_pct: 32.0,
        sentiment_z_score: 2.84,
      },
      modules_executed: [
        { name: 'Sentiment Inversion', status: 'TRIGGERED' },
        { name: 'Mean Reversion Filter', status: 'CONFIRMED' },
        { name: 'Value Disparity Engine', status: 'ACTIVE' },
      ],
      cryptographic_attestation: '0x33b8a912ef0482910cba719283eac4710bc8921d',
    },
  },

  'the-reserve': {
    cocktail: 'The Reserve',
    cocktailId: 'the-reserve',
    prediction: 'INSTITUTIONAL ALLOCATION',
    convictionTier: 'AUDIT-GRADE LOCK',
    confidence: 95,
    proof: 94,
    latency: 492,
    edge: '+12.4%',
    positionSize: '5.0%',
    thesis:
      'Comprehensive 100,000-path institutional stress simulation with Shapley-value factor decomposition. Rigorous downside bounds confirmed under multi-crisis scenarios.',
    modules: [
      '100K Simulations',
      'Factor Decomposition',
      'Confidence Attribution',
      'Audit Trail',
    ],
    warnings: [],
    marketMetrics: {
      expectedReturn: '+7.40%',
      brierScore: '0.019',
      sharpeProjected: '3.62',
      downsideVar95: '-0.85%',
      kellyFraction: '0.050',
    },
    rawResponse: {
      status: 'SUCCESS',
      timestamp: '2026-09-03T21:30:00.000Z',
      pour_id: 'pour_res_00192847ff',
      cocktail: 'The Reserve',
      glass: 'Heavy Base Stemmed Crystal Snifter',
      engine: 'Supreme Brain Institutional Audit Core',
      inference: {
        target: 'MULTI_ASSET_BALANCED',
        direction: 'INSTITUTIONAL_ALLOCATION',
        conviction: 'AUDIT_GRADE_LOCK',
        confidence_pct: 94.8,
        proof_rating: 94.0,
        latency_ms: 492,
        quant_edge_bps: 1240,
        recommended_bankroll_fraction: 0.050,
      },
      attribution: {
        shapley_factors: {
          momentum_factor: 0.38,
          value_spread: 0.29,
          low_volatility_anomaly: 0.22,
          liquidity_buffer: 0.11,
        },
        stress_tests_passed: ['2008_Lehman', '2020_Covid', '2022_Inflationary_Shock'],
      },
      modules_executed: [
        { name: '100k Multi-Asset Sim', status: 'COMPLETED' },
        { name: 'Shapley Factor Attribution', status: 'VERIFIED' },
        { name: 'Cryptographic Audit Block', status: 'SEALED' },
      ],
      cryptographic_attestation: '0x99283eac4710bc8921df60421e4a77b8c28f4b7a19',
    },
  },

  'the-last-word': {
    cocktail: 'The Last Word',
    cocktailId: 'the-last-word',
    prediction: 'SUPREME CONSENSUS',
    convictionTier: 'UNANIMOUS CONVICTION',
    confidence: 97,
    proof: 96,
    latency: 785,
    edge: '+14.6%',
    positionSize: '6.5%',
    thesis:
      'All five upstream models exhibit unanimous directional convergence. Meta-ensemble cross-validation resolves all internal variance into an unhedged high-conviction mandate.',
    modules: [
      'Meta-Ensemble',
      'Cross-Cocktail Consensus',
      'Confidence Weighting',
      'Conflict Resolution',
    ],
    warnings: [],
    marketMetrics: {
      expectedReturn: '+9.80%',
      brierScore: '0.012',
      sharpeProjected: '4.80',
      downsideVar95: '-0.65%',
      kellyFraction: '0.065',
    },
    rawResponse: {
      status: 'SUCCESS',
      timestamp: '2026-09-03T21:30:00.000Z',
      pour_id: 'pour_lst_77492100ae',
      cocktail: 'The Last Word',
      glass: 'Imperial Victorian Goblet',
      engine: 'Supreme Brain Meta-Consensus Kernel',
      inference: {
        target: 'GLOBAL_MACRO_TECH_ROTATION',
        direction: 'SUPREME_CONSENSUS',
        conviction: 'UNANIMOUS_CONVICTION',
        confidence_pct: 96.7,
        proof_rating: 96.0,
        latency_ms: 785,
        quant_edge_bps: 1460,
        recommended_bankroll_fraction: 0.065,
      },
      consensus_matrix: {
        the_oracle_weight: 0.30,
        the_edge_weight: 0.25,
        the_shaker_weight: 0.20,
        the_bitter_weight: 0.15,
        the_reserve_weight: 0.10,
        divergence_penalty: 0.00,
        conflict_resolution: 'UNANIMOUS_APPROVED',
      },
      modules_executed: [
        { name: 'Meta-Ensemble Pooling', status: 'SYNCHRONIZED' },
        { name: 'Confidence Weight Matrix', status: 'OPTIMAL' },
        { name: 'Final Consensus Gate', status: 'APPROVED' },
      ],
      cryptographic_attestation: '0xfa82019ab921de4082719c836fae5127e2910fbc',
    },
  },
};

export function getDemoPrediction(cocktailId, customPayload = null, customParameters = null, outputFormat = 'JSON') {
  const base = DEMO_PREDICTIONS[cocktailId] || DEMO_PREDICTIONS['the-oracle'];
  const cocktail = getCocktailById(cocktailId);

  // Return a cloned copy tailored to the user's custom settings
  const result = JSON.parse(JSON.stringify(base));
  result.cocktail = cocktail.name;
  result.cocktailId = cocktail.id;
  result.glass = cocktail.glassType;
  result.garnish = cocktail.garnish;
  result.accentColor = cocktail.accentColor;
  result.glowColor = cocktail.glowColor;
  result.outputFormat = outputFormat;

  if (customPayload) {
    result.userPayload = customPayload;
  }
  if (customParameters) {
    result.userParameters = customParameters;
  }

  return result;
}
