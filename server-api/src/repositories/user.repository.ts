import {DefaultCrudRepository, DataObject, Options} from '@loopback/repository';
import {User, UserRelations, } from '../models';
import {MongoDbDataSource} from '../datasources';
import {inject} from '@loopback/core';
import {PasswordHasherBindings} from "../keys";
import {PasswordHasher} from "../services/authentication/hash.password.bcryptjs";

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher<string>,
  ) {
    super(User, dataSource);
  }

 async create(user: DataObject<User>, options?: Options): Promise<User> {
    if(user.password) {
      user.password = await this.passwordHasher.hashPassword(user.password);
    }
    return super.create(user, options);
  }
}
