import db from '../config/db.js';

export const getPeoplesService = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    // Fetch total count for pagination metadata
    const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM peoples');
    const paginatedQuery = `SELECT * FROM peoples LIMIT ${limit} OFFSET ${offset}`;

    // Fetch paginated results
    const [peoples] = await db.query(
        paginatedQuery
    );

    if (!peoples.length) throw {
        statusCode: 404, message: 'No peoples found',
        peoples: []
    };

    return {
        status: 'success',
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        peoples: peoples,
    };
}