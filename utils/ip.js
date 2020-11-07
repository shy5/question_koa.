import os from 'os'

const networkInterfaces = os.networkInterfaces()
// console.log(networkInterfaces)
const port = 40100

const ip = ((networkInterfaces) => {
    // console.log(networkInterfaces)
    for (const devName in networkInterfaces) {
        const iface = networkInterfaces[devName]
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i]
            if (alias.family == 'IPv4' && alias.address != '127.0.0.1' && !alias.internal) {
                return alias.address
            }
        }
    }
})(networkInterfaces)

export { ip, port }
