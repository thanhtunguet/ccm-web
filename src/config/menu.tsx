import { AppRoute } from "./app-route";

export const menu: Array<{
    label: string;
    key: string;
}> = [
  {
    key: AppRoute.BANK,
    label: "Ngân hàng",
  },
  {
    key: AppRoute.CARD_CLASSES,
    label: "Hạng thẻ",
  },
  {
    key: AppRoute.CUSTOMER,
    label: "Khách hàng",
  },
  {
    key: AppRoute.STORE,
    label: "Cửa hàng",
  },
  {
    key: AppRoute.CARD,
    label: "Thẻ",
  },
  {
    key: AppRoute.TRANSACTION,
    label: "Giao dịch",
  },
  {
    key: AppRoute.HELP,
    label: "Hướng dẫn",
  },
];
