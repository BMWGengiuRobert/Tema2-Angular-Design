export interface TaskDBModel {
  id: number;
  projectId: number;
  userId: number;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: Date;
  name: {
    en: string;
    ro: string;
  };
}