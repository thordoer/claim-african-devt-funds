import styles from "./App.module.css";
import ClientSide from "./components/ClientSide";
import Viewpage from "./components/Viewpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientSide />} />
          <Route path="/admin" element={<Viewpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
