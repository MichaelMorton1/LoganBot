const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shake')
        .setDescription('Just the shake?'),
            
    async execute(interaction) {
        interaction.reply({
            content: 'https://cdn.discordapp.com/attachments/513890573745258513/1049884245432217650/booty.mp4',
        });
    }
}