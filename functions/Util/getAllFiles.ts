import fs from 'fs'
import path from 'path'
const getAllFiles = (path1: any, foldersOnly: boolean = false) => {
    const files = fs.readdirSync(path1, {
        withFileTypes: true,
    });
    let filesFound: any[] = [];
    for (const file of files) {
        const filePath = path.join(path1, file.name);
        if (file.isDirectory()) {
            if (foldersOnly) {
                filesFound.push(filePath);
            }
            else {
                filesFound = [...filesFound, ...getAllFiles(filePath)];
            }
            continue;
        }
        filesFound.push(filePath);
    }
    return filesFound;
};
export default getAllFiles

//Note: path1 is your _dirname, you'll need folderOnly: true only when you're making an eventHandler.
// const path1 = path.join(__dirname, 'commands')
// const files = getAllFiles(path1, true) // returns an Array<string>
// For example = returned: ["ready", "interactionCreate", "messageCreate", "error", "log", "messageUpdate", "channelCreate", "guildMemberUpdate"]   