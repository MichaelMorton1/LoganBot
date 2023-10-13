const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('asslogan')
        .setDescription('Sends a gif of Logan Betz'),
            
    async execute(interaction) {
        interaction.reply({
            content: 'https://tenor.com/view/punch-guy-karate-boxing-gif-16204479',
        });
    }
}