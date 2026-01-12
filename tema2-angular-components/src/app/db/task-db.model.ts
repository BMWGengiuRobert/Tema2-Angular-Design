export interface TaskDBModel {
  id: number;
  projectId: number;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: Date;
}