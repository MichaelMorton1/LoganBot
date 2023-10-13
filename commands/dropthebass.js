const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dropthebass')
        .setDescription('Bow wow wa wa wa wa wa wa wa wa wooooooooooo bow wow wa-a-a-a-a-a-a-a'),
            
    async execute(interaction) {
        interaction.reply({
            content: 'https://cdn.discordapp.com/attachments/792614424703533066/882095266608607293/ezgif-2-01a931be57e5.gif',
        });
    }
}