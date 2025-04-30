import React from "react";

function Counter({ value, onIncrement, onDecrement }) {
    return (
        <div className="flex items-center gap-2 mb-2">
            <button type="button" variant="outline" size="sm" onClick={onDecrement}>-</button>
            <p>{value}</p>
            <button type="button" variant="outline" size="sm" onClick={onIncrement}>+</button>
        </div>
    );
}

export default Counter