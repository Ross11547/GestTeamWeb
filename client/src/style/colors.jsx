import { useUser } from "../context/useContext";

export const ColorsEstu = {
  primary: "#fcbf49",
  primary100: "#FFDE59",
  primary200: "#FFE680",
  primary300: "#FFD700",
  primary400: "#E6B800",
  primary500: "#CC9A00",
  primary600: "#B38600",
  primary700: "#996F00",
  primary800: "#F8E061",
  primary900: "#ffc107",
};

export const ColorsLogin = {
  secondary100: "#F89C5E",
  secondary200: "#F06724",
  secondary300: "#E67E00",
  secondary400: "#CC7000",
  secondary500: "#B35C00",
  secondary600: "#E95A0C",
};

export const ColorsAdmin = {
  primary: "#F89C5E",
  primary100: "#FFE1CC",
  primary200: "#FFC299",
  primary300: "#FFA366",
  primary400: "#F89C5E",
  primary500: "#F06724",
  primary600: "#E95A0C",
  primary700: "#CC4F0B",
  primary800: "#A84308",
  primary900: "#7A3106",
};

export const Colors = {
  white: "#FFFFFF",
  greyLight: "#b6b6b6",
  greyLightDos: "#b6b6b6",
  greyDark: "#4D4D4D",
  black: "#000000",
};

export const ColorsBase = Colors;

const isString = (value) => {
  return typeof value === "string" && value.trim() !== "";
};

const normalizeText = (value) => {
  if (!value) return "";
  return String(value).trim().toLowerCase();
};

const getRoleName = (user) => {
  if (!user) return "";

  if (isString(user.rol)) {
    return normalizeText(user.rol);
  }

  if (isString(user.rol?.nombre)) {
    return normalizeText(user.rol.nombre);
  }

  if (isString(user.Rol?.nombre)) {
    return normalizeText(user.Rol.nombre);
  }

  if (isString(user.role)) {
    return normalizeText(user.role);
  }

  if (isString(user.role?.nombre)) {
    return normalizeText(user.role.nombre);
  }

  return "";
};

const isAdminUser = (user) => {
  const roleName = getRoleName(user);

  return (
    roleName === "admin" ||
    roleName === "administrador" ||
    roleName === "administradora" ||
    Number(user?.idRol) === 1
  );
};

const userHasAcademicThemeScope = (user) => {
  return Boolean(
    user?.idFacultad ||
      user?.facultad ||
      user?.facultad?.theme ||
      user?.idCarrera ||
      user?.carrera ||
      user?.carrera?.theme ||
      user?.carrera?.facultad?.theme
  );
};

const isValidTheme = (theme) => {
  if (!theme || typeof theme !== "object") return false;

  return (
    isString(theme.primary) ||
    isString(theme.primary100) ||
    isString(theme.primary200) ||
    isString(theme.primary300) ||
    isString(theme.primary400) ||
    isString(theme.primary500) ||
    isString(theme.primary600) ||
    isString(theme.primary700) ||
    isString(theme.primary800) ||
    isString(theme.primary900)
  );
};

const normalizeTheme = (theme, fallback) => {
  return {
    primary: theme?.primary || fallback.primary,
    primary100: theme?.primary100 || fallback.primary100,
    primary200: theme?.primary200 || fallback.primary200,
    primary300: theme?.primary300 || fallback.primary300,
    primary400: theme?.primary400 || fallback.primary400,
    primary500: theme?.primary500 || fallback.primary500,
    primary600: theme?.primary600 || fallback.primary600,
    primary700: theme?.primary700 || fallback.primary700,
    primary800: theme?.primary800 || fallback.primary800,
    primary900: theme?.primary900 || fallback.primary900,
  };
};

export const useColors = () => {
  const { user, theme } = useUser();

  const isAdmin = isAdminUser(user);

  /*
    Regla principal:
    - Si es Admin y NO pertenece a facultad/carrera, usa naranja.
    - Si es Admin y SÍ pertenece a facultad/carrera, usa el color real de esa facultad/carrera.
    - Si no es Admin, usa theme si existe; si no, amarillo institucional.
  */

  if (isAdmin) {
    const canUseFacultyTheme = userHasAcademicThemeScope(user) && isValidTheme(theme);

    if (canUseFacultyTheme) {
      return normalizeTheme(theme, ColorsAdmin);
    }

    return ColorsAdmin;
  }

  if (isValidTheme(theme)) {
    return normalizeTheme(theme, ColorsEstu);
  }

  return ColorsEstu;
};