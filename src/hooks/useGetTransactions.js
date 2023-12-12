// useGetTransactions.js

import { useEffect, useState } from "react";
import { collection, doc, orderBy, query, where, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { userID } = useGetUserInfo();

  const transactionCollectionRef = collection(db, "transactions");

  const deleteTransaction = async (transactionId) => {
    const transactionDocRef = doc(db, "transactions", transactionId);

    try {
      await deleteDoc(transactionDocRef);
      console.log("Transaction deleted from Firestore:", transactionId);
    } catch (error) {
      console.error("Error deleting transaction from Firestore:", error.message);
      throw error;
    }
  };

  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );
      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });
        });
        setTransactions(docs);
      });
    } catch (err) {
      console.error(err);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, setTransactions, deleteTransaction };
};
