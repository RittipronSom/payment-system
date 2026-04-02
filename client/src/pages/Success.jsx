import { useNavigate } from "react-router-dom";

export default function Success() {
  const nav = useNavigate();

  return (
    <div className="page">
      <div className="card" style={{ textAlign: "center" }}>
        <span className="result-icon">✅</span>
        <h1 className="result-title" style={{ color: "var(--green)" }}>ชำระเงินสำเร็จ!</h1>
        <p className="result-subtitle">ขอบคุณสำหรับการชำระเงิน<br />ระบบได้บันทึกข้อมูลลงฐานข้อมูลแล้ว</p>

        <div style={{
          background: "rgba(76,175,122,0.08)",
          border: "1px solid rgba(76,175,122,0.2)",
          borderRadius: "12px",
          padding: "1rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          textAlign: "left"
        }}>
          <span style={{ fontSize: "1.5rem" }}>📧</span>
          <div>
            <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>ใบเสร็จถูกส่งแล้ว</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>ตรวจสอบอีเมลของคุณเพื่อดูรายละเอียด</div>
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => nav("/")}>
          ซื้อสินค้าเพิ่มเติม
        </button>
      </div>
    </div>
  );
}
