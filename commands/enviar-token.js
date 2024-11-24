const { SlashCommandBuilder } = require('discord.js');
const { getSaldo, setSaldo } = require('../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('enviar-token')
        .setDescription('Envia tokens para outro usuário.')
        .addUserOption(option =>
            option.setName('destinatario')
                .setDescription('O usuário que receberá os tokens.')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('Quantidade de tokens a enviar.')
                .setRequired(true)),
    async execute(interaction) {
        const senderId = interaction.user.id;
        const recipient = interaction.options.getUser('destinatario');
        const quantidade = interaction.options.getInteger('quantidade');

        const senderSaldo = getSaldo(senderId);

        if (quantidade <= 0) {
            return interaction.reply({ content: 'A quantidade deve ser maior que zero.', ephemeral: true });
        }

        if (quantidade > senderSaldo) {
            return interaction.reply({ content: 'Você não tem saldo suficiente.', ephemeral: true });
        }

        setSaldo(senderId, senderSaldo - quantidade);
        setSaldo(recipient.id, getSaldo(recipient.id) + quantidade);

        await interaction.reply(`${interaction.user} enviou ${quantidade} tokens para ${recipient}.`);
    },
};
