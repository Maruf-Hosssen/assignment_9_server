import express from 'express';
import { userRoutes } from '../modules/user/user.route';
import { petRouter } from '../modules/pet/pet.routes';
import { adoptionRoutes } from '../modules/adoption/adoption.routes';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/',
    route: userRoutes,
  },

  {
    path: '/',
    route: petRouter,
  },
  {
    path: '/',
    route: adoptionRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
