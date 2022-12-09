import Entity from "../repository/Entity";

export default interface Session extends Entity {
    userName: string;
    created: Date;
    lastUpdated: Date;
    token: string;
}