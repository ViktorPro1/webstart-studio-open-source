import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import API from "../../api/api";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Токен відсутній");
      return;
    }

    API.get(`/auth/verify-email?token=${token}`)
      .then(() => {
        setStatus("success");
        setMessage("Email успішно підтверджено!");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(
          err.response?.data?.error || "Токен недійсний або прострочений",
        );
      });
  }, [searchParams]);

  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      {status === "loading" && <p>Перевіряємо токен...</p>}
      {status === "success" && (
        <>
          <h2 style={{ color: "#3b3486" }}>✅ {message}</h2>
          <p>Тепер ви можете користуватись усіма функціями платформи.</p>
          <Link to="/" style={{ color: "#3b3486" }}>
            На головну
          </Link>
        </>
      )}
      {status === "error" && (
        <>
          <h2 style={{ color: "#e53e3e" }}>❌ {message}</h2>
          <Link to="/" style={{ color: "#3b3486" }}>
            На головну
          </Link>
        </>
      )}
    </div>
  );
}
