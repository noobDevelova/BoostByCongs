import * as Yup from "yup";

export const rankCatalogInitialValues = {
  product_type: "",
  showOnCatalog: false,
  details: {
    item_name: "",
    price: 0,
  },
};

export const useRankCatalogValidateSchema = Yup.object().shape({
  product_type: Yup.string().required("Tipe produk harus di isi!"),
  showOnCatalog: Yup.boolean().required("Katalog produk harus dipilih"),
  details: Yup.object().shape({
    item_name: Yup.string().required("Nama produk harus diisi!"),
    price: Yup.number("Harus di isi dengan angka!")
      .positive("Harus angka positif!")
      .min(1, "Harus lebih besar dari 0")
      .required("Harga harus diisi"),
  }),
});
