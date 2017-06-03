export class CurrencyRate {
  private _exchangedate: string;
  private _rate: number;
  private _cc: string;
  private _currencyName: string;

  get exchangedate(): string {
    return this._exchangedate;
  }

  setExchangedate(value: string) {
    this._exchangedate = value;
    return this;
  }

  get rate(): number {
    return this._rate;
  }

  setRate(value: number) {
    this._rate = value;
    return this;
  }

  get cc(): string {
    return this._cc;
  }

  setCc(value: string) {
    this._cc = value;
    return this;
  }

  get currencyName(): string {
    return this._currencyName;
  }

  setCurrencyName(value: string) {
    this._currencyName = value;
    return this;
  }
}
