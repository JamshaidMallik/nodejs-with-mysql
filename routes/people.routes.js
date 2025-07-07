import express from "express";
import { getPeoples } from '../controllers/people.controller.js';
const router = express.Router();

// Route to get paginated peoples
router.get('/', getPeoples);

export default router;


