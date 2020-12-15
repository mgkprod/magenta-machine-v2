let mix = require('laravel-mix');

require('laravel-mix-tailwind');
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

    // Javascript
    .js('src/js/app.js', 'assets')

    // CSS
    .sass('src/scss/app.scss', 'assets')
    .tailwind()

    // Copy resources
    .copyDirectory('src/public', 'public')

    // Build index file
    .html({
        output: '.',
        inject: true,
        versioning: true,
    })
    .disableSuccessNotifications();