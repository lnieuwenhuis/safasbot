const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
	PermissionsBitField,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("unban")
		.setDescription("Unban a member from the server.")
		.setDMPermission(false)
		.addStringOption((option) =>
			option
				.setName("id")
				.setDescription("The ID of the banned user.")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Specify a reason for unbanning this user.")
				.setRequired(false)
		),

	/** @param {import('commandkit').SlashCommandProps} param0 */
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
		const { options, guild, member } = interaction;

		const id = options.getString("id");
		const reason = options.getString("reason") ?? "No reason provided.";

		try {
			await guild.members.unban(id, reason);

			const embed = new EmbedBuilder()
				.setColor("Green")
				.setTitle("Member unbanned successfully.")
				.setFields(
					{
						name: "Member ID",
						value: id.toString(),
						inline: true,
					},
					{
						name: "Moderator",
						value: `${member.user.tag} \`${member.user.id}\``,
						inline: true,
					},
					{
						name: "Reason",
						value: reason,
						inline: false,
					}
				);

			await interaction.reply({
				embeds: [embed],
			});

			return;
		} catch {
			const errorEmbed = new EmbedBuilder()
				.setColor("Red")
				.setDescription("There was an error unbanning this member.");

			await interaction.reply({
				embeds: [errorEmbed],
			});

			return;
		}
	},

	/** @type {import('commandkit').CommandOptions} */
	options: {
		botPermissions: ["BanMembers"],
	},
};
