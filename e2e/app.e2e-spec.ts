import { UaDataCollectorClientPage } from './app.po';

describe('ua-data-collector-client App', () => {
  let page: UaDataCollectorClientPage;

  beforeEach(() => {
    page = new UaDataCollectorClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
