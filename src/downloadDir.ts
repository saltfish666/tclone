import * as path from 'path'
import { URL } from 'url'
import { ensureDirSync } from 'ensure-path'
import downloadFile from './downloadFile'

function downloadDir (client, dirLocation: string, url: string, dirDepth = 10, fileDepth = 1) {
  let urlObj = new URL(url)
  ensureDirSync(dirLocation)
  client.get(urlObj.pathname, {}, (err, status, body, headers) => {
    if (err) return console.error(err)
    for (let info of body) {
      if (info.type === 'file' && fileDepth >= 1) downloadFile(path.join(dirLocation, info.name), info.download_url)
      if (info.type === 'dir' && dirDepth >= 1) downloadDir(client, path.join(dirLocation, info.name), info.url, dirDepth - 1, fileDepth - 1)
    }
  })
}
module.exports = downloadDir
export default downloadDir
