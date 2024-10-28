import { CommandTypes, RegisterTypes, SlashCommandModule } from "../../handler";
import { PermissionFlagsBits, SlashCommandBuilder,EmbedBuilder } from "discord.js";
import { Chatbot } from "../../model/chatbot-channel";

export={
    type: CommandTypes.SlashCommand,
    register: RegisterTypes.Global,
    data: new SlashCommandBuilder()
        .setName('setup-chatbot')
        .setDescription('choose a channel in which you want your chatbot in.')
        .addChannelOption(option =>
            option.setName('target-channel')
            .setDescription('choose the channel')
            .setRequired(true)
        )
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction):Promise<void>{
        const targetChannel = interaction.options.getChannel('target-channel').value;

        let chatbot = await Chatbot.findOne({guildId: interaction.guild.id});
        if(chatbot){
            interaction.reply({content:"You already have setup the chatbot channel, to disable it type /disable-chatbot,"})
            return;
        }
        chatbot = new Chatbot({
            guildId: interaction.guild.id,
            channelId: targetChannel
        });
        await chatbot.save();

         const embed = new EmbedBuilder()
        .setColor('#29C5F6')
        .setTitle(`✅ Your chatbot channel has been setup successfully in <#${targetChannel}> ✅`)
        .setImage("https://i.pinimg.com/736x/40/b3/09/40b309173fcd59c6cd56cd62d2c771ed.jpg")
        .setTimestamp(new Date())
        .addFields({
             name: 'To disable it, type /chatbot-disable',
             value:'to choose a chatbot character, type /choose-character.'
        });
         interaction.reply({embeds: [embed]});
    },
}as SlashCommandModule;