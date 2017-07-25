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
    }
}