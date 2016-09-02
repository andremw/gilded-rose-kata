'use strict';

module.exports = function gildedRose(name, quality, daysRemaining) {
  const newInstance = {
    name,
    quality,
    daysRemaining,
    updateQuality
  };
  return newInstance;

  function updateQuality() {
    if (newInstance.name !== 'Aged Brie' && newInstance.name !== 'Backstage passes to a TAFKAL80ETC concert') {
      if (newInstance.quality > 0) {
        if (newInstance.name !== 'Sulfuras, Hand of Ragnaros') {
          newInstance.quality--;
        }
      }
    } else if (newInstance.quality < 50) {
      newInstance.quality++;

      if (newInstance.name === 'Backstage passes to a TAFKAL80ETC concert') {
        if (newInstance.daysRemaining < 11) {
          if (newInstance.quality < 50) {
            newInstance.quality++;
          }
        }

        if (newInstance.daysRemaining < 6) {
          if (newInstance.quality < 50) {
            newInstance.quality++;
          }
        }
      }
    }

    if (newInstance.name !== 'Sulfuras, Hand of Ragnaros') {
      newInstance.daysRemaining--;
    }

    if (newInstance.daysRemaining < 0) {
      if (newInstance.name !== 'Aged Brie') {
        if (newInstance.name !== 'Backstage passes to a TAFKAL80ETC concert') {
          if (newInstance.quality > 0) {
            if (newInstance.name !== 'Sulfuras, Hand of Ragnaros') {
              newInstance.quality--;
            }
          }
        } else {
          newInstance.quality -= newInstance.quality;
        }
      } else if (newInstance.quality < 50) {
        newInstance.quality++;
      }
    }
  }
};
