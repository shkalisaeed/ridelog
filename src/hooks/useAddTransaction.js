import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
   const transactionCollectionRef = collection(db, "transactions");
   const { userID } = useGetUserInfo();

   const addTransaction = async ({
      rego, // Add rego to the parameters
      transactionType,
      transactionAmount,
      description,
      transactionDate,
   }) => {
      try {
         // You may want to validate the input data here

         await addDoc(transactionCollectionRef, {
            userID,
            rego, // Include the rego field
            description,
            transactionAmount,
            transactionType,
            transactionDate,
            createdAt: serverTimestamp(),
         });
      } catch (error) {
         console.error("Error adding transaction: ", error);
         // Handle error as needed
      }
   };

   return { addTransaction };
};
