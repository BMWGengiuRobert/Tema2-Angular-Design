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
        const savedTheme = localStorage.getItem('theme') as Theme;
        const existingTheme = document.documentElement.getAttribute('data-theme') as Theme;
        const initialTheme = savedTheme || existingTheme || 'light';
        this.currentTheme.next(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
    }

    setTheme(theme: Theme) {
        this.currentTheme.next(theme);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

}