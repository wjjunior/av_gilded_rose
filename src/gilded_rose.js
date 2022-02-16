const { Item } = require('./item')
const { QUALITY_TAX } = require('./constants')

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function update_quality(items) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].name != 'Aged Brie' && !(items[i].name).includes('Backstage')) {
      if (items[i].quality > 0) {
        if (!(items[i].name).includes('Sulfuras')) {
          items[i].quality = items[i].quality - QUALITY_TAX
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + QUALITY_TAX
        if ((items[i].name).includes('Backstage')) {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + QUALITY_TAX
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + QUALITY_TAX
            }
          }
          if(items[i].sell_in < 1) {
            items[i].quality = 0
          }
        }
      }
    }
    if (!(items[i].name).includes('Sulfuras')) {
      items[i].sell_in = items[i].sell_in - 1;
      if((items[i].name).includes('Backstage') && items[i].sell_in < 0) {
        items[i].quality = 0
      }
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != 'Aged Brie') {
        if (!(items[i].name).includes('Backstage')) {
          if (items[i].quality > 0) {
            if (!(items[i].name).includes('Sulfuras')) {
              items[i].quality = items[i].quality - QUALITY_TAX
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + QUALITY_TAX
        }
      }
    }
  }
  return items
}

module.exports = {
  update_quality
}
