const { SlashCommandBuilder } = require('@discordjs/builders');
const frog = ['https://media.discordapp.net/attachments/564544696995676177/760181067524341780/frogspin.gif', 'https://media.discordapp.net/attachments/564544696995676177/760181989961236500/fast.gif', 'https://media.discordapp.net/attachments/564544696995676177/760182055014236190/faster.gif'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('frog')
        .setDescription('Varying speeds of frog'),
            
    async execute(interaction) {
        let grog = Math.floor(Math.random() * frog.length);
        interaction.reply({
            content: frog[grog],
        });
    }
}