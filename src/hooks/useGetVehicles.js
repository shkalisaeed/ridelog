// useGetVehicles.js

import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetVehicles = () => {
   const [loadingVehicles, setLoadingVehicles] = useState(true);
   const [vehicles, setVehicles] = useState([]);
   const { userID } = useGetUserInfo();

   const vehiclesCollectionRef = collection(db, "vehicles");

   const deleteVehicle = async (vehicleId) => {
      const vehicleDocRef = doc(db, "vehicles", vehicleId);

      try {
         await deleteDoc(vehicleDocRef);
         console.log("Vehicle deleted from Firestore:", vehicleId);
      } catch (error) {
         console.error("Error deleting vehicle from Firestore:", error.message);
         throw error;
      }
   };

   useEffect(() => {
      const fetchVehicles = async () => {
         try {
            setLoadingVehicles(true);
   
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
   }, [userID]); // Removed vehiclesCollectionRef from the dependency array
   

   return { loadingVehicles, vehicles, deleteVehicle };
};

