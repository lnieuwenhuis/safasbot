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
		.setName("purge")
		.setDescription("Purge a number of messages")
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addNumberOption((option) =>
			option
				.setName(`number`)
				.setDescription(`Set the Number of Messages to be Purged`)
				.setMinValue(1)
				.setMaxValue(100)
				.setRequired(true)
		),

	async execute(interaction, client) {
		if (
			!interaction.member.permissions.has(
				PermissionsBitField.Flags.ManageMessages
			)
		)
			return interaction.reply({
				content: "You don't have permission to do that!",
				ephemeral: true,
			});

		const numberToDelete = interaction.options.getNumber("number");

		try {
			const messages = await interaction.channel.messages.fetch({
				limit: numberToDelete,
			});

			const check14Days = (message) => {
				const oldDate = message.createdAt;
				const today = new Date();

				const diff = Math.abs(today - oldDate);
				const daysBetween = Math.ceil(diff / (1000 * 3600 * 24)); //Round up

				return daysBetween;
			};

			const filteredMessages = [];
			let index = 0;

			const messageFilter = (message) => {
				if (numberToDelete > index && check14Days(message) < 14) {
					filteredMessages.push(message);
					index++;
				}
			};

			messages.filter(messageFilter);

			await interaction.channel.bulkDelete(filteredMessages);

			let InputOrFilter = 0;

			if (numberToDelete != filteredMessages.length) {
				InputOrFilter = filteredMessages.length;
			} else {
				InputOrFilter = numberToDelete;
			}

			var embed;
			embed = new EmbedBuilder()
				.setColor("Blue")
				.setDescription(
					`:white_check_mark:  Deleted ${InputOrFilter} Messages newer than 14 Days.`
				);
		} catch (error) {
			console.error(error);
		}

		const button = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId(`purge`)
				.setEmoji(`🗑️`)
				.setStyle(ButtonStyle.Primary)
		);

		const message = await interaction.reply({
			embeds: [embed],
			components: [button],
		});

		const collector = message.createMessageComponentCollector();

		collector.on("collect", async (i) => {
			if (i.customId === "purge") {
				if (
					!i.member.permissions.has(
						PermissionsBitField.Flags.ManageMessages
					)
				)
					return;

				interaction.deleteReply();
			}
		});
	},
};
