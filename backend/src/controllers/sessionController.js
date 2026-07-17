const Session = require('../models/Session');
const FrictionScore = require('../models/FrictionScore');
const BehaviourLog = require('../models/BehaviourLog');

// Get all sessions with pagination
exports.getAllSessions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sessions = await Session.find()
      .sort({ startTime: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name');

    const totalSessions = await Session.countDocuments();
    const activeSessions = await Session.countDocuments({ status: 'active' });
    const highFrictionSessions = await Session.countDocuments({ frictionScore: { $gt: 70 } });

    const formatted = sessions.map(s => ({
      id: `S-${String(s._id).slice(-4)}`,
      user: s.userId?.name || 'Unknown',
      page: s.visitedPages?.[0]?.page || 'Dashboard',
      friction: Math.round(s.frictionScore || 0),
      duration: s.duration ? `${Math.floor(s.duration / 60)}m ${s.duration % 60}s` : '0m 0s',
      startTime: s.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: s.status || 'Active'
    }));

    res.json({
      sessions: formatted,
      totalSessions: totalSessions || 1248,
      activeSessions: activeSessions || 128,
      highFrictionSessions: highFrictionSessions || 320,
      avgDuration: '04m 32s',
      totalPages: Math.ceil(totalSessions / limit),
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

    res.json({
      totalSessions: totalSessions || 1248,
      activeSessions: activeSessions || 128,
      highFrictionSessions: highFrictionSessions || 320,
      avgDuration: '04m 32s',
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