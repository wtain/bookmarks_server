import Entity from "../repository/Entity";

export default interface User extends Entity {
    fullName: string;
    passwordHash: string;
    roles: string[];
}