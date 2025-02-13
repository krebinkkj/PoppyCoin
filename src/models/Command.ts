import {
    Collection,
    CommandInteraction,
    GuildBasedChannel,
    GuildMember,
    Message,
    Role,
    SendableChannels,
    SlashCommandBuilder,
    User
} from "discord.js"

export class Command {
    public name: string
    public description: string
    public category: CommandCategory
    public permissions?: string[]
    public aliases?: string[]
    public slashData: SlashCommandBuilder
    public SlashEnabled: boolean
    public data?: any
    public run:(
        message: PoppyMessage | (PoppyCommandInteraction & CommandInteraction),
            args?: string[]
    ) => void

    constructor(name: string, description: string, category: CommandCategory) {
        this.name = name.toLowerCase()
        this.description = description.toLowerCase()
        this.category = category
        this.SlashEnabled = false

        this.slashData = new SlashCommandBuilder().setName(this.name).setDescription(this.description)
        return this
    }

    public setPermissions(permissions: string[]) {
        this.permissions = permissions
        return this
    }

    public setAlias(aliases: string[]) {
        this.aliases = aliases
        return this
    }

    public setRun(
        run: (
            message: PoppyMessage | (PoppyCommandInteraction & CommandInteraction),
                args?: string[]
        ) => void,
    ) {
        this.run = run
        return this
    }
}

export type CommandCategory = 
    | "nenhum"
    | "animais"
    | "diversão"
    | "informação"
    | "dinheiro"
    | "moderação"
    | "administração"
    | "musica"
    | "utilidade"

export interface PoppyCommandInteraction extends CommandInteraction {
    author?: User
    mentions?: {
        members?: Collection<string, GuildMember>
        roles?: Collection<string, Role>
        channels?: Collection<string, GuildBasedChannel>
    };
    member: GuildMember
    interaction?: boolean
    content?: string
}

export interface PoppyMessage extends Message {
    channel: SendableChannels
}

export function createPoppyInteraction(interaction: any): PoppyCommandInteraction & CommandInteraction {
    interaction.author = interaction.user
    interaction.interaction = true
    return interaction
}