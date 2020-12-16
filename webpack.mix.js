let mix = require('laravel-mix');
require('mix-html-builder');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
    .setPublicPath('public')
    .js('src/js/app.js', 'assets')
    .postCss('src/css/app.css', 'assets', [
        require('postcss-import'),
        require('tailwindcss'),
    ])
    .webpackConfig(require('./webpack.config'))
    .copyDirectory('src/public', 'public')
    .html({
        output: '.',
        inject: true,
        versioning: true,
    })
    .disableSuccessNotifications();