import { Application } from "express";
import { DB_NAME, URLS_COLLECTION_NAME } from "../../../constants/storage";
import EntityRepository from "./EntityRepository";

class UrlsRepository extends EntityRepository {
  constructor(app: Application) {
    super(app, DB_NAME, URLS_COLLECTION_NAME);
  }

  public async searchByUrl(url: string) {
    const bookmarks = await this.entityCollection
      .find({ "url": url })
      .toArray();
    return bookmarks;
  }
}

export default UrlsRepository;