"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.LeaderboardEntry.deleteMany({}),
            models_1.Workout.deleteMany({}),
        ]);
        const users = await models_1.User.insertMany([
            { name: 'Maya Chen', email: 'maya@example.com', role: 'captain' },
            { name: 'Jordan Blake', email: 'jordan@example.com', role: 'member' },
            { name: 'Ava Patel', email: 'ava@example.com', role: 'member' },
        ]);
        const teams = await models_1.Team.insertMany([
            {
                name: 'North Star Crew',
                description: 'A high-energy team focused on endurance and mobility.',
                members: users.slice(0, 2).map((user) => user._id.toString()),
            },
            {
                name: 'Peak Performers',
                description: 'Strength-focused athletes preparing for a community challenge.',
                members: [users[2]._id.toString()],
            },
        ]);
        await models_1.Activity.insertMany([
            {
                userId: users[0]._id.toString(),
                type: 'run',
                duration: 35,
                notes: 'Morning 5K with tempo intervals.',
            },
            {
                userId: users[1]._id.toString(),
                type: 'strength',
                duration: 45,
                notes: 'Full-body circuit at the gym.',
            },
            {
                userId: users[2]._id.toString(),
                type: 'yoga',
                duration: 25,
                notes: 'Recovery flow after a long week.',
            },
        ]);
        await models_1.LeaderboardEntry.insertMany([
            { userId: users[0]._id.toString(), score: 980, rank: 1 },
            { userId: users[1]._id.toString(), score: 915, rank: 2 },
            { userId: users[2]._id.toString(), score: 890, rank: 3 },
        ]);
        await models_1.Workout.insertMany([
            {
                title: 'Tempo Interval Run',
                difficulty: 'intermediate',
                duration: 30,
                focus: 'endurance',
            },
            {
                title: 'Upper Body Strength Blast',
                difficulty: 'beginner',
                duration: 25,
                focus: 'strength',
            },
            {
                title: 'Recovery Mobility Flow',
                difficulty: 'beginner',
                duration: 20,
                focus: 'mobility',
            },
        ]);
        console.log('Database seeding complete');
        console.log(`Seeded users: ${users.length}, teams: ${teams.length}`);
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
