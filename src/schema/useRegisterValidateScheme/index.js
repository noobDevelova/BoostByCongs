/**
 * Module: useRegisterValidationScheme
 * Description: Defines validation schema for user registration form using Yup.
 */

// Import Yup for validation
import * as Yup from "yup";

// Define initial values for user registration form
export const initialSignUpScheme = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

// Define validation schema using Yup
export const useRegisterValidationScheme = Yup.object().shape({
  username: Yup.string()
    .min(6, "Minimal 6 Karakter")
    .max(20, "Maksimal 20 Karakter")
    .required("Username Harus Diisi"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])/,
      "Harus Berisi Minimal 8 Karakter, Satu Huruf Besar, Satu Huruf Kecil, Satu Angka dan Satu Karakter Huruf Khusus"
    )
    .min(6, "Password Minimal 6 Karakter")
    .required("Password Harus Diisi"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password Harus Sama")
    .required("Konfirmasi Password Harus Diisi"),
});
