import 'dotenv/config';
import {Events, Message,MessageType } from "discord.js";
import { EventModule } from "../handler";
import { Chatbot } from '../model/chatbot-channel';
const CharacterAI = require('node_characterai');

export ={
    name: Events.MessageCreate,
    async execute(message:Message):Promise<void>{
    if (!message.inGuild() || message.author.bot ){ return;}
    if(!message.mentions.users.first()?.bot){return;}
    let chatbot = await Chatbot.findOne({guildId: message.guild.id})
    if(!chatbot){
       message.reply("you haven't setup your chatbot channel yet, type /setup-chatbot.")
       return;
    }
    if(!(message.channelId === chatbot.channelId)){
        return;
    }
    const characterAI = new CharacterAI();
    await characterAI.authenticateWithToken(process.env.CHARACTER_TOKEN);
    if(!chatbot.characterId){
        message.reply("you have'nt selected a chatbot yet , type /choose-character.")
    }   
    const create = await characterAI.createOrContinueChat(chatbot.characterId);
    if(!chatbot.conversationId){ 
       await create.saveAndStartNewChat();
       chatbot.conversationId = create.externalId;
       await chatbot.save();
    }
    await create.changeToConversationId(chatbot.conversationId);
    const response = await create.sendAndAwaitResponse(`${message.author.username}-${message.content}`);
    await message.channel.sendTyping();
    const array = response[response.length-1];
    const MessageToEdit = JSON.stringify(array);
    const MessageToSend = decodeURIComponent(MessageToEdit).replace('"}','').replace('{"text":"','').replace(/\\n/g,"\n");
    message.reply(MessageToSend);
}
}as EventModule;
