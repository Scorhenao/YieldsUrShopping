import {ShoppingItem} from './ShoppingItem';

export interface ShoppingList {
  id: string;
  name: string;
  purpose: string;
  items: ShoppingItem[];
}
