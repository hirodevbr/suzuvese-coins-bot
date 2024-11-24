const { SlashCommandBuilder } = require('discord.js');
const { loadDatabase } = require('../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank-tokens')
        .setDescription('Mostra o ranking dos 10 usuários com mais tokens.'),
    async execute(interaction) {
        const database = loadDatabase();

        // Ordenar os usuários pelo saldo em ordem decrescente
        const sortedUsers = Object.entries(database)
            .sort(([, saldoA], [, saldoB]) => saldoB - saldoA)
            .slice(0, 10); // Pegando os 10 primeiros

        if (sortedUsers.length === 0) {
            return interaction.reply('Não há usuários no banco de dados.');
        }

        // Construir a mensagem de ranking
        const rankMessage = sortedUsers
            .map(([userId, saldo], index) => `${index + 1}. <@${userId}> - ${saldo} tokens`)
            .join('\n');

        await interaction.reply({
            content: `🏆 **Ranking de Tokens**:\n\n${rankMessage}`,
            allowedMentions: { users: [] }, // Evitar pings automáticos
        });
    },
};
