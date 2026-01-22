import { Pipe } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
    name: 'taskDueDatePipe',
    pure: false
})
export class TaskDueDatePipe {

    constructor(private translate: TranslateService) { }

    transform(value: Date): string {
        const date: Date = new Date(value);
        date.setHours(0, 0, 0, 0);

        const today: Date = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow: Date = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        if (date.getTime() === today.getTime()) {
            if (this.translate.getCurrentLang() === 'ro') {
                return 'Astăzi';
            } else {
                return 'Today';
            }
        } else if (date.getTime() === tomorrow.getTime()) {
            if (this.translate.getCurrentLang() === 'ro') {
                return 'Mâine';
            } else {
                return 'Tomorrow';
            }
        } else if (date < today) {
            const noOfOverdueDays: number = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

            if (noOfOverdueDays === 1) {
                if (this.translate.getCurrentLang() === 'ro') {
                    return 'Ieri';
                } else {
                    return 'Yesterday';
                }
            } else {
                if (this.translate.getCurrentLang() === 'ro') {
                    return `${noOfOverdueDays} zile întârziere`;
                } else {
                    return `${noOfOverdueDays} days overdue`;
                }
            }
        } else if (date > tomorrow) {
            const noOfRemainingDays: number = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

            if (this.translate.getCurrentLang() === 'ro') {
                return `${noOfRemainingDays} zile rămase`;
            } else {
                return `${noOfRemainingDays} days left`;
            }
        }

        return this.translate.getCurrentLang() === 'ro' ? 'Fără dată limită' : 'No due date';
    }
}