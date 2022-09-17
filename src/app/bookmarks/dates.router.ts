import { Router, Request} from "express";
import { DATES_ENDPOINT_BASE, DATES_ENDPOINT_RANGE } from "../../constants/endpoint";
import { getBookmarksCollection } from "./bookmarks.router";

export const router: Router = Router();

router.get(DATES_ENDPOINT_BASE + "/", async (req, res) => {
  const dates = await getBookmarksCollection(req)
      .listDates();
  res
      .status(200)
      .send(dates);
});

router.get(DATES_ENDPOINT_RANGE + "/", async (req: Request<{date_start: string, date_end: string}>, res) => {
  const dates = await getBookmarksCollection(req)
      .listDatesBetween(new Date(req.params.date_start), new Date(req.params.date_end));
  res
      .status(200)
      .send(dates);
});