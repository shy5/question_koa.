import fs from 'fs'

export const getDirName = (dirpath) => {
    let dirData = []
    const dirList = fs.readdirSync(dirpath)
    if (dirList.length > 0) {
        dirList.map(dirname => {
            const state = fs.statSync(`${dirpath}/${dirname}`)
            if (state && state.isDirectory()) {
                dirData.push(dirname)
            }
        })
    }
    return dirData
}
