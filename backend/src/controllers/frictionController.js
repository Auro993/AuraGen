const Session = require('../models/Session');
const FrictionScore = require('../models/FrictionScore');
const BehaviourLog = require('../models/BehaviourLog');
const Behaviour = require('../models/Behaviour');
const FrictionCalculator = require('../services/frictionCalculator');

// Get friction overview
exports.getOverview = async (req, res) => {
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

    res.json({
      avgFriction: avgFriction,
      highestFriction: Math.round(highestScore?.score || 92),
      highestFrictionDate: highestScore?.timestamp?.toLocaleDateString() || 'May 14, 2025',
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
    res.status(500).json({ message: error.message });
  }
};

// Get friction factors
exports.getFactors = async (req, res) => {
  try {
    // Get real data from behaviour logs
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

    // Add back tracking if needed
    factors.push({
      label: 'Back tracking',
      detail: 'Users are going back frequently',
      value: 10,
      color: '#3B82F6'
    });

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

    // Get top factors
    const topFactors = await BehaviourLog.aggregate([
      { $match: { eventType: { $in: ['rage_click', 'idle', 'click'] } } },
      { $group: { _id: '$eventType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 2 }
    ]);

    let insight = '';
    let recommendation = '';

    if (highFrictionRate > 70) {
      insight = 'Users are experiencing high friction due to complex navigation and too many interaction steps.';
      recommendation = 'Simplify the layout and reduce the number of steps in the user flow.';
    } else if (topFactors.some(f => f._id === 'rage_click')) {
      insight = 'Users are frequently rage-clicking, indicating high frustration levels.';
      recommendation = 'Simplify the interface and reduce the number of steps in key workflows.';
    } else if (highFrictionRate > 40) {
      insight = 'Users are struggling with the current interface. Consider simplifying the user flow.';
      recommendation = 'Convert the current interface into a step-by-step wizard to reduce cognitive load.';
    } else {
      insight = 'Users are navigating smoothly with minimal friction.';
      recommendation = 'Continue monitoring user behavior for any emerging issues.';
    }

    res.json({
      insight: insight,
      recommendation: recommendation
    });
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    res.status(500).json({ 
      insight: 'Users are experiencing high friction due to complex navigation and too many interaction steps.',
      recommendation: 'Simplify the pricing layout and reduce the number of steps in the checkout process.'
    });
  }
};

// Calculate friction for a session
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

// Get current friction score
exports.getCurrentScore = async (req, res) => {
  try {
    const latest = await FrictionScore.findOne()
      .sort({ timestamp: -1 })
      .populate('userId', 'name');

    res.json({
      score: latest?.score || 72,
      level: latest?.level || 'Medium',
      reason: latest?.reason || 'No data available',
      timestamp: latest?.timestamp || new Date()
    });
  } catch (error) {
    console.error('Error fetching current score:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get friction breakdown
exports.getBreakdown = async (req, res) => {
  try {
    // Get the latest behaviour data
    const latestBehaviour = await Behaviour.findOne()
      .sort({ createdAt: -1 });
    
    if (!latestBehaviour) {
      return res.json([
        { label: 'Wrong Clicks', value: 0, contribution: '+0', icon: '❌', color: '#EF4444' },
        { label: 'Idle Time', value: 0, contribution: '+0', icon: '⏱️', color: '#F59E0B' },
        { label: 'Scroll Depth', value: 0, contribution: '+0', icon: '📜', color: '#22C55E' },
        { label: 'Mouse Movement', value: 0, contribution: '+0', icon: '🖱️', color: '#7C5CFF' },
        { label: 'Completion Time', value: 0, contribution: '+0', icon: '⏳', color: '#3B82F6' },
      ]);
    }
    
    // Calculate breakdown based on actual behaviour
    const wrongClicksValue = Math.min(latestBehaviour.wrongClicks || 0, 10);
    const idleTimeValue = Math.min(Math.round((latestBehaviour.idleTime || 0) / 2), 20);
    const scrollValue = Math.min(Math.round((latestBehaviour.scrollDepth || 0) / 10), 15);
    const mouseValue = Math.min(Math.round((latestBehaviour.mouseDistance || 0) / 250), 12);
    const timeValue = Math.min(Math.round((latestBehaviour.duration || 0) / 15), 10);
    
    const breakdown = [
      { 
        label: 'Wrong Clicks', 
        value: wrongClicksValue,
        contribution: `+${wrongClicksValue * 4}`,
        icon: '❌', 
        color: '#EF4444' 
      },
      { 
        label: 'Idle Time', 
        value: idleTimeValue,
        contribution: `+${idleTimeValue * 2}`,
        icon: '⏱️', 
        color: '#F59E0B' 
      },
      { 
        label: 'Scroll Depth', 
        value: scrollValue,
        contribution: `+${scrollValue}`,
        icon: '📜', 
        color: '#22C55E' 
      },
      { 
        label: 'Mouse Movement', 
        value: mouseValue,
        contribution: `+${mouseValue}`,
        icon: '🖱️', 
        color: '#7C5CFF' 
      },
      { 
        label: 'Completion Time', 
        value: timeValue,
        contribution: `+${timeValue}`,
        icon: '⏳', 
        color: '#3B82F6' 
      },
    ];
    
    res.json(breakdown);
  } catch (error) {
    console.error('Error fetching breakdown:', error);
    res.status(500).json({ message: error.message });
  }
};