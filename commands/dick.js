const { SlashCommandBuilder } = require('@discordjs/builders');
const di = ['https://images-na.ssl-images-amazon.com/images/I/612cNxldE-L._AC_UX679_.jpg', 'https://www.sydneycriminallawyers.com.au/app/uploads/2017/11/dick-pic.jpg', 'https://addicted.es/20909-large_default/ad816-dick-up-trunk.jpg', 'https://images-ext-2.discordapp.net/external/oAAIqSg04IPp0Xm1cX_PpKeN_HUIGoOpR1Rg86Ds2J8/https/upload.wikimedia.org/wikipedia/commons/thumb/8/88/46_Dick_Cheney_3x4.jpg/1200px-46_Dick_Cheney_3x4.jpg?width=507&height=676', 'https://images-na.ssl-images-amazon.com/images/I/71Bw8bEnTXL._AC_SY450_.jpg', 'https://cdn.newsapi.com.au/image/v1/8ea509e745a7c304d213938496a3a95d', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/muscle-fit-selfie-man-portrait-royalty-free-image-1573224453.jpg?crop=0.925xw:0.694xh;0,0.282xh&resize=480:*', 'https://awfulannouncing.com/wp-content/uploads/sites/94/2021/01/dickievpepto.png', 'https://www.gannett-cdn.com/-mm-/527fd0d1168beda29653c9ce59fef1c7ba712403/c=0-42-2324-1355/local/-/media/2018/03/15/INGroup/Indianapolis/636567294575103335-inidc5bk-57xy0p73v041028tgd0r-original.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp', 'https://i.guim.co.uk/img/media/babefda4578c792a56fc33f68a61a385d9222418/0_115_4206_2524/master/4206.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=cb9f6338de1ad0191c21e4665a7006a4', 'https://assets3.thrillist.com/v1/image/1503066/381x254/crop;jpeg_quality=65.jpg', 'https://addicted.es/23114-thickbox_default/ad904-ass-freedom-2020.jpg', 'https://www.gqindia.com/live-well/content/science-says-this-is-the-real-reason-men-send-dick-pics', 'https://www.amazon.com/Dick-Print-feat-Bonequisha-Explicit/dp/B07K37T752', 'https://www.gq.com/story/rate-your-dick-pics-on-new-tumblr-site', 'https://mambu3d.com/index.php/product/dino-dick-v2-dino-dick-putin/'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('assdick')
        .setDescription('Sends a picture of a dick'),
    async execute(interaction) {
        let chance = Math.ceil(Math.random() * 1000);
        let ck = Math.floor(Math.random() * di.length);

        if (`${interaction.user}` === `<@396377783565287435>`) {
            interaction.reply({
                content: 'Sorry this api is broken rn...',
            });
        } else {
            if (chance == 1) {
                interaction.reply({
                    content: 'https://media.discordapp.net/attachments/509514807918067742/509592103056048138/CnigX2bWIAANRm2.png?width=400&height=300', 
                });
            } else {
                interaction.reply({
                    content: di[ck],
                });
            }
        }
    }
}