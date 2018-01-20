/**
 * regx
 */
export default {
  isEmail: value => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value),
  isMobile: value => /^1[3|4|5|7|8]\d{9}$/.test(value)
}
