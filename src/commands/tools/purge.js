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
		const numberToDelete = interaction.options.getNumber("number");

		const confirm = new ButtonBuilder()
			.setCustomId("confirm")
			.setLabel("Confirm Purge")
			.setStyle(ButtonStyle.Danger);

		const cancel = new ButtonBuilder()
			.setCustomId("cancel")
			.setLabel("Cancel Purge")
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder().addComponents(confirm, cancel);
		var embed;

		if (numberToDelete) {
			embed = new EmbedBuilder()
				.setColor("#0099ff")
				.setTitle(
					`Are you sure you want to Delete ${numberToDelete} Messages?`
				)
				.setDescription("Use the Buttons Below")
				.addFields({ name: "title", value: "value", inline: false });
		} else {
			embed = new EmbedBuilder()
				.setColor("#0099ff")
				.setTitle(
					"Are you sure you want to Delete the Entire Channel History?"
				)
				.setDescription("Use the Buttons Below");
		}

		await interaction
			.reply({ embeds: [embed], components: [row] })
			.catch(console.error);
	},
};
