const express = require('express');
const bookingController = require('./../controllers/bookController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.get(
  '/checkout-session/:tourId',
  authController.protect,

  bookingController.getCheckoutSession
);

router.route('/').get(bookingController.getAllBookings).post(
  authController.protect,
  authController.restrictTo('admin'),

  bookingController.createBooking
);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .delete(
    authController.restrictTo('user', 'admin'),
    bookingController.deleteBooking
  )
  .patch(
    authController.restrictTo('user', 'admin'),
    bookingController.updateBooking
  );

module.exports = router;
