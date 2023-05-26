import Image from 'next/image';
import { BsPlayFill } from 'react-icons/bs';
import { AiFillEye } from 'react-icons/ai';
import { CgDetailsMore } from 'react-icons/cg';

type Props = {
	musicRoom: {
		title: string;
		host: string;
		view: number;
		isOwner: boolean;
		thumnail: string;
	};
};

export default function MusicRoomCard({ musicRoom: { title, host, view, isOwner, thumnail } }: Props) {
	return (
		<article className="m-2 rounded-[40px] overflow-hidden relative w-96 h-96 block drop-shadow-md">
			<Image src={thumnail} alt={title} layout="fill" />
			<div className="absolute w-96 h-96 bottom-0 left-0 bg-gradient-to-tl from-zinc-900" />
			<h2 className="absolute bottom-32 left-5 text-3xl font-bold text-white">{title}</h2>
			<h5 className="absolute bottom-[6.4rem] left-6 text-white">{host}</h5>
			<span className="absolute bottom-[1.8rem] left-8 bg-white w-16 h-16 rounded-full flex items-center justify-center">
				<BsPlayFill className="w-14 h-14 p-0.5 ml-1" />
			</span>
			<span className="absolute bottom-[1.8rem] left-28 bg-zinc-300 text-zinc-100 bg-opacity-70 w-24 h-14 rounded-3xl flex items-center justify-around p-3">
				<AiFillEye className="w-8 h-8" />
				<p className="text-xl font-semibold mt-0.5">{view}</p>
			</span>
			{isOwner && (
				<button className="absolute top-4 right-9">
					<CgDetailsMore className="w-10 h-10 text-zinc-100" />
				</button>
			)}
		</article>
	);
}