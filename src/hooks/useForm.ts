import { useState } from 'react';
import { FormInputData, ErrorFormInputData } from '../types/FormInputData';

export const useForm = () => {
	const [formData, setFormData] = useState<FormInputData>({
		firstName: '',
		lastName: '',
		email: '',
		age: 0,
		file: null,
		selectedDate: null,
		selectedTime: '',
	});
	const [formErrors, setFormErrors] = useState<Partial<ErrorFormInputData>>(
		{}
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
		setFormErrors({
			...formErrors,
			[name]: '',
		});
	};

	const handleChangeAge = (newAge: number) => {
		setFormData({
			...formData,
			age: newAge,
		});
	};

	const handleDropFile = (file: File | null) => {
		setFormData({
			...formData,
			file: file,
		});
	};

	const handleSelectDate = (date: Date) => {
		setFormData({
			...formData,
			selectedDate: date,
		});
	};
	const handleSelectTime = (hour: string) => {
		setFormData({
			...formData,
			selectedTime: hour,
		});
	};

	const validateForm = () => {
		const errors: Partial<ErrorFormInputData> = {};

		if (!formData.firstName.trim()) {
			errors.firstName = 'First name is required';
		}
		if (!formData.lastName.trim()) {
			errors.lastName = 'Last name is required';
		}
		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
			errors.email = 'Please use correct formatting.';
		}

		if (Object.keys(errors).length === 0) {
			return true;
		} else {
			setFormErrors(errors);
			return false;
		}
	};

	const resetFormData = () => {
		setFormData({
			firstName: '',
			lastName: '',
			email: '',
			age: 28,
			file: null,
			selectedDate: null,
			selectedTime: '',
		});
		setFormErrors({});
	};

	return {
		formData,
		formErrors,
		handleChange,
		handleChangeAge,
		handleDropFile,
		handleSelectDate,
		handleSelectTime,
		validateForm,
		resetFormData,
	};
};
