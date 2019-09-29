// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/authentication
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
import {HttpErrors} from '@loopback/rest';
import {UserRepository} from '../../repositories/user.repository';
import {User} from '../../models/user.model';
import {UserService, UserProfile} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {PasswordHasher} from '../authentication/hash.password.bcryptjs';
import {PasswordHasherBindings} from '../../keys';
import {inject} from '@loopback/context';
import {Credentials} from "../../dto";

export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    let foundUser = await this.userRepository.findOne({
      where: {email: credentials.email},
    });

    if (!foundUser) {
      const user = new User();
      user.email = credentials.email;
      user.password = credentials.password;
      foundUser = await this.userRepository.create(user);
      // throw new HttpErrors.NotFound(
      //   `User with email ${credentials.email} not found.`,
      // );
    }

    const passwordMatched = await this.passwordHasher.comparePassword(
      credentials.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('The credentials are not correct.');
    }

    return foundUser;
  }

  convertToUserProfile(user: User): UserProfile {
    return {
      id: user.id,
      name: user.email,
      email: user.email,
    };
  }
}
