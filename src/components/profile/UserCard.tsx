import Image from 'next/image';
import { SimpleUser } from '@/types/user';
import { friendApis } from '@/app/service/friend';

type Props = {
	user: SimpleUser;
	ownerSeq: number;
};

export default function UserCard({ user: { imgURL, nickname, email, memberSeq }, ownerSeq }: Props) {
	const handleButton = async () => {
		const res = await friendApis.addFriend({ ownerSeq, targetSeq: memberSeq });
		console.log(res);
		return res;
	};
	return (
		<article className="flex w-full items-center justify-center relative my-1">
			<div className="w-[90%] h-28 px-4 flex items-center cursor-pointer">
				<div className="absolute w-[5rem] h-[5rem] p-4">
					<Image
						src="/assets/cat-music.jpeg"
						alt="프로필이미지"
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						style={{ objectFit: 'cover' }}
						className="rounded-full"
					/>
				</div>
				<h2 className="absolute left-[10.5rem] top-8 text-xl font-semibold truncate w-[60%] text-start">{nickname}</h2>
				<p className="absolute left-[10.5rem] top-[3.5rem] text-xl text-neutral-400">{email}</p>
				<button
					onClick={handleButton}
					className="absolute right-20 top-[2.6rem] text-xl bg-neutral-300 rounded-lg  w-20 h-9 hover:scale-105"
				>
					팔로우
				</button>
			</div>
		</article>
	);
}
