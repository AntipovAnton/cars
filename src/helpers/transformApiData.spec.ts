import { transformApiData } from './transformApi';
import { ICar, ICarV2 } from "types/types";

describe('transformApiData', () => {
    test('transforms API data correctly', () => {
        const carsV2: ICarV2[] = [
            {
                id: 1,
                name: 'Car 1',
                brand: 'Brand 1',
                description: 'Description 1',
                specification: 'Specification 1',
                rating: {
                    rating: 4.5,
                    reviewsCount: 100,
                },
                price: {
                    price: 20000,
                    discount: 0,
                },
                image: {
                    imageUrl: 'image1.jpg',
                    altText: 'Car 1 Image',
                },
            },
        ];

        const expectedCars: ICar[] = [
            {
                id: 1,
                name: 'Car 1',
                brand: 'Brand 1',
                description: 'Description 1',
                specification: 'Specification 1',
                rating: 4.5,
                reviewsCount: 100,
                price: 20000,
                image: 'image1.jpg',
            }
        ];

        const transformedData = transformApiData(carsV2);
        expect(transformedData).toEqual(expectedCars);
        expect(transformApiData(undefined)).toEqual([]);
        expect(transformApiData(null)).toEqual([]);
        expect([]).toEqual([]);
    });
});