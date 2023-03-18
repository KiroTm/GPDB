import { Message, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Interaction } from "discord.js"
export async function Messagepagination(message: Message, pages: EmbedBuilder[], time: number) {
    if (!pages) throw new Error("Provide atleast 2 pages!")
    if (pages.length === 1) {
        const page = await message.channel.send({
            embeds: pages,
            components: [],
        })
        return page
    } else {
        const prev = new ButtonBuilder()
            .setCustomId(`${message.id}prev`)
            .setEmoji(`◀️`)
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true)
        const next = new ButtonBuilder()
            .setCustomId(`${message.id}next`)
            .setEmoji(`▶️`)
            .setStyle(ButtonStyle.Primary)
            .setDisabled(false)

        const home = new ButtonBuilder()
            .setCustomId(`${message.id}home`)
            .setEmoji(`⏮️`)
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true)

        const end = new ButtonBuilder()
            .setCustomId(`${message.id}end`)
            .setEmoji(`⏭️`)
            .setStyle(ButtonStyle.Primary)
            .setDisabled(false)

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(home, prev, next, end);
        let index = 0;
        const currentpage = await message.channel.send({
            embeds: [pages[index].setFooter({ text: `Page ${index + 1} of ${pages.length}` })],
            components: [row]
        })
        const filter = (btn: Interaction) => {
            return btn.user.id === message.author.id
        }
        const collector = currentpage.createMessageComponentCollector({
            filter,
            time: time
        });
        collector.on('collect', async (i) => {
            if (i.customId === `${message.id}prev`) {
                if (index > 0) index--;
            } else if (i.customId === `${message.id}home`) {
                index = 0;
            } else if (i.customId === `${message.id}end`) {
                index = pages.length - 1;
            } else if (i.customId === `${message.id}next`) {
                if (index < pages.length - 1) index++;
            };

            if (index === 0) prev.setDisabled(true);
            else prev.setDisabled(false);

            if (index === 0) home.setDisabled(true);
            else home.setDisabled(false);

            if (index === pages.length - 1) next.setDisabled(true);
            else next.setDisabled(false);

            if (index === pages.length - 1) end.setDisabled(true);
            else end.setDisabled(false);
            // Now edit the embed based on it's index
            await currentpage.edit({
                embeds: [pages[index].setFooter({ text: `Page ${index + 1} of ${pages.length}` })],
                components: [row],
            }).then(async () => {
                await i.deferUpdate()
            });
        })
        // collector ends
        collector.on('end', async () => {
            row.components.forEach((c) => c.setDisabled(true))
            await currentpage.edit({
                embeds: [pages[index].setFooter({ text: `Page ${index + 1} of ${pages.length}` })],
                components: [row]
            });
        });
        // return the page currently being viewed after collector end
        return currentpage;
    }
}