import 'dotenv/config'
import http from 'http'
import { createExpressApp } from './modules/http/setup.js'
import { setupWebsockets } from './modules/ws/setup.js'

const PORT = process.env.PORT || 4200

const app = createExpressApp()
const server = http.createServer(app)
setupWebsockets(server)

server.listen(PORT, () => console.log(`[BACKEND READY]. Server is listening on port ${PORT}…`))
