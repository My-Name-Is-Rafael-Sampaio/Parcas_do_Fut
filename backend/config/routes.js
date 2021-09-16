const admin = require('./admin');

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
    app.post('/validateAdmin', app.api.auth.validateAdmin)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.user.getById))
        .put(admin(app.api.user.save))
        .delete(admin(app.api.user.remove))

    app.route('/notices')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.notice.save))
        .get(admin(app.api.notice.get))

    app.route('/notices/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.notice.getById))
        .put(admin(app.api.notice.save))
        .delete(admin(app.api.notice.remove))

    app.route('/brserieateams')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.brserieateam.save))
        .get(admin(app.api.brserieateam.get))

    app.route('/brserieateams/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.brserieateam.getById))
        .put(admin(app.api.brserieateam.save))
        .delete(admin(app.api.brserieateam.remove))

    app.route('/brseriebteams')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.brseriebteam.save))
        .get(admin(app.api.brseriebteam.get))

    app.route('/brseriebteams/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.brseriebteam.getById))
        .put(admin(app.api.brseriebteam.save))
        .delete(admin(app.api.brseriebteam.remove))
}