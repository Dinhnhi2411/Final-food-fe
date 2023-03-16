import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonLoading({ children, isLoading, ...sx }) {
  return <>{isLoading ? <Skeleton {...sx} /> : children}</>;
}