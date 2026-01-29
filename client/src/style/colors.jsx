import { useUser } from "../context/useContext";

export const ColorsEstu = {
  // Amarillos
  primary: "#fcbf49",
  primary100: "#FFDE59",
  primary200: "#FFE680",
  primary300: "#FFD700",
  primary800: "#F8E061ff",
  primary900: "#ffc107",
  primary400: "#E6B800",
  primary500: "#CC9A00",
  primary600: "#B38600",
  primary700: "#996F00",
};

export const ColorsLogin = {
  // Naranjas
  secondary100: "#F89C5E",
  secondary200: "#F06724",
  secondary300: "#E67E00",
  secondary400: "#CC7000",
  secondary500: "#B35C00",
  secondary600: "#E95A0C",
};

export const Colors = {

  white: "#FFFFFF",
  greyLight: "#b6b6b6",
  greyLightDos: "#b6b6b6",
  greyDark: "#4D4D4D",
  black: "#000000",
};
export const useColors=()=>{
  const {theme}=useUser();
  
  return{
    primary: theme?.primary || "#fcbf49",
    primary100: theme?.primary100 || "#FFDE59",
    primary200: theme?.primary200 || "#FFE680",
    primary300: theme?.primary300 || "#FFD700",
    primary400: theme?.primary400 || "#E6B800",
    primary500: theme?.primary500 || "#CC9A00",
    primary600: theme?.primary600 || "#B38600",
    primary700: theme?.primary700 || "#996F00",
    primary800: theme?.primary800 || "#F8E061ff",
    primary900: theme?.primary900 || "#ffc107",
  }
}