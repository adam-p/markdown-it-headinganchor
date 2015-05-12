/*
 * Copyright Adam Pritchard 2015
 * MIT License : http://adampritchard.mit-license.org/
 */

'use strict';
/*jshint node:true*/
/* global describe, it, before, beforeEach, after, afterEach */
/*eslint-env mocha*/

var expect = require('chai').expect;

var path = require('path');

var markdownit  = require('markdown-it');
var generate    = require('markdown-it-testgen');

var headinganchor = require('..');

describe('markdown-it-headinganchor fixtures', function () {
  var md = markdownit().use(headinganchor);
  generate(path.join(__dirname, 'fixtures'), { header: true }, md);
});

describe('markdown-it-headinganchor options', function () {
  it('should render correctly with a custom anchor class', function() {
    var md = markdownit().use(headinganchor, {anchorClass: 'my-class'});
    var s = '# test';
    var target = '<h1 id="test"><a name="test" class="my-class" href="#"></a>test</h1>\n';
    expect(md.render(s)).to.equal(target);
  });

  it('should obey the addHeadingID option', function() {
    var md = markdownit().use(headinganchor, {addHeadingID: true});
    var s = '# test';
    var target = '<h1 id="test"><a name="test" class="markdown-it-headinganchor" href="#"></a>test</h1>\n';
    expect(md.render(s)).to.equal(target);

    md = markdownit().use(headinganchor, {addHeadingID: false});
    s = '# test';
    target = '<h1><a name="test" class="markdown-it-headinganchor" href="#"></a>test</h1>\n';
    expect(md.render(s)).to.equal(target);
  });

  it('should obey the addHeadingAnchor option', function() {
    var md = markdownit().use(headinganchor, {addHeadingAnchor: true});
    var s = '# test';
    var target = '<h1 id="test"><a name="test" class="markdown-it-headinganchor" href="#"></a>test</h1>\n';
    expect(md.render(s)).to.equal(target);

    md = markdownit().use(headinganchor, {addHeadingAnchor: false});
    s = '# test';
    target = '<h1 id="test">test</h1>\n';
    expect(md.render(s)).to.equal(target);
  });

  it('should obey the slugify option', function() {
    var md = markdownit().use(headinganchor, {
        slugify: function (s) {
          return s.replace(/\s/g, '-');
        }
    });
    var s = '# test heading';
    var target = '<h1 id="test-heading"><a name="test-heading" class="markdown-it-headinganchor" href="#"></a>test heading</h1>\n';
    expect(md.render(s)).to.equal(target);
  });
});
