const { Client, Message } = require("discord.js");
const Level = require("../../models/Level");
const calculateLevelXp = require("../../functions/utils/calculateLevelXp");

/**
 *  
 * @param {Message} message
 * @param {Client} client
 */

function getRandomXp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function giveUserXP(message) {
    if (message.author.bot || !message.inGuild()) return;

        const XpToGive = getRandomXp(5, 15);

        const query = {
            userId: message.author.id,
            guildId: message.guild.id
        }

        try {
            const level = await Level.findOne(query);

            if(level) {
                level.xp += XpToGive;

                if(level.xp >= calculateLevelXp(level.level)) {
                    level.level += 1;
                    level.xp = 0;
                    message.reply(`Congratulations, you've leveled up to **level ${level.level}**!`);
                }
                await level.save().catch((err) => {console.log(err) 
                    return;
                });
            }
            //if (!level)
            else {
                //create new level
                const newLevel = new Level({
                    userId: message.author.id,
                    guildId: message.guild.id,
                    xp: XpToGive,
                    level: 1
                });
                await newLevel.save().catch((err) => {console.log(err) 
                    return;
                });
            }
        } catch (error) {
            console.log(error);
        }
}

module.exports = {
	name: "messageCreate",
	async execute(message, client) {
        // Give the user XP for writing a message
        await giveUserXP(message);
    }
};
