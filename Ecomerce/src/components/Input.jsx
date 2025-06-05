import React from "react";

export default function Input({
    label,
    type = "text",
    placeholder = "",
    icon,
    onIconClick,
    // "rest" recogerá name, value, onChange, maxLength, etc.
    ...rest
}) {
    return (
        <div>
            {label && (
                <label className="block text-sm mb-1 text-gray-700">{label}</label>
            )}
            <div className="relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...rest}
                />
                {icon && (
                    <span
                        onClick={onIconClick}
                        className="absolute right-3 top-2.5 text-gray-500 cursor-pointer select-none"
                    >
                        {icon}
                    </span>
                )}
            </div>
        </div>
    );
}
