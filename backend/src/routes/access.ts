import { Router } from 'express';
import {
  createBadge,
  getBadges,
  getBadgeById,
  createAccessLevel,
  getAccessLevels,
  createSchedule,
  getSchedules,
  createDoor,
  getDoors,
  updateBadgeAccess,
} from '../services/accessService';

const router = Router();

router.post('/badges', async (req, res) => {
  const badge = await createBadge(req.body);
  res.status(201).json(badge);
});

router.get('/badges', async (_req, res) => {
  const badges = await getBadges();
  res.json(badges);
});

router.get('/badges/:id', async (req, res) => {
  const badge = await getBadgeById(req.params.id);
  res.json(badge);
});

router.post('/access-levels', async (req, res) => {
  const accessLevel = await createAccessLevel(req.body);
  res.status(201).json(accessLevel);
});

router.get('/access-levels', async (_req, res) => {
  const accessLevels = await getAccessLevels();
  res.json(accessLevels);
});

router.post('/schedules', async (req, res) => {
  const schedule = await createSchedule(req.body);
  res.status(201).json(schedule);
});

router.get('/schedules', async (_req, res) => {
  const schedules = await getSchedules();
  res.json(schedules);
});

router.post('/doors', async (req, res) => {
  const door = await createDoor(req.body);
  res.status(201).json(door);
});

router.get('/doors', async (_req, res) => {
  const doors = await getDoors();
  res.json(doors);
});

router.put('/badges/:id/access', async (req, res) => {
  const badge = await updateBadgeAccess(req.params.id, req.body.accessLevelIds);
  res.json(badge);
});

export default router;
