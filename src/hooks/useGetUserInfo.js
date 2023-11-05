//import {addDoc, collection, serverTimestamp} from "firebase/firestore";
//import{db} from '../config/firebase-config';

export const useGetUserInfo = () => {
const {name, profilePhoto, userID, isAuth} = JSON.parse(
    localStorage.getItem("auth")
    );
return{ name, profilePhoto, userID, isAuth};

};


