import React from "react";
import Header from "../components/Header";
import SplitForm from "../components/SplitForm";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="w-full max-w-2xl">
      <div className="card border border-white/6">
        <Header />
        <div className="mt-6">
          <SplitForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
