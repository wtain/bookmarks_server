
import { Application } from "express";
import { DB_NAME, SESSIONS_COLLECTION_NAME } from "../../../constants/storage";
import Session from "../dto/Session";
import EntityRepository from "./EntityRepository";

export default class SessionsRepository extends EntityRepository<Session> {
  constructor(app: Application) {
    super(app, DB_NAME, SESSIONS_COLLECTION_NAME);
  }

  public async getBySessionToken(name: string) {
    const entity = await this.entityCollection
      .findOne({ "token": name });
    return <Session><unknown>entity;
  }
}