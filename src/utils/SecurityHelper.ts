import { generate, verify } from "password-hash";
import * as jwt from "jsonwebtoken";
import config from "../constants/config";

export default class SecurityHelper {

    // todo: tests for all of that

    public static getPasswordHash(password: string): string {
        return generate(password);
    }

    public static verifyPassword(password: string, passwordHash: string): boolean {
        return verify(password, passwordHash);
    }

    public static generateSessionToken(userName: string): string {
        return jwt.sign({
            userName
        }, config.jwtSecret);
    }

    public static validateUsername(userName: string): boolean {
        const regexp = new RegExp(/^\w+$/gs);
        return userName !== undefined &&
               userName !== null &&
               userName.length > 0 &&
               regexp.test(userName) && 
               userName.length <= 32;
    }

    public static validatePassword(password: string): boolean {
        return password !== undefined &&
               password !== null &&
               password.length >= 8 &&
               password.length <= 32 &&
               password.split("").some(ch => "abcdefghijklmnopqrstuvwxyz".indexOf(ch) != -1) &&
               password.split("").some(ch => "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(ch) != -1) &&
               password.split("").some(ch => "0123456789".indexOf(ch) != -1) &&
               password.split("").some(ch => "!@#$%^&*()_+-=,./<>?;'\\:\"|[]{}".indexOf(ch) != -1) &&
               password.split("").every(ch => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=,./<>?;'\\:\"|[]{}".indexOf(ch) != -1)
               ;
    }
}