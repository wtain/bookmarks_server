import { generate } from "password-hash";
import * as jwt from "jsonwebtoken";
import config from "../constants/config";

export default class SecurityHelper {

    public static getPasswordHash(password: string): string {
        return generate(password);
    }

    public static generateSessionToken(userName: string): string {
        return jwt.sign({
            userName
        }, config.jwtSecret);
    }
}