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

  it("should not degrade quality if is zero", () => {
    const newItem = [new Item('test', 3, 0)]
    const updateQualityItems = update_quality(newItem)

    expect(updateQualityItems[0].quality).toEqual(0)
  })

  it("should increase quality if is Aged Brie when gets older", () => {
    const newItem = [new Item('Aged Brie', 3, 3)]
    const updateQualityItems = update_quality(newItem)

    expect(updateQualityItems[0].sell_in).toEqual(2)
    expect(updateQualityItems[0].quality).toEqual(4)
  })

  it("should not increase quality if is fifty", () => {
    const newItem = [new Item('Aged Brie', 3, 50)]
    const updateQualityItems = update_quality(newItem)

    expect(updateQualityItems[0].sell_in).toEqual(2)
    expect(updateQualityItems[0].quality).toEqual(50)
  })

  it("should not sell Sulfuras", () => {
    const newItem = [new Item('Sulfuras', 3, 3)]
    const updateQualityItems = update_quality(newItem)

    expect(updateQualityItems[0].sell_in).toEqual(3)
    expect(updateQualityItems[0].quality).toEqual(3)
  })

  it("should increase Backstage pass quality by 2 when 10 days", () => {
    const newItem = [new Item('Backstage', 10, 3)]
    const updateQualityItems = update_quality(newItem)

    expect(updateQualityItems[0].sell_in).toEqual(9)
    expect(updateQualityItems[0].quality).toEqual(5)
  })

  it("should increase Backstage pass quality by 2 when less 10 days", () => {
    const newItem = [new Item('Backstage', 9, 3)]
    const updateQualityItems = update_quality(newItem)

    expect(updateQualityItems[0].sell_in).toEqual(8)
    expect(updateQualityItems[0].quality).toEqual(5)
  })

  it("should increase Backstage pass quality by 3 when 5 days", () => {
    const newItem = [new Item('Backstage', 5, 3)]
    const updateQualityItems = update_quality(newItem)

    expect(updateQualityItems[0].sell_in).toEqual(4)
    expect(updateQualityItems[0].quality).toEqual(6)
  })

  //should increase Backstage pass quality by 2 when 10 days or less

  //should increase Backstage pass quality by 3 when 5 days or less

  //should drop Backstage pass quality to 0 after the sell_in date

  //should Conjured itens degrees quality twice as normal

});
