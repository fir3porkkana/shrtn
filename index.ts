import { config } from './common/config'
import { expressApp } from './app'

expressApp.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`)
})
