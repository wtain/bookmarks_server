import { Application } from "express";
import { BOOKMARKS_COLLECTION_NAME, DB_NAME } from "../../../constants/storage";
import EntityRepository from "./EntityRepository";

class BookmarksRepository extends EntityRepository {

  constructor(app: Application) {
    super(app, DB_NAME, BOOKMARKS_COLLECTION_NAME);
  }

  public async listByTag(tag: string) {
    const bookmarks = await this.entityCollection
      .find({"tags": {"$elemMatch": {"name": tag}}})
      .toArray();
    return bookmarks;
  }

  public async listTags() {
    const tags = await this.entityCollection
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
    const tags = await this.entityCollection
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