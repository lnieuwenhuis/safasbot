const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("weather")
		.setDescription("Gives the current weather for a specified location")
        .addStringOption((option) =>
            option
                .setName("location")
                .setDescription("The location to get the weather for")
                .setRequired(true)
        ),
	async execute(interaction, client) {
        const weather_api_url = `http://api.weatherapi.com/v1/current.json`;
        const weather_api_key = process.env.WEATHER_API_KEY;
        const location = interaction.options.getString("location");
        
        fetch(`${weather_api_url}?key=${weather_api_key}&q=${location}&aqi=no&alerts=no`)
        .then((response) => {
            if (!response.ok) {
                console.log(response);
                throw new Error("Network response was not OK");
            }
            return response.json();
        })
        .then((data) => {
            let embed = new EmbedBuilder().setTitle(`Current weather for ${location}`)
            .setDescription(`The current weather for ${location} is as follows:`);
            embed.setThumbnail(`https:${data.current.condition.icon}`);

            var today = new Date();
            var dd = String(today.getDate() + 1).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;

            embed.addFields({name: `Today`, value: `Temperature: ${data.current.temp_c}°C\nCondition: ${data.current.condition.text}`});            
            embed.setColor("#0099ff");
            return interaction.reply({embeds: [embed]});
        })
        .catch((error) => console.log(error));
    
	},
};
