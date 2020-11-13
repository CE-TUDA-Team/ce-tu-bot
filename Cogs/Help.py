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
        msg="""Derzeit verfügbare Rollen: \
            Per Bot:
                `$ersti`
                `$ersti Master`
                `$vertiefung BI`  ----- (Bauingenieurwesen)
                `$vertiefung EtIt` ----- (Elektrotechnik-Informationstechnik)
                `$vertiefung Info` ----- (Informatik)
                `$vertiefung MB` ----- (Maschinenbau)
                `$vertiefung MM` ----- (Mathe/Mechanik)
                `$vertiefung SV` ----- (Strömung-Verbrennung)
                `$vertiefung Rob` ----- (Computational_Robotics)
                `$gast`
                `$semester 1` ----- beliebige Zahl
                `$master`

            Per  Admin:
                Gaming
                Gesellschaftsspiele"""
        await ctx.send(msg)


def setup(client):
    client.add_cog(Help(client))
