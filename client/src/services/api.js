const API = "http://localhost:3000/api";

export const createOrder = async (amount) => {
  const res = await fetch(`${API}/create-order`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ amount }),
  });
  return res.json();
};

export const getOrder = async (id) => {
  const res = await fetch(`${API}/order/${id}`);
  return res.json();
};

export const payOrder = async (orderId) => {
  const res = await fetch(`${API}/pay`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ orderId }),
  });
  return res.json();
};