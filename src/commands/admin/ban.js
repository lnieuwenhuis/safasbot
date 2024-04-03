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
				.setDescription(`The reason for the ban (can be left blank)`)
				.setRequired(false)
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
			interaction.options.get(`reason`)?.value || `No reason Provided`;
		const memberId = interaction.options.get(`member`).value;
		const memberName =
			interaction.guild.members.cache.get(memberId).user.globalName;

		// await interaction.guild.members.cache.get(memberId).ban();

		return interaction.reply({
			content: `Member ID: ${memberId}\nMember Name: ${memberName}\nReason: ${reason}`,
		});
	},
};
