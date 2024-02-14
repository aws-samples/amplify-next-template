import { createContext, useState, useEffect, useContext } from "react";
import { Auth } from "aws-amplify";
import { DataStore } from "aws-amplify";
import { Restaurant } from "../models";

const RestaurantContext = createContext({});

const RestaurantContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [restaurant, setRestaurant] = useState();
  const sub = user?.attributes?.sub;

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setUser);
  }, []);

  useEffect(() => {
    if (!sub) {
      return;
    }
    // fetch restaurant and filter by adminSub
    DataStore.query(Restaurant, (r) => r.adminSub("eq", sub)).then(
      (restaurants) => setRestaurant(restaurants[0])
    );
  }, [sub]);

  return (
    <RestaurantContext.Provider value={{ restaurant, sub, setRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContextProvider;
export const useRestaurantContext = () => useContext(RestaurantContext);
