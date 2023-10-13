const { SlashCommandBuilder } = require('@discordjs/builders');
const bo = ['https://upload.wikimedia.org/wikipedia/commons/8/8f/Blue-footed_Booby_%28Sula_nebouxii%29_-one_leg_raised.jpg','https://static01.nyt.com/images/2017/03/07/science/07sci-boobies-social/07sci-boobies-social-superJumbo.jpg', 'https://www.finchbayhotel.com/wp-content/uploads/2015/09/blue-footed-booby-colourful-anatomical-features-2.jpg', 'https://i.natgeofe.com/n/1dc4f48d-612a-43b9-b5df-e1f4e1ac1eb4/79004_16x9.jpg?w=636&h=358', 'https://cdn.britannica.com/83/189183-050-EC0D9CD3/booby-Galapagos-Islands-Ecuador.jpg', 'https://miro.medium.com/max/2000/1*-yzGLSZELvX4GDEoMUxJjQ.jpeg', 'https://images.newscientist.com/wp-content/uploads/2014/05/dn25505-1_800.jpg?width=600', 'https://i0.wp.com/fishconsult.org/wp-content/uploads/2014/10/Blue-footed-bubbies.jpg?fit=407%2C575&ssl=1', 'https://i.etsystatic.com/14555990/r/il/4b5afb/2438944212/il_fullxfull.2438944212_f0mr.jpg', 'https://static01.nyt.com/images/2017/03/07/science/07BOOBIESJP2/07BOOBIESJP2-articleInline-v3.jpg?quality=75&auto=webp&disable=upscale', 'https://i.pinimg.com/originals/61/be/61/61be615a53b5d4607db09b9f14b759c9.jpg', 'https://pbs.twimg.com/media/EUgNC1iWsAAT-1D.png', 'https://i.natgeofe.com/n/56accd38-519d-430f-a0a3-1ce86c10b1d6/blue-footed-booby_thumb.jpg'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('boobies')
        .setDescription('Sends pictures of boobies'),
            
    async execute(interaction) {
        let ob = Math.floor(Math.random() * bo.length);
        interaction.reply({
            content: bo[ob],
        });
    }
}