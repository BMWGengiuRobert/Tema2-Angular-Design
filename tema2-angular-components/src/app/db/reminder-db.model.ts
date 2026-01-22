export interface ReminderDbModel {
    id: number;
    userId: number;
    name: {
        en: string;
        ro: string;
    };
    dueDate: Date;
}