import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import{db} from "../config/firebase-config";
import {useGetUserInfo} from "./useGetUserInfo";

export const useAddVehicle = () => {
    const vehicleCollectionRef = collection(db, "vehicles")
    const {userID} = useGetUserInfo();
    const addVehicle = async ({
        make,
        model,
        year,
        rego,
        odo_reading,
        insurance_provider,
        insurance_type,
        tank_size


    }) => {
        
        await addDoc(vehicleCollectionRef, {
            userID,
            make,
            model,
            year,
            rego,
            odo_reading,
            insurance_provider,
            insurance_type,
            tank_size,
            createdAt: serverTimestamp(),

        });
    };
    
    return{addVehicle};
};
