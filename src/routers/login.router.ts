import { admin_login_service, login_service } from '../services/login.service';
import express from 'express';

const login_routes = (app: express.Application) => {
    app.post('/login/student', login_service);
    app.post('/login/admin', admin_login_service);
};

export default login_routes;