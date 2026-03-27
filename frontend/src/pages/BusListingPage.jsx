import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Armchair,
  BedDouble,
  BusFront,
  Clock3,
  Crown,
  IndianRupee,
  MapPin,
  MapPinned,
  Moon,
  Sunrise,
  Sun,
  Sunset,
  Snowflake,
  Wind
} from "lucide-react";
import { api } from "../api";

const BusListingPage = () => {
  const [searchParams] = useSearchParams();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("price");
  const [maxPrice, setMaxPrice] = useState(4000);
  const [boardingPoint, setBoardingPoint] = useState("");
  const [droppingPoint, setDroppingPoint] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const query = new URLSearchParams();
        const source = searchParams.get("source");
        const destination = searchParams.get("destination");
        if (source) query.set("source", source);
        if (destination) query.set("destination", destination);
        const res = await api.get(`/buses?${query.toString()}`);
        setBuses(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [searchParams]);

  const source = searchParams.get("source") || "Delhi";
  const destination = searchParams.get("destination") || "Jaipur";
  const date = searchParams.get("date") || "Today";
  const passengers = searchParams.get("passengers") || "1";
  const busTypeOptions = [
    { label: "AC", icon: Snowflake },
    { label: "Sleeper", icon: BedDouble },
    { label: "Seater", icon: Armchair },
    { label: "Non AC", icon: Wind },
    { label: "Semi Sleeper", icon: BusFront },
    { label: "Luxury", icon: Crown }
  ];
  const departureOptions = [
    { label: "Before 9 AM", icon: Sunrise },
    { label: "9 AM - 5 PM", icon: Sun },
    { label: "5 PM - 11 PM", icon: Sunset },
    { label: "After 11 PM", icon: Moon }
  ];
  const boardingOptions = ["Majestic", "Silk Board", "Anand Rao Circle", "Electronic City"];
  const droppingOptions = ["Miyapur", "Ameerpet", "Kukatpally", "LB Nagar"];

  const filteredBuses = buses.filter((bus) => {
    const withinPrice = Number(bus.fare || 0) <= maxPrice;
    const hasBoarding = !boardingPoint || (bus.boardingPoints || []).includes(boardingPoint);
    const hasDropping = !droppingPoint || (bus.droppingPoints || []).includes(droppingPoint);
    return withinPrice && hasBoarding && hasDropping;
  });

  const sortedBuses = [...filteredBuses].sort((a, b) => {
    if (sortBy === "price") return a.fare - b.fare;
    if (sortBy === "rating") return (b.rating || 4.2) - (a.rating || 4.2);
    if (sortBy === "departure") return (a.departureTime || "").localeCompare(b.departureTime || "");
    return 0;
  });

  return (
    <section className="bus-results-page">
      <aside className="bus-filter-panel">
        <div className="filter-head">
          <strong>Filters</strong>
          <button
            type="button"
            onClick={() => {
              setMaxPrice(4000);
              setBoardingPoint("");
              setDroppingPoint("");
              setSortBy("price");
            }}
          >
            Clear all
          </button>
        </div>

        <div className="filter-block">
          <p className="filter-title">
            <BusFront size={15} />
            <span>Bus Type</span>
          </p>
          <div className="filter-grid">
            {busTypeOptions.map((item) => (
              <button key={item.label} type="button" className="filter-chip filter-chip-icon">
                <item.icon size={13} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-block">
          <p className="filter-title">
            <Clock3 size={15} />
            <span>Departure Time</span>
          </p>
          <div className="time-grid">
            {departureOptions.map((time) => (
              <button key={time.label} type="button" className="time-chip time-chip-icon">
                <time.icon size={13} />
                <span>{time.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-block">
          <p className="filter-title">
            <IndianRupee size={15} />
            <span>Price Range</span>
          </p>
          <div className="price-range-wrap">
            <input
              type="range"
              min="300"
              max="5000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-range"
            />
            <div className="price-range-values">
              <span>Rs 300</span>
              <strong>Up to Rs {maxPrice}</strong>
            </div>
          </div>
        </div>

        <div className="filter-block">
          <p className="filter-title">
            <MapPin size={15} />
            <span>Boarding Point</span>
          </p>
          <select value={boardingPoint} onChange={(e) => setBoardingPoint(e.target.value)}>
            <option value="">All Boarding Points</option>
            {boardingOptions.map((point) => (
              <option key={point} value={point}>
                {point}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-block">
          <p className="filter-title">
            <MapPinned size={15} />
            <span>Dropping Point</span>
          </p>
          <select value={droppingPoint} onChange={(e) => setDroppingPoint(e.target.value)}>
            <option value="">All Dropping Points</option>
            {droppingOptions.map((point) => (
              <option key={point} value={point}>
                {point}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-block">
          <p className="filter-title">
            <MapPin size={15} />
            <span>Popular Boarding Points</span>
          </p>
          <div className="point-list">
            {["Majestic", "Silk Board", "Anand Rao Circle", "Electronic City"].map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </div>
      </aside>

      <div className="bus-results-content">
        <div className="results-top-strip">
          {["Women Friendly", "Live Tracking", "Free Cancellation", "Up to 15% Off"].map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>

        <div className="results-route-card">
          <div>
            <h2>
              {source} to {destination}
            </h2>
            <p>
              {date} • {passengers} passenger{Number(passengers) > 1 ? "s" : ""} • Pick a bus and
              continue to seat selection.
            </p>
          </div>
          <div className="sort-wrap">
            <label>Sort by</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="departure">Departure Time</option>
            </select>
          </div>
        </div>

        <div className="popular-filter-bar">
          <strong>Popular Filters:</strong>
          <div>
            {["Majestic", "Marathahalli", "Silk Board", "Tin Factory", "Yeshwantpur"].map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
        </div>

        {loading && <p className="muted">Loading buses...</p>}
        {!loading && sortedBuses.length === 0 && (
          <p className="muted">No buses found for selected filters.</p>
        )}

        <div className="bus-results-list">
          {sortedBuses.map((bus) => (
            <article key={bus._id} className="bus-result-card">
              <div className="bus-main">
                <h3>{bus.name}</h3>
                <p className="muted">
                  {bus.source} to {bus.destination}
                </p>
                <div className="bus-meta">
                  <span>{bus.departureTime}</span>
                  <span>{bus.arrivalTime}</span>
                  <span>{bus.type}</span>
                </div>
              </div>

              <div className="bus-right">
                <p>
                  From <strong>Rs {bus.fare}</strong>
                </p>
                <small>{Math.max(0, (bus.totalSeats || 40) - (bus.bookedSeats?.length || 0))} Seats left</small>
                <Link to={`/seat/${bus._id}`} className="primary-link">
                  View Buses
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusListingPage;
