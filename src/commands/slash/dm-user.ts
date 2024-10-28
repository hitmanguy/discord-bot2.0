import { SlashCommandModule,CommandTypes,RegisterTypes } from "../../handler";
import { AutocompleteInteraction,SlashCommandBuilder,PermissionFlagsBits,CommandInteraction,EmbedBuilder, ChannelType} from "discord.js";

export = {
    type: CommandTypes.SlashCommand,
    register: RegisterTypes.Global,
    data: new SlashCommandBuilder()
    .setName('dm-user')
    .setDescription('send text message to a person in dm.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false)
    .addUserOption(option =>
          option.setName('target-user')
          .setRequired(true)
          .setDescription('choose a user you want to dm')
    )
    .addStringOption(option =>
        option.setName('text')
        .setRequired(true)
        .setDescription('type the text you want to send')
    )
    .addAttachmentOption(option =>
        option.setName('attachments')
        .setRequired(false)
        .setDescription('choose a attachment if any')
    ),
    async execute(interaction): Promise<void>{
        let ch = interaction.guild.channels.cache.find((chan: { name: string; }) => chan.name === 'dm-logs')?.id;
        if(!ch){
            await interaction.guild.channels.create({
                name: 'dm-logs',
                type: ChannelType.GuildText,
                position: 1
             });
             ch = await interaction.guild.channels.cache.find((chan: { name: string; }) => chan.name === 'dm-logs').id;
        }
        const channel = await interaction.client.channels.fetch(ch);
        const User = interaction.options.getUser('target-user');
        const text = interaction.options.getString('text');
        const attachments = interaction.options.getAttachment('attachments')?.url;

        const DmChannel = await interaction.client.users.createDM(User);
        await DmChannel.send({content:`${text}`});
        if(attachments){
            await DmChannel.send({content:`\n${attachments}`});
        }
        const msg = await interaction.reply({content:`Dm was sent to ${User} successfully.`,fetchReply:true});
        msg.react('👍');
        const embed = new EmbedBuilder()
        .setColor('#29C5F6')
        .setTitle(`Message was sent by ${interaction.user.displayName} to ${User.displayName}`)
        .setDescription(`${text}`)
        .setTimestamp(new Date())
        .setFooter({text:`sent by- ${interaction.user.id}, sent to- ${User.id}`});
        if(attachments){
            embed.addFields({
                name: 'attachments',
                value:`${attachments}`
           });
        }
        await channel.send({embeds: [embed]});
    }
}as SlashCommandModule;