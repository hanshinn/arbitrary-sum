//#region function formatNumber
export function formatNumber(num) {
  if (!num) return '0';
  if (num === Infinity || num === -Infinity) return num;
  if (num === "Infinity" || num === "-Infinity") return Infinity;
  num = String(num);
  const match = num.match(/^([+-])?(\d+)(\.(\d+))?[eE]([+-])?(\d+)$/)
  if (match) {
    const [ , numSign = '', int = '', , precision = '', eSgin, eNum ] = match;
    if (eSgin === '-') {
      num = `${numSign}0.${''.padStart(eNum - int.length, '0')}${int}${precision}`;
    } else if (precision.length <= eNum) {
      num = `${numSign}${int}${precision}${''.padEnd(eNum - precision.length, '0')}`;
    } else {
      num = `${numSign}${int}${precision.slice(0, eNum)}.${precision.slice(eNum)}`;
    }
  }
  return num;
}
//#endregion