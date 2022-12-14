import { displayUnits, showUnit, addUnit, deleteUnit } from '../../handlers/unit.handler';
import { authenticate_admin, authenticate_student } from '../../services/middlewares/auth.service';
import { Application } from 'express';

const units_routes = (app: Application) => {
    app.get('/units', authenticate_student, displayUnits);
    app.get('/units/available', authenticate_student, showUnit);
    app.get('/units/upcoming', authenticate_student, showUnit);
    app.get('/units/units-only', authenticate_student, showUnit);
    app.get('/units/revision', authenticate_student, showUnit);
    app.get('/units/tests', authenticate_student, showUnit);
    app.get('/units/:unit_id', authenticate_student, showUnit);
    app.post('/units', authenticate_admin, addUnit);
    app.delete('/units/:unit_id', authenticate_admin, deleteUnit);
};

export default units_routes;