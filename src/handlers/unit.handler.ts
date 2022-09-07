import { units, unit, unit_type, release_status } from '../models/unit.entity';
import { Request, Response } from 'express';
import { config } from '../config/config';

const MODE = config.MODE;

const uni = new units();
// admin route
export const displayUnits = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await uni.index();
        res.status(200).json(result).end();
    }
    catch (err) {
        if (MODE === 'test' || MODE === 'dev')
            res.status(400).json(err).end();
        else
            res.status(400).json('Bad Request' + err).end();
    }
};

export const showUnit = async (req: Request, res: Response): Promise<void> => {
    const unit_id = parseInt(req.params.unit_id);
    try {
        const result = await uni.getUnitById(unit_id);
        if (result !== undefined || result !== null)
            res.status(200).json(result).end();
        else
            res.status(500).json('Internal Server Error').end();
    }
    catch (err) {
        if (MODE === 'test' || MODE === 'dev')
            res.status(400).json(err).end();
        else
            res.status(400).json('Bad Request' + err).end();
    }
};

//admin route
export const addUnit = async (req: Request, res: Response) => {
    const newUnit: unit = {
        unit_name: req.body.unit_name,
        unit_type: req.body.unit_type,
        release_status: req.body.status
    };

    console.log(newUnit.unit_name);
    if (newUnit.release_status !== undefined && newUnit.unit_type !== undefined && newUnit.unit_name !== undefined) {
        try {
            await uni.insertUnit(newUnit);
            res.status(201).json('Unit Added Successfully\n').end();
        }
        catch(err) {
            res.status(500).json('Internal Server Error' + err).end();
        }
    }
    else res.status(400).json('Please, provide the required information').end();
};

export const deleteUnit = async (req: Request, res: Response) => {
    const unit_id = parseInt(req.params.unit_id);

    try {
        await uni.deleteUnit(unit_id);
        res.status(200).json('Student Deleted Successfully').end();
    }
    catch(err) {
        res.status(500).json('Internal Server Error' + err).end();
    }
};
