import {Component, OnInit} from '@angular/core';
import {HeroService} from './hero.service';
import {CurrencyRate} from "./currency-rate";
import {CurrencyRateGeneral} from "./currency-rate-general";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.getData('kyiv');
  }

  weatherDataDefault: any;
  weatherDataDefault2: any;
  currencyName: string = 'usd';
  currencyRateData: CurrencyRate[];
  currencyRateDataGeneral: CurrencyRateGeneral[];
  currencyRateDataGeneralAll: CurrencyRateGeneral[];
  city: string;

  constructor(private heroService: HeroService) {
  }

  getData(city: string): void {
    if (this.city == city) {
      return;
    }
    this.city = city;
    this.heroService.getWeatherDefault(city, 'dvfhgk').then(data => this.showWeatherDefault(data));
    this.heroService.getWeatherDefault(city, 'khggty').then(data => this.weatherDataDefault2 = data);
    this.heroService.getCurrencyRate().then(data => this.showCurrencyRate(data));
    let currency: string = city === 'krakow' ? 'PLN' :'UAH';
    this.heroService.getCurrencyRateGeneral(currency).then(data => this.showCurrencyRateUAH(data))
  }

  showCurrencyRateUAH(data: any): void{
    this.currencyRateDataGeneralAll = data.map(function(item){
      return new CurrencyRateGeneral()
        .setTitle(item.title)
        .setCurrencyName(item.currency)
        .setBuy(item.buy)
        .setSell(item.sell);
    });

    this.updateCurrencyDisplayData();
  }

  updateCurrencyDisplayData() : void {
    let self = this;
    this.currencyRateDataGeneral = this.currencyRateDataGeneralAll.filter(function (el) {
      return el.currencyName == self.currencyName;
    });
  }

  switchCurrency(currencyName: string): void {
    this.currencyName = currencyName;
    this.updateCurrencyDisplayData();
  }

  showCurrencyRate(data: any): void {
    this.currencyRateData = data.filter(function (item) {
      return item.cc === 'USD' || item.cc === 'EUR';
    }).map(function(item){
      return new CurrencyRate()
        .setCc(item.cc)
        .setCurrencyName(item.txt)
        .setExchangedate(item.exchangedate)
        .setRate(item.rate);
    });
  }

  showWeatherDefault(data: any): void {
    this.weatherDataDefault = data;
  }
}
