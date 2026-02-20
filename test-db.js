import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './server/.env' });

const uri = process.env.MONGODB_URI;
console.log('URI:', uri.replace(/:([^@]+)@/, ':****@'));

async function test() {
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log('SUCCESS');
        process.exit(0);
    } catch (err) {
        console.error('ERROR_NAME:', err.name);
        console.error('ERROR_MESSAGE:', err.message);
        process.exit(1);
    }
}

test();
