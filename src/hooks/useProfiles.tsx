import { useQuery } from "@tanstack/react-query";
import { getProfiles } from "@/service/profiles.service.ts";
import { Element } from "@/interfaces/element.interface.ts";

const getAllElements = async (): Promise<Element[]> => {
  const { data } = await getProfiles();
  console.log("data", data);
  return data;
};

function useProfiles() {
  const profilesQuery = useQuery({
    queryKey: ["elements"],
    queryFn: () => getAllElements(),
    staleTime: 1000 * 60 * 5,
  });
  const forceRefetch = () => {
    profilesQuery.refetch();
  };
  return { profilesQuery: profilesQuery, forceRefetch };
}

export { useProfiles };
