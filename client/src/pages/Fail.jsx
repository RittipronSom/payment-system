import { useNavigate } from "react-router-dom";

export default function Fail() {
  const nav = useNavigate();

  return (
    <div className="page">
      <div className="card" style={{ textAlign: "center" }}>
        <span className="result-icon">❌</span>
        <h1 className="result-title" style={{ color: "var(--red)" }}>การชำระเงินล้มเหลว</h1>
        <p className="result-subtitle">เกิดข้อผิดพลาดในการดำเนินการ<br />กรุณาลองใหม่อีกครั้งหรือเปลี่ยนวิธีชำระเงิน</p>

        <div style={{
          background: "rgba(224,85,85,0.08)",
          border: "1px solid rgba(224,85,85,0.2)",
          borderRadius: "12px",
          padding: "1rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          textAlign: "left"
        }}>
          <span style={{ fontSize: "1.5rem" }}>💡</span>
          <div>
            <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>สาเหตุที่เป็นไปได้</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>ยอดไม่เพียงพอ, บัตรหมดอายุ, หรือธนาคารปฏิเสธ</div>
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => nav("/checkout")}>
          ลองอีกครั้ง
        </button>
        <button className="btn btn-ghost" onClick={() => nav("/")}>
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  );
}
