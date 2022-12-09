import Entity from "../repository/Entity";

export default interface User extends Entity {
    name: string;
    fullName: string;
    passwordHash: string;
    roles: string[];
    registeredAt: Date;
}