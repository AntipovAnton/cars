export type ICar = {
	id: number;
	name: string;
	brand: string;
	description: string;
	specification: string;
	rating: number;
	reviewsCount: number;
	price: number;
	image: string;
	// test: string;
}

export type ICarV2 = {
	id: number;
	name: string;
	brand: string;
	description: string;
	specification: string;
	rating: {
		rating: number;
		reviewsCount: number;
	};
	price: {
		price: number;
		discount: number;
	}
	image: {
		imageUrl: string;
		altText: string;
	}
}

// type ICar = Omit<Car, 'image' | 'reviewsCount'>
