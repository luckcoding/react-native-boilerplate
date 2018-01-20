/**
 * add finally prototype to Promise
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Promise.prototype.finally = function (callback) {
  let P = this.constructor
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  )
}