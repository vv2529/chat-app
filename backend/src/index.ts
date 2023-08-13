import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const PORT = process.env.PORT || 4200

const app = express()
app.set('port', PORT)
app.use(
	cors({
		origin: process.env.CLIENT_URL,
	})
)

app.get('/', (req, res) => {
	res.send('API server is running')
})

app.listen(PORT, () => console.log(`[BACKEND READY]. Server is listening on port ${PORT}…`))
