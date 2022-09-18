import { Application, Router, Request } from "express";
import { COMMENTS_ENDPOINT_ADD, COMMENTS_ENDPOINT_BASE, COMMENTS_ENDPOINT_DELETE, COMMENTS_ENDPOINT_GETBYID, COMMENTS_ENDPOINT_LISTBYBOOKMARKID, COMMENTS_ENDPOINT_UPDATE } from "../../constants/endpoint";
import { addCRUDEndpoints } from "../../utils/RouterHelper";
import CommentsRepository from "../domain/repository/CommentsRepository";

export const router: Router = Router();

export function getCommentsCollection(req: { app: Application }): CommentsRepository {
    return new CommentsRepository(req.app);
}

addCRUDEndpoints(router, {
    delete: COMMENTS_ENDPOINT_DELETE,
    add: COMMENTS_ENDPOINT_ADD,
    update: COMMENTS_ENDPOINT_UPDATE,
    list: COMMENTS_ENDPOINT_BASE + "/",
    get: COMMENTS_ENDPOINT_GETBYID + "/"
}, getCommentsCollection);

router.get(COMMENTS_ENDPOINT_LISTBYBOOKMARKID + "/", async (req: Request<{id: string}>, res) => {
  const bookmarks = await getCommentsCollection(req)
      .listByBookmarkId(req.params.id);
  res
      .status(200)
      .send(bookmarks);
});