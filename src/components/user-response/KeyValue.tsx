interface KeyValueProps {
  title: string;
  value: string | number;
}

export default function KeyValue({ title, value }: KeyValueProps) {
  return (
    <div className="flex gap-2 font-titilliumWeb text-xl">
      <span className="font-bold text-accent">{title}:</span>
      <span className="text-lg font-semibold text-gray-800">{value}</span>
    </div>
  );
}
