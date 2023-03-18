//Note: I expect you to have "Messagepagination" function in the same folder as this function, if not, kindly change the import path for "Messagepagination".
import { ColorResolvable, EmbedAuthorOptions, EmbedBuilder, EmbedFooterData, Message } from "discord.js";
import { Messagepagination } from "./pagination";
/**
 * A basic pagination code!
 * 
 * @param MappedData {Array<any>}
 * ```javascript
 * // This is an example data.
    const data = [
        {Count: "1"},
        {Count: "2"},
        {Count: "3"},
    ]    
    // This is how MappedData should look like when you're calling this function.              
    const MappedData = data.map((a) => {
        return `Number: ${a.Count}`        
    })
    // "a" here is a single object/value from your data array.
    // In the example data array, i had objects which had "Count" as a value, your data values will be different so do it accordingly
 * ```
    
    @param message {Message} - Discord.js Message.
    @param time {number} - Time in milliseconds.
    @param Max_Desc_Per_Page {number} - Max description to set per page.
    @param Embed_Configs
    - ```javascript    
        new EmbedBuilder()
        .setAuthor(...)
        .setDescription(`${chunks.join("\n\n")}`) //You cannot make changes to this.
        .setFooter(...)
        .setTitle(...)
        .setColor(...) 
        .setImage(...)       
        .setThumbnail(...)
    ```
 */
export async function Datapagination(MappedData: Array<any>, message: Message, time: number, Max_Desc_Per_Page: number, Embed_Configs: { AuthorOptions?: EmbedAuthorOptions, FooterOptions?: EmbedFooterData, Color: ColorResolvable, Title?: string, Image?: string, Thumbnail?: string}) {
    if (time < 30000) throw new Error(`>Pagination- Time must be greater than 30 seconds (30000 milliseconds)`)
    if (Max_Desc_Per_Page <= 0) throw new Error(">Pagination- Max Description should be equal to or more than 1!")
    const { AuthorOptions, FooterOptions, Title, Color, Image, Thumbnail} = Embed_Configs
    function chunkify(arr: Array<any>, len: number) {
        let chunks = [];
        let i = 0;
        let n = arr.length;
        while (i < n) {
            chunks.push(arr.slice(i, (i += len)));
        }
        return chunks;
    }
    const chunks = chunkify(MappedData, Max_Desc_Per_Page);
    const pages: Array<any> = [];
    chunks.forEach((chunk) => {
        const Embed = new EmbedBuilder()
        AuthorOptions ? Embed.setAuthor(AuthorOptions) : Embed
        FooterOptions ? Embed.setFooter(FooterOptions) : Embed
        Title ? Embed.setTitle(Title) : Embed
        Image ? Embed.setImage(Image) : Embed
        Thumbnail ? Embed.setThumbnail(Thumbnail): Embed
        pages.push(Embed.setDescription(chunk.join("\n\n")).setColor(Color));
    });
    await Messagepagination(message, pages, time).catch((err) => {
        console.log(err.message)
    })
}