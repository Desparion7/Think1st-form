export type FormInputData = {
	firstName: string;
	lastName: string;
	email: string;
	age: number;
	file: File | null;
	selectedDate: Date | null;
	selectedTime: string;
};
export type ErrorFormInputData = {
	firstName: string;
	lastName: string;
	email: string;
	age: string;
	file: string;
	selectedDate: string;
	selectedTime: string;
};
