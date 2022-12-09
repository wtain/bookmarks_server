
export const DB_CONN_STRING = "mongodb://localhost:27017"
export const DB_NAME = "bookmarks_store"
export const BOOKMARKS_COLLECTION_NAME = "bookmarks"
export const COMMENTS_COLLECTION_NAME = "comments"
export const URLS_COLLECTION_NAME = "urls";
export const USERS_COLLECTION_NAME = "users";
export const ROLES_COLLECTION_NAME = "roles";
export const SESSIONS_COLLECTION_NAME = "sessions";

/*

 db.bookmarks.find({}, {tags: {name: 1}, _id: 0})

  db.bookmarks.aggregate([{ $project: {"tags.name": 1, _id: 0}}, {$unwind: "$tags"}])

    db.bookmarks.aggregate([{ $project: {"tags.name": 1, _id: 0}}, {$unwind: "$tags"}, {$project: {"name": "$tags.name"}}])

db.bookmarks.aggregate([{ $project: {"tags.name": 1, _id: 0}}, {$unwind: "$tags"}, {$project: {"name": "$tags.name"}}, {$group: {_id: null, uniqueValues: {$addToSet: "$name"}}}])


db.bookmarks.aggregate([{ $project: {"tags.name": 1, _id: 0}}, {$unwind: "$tags"}, {$project: {"name": "$tags.name"}}, {$group: {_id: null, tags: {$addToSet: "$name"}}}])


db.bookmarks.aggregate([{ $project: {"tags.name": 1, _id: 0}}, {$unwind: "$tags"}, {$project: {"name": "$tags.name"}}, {$group: {_id: null, tags: {$addToSet: "$name"}}}, {$project: {tags: 1, _id: 0}}])


 db.bookmarks.find({"tags": {$elemMatch: {"name": 'UI'}}})

*/