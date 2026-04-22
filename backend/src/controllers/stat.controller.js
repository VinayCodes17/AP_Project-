import Stat from '../models/stat.model.js';

// GET /api/stats
export const getStats = async (req, res) => {
  try {
    const stats = await Stat.findOne(); // Get the first (and only) stats document
    if (!stats) return res.status(404).json({ success: false, message: 'Stats not found' });
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
