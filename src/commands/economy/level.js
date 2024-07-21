const { SlashCommandBuilder, Interaction, Client, EmbedBuilder } = require("discord.js");
const Level = require("../../models/Level");

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

		const user = interaction.options.getMentionable(`user`);
        const targetUserId = user.id || interaction.member.id;
        const targetUserObj = await interaction.guild.members.fetch(targetUserId);

        const fetchedLevel = await Level.findOne({
            userId: targetUserId,
            guildId: interaction.guild.id,
        });
        if(!fetchedLevel) {
            interaction.reply(
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

        let rankString = "";
        
        if (currentRank === 1) {
            rankString = "🥇";
        }
        if (currentRank === 2) {
            rankString = "🥈";
        }
        if (currentRank === 3) {
            rankString = "🥉"
        }
        if(currentRank >3 && currentRank <=5) {
            rankString = ":star2:";
        }
        if(currentRank >5 && currentRank <=10) {
            rankString = ":star:";
        }
        if(currentRank >10 && currentRank <=20) {
            rankString = ":sparkles:";
        }
        if (currentRank > 20) {
            rankString = ":small_orange_diamond:";
        }

        const embed = new EmbedBuilder()
        .setTitle(`${targetUserObj.displayName}'s Level and Rank`)
        .setColor("Blurple")
        .setThumbnail(targetUserObj.user.displayAvatarURL())
        .addFields({
            name: "Level",
            value: `${fetchedLevel.level}`,
            inline: true,
        }, {
            name: "XP",
            value: `${fetchedLevel.xp}/${fetchedLevel.level * 100}`,
            inline: true,
        }, {
            name: "Rank",
            value: `${rankString}${currentRank}/${allLevels.length}`,
            inline: true,
        })
        try {
            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.log(error);
        }
	},
};
