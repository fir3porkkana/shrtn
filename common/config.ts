import * as dotenv from 'dotenv'
console.log(dotenv.config({ path: __dirname + '/../.env' }))

export interface ConfigType {
  mongo: {
    uri: string
  }
  server: {
    port: number
  }
}

export const config: ConfigType = {
  mongo: {
    uri: process.env.MONGODB_CONNECTIONSTRING || 'placeholder',
  },
  server: {
    port: Number(process.env.PORT) || 3001,
  },
}
