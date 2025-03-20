import { useQuery } from "@tanstack/react-query";

import { Outlet, useLocation } from "react-router-dom";
import CarsTable from "../components/cars/CarsTable";

const Cars = () => {

    //get current location data information
    const location = useLocation()
    // console.log(location)

    const { isPending, error, data } = useQuery({
        queryKey: ['carsData'],
        queryFn: async () => {
            // const response = await fetch('http://localhost:3000/books')
            const response = await fetch(`${import.meta.env.VITE_CARS_API_URL}`)

            return response.json()
        },
        staleTime: Infinity
    })

    if (isPending) return <div> Loading...</div>

    if (error) return <div> {`An error had occured: + ${error.message}`}</div>



    return (
        <div>

            <h1 className="text-2xl  font-bold"> Cars </h1>

            {location.pathname == '/admin/cars' ?
                isPending ? <div> Loading...</div> : <CarsTable cars={data} />
                :
                <Outlet />
            }
        </div>
    );

}

export default Cars;
