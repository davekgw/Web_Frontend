export default function CommentItem({ name, comment }) {
  return (
    <div className="p-3 bg-white rounded shadow mb-2">
      <p className="font-semibold">{name}</p>
      <p className="text-gray-600">{comment}</p>
    </div>
  );
}
