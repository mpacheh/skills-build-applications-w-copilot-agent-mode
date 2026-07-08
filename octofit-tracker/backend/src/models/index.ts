import mongoose, { Schema } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  role: string;
}

interface ITeam {
  name: string;
  description: string;
  members: string[];
}

interface IActivity {
  userId: string;
  type: string;
  duration: number;
  notes?: string;
}

interface ILeaderboardEntry {
  userId: string;
  score: number;
  rank: number;
}

interface IWorkout {
  title: string;
  difficulty: string;
  duration: number;
  focus: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' },
}, { timestamps: true });

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: { type: [String], default: [] },
}, { timestamps: true });

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  notes: { type: String, default: '' },
}, { timestamps: true });

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true },
  score: { type: Number, default: 0 },
  rank: { type: Number, default: 1 },
}, { timestamps: true });

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, default: 'beginner' },
  duration: { type: Number, required: true },
  focus: { type: String, default: 'fitness' },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', workoutSchema);
