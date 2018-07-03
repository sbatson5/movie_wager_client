import { helper } from '@ember/component/helper';

const COMMAS_EVERY_THREE_DIGITS = /(\d)(?=(\d{3})+(?!\d))/g;

export function formatCurrency(params) {
  let [value] = params;
  let floatValue = parseFloat(value);

  return `$${floatValue.toFixed(0).replace(COMMAS_EVERY_THREE_DIGITS, '$1,')}`;
}

export default helper(formatCurrency);
