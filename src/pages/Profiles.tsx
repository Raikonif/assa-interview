import { useProfiles } from "@/hooks/useProfiles.tsx";
import convertToNaturalDate from "@/helpers/convertToNaturalDate.ts";
import BtnGoBack from "@/components/BtnGoBack.tsx";
import { RootState } from "@/redux/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { readElements } from "@/redux/elementsSlice.ts";
import { useEffect } from "react";
import { getProfiles } from "@/service/profiles.service.ts";

function Profiles() {
  const profs = useProfiles();
  const profiles = useSelector((state: RootState) => state.elements);
  const dispatch = useDispatch();

  useEffect(() => {
    getProfiles().then((response) => {
      dispatch(readElements(response.data));
    }).catch((err) => {
      console.error(err);
    });
    // if (profs.profilesQuery.data)
    //   dispatch(readElements(profs.profilesQuery.data));
  }, [dispatch]);

  return (
    <div className="flex w-full flex-col bg-slate-800">
      <div className="flex items-center justify-between border-b-2 border-sky-100 px-4">
        <BtnGoBack />
        <h1 className="md:4xl text-center text-2xl font-bold text-sky-100">Profiles</h1>
        <div className="invisible">
          <BtnGoBack />
        </div>
      </div>
      <div className="flex h-full items-center justify-center">
        {profs.profilesQuery.isLoading && <p className="text-slate-100">Loading data...</p>}
        {profs.profilesQuery.data?.length === 0 && (
          <p className="text-slate-100">No profiles found...</p>
        )}
        {profs.profilesQuery.isError && <p className="text-slate-100">Error...</p>}
      </div>
      <ul className="mt-6 flex flex-col justify-center md:mt-10 md:flex-row md:flex-wrap">
        {profiles &&
          profiles.data.map((profile) => (
            <li key={profile.id} className="m-3">
              <div className="flex items-center gap-5 rounded-xl bg-sky-900 p-4">
                <img
                  src={"https://images.pexels.com/photos/7071988/pexels-photo-7071988.jpeg"}
                  alt={profile.name}
                  className="h-28 w-28 rounded-full shadow-2xl"
                />
                <div className="flex flex-col items-center gap-3 text-white">
                  <span>{profile.name}</span>
                  <span>{convertToNaturalDate(profile.createdAt)}</span>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Profiles;
