import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
    providedIn: 'root',
})
export class CountriesService {
    private getAllCountriesCodesUrl: string = 'https://countriesnow.space/api/v0.1/countries/codes';
    private getAllCititesOfAllCountriesUrl: string = 'https://countriesnow.space/api/v0.1/countries';

    constructor(private http: HttpClient) { }

    getCountriesAndTheirCodes() {
        return this.http.get(this.getAllCountriesCodesUrl).pipe(
            map((res: any) => res.data)
        );

    }

    getCountriesAndAllTheirCities() {

        return this.http.get(this.getAllCititesOfAllCountriesUrl).pipe(
            map((res: any) => res.data)
        );
    }

}
