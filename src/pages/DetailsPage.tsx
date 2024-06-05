import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FavoriteBadge } from 'components/FavoriteBadge';
import NotFound from 'pages/Page-404';
import { Image, Descriptions, DescriptionsProps, Button, Spin } from 'antd';
import { ICar } from "types/types";

import 'car-makes-icons/dist/style.css'

const getCarInfo = (car: ICar): DescriptionsProps['items'] => {
    return [
        {
            label: 'Name',
            children: `${car.name}`,
        },
        {
            label: 'Price',
            children: `${car.price}`,
        },
        {
            label: 'Rating',
            children: `${car.rating}`,
        },
        {
            label: 'Description',
            children: `${car.description}`,
        },
        {
            label: 'Specification',
            children: `${car.specification}`,
        },
    ]
};

const DetailsPage: React.FC = () => {
    const { cars, wishList, addToWishList, removeFromWishList, loading} = useContext(AppContext);
    const { carId} = useParams();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    if (loading) {
        return (
            <div className="spin-wrapper">
                <Spin size="large"/>
            </div>
        )
    } else {
        const car = cars.find(car => car.id === +carId);
        const isCarInWishList = wishList.some((wishListCar) => wishListCar?.id === car?.id);

        return (car ?
                <div className="wrapper">
                    <div className="info-container">
                        <div className="info-content">
                            <Image
                                className="info-image"
                                height={300}
                                width={300}
                                src={car.image}
                            />
                            <div className="btn-wrapper">
                                <FavoriteBadge className="detailed-favorite" isCarInWishList={isCarInWishList}/>
                                {isCarInWishList ? (
                                    <Button type="primary" danger onClick={() => removeFromWishList(car.id)}>
                                        Remove from Wish List
                                    </Button>

                                ) : (
                                    <Button disabled={isCarInWishList} type="primary"
                                            onClick={() => addToWishList(car)}>
                                        Add to Wish List
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="info">
                            <h1 className="info-title">{car.brand} - {car.name}</h1>
                            <div className={`car-${car.brand.toLowerCase()}`}
                                 style={{fontSize: "100px", alignSelf: "center"}}></div>
                        </div>
                    </div>
                    <Descriptions
                        layout="horizontal"
                        bordered
                        items={getCarInfo(car)}
                        column={1}
                    />
                </div>
                :
                <NotFound/>
        );
    }
};

export default DetailsPage;