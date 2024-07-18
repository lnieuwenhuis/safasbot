const { SlashCommandBuilder, AttachmentBuilder, Interaction, Client } = require("discord.js");
const Level = require("../../models/Level");
const { RankCardBuilder } = require("canvacord");

/**
 * @param {Interaction} interaction
 * @param {Client} client
 */

module.exports = {
	data: new SlashCommandBuilder()
		.setName("level")
		.setDescription("Shows the user's level")
        .addMentionableOption((option) =>
			option
				.setName(`user`)
				.setDescription(`The user you want to check the level of`)
                .setRequired(false)
		),
	async execute(interaction, client) {
        if (!interaction.guild) return interaction.reply("This command only works in a server!");

		const user = interaction.options.getMentionable(`user`)?.value;
        const targetUserId = user || interaction.member.id;
        const targetUserObj = await interaction.guild.members.fetch(targetUserId);

        const fetchedLevel = await Level.findOne({
            userId: targetUserId,
            guildId: interaction.guild.id,
        });
        if(!fetchedLevel) {
            interaction.editReply(
                user ? `${targetUserObj.displayName} has no level yet!` : `You have no level yet!`
            );
            return;
        }

        let allLevels = await Level.find({ guildId: interaction.guild.id }).select('-_id userId level xp');
        allLevels.sort((a, b) => {
            if (a.level === b.level) {
                return b.xp - a.xp;
            } else {
                return b.level - a.level;
            }
        });
        let currentRank = allLevels.findIndex((level) => level.userId === targetUserId) + 1;

        const rank = new RankCardBuilder({
            username: targetUserObj.displayName,
            discriminator: targetUserObj.user.discriminator,
            currentXP: fetchedLevel.xp,
            neededXP: fetchedLevel.level * 100,
            currentLevel: fetchedLevel.level,
            rank: currentRank,
            level: fetchedLevel,
            status: targetUserObj.presence.status,
            progressBar: "#FFFFFF",
        }).setAvatar(targetUserObj.user.displayAvatarURL({ format: "png" }));
        const data = await rank.build({ format: "png" });
        const attachment = new AttachmentBuilder(data)
        
        return interaction.reply({ files: [attachment] });
	},
};
