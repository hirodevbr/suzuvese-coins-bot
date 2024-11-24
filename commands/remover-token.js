const { SlashCommandBuilder } = require('discord.js');
const { getSaldo, setSaldo } = require('../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remover-token')
        .setDescription('Remove tokens de um usuário.')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('O usuário do qual os tokens serão removidos.')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('Quantidade de tokens a remover.')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('usuario');
        const quantidade = interaction.options.getInteger('quantidade');

        const userSaldo = getSaldo(user.id);

        if (quantidade <= 0) {
            return interaction.reply({ content: 'A quantidade deve ser maior que zero.', ephemeral: true });
        }

        if (quantidade > userSaldo) {
            return interaction.reply({ content: 'O usuário não tem saldo suficiente.', ephemeral: true });
        }

        setSaldo(user.id, userSaldo - quantidade);

        await interaction.reply(`${quantidade} tokens foram removidos de ${user}.`);
    },
};
