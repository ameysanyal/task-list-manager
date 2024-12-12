import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import sequelize from './database.js'
import taskRoutes from './routes/tasks.js'

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT;

app.use('/tasks', taskRoutes);

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`server running on post ${PORT}`));
});


app.get('/', (req, res) => {
    return res.status(200).send('Welcome to Task List Manager app backend');
});

