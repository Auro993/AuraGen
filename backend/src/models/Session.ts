export interface Session {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  cognitiveLoad: number;
  events: any[];
}