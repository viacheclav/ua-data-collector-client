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
    let cityFromStorage = localStorage.getItem('city');
    let showCurrencyStorage = localStorage.getItem('showCurrency');
    let showWeather1Storage = localStorage.getItem('showWeather1');
    let showWeather2Storage = localStorage.getItem('showWeather2');

    this.showCurrency = showCurrencyStorage ? showCurrencyStorage === "true" : true;
    this.showWeather1 = showWeather1Storage ? showWeather1Storage === "true" : true;
    this.showWeather2 = showWeather2Storage ? showWeather2Storage === "true" : true;


    this.getData(cityFromStorage ? cityFromStorage : 'kyiv');
  }

  weatherDataDefault: any;
  weatherDataDefault2: any;
  currencyName: string = 'usd';
  currencyRateData: CurrencyRate[];
  currencyRateDataGeneral: CurrencyRateGeneral[];
  currencyRateDataGeneralAll: CurrencyRateGeneral[];
  city: string;
  showCurrency: boolean = true;
  showWeather1: boolean = true;
  showWeather2: boolean = true;

  constructor(private heroService: HeroService) {
  }

  getData(city: string): void {
    if (this.city == city) {
      return;
    }
    this.city = city;
    localStorage.setItem('city', this.city);
    if (this.showCurrency) {
      let currency: string = this.city === 'krakow' ? 'PLN' :'UAH';
      if (currency === 'UAH'){
        this.heroService.getCurrencyRate().then(data => this.showCurrencyRate(data));
      }
      this.heroService.getCurrencyRateGeneral(currency).then(data => this.showCurrencyRateUAH(data));
    }
    if (this.showWeather1) {
      this.heroService.getWeatherDefault(this.city, 'dvfhgk').then(data => this.weatherDataDefault = data);
    }
    if (this.showWeather2){
      this.heroService.getWeatherDefault(this.city, 'khggty').then(data => this.weatherDataDefault2 = data);
    }
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

  showOrHideCurrency(showCurrency: boolean){
    this.showCurrency = showCurrency;
    localStorage.setItem('showCurrency', ""+showCurrency);
    if (showCurrency){
      let currency: string = this.city === 'krakow' ? 'PLN' :'UAH';
      if (currency === 'UAH'){
        this.heroService.getCurrencyRate().then(data => this.showCurrencyRate(data));
      }
      this.heroService.getCurrencyRateGeneral(currency).then(data => this.showCurrencyRateUAH(data));
    }
  }


  showOrHideWeather1(showWeather1: boolean){
    this.showWeather1 = showWeather1;
    localStorage.setItem('showWeather1', ""+showWeather1);
    if (showWeather1){
      this.heroService.getWeatherDefault(this.city, 'dvfhgk').then(data => this.weatherDataDefault = data);
    }
  }

  showOrHideWeather2(showWeather2: boolean){
    this.showWeather2 = showWeather2;
    localStorage.setItem('showWeather2', ""+showWeather2);
    if (showWeather2){
      this.heroService.getWeatherDefault(this.city, 'khggty').then(data => this.weatherDataDefault2 = data);
    }
  }

}
