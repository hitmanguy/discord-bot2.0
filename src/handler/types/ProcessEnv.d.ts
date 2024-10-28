declare namespace NodeJS {
    export interface ProcessEnv {
        CLIENT_TOKEN: string;
        CLIENT_ID: string;
        GUILD_ID: string;
        MONGO_DB: string;
        CHARACTER_TOKEN: string;
    }
}