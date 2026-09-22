import { Router } from 'express';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';
import { createResourceRouter } from './resourceRouter.js';

const apiRouter = Router();

apiRouter.use('/users', createResourceRouter(User));
apiRouter.use('/teams', createResourceRouter(Team));
apiRouter.use('/activities', createResourceRouter(Activity));
apiRouter.use('/leaderboard', createResourceRouter(Leaderboard));
apiRouter.use('/workouts', createResourceRouter(Workout));

export default apiRouter;
