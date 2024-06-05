import React, { useContext } from 'react';
import { AppContext } from "../context/AppContext";

const TotalPrice: React.FC = () => {
    const { getTotalPrice } = useContext(AppContext);
    return (
        <div className="total-price">
            Total Price of Wish-List: <span>{getTotalPrice()}</span>
        </div>
    );
};

export default TotalPrice;