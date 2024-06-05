import React, { useContext } from 'react';
import { ICar } from "types/types";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col } from "antd";
import { FavoriteBadge } from './FavoriteBadge';

interface Props {
    car: ICar;
}

const { Meta } = Card;

const getCarDescription = (car: ICar): React.ReactElement => {
    return (
        <ul>
            <li><span className="desc-text">Rating: </span>{car?.rating || ''}</li>
            <li><span className="desc-text">Price: </span>{car?.price || ''}</li>
        </ul>
    )
};

const Car: React.FC<Props> = ({ car }) => {
    const { wishList, addToWishList, removeFromWishList } = useContext(AppContext);
    const navigate = useNavigate();

    const navigateToDetailsPage = (event: React.MouseEvent, carId: number) => {
        event.preventDefault();
        event.stopPropagation();
        navigate(`/details/${carId}`);
    };

    const isCarInWishList = wishList.some((wishListCar) => wishListCar.id === car.id);
    return (
        <Col xs={{span: 24}} sm={{span: 12}} md={{span: 6}} key={car.id} data-testid="car">
            <Card
                hoverable
                cover={<img className="card-image" alt={car.name} src={car.image} />}
                onClick={(event) => navigateToDetailsPage(event, car.id)}
            >
                <Meta title={car.name} description={getCarDescription(car)}/>
                <FavoriteBadge isCarInWishList={isCarInWishList} />
            </Card>
            <div className="btn-wrapper">
                {isCarInWishList ? (
                    <Button type="primary" danger onClick={() => removeFromWishList(car.id)}>
                        Remove from Wish List
                    </Button>

                ) : (
                    <Button disabled={isCarInWishList} type="primary" onClick={() => addToWishList(car)}>
                        Add to Wish List
                    </Button>
                )}
            </div>
        </Col>
    )
}

export default Car;