import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourid) => {
  const stripe = Stripe(
    'pk_test_51MbQBZSFHAA6egCHlzqYkhz53rQo3g37KFBYvPHX8eU4k5GIBfWfcWtXGJiQjUa3w4rht3F7SBD7XKDDUIIAInQv00kCRUNSEc'
  );
  try {
    // 1. Get checkout session from the API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourid}`);
    // console.log(session);

    // 2. Create checkout form + charge credit card
    // await stripe.redirectToCheckout({
    //   sessionId: session.data.session.id,
    // });

    //works as expected
    window.location.replace(session.data.session.url);
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
