const { QUALITY_TAX } = require("./constants");

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

function backstageQuality(sellIn, quality) {
  if (sellIn < 0) return 0;
  if (sellIn <= 5) return quality + 3;
  if (sellIn <= 10) return quality + 2;
  return quality + QUALITY_TAX;
}

function updateItems(sellIn, quality) {
  function agedBrie() {
    --sellIn;
    return {
      sellIn,
      quality: Math.min(50, quality + QUALITY_TAX),
    };
  }
  function backstage() {
    --sellIn;
    quality = backstageQuality(sellIn, quality);

    return {
      sellIn,
      quality: Math.min(50, quality),
    };
  }
  function sulfuras() {
    return {
      sellIn,
      quality,
    };
  }
  function conjured() {
    return {
      sellIn: --sellIn,
      quality: Math.max(0, quality - QUALITY_TAX * 2),
    };
  }
  function random() {
    --sellIn;
    return {
      sellIn,
      quality: Math.max(
        sellIn > 0 ? quality - QUALITY_TAX : quality - QUALITY_TAX * 2,
        0
      ),
    };
  }

  return {
    agedBrie,
    backstage,
    sulfuras,
    conjured,
    random,
  };
}

module.exports = {
  Item,
  updateItems,
};
