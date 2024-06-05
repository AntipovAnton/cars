import { ICar, ICarV2} from "types/types";

export const transformApiData = (cars: ICarV2[] = []): ICar[] => {
    if (Array.isArray(cars)) {
        return cars?.map((car) => {
            return {
                id: car.id,
                name: car.name,
                brand: car.brand,
                description: car.description,
                specification: car.specification,
                rating: car.rating.rating,
                reviewsCount: car.rating.reviewsCount,
                price: car.price.price,
                image: car.image.imageUrl,
            }
        });
    } else {
        return [];
    }
};