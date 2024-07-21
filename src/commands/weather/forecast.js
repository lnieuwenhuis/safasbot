const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("forecast")
		.setDescription("Gives the weather forecast for a specified location")
        .addStringOption((option) =>
            option
                .setName("location")
                .setDescription("The location to get the forecast for")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("days")
                .setDescription("The number of days to get the forecast for")
                .setRequired(false)
        ),
	async execute(interaction, client) {
        const weather_api_url = `http://api.weatherapi.com/v1/forecast.json`;
        const weather_api_key = process.env.WEATHER_API_KEY;
        const location = interaction.options.getString("location");
        const days = interaction.options.getString("days") || "1";        
        
        if (days > 3) {
            return interaction.reply({
                content: "The maximum number of days is 3",
                ephemeral: true,
            });
        }

        fetch(`${weather_api_url}?key=${weather_api_key}&q=${location}&days=${days}&aqi=no&alerts=no`)
        .then((response) => {
            if (!response.ok) {
                console.log(response);
                throw new Error("Network response was not OK");
            }
            return response.json();
        })
        .then((data) => {
            let embed = new EmbedBuilder().setTitle(`Weather Forecast for ${location}`)
            .setDescription(`The weather forecast for ${location} is as follows:`);
            embed.setThumbnail(`https:${data.current.condition.icon}`);
            for (let i = 0; i < days; i++) {
                var today = new Date();
                var dd = String(today.getDate() + (i + 1)).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();
                today = dd + '/' + mm + '/' + yyyy;

                embed.addFields({name: `${today}`, value: `Min Temp: ${data.forecast.forecastday[i].day.mintemp_c}°C\nMax Temp: ${data.forecast.forecastday[i].day.maxtemp_c}°C\nCondition: ${data.forecast.forecastday[i].day.condition.text}`});
            }
            embed.setColor("#0099ff");
            return interaction.reply({embeds: [embed]});
        })
        .catch((error) => console.log(error));
    
	},
};
