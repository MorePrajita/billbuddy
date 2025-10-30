import React, { useState, useMemo } from "react";
import ResultCard from "./ResultCard";

export default function SplitForm() {
  const [total, setTotal] = useState("");
  const [people, setPeople] = useState(2);
  const [tipPercent, setTipPercent] = useState(0);
  const [roundUp, setRoundUp] = useState(false);

  // parse safe float from input
  const parsedTotal = useMemo(() => {
    const v = parseFloat(total);
    return isNaN(v) || v < 0 ? 0 : v;
  }, [total]);

  // Calculation logic:
  // 1) tipAmount = total * tipPercent / 100
  // 2) grandTotal = total + tipAmount
  // 3) perPersonExact = grandTotal / people
  // If roundUp: round each person to 2 decimals by rounding up to nearest paise.
  const calculation = useMemo(() => {
    const tipAmount = (parsedTotal * (tipPercent / 100));
    const grandTotal = parsedTotal + tipAmount;

    const ppl = Math.max(1, Math.floor(people) || 1);

    // exact share (float)
    const exactShare = grandTotal / ppl;

    // rounding behavior: we'll handle two modes: normal (round to 2 decimals), or distribute remainder
    // To keep exact currency split (paise precision), calculate in paise (integer)
    const grandTotalPaise = Math.round(grandTotal * 100); // convert to paise (₹0.01)
    const baseSharePaise = Math.floor(grandTotalPaise / ppl);
    const remainderPaise = grandTotalPaise - baseSharePaise * ppl; // 0..ppl-1

    const perPerson = roundUp
      ? Math.ceil((grandTotal / ppl) * 100) / 100
      : Math.round((grandTotal / ppl) * 100) / 100;

    const remainderInfo = remainderPaise > 0 ? {
      extraPayers: remainderPaise, // number of people who must pay +1 paise
      extraAmount: 0.01 // 1 paise expressed in rupees
    } : null;

    return {
      tipAmount,
      grandTotal,
      exactShare,
      perPerson,
      ppl,
      remainderInfo,
    };
  }, [parsedTotal, tipPercent, people, roundUp]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm text-gray-300">Total bill amount (₹)</label>
          <input
            inputMode="decimal"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="e.g., 1250.50"
            className="mt-2 w-full p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/5 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Number of people</label>
          <input
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="mt-2 w-full p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/5 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Tip (%)</label>
          <input
            type="number"
            min="0"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            className="mt-2 w-full p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/5 focus:outline-none"
          />
        </div>

        <div className="flex items-end">
          <div className="w-full">
            <label className="text-sm text-gray-300">Options</label>
            <div className="mt-2 flex items-center gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={roundUp}
                  onChange={() => setRoundUp((s) => !s)}
                  className="h-4 w-4 rounded bg-white/5"
                />
                Round up each share
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* results */}
      <div className="mt-6">
        <ResultCard
          amountPerPerson={calculation.perPerson}
          total={calculation.grandTotal}
          people={calculation.ppl}
          tipPercent={Number(tipPercent) || 0}
          remainderInfo={calculation.remainderInfo}
        />
      </div>

      {/* quick actions */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => {
            // quick example
            setTotal("1250");
            setPeople(4);
            setTipPercent(10);
          }}
          className="px-4 py-2 rounded-md text-sm border border-white/6 hover:border-white/10"
        >
          Fill Example
        </button>
        <button
          onClick={() => {
            setTotal("");
            setPeople(2);
            setTipPercent(0);
            setRoundUp(false);
          }}
          className="px-4 py-2 rounded-md text-sm bg-[rgba(255,255,255,0.03)] border border-white/6"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
