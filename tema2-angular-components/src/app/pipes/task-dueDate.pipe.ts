import { Pipe } from "@angular/core";

@Pipe({
    name: 'taskDueDatePipe'
})
export class TaskDueDatePipe {
    transform(value: Date): string {
        const date: Date = new Date(value);
        date.setHours(0, 0, 0, 0);

        const today: Date = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow: Date = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        if (date.getTime() === today.getTime()) {
            return 'Today';
        } else if (date.getTime() === tomorrow.getTime()) {
            return 'Tomorrow';
        } else if (date < today) {
            const noOfOverdueDays: number = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

            if (noOfOverdueDays === 1) {
                return 'Yesterday';
            } else {
                return `${noOfOverdueDays} days overdue`;
            }
        } else if (date > tomorrow) {
            const noOfRemainingDays: number = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

            return `${noOfRemainingDays} days left`;
        }

        return 'No due date';
    }
}