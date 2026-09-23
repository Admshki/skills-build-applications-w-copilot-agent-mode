import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, default: 0, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, default: 'all-time', trim: true },
  },
  { timestamps: true },
);

leaderboardSchema.index({ period: 1, points: -1 });

export const Leaderboard = model('Leaderboard', leaderboardSchema);
