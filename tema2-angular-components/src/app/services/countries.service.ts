import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
    providedIn: 'root',
})
export class CountriesService {
    private getSingleCountryCodesUrl: string = 'https://countriesnow.space/api/v0.1/countries/codes';
    private getAllCountriesUrl: string = 'https://countriesnow.space/api/v0.1/countries';
    private getCitiesForCountryUrl: string = 'https://countriesnow.space/api/v0.1/countries/cities';

    constructor(private http: HttpClient) { }

    getSingleCountryCodes(countryName: string) {
        return this.http.post(this.getSingleCountryCodesUrl, { country: countryName }).pipe(
            map((res: any) => res.data)
        );

    }

    getAllCountries() {
        return this.http.get(this.getAllCountriesUrl).pipe(
            map((res: any) => res.data)
        );
    }

    getCitiesForCountry(countryName: string) {
        return this.http.post(this.getCitiesForCountryUrl, { country: countryName }).pipe(
            map((res: any) => res.data)
        );
    }

}
