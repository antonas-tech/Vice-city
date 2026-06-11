import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, ShieldCheck, User } from "lucide-react";
import { login } from "./auth";
import { navigate } from "../hooks/useHashRoute";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";

type AdminLoginModalProps = {
  onClose: () => void;
  /** вызывается после успешного входа; по умолчанию — переход на #/admin */
  onSuccess?: () => void;
};

export function AdminLoginModal({ onClose, onSuccess }: AdminLoginModalProps) {
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(loginValue, password)) {
      onClose();
      if (onSuccess) {
        onSuccess();
      } else {
        navigate("#/admin");
      }
    } else {
      setError(true);
    }
  };

  return (
    <Modal onClose={onClose} ariaLabel="Вход для администратора">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-7 sm:p-8" noValidate>
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-neon-purple/40 bg-neon-purple/10 text-neon-purple shadow-glow-purple">
            <ShieldCheck className="h-7 w-7" />
          </span>
          <h2 className="font-display text-2xl font-bold text-white">Administrator</h2>
          <p className="text-sm text-slate-400">
            Панель управления клубом Vice City Adler
          </p>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Логин
          </span>
          <div className="relative">
            <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              autoComplete="username"
              value={loginValue}
              onChange={(e) => {
                setLoginValue(e.target.value);
                setError(false);
              }}
              placeholder="admin"
              className={`input-glass pl-11 ${error ? "border-neon-pink/60" : ""}`}
              aria-invalid={error}
            />
          </div>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Пароль
          </span>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••••"
              className={`input-glass pl-11 pr-12 ${error ? "border-neon-pink/60" : ""}`}
              aria-invalid={error}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition-colors hover:text-neon-cyan"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </label>

        {error && (
          <p className="rounded-xl border border-neon-pink/30 bg-neon-pink/10 px-4 py-2.5 text-center text-sm font-medium text-neon-pink">
            Неверный логин или пароль
          </p>
        )}

        <Button type="submit" size="lg" className="w-full">
          <ShieldCheck className="h-4 w-4" />
          Войти в панель
        </Button>
      </form>
    </Modal>
  );
}
