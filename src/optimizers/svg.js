import fs from 'fs'
import path from 'path'
import SVGO from 'svgo'
import filesize from 'filesize.js'
import glob from 'glob'

import svgConfig from '../config/svg'

const optimizer = () => {
  const filepath = path.resolve(__dirname, 'src')

  const svgo = new SVGO(svgConfig)

  let dataLengthBefore = 0
  let dataLengthAfter = 0

  glob(`src/**/*.svg`, {}, (error, files) => {
    if (error) {
      throw error
    }

    files.forEach((file, index) => {
      const data = fs.readFileSync(file, 'utf8')

      dataLengthBefore += data.length

      svgo.optimize(data, { path: filepath }).then(result => {
        if (result.data.length !== data.length) {
          fs.writeFileSync(file, result.data)
          const decreaseFile = data.length - result.data.length
          const decreaseFilePercent = (decreaseFile / data.length) * 100
          console.log(
            `Wrote ${file}, result: ${filesize(data.length)} > ${filesize(
              result.data.length,
            )}, ${decreaseFilePercent.toFixed(2)}%`,
          )
        }

        dataLengthAfter += result.data.length

        if (files.length - 1 === index) {
          const decrease = dataLengthBefore - dataLengthAfter
          const decreasePercent = (decrease / dataLengthBefore) * 100
          console.log('———————————————————————')
          console.log(
            `Size before optimization: ${filesize(
              dataLengthBefore,
            )}, after: ${filesize(
              dataLengthAfter,
            )}, decrease by ${decreasePercent.toFixed(2)}%`,
          )
          console.log('———————————————————————')
        }
      })
    })
  })
}

/*  */

export default optimizer
