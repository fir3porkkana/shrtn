import { config } from './common/config'
import { expressApp } from './app'

expressApp.listen(config.server.port, () => {
  console.log(`${config.environment} server running on port ${config.server.port}`)
})
