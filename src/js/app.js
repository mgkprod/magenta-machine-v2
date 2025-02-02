/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from 'vue';
import _ from 'lodash';

const files = require.context('./', true, /\.vue$/i);
files.keys().map((key) =>
  Vue.component(
    key
      .split('/')
      .pop()
      .split('.')[0],
    files(key).default,
  ),
);

Vue.prototype._ = window._;

const app = new Vue({
  el: '#app',
});

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
  return Math.round(((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min);
};
