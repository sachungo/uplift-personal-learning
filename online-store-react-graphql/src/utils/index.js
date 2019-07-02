export const calculatePrice = items => {
  return items
    .reduce((total, item) => total += (item.quantity * item.price), 0)
    .toFixed(2);
}

const CART_KEY = 'cart';
export const setCart = (value, cartKey = CART_KEY) => {
  if (localStorage) {
    localStorage.setItem(cartKey, JSON.stringify(value));
  }
}

export const getCart = (cartKey = CART_KEY) => {
  if (!localStorage) return [];

  return JSON.parse(localStorage.getItem(cartKey)) || [];
}
