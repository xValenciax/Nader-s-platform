import { units, release_status as rel_status } from '../../models/unit.entity'
describe('2) unit entity test', () => { 
    const unit = new units();
    const unit_name = 'unit 1';
    const type = 'revision';
    const release_status = 'upcoming';
    beforeAll(async () => {

        const unit_obj = {
            unit_name,
            type,
            release_status,
        };

        const ins = await unit.insertUnit(unit_obj);

    });

    it('1.1) expects index function to return an array of units', async () => {
        const res = await unit.index();
        expect(res.length).toBe(1);
    });
    
    it('1.2) expects getUserById function to return a units whose name is name', async () => {
        const res = await unit.getUnitById(1);
        expect(rel_status[Number(res.release_status)]).toBe(release_status);
    });
});