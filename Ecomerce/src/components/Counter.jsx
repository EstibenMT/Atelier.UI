import React from "react";

function Counter({ value, onIncrement, onDecrement, max }) {
    return (
        <div className="flex items-center border border-grry-300 rounded w-fit overflow-hidden test-sm">
            <button
                type="button"
                className="px-3 py-1 hover:bg-gray-100 border-r border-gray-300"
                onClick={onDecrement}
                disabled={value <= 1}
            >
                -
            </button>
            <div className="px-4 py-1">{value}</div>
            <button
                type="button"
                className="px-3 py-1 hover:bg-gray-100 border-l border-gray-300"
                onClick={onIncrement}
                disabled={value >= max}
            >
                +
            </button>
        </div>
    );
}

export default Counter