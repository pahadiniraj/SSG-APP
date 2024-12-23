import React from "react";
import { MdDelete } from "react-icons/md";
import { useDeleteJobByIdMutation } from "../../../redux/services/job";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { JobIdButtonProps } from "../../../utils/types/jobTypes";

const DeleteJobButton: React.FC<JobIdButtonProps> = ({ jobId }) => {
  const router = useRouter();
  const [deleteJobById, { isLoading }] = useDeleteJobByIdMutation();

  const handleDelete = async () => {
    const isConfirm = window.confirm("Are you sure you want to delete");
    if (!isConfirm) return;

    try {
      const response = await deleteJobById(jobId).unwrap();
      if (response.success === true) {
        toast.success(response.message || "Job deleted successfully");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete job");
      console.error(error);
    }
  };

  return (
    <button onClick={handleDelete}>
      {isLoading ? (
        <ClipLoader color="#000000" size={20} />
      ) : (
        <MdDelete className="text-2xl hover:text-red-600 duration-200 hover:scale-105" />
      )}
    </button>
  );
};

export default DeleteJobButton;
