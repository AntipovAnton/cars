import React, { useCallback, useContext, useMemo, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Pagination from 'components/Pagination';
import { Spin } from 'antd';
// import { API_URL } from "src/config/constant";
import CarsList from 'components/CarsList';
// import useFetch from "hooks/useFetch";
// import { ICar } from "types/types";

let PageSize = 12;

const ListingPage: React.FC = () : React.ReactElement => {
	const { cars, loading, errors } = useContext(AppContext);
	////////////////////Solution for 2 API endpoints (list and carId)////////////////////
	// const [cars, setCars] = useState<ICar[]>([]);
	// const { doRequest, errors, loading } = useFetch({
	// 	url: API_URL,
	// 	method: 'get',
	// });
	//
	// const fetchCars = async () => {
	// 	const cars = await doRequest();
	// 	setCars(cars);
	// };
	//
	// useEffect(() => {
	// 	fetchCars();
	// }, []);

	const [currentPage, setCurrentPage] = useState<number>(1);

	const pageHandler = useCallback((page: number)=> {
		setCurrentPage(page);
	}, [currentPage]);

	const currentPageCars = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return cars.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, cars]);

	if (loading) {
		return (
			<div className="spin-wrapper" data-testid="listing-page-spin-wrapper">
				<Spin size="large"/>
			</div>
		)
	}

	return (
		<>
			{errors}
			<CarsList cars={currentPageCars}/>
			<Pagination
				className="pagination-bar"
				currentPage={currentPage}
				totalCount={cars.length}
				pageSize={PageSize}
				onPageChange={pageHandler}
			/>
		</>
	);
};

export default ListingPage;
