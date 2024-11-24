const { SlashCommandBuilder } = require('discord.js');
const { getSaldo } = require('../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meu-saldo')
        .setDescription('Mostra o seu saldo de tokens.'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const saldo = getSaldo(userId);
        await interaction.reply(`Seu saldo atual é de ${saldo} tokens.`);
    },
};
