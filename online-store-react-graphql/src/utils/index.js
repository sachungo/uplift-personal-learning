/**
 * Chevkout Utils
 */
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

export const clearCart = (cartKey = CART_KEY) => {
  if (localStorage) {
    localStorage.removeItem(cartKey);
  }
}

/**
 * Auth Utils
 */
const TOKEN_KEY = 'jwt';
export const setToken = (value, tokenKey = TOKEN_KEY) => {
  if (localStorage) {
    localStorage.setItem(tokenKey, JSON.stringify(value));
  }
};

export const getToken = (tokenKey = TOKEN_KEY) => {
  if (!localStorage) return null;

  return JSON.parse(localStorage.getItem(tokenKey)) || null;
}

export const clearToken = (tokenKey = TOKEN_KEY) => {
  if (localStorage) {
    localStorage.removeItem(tokenKey);
  }
}
