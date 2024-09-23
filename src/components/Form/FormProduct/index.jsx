import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import FormSelect from "../FormSelect";
import {
  rankCatalogInitialValues,
  useRankCatalogValidateSchema,
} from "../../../schema/useRankCatalogSchema";
import FormInput from "../FormInput";
import LinearBtn from "../../Button";

const FormProduct = ({ handleUpload, initialData }) => {
  const [initialValues, setInitialValues] = useState(rankCatalogInitialValues);
  const [defaultOption, setDefaultOption] = useState(null);
  const [defaultShowOption, setDefaultShowOption] = useState(null);

  const selectType = [
    { key: "1", value: "unit" },
    { key: "2", value: "paket" },
  ];

  const selectShow = [
    { key: "1", value: "Ditampilkan" },
    { key: "2", value: "Disimpan" },
  ];

  useEffect(() => {
    if (initialData) {
      setInitialValues({
        ...rankCatalogInitialValues,
        product_type: initialData.product_type || "",
        details: {
          item_name: initialData.details?.item_name || "",
          price: initialData.details?.price || "",
        },
        showOnCatalog: initialData.showOnCatalog || false,
        id: initialData.id,
      });

      const defaultOption = {
        key: initialData.product_type === "unit" ? "1" : "2",
        value: initialData.product_type || "",
      };
      setDefaultOption(defaultOption);

      const defaultShowOption = selectShow.find(
        (option) => option.value === initialData.showOnCatalog
      );
      setDefaultShowOption(defaultShowOption);
    } else {
      setInitialValues(rankCatalogInitialValues);
      setDefaultOption(null);
      setDefaultShowOption(null);
    }
  }, [initialData]);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={useRankCatalogValidateSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Form Values on Submit: ", values);
          handleUpload(values);
          resetForm();
        }}
        validateOnChange={false}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          isSubmitting,
        }) => (
          <View style={styles.formContainer}>
            <FormInput
              label="Nama Item"
              type="text"
              onChange={handleChange("details.item_name")}
              value={values.details.item_name}
              msg={!isSubmitting && errors.details?.item_name}
              frameType="sheet"
            />
            <FormInput
              label="Harga Item"
              type="number"
              onChange={handleChange("details.price")}
              value={values.details.price}
              msg={!isSubmitting && errors.details?.price}
              frameType="sheet"
              setFieldValue={(val) => setFieldValue("details.price", val)}
            />
            <View style={styles.selectWrapper}>
              <FormSelect
                data={selectType}
                setSelected={handleChange("product_type")}
                msg={!isSubmitting && errors?.product_type}
                placeholder="Tipe produk"
                defaultOption={defaultOption}
                inputStyles={{ width: 110 }}
              />
              <FormSelect
                data={selectShow}
                setSelected={(value) => {
                  const booleanValue = value === "Ditampilkan" ? true : false;
                  setFieldValue("showOnCatalog", booleanValue);
                }}
                msg={!isSubmitting && errors?.showOnCatalog}
                placeholder="Katalog"
                defaultOption={defaultShowOption}
                inputStyles={{ width: 110 }}
              />
            </View>
            <LinearBtn title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default FormProduct;

const styles = StyleSheet.create({
  formContainer: {
    gap: 10,
  },

  selectWrapper: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
  },
});
