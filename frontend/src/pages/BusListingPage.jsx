import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../api";

const BusListingPage = () => {
  const [searchParams] = useSearchParams();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="card">
      <div className="section-head">
        <h2>Available Buses</h2>
        <p className="muted">Pick a bus and continue to seat selection.</p>
      </div>
      {loading && <p className="muted">Loading buses...</p>}
      {!loading && buses.length === 0 && <p className="muted">No buses found.</p>}
      <div className="list">
        {buses.map((bus) => (
          <article key={bus._id} className="list-item">
            <div className="list-main">
              <h3>{bus.name}</h3>
              <p className="muted">
                {bus.source} to {bus.destination}
              </p>
              <small>{bus.departureTime} - {bus.arrivalTime}</small>
            </div>
            <div className="list-side">
              <span className="type-pill">{bus.type}</span>
              <strong className="fare">Rs {bus.fare}</strong>
              <Link to={`/seat/${bus._id}`} className="primary-link">
                Select Seats
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BusListingPage;
