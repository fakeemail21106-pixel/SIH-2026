const { queryAI } = require('../../config/huggingface');
const { classifierPrompt } = require('./prompts/prompts');

const classifyIntent = async (userQuery) => {
  try {
    const rawResponse = await queryAI(userQuery, classifierPrompt(userQuery));
    const cleanIntent = rawResponse.toUpperCase().trim();
    
    const validIntents = ['ITINERARY', 'BUDGET', 'WEATHER', 'SAFETY', 'EMERGENCY', 'GENERAL'];
    
    for (const intent of validIntents) {
      if (cleanIntent.includes(intent)) return intent;
    }
    return 'GENERAL';
  } catch (error) {
    return 'GENERAL';
  }
};

module.exports = classifyIntent;
