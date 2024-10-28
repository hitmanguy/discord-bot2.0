import Logger from "../handler/util/Logger";
import { Events, ActivityType } from "discord.js";
import { EventModule, UserStatus } from "../handler";
import { DiscordClient } from "../handler/util/DiscordClient";

export = {
    name: Events.ClientReady,
    once: true,
    async execute(client: DiscordClient): Promise<void> {
        if (!client.user) return;
        const sampleMessages = ['discord.gg/partyy, link in about me!',
            'lil cunts be wanting attention',
            '@me to chat!',
            'certified partyy!!',
            'Join partyy!',
           ' aka zaddy',
            'im cool',
            'certified cool',
            'certified schwazy',
            'coded by hitmanguy!',
            "Quinn's fav!",
            'smoking my way out',
            'ong',
            'on god bitches',
            'Toxic people are like black holes, they suck out your positive energy.',
            "A toxic person only changes their victims, never themselves.",
           ' When life gets toxic, I make it funny.',
            'Therapy: expensive. My toxic jokes: free.',
            'Serving up toxic humor with a side of laughter.',
            'Rolling with the toxic laughs, baby!',
            'Warning: My captions may cause uncontrollable laughter.',
            'My toxic humor is on another level.',
            'Toxic but lovable.',
            'A toxic mic drop in caption form.',
            'Toxic? Maybe. Funny? Definitely.',
            'Toxic, but make it cute.',
            'Being toxic never looked this cute.',
            'Cutely embracing my toxic side.',
            'Unleashing adorable toxic goodness.',
            'Daring you to share your thoughts on this toxic matter.',
            'Igniting debates with my toxic charm.',
            "Toxicity like Britney, I'm bringing it back."]
        client.user.setStatus(UserStatus.Dnd);
         setInterval(() => {
            if(!client.user){return;}
            const BotStatus =sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
            client.user.setPresence({
                activities: [{ name: `${BotStatus}`, type: ActivityType.Custom }],
               });
            }, 10000);
        
        //client.user.setActivity("Development", { type: ActivityType.Watching });
        Logger.log(`Ready! Logged in as ${client.user.tag}`);
    }
} as EventModule;