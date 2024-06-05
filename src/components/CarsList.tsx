import React, { Suspense } from 'react';
import { Row } from 'antd';
import { ICar } from 'types/types';
import { CarSkeleton } from './Car-Skeleton';

const Car = React.lazy(() => import(/* webpackChunkName: "car" */ "./Car"));

interface Props {
    cars: ICar[];
}

export const CarsList: React.FC<Props> = ({cars}) => {
    return (
        <div className="cars" data-testid="cars">
            <Row gutter={[16, 16]} justify="center" align="middle" >
                {cars?.map((car) => {
                    return (
                        <Suspense key={car.id} fallback={<CarSkeleton/>}>
                            <Car car={car}/>
                        </Suspense>
                    )
                })}
            </Row>
        </div>
    );
}

export default CarsList;
