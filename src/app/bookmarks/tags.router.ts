import { Router, Request, Application } from 'express';
import { TAGS_ENDPOINT_BASE } from '../../constants/endpoint';
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
*/

router.get(TAGS_ENDPOINT_BASE + "/", async (req, res) => {
    const tags = await getBookmarksCollection(req)
                .aggregate([
                    { "$project": { "tags.name": 1, _id: 0 } }, 
                    { "$unwind": "$tags" }, 
                    { "$project": { "name": "$tags.name" } }, 
                    { "$group": { _id: null, tags: { "$addToSet": "$name" } } }, 
                    { "$project": { tags: 1, _id: 0 } }
                ]).toArray();
    console.info(tags);
    res.status(200).send(tags);
  });