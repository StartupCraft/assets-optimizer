#!/usr/bin/env node
import '@babel/polyfill'

import optimize from './index'

const optimizers = ['svg']

const [, , optimizer, path] = process.argv

try {
  if (!optimizer) throw new Error('You must specify optimizer')

  if (!optimizers.includes(optimizer))
    throw new Error(`Optimizer '${optimizer}' not found`)

  optimize[optimizer](
    path === '--save-already-optimized' ? 'src' : path || 'src',
    path === '--save-already-optimized',
  )
} catch (error) {
  console.log('Error:', error.message)
}
