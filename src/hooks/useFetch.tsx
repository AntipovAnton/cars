import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState } from "react";
import { Alert } from 'antd';

interface UseFetchProps {
	url: string;
	method: string;
	body?: {};
	onSuccess?: (data: AxiosResponse["data"]) => void;
}

interface UseFetchResult {
	doRequest: (props?: {}) => Promise<AxiosResponse["data"]>;
	loading: boolean;
	errors: React.ReactElement | null;
}

function useFetch({ url, method, body, onSuccess } : UseFetchProps): UseFetchResult {
	const [errors, setErrors] = useState<React.ReactElement | null>(null);
	const [loading, setIsLoading] = useState<boolean>(false);

	const doRequest = async (props = {}) => {
		try {
			setIsLoading(true);
			setErrors(null);
			const response: AxiosResponse = await axios[method](url, { ...body, ...props });

			if (onSuccess) {
				onSuccess(response.data);
			}

			return response.data;
		} catch (err) {
			if(err instanceof AxiosError) {
				setErrors(
					<div className="error-wrapper">
						<h4>Oops....</h4>
						{err.response.data.errors.map((err: AxiosError, index: number) => (
							<Alert type="error" key={index} message={err.message}/>
						))}
					</div>);
			} else {
				setErrors(
					<div className="error-wrapper">
						<Alert type="error" message={err?.message || 'Something went wrong'} />
					</div>
				);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return { doRequest, errors, loading };
}

export default useFetch;
