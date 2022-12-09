import { Application, Router } from "express";
import { AUTHENTICATION_ENDPOINT_LOGIN } from "../../constants/endpoint";
import SecurityHelper from "../../utils/SecurityHelper";
import SessionsRepository from "../domain/repository/SessionRepository";
import { getUsersCollection } from "./users.router";
import Session from "../domain/dto/Session";
import {v4 as uuidv4} from 'uuid';

export const router: Router = Router();

interface LoginRequest {
    username: string;
    password: string;
}

export function getSessionsCollection(req: { app: Application }): SessionsRepository {
    return new SessionsRepository(req.app);
}

router.post(AUTHENTICATION_ENDPOINT_LOGIN, async (req, res) => {
    const loginRequest = <LoginRequest>req.body;
    const user = await getUsersCollection(req)
        .getByName(loginRequest.username);

    if (!user) {
        res
            .status(404)
            .send(`User ${loginRequest.username} not found`);
    }

    if (SecurityHelper.getPasswordHash(loginRequest.password) !== user.passwordHash) {
        res
            .status(404)
            .send(`Wrong password for user ${loginRequest.username}`);
    }

    const sessionsRepository = await getSessionsCollection(req);

    const sessionToken = SecurityHelper.generateSessionToken(loginRequest.username);

    const session: Session = {
        userName: loginRequest.username,
        id: uuidv4(),
        created: new Date(),
        lastUpdated: new Date(),
        token: sessionToken
    };

    sessionsRepository.add(session);

    res
        .status(200)
        .cookie("SessionToken", sessionToken)
        .send(sessionToken);
  });