import * as dotenv from 'dotenv'
console.log(dotenv.config({ path: __dirname + '/../.env' }))

export interface ConfigType {
  mongo: {
    uri: string
  }
  server: {
    port: number
  }
  environment: string
}

export const config: ConfigType = {
  mongo: {
    uri: process.env.MONGODB_CONNECTIONSTRING || 'placeholder',
  },
  server: {
    port: Number(process.env.PORT) || 3001,
  },
  environment: process.env.NODE_ENV || 'development',
}
