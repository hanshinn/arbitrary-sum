import { formatNumber } from "../utils/utils.js";

//#region function carry
function carry(list, index, curIndex) {
  if (list[index] == null) return;
  if (list.slice(index).every(item => item == 0 || item == '.')) return;
  if (list[index] === '.') {
    return carry(list, index + 1);
  }
  if (index !== curIndex && list[index] > 0) {
    return --list[index];
  }
  list[index] = +list[index] + 10 - (index === curIndex ? 0 : 1);
  carry(list, index + 1);
}
//#endregion

//#region function add
export default function add(num1, num2) {
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
  ) return num1 + num2;
  const reg = /^([+-]?)(\d+)(\.(\d*))?$/;
  if (!reg.test(num1) || !reg.test(num2)) {
    return NaN;
  }
  let [ , sign1, int1, , precision1 = '' ] = num1.match(reg);
  let [ , sign2, int2, , precision2 = '' ] = num2.match(reg);
  const precision = Math.max(precision1.length, precision2.length);
  num1 = `${int1}${precision ? '.' : ''}${precision1.padEnd(precision, '0')}`;
  num2 = `${int2}${precision ? '.' : ''}${precision2.padEnd(precision, '0')}`;
  sign1 = sign1 === '-' ? -1 : 1;
  sign2 = sign2 === '-' ? -1 : 1;
  let resultSign = 1, change;
  if (sign1 == sign2 || int1.length > int2.length) {
    change = false;
  } else if (int1.length < int2.length) {
    change = true;
  } else {
    let i = 0;
    while (i < num1.length) {
      if (num1[i] != num2[i]) {
        change = num1[i] < num2[i];
        break;
      }
      i++;
    }
  }
  if (change) {
    [num1, num2] = [num2, num1];
    resultSign = -1;
  }
  const num1List = num1.split('').reverse();
  const num2List = num2.split('').reverse();
  const length = Math.max(num1List.length, num2List.length);
  let sumList = [], sign = 1, nextNum = 0, sum = 0;
  for (let i = 0; i < length; i++) {
    if (num1List[i] === '.') {
      sumList[i] = '.';
      continue;
    }
    if (sign1 != sign2 && num1List[i] != null && num2List[i] != null) {
      if (num1List[i] < num2List[i]) {
        carry(num1List, i, i);
      }
    }
    sum = sign1 * (+num1List[i] || 0) + sign2 * (+num2List[i] || 0) + nextNum;
    sign = sum == 0 ? sign : sum < 0 ? -1 : 1;
    nextNum = parseInt(sum / 10);
    sumList[i] = Math.abs(sum % 10);
  }
  if (nextNum != 0) {
    sumList[length] = Math.abs(nextNum);
  }
  const numStr = `${(resultSign ^ sign) >= 0 ? '' : '-'}${sumList.reverse().join("")}`;
  let [ , _sign = '', _int = '', , _precision = '' ] = numStr.match(reg);
  _int = _int.replace(/^0+/, '') || '0';
  _precision = _precision.replace(/0+$/, '');
  return `${_sign}${_int}${_precision ? '.' : ''}${_precision}`;
}
//#endregion