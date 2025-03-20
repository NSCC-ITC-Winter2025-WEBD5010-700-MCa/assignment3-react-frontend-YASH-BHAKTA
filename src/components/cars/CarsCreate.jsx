import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import CarsForm from './CarsForm';

const CarsCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createCarMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${import.meta.env.VITE_CARS_API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData); // Log API error
        throw new Error(errorData.message || 'Failed to create car');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['carsData']);
      navigate('/admin/cars');
    },
    onError: (error) => {
      console.error("Mutation Error:", error.message);
    }
  });

  const processData = (data) => {
    createCarMutation.mutate(data);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-center">Create a New Car</h2>
      <CarsForm onDataCollection={processData} />
    </div>
  );
};

export default CarsCreate;
