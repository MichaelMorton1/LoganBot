const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wyatt')
        .setDescription('Wyatt Betz'),
            
    async execute(interaction) {
        interaction.reply({
            content: 'https://tenor.com/view/horse-squish-horse-squish-gif-19865504',
        });
    }
}