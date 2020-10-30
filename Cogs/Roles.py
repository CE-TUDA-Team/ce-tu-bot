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
        await ctx.send(f"Willkommen auf {ctx.guild}, du erhälst alle Erstsemestler Rollen.")
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


def setup(client):
    client.add_cog(Roles(client))
