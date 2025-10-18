const session = require('express-session');
application.use(session({
    secret: 'MY_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambiar a true si se usa HTTPS
}));