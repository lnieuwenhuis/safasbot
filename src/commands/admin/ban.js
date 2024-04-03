const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	PermissionsBitField,
	PermissionFlagsBits,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription(`Ban a member from the server`)
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.addMentionableOption((option) =>
			option
				.setName(`member`)
				.setDescription(`The member to ban from the server`)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName(`reason`)
				.setDescription(`Give a reason for the ban (Optional)`)
		),

	async execute(interaction, client) {
		if (
			!interaction.member.permissions.has(
				PermissionsBitField.Flags.BanMembers
			)
		)
			return interaction.reply({
				content: "You don't have permission to do that!",
				ephemeral: true,
			});

		const reason =
			interaction.options.get(`reason`)?.value || "No reason was given";
		const memberId = interaction.options.get(`member`).value;
		const memberName = interaction.guild.members.cache.get(memberId).user;

		const confirmEmbed = new EmbedBuilder()
			.setColor("Red")
			.setTitle(
				`Are you sure you want to ban:\n${memberName.globalName}\n\nFor the reason:\n${reason}`
			);

		const confirmButton = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId(`confirm`)
				.setLabel(`Confirm Ban`)
				.setStyle(ButtonStyle.Danger)
		);

		const message = await interaction.reply({
			embeds: [confirmEmbed],
			components: [confirmButton],
			ephemeral: true,
		});

		const confirmCollector = message.createMessageComponentCollector();

		confirmCollector.on("collect", async (i) => {
			if (i.customId === "confirm") {
				if (
					!i.member.permissions.has(
						PermissionsBitField.Flags.BanMembers
					)
				)
					return;

				interaction.guild.members.ban({ memberId, reason: reason });
				interaction.deleteReply();
			}
		});
	},
};
