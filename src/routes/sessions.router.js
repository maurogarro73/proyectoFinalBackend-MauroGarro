import passport from 'passport';
import express from 'express';
import { userSessionDTO } from '../DAO/DTO/userSession.dto.js';
import { UserModel } from '../DAO/models/users.model.js';
export const sessionsRouter = express.Router();

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/auth/login' }), async (req, res) => {
  const user = await UserModel.findOne({ email: req.user.email });
  const connectionNow = parseInt(Date.now()) + 2 * 24 * 60 * 60 * 1000;
  user.last_connection = connectionNow;
  await user.save();

  req.session.email = req.user.email;
  req.session.isAdmin = req.user.isAdmin;
  req.session.cart = req.user.cart._id;
  req.session.premium = req.user.premium;
  // Successful authentication, redirect home.
  res.redirect('/products');
});

sessionsRouter.get('/current', (req, res) => {
  const userSession = new userSessionDTO(req.session);
  return res.json({ user: userSession });
});
