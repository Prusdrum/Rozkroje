const configureRoute = (app, appConfig) => {
  app.get('/', (req, res, next) => {
    res.redirect('/division');
  });
  
  app.get('/division/:locale?', (req, res, next) => {
    const locale = req.params.locale;
    
    if (locale) {
      req.setLocale(locale);
    }

    res.render('division', { 
      title: res.__('siteTitle'),  
      locale: req.locale,
      translations: res.__,
      version: appConfig.VERSION,
      changelogUrl: appConfig.CHANGELOG_URL
    });
  });  
}

module.exports = configureRoute;
