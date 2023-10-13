const { SlashCommandBuilder } = require('@discordjs/builders');
const josh = ['https://media.discordapp.net/attachments/564544696995676177/760880129583874058/image0.gif', 'https://media.discordapp.net/attachments/789626145703985153/806195270223790121/image2.gif', 'https://media.discordapp.net/attachments/513890573745258513/809220151970758696/ezgif.com-gif-maker.gif'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('josh')
        .setDescription('Joshua Lin'),
            
    async execute(interaction) {
        let ua = Math.floor(Math.random() * josh.length);
        interaction.reply({
            content: josh[ua],
        });
    }
}