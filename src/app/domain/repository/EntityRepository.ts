import { Application } from "express";
import { Collection, MongoClient } from "mongodb";
import { convert_dates } from "../../../utils/DateHelpers";
import Entity from "./Entity";

class EntityRepository<T extends Entity = Entity> {

  protected entityCollection: Collection;

  constructor(app: Application, databaseName: string, collectionName: string) {
    const db: MongoClient = app.locals.db as MongoClient;
    const bmdb = db.db(databaseName);
    this.entityCollection = bmdb.collection(collectionName);
  }

  // todo: soft delete

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

  public async update(body: T) {
    convert_dates(body);
    const result = await this.entityCollection
      .updateOne(
        { "id": body.id },
        { $set: body }
      );
    return result;
  }

  public async list() {
    const entityList = await this.entityCollection
      .find()
      .sort({"created": 1})
      .toArray();
    return <T[]><unknown>entityList;
  }

  public async getById(id: string) {
    const entity = await this.entityCollection
      .findOne({ "id": id });
    return <T><unknown>entity;
  }

  public async getByName(name: string) {
    const entity = await this.entityCollection
      .findOne({ "name": name });
    return <T><unknown>entity;
  }
}

export default EntityRepository;