import fetch from 'node-fetch';
import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import local from 'passport-local';
import { UserModel } from '../DAO/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';
import { CartService } from '../services/carts.service.js';
import { logger } from '../utils/logger.utils.js';

const LocalStrategy = local.Strategy;
const cartService = new CartService();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export function iniPassport() {
  /************************************* Login *************************************/
  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ email: username });
        if (!user) {
          logger.info('User Not Found with username (email) ' + username);
          return done(null, false);
        }
        if (!isValidPassword(password, user.password)) {
          logger.error('Invalid Password');
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  /************************************* Register *************************************/
  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        try {
          const { email, firstName, lastName, age } = req.body;
          let user = await UserModel.findOne({ email: username });
          if (user) {
            logger.info('User already exists');
            return done(null, false);
          }

          const newUser = {
            email,
            firstName,
            lastName,
            age: Number(age),
            isAdmin: false,
            password: createHash(password),
            cart: await cartService.createCart(),
          };

          let userCreated = await UserModel.create(newUser);
          logger.info('User Registration succesful');
          return done(null, userCreated);
        } catch (e) {
          logger.error('Error in register');
          logger.error(e);
          return done(e);
        }
      }
    )
  );

  /************************************* Github *************************************/
  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: 'https://proyectofinalbackend-maurogarro.onrender.com/api/sessions/githubcallback',
      },
      async (accesToken, _, profile, done) => {
        try {
          const res = await fetch('https://api.github.com/user/emails', {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: 'Bearer ' + accesToken,
              'X-Github-Api-Version': '2022-11-28',
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);

          if (!emailDetail) {
            return done(new Error('cannot get a valid email for this user'));
          }
          profile.email = emailDetail.email;

          let user = await UserModel.findOne({ email: profile.email });
          if (!user) {
            const newUser = {
              email: profile.email,
              firstName: profile._json.name || profile._json.login || 'noname',
              lastName: 'nolast',
              isAdmin: false,
              password: 'nopass',
              age: null,
              cart: await cartService.createCart(),
            };
            let userCreated = await UserModel.create(newUser);
            logger.info('User Registration succesful');
            return done(null, userCreated);
          } else {
            logger.info('User already exists');
            return done(null, user);
          }
        } catch (e) {
          logger.error('Error en auth github');
          logger.error(e);
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });
}
