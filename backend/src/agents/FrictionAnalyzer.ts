export class FrictionAnalyzer {
  calculateScore(velocity: number, clicks: number): number {
    const velocityScore = Math.min((velocity * 100) / 1000, 1);
    const clickScore = Math.min(clicks / 10, 1);
    return (velocityScore * 0.6) + (clickScore * 0.4);
  }
}