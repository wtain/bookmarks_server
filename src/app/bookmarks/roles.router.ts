import { Application, Router } from "express";
import { ROLES_ENDPOINT_ADD, ROLES_ENDPOINT_DELETE, ROLES_ENDPOINT_EDIT, ROLES_ENDPOINT_GETBYID, ROLES_ENDPOINT_LIST } from "../../constants/endpoint";
import { addCRUDEndpoints } from "../../utils/RouterHelper";
import RolesRepository from "../domain/repository/RolesRepository";

export const router: Router = Router();

export function getRolesCollection(req: { app: Application }): RolesRepository {
    return new RolesRepository(req.app);
}

addCRUDEndpoints(router, {
    delete: ROLES_ENDPOINT_DELETE,
    add: ROLES_ENDPOINT_ADD,
    update: ROLES_ENDPOINT_EDIT,
    list: ROLES_ENDPOINT_LIST,
    get: ROLES_ENDPOINT_GETBYID + "/"
}, getRolesCollection);
