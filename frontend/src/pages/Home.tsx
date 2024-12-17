import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [item, setItem] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/')
      .then((response) => {
        setItem(response.data.data);
      })
      .catch((error) => {
        console.log(error);

      })
  }, [])
  return (
    <div>{item}</div>
  )
} 

export default Home