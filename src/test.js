'use strict';

const test = require('tape');
const tapSpec = require('tap-spec');

const gildedRose = require('./index');

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);

test('Normal item', t => {
  t.test('quality degrades twice as fast when there are no days left to sell', st => {
    const item = gildedRose('Normal', 4, 2);
    item.updateQuality();
    st.equal(item.quality, 3, assertionMessage(item.daysRemaining, 3));

    item.updateQuality();
    st.equal(item.quality, 2, assertionMessage(item.daysRemaining, 2));

    item.updateQuality();
    st.equal(item.quality, 0, assertionMessage(item.daysRemaining, 0));

    st.end();
  });

  t.test('quality is never less than 0', st => {
    const item = gildedRose('Normal', 1, 2);
    item.updateQuality();
    st.equal(item.quality, 0, assertionMessage(item.daysRemaining, 0));

    item.updateQuality();
    st.equal(item.quality, 0, assertionMessage(item.daysRemaining, 0));

    st.end();
  });

  t.end();
});

test('Aged Brie', t => {
  t.test('quality increases in quality the older it gets', st => {
    const item = gildedRose('Aged Brie', 1, 2);
    item.updateQuality();
    st.equal(item.quality, 2, assertionMessage(item.daysRemaining, 2));

    item.updateQuality();
    st.equal(item.quality, 3, assertionMessage(item.daysRemaining, 3));

    st.end();
  });

  t.test('quality is never more than 50', st => {
    const item = gildedRose('Aged Brie', 49, 2);
    item.updateQuality();
    st.equal(item.quality, 50, assertionMessage(item.daysRemaining, 50));

    item.updateQuality();
    st.equal(item.quality, 50, assertionMessage(item.daysRemaining, 50));
    st.end();
  });

  t.end();
});

test('Sulfuras', t => {
  t.test('quality never decreases', st => {
    const item = gildedRose('Sulfuras, Hand of Ragnaros', 2, 2);
    item.updateQuality();
    item.updateQuality();
    item.updateQuality();
    st.equal(item.quality, 2, 'After many days quality is the same');

    st.end();
  });
  t.test('daysRemaining never decreases', st => {
    const item = gildedRose('Sulfuras, Hand of Ragnaros', 2, 2);
    item.updateQuality();
    item.updateQuality();
    item.updateQuality();
    st.equal(item.daysRemaining, 2, 'After many days daysRemaining is the same');

    st.end();
  });

  t.end();
});

test('Backstage passes', t => {
  t.test('quality increases by one when more than 10 days remaining', st => {
    const item = gildedRose('Backstage passes to a TAFKAL80ETC concert', 1, 12);
    item.updateQuality();
    st.equal(item.quality, 2, assertionMessage(item.daysRemaining, 2));

    item.updateQuality();
    st.equal(item.quality, 3, assertionMessage(item.daysRemaining, 3));

    item.updateQuality();
    st.equal(item.quality, 5, assertionMessage(item.daysRemaining, 5));

    item.daysRemaining = 6;

    item.updateQuality();
    st.equal(item.quality, 7, assertionMessage(item.daysRemaining, 7));

    item.updateQuality();
    st.equal(item.quality, 10, assertionMessage(item.daysRemaining, 10));

    item.updateQuality();
    st.equal(item.quality, 13, assertionMessage(item.daysRemaining, 13));

    st.end();
  });
  t.test('quality is never more than 50', st => {
    const item = gildedRose('Backstage passes to a TAFKAL80ETC concert', 49, 12);
    item.updateQuality();
    item.updateQuality();
    st.equal(item.quality, 50, 'Quality limit is 50 far from the selling date');

    item.daysRemaining = 6;
    item.updateQuality();
    st.equal(item.quality, 50, 'Quality limit is 50 a little bit close to the selling date');

    item.updateQuality();
    st.equal(item.quality, 50, 'Quality limit is 50 a really close to the selling date');

    st.end();
  });

  t.end();
});

function assertionMessage(daysRemaining, quality) {
  return `${daysRemaining} days remaining: quality is ${quality}`;
}
