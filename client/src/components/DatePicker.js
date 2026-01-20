"use client"
import { useState } from "react";

export default function DatePicker({ id, placeholder, className, onlyYear = false, onYearChange, valueYear }) {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(valueYear || '');

    const handleYearChange = (e) => {
        setYear(e.target.value);
        if (onYearChange) onYearChange(e.target.value);
    };

    return (
        <div className="flex flex-col gap-1">
            <div className={`flex gap-2 ${className}`}>
                {!onlyYear && (
                    <>
                        <div className={`flex flex-row items-center group bg-slate-50 w-full ring-bc-blue ring-1 hover:ring-2 hover:bg-slate-100 focus-within:ring-sky-700 focus-within:ring-2 transition-all text-lg rounded-lg outline-0 relative `}>
                            <select
                                id={id ? `${id}-day` : "birth-day-input"}
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                required
                                className={`py-2 px-4 outline-0 w-full ring-0 bg-transparent cursor-pointer appearance-none pr-8 *:text-bc-dblue  ${day ? 'text-bc-dblue' : 'text-slate-400'}`}
                            >
                                <option value="" className="!text-slate-400">Day</option>
                                {Array.from({ length: 31 }, (_, i) => (
                                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>
                                ))}
                            </select>
                            <svg className="absolute right-3 pointer-events-none w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <div className="flex flex-row items-center group bg-slate-50 w-full ring-bc-blue ring-1 hover:ring-2 hover:bg-slate-100 focus-within:ring-sky-700 focus-within:ring-2 transition-all text-lg rounded-lg outline-0 relative">
                            <select
                                id={id ? `${id}-month` : "birth-month-input"}
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                required
                                className={`py-2 px-4 outline-0 w-full ring-0 bg-transparent cursor-pointer appearance-none pr-8 *:text-bc-dblue ${month ? 'text-bc-dblue' : 'text-slate-400'}`}
                            >
                                <option value="" className="!text-slate-400">Month</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <svg className="absolute right-3 pointer-events-none w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </>
                )}
                <div className="flex flex-row items-center group bg-slate-50 w-full ring-bc-blue ring-1 hover:ring-2 hover:bg-slate-100 focus-within:ring-sky-700 focus-within:ring-2 transition-all text-lg rounded-lg outline-0 relative">
                    <select
                        id={id ? `${id}-year` : "birth-year-input"}
                        value={valueYear !== undefined ? valueYear : year}
                        onChange={handleYearChange}
                        required
                        className={`py-2 px-4 outline-0 w-full ring-0 bg-transparent cursor-pointer appearance-none pr-8 *:text-bc-dblue  ${year ? 'text-bc-dblue' : 'text-slate-400'}`}
                    >
                        <option value="" className="!text-slate-400">Year</option>
                        {Array.from({ length: new Date().getFullYear() - 1969 }, (_, i) => {
                            const y = new Date().getFullYear() - i;
                            return <option key={y} value={y}>{y}</option>;
                        })}
                    </select>
                    <svg className="absolute right-3 pointer-events-none w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    )
}