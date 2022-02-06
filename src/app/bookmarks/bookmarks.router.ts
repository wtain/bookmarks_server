
import { Router, Request, Application } from 'express';
import { MongoClient } from 'mongodb';
import { BOOKMARKS_ENDPOINT_ADD, BOOKMARKS_ENDPOINT_BASE, BOOKMARKS_ENDPOINT_DELETE, BOOKMARKS_ENDPOINT_UPDATE } from '../../constants/endpoint';
import { COLLECTION_NAME, DB_NAME } from '../../constants/storage';

export const router: Router = Router();

function getBookmarksCollection(req: {app: Application}) {
    const db: MongoClient = req.app.locals.db as MongoClient;
    const bmdb = db.db(DB_NAME);
    const result = bmdb.collection(COLLECTION_NAME);
    return result;
}

router.delete(BOOKMARKS_ENDPOINT_DELETE, async (req: Request<{id: string}>, res) => {
    const result = await getBookmarksCollection(req).deleteOne({"id": req.params.id});
    console.info(result);
    res.status(200).send();
});

router.post(BOOKMARKS_ENDPOINT_ADD, async (req, res) => {
    const result = await getBookmarksCollection(req).insertOne(req.body);
    console.info(result);
    res.status(200).send();
});

router.put(BOOKMARKS_ENDPOINT_UPDATE, async (req, res) => {
    const body = <{id: string}>req.body;
    delete req.body._id;
    const result = await getBookmarksCollection(req).updateOne({"id": body.id}, {$set: req.body});
    console.info(result);
    res.status(200).send();
});

router.get(BOOKMARKS_ENDPOINT_BASE + "/", async (req, res) => {
    const bookmarks = await getBookmarksCollection(req).find().toArray();
    console.info(bookmarks);
    res.status(200).send(bookmarks);
  });