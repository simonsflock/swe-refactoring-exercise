

class Item {

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = 0;
    this.increaseQuality(quality);
  }

  static get MAX_QUALITY() {
    return 50;
  }

  static get MIN_QUALITY() {
    return 0;
  }

  increaseQuality(increase) {
    switch(true) {
      case (this.quality + increase) >= Item.MAX_QUALITY:
        this.quality = Item.MAX_QUALITY;
        return;
      case (this.quality + increase) <= Item.MIN_QUALITY:
        this.quality = Item.MIN_QUALITY;
        return;
      default:
        this.quality  += increase;
    }    
  }

  updateSellIn () {
    switch (this.name) {
      case "Sulfuras, Hand of Ragnaros":
        break;
      default:
        this.sellIn--;
    }
  }


}

const updateQualityForBackstageItem = item => {

  switch (true) {
    case item.sellIn < 0:
      item.increaseQuality(-item.quality);
      break;
    case item.sellIn <= 5:
      item.increaseQuality(3);
      break;
    case item.sellIn <= 10:
      item.increaseQuality(2);
      break;
    default:
      item.increaseQuality(1);
  }
};

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {

      item.updateSellIn();
      
      switch (item.name) {
        case "Sulfuras, Hand of Ragnaros":
          break;
        case "Aged Brie":
           item.increaseQuality(1);
           break;
        case "Backstage passes to a TAFKAL80ETC concert":
          updateQualityForBackstageItem(item);
          break;
        default:
          (item.sellIn < 0) ? item.increaseQuality(-2) : item.increaseQuality(-1);
      }
    });
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
