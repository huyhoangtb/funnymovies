import {
  authenticate,
  UserProfile,
  AuthenticationBindings,
  TokenService,
  UserService,
} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {UserRepository} from "../repositories";
import {PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from "../keys";
import {PasswordHasher} from "../services/authentication/hash.password.bcryptjs";
import {get, requestBody, post, getModelSchemaRef} from '@loopback/rest';
import {User} from "../models";
import {Credentials} from "../dto";

export class AuthenticateController {
  constructor(
      @repository(UserRepository) public userRepository: UserRepository,
      @inject(PasswordHasherBindings.PASSWORD_HASHER)
      public passwordHasher: PasswordHasher,
      @inject(TokenServiceBindings.TOKEN_SERVICE)
      public jwtService: TokenService,
      @inject(UserServiceBindings.USER_SERVICE)
      public userService: UserService<User, Credentials>,
  ) {}

  @get('/user/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: User,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
      @inject(AuthenticationBindings.CURRENT_USER)
          currentUserProfile: UserProfile,
  ): Promise<UserProfile> {
    return currentUserProfile;
  }

  @post('/user/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Credentials),
          },
        },
      },
    },
  })
  async login(
      @requestBody({
        description: 'The input of login function',
        required: true,
        content: {
          'application/json': { schema: getModelSchemaRef(Credentials) },
        },
      }) credentials: Credentials,
  ): Promise<{token: string, user: User, userProfile: UserProfile}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return {
      token,
      user,
      userProfile
    };
  }
}
