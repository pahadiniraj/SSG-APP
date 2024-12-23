import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { RootState } from "../../redux/store";
import { removeFavorite } from "../../redux/slice/favoriteSlice";
import { JobCard } from "@/components/Favorite/FavoriteJobCard";

const FavoriteJob = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(
    (state: RootState) => state.favorites.favorites
  );

  const handleDelete = (jobId: string) => {
    dispatch(removeFavorite(jobId));
  };

  return (
    <div className="container mx-auto p-5 mt-32">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Favorite Jobs
      </h1>

      {favorites.length === 0 ? (
        <p className="text-xl text-gray-600 h-screen">No favorite jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((job) => (
            <JobCard key={job._id} job={job} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteJob;
