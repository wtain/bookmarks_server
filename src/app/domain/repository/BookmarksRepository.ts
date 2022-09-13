import { Application } from "express";
import { Collection, MongoClient } from "mongodb";
import { COLLECTION_NAME, DB_NAME } from "../../../constants/storage";

class BookmarksRepository {

  private bookmarksCollection: Collection;

  constructor(private app: Application) {
    const db: MongoClient = app.locals.db as MongoClient;
    const bmdb = db.db(DB_NAME);
    this.bookmarksCollection = bmdb.collection(COLLECTION_NAME);
  }

  public async delete(id: string) {
    const result = await this.bookmarksCollection.deleteOne({ "id": id });
    return result;
  }

  public async add(body: any) {
    const result = await this.bookmarksCollection.insertOne(body);
    return result;
  }

  public async update(body: { id: string }) {
    const result = await this.bookmarksCollection.updateOne({"id": body.id}, {$set: body});
    return result;
  }

  public async list() {
    const bookmarks = await this.bookmarksCollection.find().toArray();
    return bookmarks;
  }

  public async listByTag(tag: string) {
    const bookmarks = await this.bookmarksCollection
      .find({"tags": {"$elemMatch": {"name": tag}}})
      .toArray();
    return bookmarks;
  }

  public async getById(id: string) {
    const bookmark = await this.bookmarksCollection
      .findOne({ "id": id });
    return bookmark;
  }

  public async listTags() {
    const tags = await this.bookmarksCollection
                    .aggregate([
                      { "$project": { "tags.name": 1, _id: 0 } }, 
                      { "$unwind": "$tags" }, 
                      { "$project": { "name": "$tags.name" } }, 
                      { "$group": { _id: null, tags: { "$addToSet": "$name" } } }, 
                      { "$project": { tags: 1, _id: 0 } }
                    ]).toArray();    
    return tags;
  }

  public async searchTags(substring: string) {
    const tags = await this.bookmarksCollection
                    .aggregate([
                      { "$project": { "tags.name": 1, _id: 0 } }, 
                      { "$unwind": "$tags" }, 
                      { "$project": { "name": "$tags.name" } }, 
                      { "$match": {"name": { "$regex": ".*" + substring + ".*", '$options' : 'i' } } },
                      { "$group": { _id: null, tags: { "$addToSet": "$name" } } }, 
                      { "$project": { tags: 1, _id: 0 } }
                    ]).toArray();    
    return tags;
  }
}

export default BookmarksRepository;