/**
 * @description 项目中复用到的工具方法
 */

/* 关于解析路径上的query传参 */
export function initSearchQuery(search) {
  let i_search = search;
  const data = {};
  if (i_search.split("?").length > 1) {
    i_search = i_search.split("?")[1];
    if (search.indexOf("&") > -1) {
      i_search = i_search.split("&");
      i_search.map((item) => {
        const per = item.split("=");
        data[per[0]] = per[1];
        return item;
      });
    } else {
      i_search = i_search.split("=");
      data[i_search[0]] = i_search[1];
    }
    return data;
  }
  return {};
}

/* 关于cookie */
export function getCookie(c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(`${c_name}=`);
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end === -1) c_end = document.cookie.length;
      return document.cookie.substring(c_start, c_end);
    }
  }
  return null;
}

export function setCookie(name, value, seconds) {
  const second = seconds || 0; // seconds有值就直接赋值，没有为0
  let expires = "";
  if (second !== 0) {
    // 设置cookie生存时间
    const date = new Date();
    date.setTime(date.getTime() + second * 1000);
    expires = `; expires=${date.toGMTString()}`;
  }
  document.cookie = `${name}=${value}${expires}; path=/`; // 转码并赋值
}

export function clearCookie(name) {
  setCookie(name, "");
  setCookie("isChecked", false);
}
