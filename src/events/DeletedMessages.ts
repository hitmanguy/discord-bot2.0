import { EventModule } from "../handler";
import { Collection, Events, Message } from "discord.js";
import { Snipe } from "../model/Snipes";
export = {
    name: Events.MessageDelete,
    async execute(message:Message,client): Promise<void>{
        if(message.author.bot) return;
        if(!message.guild)return;
        const snipe:any []= await Snipe.find({guildId:message.guild.id}).limit(5).sort({timestamp:-1});
        
        if(snipe.length==5){
            await Snipe.findOneAndReplace({_id:snipe[0]._id},{guildId:message.guild.id,Content:message.content,Author:message.author,Docs:message.attachments.first()?.proxyURL})
        }else{
            const snipe1 = new Snipe({
                guildId: message.guild.id,
                Content: message.content,
                Author: message.author.id,
                Docs: message.attachments.first()?.proxyURL,
                timestamp: Date.now(),
            })
            await snipe1.save();
        }
    }  
}as EventModule;