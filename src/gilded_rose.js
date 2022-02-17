const { Item, updateItems } = require("./item");
const { ITEM_TYPES } = require("./constants");

var items = [];

items.push(new Item("+5 Dexterity Vest", 10, 20));
items.push(new Item("Aged Brie", 2, 0));
items.push(new Item("Elixir of the Mongoose", 5, 7));
items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
items.push(new Item("Conjured Mana Cake", 3, 6));

function update_quality(items = items) {
  return items.map((item) => {
    let newItem;
    const updateItemsfn = updateItems(item.sell_in, item.quality);

    if (item.name.includes(ITEM_TYPES.BRIE)) {
      newItem = updateItemsfn.agedBrie();
    }

    if (item.name.includes(ITEM_TYPES.BACKSTAGE)) {
      newItem = updateItemsfn.backstage();
    }

    if (item.name.includes(ITEM_TYPES.SULFURAS)) {
      newItem = updateItemsfn.sulfuras();
    }

    if (item.name.includes(ITEM_TYPES.CONJURED)) {
      newItem = updateItemsfn.conjured();
    }

    if (!newItem) {
      newItem = updateItemsfn.random();
    }

    item.sell_in = newItem.sellIn;
    item.quality = newItem.quality;
    return item;
  });
}

module.exports = {
  update_quality,
};
