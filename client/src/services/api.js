export const API_BASE = "http://localhost:3000";

// ===============================
// Helpers de sesión
// ===============================
function getSessionToken() {
  return (
    localStorage.getItem("gt_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    ""
  );
}

function saveSessionToken(token) {
  if (!token) return;

  // Guardamos en ambos por compatibilidad con partes antiguas del sistema
  localStorage.setItem("gt_token", token);
  localStorage.setItem("token", token);
}

function clearSessionToken() {
  localStorage.removeItem("gt_token");
  localStorage.removeItem("token");
  localStorage.removeItem("authToken");
}

// ===============================
// Request general
// ===============================
async function request(path, { method = "GET", body, headers } = {}) {
  const token = getSessionToken();

  let res;

  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(headers || {}),
      },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    throw new Error("No se pudo conectar con el servidor");
  }

  if (!res.ok) {
    const text = await res.text();
    console.error("API ERROR ->", path, res.status, text);

    let data = {};
    try {
      data = JSON.parse(text);
    } catch {}

    throw new Error(
      data.error ||
      data.mensaje ||
      data.message ||
      text ||
      `Error ${res.status}`
    );
  }

  let data = {};
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  // Si el backend devuelve token, lo guardamos
  if (data?.token) {
    saveSessionToken(data.token);
  }

  // Por si algún endpoint devuelve { data: { token: "..." } }
  if (data?.data?.token) {
    saveSessionToken(data.data.token);
  }

  return data;
}

// ===============================
// API
// ===============================
export const api = {
  // Ajusta esta ruta solo si tu backend usa otra.
  // En tu código actual estás usando /api/login.
  login: (payload) => request("/api/login", { method: "POST", body: payload }),

  logout: () => {
    clearSessionToken();
    return request("/auth/logout", { method: "POST" });
  },

  // ===============================
  // Proyectos
  // ===============================
  myProjects: () => request("/projects/my"),

  addMember: (projectId, data) =>
    request(`/projects/${projectId}/members`, {
      method: "POST",
      body: data,
    }),

  createProject: (payload) =>
    request("/projects", {
      method: "POST",
      body: payload,
    }),

  // ===============================
  // GitHub
  // ===============================
  overview: () => request("/github/me/overview"),

  repos: () => request("/github/me/repos"),

  createRepo: (projectId) =>
    request(`/github/project/${projectId}/repo`, {
      method: "POST",
    }),

  importRepos: () =>
    request("/github/import/repos", {
      method: "POST",
    }),

  invitePersonalOnAll: () =>
    request("/github/me/invite-personal-on-all", {
      method: "POST",
    }),

  retryInvites: () =>
    request("/github/me/retry-invites", {
      method: "POST",
    }),

  linkGithub: (type) => {
    const t = getSessionToken();

    console.log("TOKEN PARA GITHUB:", t);

    if (!t) {
      alert("No hay sesión activa. Inicia sesión nuevamente.");
      clearSessionToken();
      window.location.href = "/login";
      return;
    }

    window.location.href =
      `${API_BASE}/github/oauth/start` +
      `?type=${encodeURIComponent(type)}` +
      `&t=${encodeURIComponent(t)}`;
  },

  installApp: () => {
    const t = getSessionToken();

    console.log("TOKEN PARA GITHUB APP:", t);

    if (!t) {
      alert("No hay sesión activa. Inicia sesión nuevamente.");
      clearSessionToken();
      window.location.href = "/login";
      return;
    }

    window.location.href =
      `${API_BASE}/github/app/install?t=${encodeURIComponent(t)}`;
  },

  // ===============================
  // Materias
  // ===============================
  myMaterias: () => request("/api/materias/mias"),
};