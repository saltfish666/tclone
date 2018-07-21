import * as fs from 'fs'
import request from 'request'
import { ensureFileSync } from 'ensure-path'

module.exports = (fileLocation: string, url: string) => {
  if (fs.existsSync(fileLocation)) {
    return null
  }

  ensureFileSync(fileLocation)

  request(url, (err, res, body) => {
    if (err) return console.log(err)
    fs.writeFile(fileLocation, body, () => {
      console.log()
    })
  })
}

export default module.exports
