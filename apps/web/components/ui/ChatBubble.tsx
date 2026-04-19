type Props = {
  message: string;
  isUser?: boolean;
};

export function ChatBubble({ message, isUser }: Props) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm ${
          isUser
            ? "bg-black text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {message}
      </div>
    </div>
  );
}