import { CommandTypes, RegisterTypes, SlashCommandModule } from "../../handler";
import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export = {
    type: CommandTypes.SlashCommand,
    register: RegisterTypes.Guild,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .setDMPermission(false),
    async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply();
  
      const reply = await interaction.fetchReply();
  
      const ping = reply.createdTimestamp - interaction.createdTimestamp;
  
      interaction.editReply(
        `Pong! Client ${ping}ms | Websocket: ${interaction.client.ws.ping}ms`
      );
    }
} as SlashCommandModule;