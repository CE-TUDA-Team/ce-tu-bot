import discord
from discord.utils import get


class MyClient(discord.Client):
    # connection to discord
    client = discord.Client()

    # Register an event for login
    @client.event
    async def on_ready(self):
        print("ready")

    # Register an event for sent messages
    @client.event
    async def on_message(self, message):
        print("message")

    @client.event
    async def on_member_join(self, member):
        print("new member " + str(member))
        ce_guild = get(client.guilds, name="CE")
        ce_welcome_channel = get(ce_guild.channels, name="willkommen")
        await ce_welcome_channel.send("Willkommen " + str(member) + "! Ich bin der CE Hausbot und zu deinen Diensten. " +
                                      "Ändere gerne deinen Spitznamen zu deinem echten Namen! "
                                      "Welche Veranstaltungen besuchst du? Schreib uns gerne deinen Studiengang und dein " +
                                      "Semester!")

    @client.event
    async def on_member_update(self, before, after):
        ce_guild = get(client.guilds, name="CE")
        ce_role = get(ce_guild.roles, name="CE")
        if ce_role not in before.roles and ce_role in after.roles:
            print(str(before) + " got the CE role")
            informatik_role = get(ce_guild.roles, name="informatik")
            mathe_role = get(ce_guild.roles, name="mathe")
            tm_role = get(ce_guild.roles, name="tm")
            etit_role = get(ce_guild.roles, name="etit")
            await before.add_roles(informatik_role)
            await before.add_roles(mathe_role)
            await before.add_roles(tm_role)
            await before.add_roles(etit_role)


# https://discordapp.com/oauth2/authorize?&client_id=701834228031291443&scope=bot
client = MyClient()
client.run("NzAxODM0MjI4MDMxMjkxNDQz.Xp6qDw.iyYLLQy0ZF8GGpO37HCpys2E2WQ")
