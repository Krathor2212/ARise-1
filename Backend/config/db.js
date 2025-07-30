import { Client } from 'pg';

const connectDB = async () => {
    const client = new Client({
        connectionString: process.env.PG_URI,
    });

    try {
        await client.connect();
        console.log('✅ PostgreSQL Connected');
    } catch (error) {
        console.error('❌ PostgreSQL Connection Error:', error);
        process.exit(1);
    }

    return client;
};

export default connectDB;