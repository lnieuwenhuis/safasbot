const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js");

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
		const confirm = new ButtonBuilder()
			.setCustomId("confirm")
			.setLabel("Confirm Ban")
			.setStyle(ButtonStyle.Danger);

		const cancel = new ButtonBuilder()
			.setCustomId("cancel")
			.setLabel("Cancel")
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder().addComponents(confirm, cancel);

		const embed = new EmbedBuilder()
			.setColor("#0099ff")
			.setTitle("title")
			.setDescription("description")
			.addFields({ name: "title", value: "value", inline: false });

		await interaction
			.reply({ embeds: [embed], components: [row] })
			.catch(console.error);
	},
};
