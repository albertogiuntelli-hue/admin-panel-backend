import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    connectionString: "postgresql://postgres:pZjNycUjYflqIBntrSKpLcjJzIRBYugU@nozomi.proxy.rlwy.net:40101/railway",
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});

export const query = (text, params) => pool.query(text, params);
