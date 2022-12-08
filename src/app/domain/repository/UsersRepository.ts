import { Application } from "express";
import { DB_NAME, USERS_COLLECTION_NAME } from "../../../constants/storage";
import EntityRepository from "./EntityRepository";

class UsersRepository extends EntityRepository {
  constructor(app: Application) {
    super(app, DB_NAME, USERS_COLLECTION_NAME);
  }
}

export default UsersRepository;