
import { Router, Request, Application } from 'express';
import { BOOKMARKS_ENDPOINT_ADD, BOOKMARKS_ENDPOINT_BASE, BOOKMARKS_ENDPOINT_DELETE, BOOKMARKS_ENDPOINT_GETBYDATE, BOOKMARKS_ENDPOINT_GETBYID, BOOKMARKS_ENDPOINT_GETBYTAG, BOOKMARKS_ENDPOINT_SEARCH, BOOKMARKS_ENDPOINT_UPDATE, BOOKMARKS_ENDPOINT_FILTER } from '../../constants/endpoint';
import { addCRUDEndpoints } from '../../utils/RouterHelper';
import BookmarksRepository from '../domain/repository/BookmarksRepository';
import BookmarksFilter from '../domain/dto/BookmarksFilter';

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
  
router.get(BOOKMARKS_ENDPOINT_GETBYDATE + "/", async (req: Request<{ date: string }>, res) => {
    const bookmarksDate = new Date(req.params.date);
    const bookmarks = await getBookmarksCollection(req)
        .listByDate(bookmarksDate);
    res
        .status(200)
        .send(bookmarks);
});

router.get(BOOKMARKS_ENDPOINT_SEARCH + "/", async (req: Request<{query: string}>, res) => {
    const bookmarks = await getBookmarksCollection(req)
        .search(req.params.query);
    res
        .status(200)
        .send(bookmarks);
});

router.post(BOOKMARKS_ENDPOINT_FILTER, async (req, res) => {
    const req_typed = <BookmarksFilter>req.body;
    console.log(`Got filter request ${JSON.stringify(req_typed)}`);
    const bookmarks = await getBookmarksCollection(req)
        .filter(req_typed);
    res
        .status(200)
        .send(bookmarks);
});



