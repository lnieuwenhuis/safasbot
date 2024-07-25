# Safasbot

Discord bot in active development, can do some admin stuff, forecast the weather, has a leveling system and more!

# Leveling
For leveling to work you have to set up a [MongoDB Cloud Server](https://cloud.mongodb.com)

# Usage
To use this bot in your own server, use the following steps:
1. Clone the repository onto a server/device that will run the bot,
2. Run `npm install` to install the required dependencies. If there is an error, it most likely has to do with the `"mediaplex-linux-x64-gnu": "^0.0.1"` package. Please look at the error log to find which replacement package your machine requires, 90% of the time the difference maker is either your operating system or whether your machine is using ARM64 or x64-86 CPU instruction sets.
3. If `npm install` finishes correctly, that means `package.json` and `package-lock.json` are correct.
4. Now change the name of `.env.example` to `.env` and change the required fields to your own tokens.
5. If you want to run the bot on bare metal hardware, the only thing left to do is run `npm run test` in your terminal of choice.
6. If you'd like to run the bot in a Docker container, just run `docker build . -t *your_tag*`, and when it's finished, run `docker run *your_tag*`

Add **my version** of this bot to your server by clicking [here](https://discord.com/api/oauth2/authorize?client_id=1012693236541829147&permissions=8&scope=bot%20applications.commands)
