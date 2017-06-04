import {Component, OnInit} from '@angular/core';
import {HeroService} from './hero.service';
import {Weather} from "./weather";
import {CurrencyRate} from "./currency-rate";
import {CurrencyRateGeneral} from "./currency-rate-general";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.getData();
  }

  currencyName: string = 'usd';
  weatherCurrent: string;
  weatherData: Weather[];
  currencyRateData: CurrencyRate[];
  currencyRateDataGeneral: CurrencyRateGeneral[];


  constructor(private heroService: HeroService) {
  }

  getData(): void {
    this.heroService.getCurrencyRate().then(data => this.showCurrencyRate(data));
    this.heroService.getWeather().then(data => this.showWeather(data));
    this.heroService.getCurrencyRateGeneral('UAH').then(data => this.showCurrencyRateUAH(data))
  }

  showCurrencyRateUAH(data: any): void{
    this.currencyRateDataGeneral = data.map(function(item){
      return new CurrencyRateGeneral()
        .setTitle(item.title)
        .setCurrencyName(item.currency)
        .setBuy(item.buy)
        .setSell(item.sell);
    });
  }

  switchCurrency(currencyName: string): void {
    this.currencyName = currencyName;
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

  showWeather(data: any): void {
    let currentWeather = data.currently;
    let daily = data.daily.data;
    let self = this;
    this.weatherData = daily.map(function (item) {
      let date = self.timeConverter(item.time);
      return new Weather()
        .setDate(date)
        .setIcon(item.icon)
        .setSummary(item.summary)
        .setPrecipProbability(item.precipProbability)
        .setTemperatureMin(item.temperatureMin)
        .setTemperatureMax(item.temperatureMax)
        .setWindSpeed(item.windSpeed);
    });

    this.weatherCurrent = JSON.stringify(currentWeather);
  }

  timeConverter(UNIX_timestamp: number): string {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    return date + '.' + month + '.' + year;
  }

}
