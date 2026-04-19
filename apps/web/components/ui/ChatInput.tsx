type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
};

export function ChatInput({ value, onChange, onSend }: Props) {
  return (
    <div className="flex gap-2 border-t pt-3">
      <input
        className="flex-1 border rounded-xl px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite sua resposta..."
      />
      <button
        onClick={onSend}
        className="bg-black text-white px-4 rounded-xl"
      >
        Enviar
      </button>
    </div>
  );
}