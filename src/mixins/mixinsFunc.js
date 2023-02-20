// 千分位
export function thousandths(price) {
  let arrayPrice = price.toString().split('');
  if (arrayPrice.length < 4) return `$${price}`;
  if (arrayPrice.length >= 4) {
    arrayPrice.splice(-3, 0, ',');
    return `$${ arrayPrice.join('') }`;
  };
};

// unix code轉換時間
export function convertDate(unix) {
  const date = new Date(unix * 1000);
  return `${date.getFullYear()}/${(date.getMonth() + 1)}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};