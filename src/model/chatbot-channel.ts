import { Schema ,model} from "mongoose";

const ChatbotSchema = new Schema({
    guildId:{
        type: String,
        required: true,
    },
    channelId:{
        type: String,
        required: true,
    },
    conversationId:{
        type: String,
        default: null,
    },
    characterId:{
        type: String,
        default: null,
    }
});export const Chatbot = model('Chatbot',ChatbotSchema);