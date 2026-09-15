module.exports = {
  classifierPrompt: (query) => `
Analyze the query and determine its intent. Return ONLY ONE word from: [ITINERARY, BUDGET, WEATHER, SAFETY, EMERGENCY, GENERAL].
Query: "${query}"
Intent:`,

  itineraryPrompt: (query) => `
Generate a structured trip plan for the following request. Return ONLY valid JSON with keys: destination, duration, itinerary (array of days with time, activity, location).
Request: "${query}"`,

  budgetPrompt: (query) => `
Extract the total budget from the text and split it mathematically across categories: Accommodation (30%), Transport (25%), Food (20%), Activities (10%), Reserve (15%).
Return ONLY JSON with keys: totalBudget, breakdown (object), recommendations (array).
Request: "${query}"`
};