import passport from 'passport';
import LocalStrategy from 'passport-local';
import { UserModel } from '@api/models';

passport.serializeUser(({ id }, done) => done(null, id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false, 'Can not deserialize User');
  }
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    UserModel.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, 'Invalid Credentials');
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }

        if (isMatch) {
          return done(null, user);
        }

        return done(null, false, 'Invalid credentials.');
      });
    });
  })
);

export const signup = async ({ email, password, req }) => {
  if (!email || !password) {
    throw new Error('You must provide an email and password.');
  }

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new Error('Email in use');
    }

    const user = await UserModel.create({
      email,
      password,
    });

    return new Promise((resolve, reject) => {
      req.logIn(user, (err) => {
        if (err) {
          reject(err);
        }

        resolve(user);
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const login = ({ email, password, req }) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      console.log('err', err);

      if (!user) {
        reject('Invalid credentials.');
      }

      req.login(user, (err) => {
        if (err) {
          reject(err);
        }

        resolve(user);
      });
    })({ body: { email, password } });
  });
};

export default { signup, login };
