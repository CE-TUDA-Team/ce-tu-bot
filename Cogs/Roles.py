import os

from discord.ext import commands
from discord.utils import get


class Roles(commands.Cog):

    def __init__(self, client):
        self.client = client

    @commands.Cog.listener()
    async def on_ready(self):
        print('Roles Commands is online')

    # how to set signature? - for help
    @commands.command()
    @commands.guild_only()
    async def ersti(self, ctx, master=None):
        await ctx.send(f"Willkommen auf {ctx.guild}, du erhältst alle Erstsemestler Rollen.")
        ersti_role = get(ctx.guild.roles, name="Ersti")
        await ctx.author.add_roles(ersti_role)
        if master == 'master':
            await ctx.send(f"Willkommen im ersten Master Semester")
            master_role = get(ctx.guild.roles, name="Master")
            await ctx.author.add_roles(master_role)
        elif master is None:
            await ctx.send(f"Willkommen im ersten Bachelor Semester")
            sem1_role = get(ctx.guild.roles, name="Sem1")
            await ctx.author.add_roles(sem1_role)

    @commands.command()
    @commands.guild_only()
    async def vertiefung(self, ctx, richtung: str = None):
        vertiefungsrollen = []
        for role in ctx.guild.roles:
            if role.name.startswith("Vertiefung"):
                vertiefungsrollen.append(role.name.lower())
        if richtung == "BI":
            richtung = "Bauingenieurwesen"
        elif richtung == "EtIt":
            richtung = "Elektrotechnik-Informationstechnik"
        elif richtung == "Info":
            richtung = "Informatik"
        elif richtung == "MB":
            richtung = "Maschinenbau"
        elif richtung == "MM":
            richtung = "Mathe/Mechanik"
        elif richtung == "Robotics":
            richtung = "Computational_Robotics"

        if ("vertiefung " + richtung.lower() not in vertiefungsrollen) or (richtung is None):
            await ctx.send("Bitte wähle zwischen: "
                           "Bauingenieurwesen, Elektrotechnik-Informationstechnik, Informatik, Maschinenbau, Mathe/Mechanik"
                           " oder im Master: "
                           "Strömung-Verbrennung und Computational_Robotics "
                           "Mögliche Abkürzungen: BI, EtIt, Info, MB, , MM, Robotics")
        else:
            for role in ctx.guild.roles:
                if "vertiefung " + richtung.lower() == role.name.lower():
                    await ctx.author.add_roles(role)
                    await ctx.send("Du erhälst die Rolle: Vertiefung " + richtung)
                    return

    @commands.command()
    @commands.guild_only()
    async def semester(self, ctx, num: int = -1):
        # TODO add semester role
        pass


def setup(client):
    client.add_cog(Roles(client))
