import { roomApis } from '@/app/service/room';
import ChattingBar from '@/components/bar/ChattingBar';
import StreamingBar from '@/components/bar/StreamingBar';
import Iframe from '@/components/music/iframe/Iframe';
import TitleHeader from '@/components/TitleHeader';

type Props = {
	params: { id: string };
};

export default async function MusicRoomPage({ params: { id } }: Props) {
	// 뮤직룸 상세 정보
	const {
		have: { musicRoomSeq, roomName, roomCode, category, accessAuth },
		extraInfo: { hostEmail, hostName, view },
	} = await roomApis.getRoomData(Number(id));

	return (
		<>
			<TitleHeader title={roomName} previous view={view} />
			<Iframe roomId={musicRoomSeq} roomCode={roomCode} hostEmail={hostEmail} />
			<ChattingBar />
		</>
	);
}
