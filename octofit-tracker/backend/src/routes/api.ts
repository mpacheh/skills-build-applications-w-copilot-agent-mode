import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/server';

const router = Router();

type Payload = Record<string, unknown>;

const parseCollection = (collectionName: string, data: unknown) => {
  const payload = (data ?? {}) as Payload;

  if (collectionName === 'users') {
    return {
      name: typeof payload.name === 'string' ? payload.name : '',
      email: typeof payload.email === 'string' ? payload.email : '',
      role: typeof payload.role === 'string' ? payload.role : 'member',
    };
  }
  if (collectionName === 'teams') {
    return {
      name: typeof payload.name === 'string' ? payload.name : '',
      description: typeof payload.description === 'string' ? payload.description : '',
      members: Array.isArray(payload.members) ? payload.members : [],
    };
  }
  if (collectionName === 'activities') {
    return {
      userId: typeof payload.userId === 'string' ? payload.userId : '',
      type: typeof payload.type === 'string' ? payload.type : '',
      duration: typeof payload.duration === 'number' ? payload.duration : 0,
      notes: typeof payload.notes === 'string' ? payload.notes : '',
    };
  }
  if (collectionName === 'leaderboard') {
    return {
      userId: typeof payload.userId === 'string' ? payload.userId : '',
      score: typeof payload.score === 'number' ? payload.score : 0,
      rank: typeof payload.rank === 'number' ? payload.rank : 1,
    };
  }
  if (collectionName === 'workouts') {
    return {
      title: typeof payload.title === 'string' ? payload.title : '',
      difficulty: typeof payload.difficulty === 'string' ? payload.difficulty : 'beginner',
      duration: typeof payload.duration === 'number' ? payload.duration : 0,
      focus: typeof payload.focus === 'string' ? payload.focus : 'fitness',
    };
  }
  return payload;
};

const getModelForRoute = (route: string) => {
  switch (route) {
    case 'users':
      return User;
    case 'teams':
      return Team;
    case 'activities':
      return Activity;
    case 'leaderboard':
      return LeaderboardEntry;
    case 'workouts':
      return Workout;
    default:
      return null;
  }
};

const registerCrudRoutes = (path: string, model: any) => {
  const normalizedPath = path.replace(/\/$/, '');

  const handler = async (_req: any, res: any) => {
    try {
      const records = await model.find({});
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch records', details: (error as Error).message });
    }
  };

  const createHandler = async (req: any, res: any) => {
    try {
      const record = await model.create(parseCollection(normalizedPath.replace('/api/', '').replace('/', ''), req.body));
      res.status(201).json(record);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create record', details: (error as Error).message });
    }
  };

  router.get(path, handler);
  router.get(normalizedPath, handler);
  router.post(path, createHandler);
  router.post(normalizedPath, createHandler);
};

registerCrudRoutes('/api/users/', User);
registerCrudRoutes('/api/teams/', Team);
registerCrudRoutes('/api/activities/', Activity);
registerCrudRoutes('/api/leaderboard/', LeaderboardEntry);
registerCrudRoutes('/api/workouts/', Workout);

export default router;
