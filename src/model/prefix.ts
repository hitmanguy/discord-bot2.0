import { model, Schema } from "mongoose";

const PrefixSchema = new Schema({
    guildId:{
        type: String,
        required: true,
    },
    prefix:{
        type: String,
        required: true,
        default: '!'
    }
});export const Prefix = model("Prefix",PrefixSchema);