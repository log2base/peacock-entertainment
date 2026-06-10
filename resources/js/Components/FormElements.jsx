import React from 'react';

export default function Input({ label, type = "text", placeholder, name, required = false, className = "" }) {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="block font-14 font-bold uppercase tracking-widest text-gray-400">
                    {label} {required && <span className="text-primary">*</span>}
                </label>
            )}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                className="w-full bg-[#0f171e] border border-gray-800 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
            />
        </div>
    );
}

export function TextArea({ label, placeholder, name, required = false, className = "" }) {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="block font-14 font-bold uppercase tracking-widest text-gray-400">
                    {label} {required && <span className="text-primary">*</span>}
                </label>
            )}
            <textarea
                name={name}
                placeholder={placeholder}
                required={required}
                rows={5}
                className="w-full bg-[#0f171e] border border-gray-800 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600 resize-none"
            />
        </div>
    );
}
