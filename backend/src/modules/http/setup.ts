import express from 'express'
import cors from 'cors'
import { generateUser } from '../util/user-generation.js'
import { getChatsForClient } from '../state/chats.js'

export const createExpressApp = () => {
	const app = express()

	app.use(
		cors({
			origin: process.env.CLIENT_URL,
		})
	)

	app.get('/', (req, res) => {
		res.send('API server is running')
	})

	app.get('/api/register', (req, res) => {
		res.json(generateUser())
	})

	app.get('/api/chats/:currentUserId', (req, res) => {
		const { currentUserId } = req.params

		if (!currentUserId) return res.json({})

		res.json(getChatsForClient(currentUserId))
	})

	return app
}
