import next from 'next'
import express from 'express'

import payloadConfig from '@payload-config'
import { getPayload } from 'payload'

const expressApp = express()

async function main() {
  const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
  })
  const nextHandler = nextApp.getRequestHandler()

  nextApp.prepare().then(async () => {
    const payload = await getPayload({ config: payloadConfig })
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
