import { Slider } from '@mantine/core';

type AgeSliderProps = {
	value: number;
	onChange: (value: number) => void;
};

const AgeSlider = ({ value, onChange }: AgeSliderProps) => {
	return (
		<div className='mb-10'>
			<p className='text-[16px] mb-2'>Age</p>
			<div className='flex justify-between text-[12px] mb-3'>
				<p>8</p>
				<p>100</p>
			</div>
			<Slider
				color='#761be4'
				labelAlwaysOn
				min={8}
				value={value}
				onChange={onChange}
				max={100}
				thumbSize={18}
				size='sm'
				styles={{
					thumb: {
						border: 'none ',
						background: '#761be4',
					},
					label: {
						position: 'absolute',
						top: 'calc(100% + 10px)',
						left: '50%',
						transform: 'translateX(-50%)',
						background: `url(./tooltip.png)`,
						backgroundSize: 'cover',
						width: '36px',
						height: '30px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 1,
						color: '#761be4',
						paddingTop: '14px',
					},
				}}
				className='age-slider'
			/>
		</div>
	);
};

export default AgeSlider;
