import { Application, Router, Request } from "express";
import { AUTHENTICATION_ENDPOINT_LOGIN, AUTHENTICATION_ENDPOINT_LOGOUT, AUTHENTICATION_ENDPOINT_REGISTER } from "../../constants/endpoint";
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

interface RegisterRequest {
    fullName: string;
    username: string;
    password: string;
}

export function getSessionsCollection(req: { app: Application }): SessionsRepository {
    return new SessionsRepository(req.app);
}

router.post(AUTHENTICATION_ENDPOINT_REGISTER, async (req, res) => {
    const registerRequest = <RegisterRequest>req.body;
    const usersCollection = getUsersCollection(req);

    if (!SecurityHelper.validateUsername(registerRequest.username)) {
        res
            .status(403)
            .send(`Invalid user name ${registerRequest.username}`);
        return;
    }

    if (!SecurityHelper.validatePassword(registerRequest.password)) {
        res
            .status(403)
            .send("Invalid password");
        return;
    }

    const existingUser = await usersCollection.getByName(registerRequest.username);
    if (existingUser) {
        res
            .status(403)
            .send(`User with name ${registerRequest.username} already exists`);
        return;
    }

    await usersCollection.add({
        name: registerRequest.username,
        id: uuidv4(),
        fullName: registerRequest.fullName,
        passwordHash: SecurityHelper.getPasswordHash(registerRequest.password),
        registeredAt: Date(),
        roles: []
    })
    res
        .status(200)
        .send(`Success`);
});

router.post(AUTHENTICATION_ENDPOINT_LOGIN, async (req, res) => {
    const loginRequest = <LoginRequest>req.body;
    const user = await getUsersCollection(req)
        .getByName(loginRequest.username);

    if (!user) {
        res
            .status(404)
            .send(`User ${loginRequest.username} not found`);
        return;
    }

    if (SecurityHelper.verifyPassword(loginRequest.password, user.passwordHash)) {
        res
            .status(404)
            .send(`Wrong password for user ${loginRequest.username}`);
        return;
    }

    const sessionsRepository = getSessionsCollection(req);

    const sessionToken = SecurityHelper.generateSessionToken(loginRequest.username);

    const session: Session = {
        userName: loginRequest.username,
        id: uuidv4(),
        created: new Date(),
        lastUpdated: new Date(),
        token: sessionToken
    };

    await sessionsRepository.add(session);

    res
        .status(200)
        .cookie("SessionToken", sessionToken)
        .send(sessionToken);
  });

router.get(AUTHENTICATION_ENDPOINT_LOGOUT, async (req: Request<{sessionToken: string, userName: string}>, res) => {
    const sessionsRepository = getSessionsCollection(req);
    const session = await sessionsRepository.getBySessionToken(req.params.sessionToken);
    if (!session) {
        res
            .status(404)
            .send(`Session with token '${req.params.sessionToken}' not found`);
        return;
    }
    if (session.userName !== req.params.userName) {
        res
            .status(403)
            .send(`Session with token '${req.params.sessionToken}' does not belong to the user ${req.params.userName}`);
        return;
    }
    sessionsRepository.delete(session.id);
    res
        .status(200)
        .send(`Session with token '${req.params.sessionToken}' has been terminated`);
});
 