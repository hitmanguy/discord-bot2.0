import { CommandTypes,RegisterTypes,SlashCommandModule } from "../../handler";
import { PermissionFlagsBits, SlashCommandBuilder,CommandInteraction, Collection,EmbedBuilder,ButtonBuilder,ButtonStyle} from "discord.js";
import { paginationEmbed } from "../../handler/types/pagination";
import { Snipe } from "../../model/Snipes";

export ={
    type: CommandTypes.SlashCommand,
    register: RegisterTypes.Global,
    data: new SlashCommandBuilder()
    .setName('snipe')
    .setDescription('snipes the latest deleted messages')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction:CommandInteraction,client:{snipes:any}):Promise<void>{
        if(!interaction.guild||!interaction.channel){
            interaction.reply({content:'Make sure your in a text based channel or in a server.',ephemeral:true});
            return;
        }
      
        const msg:any[] = await Snipe.find({guildId:interaction.guildId}).limit(5).sort({timestamp:-1});
        if(!msg.length){
          await interaction.reply({content:"I can't find any deleted messages", ephemeral:true});
          return;
        }
        const pages:any =[];
        msg.forEach(async (msgs)=>{
          const name = (await interaction.guild?.members.fetch(msgs.Author))?.user.username;
          const embed= new EmbedBuilder()
            .setColor('Blue')
            .setTitle(`SNIPED MESSAGE! ${name}(id:${msgs.Author})`)
            .setTimestamp()
           if (msgs.Docs){ 
            embed.addFields({
            name: 'attachments',
            value:`${msgs.Docs}`
           })}
           if(msgs.Content){embed.setDescription(`${msgs.Content}`);}
           pages.push(embed);
       })
               
        const button1 = new ButtonBuilder()
                .setCustomId('previous')
                .setLabel('Previous')
                .setStyle(ButtonStyle.Danger);

        const button2 = new ButtonBuilder()
                .setCustomId('next')
                .setLabel('Next')
                .setStyle(ButtonStyle.Success);

        const buttonList = [
              button1,
              button2
           ]
     paginationEmbed(interaction, pages, buttonList);
    }
}as SlashCommandModule;