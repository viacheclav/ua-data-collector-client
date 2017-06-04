export class CurrencyRateGeneral {
  private _title: string;
  private _buy: number;
  private _sell: number;
  private _currencyName: string;


  get title(): string {
    return this._title;
  }

  setTitle(value: string): CurrencyRateGeneral {
    this._title = value;
    return this;
  }

  get buy(): number {
    return this._buy;
  }

  setBuy(value: number): CurrencyRateGeneral {
    this._buy = value;
    return this;
  }

  get sell(): number {
    return this._sell;
  }

  setSell(value: number): CurrencyRateGeneral {
    this._sell = value;
    return this;
  }

  get currencyName(): string {
    return this._currencyName;
  }

  setCurrencyName(value: string): CurrencyRateGeneral {
    this._currencyName = value;
    return this;
  }
}
