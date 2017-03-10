/**
 * 断言函数，阻断执行
 * @param 判断条件
 * @param 错误提示
 */
export function assert(condition,msg){
    if(!condition) throw new Error(`${msg}`);
};

export function normalizeMap(map) {
    return Array.isArray(map)?map.map(key=>{key,val:key}):Object.keys(map).map(key=>{key,val:key});
};

function find (list, f) {
    return list.filter(f)[0]
}

export function deepCopy (obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
        return hit.copy
    }
    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    })

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache)
    })

    return copy
}


//测试一个字符由两个字节还是由四个字节
function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}

/**
 * 单个字符unicode编码
 * @param String 单个字符
 * @returns {Array}
 */
function dec4(s){
    let res = [];
    if(is32Bit(s)){ //四个字节处理
        res[0]=s.codePointAt(0).toString(16);
        res[1]=s.codePointAt(1).toString(16);
    }else{
        return [s.codePointAt(0).toString(16)];
    }
    return res;
}

/**
 * unicode编码
 * @param {string} 字符串
 * @returns {string}
 */
export function decToHex(s) {
    let res=[];
    for(let i=0;i < s.length;i++){
        res.push(...dec4(s[i])); //'𠮷a'
    }
    return '\\u'+res.join('\\u');
}

/**
 * unicode编码转GBK
 * @param {string} unicode字符串//"\u5403\u4ee3\u7801\u7684\u5154\u5b50\u7a9d" 吃代码的兔子窝
 */
export function hexToDec(s) {
    return window.decodeURIComponent(s);
}

/**
 * 数组去重复
 * @param array
 * @returns {Array}
 */
export  function uniqueArray(array) {
  return  Array.from(new Set(array))
}

export utils;