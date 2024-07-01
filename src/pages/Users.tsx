import { API } from "@/service"
import { useQuery } from "@tanstack/react-query"

const Users = () => {
  const { query, getKey } = API.USERS.SEARCH()
  const { data, isLoading } = useQuery(
    {
      queryFn: query,
      queryKey: getKey()
    }
  )

  return (
    <>
      {isLoading ? "loading ..." : JSON.stringify(data?.data)}
    </>
  )
}

export { Users }
