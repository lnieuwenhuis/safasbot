const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`quote`)
		.setDescription(`Command to automatically format quotes`)
		.addStringOption((option) =>
			option
				.setName(`person`)
				.setDescription(`Who said the Quote?`)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName(`quote`)
				.setDescription(`The most important thing, the Quote`)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName(`year`)
				.setDescription(`The year the Quote took place in`)
				.setRequired(true)
		)
		.addMentionableOption((option) =>
			option
				.setName(`tag`)
				.setDescription(`Tag the person (if they are in the Discord)`)
		),
	async execute(interaction, client) {
		let quotesChannel;
		await interaction.guild.channels
			.fetch()
			.then((channels) =>
				channels.forEach((channel) => {
					if (channel.name == `quotes`) {
						return (quotesChannel = channel);
					} else return;
				})
			)
			.catch(console.error);

		if (interaction.channel.name != `quotes`) {
			return interaction.reply({
				content: `You used this command in the wrong Channel! Try <#${quotesChannel.id}>`,
				ephemeral: true,
			});
		} else {
			const person = interaction.options.getString(`person`);
			const quote = interaction.options.getString(`quote`);
			const year = interaction.options.getString(`year`);
			const tag = interaction.options.getMentionable(`tag`);

			let embed;

			if (tag) {
				embed = new EmbedBuilder()
					.setTitle(`"${quote}"`)
					.setDescription(
						`-${person} (${tag}), ${year} \n\nQuoted by ${interaction.member}`
					)
					.setColor("Blue");
			} else {
				embed = new EmbedBuilder()
					.setTitle(`"${quote}"`)
					.setDescription(
						`-${person}, ${year} \n\nQuoted by ${interaction.member}`
					)
					.setColor("Blue");
			}

			return interaction.reply({ embeds: [embed] });
		}
	},
};
