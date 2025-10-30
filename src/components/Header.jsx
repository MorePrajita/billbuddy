import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">$ BillBuddy</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">Smart & fair bill splitting — fast and friendly.</p>
      </div>
      <div className="text-xs text-gray-400">v1.0</div>
    </header>
  );
}
