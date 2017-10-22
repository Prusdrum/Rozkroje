const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const i18n = require('i18n');

const configureExpressApp = (app) => {
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
        
    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    i18n.configure({
        locales: ['en', 'pl'],
        directory: path.join(__dirname, '..', 'locales'),
        defaultLocale: 'pl',
        objectNotation: true
    });
    app.use(i18n.init);
}

module.exports = configureExpressApp;