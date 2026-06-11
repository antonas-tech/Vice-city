const AUTH_KEY = "vc_admin_session";

// frontend-mock: учетные данные администратора по умолчанию
export const ADMIN_LOGIN = "admin";
export const ADMIN_PASSWORD = "admin";

export function isAuthed(): boolean {
  try {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

export function login(loginValue: string, password: string): boolean {
  if (loginValue.trim() === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
    try {
      sessionStorage.setItem(AUTH_KEY, "1");
    } catch {
      // ignore
    }
    return true;
  }
  return false;
}

export function logout() {
  try {
    sessionStorage.removeItem(AUTH_KEY);
  } catch {
    // ignore
  }
}
