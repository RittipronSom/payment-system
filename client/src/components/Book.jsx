import React from "react";

const Book = ({ data }) => {
  return <div>
    
        {
            data.map((i)=>{
                return <li>{i.name}</li>
            })
        }
    
  </div>;
};

export default Book;
