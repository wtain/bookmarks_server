import { Router, Request } from "express";
import Entity from "../app/domain/repository/Entity";
import CrudEndpoints from "./CrudEndpoints";
import RepositoryProvider from "./RepositoryProvider";

export function addCRUDEndpoints(router: Router, crudEndpoints: CrudEndpoints, repositoryProvider: RepositoryProvider) {
  router.delete(crudEndpoints.delete, async (req: Request<Entity>, res) => {
    const result = await repositoryProvider(req)
        .delete(req.params.id);
    res
        .status(200)
        .send(result);
  });

  router.post(crudEndpoints.add, async (req, res) => {
    const result = await repositoryProvider(req)
        .add(req.body);
    res
        .status(200)
        .send(result);
  });

  router.put(crudEndpoints.update, async (req, res) => {
    const body = <Entity>req.body;
    delete req.body._id;
    const result = await repositoryProvider(req)
        .update(body);
    res
        .status(200)
        .send(result);
  });

  router.get(crudEndpoints.list, async (req, res) => {
    const bookmarks = await repositoryProvider(req)
        .list();
    res
        .status(200)
        .send(bookmarks);
  });
    
  router.get(crudEndpoints.get, async (req: Request<Entity>, res) => {
    const bookmark = await repositoryProvider(req)
        .getById(req.params.id);
    res
        .status(200)
        .send(bookmark);
  });

}