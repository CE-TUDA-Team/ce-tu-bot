import discord
from discord.ext import commands
from discord.utils import get
import os
import logging

global ce_server

intents = discord.Intents.all()
client = commands.Bot(command_prefix='$', intents=intents, case_insensitive=True)
client.description = "Bot for the CE Discord Server"


@client.event
async def on_ready():
    global ce_server
    logger = logging.getLogger('discord')
    logger.setLevel(logging.DEBUG)
    handler = logging.FileHandler(filename='discord.log', encoding='utf-8', mode='w')
    handler.setFormatter(logging.Formatter('%(asctime)s:%(levelname)s:%(name)s: %(message)s'))
    logger.addHandler(handler)
    print("Der CE-Bot {0.user} hat sich eingeloggt. ~Niklas".format(client))

    # control message for admins at log in
    ce_server = get(client.guilds, name="Computational Engineering")
    admin_channel = get(ce_server.channels, name="logs")
    if is_on_heroku():
        await admin_channel.send("Bot ist online")
        await client.change_presence(activity=discord.Activity(type=discord.ActivityType.listening, name="for commands"))
        for i in ["1", "2", "3", "4", "5+"]:
            if get(ce_server.roles, name=f"Gast_Sem{i}") is not None:
                temp_role = get(ce_server.roles, name=f"Gast_Sem{i}")
                print("Die temporäre Rolle " + str(temp_role) + " wird von allen Mitgliedern entfernt.")
                for member in temp_role.members:
                    await member.remove_roles(temp_role)
    else:
        # await admin_channel.send("Bot in development")
        await client.change_presence(status=discord.Status.dnd)
        await client.change_presence(activity=discord.Activity(type=discord.ActivityType.listening, name=""))
        print("local")


@client.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.CommandNotFound):
        await ctx.send("So ein Befehl existiert nicht.")


@client.command()
async def reload(ctx, extension):
    if extension + '.py' not in os.listdir("Cogs"):
        await ctx.send("No such extension!")
    else:
        await ctx.send(f'{extension} was reloaded!')
        client.unload_extension(f'Cogs.{extension}')
        client.load_extension(f'Cogs.{extension}')


@client.command(signature="Unloads")
async def unload(ctx, extension):
    if extension + '.py' not in os.listdir("Cogs"):
        await ctx.send("No such extension!")
    else:
        await ctx.send(f'{extension} was unloaded!')
        client.unload_extension(f'Cogs.{extension}')


@client.command()
async def load(ctx, extension):
    if extension + '.py' not in os.listdir("Cogs"):
        await ctx.send("No such extension!")
    else:
        await ctx.send(f'{extension} was loaded!')
        client.load_extension(f'Cogs.{extension}')


def is_on_heroku():
    py_path = os.environ['PYTHONPATH']
    print("Python at Path " + py_path + " used.")
    if str(py_path) == '/app':
        return True
    else:
        return False


"""
Environment variables for heroku: environ({'PYTHONUNBUFFERED': 'true', 'LD_LIBRARY_PATH': '/app/.heroku/vendor/lib:/app/.heroku/python/lib:', 'PYTHONHOME': '/app/.heroku/python', 'LANG': 'en_US.UTF-8', 'DYNO': 'run.5497', 'PYTHONHASHSEED': 'random', 'FORWARDED_ALLOW_IPS': '*', 'PWD': '/app', 'DYNO_RAM': '512', 'HOME': '/app', 'PORT': '18718', 'LIBRARY_PATH': '/app/.heroku/vendor/lib:/app/.heroku/python/lib:', 'GUNICORN_CMD_ARGS': '--access-logfile -', 'TERM': 'xterm-256color', 'WEB_CONCURRENCY': '2', 'SHLVL': '1', 'PYTHONPATH': '/app', 'PATH': '/app/.heroku/python/bin:/usr/local/bin:/usr/bin:/bin', 'PS1': '\\[\\033[01;34m\\]\\w\\[\\033[00m\\] \\[\\033[01;32m\\]$ \\[\\033[00m\\]', '_': '/app/.heroku/python/bin/python'})
"""


for filename in os.listdir('./Cogs'):
    if filename.endswith('.py'):
        client.load_extension(f'Cogs.{filename[:-3]}')

# https://discordapp.com/oauth2/authorize?&client_id=701834228031291443&scope=bot
client.run("NzAxODM0MjI4MDMxMjkxNDQz.Xp3QDw.jWDD6E-5CznPDjkw84c7vg7CX_Y")
