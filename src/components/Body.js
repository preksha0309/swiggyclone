import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import {useEffect, useState} from "react";
import Shimmer from "./Shimmer";


  

const Body = () => {
    // before fetch api 
    // const[listOfRestraunts,setlistOfRestraunts] = useState(resList);
    const[listOfRestraunts,setlistOfRestraunts] = useState([]);
    const[searchText,setsearchText] = useState("")
     useEffect(()=>{
        fetchData();
     }
     ,[]);

     const fetchData = async ()=>{
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5960249&lng=77.1806861&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();

        console.log(json);
        console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        //optional chaining - check json avaibale or not 
        setlistOfRestraunts(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

     };
     
    //  IF WE HAVE NO RESTRAUNTS ON LIST
     if(listOfRestraunts.length ===0){
        return <Shimmer/>
     }

    return (
    <div className="body">
    <div className="search">
    <input
    type="text"
    className="search-input"
    placeholder="search"
    value={searchText}
    onChange={(e)=>setsearchText(e.target.value)}
    />

    <button
            onClick={() => {
              // Filter the restraunt cards and update the UI
              // searchText
              console.log(searchText);
              const filteredRestaurant = listOfRestraunts.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setlistOfRestraunts(filteredRestaurant);


            }}
          >
            Search
          </button>


   
    </div>
    <button
    className="filter-btn"
    onClick={() =>{
        const filteredlist = listOfRestraunts.filter((res) =>res.info.avgRating >4);
        setlistOfRestraunts(filteredlist);

    }}>
    Filter Rest</button>
    <div className="res-container">
    {
      resList.map((restraunt) => <RestaurantCard key={restraunt.info.id} resData={restraunt}/>)
      
    }
    </div>
    </div>
    );
  };

  export default Body;

  // we have done .include instead of === becoz we are not matching the text written 
//   in input container  we have to find that word 