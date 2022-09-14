
import { Router, Request, Application } from 'express';
import { BOOKMARKS_ENDPOINT_ADD, BOOKMARKS_ENDPOINT_BASE, BOOKMARKS_ENDPOINT_DELETE, BOOKMARKS_ENDPOINT_GETBYID, BOOKMARKS_ENDPOINT_GETBYTAG, BOOKMARKS_ENDPOINT_UPDATE } from '../../constants/endpoint';
import { addCRUDEndpoints } from '../../utils/RouterHelper';
import BookmarksRepository from '../domain/repository/BookmarksRepository';

export const router: Router = Router();

export function getBookmarksCollection(req: { app: Application }): BookmarksRepository {
    return new BookmarksRepository(req.app);
}

addCRUDEndpoints(router, {
    delete: BOOKMARKS_ENDPOINT_DELETE,
    add: BOOKMARKS_ENDPOINT_ADD,
    update: BOOKMARKS_ENDPOINT_UPDATE,
    list: BOOKMARKS_ENDPOINT_BASE + "/",
    get: BOOKMARKS_ENDPOINT_GETBYID + "/"
}, getBookmarksCollection);

router.get(BOOKMARKS_ENDPOINT_GETBYTAG + "/", async (req: Request<{tag: string}>, res) => {
    const bookmarks = await getBookmarksCollection(req)
        .listByTag(req.params.tag);
    res
        .status(200)
        .send(bookmarks);
  });