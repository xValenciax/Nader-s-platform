import express, { Application } from 'express';
import bodyparser from 'body-parser';
import helmet from 'helmet';
import { config } from './config/config';
import admin_routes from './routers/models/admin.router';
import student_routes from './routers/models/student.router';
import units_routes from './routers/models/unit.router';
import login_routes from './routers/services/login.router';

const app: Application = express();
const port = config.PORT || 8000;
const localhost = `http://localhost:${port}/`;

app.listen(port, () => {
	console.log(`server is running on: ${localhost}`);
});

app.use(bodyparser.urlencoded({ 
	extended: false
}
));

app.use(bodyparser.json());

app.use(helmet());

login_routes(app);
admin_routes(app);
student_routes(app);
units_routes(app);