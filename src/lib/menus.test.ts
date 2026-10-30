import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { menus, randomMenu } from './menus.ts';

test('the list has everyday meals with distinct IDs and usable names', () => {
  assert.ok(menus.length >= 20);
  assert.equal(new Set(menus.map((menu) => menu.id)).size, menus.length);
  for (const menu of menus) {
    assert.ok(menu.nameTh && menu.nameEn && menu.category && menu.keywords.length);
  }
});

test('random selection covers the whole list and allows repeats', () => {
  assert.equal(randomMenu(menus, () => 0), menus[0]);
  assert.equal(randomMenu(menus, () => 0.999999), menus[menus.length - 1]);
  assert.equal(randomMenu(menus, () => 0), randomMenu(menus, () => 0));
});
