
import express from 'express';
import { appHandler } from 'App/Server/'

const app = express();
const port = process.env.SERVER_PORT;

appHandler(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))