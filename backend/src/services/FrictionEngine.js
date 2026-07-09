class FrictionEngine {
  static calculateScore(metrics) {
    const {
      mouseSpeed = 0,
      hesitationTime = 0,
      errorRate = 0,
      clickErrorRate = 0,
      rageClicks = 0
    } = metrics;

    // Normalize metrics (0-100 scale)
    const normalizedMouseSpeed = Math.min(Math.abs(mouseSpeed) / 100 * 50, 50);
    const normalizedHesitation = Math.min(hesitationTime / 30 * 30, 30);
    const normalizedErrors = Math.min(errorRate * 20, 20);
    const normalizedRageClicks = Math.min(rageClicks * 10, 10);

    // Calculate weighted score
    let score = 0;
    score += normalizedMouseSpeed * 0.3;
    score += normalizedHesitation * 0.3;
    score += normalizedErrors * 0.25;
    score += normalizedRageClicks * 0.15;

    // Scale to 0-100
    return Math.min(Math.round(score), 100);
  }

  static analyzeBehavior(metrics) {
    const score = this.calculateScore(metrics);
    let level = 'low';
    let recommendation = '';

    if (score > 70) {
      level = 'high';
      recommendation = 'User is highly frustrated. Consider simplifying the UI immediately.';
    } else if (score > 40) {
      level = 'medium';
      recommendation = 'User is experiencing some difficulty. Monitor closely.';
    } else {
      level = 'low';
      recommendation = 'User is navigating smoothly.';
    }

    return {
      score,
      level,
      recommendation,
      metrics
    };
  }
}

module.exports = FrictionEngine;