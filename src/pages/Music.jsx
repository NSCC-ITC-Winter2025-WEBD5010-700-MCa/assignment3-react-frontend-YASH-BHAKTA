import { useState, useEffect } from "react";

const Music = () => {

    const [number, setNumber] = useState(0);
    const [music, setMusic] = useState([]);

    useEffect(() => {
        console.log('Hello from useEffect');
    }, [number]);

    useEffect(() => {
        console.log("Fetching data");
        const fetchData = async() => {
            const response = await fetch('http://localhost:3000/music');
            const data = await response.json();
            setMusic(data);
        }

        fetchData();

    }, []);

    return (
      <div>
        <h1 className="text-2xl font-bold">Music</h1>
        <p onClick={() => { setNumber(Math.random()) }}>See my music dataset.</p>
        <ul>
            {
                music.map(music => {
                    return <li>{music.title}</li>
                })
            }
        </ul>
      </div>
    );
};
  
export default Music;
  