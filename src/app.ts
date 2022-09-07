import { Application } from 'express';
import admin_routes from './routers/models/admin.router';
import student_routes from './routers/models/student.router';
import units_routes from './routers/models/unit.router';
import login_routes from './routers/services/login.router';

const routes = (app: Application) => {
	login_routes(app);
	admin_routes(app);
	student_routes(app);
	units_routes(app);
};

export default routes;