import express, { Application } from 'express';
import { config } from './src/config/config';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import routes from './src/server';
import path from 'path';

const app: Application = express();
const port = config.PORT || 8000;
const localhost = `http://localhost:${port}/login`;

app.use(bodyParser.urlencoded({ 
    extended: false
}
));

app.use(bodyParser.json());

app.use(helmet());

app.use(express.static(path.normalize(path.resolve('./public'))));

app.listen(port, () => {
    console.log(`server is running on: ${localhost}`);
});

routes(app);