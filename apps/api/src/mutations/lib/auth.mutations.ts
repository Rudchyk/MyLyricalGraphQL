import { GraphQLString } from 'graphql';
import { UserType } from '@api/types';
import { login, signup } from '@api/services';

export const authMutations = {
  signup: {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: (_, { email, password }, req) => signup({ email, password, req }),
  },
  logout: {
    type: UserType,
    resolve: (_, args, req) => {
      const { user } = req;

      req.logout((err) => {
        if (err) {
          console.log('logout err', err);
        }
      });

      return user;
    },
  },
  login: {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: (_, { email, password }, req) => login({ email, password, req }),
  },
};

export default authMutations;
