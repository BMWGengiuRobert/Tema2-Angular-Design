import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type Theme = 'light' | 'dark';

@Injectable({
    providedIn: 'root',
})
export class ChangeThemeService {
    private currentTheme = new BehaviorSubject<Theme>('light');
    currentTheme$ = this.currentTheme.asObservable();

    constructor() {
        this.setTheme('light');
    }

    setTheme(theme: Theme) {
        this.currentTheme.next(theme);
        document.documentElement.setAttribute('data-theme', theme);
    }

}