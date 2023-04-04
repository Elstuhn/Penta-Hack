import React from "react";


const supabase = createClient("https://cwoqhbnsiqcvlwypmeaq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3b3FoYm5zaXFjdmx3eXBtZWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1ODY5ODcsImV4cCI6MTk5NjE2Mjk4N30.9OTliAVhZWiJci3r9W_CR8ORBzL2GSg3WtmnW2FumlQ");

function Body() {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Body;