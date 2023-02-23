//Requireing Express
const express = require('express');
//Morgan to See the request
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const AppError = require('./util/appError');
const globalErrorHandeler = require('./controllers/errorController');
//Getting the Routers
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoute');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

// Calling Express function
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(helmet());

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       baseUri: ["'self'"],
//       fontSrc: ["'self'", 'https:', 'data:'],
//       scriptSrc: ["'self'", 'https://js.stripe.com/v3/'],
//       objectSrc: ["'none'"],
//       styleSrc: ["'self'", 'https:', 'unsafe-inline'],
//       upgradeInsecureRequests: [],
//     },
//   })
// );

// helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
//       baseUri: ["'self'"],
//       fontSrc: ["'self'", 'https:', 'data:'],

//       scriptSrc: [
//         "'self'",
//         'https:',
//         'http:',
//         'blob:',
//         'https://*.leaflet.com',
//         'https://js.stripe.com',
//         'https://*.cloudflare.com',
//       ],
//       frameSrc: ["'self'", 'https://js.stripe.com/v3/'],
//       objectSrc: ['none'],
//       styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
//       workerSrc: ["'self'", 'data:', 'blob:'],
//       childSrc: ["'self'", 'blob:'],
//       imgSrc: ["'self'", 'data:', 'blob:'],
//       connectSrc: [
//         "'self'",
//         'blob:',
//         'wss:',
//         'https://*.tiles.mapbox.com',
//         'https://api.mapbox.com',
//         'https://events.mapbox.com',
//       ],
//       upgradeInsecureRequests: [],
//     },
//   },
// });

const defaultSrcUrls = ['https://js.stripe.com/'];

const scriptSrcUrls = [
  'https://unpkg.com/',
  'https://tile.openstreetmap.org',
  'https://cdnjs.cloudflare.com/ajax/libs/axios/1.0.0-alpha.1/axios.min.js',
  'https://js.stripe.com/v3/',
];

const styleSrcUrls = [
  'https://unpkg.com/',
  'https://tile.openstreetmap.org',
  'https://fonts.googleapis.com/',
];

const connectSrcUrls = [
  'https://*.stripe.com',
  'https://unpkg.com',
  'https://tile.openstreetmap.org',
  'https://*.cloudflare.com',
  'http://localhost:3000/api/v1/users/login',
  'http://localhost/api/v1/bookings/checkout-session/',
];

const fontSrcUrls = ['fonts.googleapis.com', 'fonts.gstatic.com'];

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", ...defaultSrcUrls],
      scriptSrc: ["'self'", ...scriptSrcUrls],
      connectSrc: ["'self'", ...connectSrcUrls],
      fontSrc: ["'self'", ...fontSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      imgSrc: ["'self'", 'blob:', 'data:', 'https:'],
      workerSrc: ["'self'", 'blob:'],
    },
  })
);

//Checking if the setup is in Development Env or Production Env
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP please try again in an hour',
});

app.use('/api', limiter);

//This parse body and convert it in JSON format
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
//Data sanitizatiobn against SQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//Getting Static Files Like css
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toString();
  // console.log(req.cookies);
  next();
});

app.use('/', viewRouter);

// Tours Route
app.use('/api/v1/tours', tourRouter);

//Users Route
app.use('/api/v1/users', userRouter);

//Reviews Route
app.use('/api/v1/reviews', reviewRouter);

//Booking Route
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandeler);

//Exporting To use in server
module.exports = app;
