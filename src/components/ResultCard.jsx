import React from "react";

/**
 * Props:
 *  - amountPerPerson: number
 *  - total: number
 *  - people: number
 *  - tipPercent: number
 *  - remainderInfo: { extraPayers: number, extraAmount: number } (optional)
 */
export default function ResultCard({ amountPerPerson, total, people, tipPercent, remainderInfo }) {
  return (
    <div className="mt-6 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/5">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-sm text-gray-400">Total (incl. tip)</div>
          <div className="text-2xl font-semibold mt-1">₹{total.toFixed(2)}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Each pays</div>
          <div className="text-3xl font-extrabold">₹{amountPerPerson.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-300">
        Split between <span className="font-medium">{people}</span> people • Tip: <span className="font-medium">{tipPercent}%</span>
      </div>

      {remainderInfo && remainderInfo.extraPayers > 0 && (
        <div className="mt-3 text-xs text-amber-300">
          Note: To keep whole paise, {remainderInfo.extraPayers} person(s) will pay an extra ₹{remainderInfo.extraAmount.toFixed(2)}.
        </div>
      )}
    </div>
  );
}
