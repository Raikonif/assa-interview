import convertToNaturalDate from "@/helpers/convertToNaturalDate.ts";
import BtnGoBack from "@/components/BtnGoBack.tsx";
import { RootState, useAppDispatch } from "@/redux/store.ts";
import { useSelector } from "react-redux";
import { fetchProfiles } from "@/redux/elementsSlice.ts";
import { useEffect } from "react";

function Profiles() {
  const profiles = useSelector((state: RootState) => state.elements);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  const renderProfiles = (profile) => (
    <li
      key={profile.id}
      className="m-3 transition delay-150 duration-500 ease-in-out hover:-translate-y-1 hover:scale-105"
    >
      <div className="flex items-center gap-5 rounded-xl bg-slate-700 p-4">
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
  );

  return (
    <div className="flex w-full flex-col bg-slate-800">
      <div className="flex items-center justify-between border-b-2 border-sky-100 bg-slate-900 px-4 md:p-3">
        <BtnGoBack />
        <h1 className="md:4xl text-center text-2xl font-bold text-sky-100">Profiles</h1>
        <div className="invisible">
          <BtnGoBack />
        </div>
      </div>
      <div className="flex h-full items-center justify-center">
        {profiles.isLoading && <p className="text-slate-100">Loading data...</p>}
        {!profiles.isLoading && Array.isArray(profiles.data) && profiles.data.length === 0 && (
          <p className="text-slate-100">No profiles found...</p>
        )}
        {!profiles.isLoading && profiles.error && <p className="text-slate-100">Error...</p>}
      </div>
      <ul className="mt-6 flex flex-col justify-center md:mt-10 md:flex-row md:flex-wrap">
        {profiles.data && Array.isArray(profiles.data) && profiles.data.map(renderProfiles)}
      </ul>
    </div>
  );
}

export default Profiles;
