import bcrypt from 'bcrypt-nodejs';
import { Schema, model, Model } from 'mongoose';
import { User } from '@api-interfaces';

type UserSchemaInterface = User;

interface UserSchemaMethods {
  comparePassword(): void;
}

type UserModelInterface = Model<
  UserSchemaInterface,
  {
    [key: string]: any;
  },
  UserSchemaMethods
>;

const UserSchema = new Schema<
  UserSchemaInterface,
  UserModelInterface,
  UserSchemaMethods
>({
  email: String,
  password: String,
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });
});

UserSchema.method('comparePassword', function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
});

export const UserModel = model<UserSchemaInterface, UserModelInterface>(
  'User',
  UserSchema
);

export default UserModel;
