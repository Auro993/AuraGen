class FrictionCalculator {
  static calculateScore(behaviour) {
    let score = 0;
    const factors = [];

    // Wrong Clicks: +5 each (max 50)
    if (behaviour.wrongClicks) {
      const wrongClickScore = Math.min(behaviour.wrongClicks * 5, 50);
      score += wrongClickScore;
      factors.push({
        name: 'Wrong Clicks',
        value: wrongClickScore,
        weight: 5,
        count: behaviour.wrongClicks,
        color: '#EF4444'
      });
    }

    // Rage Clicks: +10 each (max 50)
    if (behaviour.rageClicks) {
      const rageScore = Math.min(behaviour.rageClicks * 10, 50);
      score += rageScore;
      factors.push({
        name: 'Rage Clicks',
        value: rageScore,
        weight: 10,
        count: behaviour.rageClicks,
        color: '#EC4899'
      });
    }

    // Idle Time: +1 per second (max 30)
    if (behaviour.idleTime) {
      const idleScore = Math.min(behaviour.idleTime, 30);
      score += idleScore;
      factors.push({
        name: 'Idle Time',
        value: idleScore,
        weight: 1,
        count: behaviour.idleTime,
        color: '#F59E0B'
      });
    }

    // Form Errors: +8 each (max 40)
    if (behaviour.formErrors) {
      const errorScore = Math.min(behaviour.formErrors * 8, 40);
      score += errorScore;
      factors.push({
        name: 'Form Errors',
        value: errorScore,
        weight: 8,
        count: behaviour.formErrors,
        color: '#8B5CF6'
      });
    }

    // Excessive Scroll: +2 per 100px (capped at 20)
    if (behaviour.scrollDepth) {
      const scrollScore = Math.min(Math.floor(behaviour.scrollDepth / 100) * 2, 20);
      score += scrollScore;
      factors.push({
        name: 'Excessive Scroll',
        value: scrollScore,
        weight: 2,
        count: behaviour.scrollDepth,
        color: '#22C55E'
      });
    }

    // Determine level
    let level = 'Low';
    let reason = 'User is navigating smoothly.';

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
      factors: factors
    };
  }
}

module.exports = FrictionCalculator;