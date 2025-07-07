import {getPeoplesService } from '../services/peoples.service.js';

export const getPeoples = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await getPeoplesService(page, limit);
        res.status(200).json(result);
    }catch(e){
        console.error('❌ Get peoples error:', e);
        res.status(e.statusCode || 500).json({
            status: 'error',
            message: e.message || 'Something went wrong',
            peoples: e.peoples || []
        });
    }
}