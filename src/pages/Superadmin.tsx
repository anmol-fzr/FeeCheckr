import { useSideBarRole } from "@/hooks/useSideBarRole";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/service";

const Superadmin = () => {
  useSideBarRole();

  const { isLoading, data } = useQuery({
    queryKey: ["ADMIN"],
    queryFn: API.ADMIN.GET,
  });

  console.log({ data });

  return <>boom</>;
};

export { Superadmin };
