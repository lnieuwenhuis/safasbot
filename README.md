# Safasbot
Discord bot in active development, can do some admin stuff, forecast the weather using the [Weather API](https://www.weatherapi.com/), has a leveling system and more!

# Leveling
For leveling to work you have to set up a [MongoDB Cloud Server](https://cloud.mongodb.com)

# Usage
To use this bot in your own server, use the following steps:

**Docker**
1. Clone the repository onto a server/device that will run the bot,
2. Run `npm install` to install the required dependencies. If there is an error, it most likely has to do with the `"mediaplex-linux-x64-gnu": "^0.0.1"` package. Please look at the error log to find which replacement package your machine requires, 90% of the time the difference maker is either your operating system or whether your machine is using ARM64 or x64-86 CPU instruction sets.
3. Now change the name of `.env.example` to `.env` and change the required fields to your own tokens.
   **Docker**
5. To make and run the Docker container, just run `docker build . -t *your_tag*`, and when it's finished, run `docker run *your_tag*`
   **Hardware**
5. If you want to run the bot on bare metal hardware, the only thing left to do is run `npm run test` in your terminal of choice.

# Ready-2-use
Add **my version** of this bot to your server by clicking [here](https://discord.com/api/oauth2/authorize?client_id=1012693236541829147&permissions=8&scope=bot%20applications.commands)
