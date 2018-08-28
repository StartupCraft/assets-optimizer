#!/usr/bin/env node

import optimize from './index'

const optimizers = ['svg']

const optimizer = process.argv[2]

try {
  if (!optimizer) throw new Error('You must specify optimizer')

  if (!optimizers.includes(optimizer))
    throw new Error(`Optimizer '${optimizer}' not found`)

  optimize[optimizer]()
} catch (error) {
  console.log('Error:', error.message)
}
