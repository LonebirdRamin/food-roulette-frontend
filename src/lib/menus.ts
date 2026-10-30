export type Menu = {
  id: string;
  nameTh: string;
  nameEn: string;
  category: string;
  keywords: string[];
};

const dishes = [
  ['pad-kra-pao', 'ข้าวผัดกะเพรา', 'Pad Kra Pao', 'rice'],
  ['khao-man-gai', 'ข้าวมันไก่', 'Chicken Rice', 'rice'],
  ['pad-thai', 'ผัดไทย', 'Pad Thai', 'noodles'],
  ['fried-rice', 'ข้าวผัด', 'Fried Rice', 'rice'],
  ['boat-noodles', 'ก๋วยเตี๋ยวเรือ', 'Boat Noodles', 'noodles'],
  ['tom-yum-noodles', 'ก๋วยเตี๋ยวต้มยำ', 'Tom Yum Noodles', 'noodles'],
  ['som-tam', 'ส้มตำ', 'Papaya Salad', 'salad'],
  ['pad-see-ew', 'ผัดซีอิ๊ว', 'Pad See Ew', 'noodles'],
  ['rad-na', 'ราดหน้า', 'Noodles in Gravy', 'noodles'],
  ['green-curry', 'แกงเขียวหวาน', 'Green Curry', 'curry'],
  ['massaman', 'แกงมัสมั่น', 'Massaman Curry', 'curry'],
  ['tom-yum', 'ต้มยำ', 'Tom Yum Soup', 'soup'],
  ['tom-kha-gai', 'ต้มข่าไก่', 'Chicken Coconut Soup', 'soup'],
  ['moo-grob', 'ข้าวหมูกรอบ', 'Crispy Pork Rice', 'rice'],
  ['khao-kha-moo', 'ข้าวขาหมู', 'Braised Pork Leg Rice', 'rice'],
  ['khao-moo-daeng', 'ข้าวหมูแดง', 'Red Pork Rice', 'rice'],
  ['khao-na-ped', 'ข้าวหน้าเป็ด', 'Roast Duck Rice', 'rice'],
  ['khao-kai-jeow', 'ข้าวไข่เจียว', 'Thai Omelette Rice', 'rice'],
  ['gai-tod', 'ข้าวไก่ทอด', 'Fried Chicken Rice', 'rice'],
  ['suki', 'สุกี้', 'Thai Suki', 'noodles'],
  ['larb', 'ลาบ', 'Larb', 'salad'],
  ['pad-prik-gaeng', 'ข้าวผัดพริกแกง', 'Red Curry Stir-fry Rice', 'rice'],
  ['khao-soi', 'ข้าวซอย', 'Khao Soi', 'noodles'],
  ['jok', 'โจ๊ก', 'Rice Porridge', 'rice'],
] as const;

export const menus: Menu[] = dishes.map(([id, nameTh, nameEn, category]) => ({
  id, nameTh, nameEn, category, keywords: [nameTh],
}));

export function randomMenu(items: readonly Menu[], random = Math.random): Menu {
  if (items.length === 0) throw new Error('Cannot choose from an empty menu list');
  return items[Math.floor(random() * items.length)];
}
