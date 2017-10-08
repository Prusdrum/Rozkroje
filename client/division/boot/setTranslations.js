export default (I18n) => (translations, locale) => {
    I18n.setTranslations(translations);
    I18n.setLocale(locale);
}