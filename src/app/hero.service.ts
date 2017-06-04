import { Injectable } from '@angular/core';

import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {

  constructor(private http: Http) {}

  getCurrencyRate(): Promise<string> {
    return this.getData('api/currency-rate');
  }

  getCurrencyRateGeneral(currency: string): Promise<string> {
    return this.getData('api/currency-rate-general/' + currency);
  }

  getWeather(): Promise<string> {
    return this.getData('api/weather');
  }

  getWeatherDefault(): Promise<string> {
    return this.getData('api/weather-default');
  }

  private getData(url: string): Promise<string> {
    return this.http.get(url).toPromise().then(response => response.json() as string).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
