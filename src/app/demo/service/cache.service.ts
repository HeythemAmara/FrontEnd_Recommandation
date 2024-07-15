import {Injectable} from '@angular/core';
import {ItemCart} from "../api/cart.model";

@Injectable()
export class CacheService {
  saveFilters(filters: string[]) {
    // Save the filters to the cache
    localStorage.setItem('filters', JSON.stringify(filters));
  }

  saveCart(cart: ItemCart[]) {
    // Save the filters to the cache
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  deleteFilters() {
    // Remove the filters from the cache
    localStorage.removeItem('filters');
  }
  deleteCart() {
    // Remove the filters from the cache
    localStorage.removeItem('cart');
  }

  getFilters(): string[] {
    // Retrieve the filters from the cache
    const filtersJson = localStorage.getItem('filters');
    return filtersJson ? JSON.parse(filtersJson) : [];
  }

  getCart(): ItemCart[] {
    // Retrieve the filters from the cache
    const cartJson = localStorage.getItem('cart');
    return cartJson ? JSON.parse(cartJson) : [];
  }

}
