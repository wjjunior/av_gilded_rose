const { Item } = require('../src/item')
const { update_quality } = require('../src/gilded_rose')

describe("Gilded Rose", function() {

  it("should decrease quality every day", function() {
    const newItem = [new Item('test', 4, 6)]
    const updateQualityItems = update_quality(newItem)

    expect(updateQualityItems[0].sell_in).toEqual(3)
    expect(updateQualityItems[0].quality).toEqual(5)
  });

  it("should degrade quality twice if sell_in is less than zero", () => {
    const newItem = [new Item('test', -1, 6)]
    const updateQualityItems = update_quality(newItem)

    expect(updateQualityItems[0].quality).toEqual(4)
    expect(updateQualityItems[0].sell_in).toEqual(-2)
  })

  //should degrade quality twice if sell_in is less than zero

  //should throw if quality is negative

  //should increase quality when Aged Brie gets older

  //should throw if quality is greater than 50

  //shoulf throw if tries to sell Sulfuras

  //should increase Backstage pass quality by 2 when 10 days or less

  //should increase Backstage pass quality by 3 when 5 days or less

  //should drop Backstage pass quality to 0 after the sell_in date

  //should Conjured itens degrees quality twice as normal

});
