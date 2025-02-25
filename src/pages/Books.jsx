import { useQuery } from "@tanstack/react-query";

import BooksTable from "../components/books/BooksTable";
import { Outlet, useLocation } from "react-router-dom";

const Books = () => {

    //get current location data information
    const location = useLocation()
    // console.log(location)

    const { isPending, error, data } = useQuery({
        queryKey: ['booksData'],
        queryFn: async () => {
            // const response = await fetch('http://localhost:3000/books')
            const response = await fetch(`${import.meta.env.VITE_BOOKS_API_URL}`)

            return response.json()
        },
        staleTime: Infinity
    })

    if (isPending) return <div> Loading...</div>

    if (error) return <div> {`An error had occured: + ${error.message}`}</div>



    return (
        <div>

            <h1 className="text-2xl  font-bold"> Books </h1>

            {location.pathname == '/admin/books' ?
                isPending ? <div> Loading...</div> : <BooksTable books={data} />
                :
                <Outlet />
            }


        </div>
    );

}

export default Books;


