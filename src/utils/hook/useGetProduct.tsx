import { getProduct } from "@/server/actions/product/getProduct";
import { useQuery } from "@tanstack/react-query";

export default function useGetProduct() {
  const {
    data: product,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: getProduct,
  });

  return { product, isFetching, error };
}
