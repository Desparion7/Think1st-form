import { FormInputData } from '../types/FormInputData';
import axios from 'axios';

export const sendFormData = async (data: FormInputData, url: string) => {
	const formBody = new FormData();

	for (const [key, value] of Object.entries(data)) {
		if (value !== null && value !== undefined) {
			if (value instanceof File) {
				formBody.append(key, value);
			} else {
				formBody.append(key, value.toString());
			}
		}
	}
	try {
		const response = await axios.post(url, formBody, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		console.error('There was a problem with the send form data', error);
		throw error;
	}
};
