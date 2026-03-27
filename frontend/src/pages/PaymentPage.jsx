import { useNavigate, useParams } from "react-router-dom";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  return (
    <section className="card">
      <div className="section-head">
        <h2>Payment</h2>
        <p className="muted">Choose payment method and confirm ticket.</p>
      </div>
      <div className="payment-box">
        <p>Booking ID: {bookingId}</p>
        <p className="muted">UPI / Card / NetBanking integration placeholder.</p>
      </div>
      <button onClick={() => navigate(`/confirmation/${bookingId}`)} className="primary-btn">
        Pay & Confirm
      </button>
    </section>
  );
};

export default PaymentPage;
