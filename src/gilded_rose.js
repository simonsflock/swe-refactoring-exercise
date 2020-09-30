class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

const calculateQualityDifferenceNormalItem = item => {
  switch (true) {
    case item.quality > MIN_QUALITY && item.sellIn < 0:
      return -2;
    case item.quality > MIN_QUALITY:
      return -1;
    default:
      return 0;
  }
};

const calculateQualityDifferenceBackstagePasses = item => {
  switch (true) {
    case item.sellIn < 0:
      return -item.quality;
    case item.sellIn <= 5:
      return 3;
    case item.sellIn <= 10:
      return 2;
    default:
      return 1;
  }
};

const calculateSellinDifference = item => {
  switch (item.name) {
    case "Sulfuras, Hand of Ragnaros":
      return 0;
    default:
      return -1;
  }
};

const calculateQualityDifference = item => {
  switch (item.name) {
    case "Sulfuras, Hand of Ragnaros":
      return 0;
    case "Aged Brie":
      return (item.quality < MAX_QUALITY) ? 1 : 0;
    case "Backstage passes to a TAFKAL80ETC concert":
      return calculateQualityDifferenceBackstagePasses(item);
    default:
      return calculateQualityDifferenceNormalItem(item);
  }
};

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      item.sellIn += calculateSellinDifference(item);
      item.quality += calculateQualityDifference(item);
    });
    return this.items;
  }
}

//test

module.exports = {
  Item,
  Shop
}
