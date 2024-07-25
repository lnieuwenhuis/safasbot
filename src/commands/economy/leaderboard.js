const { SlashCommandBuilder, Interaction, Client, EmbedBuilder } = require("discord.js");
const Level = require("../../models/Level");

/**
 * @param {Interaction} interaction
 * @param {Client} client
 */

module.exports = { 
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Shows the leaderboard of the server")
        .addIntegerOption((option) =>
            option
                .setName(`page`)
                .setDescription(`The page number of the leaderboard`)
                .setRequired(false)
        ),
    async execute(interaction, client) {
        if (!interaction.guild) return interaction.reply("This command only works in a server!");

        const page = interaction.options.getInteger(`page`) || 1;
        const perPage = 10;
        const skip = (page - 1) * perPage;

        let allLevels = await Level.find({ guildId: interaction.guild.id }).select('-_id userId level xp');
        allLevels.sort((a, b) => {
            if (a.level === b.level) {
                return b.xp - a.xp;
            } else {
                return b.level - a.level;
            }
        });

        let currentRank = allLevels.findIndex((level) => level.userId === interaction.user.id) + 1;
        let rankString = "";
        async function setRankString(user) {
            let rank;
            try {
                rank = allLevels.findIndex((level) => level.userId === user.id) + 1;
            } catch (error) {
            }

            if (rank === 1) {
                rankString = "🥇";
            }
            if (rank === 2) {
                rankString = "🥈";
            }
            if (rank === 3) {
                rankString = "🥉"
            }
            if(rank >3 && rank <=5) {
                rankString = ":star2:";
            }
            if(rank >5 && rank <=10) {
                rankString = ":star:";
            }
            if(rank >10 && rank <=20) {
                rankString = ":sparkles:";
            }
            if (rank > 20) {
                rankString = ":small_orange_diamond:";
            }
            return rankString;
        }

        let leaderboard = await Promise.all(allLevels.slice(skip, skip + perPage).map(async (level, index) => {
            let user = interaction.guild.members.cache.get(level.userId);
            return `${index + 1 + skip}. ${await setRankString(user)} ${user ? user.displayName : "Unknown User"} - Level ${level.level} (${level.xp} XP)`;
        }));

        let leaderboardString = leaderboard.join("\n");

        await setRankString(interaction.user);

        const embed = new EmbedBuilder()
            .setTitle(`Leaderboard for ${interaction.guild.name}`)
            .addFields(
                { name: "Rank", value: `${leaderboardString}`, inline: false },
                { name: "\nYour Rank", value: `#${currentRank} - ${rankString}`, inline: true },
                { name: "Page", value: `#${page}`, inline: true }
            )
            .setColor("Blurple")
        await interaction.reply({ embeds: [embed] });
    }
};