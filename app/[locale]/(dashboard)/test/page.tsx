export default function TestPage() {
  const buttons = Array.from({ length: 100 }, (_, index) => (
    <button key={index}>Button {index + 1}</button>
  ))

  return (
    <div className="container flex size-full">
      <div className="flex w-1/3 flex-col overflow-scroll rounded border border-gray-300 bg-gray-800 p-2">
        {buttons}
      </div>
      <div className="w-1/3 rounded border border-gray-300 p-4">
        Content for column 2
      </div>
    </div>
  )
}
