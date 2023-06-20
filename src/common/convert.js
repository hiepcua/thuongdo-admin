export function formatCurrency(value) {
  if (value) {
    let number = isNaN(value) ? 0 : value;
    return number.toLocaleString("en-US", { currency: undefined }) + "đ";
  }
}
