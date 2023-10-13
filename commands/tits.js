const { SlashCommandBuilder } = require('@discordjs/builders');
const ti = ['https://cdn.download.ams.birds.cornell.edu/api/v1/asset/169357911/1800', 'https://static.dw.com/image/53195898_101.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Eurasian_blue_tit_Lancashire.jpg/1200px-Eurasian_blue_tit_Lancashire.jpg', 'https://globalnews.ca/wp-content/uploads/2019/01/gettyimages-144693645.jpg?quality=85&strip=all', 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/45029811/1800', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Great_tit_side-on.jpg/1200px-Great_tit_side-on.jpg', 'https://upload.wikimedia.org/wikipedia/commons/9/90/Lophophanes_cristatus_-Aviemore%2C_Scotland-8_%282%29.jpg', 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/44585041/1800', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Birds_of_Sweden_2016_37.jpg/220px-Birds_of_Sweden_2016_37.jpg', 'https://i.redd.it/eknujcqibs931.jpg', 'https://www.gardenhealth.com/wp-content/uploads/2018/12/555x555_Great_Tit_2.jpg', 'https://i.ytimg.com/vi/E4O4cvAv1pA/maxresdefault.jpg', 'https://news.cgtn.com/news/7a596a4e30677a4e7963444d7745444f786b444f31457a6333566d54/img/4a95e146fb534365b0ad037bc1e7a9d5/4a95e146fb534365b0ad037bc1e7a9d5.jpg', 'https://images.immediate.co.uk/production/volatile/sites/22/2019/12/GettyImages-1124542320-a865cb7-scaled.jpg?quality=90&resize=768%2C574', 'https://i.ytimg.com/vi/E4O4cvAv1pA/maxresdefault.jpg', 'https://img-9gag-fun.9cache.com/photo/a5EdOeq_460s.jpg', 'https://twootz.com/assets/images/bird/GreatTit.jpg', 'https://i.imgur.com/xbDRZTs.jpg'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tits')
        .setDescription('Sends pictures of tits'),
            
    async execute(interaction) {
        let ts = Math.floor(Math.random() * ti.length);
        interaction.reply({
            content: ti[ts],
        });
    }
}