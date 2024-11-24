const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { getSaldo, setSaldo } = require('../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adicionar-token')
        .setDescription('Adiciona tokens ao saldo de um usuário (somente administradores).')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('O usuário que receberá os tokens.')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('Quantidade de tokens a adicionar.')
                .setRequired(true)),
    async execute(interaction) {
        // Verificar se o usuário tem permissões de administrador
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ 
                content: 'Você não tem permissão para usar este comando.', 
                ephemeral: true 
            });
        }

        const user = interaction.options.getUser('usuario');
        const quantidade = interaction.options.getInteger('quantidade');

        if (quantidade <= 0) {
            return interaction.reply({ 
                content: 'A quantidade deve ser maior que zero.', 
                ephemeral: true 
            });
        }

        const userSaldo = getSaldo(user.id);
        setSaldo(user.id, userSaldo + quantidade);

        await interaction.reply(`Adicionado ${quantidade} tokens ao saldo de ${user}.`);
    },
};
