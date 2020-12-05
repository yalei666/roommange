/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-12-09 16:44:22
 * @version $Id$
 */


export  function isEmail(str) {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str.trim());
}