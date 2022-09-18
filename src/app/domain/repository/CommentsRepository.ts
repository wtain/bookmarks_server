import { Application } from "express";
import { COMMENTS_COLLECTION_NAME, DB_NAME } from "../../../constants/storage";
import EntityRepository from "./EntityRepository";

class CommentsRepository extends EntityRepository {
  constructor(app: Application) {
    super(app, DB_NAME, COMMENTS_COLLECTION_NAME);
  }

  public async listByBookmarkId(bookmarkId: string) {
    const commentList = await this.entityCollection
      .find({ bookmarkId })
      .sort({"created": 1})
      .toArray();
    return commentList;
  }
}

export default CommentsRepository;