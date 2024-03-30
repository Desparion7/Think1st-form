import React, { useRef, useState } from 'react';
import FormField from './FormFileds';
import { useForm } from '../hooks/useForm';
import AgeSlider from './AgeSlider';
import PhotoDropzone from './PhotoDropZone';
import CalendarSelect from './CalendarSelect';
import { sendFormData } from '../utils/sendFormData';

const Form = () => {
	const [formSend, setFormSend] = useState<boolean>(false);

	const openRef = useRef<() => void>(null);
	const {
		formData,
		formErrors,
		handleChange,
		handleChangeAge,
		handleDropFile,
		handleSelectDate,
		handleSelectTime,
		validateForm,
		resetFormData,
	} = useForm();

	const formFilled =
		formData.firstName.trim() !== '' &&
		formData.lastName.trim() !== '' &&
		formData.email.trim() !== '' &&
		formData.file !== null &&
		formData.selectedDate !== null &&
		formData.selectedTime !== '';

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		if (validateForm()) {
			console.log('The form is correct:', formData);
			sendFormData(formData, 'http://letsworkout.pl/submit');
			setFormSend(true);
		} else {
			console.log('The form contains errors.');
		}
	};

	return (
		<div className='flex flex-col justify-center items-center h-full my-10'>
			<div>
				<h1 className='font-medium text-[24px] mb-3 text-left'>
					Personal Info
				</h1>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-2 sm:w-[426px]'
				>
					<FormField
						id='firstName'
						label='First Name'
						name='firstName'
						value={formData.firstName}
						error={formErrors.firstName}
						onChange={handleChange}
					/>
					<FormField
						id='lastName'
						label='Last Name'
						name='lastName'
						value={formData.lastName}
						error={formErrors.lastName}
						onChange={handleChange}
					/>
					<FormField
						id='email'
						label='Email Address'
						name='email'
						value={formData.email}
						error={formErrors.email}
						onChange={handleChange}
					/>
					<AgeSlider
						value={formData.age}
						onChange={handleChangeAge}
					/>
					<PhotoDropzone
						file={formData.file}
						onDropFile={handleDropFile}
						openRef={openRef}
					/>
					<h2 className='font-medium text-[24px] mb-1 text-left'>
						Your workout
					</h2>
					<CalendarSelect
						handleSelectDate={handleSelectDate}
						selectedDate={formData.selectedDate}
						handleSelectTime={handleSelectTime}
						selectedTime={formData.selectedTime}
					/>
					<button
						type='submit'
						className='mt-5 bg-default-button hover:bg-hover-button transition-colors duration-300 w-full py-[16px] px-[32px] rounded-[4px] text-[18px] text-white disabled:bg-inactive-button'
						disabled={!formFilled}
					>
						Send Application
					</button>
				</form>
				{formSend && (
					<div className='mt-5'>
						<p className='text-xl text-green-600'>
							The form has been sent!
						</p>
						<button
							type='button'
							className='mt-1 bg-default-button hover:bg-hover-button transition-colors duration-300 w-full py-[16px] px-[32px] rounded-[4px] text-[18px] text-white disabled:bg-inactive-button'
							onClick={() => {
								resetFormData();
								setFormSend(false);
							}}
						>
							Try again
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Form;
