const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	PermissionsBitField,
	PermissionFlagsBits,
} = require("discord.js");

const delay = (ms) => Promise((res) => setTimeout(res, ms));

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription(`Ban a member from the server`)
		.setDMPermission(false)
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
		const target = interaction.options.getMember("member");
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

		const confirmMessage = await interaction.reply({
			embeds: [confirmEmbed],
			components: [confirmButton],
		});

		const confirmCollector =
			confirmMessage.createMessageComponentCollector();

		confirmCollector.on("collect", async (i) => {
			if (i.customId === "confirm") {
				if (
					!i.member.permissions.has(
						PermissionsBitField.Flags.BanMembers
					)
				)
					return;
				interaction.deleteReply();
				const embed = new EmbedBuilder()
					.setColor(`Blue`)
					.setTitle(`You have banned ${memberName.globalName}`);

				const button = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId(`delete`)
						.setLabel(`Delete`)
						.setStyle(ButtonStyle.Primary)
				);

				const message = await interaction.channel.send({
					embeds: [embed],
					components: [button],
				});

				await target.ban({
					reason: [reason],
				});

				const exitCollector = message.createMessageComponentCollector();
				exitCollector.on("collect", async (i) => {
					if (i.customId === `delete`) {
						if (
							!i.member.permissions.has(
								PermissionsBitField.Flags.BanMembers
							)
						)
							return;
						message.delete();
					}
				});
			}
		});
	},
};
