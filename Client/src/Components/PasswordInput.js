import React from "react";
import '../Styling/PasswordInput.css'

export default function PasswordInput({ value, onChange, placeholder = "Password" }) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="password-wrapper">
      <input
        type={visible ? "text" : "password"}
        className="password-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label="Password"
        required
      />

      <button
        type="button"
        className="password-toggle"
        onClick={() => setVisible(v => !v)}
        aria-pressed={visible}
        aria-label={visible ? "Hide password" : "Show password"}
        title={visible ? "Hide password" : "Show password"}
      >
        {/* Simple emoji fallback — replace with an icon if you want */}
        {visible ? "🙈" : "👁️"}
      </button>
    </div>
  );
}