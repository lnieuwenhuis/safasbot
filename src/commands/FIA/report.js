const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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
		),
	async execute(interaction, client) {
		if (
			interaction.channel.id != "1219367197470756905" &&
			interaction.channel.id != "1219375992339173496"
		) {
			return interaction.reply({
				content: `Je zit in het verkeerde kanaal!`,
				ephemeral: true,
			});
		}

		const driver = interaction.options.getMentionable(`driver`);
		const session = interaction.options.getString(`session`);
		const reason = interaction.options.getString(`reason`);
		const clip = interaction.options.getString("clipurl");

		const fiaRole = "775805566224039957";
		const raceDirector = "919694933261185045";

		if (!driver || !reason || !clip || !session)
			return interaction.reply({
				contents: `Vul alsjeblieft alle opties in!`,
				ephemeral: true,
			});

		let driverString = `${driver.user.globalName}`;
		let threadTitle = `${interaction.member.user.globalName} vs. ${driver.user.globalName}`;

		await interaction.reply({
			content: `Thread aangemaakt voor het incident van ${interaction.member} tegen ${driver}`,
		});

		const threadChannel = await interaction.channel.threads.create({
			name: `${threadTitle}`,
			reason: `A separate thread for this incident.`,
			rateLimitPerUser: 30,
		});
		threadEmbed = new EmbedBuilder()
			.setColor("Blue")
			.setDescription(
				`Report van: *${interaction.member}*\nTegen: *${driver}*\n\nSessie: *${session}*\nUitleg: ${reason}\nClip: ${clip}`
			)
			.setFooter({
				text: `Gebruik '/protest' om in bezwaar te gaan`,
			});

		const reportMessage = await threadChannel.send({
			embeds: [threadEmbed],
			content: `${interaction.member}${driver} -- <@&${fiaRole}><@&${raceDirector}>`,
		});
	},
};
