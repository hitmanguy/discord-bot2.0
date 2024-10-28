import { model,Schema } from "mongoose";

const SnipeSchema = new Schema({
    guildId:{
        type: String,
        Required: true,
    },
    Content:{
        type:String,
    },
    Author:{
        type:String,
        Required:true,
    },
    Docs:{
        type:String,
    },
    timestamp:{
        type:Date,
    }
});export const Snipe  = model("Snipe",SnipeSchema);

