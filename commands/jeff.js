const { SlashCommandBuilder } = require('@discordjs/builders');
const jeff = ['https://tenor.com/view/jeff-sokol-chris-hansen-pizza-gif-21648886', 'https://tenor.com/view/jeff-sokol-chris-hansen-pizza-gif-21648755'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jeff')
        .setDescription('It\'s *wicked* confusing'),
            
    async execute(interaction) {
        let sokol = Math.floor(Math.random() * jeff.length);
        interaction.reply({
            content: jeff[sokol],
        });
    }
}