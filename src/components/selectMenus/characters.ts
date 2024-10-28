import { AnySelectMenuInteraction } from "discord.js";
import { ComponentModule, ComponentTypes } from "../../handler";
import { Chatbot } from "../../model/chatbot-channel";

export = {
    id: "character",
    type: ComponentTypes.SelectMenu,
    async execute(interaction: AnySelectMenuInteraction): Promise<void> {
        if(!interaction.guild)return;
        let chatbot = await Chatbot.findOne({guildId: interaction.guild.id})
        if(!chatbot){
         interaction.reply({content:"You have'nt selected a chatbot channel yet, type /setup-chatbot"})
         return;
        }
        if(!interaction.values.length){
            interaction.reply("You didnt select anything.");
            return;
        }
        if(chatbot.characterId){
            if(interaction.values[0] === chatbot.characterId){
                interaction.reply("That chatbot has been already selected.")
                     return;
                }
            chatbot.conversationId = 'null';
            chatbot.characterId = 'null';
        }
        chatbot.characterId = interaction.values[0];
        await chatbot.save();
    
        interaction.reply("Your chatbot has been successfully updated");
    }
} as ComponentModule;