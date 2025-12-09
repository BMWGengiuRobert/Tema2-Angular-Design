import { Pipe } from "@angular/core";

@Pipe({
    name: 'customDatePipe'
})
export class CustomDatePipe {

    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    transform(value: Date | string): string {
        const date = new Date(value);

        const transformedDate = `${this.days[date.getDay()].slice(0, 3)}, ${this.months[date.getMonth()]} ${date.getDate()}`;

        return transformedDate;
    }
}