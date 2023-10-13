const { SlashCommandBuilder } = require('@discordjs/builders');
const ale = ['https://tenor.com/view/good-morning-beautiful-gif-9295267', 'https://tenor.com/view/you-there-jim-carrey-gif-4810969', 'https://images-ext-2.discordapp.net/external/nDu3b027A2cFPyMeBVY6RhwYPt5js21yblufvGXIA_o/https/i.imgur.com/X09681x.mp4', 'https://cdn.discordapp.com/attachments/513890573745258513/1015303712576647221/ass.PNG', 'https://cdn.discordapp.com/attachments/513890573745258513/1015473042350166026/as.png'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('alejandro')
        .setDescription('Alejandro Soto'),
            
    async execute(interaction) {
        let jandro = Math.floor(Math.random() * ale.length);
        interaction.reply({
            content: ale[jandro],
        });
    }
}