require('dotenv').config();
import 'reflect-metadata';
import { registerCommands, registerEvents } from './utils/registry';
import DiscordClient from './client/client';
import { IntentsBitField } from 'discord.js';
import { createConnection } from 'typeorm';

const _intents: IntentsBitField = new IntentsBitField([3276799]); // https://discord-intents-calculator.vercel.app/
const client = new DiscordClient({ intents: _intents });


(async () => {
  client.prefix = process.env.DISCORD_PREFIX || client.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DISCORD_TOKEN);
  await createConnection({
    type: 'mysql',
    host: '192.168.86.40',
    port: 3306,
    username: 'Admin',
    password: 'Shellshocker93',
    database: 'Helix-Bot-Service-Test',
  });
})();

