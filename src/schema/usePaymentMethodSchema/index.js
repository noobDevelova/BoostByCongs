import * as Yup from "yup";

export const initialPaymentMethodScheme = {
  payment_via: "",
  sender_name: "",
};

export const usePaymentValidateScheme = Yup.object().shape({
  payment_via: Yup.string().required("Metode pembayaran harus dipilih"),
  sender_name: Yup.string().required("Nama pengirim harus diisi"),
});
