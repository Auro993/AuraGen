// backend/src/controllers/frictionController.js

const Session = require('../models/Session');
const FrictionScore = require('../models/FrictionScore');
const BehaviourLog = require('../models/BehaviourLog');
const Behaviour = require('../models/Behaviour');
const FrictionCalculator = require('../services/frictionCalculator');

// ============ NEW: Get friction analytics (main endpoint) ============
exports.getFrictionAnalytics = async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    // Get average friction score
    const avgScoreResult = await FrictionScore.aggregate([
      { $match: { timestamp: { $gte: sevenDaysAgo } } },
      { $group: { _id: null, avg: { $avg: '$score' } } }
    ]);
    const avgFriction = Math.round(avgScoreResult[0]?.avg || 72);

    // Get highest friction score
    const highestScore = await FrictionScore.findOne()
      .sort({ score: -1 })
      .populate('userId', 'name');

    // Count low friction sessions
    const lowFrictionSessions = await Session.countDocuments({ 
      frictionScore: { $lt: 40 },
      startTime: { $gte: sevenDaysAgo }
    });

    // Calculate friction reduced
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

    // Get factors
    const factors = await getFrictionFactorsData();
    
    // Get breakdown
    const breakdown = await getFrictionBreakdownData();
    
    // Get events
    const events = await getFrictionEventsData();
    
    // Get recommendation
    const recommendation = await getFrictionRecommendationData();

    res.json({
      totalScore: 81,
      avgScore: avgFriction,
      highestScore: Math.round(highestScore?.score || 92),
      lowestScore: 38,
      lowFrictionSessions: lowFrictionSessions || 320,
      frictionReduced: Math.abs(frictionReduced),
      trendChange: '+8.6%',
      highestFrictionDate: highestScore?.timestamp?.toLocaleDateString() || 'May 14, 2025',
      lowFrictionTrend: '+14.2%',
      factors: factors,
      breakdown: breakdown,
      events: events,
      recommendation: recommendation
    });
  } catch (error) {
    console.error('Error fetching friction analytics:', error);
    // Return fallback data
    res.json(getFallbackAnalytics());
  }
};

// ============ Get friction overview ============
exports.getOverview = async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const avgScoreResult = await FrictionScore.aggregate([
      { $match: { timestamp: { $gte: sevenDaysAgo } } },
      { $group: { _id: null, avg: { $avg: '$score' } } }
    ]);
    const avgFriction = Math.round(avgScoreResult[0]?.avg || 72);

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
      avgFriction: avgFriction,
      highestFriction: Math.round(highestScore?.score || 92),
      highestFrictionDate: highestScore?.timestamp?.toLocaleDateString() || 'May 14, 2025',
      lowFrictionSessions: lowFrictionSessions || 320,
      frictionReduced: Math.abs(frictionReduced),
      trendChange: '+8.6%',
      currentScore: 81
    });
  } catch (error) {
    console.error('Error fetching friction overview:', error);
    res.status(500).json({ 
      avgFriction: 72,
      highestFriction: 92,
      highestFrictionDate: 'May 14, 2025',
      lowFrictionSessions: 320,
      frictionReduced: 18.6,
      trendChange: '+8.6%',
      currentScore: 81
    });
  }
};

// ============ Get friction trend ============
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

    const labels = trend.map(t => {
      const date = new Date(t._id);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const values = trend.map(t => Math.round(t.avgScore));

    if (labels.length === 0) {
      res.json({
        labels: ['May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16'],
        values: [65, 72, 58, 82, 70, 45, 38]
      });
    } else {
      res.json({ labels, values });
    }
  } catch (error) {
    console.error('Error fetching friction trend:', error);
    res.status(500).json({ 
      labels: ['May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16'],
      values: [65, 72, 58, 82, 70, 45, 38]
    });
  }
};

// ============ Get friction factors ============
exports.getFactors = async (req, res) => {
  try {
    const factors = await getFrictionFactorsData();
    res.json(factors);
  } catch (error) {
    console.error('Error fetching friction factors:', error);
    res.status(500).json(getDefaultFactors());
  }
};

// ============ Get friction events ============
exports.getEvents = async (req, res) => {
  try {
    const events = await getFrictionEventsData();
    res.json(events);
  } catch (error) {
    console.error('Error fetching friction events:', error);
    res.status(500).json(getDefaultEvents());
  }
};

// ============ Get friction recommendation ============
exports.getRecommendation = async (req, res) => {
  try {
    const recommendation = await getFrictionRecommendationData();
    res.json(recommendation);
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    res.status(500).json({
      insight: 'Users are experiencing high friction due to complex navigation and too many interaction steps.',
      recommendation: 'Simplify the layout and reduce the number of steps in the user flow.'
    });
  }
};

// ============ Calculate friction for a session ============
exports.calculateFriction = async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    const behaviour = await BehaviourLog.find({ sessionId });
    if (!behaviour || behaviour.length === 0) {
      return res.status(404).json({ message: 'No behaviour data found for this session' });
    }

    const result = FrictionCalculator.calculateScore(behaviour);
    
    const frictionScore = new FrictionScore({
      sessionId: sessionId,
      userId: req.userId,
      score: result.score,
      level: result.level,
      factors: result.factors,
      reason: result.reason
    });
    await frictionScore.save();

    res.json({
      frictionScore: result.score,
      level: result.level,
      reason: result.reason,
      factors: result.factors,
      message: 'Friction score calculated successfully'
    });
  } catch (error) {
    console.error('Error calculating friction:', error);
    res.status(500).json({ message: error.message });
  }
};

// ============ Get current friction score ============
exports.getCurrentScore = async (req, res) => {
  try {
    const latest = await FrictionScore.findOne()
      .sort({ timestamp: -1 })
      .populate('userId', 'name');

    res.json({
      score: latest?.score || 81,
      level: latest?.level || 'High',
      reason: latest?.reason || 'High friction detected',
      timestamp: latest?.timestamp || new Date()
    });
  } catch (error) {
    console.error('Error fetching current score:', error);
    res.status(500).json({ 
      score: 81,
      level: 'High',
      reason: 'High friction detected',
      timestamp: new Date()
    });
  }
};

// ============ Get friction breakdown ============
exports.getBreakdown = async (req, res) => {
  try {
    const breakdown = await getFrictionBreakdownData();
    res.json(breakdown);
  } catch (error) {
    console.error('Error fetching breakdown:', error);
    res.status(500).json(getDefaultBreakdown());
  }
};

// ============ HELPER FUNCTIONS ============

// Get friction factors data
const getFrictionFactorsData = async () => {
  try {
    const behaviourData = await BehaviourLog.aggregate([
      { $match: { eventType: { $in: ['click', 'rage_click', 'idle', 'scroll'] } } },
      { $group: { _id: '$eventType', count: { $sum: 1 } } }
    ]);

    const total = behaviourData.reduce((sum, b) => sum + b.count, 0) || 100;

    const factorMap = {
      'click': { label: 'Too many clicks', detail: 'Users are clicking more than expected', color: '#EF4444' },
      'rage_click': { label: 'Rage clicks', detail: 'Multiple rapid clicks detected', color: '#EC4899' },
      'idle': { label: 'Long idle time', detail: 'Users are taking too long to act', color: '#F59E0B' },
      'scroll': { label: 'Scrolling depth', detail: 'Users not finding content easily', color: '#22C55E' }
    };

    const factors = behaviourData.map(b => ({
      label: factorMap[b._id]?.label || b._id,
      detail: factorMap[b._id]?.detail || 'User behavior detected',
      value: Math.round((b.count / total) * 100),
      color: factorMap[b._id]?.color || '#3B82F6'
    }));

    // Add back tracking
    factors.push({
      label: 'Back tracking',
      detail: 'Users are going back frequently',
      value: 10,
      color: '#3B82F6'
    });

    return factors.length > 0 ? factors : getDefaultFactors();
  } catch (error) {
    return getDefaultFactors();
  }
};

// Get friction events data
const getFrictionEventsData = async () => {
  try {
    const events = await BehaviourLog.find({
      eventType: { $in: ['rage_click', 'idle', 'click', 'scroll'] }
    })
    .sort({ timestamp: -1 })
    .limit(10)
    .populate('userId', 'name')
    .lean();

    const formatted = events.map(e => {
      let score = 30;
      let severity = 'Low';
      let eventLabel = e.eventType.replace('_', ' ');

      if (e.eventType === 'rage_click') {
        score = Math.floor(Math.random() * 30) + 70;
        severity = 'High';
      } else if (e.eventType === 'idle') {
        score = Math.floor(Math.random() * 30) + 50;
        severity = 'Medium';
      } else if (e.eventType === 'click') {
        score = Math.floor(Math.random() * 30) + 30;
        severity = 'Medium';
      } else if (e.eventType === 'scroll') {
        score = Math.floor(Math.random() * 30) + 20;
        severity = 'Low';
      }

      return {
        time: e.timestamp.toLocaleString(),
        user: e.userId?.name || 'Unknown',
        page: e.data?.page || 'Unknown',
        event: eventLabel,
        score: score,
        severity: severity
      };
    });

    return formatted.length > 0 ? formatted : getDefaultEvents();
  } catch (error) {
    return getDefaultEvents();
  }
};

// Get friction recommendation data
const getFrictionRecommendationData = async () => {
  try {
    const highFrictionSessions = await Session.countDocuments({ frictionScore: { $gt: 70 } });
    const totalSessions = await Session.countDocuments();
    const highFrictionRate = totalSessions > 0 ? Math.round((highFrictionSessions / totalSessions) * 100) : 60;

    if (highFrictionRate > 70) {
      return {
        insight: 'Users are experiencing high friction due to complex navigation and too many interaction steps.',
        recommendation: 'Simplify the layout and reduce the number of steps in the user flow.'
      };
    } else if (highFrictionRate > 40) {
      return {
        insight: 'Users are struggling with the current interface. Consider simplifying the user flow.',
        recommendation: 'Convert the current interface into a step-by-step wizard to reduce cognitive load.'
      };
    } else {
      return {
        insight: 'Users are navigating smoothly with minimal friction.',
        recommendation: 'Continue monitoring user behavior for any emerging issues.'
      };
    }
  } catch (error) {
    return {
      insight: 'Users are experiencing high friction due to complex navigation and too many interaction steps.',
      recommendation: 'Simplify the pricing layout and reduce the number of steps in the checkout process.'
    };
  }
};

// Get friction breakdown data
const getFrictionBreakdownData = async () => {
  try {
    const latestBehaviour = await Behaviour.findOne()
      .sort({ createdAt: -1 });
    
    if (!latestBehaviour) {
      return getDefaultBreakdown();
    }
    
    const wrongClicksValue = Math.min(latestBehaviour.wrongClicks || 25, 25);
    const idleTimeValue = Math.min(Math.round((latestBehaviour.idleTime || 22) / 1), 22);
    const scrollValue = Math.min(Math.round((latestBehaviour.scrollDepth || 15) / 1), 15);
    const mouseValue = Math.min(Math.round((latestBehaviour.mouseDistance || 12) / 1), 12);
    const timeValue = Math.min(Math.round((latestBehaviour.duration || 7) / 1), 7);
    
    const breakdown = [
      { 
        label: 'Wrong Clicks', 
        value: wrongClicksValue || 25,
        contribution: `+${wrongClicksValue || 25}`,
        icon: '❌', 
        color: '#EF4444' 
      },
      { 
        label: 'Idle Time', 
        value: idleTimeValue || 22,
        contribution: `+${idleTimeValue || 22}`,
        icon: '⏱️', 
        color: '#F59E0B' 
      },
      { 
        label: 'Scroll Depth', 
        value: scrollValue || 15,
        contribution: `+${scrollValue || 15}`,
        icon: '📜', 
        color: '#22C55E' 
      },
      { 
        label: 'Mouse Movement', 
        value: mouseValue || 12,
        contribution: `+${mouseValue || 12}`,
        icon: '🖱️', 
        color: '#7C5CFF' 
      },
      { 
        label: 'Completion Time', 
        value: timeValue || 7,
        contribution: `+${timeValue || 7}`,
        icon: '⏳', 
        color: '#3B82F6' 
      },
    ];
    
    return breakdown;
  } catch (error) {
    return getDefaultBreakdown();
  }
};

// ============ DEFAULT DATA ============

const getDefaultFactors = () => {
  return [
    { label: 'Rage clicks', detail: 'Multiple rapid clicks detected', value: 25, color: '#EF4444' },
    { label: 'Too many clicks', detail: 'Users are clicking more than expected', value: 30, color: '#EC4899' },
    { label: 'Long idle time', detail: 'Users are taking too long to act', value: 22, color: '#F59E0B' },
    { label: 'Scrolling depth', detail: 'Users not finding content easily', value: 24, color: '#22C55E' },
    { label: 'Back tracking', detail: 'Users are going back frequently', value: 10, color: '#3B82F6' }
  ];
};

const getDefaultBreakdown = () => {
  return [
    { label: 'Wrong Clicks', value: 25, contribution: '+25', icon: '❌', color: '#EF4444' },
    { label: 'Idle Time', value: 22, contribution: '+22', icon: '⏱️', color: '#F59E0B' },
    { label: 'Scroll Depth', value: 15, contribution: '+15', icon: '📜', color: '#22C55E' },
    { label: 'Mouse Movement', value: 12, contribution: '+12', icon: '🖱️', color: '#7C5CFF' },
    { label: 'Completion Time', value: 7, contribution: '+7', icon: '⏳', color: '#3B82F6' }
  ];
};

const getDefaultEvents = () => {
  return [
    { time: 'May 16, 10:24 AM', user: 'John Doe', page: '/pricing', event: 'Rage Clicks', score: 85, severity: 'High' },
    { time: 'May 16, 10:21 AM', user: 'Emma Smith', page: '/checkout', event: 'Long Idle Time', score: 72, severity: 'High' },
    { time: 'May 16, 10:18 AM', user: 'Michael Brown', page: '/features', event: 'Too Many Clicks', score: 64, severity: 'Medium' },
    { time: 'May 16, 10:15 AM', user: 'Sarah Wilson', page: '/dashboard', event: 'Back Tracking', score: 48, severity: 'Medium' },
    { time: 'May 16, 10:12 AM', user: 'David Lee', page: '/profile', event: 'Long Idle Time', score: 35, severity: 'Low' }
  ];
};

const getFallbackAnalytics = () => {
  return {
    totalScore: 81,
    avgScore: 72,
    highestScore: 92,
    lowestScore: 38,
    lowFrictionSessions: 320,
    frictionReduced: 18.6,
    trendChange: '+8.6%',
    highestFrictionDate: 'May 14, 2025',
    lowFrictionTrend: '+14.2%',
    factors: getDefaultFactors(),
    breakdown: getDefaultBreakdown(),
    events: getDefaultEvents(),
    recommendation: {
      insight: 'Users are experiencing high friction due to complex navigation and too many interaction steps.',
      recommendation: 'Simplify the layout and reduce the number of steps in the user flow.'
    }
  };
};