export class Weather {
  private _date: string;
  private _summary: string;
  private _icon: string;
  private _precipProbability: string;
  private _temperatureMin: number;
  private _temperatureMax: number;
  private _windSpeed: number;


  get date(): string {
    return this._date;
  }

  setDate(value: string): Weather {
    this._date = value;
    return this;
  }

  get summary(): string {
    return this._summary;
  }

  setSummary(value: string) {
    this._summary = value;
    return this;
  }

  get icon(): string {
    return this._icon;
  }

  setIcon(value: string) {
    this._icon = value;
    return this;
  }

  get precipProbability(): string {
    return this._precipProbability;
  }

  setPrecipProbability(value: string) {
    this._precipProbability = value;
    return this;
  }

  get temperatureMin(): number {
    return this._temperatureMin;
  }

  setTemperatureMin(value: number) {
    this._temperatureMin = value
    return this;
  }

  get temperatureMax(): number {
    return this._temperatureMax;
  }

  setTemperatureMax(value: number) {
    this._temperatureMax = value;
    return this;
  }

  get windSpeed(): number {
    return this._windSpeed;
  }

  setWindSpeed(value: number) {
    this._windSpeed = value;
    return this;
  }
}
