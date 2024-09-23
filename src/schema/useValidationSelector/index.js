import * as Yup from "yup";

export const initialValidatorSelector = (type, value, confirmValue) => {
  switch (type) {
    case "email":
      return {
        email: value,
      };
    case "username":
      return {
        username: value,
      };
    case "password":
      const passwordInitialValues = {
        password: value,
      };
      
      if (confirmValue) {
        passwordInitialValues.passwordConfirmation = confirmValue;
      }

      return passwordInitialValues;
    case "phone_number":
      return {
        phone_number: value,
      };
  }
};

export const validatorSelector = (
  type,
  includeConfirmPasswordValidation = false
) => {
  switch (type) {
    case "email":
      return Yup.object().shape({
        email: Yup.string()
          .email("Email Anda Tidak Valid")
          .required("Email Harus Diisi"),
      });
    case "username":
      return Yup.object().shape({
        username: Yup.string()
          .min(6, "Minimal 6 Karakter")
          .max(20, "Maksimal 20 Karakter")
          .required("Username Harus Diisi"),
      });
    case "password":
      let passwordSchema = Yup.object().shape({
        password: Yup.string().required("Password Harus Diisi"),
      });

      if (includeConfirmPasswordValidation) {
        passwordSchema = passwordSchema.shape({
          confirmPassword: Yup.string()
            .oneOf(
              [Yup.ref("password"), null],
              "Konfirmasi Password Harus Sama"
            )
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])/,
              "Harus Berisi Minimal 8 Karakter, Satu Huruf Besar, Satu Huruf Kecil, Satu Angka dan Satu Karakter Huruf Khusus"
            )
            .min(6, "Password Minimal 6 Karakter")
            .required("Konfirmasi Password Harus Diisi"),
        });
      }

      return passwordSchema;
    case "phone_number":
      return Yup.object().shape({
        phone_number: Yup.string()
          .matches(/^[0-9]+$/, "No. Telp Harus Berisi Angka")
          .min(10, "No. Telp Minimal 10 Karakter")
          .max(15, "No. Telp Maksimal 15 Karakter")
          .required("No. Telp Harus Diisi"),
      });
    // Add other cases if needed, like phone_number, etc.
    default:
      return Yup.object();
  }
};
