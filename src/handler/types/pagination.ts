import { EmbedBuilder ,ActionRowBuilder, AnyComponentBuilder} from "discord.js";

export async function paginationEmbed (
    interaction:any,
    pages:any[],
    buttonList:any,
    timeout:any=200000,
  ):Promise<any> {
    if (!pages) throw new Error("Pages are not given.");
    if (!buttonList) throw new Error("Buttons are not given.");
    if (buttonList[0].style === "LINK" || buttonList[1].style === "LINK")
      throw new Error(
        "Link buttons are not supported with discordjs-button-pagination"
      );
    if (buttonList.length !== 2) throw new Error("Need two buttons.");
  
    let page = 0;
  
    const row = new ActionRowBuilder().addComponents(buttonList);
  
    //has the interaction already been deferred? If not, defer the reply.
    if (interaction.deferred == false) {
      await interaction.deferReply();
    }
  
    const curPage = await interaction.editReply({
      embeds: [pages[page].setFooter({ text: `Page ${page + 1} / ${pages.length}` })], 
      components: [row],
      fetchReply: true,
    });
  
    const filter = (i:any) =>
      i.customId === 'previous' ||
      i.customId === 'next';
    

    const collector = await curPage.createMessageComponentCollector({
      filter,
      time: timeout,
    });
  
    collector.on("collect", async (i:any) => {
      switch (i.customId) {
        case 'previous':
          page = page > 0 ? --page : pages.length - 1;
          break;
        case 'next':
          page = page + 1 < pages.length ? ++page : 0;
          break;
        default:
          break;
      }
      await i.deferUpdate();
      await i.editReply({
        embeds: [pages[page].setFooter({ text: `Page ${page + 1} / ${pages.length}` })],
        components: [row],
      });
      collector.resetTimer();
    });
  
    collector.on("end", (_:any, reason:any) => {
      if (reason !== "messageDelete") {
        const disabledRow = new ActionRowBuilder().addComponents(
          buttonList[0].setDisabled(true),
          buttonList[1].setDisabled(true)
        );
        curPage.edit({
          embeds: [pages[page].setFooter({ text: `Page ${page + 1} / ${pages.length}` })],
          components: [disabledRow],
        });
      }
    });
    return curPage;
  };
