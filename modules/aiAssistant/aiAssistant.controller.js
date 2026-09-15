const service = require('./aiAssistant.service');

const handleAiAsk = async (req, res) => {
  try {
    const { prompt, userId, location, latitude, longitude } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing required parameter 'prompt'." });
    }

    const response = await service.processUserRequest({ prompt, userId, location, latitude, longitude });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { handleAiAsk };
