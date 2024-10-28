import { ButtonInteraction } from "discord.js";
import { ComponentModule, ComponentTypes } from "../../handler";

export = {
    id: "previous",
    type: ComponentTypes.Button,
    async execute(interaction: ButtonInteraction): Promise<void> {
     
    }
} as ComponentModule;