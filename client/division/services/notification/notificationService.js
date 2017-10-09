const jquery = require('jquery');
//add jquery to globalspace to make notifyjs working
window.$ = jquery;
require('./notify.min');

module.exports = {
    showInfo: (text) => {
        $.notify(text, {
            position: 'top center', 
            className: 'info',
            autoHideDelay: 2000
        });
    },
    showWarning: (text) => {
        $.notify(text, {
            position: 'top center', 
            className: 'warning',
            autoHideDelay: 2000
        });
    },
    showError: (text) => {
        $.notify(text, {
            position: 'top center', 
            className: 'error',
            autoHideDelay: 2000
        });
    }
}