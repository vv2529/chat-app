import express from 'express'
import cors from 'cors'
import { generateUser, getChatsForClient } from '../users/users.util.js'
import { chats, users } from '../state/state.js'

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

		res.json(getChatsForClient(users, chats, String(currentUserId)))
	})

	return app
}
