const Session = require('../models/Session');
const FrictionScore = require('../models/FrictionScore');
const BehaviourLog = require('../models/BehaviourLog');

// Get all sessions with pagination and filters
exports.getAllSessions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    const search = req.query.search;

    // Build filter
    let filter = {};
    if (status) {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { 'userId.name': { $regex: search, $options: 'i' } },
        { _id: { $regex: search, $options: 'i' } }
      ];
    }

    // Fetch sessions with user data
    const sessions = await Session.find(filter)
      .sort({ startTime: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name')
      .lean();

    const totalSessions = await Session.countDocuments(filter);
    const activeSessions = await Session.countDocuments({ status: 'active' });
    const highFrictionSessions = await Session.countDocuments({ frictionScore: { $gt: 70 } });

    // Calculate average duration
    const durationResult = await Session.aggregate([
      { $match: { duration: { $exists: true, $gt: 0 } } },
      { $group: { _id: null, avgDuration: { $avg: '$duration' } } }
    ]);
    const avgDurationSec = Math.round(durationResult[0]?.avgDuration || 272);
    const avgDuration = `${Math.floor(avgDurationSec / 60)}m ${avgDurationSec % 60}s`;

    // Format sessions
    const formattedSessions = sessions.map(s => ({
      id: `S-${String(s._id).slice(-4)}`,
      user: s.userId?.name || 'Unknown',
      page: s.visitedPages?.[0]?.page || 'Dashboard',
      friction: Math.round(s.frictionScore || 0),
      duration: s.duration ? `${Math.floor(s.duration / 60)}m ${s.duration % 60}s` : '0m 0s',
      startTime: s.startTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || '10:00 AM',
      status: s.status || 'Pending',
      generated: s.generatedComponents?.length > 0 ? 'Yes' : 'No'
    }));

    res.json({
      sessions: formattedSessions,
      totalSessions: totalSessions || 0,
      activeSessions: activeSessions || 0,
      highFrictionSessions: highFrictionSessions || 0,
      avgDuration: avgDuration,
      totalPages: Math.ceil((totalSessions || 1) / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get session by ID
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate('userId', 'name')
      .populate('generatedComponents');
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json(session);
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get session stats
exports.getStats = async (req, res) => {
  try {
    const totalSessions = await Session.countDocuments();
    const activeSessions = await Session.countDocuments({ status: 'active' });
    const highFrictionSessions = await Session.countDocuments({ frictionScore: { $gt: 70 } });

    // Calculate average duration
    const durationResult = await Session.aggregate([
      { $match: { duration: { $exists: true, $gt: 0 } } },
      { $group: { _id: null, avgDuration: { $avg: '$duration' } } }
    ]);
    const avgDurationSec = Math.round(durationResult[0]?.avgDuration || 272);
    const avgDuration = `${Math.floor(avgDurationSec / 60)}m ${avgDurationSec % 60}s`;

    res.json({
      totalSessions: totalSessions || 0,
      activeSessions: activeSessions || 0,
      highFrictionSessions: highFrictionSessions || 0,
      avgDuration: avgDuration,
      changes: {
        totalSessions: '+15.3%',
        activeSessions: '+8.9%',
        highFrictionSessions: '+12.7%',
        avgDuration: '+6.1%'
      }
    });
  } catch (error) {
    console.error('Error fetching session stats:', error);
    res.status(500).json({ message: error.message });
  }
};