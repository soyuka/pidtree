'use strict';

function pify(fn, arg1, arg2) {
  return new Promise(function(resolve, reject) {
    fn(arg1, arg2, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

var pidtree = require('./lib/pidtree');

/**
 * Get the list of children pids of the given pid.
 * @public
 * @param  {Number|String} pid A pid. If -1 will return all the pids.
 * @param  {Object} [options] Optional options object.
 * @param  {Boolean} [options.root=false] Include the provided pid in the list.
 * Ignored if -1 is passed as pid.
 * @param  {Function} [callback=undefined] Called when the list is ready. If not
 * provided a promise is returned instead.
 * @returns  {Promise.<Object[]>} Only when the callback is not provided.
 */
function list(pid, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  if (typeof callback === 'function') {
    pidtree(pid, options, callback);
    return;
  }
  return pify(pidtree, pid, options);
}

module.exports = list;
