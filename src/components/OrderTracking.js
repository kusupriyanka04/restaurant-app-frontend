export default function OrderTracking({ status }) {
  const steps = ["Pending", "Preparing", "Delivered"];
  const currentIndex = steps.indexOf(status);

  return (
    <div className="flex items-center justify-between mt-4">
      {steps.map((step, index) => (
        <div key={step} className="flex-1 text-center relative">
          {/* Circle */}
          <div
            className={`mx-auto w-8 h-8 rounded-full text-white flex items-center justify-center ${
              index <= currentIndex ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            ✓
          </div>

          {/* Step Label */}
          <p className="text-sm mt-1">{step}</p>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`absolute top-3 left-1/2 w-full h-1 -translate-x-1/2 ${
                index < currentIndex ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
