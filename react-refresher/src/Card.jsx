import React, { useEffect, useState } from 'react'

const Card = ({ title }) => {
    const [ hasLiked, setHasLiked] = useState(false);
    const [count, setCout] = useState(0);
  useEffect(() =>{
    console.log(`${title}, has been liked: ${hasLiked}`);
  }, [hasLiked]);

  useEffect(() =>{
   console.log("Card Rendered!");
   
  }, []);
  return (
    <div className="card" onClick={() => setCout( count +1)}>
      <h1>{title} <br />{count || null}</h1>
     
     <button onClick={() => setHasLiked(!hasLiked)}>
        { hasLiked ? 'Liked' : 'Like' }
     </button>
    </div>
  )
}

export default Card;
