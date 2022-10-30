const { Client, ChatInputCommandInteraction } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Display the ping",
    category: "Information",
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {

        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `API: ${client.ws.ping}ms\nBOT: ${message.createdTimestamp - interaction.createdTimestamp}ms`;
        await interaction.editReply({
            content: newMessage,
        });

    }
}
