const { Item } = require('../src/item')
const { update_quality } = require('../src/gilded_rose')
const { ITEM_TYPES } = require("../src/constants");

const makeSut = (sell_in, quality, name = 'test') => {
  const newItem = [new Item(name, sell_in, quality)]
  const updateQualityItems = update_quality(newItem)

  return updateQualityItems.shift()
}

describe("Gilded Rose", function() {

  it("should decrease quality every day", () => {
    const { sell_in, quality} = makeSut(4, 6)

    expect(sell_in).toEqual(3)
    expect(quality).toEqual(5)
  });

  it("should degrade quality twice if sell_in is less than zero", () => {
    const { sell_in, quality} = makeSut(-1, 6)

    expect(sell_in).toEqual(-2)
    expect(quality).toEqual(4)
  })

  it("should not degrade quality if is zero", () => {
    const { quality} = makeSut(3, 0)

    expect(quality).toEqual(0)
  })

  it("should increase quality if is Aged Brie when gets older", () => {
    const { sell_in, quality} = makeSut(3, 3, ITEM_TYPES.BRIE)

    expect(sell_in).toEqual(2)
    expect(quality).toEqual(4)
  })

  it("should not increase quality if is fifty", () => {
    const { sell_in, quality} = makeSut(3, 50, ITEM_TYPES.BRIE)

    expect(sell_in).toEqual(2)
    expect(quality).toEqual(50)
  })

  it("should not sell Sulfuras", () => {
    const { sell_in, quality} = makeSut(3, 3, ITEM_TYPES.SULFURAS)

    expect(sell_in).toEqual(3)
    expect(quality).toEqual(3)
  })

  it("should increase Backstage pass quality by 2 when 10 days", () => {
    const { sell_in, quality} = makeSut(10, 3, ITEM_TYPES.BACKSTAGE)

    expect(sell_in).toEqual(9)
    expect(quality).toEqual(5)
  })

  it("should increase Backstage pass quality by 2 when less 10 days", () => {
    const { sell_in, quality} = makeSut(9, 3, ITEM_TYPES.BACKSTAGE)

    expect(sell_in).toEqual(8)
    expect(quality).toEqual(5)
  })

  it("should increase Backstage pass quality by 3 when 5 days", () => {
    const { sell_in, quality} = makeSut(5, 3, ITEM_TYPES.BACKSTAGE)

    expect(sell_in).toEqual(4)
    expect(quality).toEqual(6)
  })

  it("should increase Backstage pass quality by 3 when lesse than 5 days", () => {
    const { sell_in, quality} = makeSut(4, 3, ITEM_TYPES.BACKSTAGE)

    expect(sell_in).toEqual(3)
    expect(quality).toEqual(6)
  })

  it("should drop Backstage pass quality to 0 if sell_in is less than 0", () => {
    const { sell_in, quality} = makeSut(0, 5, ITEM_TYPES.BACKSTAGE)

    expect(sell_in).toEqual(-1)
    expect(quality).toEqual(0)
  })

  it("should decrease Conjured quality twice", () => {
    const { sell_in, quality} = makeSut(5, 5, ITEM_TYPES.CONJURED)

    expect(sell_in).toEqual(4)
    expect(quality).toEqual(3)
  })

});
