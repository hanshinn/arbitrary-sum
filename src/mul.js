import { formatNumber } from "../utils/utils.js";
import add from "./add.js";

export default function mul(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    return NaN;
  }
  num1 = formatNumber(num1);
  num2 = formatNumber(num2);
  if (
    num1 === Infinity ||
    num2 === Infinity ||
    num1 === -Infinity ||
    num2 === -Infinity
  ) return num1 * num2;
  const reg = /^([+-]?)(\d+)(\.(\d*))?$/;
  if (!reg.test(num1) || !reg.test(num2)) {
    return NaN;
  }
  let [ , sign1, int1, , precision1 = '' ] = num1.match(reg);
  let [ , sign2, int2, , precision2 = '' ] = num2.match(reg);
  const resPrecision = add(precision1.length, precision2.length);
  const resSign = sign1 === sign2 ? '' : '-';
  num1 = `${int1 == 0 ? '' : int1}${precision1}`;
  num2 = `${int2 == 0 ? '' : int2}${precision2}`;
  if (int2.length > int1.length) {
    [ num1, num2 ] = [ num2, num1 ];
  }
  const num1List = num1.split('').reverse();
  const num2List = num2.split('').reverse();
  const result = [];
  for (let i = 0; i < num2List.length; i++) {
    const _num2 = num2List[i];
    let carry = 0, curList = new Array(i).fill(0);
    for (let j = 0; j < num1List.length; j++) {
      const _num1 = num1List[j];
      const cur = add(_num2 * _num1, carry);
      carry = parseInt(cur / 10);
      curList.unshift(cur % 10);
    }
    if (carry != 0) {
      curList.unshift(carry);
    }
    result.push(curList.join(''));
    curList = [];
  }
  const res = result.reduce((cur, pre) => add(cur, pre), 0);
  if (resPrecision == 0) {
    return `${resSign}${res}`;
  }
  if (res == 0) return '0';
  if (res.length <= resPrecision) {
    return `${resSign}0.${res.padStart(resPrecision, '0').replace(/0+$/, '')}`;
  }
  const precision = res.slice(-resPrecision).replace(/0+$/, '');
  if (precision) {
    return `${resSign}${res.slice(0, res.length - resPrecision)}.${precision}`;
  }
  return `${resSign}${res.slice(0, res.length - resPrecision)}`;
}