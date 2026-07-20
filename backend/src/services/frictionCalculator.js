class FrictionCalculator {
  static calculateScore(behaviourData) {
    let score = 0;
    const factors = [];

    // Extract metrics from behaviour data
    const metrics = behaviourData.reduce((acc, log) => {
      if (log.eventType === 'click') {
        acc.clicks = (acc.clicks || 0) + 1;
        // Check if it was a wrong click
        if (log.data?.error) {
          acc.wrongClicks = (acc.wrongClicks || 0) + 1;
        }
      }
      if (log.eventType === 'rage_click') {
        acc.rageClicks = (acc.rageClicks || 0) + 1;
      }
      if (log.eventType === 'idle') {
        acc.idleTime = (acc.idleTime || 0) + (log.data?.duration || 5);
      }
      if (log.eventType === 'scroll') {
        acc.scrollDepth = Math.max(acc.scrollDepth || 0, log.data?.scrollDepth || 0);
      }
      if (log.eventType === 'form_error') {
        acc.formErrors = (acc.formErrors || 0) + 1;
      }
      return acc;
    }, {});

    // Calculate individual scores
    // Wrong Clicks: +5 each
    if (metrics.wrongClicks) {
      const wrongClickScore = metrics.wrongClicks * 5;
      score += wrongClickScore;
      factors.push({
        name: 'Wrong Clicks',
        value: wrongClickScore,
        weight: 5,
        count: metrics.wrongClicks,
        color: '#EF4444'
      });
    }

    // Rage Clicks: +10 each
    if (metrics.rageClicks) {
      const rageScore = metrics.rageClicks * 10;
      score += rageScore;
      factors.push({
        name: 'Rage Clicks',
        value: rageScore,
        weight: 10,
        count: metrics.rageClicks,
        color: '#EC4899'
      });
    }

    // Idle Time: +1 per second
    if (metrics.idleTime) {
      const idleScore = Math.min(metrics.idleTime, 30);
      score += idleScore;
      factors.push({
        name: 'Idle Time',
        value: idleScore,
        weight: 1,
        count: metrics.idleTime,
        color: '#F59E0B'
      });
    }

    // Form Errors: +8 each
    if (metrics.formErrors) {
      const errorScore = metrics.formErrors * 8;
      score += errorScore;
      factors.push({
        name: 'Form Errors',
        value: errorScore,
        weight: 8,
        count: metrics.formErrors,
        color: '#8B5CF6'
      });
    }

    // Excessive Scroll: +2 per 100px (capped at 20)
    if (metrics.scrollDepth) {
      const scrollScore = Math.min(Math.floor(metrics.scrollDepth / 100) * 2, 20);
      score += scrollScore;
      factors.push({
        name: 'Excessive Scroll',
        value: scrollScore,
        weight: 2,
        count: metrics.scrollDepth,
        color: '#22C55E'
      });
    }

    // Determine level
    let level = 'Low';
    let reason = 'User is navigating smoothly';

    if (score > 80) {
      level = 'Critical';
      reason = 'High friction detected. Immediate action recommended.';
    } else if (score > 60) {
      level = 'High';
      reason = 'User is experiencing significant difficulty.';
    } else if (score > 30) {
      level = 'Medium';
      reason = 'User is experiencing some difficulty.';
    } else {
      level = 'Low';
      reason = 'User is navigating smoothly.';
    }

    // Sort factors by value descending
    factors.sort((a, b) => b.value - a.value);

    return {
      score: Math.min(score, 100),
      level: level,
      reason: reason,
      factors: factors,
      metrics: metrics
    };
  }
}

module.exports = FrictionCalculator;