import { CommandInteraction } from "discord.js";
import { PoppyCommandInteraction, PoppyMessage } from "./Command";

export class ItemUse {
    public itemId: string
    public run: (
        message: PoppyMessage | (PoppyCommandInteraction & CommandInteraction), 
        args?: string[]
    ) => void

    constructor(
        itemId: string,
        func: (
            message: PoppyMessage | (PoppyCommandInteraction & CommandInteraction),
            args?: string[]
        ) => void
    ) {
        this.itemId = itemId
        this.run = func
    }
}