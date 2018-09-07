import fs from 'fs'
import path from 'path'
import SVGO from 'svgo'
import filesize from 'filesize'
import glob from 'glob'
import SparkMD5 from 'spark-md5'

import { checkFileExists } from '../utils'

import svgConfig from '../config/svg'

const optimizer = async (dir, saveAlreadyOptimized) => {
  const filepath = path.resolve(__dirname, dir)
  const optimizedFilePath = './optimized.json'

  await checkFileExists(optimizedFilePath)

  const optimizedFile = fs.readFileSync(optimizedFilePath, 'utf8')

  const optimized = JSON.parse(optimizedFile)

  if (saveAlreadyOptimized) {
    glob(`${dir}/**/*.svg`, {}, (error, files) => {
      if (error) {
        throw error
      }

      files.forEach((file, index) => {
        const data = fs.readFileSync(file, 'utf8')
        const currentMD5 = SparkMD5.hash(data)

        optimized.svg[file] = currentMD5

        if (files.length - 1 === index) {
          fs.writeFileSync(
            optimizedFilePath,
            JSON.stringify(optimized, null, 2),
          )
        }
      })
    })
  } else {
    const svgo = new SVGO(svgConfig)

    let dataLengthBefore = 0
    let dataLengthAfter = 0

    glob(`${dir}/**/*.svg`, {}, (error, files) => {
      if (error) {
        throw error
      }

      const changedFiles = []

      files.forEach(file => {
        const data = fs.readFileSync(file, 'utf8')
        const currentMD5 = SparkMD5.hash(data)

        if (currentMD5 !== optimized.svg[file]) {
          changedFiles.push(file)
        }
      })

      if (changedFiles.length === 0) {
        console.log('———————————————————————')
        console.log('No files to optimize')
        console.log('———————————————————————')
      }

      changedFiles.forEach((file, index) => {
        const data = fs.readFileSync(file, 'utf8')
        dataLengthBefore += data.length

        svgo.optimize(data, { path: filepath }).then(result => {
          if (result.data.length !== data.length) {
            fs.writeFileSync(file, result.data)

            optimized.svg[file] = SparkMD5.hash(result.data)

            const decreaseFile = data.length - result.data.length
            const decreaseFilePercent = (decreaseFile / data.length) * 100
            console.log(
              `Wrote ${file}, result: ${filesize(data.length)} > ${filesize(
                result.data.length,
              )}, ${decreaseFilePercent.toFixed(2)}%`,
            )
          }

          dataLengthAfter += result.data.length

          if (changedFiles.length - 1 === index) {
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

            fs.writeFileSync(
              optimizedFilePath,
              JSON.stringify(optimized, null, 2),
            )
          }
        })
      })
    })
  }
}

export default optimizer
