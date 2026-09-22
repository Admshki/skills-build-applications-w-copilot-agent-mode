import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

async function seedDatabase() {
  try {
    await connectDatabase();
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex', email: 'alex@example.com', displayName: 'Alex Morgan' },
      { username: 'jordan', email: 'jordan@example.com', displayName: 'Jordan Lee' },
      { username: 'sam', email: 'sam@example.com', displayName: 'Sam Rivera' },
    ]);

    const teams = await Team.create([
      {
        name: 'Trailblazers',
        description: 'Consistent progress, together.',
        memberIds: users.map((user) => user._id),
      },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'Running', durationMinutes: 30, calories: 280 },
      { userId: users[1]._id, type: 'Cycling', durationMinutes: 45, calories: 410 },
      { userId: users[2]._id, type: 'Strength', durationMinutes: 35, calories: 240 },
    ]);

    await Leaderboard.create([
      { userId: users[0]._id, points: 1250, rank: 1 },
      { userId: users[1]._id, points: 980, rank: 2 },
      { userId: users[2]._id, points: 760, rank: 3 },
    ]);

    const workouts = await Workout.create([
      {
        name: 'Foundation Run',
        description: 'A steady cardio session for building consistency.',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: ['Warm-up walk', 'Easy run', 'Cool-down'],
        target: 'Cardio',
      },
      {
        name: 'Full Body Power',
        description: 'A balanced strength workout for the whole body.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: ['Squats', 'Push-ups', 'Rows', 'Plank'],
        target: 'Strength',
      },
    ]);

    console.log(
      `Database seeding complete: ${users.length} users, ${teams.length} teams, ${workouts.length} workouts`,
    );
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
  }
}

seedDatabase();
