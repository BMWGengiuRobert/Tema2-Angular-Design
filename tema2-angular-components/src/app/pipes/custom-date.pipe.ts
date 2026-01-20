import { Pipe } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
    name: 'customDatePipe',
    pure: false
})
export class CustomDatePipe {

    constructor(private translate: TranslateService) {}

    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    days_RO = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    months_RO = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];

    transform(value: Date | string): string {
        const date = new Date(value);

        let transformedDate: string;

        if(this.translate.getCurrentLang() === 'ro') {
            transformedDate =  `${date.getDate()} ${this.months_RO[date.getMonth()]} , ${this.days_RO[date.getDay()].slice(0, 3)}`;
        }else{
            transformedDate = `${this.months[date.getMonth()]} ${date.getDate()}, ${this.days[date.getDay()].slice(0, 3)}`;
        }

        return transformedDate;
    }
}