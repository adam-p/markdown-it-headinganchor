/*
 * Copyright Adam Pritchard 2015
 * MIT License : http://adampritchard.mit-license.org/
 */

'use strict';
/*jshint node:true*/


function makeRule(options) {
  return function addHeadingAnchors(state) {
    // Go to length-2 because we're going to be peeking ahead.
    for (var i = 0; i < state.tokens.length-2; i++) {
      if (state.tokens[i].type !== 'heading_open' ||
          state.tokens[i+1].type !== 'inline') {
        continue;
      }

      var headingInlineToken = state.tokens[i+1];

      if (!headingInlineToken.content) {
        continue;
      }

      var anchorToken = new state.Token('html_inline', '', 0);
      anchorToken.content =
        '<a name="' +
        encodeURIComponent(headingInlineToken.content) +
        '" class="' +
        options.anchorClass +
        '" href="#"></a>';

      headingInlineToken.children.unshift(anchorToken);

      // Advance past the inline and heading_close tokens.
      i += 2;
    }
  };
}

module.exports = function headinganchor_plugin(md, opts) {
  var defaults = {
    anchorClass: 'markdown-it-headinganchor'
  };
  var options = md.utils.assign(defaults, opts);
  md.core.ruler.push('heading_anchors', makeRule(options));
};
