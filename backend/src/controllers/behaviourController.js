const Session = require('../models/Session');
const BehaviourLog = require('../models/BehaviourLog');
const FrictionScore = require('../models/FrictionScore');
const Behaviour = require('../models/Behaviour');

// ============ EXISTING FUNCTIONS ============

// Get KPI data
exports.getKPI = async (req, res) => {
  try {
    const totalInteractions = await BehaviourLog.countDocuments();
    const sessions = await Session.find();
    const avgInteractions = sessions.length > 0 ? Math.round(totalInteractions / sessions.length * 10) / 10 : 32.4;
    const rageClicks = await BehaviourLog.countDocuments({ eventType: 'rage_click' });
    const deadClicks = await BehaviourLog.countDocuments({ 
      eventType: 'click', 
      'data.error': { $exists: true } 
    });

    res.json([
      { 
        icon: '🖱️', 
        label: 'Total Interactions', 
        value: totalInteractions.toLocaleString() || '24,589', 
        change: '+1,645', 
        positive: true, 
        color: '#7C5CFF' 
      },
      { 
        icon: '📊', 
        label: 'Avg. Interactions / Session', 
        value: avgInteractions.toFixed(1) || '32.4', 
        change: '+12.4%', 
        positive: true, 
        color: '#3B82F6' 
      },
      { 
        icon: '⚡', 
        label: 'Rage Clicks', 
        value: rageClicks.toLocaleString() || '1,248', 
        change: '+7,625', 
        positive: false, 
        color: '#EF4444' 
      },
      { 
        icon: '❌', 
        label: 'Dead Clicks', 
        value: deadClicks.toLocaleString() || '842', 
        change: '+4,235', 
        positive: false, 
        color: '#F59E0B' 
      }
    ]);
  } catch (error) {
    console.error('Error fetching KPI:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get behaviour distribution with proper colors
exports.getDistribution = async (req, res) => {
  try {
    const logs = await BehaviourLog.aggregate([
      { $group: { _id: '$eventType', count: { $sum: 1 } } }
    ]);

    const total = logs.reduce((sum, l) => sum + l.count, 0) || 100;
    
    const distribution = {
      'mouse_move': { label: 'Mouse Movement', color: '#7C5CFF' },
      'click': { label: 'Wrong Clicks', color: '#EF4444' },
      'idle': { label: 'Idle Time', color: '#F59E0B' },
      'scroll': { label: 'Scroll Hesitation', color: '#22C55E' },
      'rage_click': { label: 'Rage Clicks', color: '#EC4899' },
      'form_error': { label: 'Form Errors', color: '#8B5CF6' },
      'hover': { label: 'Hover', color: '#06B6D4' },
      'page_change': { label: 'Page Change', color: '#3B82F6' },
      'session_start': { label: 'Session Start', color: '#10B981' },
      'session_end': { label: 'Session End', color: '#6B7280' },
      'click_rage': { label: 'Rage Clicks', color: '#EC4899' }
    };

    const formatted = logs.map(l => ({
      label: distribution[l._id]?.label || l._id.replace('_', ' '),
      value: Math.round((l.count / total) * 100),
      color: distribution[l._id]?.color || '#9CA3AF'
    }));

    formatted.sort((a, b) => b.value - a.value);

    res.json(formatted.length > 0 ? formatted : [
      { label: 'Mouse Movement', value: 40, color: '#7C5CFF' },
      { label: 'Wrong Clicks', value: 25, color: '#EF4444' },
      { label: 'Idle Time', value: 20, color: '#F59E0B' },
      { label: 'Scroll Hesitation', value: 15, color: '#22C55E' }
    ]);
  } catch (error) {
    console.error('Error fetching distribution:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get interaction trend
exports.getInteractionTrend = async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const trend = await BehaviourLog.aggregate([
      { $match: { timestamp: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const labels = trend.map(t => {
      const date = new Date(t._id);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const data = trend.map(t => t.count);

    if (labels.length === 0) {
      res.json({ 
        labels: ['May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16'], 
        data: [1200, 1500, 1800, 1600, 2000, 2200, 1900] 
      });
    } else {
      res.json({ labels, data });
    }
  } catch (error) {
    console.error('Error fetching interaction trend:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get behaviour triggers
exports.getTriggers = async (req, res) => {
  try {
    const sessions = await Session.find();
    const totalSessions = sessions.length || 1;
    
    const highFrictionSessions = await Session.countDocuments({ frictionScore: { $gt: 70 } });
    const mediumFrictionSessions = await Session.countDocuments({ 
      frictionScore: { $gt: 40, $lte: 70 } 
    });
    
    const triggerData = {
      'Confusing Navigation': Math.round(highFrictionSessions * 0.4 + 200),
      'Complex Forms': Math.round(highFrictionSessions * 0.3 + 150),
      'Too Much Information': Math.round(mediumFrictionSessions * 0.25 + 100),
      'Small Buttons': Math.round(mediumFrictionSessions * 0.2 + 80),
      'Slow Loading': Math.round(totalSessions * 0.15 + 50)
    };

    res.json({
      labels: Object.keys(triggerData),
      data: Object.values(triggerData)
    });
  } catch (error) {
    console.error('Error fetching triggers:', error);
    res.json({
      labels: ['Confusing Navigation', 'Complex Forms', 'Too Much Information', 'Small Buttons', 'Slow Loading'],
      data: [1248, 842, 824, 421, 312]
    });
  }
};

// Get timeline
exports.getTimeline = async (req, res) => {
  try {
    const recentLogs = await BehaviourLog.find()
      .sort({ timestamp: -1 })
      .limit(5)
      .populate('userId', 'name')
      .lean();

    const events = recentLogs.map(log => {
      const time = log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let icon = '📱';
      let eventName = log.eventType.replace('_', ' ');
      
      if (log.eventType === 'click') icon = '🖱️';
      else if (log.eventType === 'rage_click') icon = '⚡';
      else if (log.eventType === 'scroll') icon = '📜';
      else if (log.eventType === 'mouse_move') icon = '🖱️';
      else if (log.eventType === 'idle') icon = '⏳';
      else if (log.eventType === 'page_change') icon = '📄';
      else if (log.eventType === 'hover') icon = '👆';
      else if (log.eventType === 'form_error') icon = '❌';
      
      return {
        time: time,
        event: `${eventName} - ${log.userId?.name || 'User'}`,
        icon: icon,
        rawEvent: log.eventType,
        user: log.userId?.name || 'User'
      };
    });

    res.json(events.length > 0 ? events : [
      { time: '10:00', event: 'User Opened Dashboard', icon: '📱' },
      { time: '10:01', event: 'Scrolled Down', icon: '📜' },
      { time: '10:02', event: 'Wrong Click', icon: '❌' },
      { time: '10:03', event: 'Mouse Hesitation', icon: '🖱️' },
      { time: '10:04', event: 'AI Suggested Simpler UI', icon: '🤖' }
    ]);
  } catch (error) {
    console.error('Error fetching timeline:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get AI insight
exports.getInsight = async (req, res) => {
  try {
    const highFrictionSessions = await Session.countDocuments({ frictionScore: { $gt: 70 } });
    const totalSessions = await Session.countDocuments();
    const highFrictionRate = totalSessions > 0 ? Math.round((highFrictionSessions / totalSessions) * 100) : 65;
    
    const rageClicks = await BehaviourLog.countDocuments({ eventType: 'rage_click' });
    const deadClicks = await BehaviourLog.countDocuments({ 
      eventType: 'click', 
      'data.error': { $exists: true } 
    });

    let message = '';
    let suggestion = '';

    if (highFrictionRate > 70) {
      message = 'Users are experiencing high friction across multiple pages.';
      suggestion = 'Consider simplifying the overall UI and reducing cognitive load.';
    } else if (rageClicks > 50) {
      message = 'Users are frequently rage-clicking, indicating high frustration levels.';
      suggestion = 'Simplify the interface and reduce the number of steps in key workflows.';
    } else if (deadClicks > 60) {
      message = 'High number of dead clicks suggests unclear UI elements and buttons.';
      suggestion = 'Make clickable elements more visible and provide better visual feedback.';
    } else if (highFrictionRate > 40) {
      message = 'Users are struggling with complex navigation and form interactions.';
      suggestion = 'Reduce the number of steps and simplify the user flow.';
    } else {
      message = 'Users are navigating smoothly with minimal friction.';
      suggestion = 'Continue monitoring user behavior for any emerging issues.';
    }

    res.json({
      title: '💡 AI Insight',
      message: message,
      suggestion: suggestion,
      metrics: {
        highFrictionRate: highFrictionRate,
        rageClicks: rageClicks,
        deadClicks: deadClicks,
        totalSessions: totalSessions
      }
    });
  } catch (error) {
    console.error('Error fetching insight:', error);
    res.status(500).json({ 
      title: '💡 AI Insight',
      message: 'Users spend most of their time searching for the navigation menu.',
      suggestion: 'Simplify the navigation and increase button visibility.'
    });
  }
};

// Get heatmap data (for future use)
exports.getHeatmap = async (req, res) => {
  try {
    const heatmapData = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 14; j++) {
        row.push(Math.random());
      }
      heatmapData.push(row);
    }
    res.json(heatmapData);
  } catch (error) {
    console.error('Error fetching heatmap:', error);
    res.status(500).json({ message: error.message });
  }
};

// ============ NEW FUNCTIONS FOR DEMO PORTAL ============

// Track behaviour (for Demo Portal)
exports.trackBehaviour = async (req, res) => {
  try {
    console.log('📝 Tracking behaviour request received');
    
    const { sessionId, behaviour, formData } = req.body;
    
    // Validate input
    if (!sessionId) {
      return res.status(400).json({ message: 'sessionId is required' });
    }
    
    if (!behaviour) {
      return res.status(400).json({ message: 'behaviour data is required' });
    }
    
    // Create behaviour record
    const behaviourRecord = new Behaviour({
      sessionId: sessionId,
      userId: req.userId,
      mouseDistance: behaviour.mouseDistance || 0,
      clicks: behaviour.clicks || 0,
      wrongClicks: behaviour.wrongClicks || 0,
      idleTime: behaviour.idleTime || 0,
      scrollDepth: behaviour.scrollDepth || 0,
      formErrors: behaviour.formErrors || 0,
      duration: behaviour.duration || 0,
      formData: formData || {}
    });
    
    await behaviourRecord.save();
    console.log('✅ Behaviour saved:', behaviourRecord._id);
    
    // Calculate friction score using the calculator
    let frictionResult = {
      score: 45,
      level: 'Medium',
      reason: 'User is experiencing some difficulty.',
      factors: []
    };
    
    try {
      const FrictionCalculator = require('../services/frictionCalculator');
      frictionResult = FrictionCalculator.calculateScore(behaviour);
    } catch (calcError) {
      console.log('⚠️ Using fallback friction calculation');
      let score = 0;
      score += Math.min((behaviour.wrongClicks || 0), 10) * 5;
      score += Math.min((behaviour.rageClicks || 0), 5) * 10;
      score += Math.min((behaviour.idleTime || 0), 30);
      
      frictionResult = {
        score: Math.min(score, 100),
        level: score > 70 ? 'High' : score > 40 ? 'Medium' : 'Low',
        reason: score > 70 ? 'User is experiencing significant difficulty.' : 
                score > 40 ? 'User is experiencing some difficulty.' : 
                'User is navigating smoothly.',
        factors: []
      };
    }
    
    // Save friction score
    const frictionScore = new FrictionScore({
      sessionId: sessionId,
      userId: req.userId,
      score: frictionResult.score,
      level: frictionResult.level,
      factors: frictionResult.factors || [],
      reason: frictionResult.reason
    });
    await frictionScore.save();
    console.log('✅ Friction score saved:', frictionScore.score);
    
    res.json({
      success: true,
      behaviourId: behaviourRecord._id,
      frictionScore: frictionResult.score,
      frictionLevel: frictionResult.level,
      reason: frictionResult.reason,
      factors: frictionResult.factors || []
    });
  } catch (error) {
    console.error('❌ Error tracking behaviour:', error);
    res.status(500).json({ 
      message: error.message || 'Internal server error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get behaviour by session
exports.getBehaviourBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const behaviour = await Behaviour.findOne({ sessionId })
      .sort({ createdAt: -1 });
    
    if (!behaviour) {
      return res.status(404).json({ message: 'Behaviour not found' });
    }
    
    res.json(behaviour);
  } catch (error) {
    console.error('Error fetching behaviour:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all behaviour records
exports.getAllBehaviour = async (req, res) => {
  try {
    const behaviour = await Behaviour.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name');
    
    res.json(behaviour);
  } catch (error) {
    console.error('Error fetching behaviour:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get behaviour summary
exports.getBehaviourSummary = async (req, res) => {
  try {
    const totalSessions = await Behaviour.distinct('sessionId').countDocuments();
    const avgClicks = await Behaviour.aggregate([
      { $group: { _id: null, avg: { $avg: '$clicks' } } }
    ]);
    const avgIdleTime = await Behaviour.aggregate([
      { $group: { _id: null, avg: { $avg: '$idleTime' } } }
    ]);
    const totalWrongClicks = await Behaviour.aggregate([
      { $group: { _id: null, total: { $sum: '$wrongClicks' } } }
    ]);
    
    res.json({
      totalSessions: totalSessions || 0,
      avgClicks: Math.round(avgClicks[0]?.avg || 0),
      avgIdleTime: Math.round(avgIdleTime[0]?.avg || 0),
      totalWrongClicks: totalWrongClicks[0]?.total || 0
    });
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get friction for a session
exports.getFrictionBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const friction = await FrictionScore.findOne({ sessionId })
      .sort({ createdAt: -1 });
    
    if (!friction) {
      return res.status(404).json({ message: 'Friction not found' });
    }
    
    res.json(friction);
  } catch (error) {
    console.error('Error fetching friction:', error);
    res.status(500).json({ message: error.message });
  }
};