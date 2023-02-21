// 驗證手機號碼
export function isPhone(value) {
 const startRule = /^[0]*[9]/; // 驗證開頭是否為09
 const lengthRule = /\d{10}$/;  // 驗證是否為數字，以及是否有10個字元
 return startRule.test(value) ? lengthRule.test(value) ? true : '手機號碼為數字，共10碼' : '手機號碼開頭為09';
};

