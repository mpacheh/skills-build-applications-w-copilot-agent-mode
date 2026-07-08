"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
const parseCollection = (collectionName, data) => {
    const payload = (data ?? {});
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
const getModelForRoute = (route) => {
    switch (route) {
        case 'users':
            return models_1.User;
        case 'teams':
            return models_1.Team;
        case 'activities':
            return models_1.Activity;
        case 'leaderboard':
            return models_1.LeaderboardEntry;
        case 'workouts':
            return models_1.Workout;
        default:
            return null;
    }
};
const registerCrudRoutes = (path, model) => {
    const normalizedPath = path.replace(/\/$/, '');
    const handler = async (_req, res) => {
        try {
            const records = await model.find({});
            res.json(records);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch records', details: error.message });
        }
    };
    const createHandler = async (req, res) => {
        try {
            const record = await model.create(parseCollection(normalizedPath.replace('/api/', '').replace('/', ''), req.body));
            res.status(201).json(record);
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to create record', details: error.message });
        }
    };
    router.get(path, handler);
    router.get(normalizedPath, handler);
    router.post(path, createHandler);
    router.post(normalizedPath, createHandler);
};
registerCrudRoutes('/api/users/', models_1.User);
registerCrudRoutes('/api/teams/', models_1.Team);
registerCrudRoutes('/api/activities/', models_1.Activity);
registerCrudRoutes('/api/leaderboard/', models_1.LeaderboardEntry);
registerCrudRoutes('/api/workouts/', models_1.Workout);
exports.default = router;
