import { generate } from "password-hash";
import * as jwt from "jsonwebtoken";
import config from "../constants/config";

export default class SecurityHelper {

    // todo: tests for all of that

    public static getPasswordHash(password: string): string {
        return generate(password);
    }

    public static generateSessionToken(userName: string): string {
        return jwt.sign({
            userName
        }, config.jwtSecret);
    }

    public static validateUsername(userName: string): boolean {
        const regexp = new RegExp(/^\w+$/gs);
        return regexp.test(userName) && userName.length <= 32;
    }
}