const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../../models/User');

// Create user
router.post(
  '/',
  [
    check('name', 'Name is required')
      .isString()
      .trim()
      .isLength({ min: 1, max: 100 }),
    check('email', 'Please include a valid email')
      .isString()
      .trim()
      .isEmail(),
    check('password', 'Please enter a password with 3 to 32 characters')
      .isString()
      .isLength({ min: 3, max: 32 }),
    check(
      'address',
      'Option :address must be at most 128 characters in length.'
    )
      .optional()
      .isString()
      .trim()
      .isLength({ max: 128 }),
  ],
  async (req, res) => {
    console.log('POST /api/users');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const passHash = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: passHash,
        address: req.body.address,
      });

      // Set session to authenticated
      req.session.authenticated = true;
      // Save session
      await req.session.save();
      // Send user
      res.status(201).json({ user: user });
    } catch (err) {
      if (err.errors) {
        res.status(400).json({ errors: err.errors });
      } else {
        res.sendStatus(500);
        console.error(err);
      }
    }
  }
);

// Login
router.put(
  '/auth',
  [
    check('email', 'Please include a valid email')
      .isString()
      .trim()
      .isEmail(),
    check('password', 'Password is required')
      .isString()
      .exists(),
  ],
  async (req, res) => {
    console.log('PUT /api/users');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // query user by email
      const user = await User.findOne({
        where: { email: req.body.email },
      });

      // If user doesn't exist, send 400 (bad request) with error information.
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              message: 'Invalid email and/or password.',
            },
          ],
        });
      }

      // compare passwords
      const match = await bcrypt.compare(req.body.password, user.password);

      // If passwords do not match, send 400 (bad request) with error information.
      if (!match) {
        return res.status(400).json({
          errors: [
            {
              message: 'Invalid email and/or password',
            },
          ],
        });
      }

      // Set session to authenticated
      req.session.authenticated = true;
      // Save session
      await req.session.save();
      // Send user
      res.json({ user: user });
    } catch (err) {
      res.sendStatus(500);
      console.error(err);
    }
  }
);

// Logout
// This is not necessary, since we're using the logout route in pages to achieve the same thing.
router.delete('/auth', async (req, res) => {
  console.log('DELETE /api/users/auth');
  try {
    req.session.authenticated = false;
    // Save session
    await req.session.save();
    // Send success
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});

// Get all users
router.get('/', async (req, res) => {
  console.log('GET /api/users');
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'name', 'address', 'createdAt'],
    });
    res.json(users);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});

// Get user by id
router.get('/:id', async (req, res) => {
  console.log('GET /api/users/:id');
  try {
    const user = await User.findOne({
      attributes: ['id', 'email', 'name', 'address', 'createdAt'],
      where: { id: req.params.id },
    });
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});

module.exports = router;
