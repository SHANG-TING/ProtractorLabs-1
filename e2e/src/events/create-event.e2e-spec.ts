import * as path from 'path';
import {
  browser,
  by,
  element,
  $,
  $$,
  ExpectedConditions as EC
} from 'protractor';

// • 測試案例
//   – 輸入活動名稱 Protractor 實戰
//   – 使用 Datepicker 選擇活動日期 2019/11/16
//     • 請勿使用 sendKeys 測試
//     • 進階練習：請嘗試設定 1997/12/31 這個日期！
//   – 輸入活動時間 早上；輸入活動票價 500
//   – 輸入活動地址 中正路100號；城市 台北市；國家 台灣
//   – 輸入活動網址 http://example.com
//   – 上傳活動圖片 e2e\src\assets\Protractor.png
//   – 點擊儲存按鈕，驗證活動列表顯示 Protractor 實戰 活動

describe('add a new event', () => {
  beforeAll(async () => {
    await browser.get('/events/new');
  });

  it('should 驗證活動列表顯示 Protractor 實戰 活動', async () => {
    await $('#name').sendKeys('Protractor 實戰');

    //#region 設定 1997/12/31 這個日期
    {
      await $('mat-datepicker-toggle .mat-icon-button').click();

      await $('.mat-calendar-period-button').click();

      await $('.mat-calendar-previous-button').click();

      await element(
        by.cssContainingText('.mat-calendar-body-cell-content', '1997')
      ).click();

      await element(
        by.cssContainingText('.mat-calendar-body-cell', 'DEC')
      ).click();

      await element(
        by.cssContainingText('.mat-calendar-body-cell-content', '31')
      ).click();

      expect(await $('#eventDate').getAttribute('value')).toBe('12/31/1997');
    }
    //#endregion

    await $('#eventTime').sendKeys('早上');
    await $('#eventPrice').sendKeys('500');
    await $('#address').sendKeys('中正路100號');
    await $('#city').sendKeys('台北市');
    await $('#country').sendKeys('台灣');
    await $('#onlineUrl').sendKeys('http://example.com');
    await $('#imageFile').sendKeys(
      path.resolve('./e2e/src/assets/Protractor.png')
    );

    await element(by.buttonText('儲存')).click();

    expect(await browser.getCurrentUrl()).toContain('/events');

    expect(
      element(
        by.cssContainingText(
          'event-thumbnail h2',
          'Protractor 實戰'.toUpperCase()
        )
      )
    ).toBeDefined();
  });
});
