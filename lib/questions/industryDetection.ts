// lib/questions/industryDetection.ts — Infers website type and industry from business name

const INDUSTRY_KEYWORDS: Record<string, { industry: string; websiteType: string }> = {
  // Construction & Trades
  plumb: { industry: 'construction', websiteType: 'business' },
  electric: { industry: 'construction', websiteType: 'business' },
  hvac: { industry: 'construction', websiteType: 'business' },
  roofing: { industry: 'construction', websiteType: 'business' },
  contractor: { industry: 'construction', websiteType: 'business' },
  landscap: { industry: 'construction', websiteType: 'business' },
  painting: { industry: 'construction', websiteType: 'business' },
  carpenter: { industry: 'construction', websiteType: 'business' },

  // Healthcare
  medical: { industry: 'healthcare', websiteType: 'business' },
  dental: { industry: 'healthcare', websiteType: 'business' },
  clinic: { industry: 'healthcare', websiteType: 'business' },
  therapy: { industry: 'healthcare', websiteType: 'business' },
  chiro: { industry: 'healthcare', websiteType: 'business' },
  wellness: { industry: 'beauty_wellness', websiteType: 'business' },

  // Real Estate
  realty: { industry: 'real_estate', websiteType: 'business' },
  realtor: { industry: 'real_estate', websiteType: 'business' },
  'real estate': { industry: 'real_estate', websiteType: 'business' },
  property: { industry: 'real_estate', websiteType: 'business' },

  // Food & Beverage
  restaurant: { industry: 'food_beverage', websiteType: 'business' },
  bistro: { industry: 'food_beverage', websiteType: 'business' },
  cafe: { industry: 'food_beverage', websiteType: 'business' },
  bakery: { industry: 'food_beverage', websiteType: 'business' },
  catering: { industry: 'food_beverage', websiteType: 'business' },

  // Creative / Portfolio
  photo: { industry: 'creative', websiteType: 'portfolio' },
  design: { industry: 'creative', websiteType: 'portfolio' },
  studio: { industry: 'creative', websiteType: 'portfolio' },
  art: { industry: 'creative', websiteType: 'portfolio' },
  creative: { industry: 'creative', websiteType: 'portfolio' },

  // Retail / E-commerce
  shop: { industry: 'retail', websiteType: 'ecommerce' },
  store: { industry: 'retail', websiteType: 'ecommerce' },
  boutique: { industry: 'retail', websiteType: 'ecommerce' },
  goods: { industry: 'retail', websiteType: 'ecommerce' },

  // Legal & Professional Services
  law: { industry: 'professional_services', websiteType: 'business' },
  legal: { industry: 'professional_services', websiteType: 'business' },
  attorney: { industry: 'professional_services', websiteType: 'business' },
  accounting: { industry: 'professional_services', websiteType: 'business' },
  consulting: { industry: 'professional_services', websiteType: 'business' },

  // Non-profit
  foundation: { industry: 'nonprofit_sector', websiteType: 'nonprofit' },
  nonprofit: { industry: 'nonprofit_sector', websiteType: 'nonprofit' },
  charity: { industry: 'nonprofit_sector', websiteType: 'nonprofit' },
}

export interface DetectionResult {
  industry: string | null
  websiteType: string | null
  confidence: 'high' | 'low'
}

export function detectFromBusinessName(businessName: string): DetectionResult {
  const lower = businessName.toLowerCase()

  for (const [keyword, result] of Object.entries(INDUSTRY_KEYWORDS)) {
    if (lower.includes(keyword)) {
      return {
        industry: result.industry,
        websiteType: result.websiteType,
        confidence: 'high',
      }
    }
  }

  return { industry: null, websiteType: null, confidence: 'low' }
}
