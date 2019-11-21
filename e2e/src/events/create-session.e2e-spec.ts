import {
  browser,
  by,
  element,
  $,
  $$,
  ExpectedConditions as EC
} from 'protractor';

// • 測試案例
//   – 點擊 建立議程
//   – 輸入議程名稱 Protractor 表單練習
//   – 輸入主講人 John
//   – 選擇演講時間 一小時
//   – 選擇場次 上午場；選擇適合程度 初級、中級
//   – 輸入演講內容 自動化 Protractor 表單
//   – 點擊儲存按鈕，驗證議程列表顯示 Protractor 表單練習

describe('add a new session', () => {
  beforeAll(async () => {
    await await browser.get('/events/4');
  });

  it('should 驗證議程列表顯示 Protractor 表單練習', async () => {
    await element(by.linkText('建立議程')).click();

    await $('#sessionName').sendKeys('Protractor 表單練習');
    await $('#presenter').sendKeys('John');

    //#region 選擇演講時間 一小時
    {
      const durationList = $('select[name=duration]');

      await durationList
        .element(by.cssContainingText('option', '一小時'))
        .click();

      expect(await durationList.getAttribute('value')).toBe('2');
    }
    //#endregion

    //#region 選擇場次 上午場
    {
      const radMorning = $('input[type=radio][name=period][value=上午場]');

      await radMorning.click();

      expect(await radMorning.getAttribute('checked')).toBeTruthy();
    }
    //#endregion

    //#region 選擇適合程度 初級、中級
    {
      const chk1 = $('input[type=checkbox][name=level][value=初級]');
      const chk2 = $('input[type=checkbox][name=level][value=中級]');

      await chk1.click();
      await chk2.click();

      expect(await chk1.getAttribute('checked')).toBeTruthy();
      expect(await chk2.getAttribute('checked')).toBeTruthy();
    }
    //#endregion

    await $('#abstract').sendKeys('自動化 Protractor 表單');

    await element(by.buttonText('儲存')).click();

    expect(await $('collapsible-well h4').getText()).toBe('Protractor 表單練習');
  });
});
