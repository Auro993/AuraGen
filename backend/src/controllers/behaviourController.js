const Session = require('../models/Session');
const BehaviourLog = require('../models/BehaviourLog');
const FrictionScore = require('../models/FrictionScore');

// Get KPI data
exports.getKPI = async (req, res) => {
  try {
    const totalInteractions = await BehaviourLog.countDocuments();
    const sessions = await Session.find();
    const avgInteractions = sessions.length > 0 ? Math.round(totalInteractions / sessions.length * 10) / 10 : 32.4;
    const rageClicks = await BehaviourLog.countDocuments({ eventType: 'rage_click' });
    const deadClicks = await BehaviourLog.countDocuments({ eventType: 'click', 'data.error': { $exists: true } });

    res.json([
      { icon: '🖱️', label: 'Total Interactions', value: totalInteractions.toLocaleString() || '24,589', change: '+1,645', positive: true, color: '#7C5CFF' },
      { icon: '📊', label: 'Avg. Interactions / Session', value: avgInteractions.toFixed(1) || '32.4', change: '+12.4%', positive: true, color: '#3B82F6' },
      { icon: '⚡', label: 'Rage Clicks', value: rageClicks.toLocaleString() || '1,248', change: '+7,625', positive: false, color: '#EF4444' },
      { icon: '❌', label: 'Dead Clicks', value: deadClicks.toLocaleString() || '842', change: '+4,235', positive: false, color: '#F59E0B' }
    ]);
  } catch (error) {
    console.error('Error fetching KPI:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get behaviour distribution
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
      'scroll': { label: 'Scroll Hesitation', color: '#22C55E' }
    };

    const formatted = logs.map(l => ({
      label: distribution[l._id]?.label || l._id,
      value: Math.round((l.count / total) * 100),
      color: distribution[l._id]?.color || '#9CA3AF'
    }));

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

    const labels = trend.map(t => t._id);
    const data = trend.map(t => t.count);

    if (labels.length === 0) {
      res.json({ labels: ['May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16'], data: [1200, 1500, 1800, 1600, 2000, 2200, 1900] });
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
    res.json({
      labels: ['Confusing Navigation', 'Complex Forms', 'Too Much Information', 'Small Buttons', 'Slow Loading'],
      data: [1248, 842, 824, 421, 312]
    });
  } catch (error) {
    console.error('Error fetching triggers:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get timeline
exports.getTimeline = async (req, res) => {
  try {
    const recentLogs = await BehaviourLog.find()
      .sort({ timestamp: -1 })
      .limit(5)
      .populate('userId', 'name');

    const events = recentLogs.map(log => ({
      time: log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      event: `${log.eventType.replace('_', ' ')} - ${log.userId?.name || 'User'}`,
      icon: log.eventType === 'click' ? '🖱️' : log.eventType === 'rage_click' ? '⚡' : '📱'
    }));

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

    let message = 'Users spend most of their time searching for the navigation menu.';
    let suggestion = 'Simplify the navigation and increase button visibility.';

    if (highFrictionRate > 70) {
      message = 'Users are experiencing high friction across multiple pages.';
      suggestion = 'Consider simplifying the overall UI and reducing cognitive load.';
    }

    res.json({
      title: '💡 AI Insight',
      message: message,
      suggestion: suggestion
    });
  } catch (error) {
    console.error('Error fetching insight:', error);
    res.status(500).json({ message: error.message });
  }
};