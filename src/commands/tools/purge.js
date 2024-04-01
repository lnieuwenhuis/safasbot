const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("purge")
		.setDescription("Purge a number of messages, or the entire channel.")
		.addNumberOption((option) =>
			option
				.setName(`number`)
				.setDescription(
					`Set the Number of Messages to be Purged, or Empty for all.`
				)
				.setRequired(false)
		),

	async execute(interaction, client) {
		const message = await interaction.deferReply({
			fetchReply: true,
		});

		const numberToDelete = interaction.options.getNumber("number");

		var newMessage = ``;

		if (numberToDelete) {
			newMessage = `You want to delete ${numberToDelete} messages?`;
		} else {
			newMessage = `You want to delete the entire channel history?`;
		}
		await interaction.editReply({ content: newMessage });
	},
};
