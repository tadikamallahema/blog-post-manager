import { useEffect, useState } from "react";
import API from "../services/api"; // make sure this path points to api.ts
import "../styles/Dashboard.css"

type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error(err);
        alert("Not authenticated. Please login.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login to see the dashboard</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.name} ({user.role})</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phoneNumber}</p>
    </div>
  );
};

export default Dashboard;