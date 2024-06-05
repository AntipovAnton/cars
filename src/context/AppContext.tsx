import React, { createContext, useEffect, useState } from 'react';
import { ICar } from "types/types";
import useFetch from "hooks/useFetch";
import { API_URL, API_VERSION } from "config/constant";
import { transformApiData } from "../helpers/transformApi";

interface AppContext {
    cars: ICar[];
    errors: React.ReactElement | null;
    loading: boolean;
    wishList: ICar[];
    addToWishList: (car: ICar) => void;
    removeFromWishList: (carId: number) => void;
    getTotalPrice:() => number;
}

export const AppContext = createContext<AppContext | null>(null);

const AppProvider: React.FC<any> = ({ children }) => {
    const [cars, setCars] = useState<ICar[]>([]);
    const [wishList, setWishList] = useState<ICar[]>([]);

    const { doRequest, errors,loading } = useFetch({
        url: API_URL,
        method: 'get',
    });

    const fetchCars = async () => {
    	const data = await doRequest();
        switch (API_VERSION){
            case "v1":
                setCars(data);
                break;
            case "v2":
                setCars(transformApiData(data));
                break;
            default:
                console.error('Wrong API version', API_VERSION);
        }
    };

    useEffect(() => {
        try {
            fetchCars();
            const wishListData = JSON.parse(localStorage.getItem('wishList'));
            if (wishListData) {
                setWishList(wishListData);
            }
        } catch (error) {
            console.error(error);
        }

    }, [])

    useEffect(() => {
        localStorage.setItem('wishList', JSON.stringify(wishList));

    }, [wishList])

    const addToWishList = (car: ICar) => {
        setWishList((prevWishList: ICar[]) => [...prevWishList, car]);
    };

    const getTotalPrice = () => {
        const totalPrice = wishList.reduce((total: number, car: ICar): number => total + car.price, 0);
        return parseFloat(totalPrice.toFixed(2));
    };

    const removeFromWishList = (carId: number) => {
        setWishList((prevWishList: ICar[]) => prevWishList.filter((car: ICar) => car.id !== carId));
    };

    return (
        <AppContext.Provider
            value={{ cars, errors, loading,  wishList, addToWishList, removeFromWishList, getTotalPrice }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;