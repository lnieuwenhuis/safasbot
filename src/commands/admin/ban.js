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

		const memberId = interaction.options.get(`member`).value;
		const memberName =
			interaction.guild.members.cache.get(memberId).user.globalName;

		return interaction.reply({
			content: `Member ID: ${memberId}\nMember Name: ${memberName}`,
		});
	},
};
