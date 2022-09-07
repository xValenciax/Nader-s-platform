import express, { Application } from 'express';
import { config } from './src/config/config';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import routes from './src/app';

const app: Application = express();
const port = config.PORT || 8000;
const localhost = `http://localhost:${port}/`;

app.use(bodyParser.urlencoded({ 
    extended: false
}
));

app.use(bodyParser.json());

app.use(helmet());

app.listen(port, () => {
    console.log(`server is running on: ${localhost}`);
});

routes(app);