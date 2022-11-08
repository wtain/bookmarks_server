import { Application } from "express";
import { BOOKMARKS_COLLECTION_NAME, DB_NAME } from "../../../constants/storage";
import { addDays } from "../../../utils/DateHelpers";
import BookmarksFilter from "../dto/BookmarksFilter";
import EntityRepository from "./EntityRepository";

class BookmarksRepository extends EntityRepository {

  constructor(app: Application) {
    super(app, DB_NAME, BOOKMARKS_COLLECTION_NAME);
  }

  public async listByTag(tag: string) {
    const bookmarks = await this.entityCollection
      .find({"tags": {"$elemMatch": {"name": tag}}})
      .toArray();
    return bookmarks;
  }

  public async listByDate(date: Date) {
    // todo: implement
    // db.bookmarks.find({"created": { $gt: "9/30/2022" }})
    // db.bookmarks.find({"created": { $gte: ISODate("2022-09-11") ,  $lt: ISODate("2022-09-12")}})
    const nextDay = addDays(date, 1);
    // console.log("*** DEBUG date: " + date.toISOString());
    // console.log("*** DEBUG nextday: " + nextDay.toISOString());
    const bookmarks = await this.entityCollection
      .find(
        {
          "created": {
            $gte: date,
            $lt: nextDay
          }
        })
      .toArray();
    return bookmarks;
  }

  public async listTags() {
    const tags = await this.entityCollection
                    .aggregate([
                      { "$project": { "tags.name": 1, _id: 0 } }, 
                      { "$unwind": "$tags" }, 
                      { "$project": { "name": "$tags.name" } }, 
                      { "$group": { _id: null, tags: { "$addToSet": "$name" } } }, 
                      { "$project": { tags: 1, _id: 0 } }
                    ]).toArray();    
    return tags;
  }

  public async searchTags(substring: string) {
    const tags = await this.entityCollection
                    .aggregate([
                      { "$project": { "tags.name": 1, _id: 0 } }, 
                      { "$unwind": "$tags" }, 
                      { "$project": { "name": "$tags.name" } }, 
                      { "$match": {"name": { "$regex": ".*" + substring + ".*", '$options' : 'i' } } },
                      { "$group": { _id: null, tags: { "$addToSet": "$name" } } }, 
                      { "$project": { tags: 1, _id: 0 } }
                    ]).toArray();    
    return tags;
  }

  public async listDates() {
    const dates = await this.entityCollection
                    .aggregate([
                      { "$group": { _id: { date: { "$dateTrunc": { date: "$created", unit: "day" } } }, count: { $count: {} } } },
                      { "$project": { "date": "$_id.date", "_id": 0, "count": 1 } }
                    ]).toArray();    
    return dates;    
  }

  public async listDatesBetween(startDate: Date, endDate: Date) {
    const dates = await this.entityCollection
                    .aggregate([
                      { "$match": {"created": {"$gte": startDate, "$lt": endDate } }},
                      { "$group": { _id: { date: { "$dateTrunc": { date: "$created", unit: "day" } } }, count: { $count: {} } } },
                      { "$project": { "date": "$_id.date", "_id": 0, "count": 1 } }
                    ]).toArray();
    return dates;    
  }

  public async search(query: string) {
    const bookmarks = await this.entityCollection
      .find({
        "$or": [
          { "summary": { "$regex": `.*${query}.*` } },
          { "contents": { "$regex": `.*${query}.*` } }
        ]
      })
      .toArray();
    return bookmarks;
  }

  private buildMongoFilters(filter: BookmarksFilter): any[] {
    let result: any[] = [];
    if (filter.summary !== undefined) {
      result.push(
        { "summary": { "$regex": `.*${filter.summary}.*` } }
      );
    }
    if (filter.summary !== undefined) {
      result.push(
        { "contents": { "$regex": `.*${filter.description}.*` } }
      );
    }
    if (filter.is_done !== undefined) {
      result.push(
        { "isDone": filter.is_done }
      );
    }

    if (filter.created_from !== undefined && filter.created_to !== undefined) {
      result.push(
        { 
          "created": {
            $gte: filter.created_from,
            $lte: filter.created_to
          }
        }
      );
    }
    else if (filter.created_from !== undefined) {
      result.push(
        { 
          "created": {
            $gte: filter.created_from
          }
        }
      );
    }
    else if (filter.created_to !== undefined) {
      result.push(
        { 
          "created": {
            $lte: filter.created_to
          }
        }
      );
    }

    if (filter.tags !== undefined && filter.tags.length > 0) {
      console.log(`Filtering tags: ${filter.tags}`);
      result.push({
        "$and": filter.tags.map(tag => {
          return {
            "tags": { "$elemMatch": { "name": tag } }
          }
        })
      });
    }

    return result;
  }

  /*
    Testing:
      curl -X POST http://192.168.1.38:8081/api/bookmarks/filter -d '{}'

      curl -X POST -H "Content-Type: application/json" -d "{\"page_size\":1,\"start\":0}" http://192.168.1.38:8081/api/bookmarks/filter

      curl -X POST -H "Content-Type: application/json" -d "{\"page_size\":1,\"start\":0,\"tags\":[\"UI\"]}" http://192.168.1.38:8081/api/bookmarks/filter

      curl -X POST -H "Content-Type: application/json" -d "{\"page_size\":1,\"start\":0,\"tags\":[\"UI\",\"Bookmarks\"]}" http://192.168.1.38:8081/api/bookmarks/filter
  */

  public async filter(filter: BookmarksFilter) {
    // todo: + pagination
    const mongoFilters = this.buildMongoFilters(filter);
    const mongoFilter = mongoFilters.length > 0 ? {
      "$and": mongoFilters
    } : {};
    console.log(`Filtering: ${JSON.stringify(mongoFilter)}`);
    let cursor = await this.entityCollection
      .find(mongoFilter);
  
    if (filter.start !== undefined) {
      cursor = await cursor.skip(filter.start!);
    }

    if (filter.page_size !== undefined) {
      cursor = await cursor.limit(filter.page_size!);
    }
    
    const bookmarks = await cursor.toArray();
    return bookmarks;
  }
}

export default BookmarksRepository;