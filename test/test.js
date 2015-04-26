/*
 * Copyright Adam Pritchard 2015
 * MIT License : http://adampritchard.mit-license.org/
 */

'use strict';
/*jshint node:true*/
/* global describe, it, before, beforeEach, after, afterEach */
/*eslint-env mocha*/

var path = require('path');

var markdownit  = require('markdown-it');
var generate    = require('markdown-it-testgen');

var headinganchor = require('..');

describe('markdown-it-headinganchor', function () {
  var md = markdownit().use(headinganchor);
  generate(path.join(__dirname, 'fixtures'), { header: true }, md);
});