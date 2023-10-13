const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ass')
        .setDescription('ass.'),
            
    async execute(interaction) {
        interaction.reply({
            content: 'https://tenor.com/view/ass-vbuddy-bfdi-fred-figglehorn-they-had-ass-gif-15528531',
        });
    }
}