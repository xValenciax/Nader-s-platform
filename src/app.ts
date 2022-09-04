import express, { Application, Request,  Response} from 'express';
import bodyparser from 'body-parser';
import helmet from 'helmet';
import { config } from './config/config';

const app: Application = express();
const port = config.PORT || 8000;
const localhost = `http://localhost:${port}/`;

app.use(bodyparser.urlencoded({ 
	extended: false
}
));

app.use(bodyparser.json());

app.use(helmet());

app.get(`/`, (req: Request, res: Response) => {
	res.json('hello');
});

app.listen(port, () => {
	console.log(`server is running on: ${localhost}`);
});
