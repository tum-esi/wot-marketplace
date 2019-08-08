import mongoose from 'mongoose';

export const initializeDatabase = () => {
    mongoose.connect('mongodb://localhost/test', {
        useNewUrlParser: true,
        useCreateIndex: true
    });

    mongoose.connection.on('error', (err) => {
        console.log(err);
    });

    mongoose.connection.on('connected', () => {
        console.log('connected');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('disconnected');
    });
}

// Export Types
export { UserType, User } from './models/user';
export { ProjectType, Project } from './models/project'; 