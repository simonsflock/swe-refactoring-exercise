class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const calculateQualityDifferenceNormalItem = ({ sellIn, quality }) => {
  const isQualityBiggerThan0 = quality > 0;
  const areNoMoreDaysToSell = sellIn < 0;

  if (isQualityBiggerThan0 && areNoMoreDaysToSell) return -2;
  if (isQualityBiggerThan0) return -1;

  return 0;
};

const calculateQualityDifferenceBackstagePasses = ({ sellIn, quality }) => {
  const tenDaysOrLessToSell = sellIn <= 10;
  const fiveDaysOrLessToSell = sellIn <= 5;
  const areNoMoreDaysToSell = sellIn < 0;

  if (areNoMoreDaysToSell) return -quality;
  if (fiveDaysOrLessToSell) return +3;
  if (tenDaysOrLessToSell) return +2;

  return +1;
};

const calculateSellinDifference = ({ sellIn, name }) => {
  const isSulfuras = name == "Sulfuras, Hand of Ragnaros";
  return !isSulfuras ? -1 : 0;
};

const calculateQualityDifference = item => {
  switch (item.name) {
    case "Sulfuras, Hand of Ragnaros":
      return 0;
    case "Aged Brie":
        return (item.quality < 50) ? 1 : 0;
    case  "Backstage passes to a TAFKAL80ETC concert":
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
    return this.items.map(item => {
      item.sellIn += calculateSellinDifference(item);
      item.quality += calculateQualityDifference(item);

      return item;
    });
  }
}
  

module.exports = {
  Item,
  Shop
}
