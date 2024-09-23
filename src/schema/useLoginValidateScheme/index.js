/**
 * Module: useLoginValidateScheme
 * Description: Defines validation schema for login form using Yup.
 */

// Import Yup for validation
import * as Yup from "yup";

// Define validation schema using Yup
const useLoginValidateScheme = Yup.object().shape({
  // Define validation for email field
  email: Yup.string().email("Email Invalid").required("Email Harus Diisi"),

  // Define validation for password field
  password: Yup.string().required("Password Harus Diisi"),
});

// Export useLoginValidateScheme
export default useLoginValidateScheme;
