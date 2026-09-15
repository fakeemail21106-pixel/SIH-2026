const supabase = require('../config/supabase');

const initSocketTracking = (io) => {
  io.on('connection', (socket) => {
    console.log(`⚡ Live location socket connected: ${socket.id}`);

    // Listen for live location pings from Tourist Front-End
    socket.on('update_location', async (data) => {
      const { userId, latitude, longitude } = data;

      if (!userId || !latitude || !longitude) return;

      // Broadcast location to emergency contacts/admin sockets room
      io.emit(`location_feed_${userId}`, { latitude, longitude, timestamp: new Date() });

      // Save to Supabase PostGIS
      try {
        await supabase
          .from('live_locations')
          .upsert({
            user_id: userId,
            location: `POINT(${longitude} ${latitude})`,
            updated_at: new Date()
          });
      } catch (err) {
        console.error("Failed to update PostGIS location:", err.message);
      }
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });
};

module.exports = initSocketTracking;
