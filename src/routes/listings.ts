import { Router } from 'express';
import { getListings, getListingById, createListing } from '../controllers/listingsController';

const router = Router();

router.get('/', getListings);
router.get('/:id', getListingById);
router.post('/', createListing);

export default router;