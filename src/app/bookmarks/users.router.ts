import { Application, Router } from "express";
import { USERS_ENDPOINT_ADD, USERS_ENDPOINT_DELETE, USERS_ENDPOINT_EDIT, USERS_ENDPOINT_GETBYID, USERS_ENDPOINT_LIST } from "../../constants/endpoint";
import { addCRUDEndpoints } from "../../utils/RouterHelper";
import UsersRepository from "../domain/repository/UsersRepository";

export const router: Router = Router();

export function getUsersCollection(req: { app: Application }): UsersRepository {
    return new UsersRepository(req.app);
}

addCRUDEndpoints(router, {
    delete: USERS_ENDPOINT_DELETE,
    add: USERS_ENDPOINT_ADD,
    update: USERS_ENDPOINT_EDIT,
    list: USERS_ENDPOINT_LIST,
    get: USERS_ENDPOINT_GETBYID + "/"
}, getUsersCollection);
