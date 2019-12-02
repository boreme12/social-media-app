const withSCSS = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([withSCSS, withCSS, withFonts, withImages]);