import * as Yup from "yup";

export const inGameAccountInitialValue = (method) => {
  return {
    [method === "Email" ? "email" : "phone_number"]: "",
    nickname: "",
    user_id: "",
    rank: "",
    tier: "",
    star: "",
    level: "",
    password: "",
    login_via: "",
  };
};

export const useInGameAccountValidationScheme = (loginMethod) => {
  return Yup.object().shape({
    [loginMethod === "Email" ? "email" : "phone_number"]:
      loginMethod === "Email"
        ? Yup.string().email("Email tidak valid").required("Email diperlukan")
        : Yup.string()
            .matches(/^[0-9]+$/, "No Telp tidak valid")
            .required("No Telp diperlukan"),
    nickname: Yup.string().required("Nickname diperlukan"),
    user_id: Yup.number().required("User ID diperlukan"),
    rank: Yup.string().required("Rank diperlukan"),
    tier: Yup.string().when("rank", {
      is: (rank) =>
        rank && !["Mythic", "Mythic Honor", "Mythic Glory"].includes(rank),
      then: () => Yup.string().required("Tier Diperlukan"),
      otherwise: () => Yup.string(),
    }),
    star: Yup.string().required("Star diperlukan"),
    level: Yup.number().required("Level diperlukan"),
    password: Yup.string().required("Password diperlukan"),
    login_via: Yup.string().required("Login Via diperlukan"),
  });
};
