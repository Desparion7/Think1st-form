import React from 'react';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IoMdCloseCircle } from 'react-icons/io';

type PhotoDropzoneProps = {
	file: File | null;
	onDropFile: (file: File | null) => void;
	openRef: React.RefObject<() => void>;
};

const PhotoDropzone = ({ file, onDropFile, openRef }: PhotoDropzoneProps) => {
	return (
		<div>
			<p className='text-[16px] mb-1'>Photo</p>
			<Dropzone
				accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
				openRef={openRef}
				onDrop={(file) => {
					onDropFile(file[0]);
				}}
				activateOnClick={false}
				className='border-[1px] rounded-[8px] px-6 py-8 border-input-border flex justify-center bg-white'
			>
				{file ? (
					<div className='flex gap-1'>
						<p>{file.name}</p>
						<button>
							<IoMdCloseCircle
								className='text-xl text-text-color hover:text-error-color transition-colors duration-300'
								onClick={() => {
									onDropFile(null);
								}}
							/>
						</button>
					</div>
				) : (
					<p className='flex flex-row gap-1 text-[#898DA9]'>
						<span
							className='underline text-input-active cursor-pointer'
							onClick={() => openRef.current?.()}
						>
							Upload a file
						</span>
						or drag and drop here
					</p>
				)}
			</Dropzone>
		</div>
	);
};

export default PhotoDropzone;
