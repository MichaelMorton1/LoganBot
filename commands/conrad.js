const { SlashCommandBuilder } = require('@discordjs/builders');
const con = ['https://tenor.com/view/funny-funny-cat-brazil-conrad-lol-gif-19009044', 'https://tenor.com/view/conrad-logic-conlogic-gonrad-conrad-gif-12754119'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('conrad')
        .setDescription('Conrad Payne'),
            
    async execute(interaction) {
        let rad = Math.floor(Math.random() * con.length);
        interaction.reply({
            content: con[rad],
        });
    }
}