import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CupSoda, PlugZap, Snowflake, Tv, Toilet, Wifi } from "lucide-react";

const AutoSuggestField = ({ label, value, placeholder, options, onChange }) => {
  const [open, setOpen] = useState(false);

  const filtered = options.filter((item) =>
    item.label.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div
      className={`search-cell dropdown-cell ${open ? "open" : ""}`}
      tabIndex={0}
      onBlur={() => setTimeout(() => setOpen(false), 120)}
    >
      <label>{label}</label>
      <input
        className="suggest-input"
        value={value}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
      />
      {open && (
        <div className="dropdown-panel">
          <div className="dropdown-options">
            {filtered.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`dropdown-option ${item.value === value ? "active" : ""}`}
                onClick={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="dropdown-empty">No matching result found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const cityOptions = [
    "Delhi",
    "Jaipur",
    "Mumbai",
    "Pune",
    "Ahmedabad",
    "Bangalore",
    "Hyderabad",
    "Lucknow",
    "Indore",
    "Chandigarh"
  ].map((city) => ({ label: city, value: city }));
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    source: "Delhi",
    destination: "Jaipur",
    date: today,
    passengers: 1
  });
  const popularCities = [
    { city: "Mumbai", state: "Maharashtra", image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=800&q=80" },
    { city: "Jaipur", state: "Rajasthan", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80" },
    { city: "Bengaluru", state: "Karnataka", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80" },
    { city: "Kolkata", state: "West Bengal", image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80" },
    { city: "Delhi", state: "Delhi", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80" },
    { city: "Hyderabad", state: "Telangana", image: "/images/hydra.jpg" },
    { city: "Lucknow", state: "Uttar Pradesh", image: "/images/lucknow.jfif" },
    { city: "Patna", state: "Bihar", image: "/images/patna.webp" }
  ];
  const popularCityList = [
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Hyderabad",
    "Jaipur",
    "Kolkata",
    "Patna",
    "Lucknow"
  ];

  const updatePassengers = (step) => {
    setForm((prev) => ({
      ...prev,
      passengers: Math.max(1, Math.min(8, prev.passengers + step))
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    navigate(`/buses?source=${form.source}&destination=${form.destination}`);
  };

  return (
    <>
      <section className="tourix-hero">
        <div className="tourix-overlay">
        <div className="tourix-topbar">
          <div className="tourix-brand">
            <span className="brand-mark">◆</span>
            <div>
              <strong>GoRideX</strong>
              <small>Intercity Transfers</small>
            </div>
          </div>
          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className={`tourix-menu ${menuOpen ? "open" : ""}`}>
            <a href="#!">Home</a>
            <a href="#!">My Bookings</a>
            <a href="#!">Offer</a>
            <a href="#!">Help</a>
            <a href="#!" className="menu-cta">
              Login/Register
            </a>
          </nav>
        </div>

        <div className="tourix-middle">
          <div className="tourix-copy">
            <p className="tourix-kicker">TRAVEL SMART</p>
            <h2>
              EUROPEAN
              <br />
              INTERCITY
              <br />
              ROUTES
            </h2>
            <p>
              Book tickets online and travel with ease around all routes in your
              city.
            </p>
            <div className="hero-highlights">
              <span>1000+ Daily Trips</span>
              <span>Live Seat Selection</span>
              <span>Instant E-Ticket</span>
            </div>
          </div>
        </div>

          <form onSubmit={submit} className="tourix-search">
          <AutoSuggestField
            label="From"
            value={form.source}
            placeholder="Select location"
            options={cityOptions}
            onChange={(value) => setForm({ ...form, source: value })}
          />
          <AutoSuggestField
            label="To"
            value={form.destination}
            placeholder="Select destination"
            options={cityOptions}
            onChange={(value) => setForm({ ...form, destination: value })}
          />
          <div className="search-cell">
            <label>Date</label>
            <input
              className="suggest-input calendar-input"
              type="date"
              min={today}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div className="search-cell passenger-cell">
            <label>Passengers</label>
            <div className="passenger-stepper">
              <button type="button" onClick={() => updatePassengers(-1)}>
                -
              </button>
              <span>{form.passengers} Adult{form.passengers > 1 ? "s" : ""}</span>
              <button type="button" onClick={() => updatePassengers(1)}>
                +
              </button>
            </div>
          </div>
          <button type="submit" className="tourix-btn">
            SEARCH
          </button>
          </form>
        </div>
      </section>

      <section className="destinations-section">
        <div className="destinations-inner">
          <p className="destinations-kicker">LET'S FIND YOUR TRIP</p>
          <h3>Popular Indian Destinations</h3>

          <div className="destinations-grid">
            {popularCities.map((item) => (
              <article
                className="destination-card"
                key={item.city}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="destination-overlay">
                  <p>{item.state}</p>
                  <strong>{item.city}</strong>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      <section className="feature-section">
        <div className="feature-inner">
          <div className="feature-image-wrap">
            <img
              src="/images/box-image.png"
              alt="Happy traveler using bus booking app"
              className="feature-image"
            />
          </div>

          <div className="feature-content">
            <p className="feature-kicker">WHAT WILL YOU GET</p>
            <h3>Day and Night Routes Available for the Best Travel Time</h3>
            <p className="feature-intro">
              GoRideX makes intercity travel faster with curated routes, trusted
              operators and simple booking experience.
            </p>
            <div className="feature-badges">
              <span>24x7 Support</span>
              <span>Safe Boarding</span>
              <span>Live Tracking</span>
            </div>

            <article className="feature-point">
              <span>01</span>
              <div>
                <h4>Travel between cities easily and comfortably</h4>
                <p>
                  AC buses, live seat selection and reliable timings for a smooth
                  journey experience.
                </p>
              </div>
            </article>

            <article className="feature-point">
              <span>02</span>
              <div>
                <h4>Save time and money by choosing the right bus</h4>
                <p>
                  Compare fares, bus type and amenities in one place to book the
                  best option quickly.
                </p>
              </div>
            </article>

            <div className="feature-stats">
              <div>
                <strong>2500+</strong>
                <small>Daily Routes</small>
              </div>
              <div>
                <strong>4.8/5</strong>
                <small>Customer Rating</small>
              </div>
              <div>
                <strong>99%</strong>
                <small>On-Time Alerts</small>
              </div>
            </div>

            <div className="feature-actions">
              <button type="button" className="feature-btn">
                Read More
              </button>
              <button type="button" className="feature-btn ghost">
                Explore Routes
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefits-inner">
          <p className="benefits-kicker">OUR BENEFITS</p>
          <h3>
            Our buses are equipped with <span className="benefits-accent">comfortable seats</span> and
            modern facilities for a pleasant journey
          </h3>

          <div className="benefits-grid">
            <article className="benefit-item">
              <span className="benefit-icon">
                <Wifi size={18} />
              </span>
              <h4>Free WiFi</h4>
              <p>High speed internet access on the go</p>
            </article>
            <article className="benefit-item">
              <span className="benefit-icon">
                <Tv size={18} />
              </span>
              <h4>TV Zone</h4>
              <p>Entertainment screens for long routes</p>
            </article>
            <article className="benefit-item">
              <span className="benefit-icon">
                <CupSoda size={18} />
              </span>
              <h4>Hot Drinks</h4>
              <p>Refreshments available at select stops</p>
            </article>
            <article className="benefit-item">
              <span className="benefit-icon">
                <Toilet size={18} />
              </span>
              <h4>Restroom</h4>
              <p>Clean and hygienic washroom access</p>
            </article>
            <article className="benefit-item">
              <span className="benefit-icon">
                <PlugZap size={18} />
              </span>
              <h4>Power Sockets</h4>
              <p>Charge your phone and devices anytime</p>
            </article>
            <article className="benefit-item">
              <span className="benefit-icon">
                <Snowflake size={18} />
              </span>
              <h4>Climate Control</h4>
              <p>Comfortable cooling for all seasons</p>
            </article>
          </div>

          <div className="benefits-image-wrap">
            <img
              src="/images/bus.jpg"
              alt="Luxury bus at night"
              className="benefits-image"
            />
          </div>
        </div>
      </section>

      <section className="ticket-promo-section">
        <div className="ticket-promo-inner">
          <div className="ticket-left">
            <h3>
              <span>Bus Travel</span>
              <br />
              With Easy
            </h3>
            <p>
              Affordable tickets for fast and comfortable bus trips across major
              cities.
            </p>
            <button type="button" className="ticket-link">
              Read More
            </button>
          </div>

          <div className="ticket-center">
            <img
              src="/images/ticket.png"
              alt="Bus e-ticket card"
              className="ticket-image"
            />
          </div>

          <div className="ticket-right">
            <article>
              <h4>Transport you can trust</h4>
              <p>
                Curated operators, verified amenities and secure bookings for a
                stress-free trip.
              </p>
            </article>
            <article>
              <h4>On-time alerts and updates</h4>
              <p>
                Live trip updates and boarding reminders so you never miss your
                bus timing.
              </p>
            </article>
            <button type="button" className="ticket-btn">
              View Schedule
            </button>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          <div className="faq-left">
            <p className="faq-kicker">Questions & Answers</p>
            <h3>Popular Questions About Transfers</h3>

            <div className="faq-list">
              <article className="faq-item">
                <span>+</span>
                <p>Can I book a ticket online?</p>
              </article>
              <article className="faq-item">
                <span>+</span>
                <p>Does the bus make stops along the way?</p>
              </article>
              <article className="faq-item">
                <span>+</span>
                <p>Are there discounts for children, seniors and students?</p>
              </article>
              <article className="faq-item">
                <span>+</span>
                <p>How can I return or exchange a ticket?</p>
              </article>
              <article className="faq-item">
                <span>+</span>
                <p>Do the buses have Wi-Fi and charging ports?</p>
              </article>
            </div>

            <button type="button" className="faq-link">
              Read More
            </button>
          </div>

          <div className="faq-right">
            <img
              src="/images/suitcase.jpg"
              alt="Suitcase and travel accessories"
              className="faq-image"
            />
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <h3>GoRideX</h3>
            <p>
              Caring about your safety with professional drivers and modern buses.
            </p>
            <div className="footer-socials">
              <span>f</span>
              <span>x</span>
              <span>in</span>
              <span>ig</span>
            </div>
          </div>

          <div className="footer-contact">
            <p className="footer-label">Our Address:</p>
            <strong>25th North Neusvill Avenue, 19302, USA</strong>
            <p className="footer-label">Phone Number:</p>
            <strong>0-800-525-00-250</strong>
          </div>

          <div className="footer-links">
            <div>
              <h4>Explore</h4>
              <a href="#!">Payments</a>
              <a href="#!">Pricing</a>
              <a href="#!">FAQ</a>
              <a href="#!">Gallery</a>
            </div>
            <div>
              <h4>About Us</h4>
              <a href="#!">Articles</a>
              <a href="#!">Products</a>
              <a href="#!">FAQ</a>
              <a href="#!">Gallery</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Lab-Themes | All Rights Reserved - 2026 - GoRideX</p>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
