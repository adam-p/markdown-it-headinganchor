/*! markdown-it-headinganchor 1.0.0 https://github.com//adam-p/markdown-it-headinganchor @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownitHeadingAnchor = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * Copyright Adam Pritchard 2015
 * MIT License : http://adampritchard.mit-license.org/
 */

'use strict';
/*jshint node:true*/


function addHeadingAnchors(state) {
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
      '<a name="' + encodeURIComponent(headingInlineToken.content) + '" class="markdown-it-headinganchor" href="#"></a>';

    headingInlineToken.children.unshift(anchorToken);

    // Advance past the inline and heading_close tokens.
    i += 2;
  }
}

module.exports = function headinganchor_plugin(md) {
  md.core.ruler.push('heading_anchors', addHeadingAnchors);
};

},{}]},{},[1])(1)
});