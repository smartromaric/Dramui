"use client"
import InlineOverflow from "../components/InlineOverflow";

const InlineOverflowTest = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold text-gray-800">InlineOverflow Component Test</h1>
        <p className="text-gray-600 text-center max-w-md">
          Cliquez sur les 3 points (...) pour voir les boutons supplémentaires s'afficher avec une belle animation.
        </p>
        <InlineOverflow />
      </div>
    </div>
  );
};

export default InlineOverflowTest;
