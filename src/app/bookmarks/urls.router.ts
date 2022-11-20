import { Router, Request, Response, Application } from "express";
// import { newHttpClient, Request as HttpRequest } from "typescript-http-client";
import { URLS_ENDPOINT_TITLE } from "../../constants/endpoint";
import UrlsRepository from "../domain/repository/UrlsRepository";
import axios from 'axios';
import { parse } from 'node-html-parser';

export const router: Router = Router();

export function getUrlsCollection(req: { app: Application }): UrlsRepository {
  return new UrlsRepository(req.app);
}

router.get(URLS_ENDPOINT_TITLE, async (req: Request<any, any, any, { url: string } >, res) => {
  const urlsRepository = await getUrlsCollection(req);
  console.log(`Request: ${JSON.stringify(req.query)}`);
  console.log(`Getting title for url=${req.query.url}`);

  const urls = await urlsRepository.searchByUrl(req.query.url);
  let urlEntry;
  if (urls.length == 0) {
    // const client = newHttpClient();
    // const request = new HttpRequest(req.query.url);
    // const html = await client.execute<string>(request);

    const html = await axios.get<string>(req.query.url)
      .then(response => response.data);

    // var parser = new DOMParser();
    // var htmlDoc = parser.parseFromString(html, 'text/html');
    // const title = htmlDoc.title;

    const dom = parse(html);
    const title = dom.querySelector('title')?.innerText;

    urlEntry = {
      title,
      timestamp: new Date()
    };

    urlsRepository.add(urlEntry);
  }
  else {
    urlEntry = urls[0];
  }

  res
        .status(200)
        .send(urlEntry.title);
});