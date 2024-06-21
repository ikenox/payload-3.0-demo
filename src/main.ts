import next from 'next'
import express from 'express'
import { importConfig } from 'payload/node'

import { getPayload } from 'payload'

const expressApp = express()

async function main() {
  const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
  })
  const nextHandler = nextApp.getRequestHandler()

  nextApp.prepare().then(async () => {
    const config = await importConfig('../payload.config.ts')
    const payload = await getPayload({ config })
    expressApp.get('/users', async (req, res) => {
      await payload
        .find({ collection: 'users' })
        .then(({ docs }) => res.json(docs))
        .catch(next)
    })
    console.log('Next.js started')
    expressApp.use((req, res) => nextHandler(req, res))
    expressApp.listen(3000, () => {
      console.log('listen on port 3000')
    })
  })
}

void main()
