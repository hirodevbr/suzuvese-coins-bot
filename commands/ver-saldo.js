const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { getSaldo } = require('../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ver-saldo')
        .setDescription('Verifica o saldo de tokens de outro usuário (somente administradores).')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('O usuário cujo saldo será verificado.')
                .setRequired(true)),
    async execute(interaction) {
        // Verificar se o usuário tem permissões de administrador
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: 'Você não tem permissão para usar este comando.',
                ephemeral: true,
            });
        }

        const user = interaction.options.getUser('usuario');
        const saldo = getSaldo(user.id);

        await interaction.reply(`O saldo de ${user} é de ${saldo} tokens.`);
    },
};
