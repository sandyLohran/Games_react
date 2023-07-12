import './Starall.css'
function StarAll({averageRating} ) {
     
    return (
        <div> 
           
                {[1].map((star, index) => (
                    <div key={index} className="d-flex justify-content-center align-items-center gap-1 mb-1  estilocss">
                        <p className="m-0 ">{averageRating.toFixed(1).replace(".",",")}</p>
                    <svg 
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className=""
                        >
                        <path
                            fill={averageRating >= star ? "orange" : "gray"}
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                            />
                    </svg>
                            </div>
                ))}
            
        </div>
    );
}

export default StarAll;
