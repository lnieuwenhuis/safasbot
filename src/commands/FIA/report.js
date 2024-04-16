const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`report`)
		.setDescription(`Report a Driver to the Stewards`)
		.addMentionableOption((option) =>
			option
				.setName(`driver`)
				.setDescription(`De coureur die je wilt rapporteren`)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName(`session`)
				.setDescription(
					`De sessie waarin het incident heeft plaatsgevonden`
				)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName(`reason`)
				.setDescription(
					`Geef de reden waarvoor je de coureur rapporteert`
				)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName(`clipurl`)
				.setDescription(`Geef de URL naar de clip van het incident`)
				.setRequired(true)
		)
		.addMentionableOption((option) =>
			option
				.setName(`seconddriver`)
				.setDescription(
					`Tweede coureur die je wilt rapporteren (optioneel)`
				)
		),

	async execute(interaction, client) {
		// if (
		// 	interaction.channel.id != 1219367197470756905
		// 	// &&
		// 	// interaction.channel.id !=  && interaction.channel.id !=
		// ) {
		// 	return interaction.reply({
		// 		contents: `Je zit in het verkeerde kanaal!`,
		// 		ephemeral: true,
		// 	});
		// }

		const driver = interaction.options.getMentionable(`driver`);
		const secondDriver = interaction.options.getMentionable(`seconddriver`);
		const session = interaction.options.getString(`session`);
		const reason = interaction.options.getString(`reason`);
		const clip = interaction.options.getString("clipurl");

		if (!driver || !reason || !clip || !session)
			return interaction.reply({
				contents: `Vul alsjeblieft alle opties in!`,
				ephemeral: true,
			});

		let driverString = "";

		if (!secondDriver) {
			driverString = `${driver}`;
		} else {
			driverString = `${driver} en ${secondDriver}`;
		}

		let embed = new EmbedBuilder()
			.setColor("Blue")
			.setDescription(
				`**Report van: ${interaction.member}\nTegen: ${driverString}**\n\nSessie: ${session}\nUitleg: ${reason}\nClip: ${clip}`
			);
		interaction.reply({ embeds: [embed] });
	},
};
