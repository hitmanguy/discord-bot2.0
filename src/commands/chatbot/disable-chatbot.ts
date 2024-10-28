import { CommandTypes, RegisterTypes, SlashCommandModule } from "../../handler";
import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { Chatbot } from "../../model/chatbot-channel";

export={
    type:CommandTypes.SlashCommand,
    register: RegisterTypes.Global,
    data: new SlashCommandBuilder()
         .setName('disable-chatbot')
         .setDescription('To disable the chatbot for this server.')
         .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
         .setDMPermission(false),
    async execute(interaction:CommandInteraction):Promise<void>{
        await interaction.deferReply();
        if(!interaction.guild)return;
        if(!await Chatbot.findOne({guildId: interaction.guild.id})){
            interaction.editReply("you haven't setup your chatbot channel yet, type /setup-chatbot.");
            return;
        }
        await Chatbot.findOneAndDelete({guildId: interaction.guild.id})
        interaction.editReply("Your chatbot channel have been successfully disabled.");
    },
}as SlashCommandModule;