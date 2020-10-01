var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose shop tests", function() {

  it("When sell by date has passed quality should degrade twice as fast", () => {
    const storeItems = [new Item("normal store item", -1, 10)];
    const expectedUpdatedItems = [new Item("normal store item", -2, 8)];
    const shop = new Shop(storeItems);
    expect(shop.updateQuality()).toEqual(expectedUpdatedItems);
  });

  it("The quality of an item can not be below 0", () => {
    const storeItems = [new Item("normal store item", 33, 0)];
    const expectedUpdatedItems = [new Item("normal store item", 32, 0)];
    const shop = new Shop(storeItems);
    expect(shop.updateQuality()).toEqual(expectedUpdatedItems);
  });

  it("Aged Brie should increase quality by 1 when a day passes", () => {
    const storeItems = [new Item("Aged Brie", 33, 0)];
    const expectedUpdatedItems = [new Item("Aged Brie", 32, 1)];
    const shop = new Shop(storeItems);
    expect(shop.updateQuality()).toEqual(expectedUpdatedItems);
  });

  it("Items can not have a quality more than 50", () => {
    const storeItems = [new Item("normal store item", 33, 70)];
    const expectedStoredItems = [new Item("normal store item", 33, 50)];
    const shop = new Shop(storeItems);
    expect(shop.items).toEqual(expectedStoredItems);
  });

  it("Aged Brie should not increase quality to over 50", () => {
    const storeItems = [new Item("Aged Brie", 33, 50)];
    const expectedUpdatedItems = [new Item("Aged Brie", 32, 50)];
    const shop = new Shop(storeItems);
    expect(shop.updateQuality()).toEqual(expectedUpdatedItems);
  });

  it("Sulfuras being a legendary item, never has to be sold or decreases in Quality", () => {
    const storeItems = [new Item("Sulfuras, Hand of Ragnaros", 33, 40)];
    const expectedUpdatedItems = [new Item("Sulfuras, Hand of Ragnaros", 33, 40)];
    const shop = new Shop(storeItems);
    expect(shop.updateQuality()).toEqual(expectedUpdatedItems);
  });

  it("Increase quality by 1 when sellin", () => {
    const storeItems = [new Item("Backstage passes to a TAFKAL80ETC concert", 33, 40)];
    const expectedUpdatedItems = [new Item("Backstage passes to a TAFKAL80ETC concert", 32, 41)];
    const shop = new Shop(storeItems);
    expect(shop.updateQuality()).toEqual(expectedUpdatedItems);
  });

  it("Quality increases by 2 when there are 10 days or less", () => {
    const storeItems = [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 5)];
    const expectedUpdatedItems = [new Item("Backstage passes to a TAFKAL80ETC concert", 9, 7)];
    const shop = new Shop(storeItems);
    expect(shop.updateQuality()).toEqual(expectedUpdatedItems);
  });

  it("Quality increases by 2 when there are 10 days or less", () => {
    const storeItems = [new Item("Backstage passes to a TAFKAL80ETC concert", 7, 5)];
    const expectedUpdatedItems = [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 7)];
    const shop = new Shop(storeItems);
    expect(shop.updateQuality()).toEqual(expectedUpdatedItems);
  });

  it("Quality increases by 3 when there are 5 days or less", () => {
    const storeItems = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)];
    const expectedUpdatedItems = [new Item("Backstage passes to a TAFKAL80ETC concert", 4, 23)];
    const shop = new Shop(storeItems);
    expect(shop.updateQuality()).toEqual(expectedUpdatedItems);
  });

  it("Quality increases by 3 when there are 5 days or less", () => {
    const storeItems = [new Item("Backstage passes to a TAFKAL80ETC concert", 3, 20)];
    const expectedUpdatedItems = [new Item("Backstage passes to a TAFKAL80ETC concert", 2, 23)];
    const shop = new Shop(storeItems);
    expect(shop.updateQuality()).toEqual(expectedUpdatedItems);
  });

  it("Quality drops to 0 after concert", () => {
    const storeItems = [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)];
    const expectedUpdatedItems = [new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0)];
    const shop = new Shop(storeItems);
    expect(shop.updateQuality()).toEqual(expectedUpdatedItems);
  });



});

describe("Gilded Rose item class tests", function() {

  it("Sellin for Sulfuras, Hand of Ragnaros should always stay the same", () => {
    const item = new Item("Sulfuras, Hand of Ragnaros", 20, 20);
    item.updateSellIn()
    const expectedItem = new Item("Sulfuras, Hand of Ragnaros", 20, 20);
    expect(item).toEqual(expectedItem);
  });

  it("Sellin for normal items should decrease by 1 ", () => {
    const item = new Item("normal item", 20, 20);
    item.updateSellIn()
    const expectedItem = new Item("normal item", 19, 20);
    expect(item).toEqual(expectedItem);
  });

});