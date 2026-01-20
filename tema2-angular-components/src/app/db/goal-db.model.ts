export interface GoalDBModel {
  id: number;
  userId: number;
  projectId: number; 
  percentageCompleted: number;
  name: {
    en: string;
    ro: string;
  };
}