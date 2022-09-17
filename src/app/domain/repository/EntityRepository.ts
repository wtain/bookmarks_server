import { Application } from "express";
import { Collection, MongoClient } from "mongodb";
import { convert_dates } from "../../../utils/DateHelpers";
import Entity from "./Entity";

class EntityRepository {

  protected entityCollection: Collection;

  constructor(app: Application, databaseName: string, collectionName: string) {
    const db: MongoClient = app.locals.db as MongoClient;
    const bmdb = db.db(databaseName);
    this.entityCollection = bmdb.collection(collectionName);
  }

  public async delete(id: string) {
    const result = await this.entityCollection
      .deleteOne({ "id": id });
    return result;
  }

  public async add(body: any) {
    convert_dates(body);
    const result = await this.entityCollection
      .insertOne(body);
    return result;
  }

  public async update(body: Entity) {
    convert_dates(body);
    const result = await this.entityCollection
      .updateOne(
        { "id": body.id },
        { $set: body }
      );
    return result;
  }

  public async list() {
    const entity = await this.entityCollection
      .find()
      .toArray();
    return entity;
  }

  public async getById(id: string) {
    const bookmark = await this.entityCollection
      .findOne({ "id": id });
    return bookmark;
  }
}

export default EntityRepository;