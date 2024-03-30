import React from 'react';
import { FaCircleExclamation } from 'react-icons/fa6';
import { FormInputData } from '../types/FormInputData';
import { cn } from '../utils/utils';

type FormFieldProps = {
	id: string;
	label: string;
	name: keyof FormInputData;
	value: string | number | undefined;
	error: string | undefined;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormField = ({
	id,
	label,
	name,
	value,
	error,
	onChange,
}: FormFieldProps) => {
	return (
		<div className='flex flex-col gap-1'>
			<label htmlFor={id} className='text-[16px]'>
				{label}
			</label>
			<input
				type='text'
				id={id}
				name={name}
				className={cn(
					'border-[1px] rounded-[8px] p-2 border-input-border focus:border-input-active focus:outline-[2px] outline-none',
					{
						'border-[2px] border-error-color outline-none': error,
					}
				)}
				value={value}
				onChange={onChange}
			/>
			{error && (
				<div className='flex gap-1 mt-1 text-[14px]'>
					<FaCircleExclamation className='pt-1 text-xl text-error-color' />
					{error === 'Please use correct formatting.' ? (
						<div className='flex flex-col'>
							<span>{error}</span>
							<span>Example: address@email.com</span>
						</div>
					) : (
						<span>{error}</span>
					)}
				</div>
			)}
		</div>
	);
};

export default FormField;
