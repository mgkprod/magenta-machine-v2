/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from 'vue'
import _ from 'lodash'

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

const app = new Vue({
    el: '#app'
})

document.querySelectorAll('.magenta-links').forEach((el) => {
    el.addEventListener('click', (evt) => {
        document.getElementById('magenta-links-modal').classList.remove('hidden');
    })
})

document.getElementById('magenta-links-modal-close').addEventListener('click', (evt) => {
    document.getElementById('magenta-links-modal').classList.add('hidden');
});

document.querySelectorAll('.version').forEach((el) => {
    el.innerHTML = "v" + process.env.PACKAGE_VERSION;
})
