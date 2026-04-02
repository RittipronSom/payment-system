import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/api";

const products = [
  { id: 1, icon: "📚", name: "React Pro Course", desc: "Master React ตั้งแต่พื้นฐานถึง Advanced", amount: 100 },
  { id: 2, icon: "⚡", name: "Node.js Bootcamp", desc: "Backend development ด้วย Node + Express", amount: 199 },
  { id: 3, icon: "🎨", name: "UI/UX Design Kit", desc: "Design system components สำหรับนักพัฒนา", amount: 299 },
];

export default function Home() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(null);

  const handleBuy = async (product) => {
    setLoading(product.id);
    try {
      const order = await createOrder(product.amount);
      localStorage.setItem("orderId", order.id);
      localStorage.setItem("productName", product.name);
      nav("/checkout");
    } catch {
      alert("เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="page" style={{ justifyContent: "flex-start", paddingTop: "4rem" }}>
      <div style={{ width: "100%", maxWidth: "560px" }}>
        <div className="brand" style={{ marginBottom: "2.5rem" }}>
          <div className="brand-icon">💳</div>
          <span className="brand-name">PayStore</span>
        </div>

        <div className="page-header">
          <h1>เลือกคอร์สเรียน</h1>
          <p>คอร์สพรีเมียมสำหรับนักพัฒนา — ชำระได้ทันที</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {products.map((p) => (
            <div key={p.id} className="card" style={{ padding: "1.5rem", maxWidth: "100%" }}>
              <div className="product" style={{ margin: 0, background: "transparent", border: "none", padding: 0 }}>
                <div className="product-icon">{p.icon}</div>
                <div className="product-info">
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                </div>
                <div className="product-price">
                  <div className="amount">฿{p.amount}</div>
                  <div className="currency">บาท</div>
                </div>
              </div>
              <div style={{ borderTop: "1px solid var(--border)", marginTop: "1.25rem", paddingTop: "1.25rem" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => handleBuy(p)}
                  disabled={loading === p.id}
                >
                  {loading === p.id ? "กำลังสร้างคำสั่งซื้อ..." : "ซื้อเลย →"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="secure-note" style={{ marginTop: "2rem" }}>
          🔒 ระบบชำระเงินปลอดภัย · เข้ารหัสทุกธุรกรรม
        </div>
      </div>
    </div>
  );
}
