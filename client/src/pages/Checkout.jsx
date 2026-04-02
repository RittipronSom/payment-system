import { useEffect, useState } from "react";
import { getOrder, payOrder } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [order, setOrder] = useState(null);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const productName = localStorage.getItem("productName") || "สินค้า";

  useEffect(() => {
    const load = async () => {
      const id = localStorage.getItem("orderId");
      if (!id) { nav("/"); return; }
      try {
        const data = await getOrder(id);
        setOrder(data);
      } catch {
        setError("ไม่สามารถโหลดข้อมูลได้");
      }
    };
    load();
  }, []);

  const handlePay = async () => {
    setPaying(true);
    setError(null);
    try {
      const res = await payOrder(order.id);
      if (res.success) {
        nav("/success");
      } else {
        nav("/fail");
      }
    } catch {
      setError("เกิดข้อผิดพลาดในการชำระเงิน");
      setPaying(false);
    }
  };

  if (error) return (
    <div className="page">
      <div className="card" style={{ textAlign: "center" }}>
        <span style={{ fontSize: "2rem" }}>⚠️</span>
        <p style={{ marginTop: "1rem", color: "var(--text-dim)" }}>{error}</p>
        <button className="btn btn-ghost" onClick={() => nav("/")} style={{ marginTop: "1rem" }}>
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  );

  if (!order) return (
    <div className="page">
      <div className="loading">
        <div className="spinner" />
        <span>กำลังโหลดข้อมูล...</span>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="card">
        <div className="brand" style={{ marginBottom: "1.5rem" }}>
          <div className="brand-icon">💳</div>
          <span className="brand-name">PayStore</span>
        </div>

        <div className="page-header">
          <h1>ชำระเงิน</h1>
          <p>ตรวจสอบรายการก่อนชำระ</p>
        </div>

        <div className="summary">
          <div className="summary-row">
            <span className="summary-label">รายการ</span>
            <span className="summary-value">{productName}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">เลขที่คำสั่งซื้อ</span>
            <span className="summary-value" style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>
              #{String(order.id).padStart(6, "0")}
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-label">สถานะ</span>
            <span className={`badge badge-${order.status}`}>
              {order.status === "pending" ? "รอชำระ" : order.status}
            </span>
          </div>
          <div className="summary-row summary-total">
            <span className="summary-label">ยอดชำระ</span>
            <span className="summary-value">฿{Number(order.total).toLocaleString()}</span>
          </div>
        </div>

        <div className="divider">วิธีชำระเงิน</div>

        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "1rem 1.25rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem"
        }}>
          <span style={{ fontSize: "1.5rem" }}>🃏</span>
          <div>
            <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>บัตรเครดิต / เดบิต</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>Visa · Mastercard · JCB</div>
          </div>
          <div style={{
            marginLeft: "auto",
            width: "16px", height: "16px",
            borderRadius: "50%",
            border: "2px solid var(--gold)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gold)" }} />
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={handlePay}
          disabled={paying || order.status !== "pending"}
        >
          {paying
            ? "⏳ กำลังดำเนินการ..."
            : order.status !== "pending"
              ? `สถานะ: ${order.status}`
              : `ชำระ ฿${Number(order.total).toLocaleString()} →`}
        </button>

        <button className="btn btn-ghost" onClick={() => nav("/")}>
          ยกเลิก
        </button>

        <div className="secure-note">
          🔒 การชำระเงินถูกเข้ารหัส SSL
        </div>
      </div>
    </div>
  );
}
