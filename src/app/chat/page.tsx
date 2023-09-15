'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { RiCloudFill } from 'react-icons/ri';
import ChattingBar from '@/components/bar/ChattingBar';
import { getCookie } from '@/constants/cookie';

type Message = { message: string };
const emoji = ['👏', '💪', '🔥', '❤️', '🤩'];
const mock = [{ message: 'ㅋㅋㅋㅋ' }, { message: 'good' }, { message: 'wow' }];
export default function ChattingPage() {
	// 불러온 메세지 내역 저장
	const [messages, setMessages] = useState<Message[]>([]);
	// 새로 전송할 메세지 상태
	const [newMessage, setNewMessage] = useState('');

	const mockSubscribe = () => {
		setMessages(mock);
	};
	const client = useRef<CompatClient>();

	const wsConnectSubscribe = () => {
		client.current = Stomp.over(() => {
			const sock = new SockJS('https://5a5f-2001-2d8-e2b4-1ed2-4d56-cee3-97d-d6a9.ngrok-free.app/ws-stomp');
			return sock;
		});
		try {
			client.current.connect(
				{
					'ngrok-skip-browser-warning': '69420',
					token: `Bearer ${getCookie('accessToken')}`,
				},
				() => {
					client.current!.subscribe(
						// `/백엔드와 협의한 api주소/{구독하고 싶은 방의 id}`,
						`/stream/test/post`,
						(data) => {
							const testMessage = JSON.parse(data.body);
							console.log(testMessage);
						},
						{}
					);
				}
			);
		} catch (e) {
			console.log(e);
		}
	};
	const sendHandler = (e) => {
		e.preventDefault();
		// client.current!.send('/백엔드와 협의한 api주소', {}, JSON.stringify(newMessage));
		// client.current!.send(
		// 	`/app/post/test`,
		// 	{
		// 			'ngrok-skip-browser-warning': '69420',
		// 			token: `Bearer ${getCookie('accessToken')}`,
		// 	},
		// 	JSON.stringify({ message: 'hi' })
		// );
		if (newMessage !== '') {
			setMessages([...messages, { message: newMessage }]);
			setNewMessage('');
		}
	};
	useEffect(() => {
		wsConnectSubscribe();
		mockSubscribe();
	}, []);
	return (
		<section>
			<div className="w-full absolute bottom-52 p-8 h-[230px] overflow-scroll bg-scroll bg-slate-100">
				{messages.map((message, index) => (
					<div className="bg-blue-400 p-4 m-2 rounded-full w-fit text-white" key={index}>
						{message.message}
					</div>
				))}
			</div>
			<article className="flex flex-col gap-2 w-full h-44 px-10 absolute bottom-8">
				<ul className="flex justify-evenly items-center h-20">
					{emoji.map((item) => (
						<li className="text-4xl p-5" key={item}>
							{item}
						</li>
					))}
				</ul>
				<form
					className="bg-zinc-200 flex justify-between items-center overflow-hidden h-20 rounded-[28px]"
					onSubmit={sendHandler}
				>
					<input
						className="w-full pl-10 text-2xl text-zinc-400 bg-zinc-200"
						placeholder="구름 채팅 띄우기..."
						type="text"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
					/>
					<RiCloudFill className="text-6xl text-primary m-7 p-0.5" onClick={sendHandler} />
				</form>
			</article>
		</section>
	);
}
