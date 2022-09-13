
import { Router, Request, Application } from 'express';
import { BOOKMARKS_ENDPOINT_ADD, BOOKMARKS_ENDPOINT_BASE, BOOKMARKS_ENDPOINT_DELETE, BOOKMARKS_ENDPOINT_GETBYID, BOOKMARKS_ENDPOINT_GETBYTAG, BOOKMARKS_ENDPOINT_UPDATE } from '../../constants/endpoint';
import BookmarksRepository from '../domain/repository/BookmarksRepository';

export const router: Router = Router();


export function getBookmarksCollection(req: { app: Application }): BookmarksRepository {
    return new BookmarksRepository(req.app);
}

router.delete(BOOKMARKS_ENDPOINT_DELETE, async (req: Request<{id: string}>, res) => {
    const result = await getBookmarksCollection(req)
        .delete(req.params.id);
    console.info(result);
    res.status(200).send();
});

router.post(BOOKMARKS_ENDPOINT_ADD, async (req, res) => {
    const result = await getBookmarksCollection(req)
        .add(req.body);
    console.info(result);
    res.status(200).send();
});

router.put(BOOKMARKS_ENDPOINT_UPDATE, async (req, res) => {
    const body = <{id: string}>req.body;
    delete req.body._id;
    const result = await getBookmarksCollection(req)
        .update(body);
    console.info(result);
    res.status(200).send();
});

router.get(BOOKMARKS_ENDPOINT_BASE + "/", async (req, res) => {
    const bookmarks = await getBookmarksCollection(req)
        .list();
    console.info(bookmarks);
    res.status(200).send(bookmarks);
  });

router.get(BOOKMARKS_ENDPOINT_GETBYTAG + "/", async (req: Request<{tag: string}>, res) => {
    const bookmarks = await getBookmarksCollection(req)
        .listByTag(req.params.tag);
    console.info(bookmarks);
    res.status(200).send(bookmarks);
  });

router.get(BOOKMARKS_ENDPOINT_GETBYID + "/", async (req: Request<{id: string}>, res) => {
    const bookmark = await getBookmarksCollection(req)
        .getById(req.params.id);
    console.info(bookmark);
    res.status(200).send(bookmark);
});
