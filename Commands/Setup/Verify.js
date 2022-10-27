const { Client, ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")
const DB = require("../../Schemas/Verification")

module.exports = {
    name: "verify",
    description: "setup the verify system",
    category: "Setup",
    options: [
        {
           name: "role",
           description: "select a role",
           type: 8,
           required: true 
        },
        {
            name: "channel",
            description: "Select a channel",
            type: 7,
            required: false
        }
    ],
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true })

        const { options, guild, channel } = interaction

        const role = options.getRole("role")
        const Channel = options.getChannel("channel") || channel

        let Data = await DB.findOne({ Guild: guild.id }).catch(err => { })

        if(!Data) {
            Data = new DB({
                Guild: guild.id,
                Role: role.id,
            })

            await Data.save()
        } else {
            Data.Role = role.id
            await Data.save()
        }

        Channel.send({
            embeds: [
                new EmbedBuilder()
                .setTitle("Verification")
                .setColor("DarkGrey")
                .setDescription("Click on the button to verify")
                .setTimestamp()
            ],
            components: [
                new ActionRowBuilder().addComponents(

                    new ButtonBuilder()
                    .setCustomId("verify")
                    .setLabel("Verify")
                    .setStyle(ButtonStyle.Success)
                )
            ]
        })

        return interaction.editReply({content: "Success"})
    }
}