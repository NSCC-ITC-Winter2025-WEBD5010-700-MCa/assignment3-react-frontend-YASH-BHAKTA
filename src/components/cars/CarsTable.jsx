import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const CarsTable = ({ cars }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteCarMutation = useMutation({
    mutationFn: async (carId) => {
      const response = await fetch(`${import.meta.env.VITE_CARS_API_URL}/${carId}`, {
        method: "DELETE",
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["carsData"]);
    },
    onError: () => {
      alert("Unable to delete");
    },
  });

  const handleDelete = (carId) => {
    if (window.confirm(`Are you sure you wish to delete record ${carId}?`)) {
      deleteCarMutation.mutate(carId);
    }
  };

  return (
    <>
      <p>
        <Link
          to="/admin/cars/create"
          className="bg-blue-700 text-white text-sm px-2 py-0 rounded-md shadow-sm hover:bg-blue-600 transition duration-200"
        >
          Add New Car
        </Link>
      </p>
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Make</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Model</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Price(USD)</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => {
            return (
              <tr key={car.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{car._id}</td>
                <td className="border border-gray-300 px-4 py-2">{car.make}</td>
                <td className="border border-gray-300 px-4 py-2">{car.model}</td>
                <td className="border border-gray-300 px-4 py-2">{car.year}</td>
                <td className="border border-gray-300 px-4 py-2">{car.price}</td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                  <button className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600">Details</button>
                  <button
                    onClick={() => navigate(`/admin/cars/${car._id}/edit`)}
                    className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CarsTable;