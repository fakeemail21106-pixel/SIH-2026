const classifyIntent = require('./intentClassifier');
const handlers = require('./handlers/handlers');

const processUserRequest = async ({ prompt, userId, location, latitude, longitude }) => {
  const intent = await classifyIntent(prompt);

  let outputData = {};

  switch (intent) {
    case 'ITINERARY':
      outputData = await handlers.itineraryHandler(prompt);
      break;
    case 'BUDGET':
      outputData = await handlers.budgetHandler(prompt);
      break;
    case 'WEATHER':
      outputData = await handlers.weatherHandler(prompt, location);
      break;
    case 'EMERGENCY':
      outputData = await handlers.emergencyHandler(userId, latitude, longitude);
      break;
    default:
      outputData = await handlers.chatbotHandler(prompt);
  }

  return { intent, result: outputData };
};

module.exports = { processUserRequest };
