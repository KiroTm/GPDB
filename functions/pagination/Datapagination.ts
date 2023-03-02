import { Message } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Messagepagination } from "./pagination";
export async function Datapagination(message: Message, time: Number) {
    const data = [
        {Count: "1"},
        {Count: "2"},
        {Count: "3"},
        {Count: "4"},
        {Count: "5"},
        {Count: "6"},
        {Count: "7"},
        {Count: "8"},
        {Count: "9"},
        {Count: "10"}
    ]
    // This is an example data.
    const MappedData = data.map((a) => {
        return `Number: ${a.Count}`
    })
    function chunkify(arr: Array<any>, len: number) {
        let chunks = [];
        let i = 0;
        let n = arr.length;

        while (i < n) {
            chunks.push(arr.slice(i, (i += len)));
        }

        return chunks;
    }
    const max_description = 6
    const chunks = chunkify(MappedData, max_description);
    const pages = [] as EmbedBuilder[];
    chunks.forEach((chunk) => {
        pages.push(
            new EmbedBuilder()
                .setTitle("Pagination:")
                .setColor('Random')
                .setDescription(chunk.join("\n\n"))
                .setFooter({
                    text: `Page 1 of 1`
                })
        );
    });
    await Messagepagination(message, pages, time)
}
// Check out "Messagepagination" file and add it to your code before you apply this.
