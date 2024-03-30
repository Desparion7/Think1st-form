import { MdInfo } from 'react-icons/md';
import { MdPlayArrow } from 'react-icons/md';
import { Calendar } from '@mantine/dates';
import { useQuery } from '@tanstack/react-query';
import { fetchHolidays } from '../utils/fetchHolidays';
import { HolidayDate } from '../types/holidayDate';
import moment from 'moment';
import dayjs from 'dayjs';
import { cn } from '../utils/utils';
import { isMobile } from 'react-device-detect';

type CalendarSelectPropsType = {
	handleSelectDate: (date: Date) => void;
	selectedDate: Date | null;
	handleSelectTime: (hour: string) => void;
	selectedTime: string;
};

const CalendarSelect = ({
	handleSelectDate,
	selectedDate,
	handleSelectTime,
	selectedTime,
}: CalendarSelectPropsType) => {
	const { isError, data } = useQuery({
		queryKey: ['holidays'],
		queryFn: async () => {
			const data = await fetchHolidays({
				country: 'PL',
				year: '2023',
			});
			return data;
		},
	});
	const isSunDay = (date: Date) => {
		const day = dayjs(date).day();
		return day === 0;
	};
	const blockedDates = data?.data
		.filter((date: HolidayDate) => date.type === 'NATIONAL_HOLIDAY')
		.map((date: HolidayDate) => date.date);

	const disabledDays = (date: Date) => {
		const isBlocked = blockedDates?.some(
			(d: string | number | Date | dayjs.Dayjs | null | undefined) =>
				dayjs(date).isSame(d, 'date')
		);
		const isSunday = isSunDay(date);

		return isBlocked || isSunday;
	};

	const isObservanceDay = data?.data
		.filter((date: HolidayDate) => date.type === 'OBSERVANCE')
		.map((date: HolidayDate) => ({ name: date.name, date: date.date }));

	const formatedDate = moment(selectedDate).format('YYYY-MM-DD');

	const observance = isObservanceDay?.find(
		(obs: HolidayDate) => obs.date === formatedDate
	);

	return (
		<div className='flex flex-col gap-2 sm:flex-row justify-between'>
			<div>
				<h3 className='text-[16px] mb-3'>Date</h3>
				<div className='border-input-border border-[1px] rounded-[8px] p-4'>
					<Calendar
						size={isMobile ? 'sm' : 'md'}
						getDayProps={(date) => ({
							selected:
								selectedDate !== null &&
								dayjs(date).isSame(selectedDate, 'date'),
							onClick: () => handleSelectDate(date),
							disabled: disabledDays(date),
						})}
						nextIcon={
							<MdPlayArrow className='text-inactive-button text-xl' />
						}
						previousIcon={
							<MdPlayArrow className='text-inactive-button text-xl rotate-180' />
						}
						className='custom-calendar'
					/>
				</div>
				{observance && (
					<div className='flex items-center gap-1 mt-2'>
						<MdInfo className='text-xl text-inactive-button' />
						<p>It is {observance.name}.</p>
					</div>
				)}
				{isError && (
					<p className='mt-3 text-error-color'>
						All holidays have not been loaded
					</p>
				)}
			</div>
			{selectedDate && (
				<div className='w-[18.5em]'>
					<h3 className='text-[16px] mb-3'>Time</h3>
					<div className='flex flex-row  gap-1 flex-wrap justify-between sm:flex-col sm:items-end'>
						{['10:00', ' 12:00', '14:00', '16:00', '18:00'].map(
							(hour) => (
								<button
									type='button'
									key={hour}
									onClick={() => handleSelectTime(hour)}
									className={cn(
										'py-2 px-3.5 border-[1px] rounded-[8px] border-input-border outline-none ',
										{
											'border-input-active':
												selectedTime === hour,
										}
									)}
								>
									{hour}
								</button>
							)
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default CalendarSelect;
