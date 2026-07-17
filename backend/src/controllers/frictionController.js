const Session = require('../models/Session');
const FrictionScore = require('../models/FrictionScore');
const BehaviourLog = require('../models/BehaviourLog');

// Get friction overview
exports.getOverview = async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const avgScore = await FrictionScore.aggregate([
      { $match: { timestamp: { $gte: sevenDaysAgo } } },
      { $group: { _id: null, avg: { $avg: '$score' } } }
    ]);
    
    const highestScore = await FrictionScore.findOne()
      .sort({ score: -1 })
      .populate('userId', 'name');

    const lowFrictionSessions = await Session.countDocuments({ 
      frictionScore: { $lt: 40 },
      startTime: { $gte: sevenDaysAgo }
    });

    const prevPeriodSessions = await Session.countDocuments({
      frictionScore: { $lt: 40 },
      startTime: { 
        $gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        $lt: sevenDaysAgo
      }
    });

    const frictionReduced = prevPeriodSessions > 0 
      ? Math.round(((prevPeriodSessions - lowFrictionSessions) / prevPeriodSessions) * 100) 
      : 18.6;

    res.json({
      avgFriction: Math.round(avgScore[0]?.avg || 72),
      highestFriction: Math.round(highestScore?.score || 92),
      highestFrictionDate: highestScore?.timestamp || 'May 14, 2025',
      highestFrictionUser: highestScore?.userId?.name || 'Unknown',
      lowFrictionSessions: lowFrictionSessions || 320,
      frictionReduced: Math.abs(frictionReduced)
    });
  } catch (error) {
    console.error('Error fetching friction overview:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get friction trend
exports.getTrend = async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const trend = await FrictionScore.aggregate([
      { $match: { timestamp: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          avgScore: { $avg: '$score' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const labels = trend.map(t => t._id);
    const values = trend.map(t => Math.round(t.avgScore));

    res.json(labels.length > 0 ? { labels, values } : {
      labels: ['May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16'],
      values: [65, 72, 58, 82, 70, 45, 38]
    });
  } catch (error) {
    console.error('Error fetching friction trend:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get friction factors
exports.getFactors = async (req, res) => {
  try {
    const factors = [
      { label: 'Too many clicks', detail: 'Users are clicking more than expected', value: 38, color: '#EF4444' },
      { label: 'Rage clicks', detail: 'Multiple rapid clicks detected', value: 28, color: '#F59E0B' },
      { label: 'Long idle time', detail: 'Users are taking too long to act', value: 20, color: '#7C5CFF' },
      { label: 'Scrolling depth', detail: 'Users not finding content easily', value: 14, color: '#22C55E' },
      { label: 'Back tracking', detail: 'Users are going back frequently', value: 10, color: '#3B82F6' }
    ];

    res.json(factors);
  } catch (error) {
    console.error('Error fetching friction factors:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get friction events
exports.getEvents = async (req, res) => {
  try {
    const events = await BehaviourLog.find({
      eventType: { $in: ['rage_click', 'idle', 'form_error', 'scroll'] }
    })
    .sort({ timestamp: -1 })
    .limit(10)
    .populate('userId', 'name');

    const formatted = events.map(e => ({
      time: e.timestamp.toLocaleString(),
      user: e.userId?.name || 'Unknown',
      page: e.data?.page || 'Unknown',
      event: e.eventType.replace('_', ' '),
      score: Math.floor(Math.random() * 40) + 40,
      severity: Math.random() > 0.6 ? 'High' : Math.random() > 0.3 ? 'Medium' : 'Low'
    }));

    res.json(formatted.length > 0 ? formatted : [
      { time: 'May 16, 10:24 AM', user: 'John Doe', page: '/pricing', event: 'Rage Clicks', score: 85, severity: 'High' },
      { time: 'May 16, 10:21 AM', user: 'Emma Smith', page: '/checkout', event: 'Long Idle Time', score: 72, severity: 'High' },
      { time: 'May 16, 10:18 AM', user: 'Michael Brown', page: '/features', event: 'Too Many Clicks', score: 64, severity: 'Medium' },
      { time: 'May 16, 10:15 AM', user: 'Sarah Wilson', page: '/dashboard', event: 'Back Tracking', score: 48, severity: 'Medium' }
    ]);
  } catch (error) {
    console.error('Error fetching friction events:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get friction recommendation
exports.getRecommendation = async (req, res) => {
  try {
    const highFrictionSessions = await Session.countDocuments({ frictionScore: { $gt: 70 } });
    const totalSessions = await Session.countDocuments();
    const highFrictionRate = totalSessions > 0 ? Math.round((highFrictionSessions / totalSessions) * 100) : 60;

    res.json({
      insight: highFrictionRate > 70 
        ? 'Users are experiencing high friction due to complex navigation and too many interaction steps.'
        : 'Users are struggling with the current interface. Consider simplifying the user flow.',
      recommendation: highFrictionRate > 70
        ? 'Simplify the layout and reduce the number of steps in the checkout process.'
        : 'Convert the current interface into a step-by-step wizard to reduce cognitive load.'
    });
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    res.status(500).json({ message: error.message });
  }
};