import { format } from "date-fns";
import { id } from "date-fns/locale";

export const formatTimestamp = (timestamp, type) => {
  const date = timestamp.toDate();
  return format(date, type, { locale: id });
};
