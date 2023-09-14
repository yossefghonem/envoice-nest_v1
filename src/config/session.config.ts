import { SessionOptions } from 'express-session';

const session: SessionOptions = {
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000, // Session expiration time (1 hour)
  },
};

export default session;
