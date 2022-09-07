import { displayadmins, showadmin, addadmin, deleteadmin } from '../../handlers/admin.handler';
import { authenticate_admin } from '../../services/middlewares/auth.service';
import express from 'express';

const admin_routes = (app: express.Application) => {
    app.get('/admins', authenticate_admin, displayadmins);
    app.get('/admin/:admin_id', authenticate_admin, showadmin);
    app.post('/admins', authenticate_admin, addadmin);
    app.delete('/admin/:admin_id', authenticate_admin, deleteadmin);
};

export default admin_routes;