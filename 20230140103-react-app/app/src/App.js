import { useEffect, useState } from "react";
import "./App.css";
import SplitText from "./SplitText";
import Magnet from './Magnet'

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

function App() {
  const [nama, setNama] = useState("");
  const [serverMsg, setServerMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((r) => r.json())
      .then((d) => setServerMsg(d.message))
      .catch(() => setServerMsg("(server tidak aktif)"));
  }, []);

  const greeting = `Hello${nama ? `, ${nama}` : ", ..."}!`;

  return (
    <div className="app">
    <Magnet padding={300} disabled={false} magnetStrength={10}>
      <div className="container">
      <SplitText
        key={nama} // penting: re-mount saat nama berubah
        text={greeting} // jangan pakai string literal berkurung kurawal
        className="title"
        delay={100}
        duration={2}
        ease="elastic.out(1,0.3)"
        splitType="words"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />

      <label htmlFor="nama">Masukkan nama kamu:</label>
      <input
        id="nama"
        type="text"
        placeholder="nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        maxLength={100}
      />

      <p className="hint">
        Ketik namamu di atas — pesan akan update otomatis.
      </p>

      {/* opsional: tampilkan status server */}
      {serverMsg && <p style={{ opacity: 0.6 }}>Server: {serverMsg}</p>}
      </div>
      </Magnet>
    </div>
  );
}

export default App;
