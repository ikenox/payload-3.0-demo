import { importConfig } from 'payload/node'

import { getPayload } from 'payload'

async function main() {
  const config = await importConfig('../payload.config.ts')
  const payload = await getPayload({ config })

  const users = await payload.find({ collection: 'users' })
  console.log('users:', users.docs)
}

void main()
