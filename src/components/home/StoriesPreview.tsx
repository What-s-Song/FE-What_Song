'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import StoriesModal from './StoriesModal';
import { modalAtom } from '@/state/store/modal';

export default function StoriesPreview() {
	const setModalOpen = useSetAtom(modalAtom);
	const [mainIndex, setMainIndex] = useState(0);
	const STORIES_DATA = [
		{
			user: '박수빈',
		},
		{
			user: '이성호',
		},
		{
			user: '김보민',
		},
		{
			user: '장준환',
		},
	];

	return (
		<>
			<div>
				<Swiper slidesPerView="auto" spaceBetween={16}>
					{STORIES_DATA.map((story, index) => (
						<SwiperSlide key={index} style={{ width: '85px' }}>
							<button
								onClick={() => {
									setModalOpen(true);
									setMainIndex(index);
								}}
								className="flex flex-col items-center"
							>
								<Image
									src="https://i.pinimg.com/564x/f0/a1/9f/f0a19f453d9201c3226c2a6d4be786c0.jpg"
									alt={`story${index}`}
									width={85}
									height={85}
									style={{ objectFit: 'cover' }}
									className="rounded-full mb-3"
								/>
								<span className="text-xl">{story.user}</span>
							</button>
						</SwiperSlide>
					))}
				</Swiper>
				<StoriesModal mainIndex={mainIndex} setMainIndex={setMainIndex} />
			</div>
		</>
	);
}
