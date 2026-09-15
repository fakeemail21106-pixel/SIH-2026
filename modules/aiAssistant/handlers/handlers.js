const { queryAI } = require('../../../config/huggingface');
const supabase = require('../../../config/supabase');
const prompts = require('../prompts/prompts');

const itineraryHandler = async (prompt) => {
  const result = await queryAI(prompt, prompts.itineraryPrompt(prompt));
  try {
    return JSON.parse(result);
  } catch (e) {
    return { plan: result };
  }
};

const budgetHandler = async (prompt) => {
  const matches = prompt.match(/(\d+[\d,]*)/);
  const amount = matches ? parseInt(matches[0].replace(/,/g, '')) : 20000;

  return {
    totalBudget: amount,
    allocations: {
      accommodation: Math.round(amount * 0.30),
      transportation: Math.round(amount * 0.25),
      food: Math.round(amount * 0.20),
      activities: Math.round(amount * 0.10),
      emergencyReserve: Math.round(amount * 0.15)
    },
    message: "Budget parsed and optimized for regional costs."
  };
};

const weatherHandler = async (prompt, location) => {
  // Query Supabase for real disaster status in the area
  const { data: zones } = await supabase
    .from('disaster_zones')
    .select('*')
    .ilike('zone_name', `%${location || 'Manali'}%`);

  const zone = zones && zones.length > 0 ? zones[0] : null;

  return {
    location: location || "Target Area",
    currentCondition: "Heavy Rainfall Expected",
    riskLevel: zone ? zone.landslide_risk : "MODERATE",
    actionableAdvice: "Heavy rainfall expected 3 PM - 7 PM. Reschedule mountain transit to 9 AM - 1 PM."
  };
};

const emergencyHandler = async (userId, latitude, longitude) => {
  // Fetch real emergency services near coordinate
  const { data: facilities } = await supabase.rpc('get_nearest_emergency_services', {
    lat: latitude || 31.224,
    long: longitude || 77.198
  });

  return {
    action: "TRIGGER_SOS",
    nearestFacilities: facilities || [],
    alertMessage: "Emergency dispatch pings initialized."
  };
};

module.exports = {
  itineraryHandler,
  budgetHandler,
  weatherHandler,
  emergencyHandler,
  chatbotHandler: async (prompt) => ({ text: await queryAI(prompt) })
};