import { Sala } from '../types';

type ChatBodyProps = {
	sala: Sala;
};

const ChatBody = ({ sala }: ChatBodyProps) => {
	return <div>Chat body</div>;
};

export default ChatBody;
