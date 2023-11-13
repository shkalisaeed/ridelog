import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetVehicles = () => {
   const [loadingVehicles, setLoadingVehicles] = useState(true);
   const [vehicles, setVehicles] = useState([]);
   const { userID } = useGetUserInfo();

   useEffect(() => {
      const fetchVehicles = async () => {
         try {
            setLoadingVehicles(true);

            const vehiclesCollectionRef = collection(db, "vehicles");
            const q = query(vehiclesCollectionRef, where("userID", "==", userID));
            const querySnapshot = await getDocs(q);

            const fetchedVehicles = querySnapshot.docs.map((doc) => ({
               ...doc.data(),
               id: doc.id,
            }));

            setVehicles(fetchedVehicles);
         } catch (error) {
            console.error("Error fetching vehicles: ", error);
            // Handle error as needed
         } finally {
            setLoadingVehicles(false);
         }
      };

      fetchVehicles();
   }, [userID]);

   return { loadingVehicles, vehicles };
};
