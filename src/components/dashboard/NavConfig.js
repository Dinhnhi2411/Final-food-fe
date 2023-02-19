import Iconify from "../../components/Iconify/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: getIcon("material-symbols:insert-chart-rounded"),
  },
 
  {
    title: "product",
    path: "/dashboard/products",
    icon: getIcon("dashicons:products"),
  },
  {
    title: "order",
    path: "/dashboard/order",
    icon: getIcon("material-symbols:order-approve-sharp"),
  },
];

export default navConfig;