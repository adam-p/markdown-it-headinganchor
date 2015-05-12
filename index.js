/*
 * Copyright Adam Pritchard 2015
 * MIT License : http://adampritchard.mit-license.org/
 */

'use strict';
/*jshint node:true*/

function slugify(s, md) {
  // Unicode-friendly
  var spaceRegex = new RegExp(md.utils.lib.ucmicro.Z.source, 'g');
  return encodeURIComponent(s.replace(spaceRegex, ''));
}

function makeRule(md, options) {
  return function addHeadingAnchors(state) {
    // Go to length-2 because we're going to be peeking ahead.
    for (var i = 0; i < state.tokens.length-1; i++) {
      if (state.tokens[i].type !== 'heading_open' ||
          state.tokens[i+1].type !== 'inline') {
        continue;
      }

      var headingOpenToken = state.tokens[i+1];
      var headingInlineToken = state.tokens[i+1];

      if (!headingInlineToken.content) {
        continue;
      }

      var anchorName = options.slugify(headingInlineToken.content, md);

      if (options.addHeadingID) {
        state.tokens[i].attrPush(['id', anchorName]);
      }

      if (options.addHeadingAnchor) {
        var anchorToken = new state.Token('html_inline', '', 0);
        anchorToken.content =
          '<a name="' +
          anchorName +
          '" class="' +
          options.anchorClass +
          '" href="#"></a>';

        headingInlineToken.children.unshift(anchorToken);
      }

      // Advance past the inline and heading_close tokens.
      i += 2;
    }
  };
}

module.exports = function headinganchor_plugin(md, opts) {
  var defaults = {
    anchorClass: 'markdown-it-headinganchor',
    addHeadingID: true,
    addHeadingAnchor: true,
    slugify: slugify
  };
  var options = md.utils.assign(defaults, opts);
  md.core.ruler.push('heading_anchors', makeRule(md, options));
};
