import express from 'express';
import { getAllCompanies, getCompanyById } from '../controllers/company.controller.js';

const router = express.Router();

router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);

export default router;
