import datetime

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
    async def gast(self, ctx):
        await ctx.send(f"Hallo Gast!")
        guest_role = get(ctx.guild.roles, name="Gast")
        await ctx.author.add_roles(guest_role)

    @commands.command()
    @commands.guild_only()
    async def vertiefung(self, ctx, richtung: str = None):
        vertiefungsrollen = []
        for role in ctx.guild.roles:
            if role.name.startswith("Vertiefung"):
                vertiefungsrollen.append(role.name.lower())
        if richtung.lower() == "bi":
            richtung = "Bauingenieurwesen"
        elif richtung.lower() == "etit":
            richtung = "Elektrotechnik-Informationstechnik"
        elif richtung.lower() == "info":
            richtung = "Informatik"
        elif richtung.lower() == "mb":
            richtung = "Maschinenbau"
        elif richtung.lower() == "mm":
            richtung = "Mathe/Mechanik"
        elif richtung.lower() == "sv":
            richtung = "Strömung-Verbrennung"
        elif richtung.lower() == "rob":
            richtung = "Computational_Robotics"
        elif richtung.lower() == "robotics":
            richtung = "Computational_Robotics"

        if ("vertiefung " + richtung.lower() not in vertiefungsrollen) or (richtung is None):
            await ctx.send("Bitte wähle zwischen: "
                           "Bauingenieurwesen, Elektrotechnik-Informationstechnik, Informatik, Maschinenbau, Mathe/Mechanik"
                           " oder im Master: "
                           "Strömung-Verbrennung und Computational_Robotics "
                           "Mögliche Abkürzungen: BI, EtIt, Info, MB, , MM, SV, Robotics")
        else:
            for role in ctx.guild.roles:
                if "vertiefung " + richtung.lower() == role.name.lower():
                    await ctx.author.add_roles(role)
                    await ctx.send("Du erhälst die Rolle: Vertiefung " + richtung)
                    return

    @commands.command()
    @commands.guild_only()
    async def semester(self, ctx, num: int = -1):
        for role in ctx.author.roles:
            if f"Sem{num}" == str(role) or (num >= 5 and f"Sem5+" == str(role)):
                await ctx.send("Du besitzt diese Rolle schon.")
                return
        if num <= 0:
            await ctx.send("Bitte gib ein Bachelor-Semester ab 1 an.")
        elif num == 1:
            role = get(ctx.guild.roles, name="Sem1")
            await ctx.author.add_roles(role)
            await ctx.send("Du erhälst die Rolle: Semester 1")
        elif num == 2:
            role = get(ctx.guild.roles, name="Sem2")
            await ctx.author.add_roles(role)
            await ctx.send("Du erhälst die Rolle: Semester 2")
        elif num == 3:
            role = get(ctx.guild.roles, name="Sem3")
            await ctx.author.add_roles(role)
            await ctx.send("Du erhälst die Rolle: Semester 3")
        elif num == 4:
            role = get(ctx.guild.roles, name="Sem4")
            await ctx.author.add_roles(role)
            await ctx.send("Du erhälst die Rolle: Semester 4")
        elif num >= 5:
            role = get(ctx.guild.roles, name="Sem5+")
            await ctx.author.add_roles(role)
            await ctx.send("Du erhälst die Rolle: Semester 5+")

    @commands.command()
    @commands.guild_only()
    async def master(self, ctx):
        role = get(ctx.guild.roles, name="Master")
        await ctx.author.add_roles(role)
        await ctx.send("Du erhälst die Rolle: Master")

    @commands.command()
    @commands.guild_only()
    async def gesellschaftsspiele(self, ctx):
        role = get(ctx.guild.roles, name="Gesellschaftsspiele")
        await ctx.author.add_roles(role)
        await ctx.send("Alle sehen jetzt, dass du zumindest gerne am Tisch spielen würdest.")

    @commands.command()
    @commands.guild_only()
    async def gaming(self, ctx):
        role = get(ctx.guild.roles, name="Gaming")
        await ctx.author.add_roles(role)
        await ctx.send("Alle sehen jetzt, dass du ein begeisterter Gamer bist.")

    @commands.command()
    @commands.guild_only()
    async def gastSem(self, ctx, num: int = -1):
        for role in ctx.author.roles:
            if f"Gast_Sem{num}" == str(role) or (num >= 5 and f"Gast_Sem5+" == str(role)):
                await ctx.send("Du besitzt diese Rolle schon.")
                return
        if num <= 0:
            await ctx.send("Bitte gib ein Bachelor-Semester ab 1 an.")
        elif num == 1:
            role = get(ctx.guild.roles, name="Gast_Sem1")
            await ctx.author.add_roles(role)
            await ctx.send("Du erhälst die temporäre Rolle: Gast_Semester 1")
        elif num == 2:
            role = get(ctx.guild.roles, name="Gast_Sem2")
            await ctx.author.add_roles(role)
            await ctx.send("Du erhälst die temporäre Rolle: Gast_Semester 2")
        elif num == 3:
            role = get(ctx.guild.roles, name="Gast_Sem3")
            await ctx.author.add_roles(role)
            await ctx.send("Du erhälst die temporäre Rolle: Gast_Semester 3")
        elif num == 4:
            role = get(ctx.guild.roles, name="Gast_Sem4")
            await ctx.author.add_roles(role)
            await ctx.send("Du erhälst die temporäre Rolle: Gast_Semester 4")
        elif num >= 5:
            role = get(ctx.guild.roles, name="Gast_Sem5+")
            await ctx.author.add_roles(role)
            await ctx.send("Du erhälst die temporäre Rolle: Gast_Semester 5+")

    """
    @commands.command()
    @commands.guild_only()
    async def spielen(self, ctx):
        role = get(ctx.guild.roles, name="Gesellschaftsspiele")
        await ctx.author.add_roles(role)
        await ctx.send("Du erhälst die Rolle für Gesellschaftsspiele")

    @commands.command()
    @commands.guild_only()
    async def lernen(self, ctx):
        role = get(ctx.guild.roles, name="Gesellschaftsspiele")
        await ctx.author.remove_roles(role)
        await ctx.send("Du erhälst die Rolle für Gesellschaftsspiele")

    @commands.command(hidden=True)
    @commands.guild_only()
    async def spieleabend(self, ctx):
        admin_role = get(ctx.guild.roles, name="admin")
        if ctx.author.top_role == admin_role:
            role = get(ctx.guild.roles, name="Gesellschaftsspiele")
            for member in ctx.guild.members:
                await member.add_roles(role)
            await ctx.send("Alle Mitglieder können nun Teil am Spieleabend haben.")
        else:
            await ctx.send("Du besitzt nicht die Berechtigung diesen Befehl auszuführen!")

    @commands.command(hidden=True)
    @commands.guild_only()
    async def spieleabendende(self, ctx):
        admin_role = get(ctx.guild.roles, name="admin")
        if ctx.author.top_role == admin_role:
            role = get(ctx.guild.roles, name="Gesellschaftsspiele")
            for member in ctx.guild.members:
                await member.remove_roles(role)
            await ctx.send("Alle Mitglieder sind nun fertig mit Spieleabend.")
        else:
            await ctx.send("Du besitzt nicht die Berechtigung diesen Befehl auszuführen!")
    """


def setup(client):
    client.add_cog(Roles(client))
