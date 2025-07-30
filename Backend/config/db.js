import { Client } from 'pg';

const connectDB = async () => {
    const client = new Client({
        connectionString: process.env.PG_URI, // Set PG_URI in your .env file
        // You can add more config options if needed
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