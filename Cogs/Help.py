import discord
from discord import Embed
from discord.ext import commands


class Help(commands.Cog):

    def __init__(self, client):
        self.client = client

    @commands.Cog.listener()
    async def on_ready(self):
        print('Help Commands is online')
        return

    @commands.command()
    async def hilfe(self, ctx):
        author = ctx.message.author
        print(author)
        hilfe_embed = Embed(title="Hilfe - Text", description="Hilfe-Text", color=discord.Color.blue())
        hilfe_embed.set_author('Niklas')
        hilfe_embed.add_field(name='Ersti', value='Command to receive roles for the first semester.')
        await author.send(embed=hilfe_embed)


def setup(client):
    client.add_cog(Help(client))
