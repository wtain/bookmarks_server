import { Router, Request, Application } from 'express';
import { TAGS_ENDPOINT_BASE, TAGS_ENDPOINT_SEARCH } from '../../constants/endpoint';
import { getBookmarksCollection } from './bookmarks.router';

export const router: Router = Router();

/*
db.bookmarks.aggregate([
    { $project: {"tags.name": 1, _id: 0}}, 
    { $unwind: "$tags" }, 
    { $project: {"name": "$tags.name"}}, 
    { $group: {_id: null, tags: {$addToSet: "$name"}}}, 
    { $project: {tags: 1, _id: 0}}
])


db.bookmarks.aggregate([
    { $project: {"tags.name": 1, _id: 0}}, 
    { $unwind: "$tags" }, 
    { $project: {"name": "$tags.name"}}, 
    { $match: {"name": { $regex: ".*def.*", '$options' : 'i' } } },
    { $group: {_id: null, tags: {$addToSet: "$name"}}}, 
    { $project: {tags: 1, _id: 0}}
])
*/

router.get(TAGS_ENDPOINT_BASE + "/", async (req, res) => {
    const tags = await getBookmarksCollection(req)
        .listTags();
    console.info(tags);
    res.status(200).send(tags);
  });


router.get(TAGS_ENDPOINT_SEARCH + "/", async (req: Request<{substring: string}>, res) => {
    const tags = await getBookmarksCollection(req)
        .searchTags(req.params.substring);
    console.info(tags);
    res.status(200).send(tags);
});