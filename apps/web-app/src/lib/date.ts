import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const distanceToNow = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
};

export const formatDate = (date: Date) => {
  return format(date, `dd/MM/yyyy HH:mm`, { locale: ptBR });
};
