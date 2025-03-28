import React, { useEffect, useState } from "react";
import RestaurantCard, {
  WithPromotedLebel,
} from "../RestaurantCard/RestaurantCard";
import "./Body.css";
import Shimmer from "../Shimmer/Shimmer";
import { Link } from "react-router";
import useOnlineStatus from "../../CustomHook/useOnlineStatus";
import Game from "../Game/Game";

// Live API URL 
import { SWIGGY_API } from "../../utils/Contrants";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestuarant, setFilteredRestuarant] = useState([]);
  const [searchText, setSearchText] = useState("");

  // console.log("Body", listOfRestaurants);

  const RstaurantCardWithPromoted = WithPromotedLebel(RestaurantCard);

  // Custom hook to check online status
  const onlineStatus = useOnlineStatus(); // Ensures hook is used unconditionally

  // Load restaurant data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // const data = await fetch("http://localhost:4000/data");
    const data = await fetch(SWIGGY_API);

    const json = await data.json();
    const{cards}=json?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.RESTAURANT
    // setTimeout(() => {
    //   // Your code to execute after the delay
    //   setListOfRestaurants(json?.cards || []);
    //   setFilteredRestuarant(json?.cards || []);
    // }, 100); // 2-second delay


//  Live API
    setListOfRestaurants(cards || []);
    setFilteredRestuarant(cards || []);
    


  };

  if (!onlineStatus) {
    return <Game />;
  }

  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  // Function to handle search
  const handleSearch = () => {
    const filtered = listOfRestaurants.filter((restaurant) =>
      restaurant?.card?.card?.info?.cuisines.join(", ")
        ?.toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setFilteredRestuarant(filtered);
  };

  return (
    <div className="body">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for restaurants..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // Trigger search when Enter is pressed
            }
          }}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="filter-res-data">
        <button
          className="filter-btn"
          onClick={() => {
            const filtered = listOfRestaurants.filter(
              (res) => res?.card?.card?.info?.avgRating > 4.7
            );
            setFilteredRestuarant(filtered);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        <h2 className="section-title">Top Restaurants</h2>
        <div className="restaurant-list">
          {filteredRestuarant.map((res) => (
            <Link
              key={res.card.card.info.id}
              to={"/restuarant/" + res.card.card.info.id}
            >
              {res.card.card.info.promoted ? (
                <RstaurantCardWithPromoted resObj={res} />
              ) : (
                <RestaurantCard resObj={res} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
