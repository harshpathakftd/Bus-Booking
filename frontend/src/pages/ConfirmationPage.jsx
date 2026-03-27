import { Link, useParams } from "react-router-dom";

const ConfirmationPage = () => {
  const { bookingId } = useParams();

  return (
    <section className="card confirm-card">
      <h2>Booking Confirmed</h2>
      <p className="muted">Your ticket has been generated successfully.</p>
      <p className="booking-id">PNR / Booking ID: {bookingId}</p>
      <Link to="/" className="primary-link">
        Back to Home
      </Link>
    </section>
  );
};

export default ConfirmationPage;
