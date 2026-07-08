import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Maya Chen', email: 'maya@example.com', role: 'captain' },
      { name: 'Jordan Blake', email: 'jordan@example.com', role: 'member' },
      { name: 'Ava Patel', email: 'ava@example.com', role: 'member' },
    ]);

    const teams = await Team.insertMany([
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

    await Activity.insertMany([
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

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id.toString(), score: 980, rank: 1 },
      { userId: users[1]._id.toString(), score: 915, rank: 2 },
      { userId: users[2]._id.toString(), score: 890, rank: 3 },
    ]);

    await Workout.insertMany([
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
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
