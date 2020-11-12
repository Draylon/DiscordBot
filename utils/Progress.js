
/**
 * Create a `ProgressBar` with the given `options`
 *
 * Options:
 *
 *   - `curr` current completed index
 *   - `total` total number of ticks to complete
 *   - `width` the displayed width of the progress bar defaulting to total
 *   - `head` head character defaulting to complete character
 *   - `complete` completion character defaulting to "="
 *   - `incomplete` incomplete character defaulting to "-"
 *   - `callback` optional function to call when the progress bar completes
 *   - `callback_params` optional parameters to callback function
 *
 *
 * @function ProgressBar
 * @param {object|number} options the options for the progress bar
 * @returns {Object}
 * @api public
 */
module.exports = (options) =>{
  let curr = options.curr || 0,
  total = options.total;
  let width = options.width || total,
  chars = {
    complete   : options.complete || '=',
    incomplete : options.incomplete || '-',
    head       : options.head || (options.complete || '=')
  },
  callback = options.callback || function () {},
  callback_params = options.callback_params || {};
  lastDraw = '';

  let ratio = curr / total;
  ratio = Math.min(Math.max(ratio, 0), 1);

  let percent = ratio * 100;
  let incomplete, complete, completeLength;


  let width = Math.min(width,50);

  /* TODO: the following assumes the user has one ':bar' token */
  completeLength = Math.round(width * ratio);
  complete = Array(Math.max(0, completeLength + 1)).join(chars.complete);
  incomplete = Array(Math.max(0, width - completeLength + 1)).join(chars.incomplete);

  /* add head to the complete string */
  if (completeLength > 0) {
    complete = complete.slice(0, -1) + chars.head;
  }

  /* fill in the actual progress bar */
  let str = complete + incomplete,
  prcnt = percent.toFixed(0);
  if (lastDraw !== str) {
    lastDraw = str;
  }

  if (curr >= total) callback(callback_params);
  

  return {curr:curr,total:total,width:width,callback:callback,callback_params:callback_params,percent:this.prcnt,bar:lastDraw};
};