const { SlashCommandBuilder } = require('@discordjs/builders');
const { generateDependencyReport, getVoiceConnection, AudioPlayerStatus, entersState, joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus } = require('@discordjs/voice');
const { ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('smosh')
        .setDescription('SMOSH FOUND DEAD')
        .addChannelOption((option) =>
            option
                .setName('channel')
                .setDescription('Where')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice)
        ),
        execute: async (interaction, client) => {
            if (interaction.isChatInputCommand()) {
                if (interaction.commandName === 'smosh') {
                    
                    interaction.reply({
                        content: 'ok',
                    });

                    const voiceChannel = interaction.options.getChannel('channel');
                    
                    const voiceConnection = joinVoiceChannel({
                        channelId: voiceChannel.id,
                        guildId: interaction.guildId,
                        adapterCreator: interaction.guild.voiceAdapterCreator,
                    })

                    const connection = getVoiceConnection(interaction.guildId);

                    const player = createAudioPlayer();
                    const smosh = createAudioResource('G:\\SMOSH FOUND DEAD (1).mp3');
                    
                    try {
                        await entersState(voiceConnection, VoiceConnectionStatus.Ready, 5000);
                        console.log("Connected: " + voiceChannel.guild.name);
                    } catch (error) {
                        console.log("Voice Connection not ready within 5s.", error);
                        return null;
                    }

                    connection.subscribe(player);

                    player.play(smosh);

                    player.on('error', error => {
                        console.error(`Error: ${error.message} with resource`);
                    })
                }
            }
        },

        
};