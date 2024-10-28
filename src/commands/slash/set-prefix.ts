import { CommandTypes,RegisterTypes,SlashCommandModule } from "../../handler";
import { SlashCommandBuilder,CommandInteraction, PermissionFlagsBits,AutocompleteInteraction} from "discord.js";
import { Prefix } from "../../model/prefix";

export = {
    type: CommandTypes.SlashCommand,
    register: RegisterTypes.Global,
    data: new SlashCommandBuilder()
    .setName('set-prefix')
    .setDescription('set your custom prefix for server')
    .addStringOption(option =>
        option.setName("type-prefix")
        .setRequired(true)
        .setDescription('prefix to set for')
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction:any): Promise<void>{
        const setPrefix = interaction.options.getString("type-prefix");
        const prefix = await Prefix.findOne({guildId: interaction.guildId});
        if(!prefix){
        await interaction.reply('Your prefix is not yet loaded , please try again.');
        return;
        }
       
        prefix.prefix = setPrefix;
        await prefix.save();
       
        await interaction.reply(`Your prefix has been successfully updated to ${prefix.prefix}`);
    }
}as SlashCommandModule;