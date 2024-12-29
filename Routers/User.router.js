
import express from 'express';
import { createUser, getUser, updateUser, userLogin } from '../Controllers/User.controller.js';
import AuthMiddleware from '../Middleware/AuthMiddleware.js';
const router=express.Router();

router.post('/createuser', createUser);
router.post("/login", userLogin)
router.get('/getuserdetails',AuthMiddleware , getUser);
router.put("/update",updateUser);

export default router;