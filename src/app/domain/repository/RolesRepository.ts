import { Application } from "express";
import { DB_NAME, ROLES_COLLECTION_NAME } from "../../../constants/storage";
import EntityRepository from "./EntityRepository";

class RolesRepository extends EntityRepository {
  constructor(app: Application) {
    super(app, DB_NAME, ROLES_COLLECTION_NAME);
  }
}

export default RolesRepository;