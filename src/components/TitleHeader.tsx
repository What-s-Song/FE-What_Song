import { AiFillEye } from 'react-icons/ai';
import { IoNotifications } from 'react-icons/io5';
import PreviousButton from './button/PreviousButton';

type Props = {
	title: string;
	notification?: boolean;
	previous?: boolean;
	view?: number;
};
export default function TitleHeader({ title, notification, previous, view }: Props) {
	return (
		<header className="flex w-full h-20 my-1 justify-center items-center">
			{previous && <PreviousButton />}
			<h1 className="text-3xl font-bold">{title}</h1>
			{notification && <IoNotifications className="text-3xl absolute right-5" />}
			{view && (
				<span className="flex justify-center items-center absolute right-5 gap-1">
					<AiFillEye className="text-3xl h-20" />
					<p className="text-2xl font-semibold text-zinc-400 p-1 mt-0.5">{view}</p>
				</span>
			)}
		</header>
	);
}