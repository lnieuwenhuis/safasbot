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
        
        if (currentRank === 1) {
            rankString = "🥇";
        } else if (currentRank === 2) {
            rankString = "🥈";
        } else if (currentRank === 3) {
            rankString = "🥉";
        }

        let leaderboard = allLevels.slice(skip, skip + perPage).map((level, index) => {
            let user = interaction.guild.members.cache.get(level.userId);
            return `${index + 1 + skip}. ${rankString} ${user ? user.displayName : "Unknown User"} - Level ${level.level} (${level.xp} XP)`;
        });

        const embed = new EmbedBuilder()
            .setTitle(`Leaderboard for ${interaction.guild.name}`)
            .setDescription(leaderboard.join("\n"))
            .setColor("RANDOM")
            .setFooter(`Page ${page} | Your rank: ${currentRank}`);

        interaction.reply({ embeds: [embed] });
    }
};