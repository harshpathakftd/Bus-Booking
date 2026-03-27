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
  ShieldCheck,
  Star,
  Sunrise,
  Sun,
  Sunset,
  Snowflake,
  Timer,
  Wifi,
  Wind
} from "lucide-react";
import { api } from "../api";

const fallbackBuses = [
  {
    _id: "mock-bus-1",
    name: "GoRideX Express AC Sleeper",
    source: "Delhi",
    destination: "Jaipur",
    departureTime: "07:30 PM",
    arrivalTime: "01:45 AM",
    type: "AC Sleeper",
    fare: 899,
    totalSeats: 40,
    bookedSeats: [1, 2, 3, 4, 5],
    boardingPoints: ["Majestic", "Silk Board"],
    droppingPoints: ["Miyapur", "Ameerpet"],
    rating: 4.5
  },
  {
    _id: "mock-bus-2",
    name: "Royal Travels Semi Sleeper",
    source: "Delhi",
    destination: "Jaipur",
    departureTime: "09:15 PM",
    arrivalTime: "03:40 AM",
    type: "Semi Sleeper",
    fare: 749,
    totalSeats: 36,
    bookedSeats: [2, 8, 10],
    boardingPoints: ["Anand Rao Circle", "Electronic City"],
    droppingPoints: ["Kukatpally", "LB Nagar"],
    rating: 4.2
  },
  {
    _id: "mock-bus-3",
    name: "Intercity Premium Seater",
    source: "Delhi",
    destination: "Jaipur",
    departureTime: "11:00 PM",
    arrivalTime: "05:20 AM",
    type: "Luxury Seater",
    fare: 1099,
    totalSeats: 32,
    bookedSeats: [1, 3, 7, 9, 12, 14, 17],
    boardingPoints: ["Majestic", "Anand Rao Circle"],
    droppingPoints: ["Miyapur", "LB Nagar"],
    rating: 4.7
  }
];

const BusListingPage = () => {
  const [searchParams] = useSearchParams();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("price");
  const [maxPrice, setMaxPrice] = useState(10000);
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
        const apiBuses = Array.isArray(res.data) ? res.data : [];
        setBuses(apiBuses.length > 0 ? apiBuses : fallbackBuses);
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
              setMaxPrice(10000);
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
              max="10000"
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
        {!loading && sortedBuses.length === 0 && <p className="muted">Showing recommended buses.</p>}

        <div className="bus-results-list">
          {(sortedBuses.length > 0 ? sortedBuses : fallbackBuses).slice(0, 3).map((bus) => (
            <article key={bus._id} className="bus-result-card">
              <div className="bus-main">
                <div className="bus-title-row">
                  <h3>{bus.name}</h3>
                  <span className="bus-rating">
                    <Star size={13} />
                    {(bus.rating || 4.3).toFixed(1)}
                  </span>
                </div>
                <p className="muted bus-route-line">
                  {bus.source} to {bus.destination} • {bus.type}
                </p>
                <div className="bus-meta">
                  <span>
                    <Clock3 size={13} />
                    {bus.departureTime}
                  </span>
                  <span>
                    <Timer size={13} />
                    {bus.arrivalTime}
                  </span>
                  <span>
                    <Wifi size={13} />
                    Free WiFi
                  </span>
                </div>
                <div className="bus-tag-row">
                  <span>
                    <ShieldCheck size={13} />
                    Safe ride
                  </span>
                  <span>
                    <MapPin size={13} />
                    Live tracking
                  </span>
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
