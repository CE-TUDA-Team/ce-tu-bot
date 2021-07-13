import os

import discord
from discord.ext import commands


# TODO Spamschutz und ähnliches
class Help(commands.Cog):

    def __init__(self, client):
        self.client = client

    @commands.Cog.listener()
    async def on_ready(self):
        print('Help Commands is online')
        return

    @commands.command()
    @commands.has_role('Team')
    async def hilfe_embed(self, ctx, channel: discord.TextChannel = None):
        embed = discord.Embed(title="CE Bot Befehle",
                              description="Aufzählung der Befehle unseres CE Bots",
                              color=discord.Color.blue())
        embed.add_field(name="Erklärung",
                        value="Der CE Bot verteilt automatisiert Rollen, sodass du nicht eine Vielzahl an Kanälen "
                              "siehst und besser die Übersicht behalten kannst." + os.linesep +
                              "Auf der linken Seite sind Befehle in Anführungszeichen aufgeführt, "
                              "diese bestehen teilweise aus mehreren durch Lehrzeichen getrennten "
                              "Zeilen und variablen Zahlen. "
                              "Links des Gedankenstrichs ist die Erklärung für den Befehl.",
                        inline=False)
        embed.add_field(name="Befehle für Rollen für neuen Studenten",
                        value="'$ersti'  -  Rolle für Bachelor Erstsemestler" + os.linesep +
                              "'$ersti Master'  -  Rolle für Master & Erstsemestler",
                        inline=False)
        embed.add_field(name="Befehle für Rollen des Bachelor-Semesters",
                        value="'$semester 1'  -  Erstes Semester" + os.linesep +
                              "'$semester n'  -  n.tes Semester" + os.linesep +
                              "'$sem n'  -  n.tes Semester",
                        inline=False)
        embed.add_field(name="Befehle für Rollenveränderungen im Bachelor",
                        value="'$nextsem'  -  Rolle für das nächste Semester" + os.linesep +
                              "'$noersti'  -  Entfernen der Ersti Rolle",
                        inline=False)
        embed.add_field(name="Befehle für Rollen für Master Studenten",
                        value="'$master'  -  Rolle für Master Studenten",
                        inline=False)
        embed.add_field(name="Befehle für Rollen zu Vertiefungsrichtungen",
                        value="'$vertiefung BI'  -  Rolle für Vertiefung Bauingenieurwesen" + os.linesep +
                              "'$vertiefung EtIt'  -  Rolle für Vertiefung Elektrotechnik-Informationstechnik" + os.linesep +
                              "'$vertiefung Info'  -  Rolle für Vertiefung Informatik" + os.linesep +
                              "'$vertiefung MB'  -  Rolle für Vertiefung Maschinenbau" + os.linesep +
                              "'$vertiefung MM'  -  Rolle für Vertiefung Mathe/Mechanik" + os.linesep +
                              "'$vertiefung SV'  -  Rolle für Vertiefung Strömung-Verbrennung" + os.linesep +
                              "'$vertiefung Rob'  -  Rolle für Vertiefung Computational_Robotics",
                        inline=False)
        embed.add_field(name="Andere Befehle für Rollen",
                        value="'$gast'  -  Rolle für Gast" + os.linesep +
                              "'$gesellschaftsspiele'  -  Rolle für Gesellschaftsspieler" + os.linesep +
                              "'$gaming'  -  Rolle für Gaming Interessierte",
                        inline=False)
        if channel is not None:
            await channel.send(embed=embed)
        else:
            await ctx.send(embed=embed)

    @commands.command()
    async def hilfe(self, ctx):
        msg = """Derzeit verfügbare Rollen:
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

    @commands.command()
    @commands.guild_only()
    @commands.has_any_role('Fachschaft', 'Team')
    async def send_embed_fs(self, ctx, title, text, channel: discord.TextChannel = None, url=None):
        embed = discord.Embed(title=title, url=url,
                              description=text,
                              color=0x3572AC).set_author(name="Fachschaft",
                                                         url="https://www.ce.tu-darmstadt.de/ce/studienbereich_ce/organisation_2/fachschaft_ce/index.de.jsp",
                                                         icon_url=ctx.guild.icon_url)
        if channel is not None:
            await channel.send(embed=embed)
        else:
            await ctx.send(embed=embed)

    @commands.command()
    @commands.guild_only()
    @commands.has_any_role('Fachschaft', 'Team')
    async def send_embed(self, ctx, title, text, channel: discord.TextChannel = None, url=None):
        if url is not None:
            embed = discord.Embed(title=title, url=url,
                                  description=text,
                                  color=0x3572AC)
        else:
            embed = discord.Embed(title=title,
                                  description=text,
                                  color=0x3572AC)
        if channel is not None:
            await channel.send(embed=embed)
        else:
            await ctx.send(embed=embed)


def setup(client):
    client.add_cog(Help(client))
