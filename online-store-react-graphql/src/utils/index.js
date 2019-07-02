export const calculatePrice = items => {
  return items
    .reduce((total, item) => total += (item.quantity * item.price), 0)
    .toFixed(2);
}
