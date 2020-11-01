import discord
import os
from discord.ext import commands
from discord.utils import get

intents = discord.Intents.all()
client = commands.Bot(command_prefix='$', intents=intents)
client.description = "Bot for the CE Discord Server"


@client.event
async def on_ready():
    print("Der CE-Bot {0.user} hat sich eingeloggt. ~Niklas".format(client))
    await client.change_presence(activity=discord.Activity(type=discord.ActivityType.listening, name="for commands"))


@client.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.CommandNotFound):
        await ctx.send("So ein Befehl existiert nicht.")


@client.event
async def on_member_join(member):
    print("new member " + str(member))
    ce_guild = member.guild
    ce_welcome_channel = get(ce_guild.channels, name="willkommen")
    await ce_welcome_channel.send(
        "Willkommen " + str(member) + "! Ich bin der CE Hausbot und zu deinen Diensten. "
        "Ändere gerne deinen Spitznamen zu einem besser zuzuordnenden Namen! "
        "Dieser Bot kann dir mit $ersti [master]  deine Rolle als neuer Ce-(Master) Student geben!")


@client.event
async def on_member_update(before, after):
    ce_guild = after.guild
    print(str(after) + " changed")


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


for filename in os.listdir('./Cogs'):
    if filename.endswith('.py'):
        client.load_extension(f'Cogs.{filename[:-3]}')


# https://discordapp.com/oauth2/authorize?&client_id=701834228031291443&scope=bot
client.run("NzAxODM0MjI4MDMxMjkxNDQz.Xp3QDw.jWDD6E-5CznPDjkw84c7vg7CX_Y")
