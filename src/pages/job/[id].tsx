import React from "react";
import { useRouter } from "next/router";

const JobById = () => {
  const router = useRouter();
  const { id } = router.query; 

  return (
    <div className="mt-32 p-10">
      <h1>Job ID: {id}</h1>
    </div>
  );
};

export default JobById;
