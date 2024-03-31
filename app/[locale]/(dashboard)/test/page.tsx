export default function TestPage() {
  return (
    <div className="flex size-full overflow-y-scroll">
      <div className="flex flex-col border bg-gray-800 p-2">
        {Array.from({ length: 100 }, (_, index) => (
          <div key={index}>Content {index + 1}</div>
        ))}
      </div>
      <div className="relative">
        <div className="fixed border p-2">Content X</div>
      </div>
    </div>
  )
}
