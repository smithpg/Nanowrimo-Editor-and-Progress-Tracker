const passport = require("passport");
const { User } = require("../data")
const GoogleStrategy = require('passport-google-oauth2').Strategy;

module.exports = function (app) {

    // Configure passport 

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://smithpg.xyz/nanowrimo/auth/google/callback",
    },
        function (accessToken, refreshToken, profile, done) {

            console.log(profile);

            const userOpts = {
                googleId: profile.id,
                firstName: profile.given_name,
                lastName: profile.family_name,
                email: profile.email
            }

            User.findOrCreate({ where: userOpts }).then(function (user) {
                return done(null, user[0]);
            }).catch(err => done(err, null));
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.get("googleId"));
    })

    passport.deserializeUser((userGoogleId, done) => {

        // Retrieve user from database
        const user = User.findOne({ where: { googleId: userGoogleId } });

        done(null, user);
    })


    // Set up passport middleware
    app.use(passport.initialize());
    app.use(passport.session());


    // Create routes for authentication 
    app.get("/nanowrimo/auth/login", passport.authenticate("google", {
        scope:
            ['profile', 'email']
    }));

    app.get("/nanowrimo/auth/google/callback", passport.authenticate("google"), (req, res, next) => {
        res.redirect("/nanowrimo")
    })

}