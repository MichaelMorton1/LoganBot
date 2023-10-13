require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, GatewayIntentBits, Collection, EmbedBuilder, Events } = require('discord.js');
const pokemonSchema = require("./pokemon-schema");
const { MongoClient } = require('mongodb');

const client = new Client({
    intents: [ 
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
     ]
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));




const commands = [];

client.commands = new Discord.Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

const ytdl = require("ytdl-core");

const prefix = 'as!';

var servers = {};

let time;

console.log(client.channels);

// Poke Embeds
const troll = new EmbedBuilder()
    .setColor(0xFF0000)
    .setTitle('A Wild Pokémon has Appeared')
    .setDescription('Use `@Pokecord catch <Pokémon Name>` to catch it!')
    .setFooter({ text: 'The next Pokémon will replace this one.' });

const caught = new EmbedBuilder()
    .setColor(0xFF0000)
    .setTitle('A Pokémon has been Caught')
    .setFooter({ text: 'The Pokémon has been added to your collection.' });

const badCatch = new EmbedBuilder()
    .setColor(0xE74D3C)
    .setTitle('Something went wrong...')
    .setFooter({ text: 'Support is available at discord.gg/pkcord.' });

const ranAway = new EmbedBuilder()
    .setColor(0xE74D3C)
    .setTitle('You took too long!')
    .setDescription('Looks like the Pokémon got bored and ran away!\n> **Wait for another Pokémon to spawn**')
    .setFooter({ text: 'Better luck next time, pal.' });

const displayPokemon = new EmbedBuilder()
    .setColor(0xFFCD4D)
    .setFooter({ text: 'I\'m currently working on this, so this is the best you got for now' })


let pokeNames = [
    'Mew', 
    'Mewtwo', 
    'Jeff Sokol', 
    'Conrad Payne', 
    'Alejandro Soto', 
    'Michael Morton', 
    'Burger Andy', 
    'Masahiro Sakurai', 
    'Arman Sheets'
];
let pokeImages = [
    'https://media.discordapp.net/attachments/1161317907406540830/1161321437840281731/mew.png?ex=6537dfdf&is=65256adf&hm=d0ea489cba1453210844b19d8497a542055ac7f0db81e23a2db2865fb4b1e515&=', 
    'https://media.discordapp.net/attachments/1161317907406540830/1161321556518125698/800px-OfficialMewtwoDesign.png?ex=6537dffb&is=65256afb&hm=b36d726d8d70db83d0eb8d152e2c803cfb20ffc0541894a4dee5470cf659188a&=&width=552&height=676', 
    'https://media.discordapp.net/attachments/1161317907406540830/1161321639305297950/paper_overlay.png?ex=6537e00f&is=65256b0f&hm=f263f246c4b7e56024bc8ee36fe2102690c743d400210b6cf32cce2318ce07d3&=&width=676&height=676', 
    'https://media.discordapp.net/attachments/1161317907406540830/1161321682653417523/headrag.png?ex=6537e019&is=65256b19&hm=cc6c42fffad97e5f44a38afd4679f43d33f81293317f3f8a5aac4d27b4557caf&=&width=682&height=676', 
    'https://media.discordapp.net/attachments/1161317907406540830/1161321729654804481/headro.png?ex=6537e024&is=65256b24&hm=31ec6c7e1a42a6245ba700998ef36842af9f0f85bd4ed5e2d9e96be19e27b1e7&=', 
    'https://media.discordapp.net/attachments/1161317907406540830/1161322041253830746/mormon.png?ex=6537e06e&is=65256b6e&hm=1ab58fe60b1c9eabaa388a11400bf86a2a7eec437fe0bc6dd9e0b640c2a4361f&=', 
    'https://media.discordapp.net/attachments/1161317907406540830/1161323045034664088/burgerandy.png?ex=6537e15e&is=65256c5e&hm=6de37cf59f59cc5c3f2e472ee37c172b6c2ff4154e38c803c3fe3d6b3f3a0666&=', 
    'https://media.discordapp.net/attachments/1161317907406540830/1161323200622383154/latest.png?ex=6537e183&is=65256c83&hm=34b4daaee263ddc930bbfc7be13a46d8424225a767b7b3dac4564fd663fe76d2&=', 
    'https://media.discordapp.net/attachments/1161317907406540830/1161323348446412890/arman.png?ex=6537e1a6&is=65256ca6&hm=02c4db0d593974a3927ae54fce30c2c42fcc084aa5929f160befeb26a1477a1a&='
];
let pokeColors = [
    0xEE99AC, 
    0x9E7F9B, 
    0xFEBEA7, 
    0x3D2C22, 
    0x201F26, 
    0xA54546, 
    0xA35D2A, 
    0x0F0F0F, 
    0x384289
];
let index;
let pokeSpawn = false;
let pokeTrainer;
let pokeChannel = '953806215052427335';
let pokeObject = {};
let pokeLevel;
let pokeIV;
let pokeCount;
let pokeArray;
let names = [];
// Make pokemon an object instead of a bunch of fucking variables, dumbass

const uri = 'mongodb+srv://wyattbetz:MwCujESgESRcssxI@cluster0.hkykdab.mongodb.net/?retryWrites=true&w=majority';
const dbclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function makePokemon(userID) {
    pokeObject = {
        userId: userID,
        name: pokeNames[index],
        color: pokeColors[index],
        image: pokeImages[index],
        level: pokeLevel,
        iv: pokeIV,
        pokemonID: index
    };
}

function spawnPokemon() {
    index = Math.floor(Math.random() * pokeNames.length);
    pokeLevel = Math.ceil(Math.random() * 100);
    pokeIV = Math.ceil(Math.random() * 100) + '.' + Math.ceil(Math.random() * 100);
    pokeArray = pokeNames[index].toLowerCase().split(' ');
    pokeArray.push(pokeNames[index].toLowerCase());
    caught.setColor(pokeColors[index]);
    troll.setImage(pokeImages[index]);
    troll.setColor(pokeColors[index]);
    pokeSpawn = true;
    client.channels.cache.get(pokeChannel).send({ embeds: [troll] });
    
}

async function saveObjectToMongoDB(userId) {
  try {
    await dbclient.connect();
    console.log('Connected to MongoDB');

    const databaseName = 'pokemon';
    const database = dbclient.db(databaseName);
    console.log(`Selected database: ${databaseName}`);

    const collectionName = 'pokellection';
    const collection = database.collection(collectionName);
    console.log(`Selected collection: ${collectionName}`);

    makePokemon(userId);

    const result = await collection.insertOne(pokeObject);
    console.log('Object saved to MongoDB:', result);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await dbclient.close();
    console.log('Disconnected from MongoDB');
  }
}

async function getPokemon(userId,) {
    pokeCount = 0;
    names = [];
    try {
      await dbclient.connect();
      console.log('Connected to MongoDB');
  
      

      const databaseName = 'pokemon';
      const database = dbclient.db(databaseName);
      console.log(`Selected database: ${databaseName}`);
  
      const collectionName = 'pokellection';
      const collection = database.collection(collectionName);
      console.log(`Selected collection: ${collectionName}`);
  
      const query = { userId: userId };
      const cursor = collection.find(query);
  
      await cursor.forEach(document => {
        pokeCount += 1;
        const name = document.name; // Replace 'name' with the actual field name
        console.log('Name:', name);
        names.push(pokeCount + ': ' + name + '\n');
      });
  
    } catch (err) {
      console.error('Error:', err);
    } finally {
      await dbclient.close();
      console.log('Disconnected from MongoDB');
    }
  }




function despawnPokemon() {
    pokeSpawn = false;
    client.channels.cache.get(pokeChannel).send({ embeds: [ranAway] });
}




function showTime() {
    let dateTime = new Date();
    let dateDate = new Date();
    let five = Math.ceil(Math.random() * 100000);

    date = dateDate.toLocaleDateString();
    time = dateTime.toLocaleTimeString('en-US', {
        hour12: false,
    });
    
    

    // Five Chat
    if (five === 80085) {
        client.channels.cache.get("727403653916524625").send("5");
    }

    // Goodnight Script
    if (time.substring(0, 5) == "21:15") {
        client.channels.cache.get("510183909699485701").send('Goodnight');
        setTimeout(showTime, 100000);
    } else if (time.substring(0, 5) == "06:30") {
        if (date.substring(0, 2) == "12" && parseInt(date.substring(3, 5)) <= 25) {
            client.channels.cache.get("510183909699485701").send('https://cdn.discordapp.com/attachments/513890573745258513/1037476175259381792/Good_Morning.mp4');
            setTimeout(showTime, 100000);
        } else {
            client.channels.cache.get("510183909699485701").send('https://cdn.discordapp.com/attachments/513890573745258513/1021590495241183262/Good_Morning.mp4');
            setTimeout(showTime, 100000);
        }
    } else {
        setTimeout(showTime, 3000);    
    }
}



var speak = false;



client.once('ready', () => {
    console.log('AssLogan is online!');
    
    const CLIENT_ID = client.user.id;

    mongoose.connect(process.env.MONGO_URI, {
        keepAlive: true
    });

    showTime();

    client.user?.setPresence({
        status: 'online', 
        activities: [
            {
                name: 'with your balls',
            },
        ],
    });

    const rest = new REST({
        version: '9'
    }).setToken(process.env.TOKEN);

    (async () => {
        try {
            if (process.env.ENV === 'production') {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                });
                console.log("Successfully registered commands globally.");
            } else {
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                    body: commands
                });
                console.log("Successfully registered commands locally.");
            }
        } catch (err) {
            if (err) console.error(err);
        }
    })();
});


client.on(Events.MessageCreate, async (msg) => {

    

    // Determines if a pokemon will spawn or not
    let poke = Math.ceil(Math.random() * 60);
    // Pokecord Script
    if (poke === 55 || msg.content === 'flagellinator') {
        spawnPokemon();
        setTimeout(despawnPokemon, 86400000)
    }

    // All pokecord catch commands
    if (msg.content.toLowerCase().startsWith('<@609094925832945674> c')) {
        console.log(msg.content.slice(24));
        if (String(msg.channel.id) === pokeChannel) {
            if (pokeSpawn) {
                if (pokeArray.includes(msg.content.toLowerCase().slice(24))) {
                    if (msg.author.id === '852609078219767848') {
                        badCatch.setDescription('You threw the Pokéball at the Pokémon, but it didn\'t seem to work...\n> **Just be better I guess.**');
                        return msg.reply({ embeds: [badCatch], allowedMentions: { repliedUser: false} });
                    }
                    pokeTrainer = ('<@' + (msg.author.id) + '>');
                    caught.setDescription('**Name**: ' + pokeNames[index] + '\n**Level**: ' + pokeLevel + '\n**IV Percent**: ' + pokeIV + '%\n\nCongratulations ' + pokeTrainer + '!');
                    console.log(pokeTrainer);
                    pokeSpawn = false;
                    saveObjectToMongoDB(msg.author.id);
                    return msg.reply({ embeds: [caught], allowedMentions: { repliedUser: false} });
                    
                } else {
                    badCatch.setDescription('The great Pokédex says you\'re wrong.\n> **Check Pokémon name or spelling.**');
                    return msg.reply({ embeds: [badCatch], allowedMentions: { repliedUser: false} });
                }
            } else {
                badCatch.setDescription('You\'re here! But Pokémon are not.\n> **Wait for a Pokémon to spawn.**');
                return msg.reply({ embeds: [badCatch], allowedMentions: { repliedUser: false} });
            }
        } else {
            badCatch.setDescription('You can\'t catch here—at least not yet.\n> **Catch in spawn channels or create new ones.**');
            return msg.reply({ embeds: [badCatch], allowedMentions: { repliedUser: false} });
        }
    }

    // Pokecord help commands
    if (msg.content.toLowerCase() === '<@609094925832945674> pokemon') {
        await getPokemon(msg.author.id, msg.author.username);
        displayPokemon
            .setTitle(msg.author.username + '\'s Pokémon Collection')
            .setDescription('You have ' + pokeCount + ' Pokémon.\n' + names.join(''));
        return msg.reply({ embeds: [displayPokemon], allowedMentions: { repliedUser: false} });
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        if (err) console.error(err);

        await interaction.reply({
            content: "An error occurred while executing that command.",
            ephemeral: true
        });
    }
})

client.login(process.env.TOKEN);