import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CarsForm from './CarsForm';

function CarsEdit() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  console.log("Car ID from URL params:", _id); 

  const { data, isLoading, error } = useQuery({
    queryKey: ["cars", _id],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_CARS_API_URL}/${_id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch car details");
      }

      return response.json();
    },
  });

  const editCarMutation = useMutation({
    mutationFn: async (updatedCarData) => {
      console.log("Updating car:", updatedCarData); 

      const response = await fetch(`${import.meta.env.VITE_CARS_API_URL}/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCarData),
      });

      if (!response.ok) {
        throw new Error("Failed to update car");
      }

      return response.json();
    },
    onSuccess: () => {
      console.log("Car updated successfully!");
      queryClient.invalidateQueries(["cars", _id]);
      navigate("/admin/cars");
    },
    onError: (error) => {
      console.error("Mutation error:", error.message);
    },
  });

  const processData = (updatedCarData) => {
    editCarMutation.mutate(updatedCarData);
  };

  if (isLoading) return <p>Loading car details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Car - ID: {data?._id}</h2>
      <CarsForm onDataCollection={processData} initialData={data} />
    </div>
  );
}

export default CarsEdit;
