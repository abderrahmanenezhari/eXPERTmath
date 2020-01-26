//Scripts has began

var login = {
    form: document.getElementById('login_form'),
    button: {
        open: document.getElementById('login_button'),
        close: document.getElementById('c_login_button')
    },
    block_display_form: function(display){
        this.form.style.display = display;
    }
};
