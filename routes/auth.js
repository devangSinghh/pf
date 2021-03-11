const dotenv = require('dotenv');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const User = require('../model/user');
const refresh = require('passport-oauth2-refresh');
const passport = require('passport');

const sanitize = require('mongo-sanitize');

const base = "http://localhost:6161/"

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(cookieParser());
passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    done(null, user);
})

const strategy = new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: base + "google/callback"
},

async (accessToken, refreshToken, profile, done) => {

const email = sanitize(profile.emails[0].value);
const userExist = await User.findOne({ email:email });

if (userExist) {
    return done(null,userExist);
}
else {

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(profile.id + profile.displayName, salt);

    const user = new User({ 
        uname:profile.name.givenName,
        dname:profile.displayName,
        email:email,
        password:hashedPassword,
        profileImg:profile._json.picture,
        theme:"light",
        kind:[
            {
                provider:profile.provider,
                id:profile.id
            }
        ],
     })
     
    const savedUser = await user.save();
    return done(null, savedUser)
}  
    })

passport.use(strategy);
refresh.use(strategy);




// You may notice in the url the portion
//  "s64-c" which means the image size to be 64,
//   I've tried using other values like "s100-c"
//    and they worked. Also if you remove the "s64-c" part
//     and append the "?sz=100" parameter, that will also work 
//     as of now. Though this is not very good way of getting the 
//     profile picture of a gplus user, but the advantage is it do not require any api key.


//facebook login
passport.use( new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: base + "facebook/callback",
        profileFields   : ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email' ]
    },
    
    async (accessToken, refreshToken, profile, done) => {

    const name = profile._json.first_name;
    const userExist = await User.findOne({ kind: { $elemMatch : { "id" : profile.id } } });

    if (userExist) {
        
        return done(null,userExist);
    }
    else {

        //Hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(profile.id + profile.displayName, salt);

        const user = new User({ 
            uname:name,
            dname:name,
            email:"",
            password:hashedPassword,
            profileImg:profile.photos[0].value,
            theme:"light",
            kind:[
                {
                    provider:profile.provider,
                    id:profile.id
                }
            ],
         })
        const savedUser = await user.save();
        return done(null, savedUser)
    }  
        }
)
);
