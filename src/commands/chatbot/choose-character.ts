import {StringSelectMenuBuilder,StringSelectMenuOptionBuilder,ActionRowBuilder} from "discord.js";
import { CommandTypes, RegisterTypes, SlashCommandModule } from "../../handler";
import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export={
    type:CommandTypes.SlashCommand,
    register: RegisterTypes.Global,
    data: new SlashCommandBuilder()
        .setName("choose-character")
        .setDescription("choose your preffered character from here.")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .setDMPermission(false),
    async execute(interaction: CommandInteraction): Promise<void> {
       if(!interaction.guild)return;

    const characters = [
    {
        label: 'Makima',
        description: 'An anime character, a public safety devil hunter.',
        values: 'eGPYvuu9WnIzP4gHbkgwe3cTtqwfnLi5QUNip_q8Le4',
        emoji: '1262338063988949022'
    },
    {
        label: 'HyperGlot',
        description: 'A chatBot who could help you with languages and practice.',
        values: '2T3Xhqf5B_b9Wrn8Bg0FeCYR7BPx2LtJQJJCIB4Qe18',
        emoji: '1262338279500681256'
    },
    {
        label: 'Elon Musk',
        description: 'yes,Elon Musk as an chatbot.',
        values: '6HhWfeDjetnxESEcThlBQtEUo0O8YHcXyHqCgN7b2hY',
        emoji: '1262338463076843564'
    },
    {
        label: 'hittie',
        description: 'A standard chatbot with whom you can chat anything about.',
        values: 'w6wfymlqDNfF0WYNCqX-4fxsikaiT1RvD5_uswxwQc8',
        emoji: '1262338924307681382'
    },
    {
        label: 'Light Yagami',
        description: 'Anime character',
        values: 'YYCHubyJpY8P77ZucQe5997O_cyTW7IDPQcPAQ1uD0w',
        emoji: '1268225237326102590'
    },
    {
        label: 'X',
        description: 'custom chatbot for this server.',
        values: '9FV83a250Zh7Wv5fCaw1ysls8iZXMCzi97Lp8FwuRg8',
        emoji: '1275729346530902097'
    }
    // {
    //     label: 'Google AI',
    //     description: 'A formal AI which pretty much acts like google assistant.',
    //     values: 'null',
    //     emoji: '⚔️'
    // }
];

const selectMenu = new StringSelectMenuBuilder()
.setCustomId('character')
.setPlaceholder('Make a selection...')
.setMinValues(0)
.setMaxValues(1)
.addOptions(characters.map((character) => 
    new StringSelectMenuOptionBuilder()
    .setLabel(character.label)
    .setDescription(character.description)
    .setValue(character.values)
    .setEmoji(character.emoji)
));

const actionRow:any = new ActionRowBuilder().addComponents(selectMenu);

await interaction.reply({
    components: [actionRow],
    ephemeral: true,
});
},
}as SlashCommandModule;