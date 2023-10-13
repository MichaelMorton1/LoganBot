const { SlashCommandBuilder } = require('@discordjs/builders');
const mich = ['https://tenor.com/view/michael-bol-bol-na-dance-gif-19092269', 'https://tenor.com/view/yoda-suicide-squad-dance-dancing-gif-5970653'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('michael')
        .setDescription('Michael Morton'),
            
    async execute(interaction) {
        let ael = Math.floor(Math.random() * mich.length);
        interaction.reply({
            content: mich[ael],
        });
    }
}