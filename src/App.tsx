/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calculator, 
  RotateCcw, 
  Tag, 
  ShoppingBag, 
  TrendingDown, 
  Banknote,
  Percent,
  CheckCircle2
} from "lucide-react";

export default function App() {
  const [mrp, setMrp] = useState<string>("");
  const [discountPrice, setDiscountPrice] = useState<string>("");
  const [results, setResults] = useState({
    amount: 0,
    percentage: 0,
    savings: 0,
    isValid: false
  });

  useEffect(() => {
    const m = parseFloat(mrp);
    const d = parseFloat(discountPrice);

    if (!isNaN(m) && !isNaN(d) && m > 0 && d >= 0) {
      const amount = Math.max(0, m - d);
      const percentage = (amount / m) * 100;
      setResults({
        amount,
        percentage,
        savings: amount,
        isValid: true
      });
    } else {
      setResults({ amount: 0, percentage: 0, savings: 0, isValid: false });
    }
  }, [mrp, discountPrice]);

  const handleReset = () => {
    setMrp("");
    setDiscountPrice("");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value) + " BDT";
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center p-2 sm:p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white w-full max-w-7xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[32px] sm:rounded-[48px] border border-black overflow-hidden flex flex-col"
      >
        {/* Header Section */}
        <header className="bg-[#0F172A] p-6 sm:p-10 text-white flex flex-row justify-between items-center gap-4 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-heading font-black tracking-tighter uppercase leading-none">
              HEAD GEAR
            </h1>
            <p className="text-slate-400 text-[9px] sm:text-[11px] mt-1 sm:mt-2 tracking-[0.2em] uppercase font-bold opacity-80">
              Discount Calculator
            </p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 relative z-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="px-3 sm:px-6 py-2 sm:py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-full text-[9px] sm:text-[11px] font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 sm:gap-2 border border-white/10 backdrop-blur-sm"
            >
              <RotateCcw className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              Reset
            </motion.button>
            <div className="hidden sm:flex h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/10 items-center justify-center bg-white/5 backdrop-blur-sm">
              <ShoppingBag className="w-4 sm:w-5 h-4 sm:h-5 text-white/50" />
            </div>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full translate-x-32 -translate-y-32 blur-3xl pointer-events-none"></div>
        </header>

        {/* Main Content Layout */}
        <div className="p-5 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            
            {/* 1. DISCOUNT INPUT PANEL */}
            <div className="space-y-6 sm:space-y-10 flex flex-col justify-center">
              <div className="group space-y-2">
                <label htmlFor="mrp" className="block text-[10px] sm:text-[11px] font-black text-black uppercase tracking-widest mb-0 sm:mb-1 ml-1">
                  MRP Price / এমআরপি মূল্য
                </label>
                <div className="relative">
                  <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-lg sm:text-xl">৳</span>
                  <input
                    id="mrp"
                    type="number"
                    placeholder="0.00"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-5 bg-slate-50/80 border border-black rounded-[18px] sm:rounded-[24px] text-lg sm:text-2xl font-bold text-slate-800 placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none no-spinner"
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label htmlFor="discountPrice" className="block text-[10px] sm:text-[11px] font-black text-black uppercase tracking-widest mb-0 sm:mb-1 ml-1">
                  Selling Price / বিক্রয় মূল্য
                </label>
                <div className="relative">
                  <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-lg sm:text-xl">৳</span>
                  <input
                    id="discountPrice"
                    type="number"
                    placeholder="0.00"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-5 bg-slate-50/80 border border-black rounded-[18px] sm:rounded-[24px] text-lg sm:text-2xl font-bold text-slate-800 placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none no-spinner"
                  />
                </div>
              </div>
            </div>

            {/* 2. DISCOUNT RESULT PANEL */}
            <div className="bg-slate-50/50 rounded-[24px] sm:rounded-[40px] p-6 sm:p-8 flex flex-col justify-between border border-black min-h-[220px] sm:min-h-[400px] relative overflow-hidden group/panel">
              <AnimatePresence mode="wait">
                {results.isValid ? (
                  <motion.div
                    key="results-content"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 sm:space-y-10 flex-1 relative z-10"
                  >
                    <div className="space-y-1">
                      <p className="text-[10px] sm:text-[11px] font-bold text-black uppercase tracking-widest underline underline-offset-4 decoration-black/20">Discount Amount / ডিসকাউন্ট</p>
                      <p className="text-2xl sm:text-4xl font-heading font-black text-slate-900 tabular-nums">
                        {formatCurrency(results.amount)}
                      </p>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-4">
                      <p className="text-[10px] sm:text-[11px] font-bold text-black uppercase tracking-[0.2em] underline underline-offset-4 decoration-black/20">Off Percentage / ছাড়ের হার</p>
                      <div className="flex items-center gap-4 sm:gap-6">
                        <p className="text-5xl sm:text-7xl lg:text-8xl font-heading font-black text-slate-900 tabular-nums tracking-tighter leading-none drop-shadow-sm">
                          {Math.round(results.percentage)}<span className="text-orange-500">%</span>
                        </p>
                        {results.percentage >= 30 && (
                          <motion.div 
                            initial={{ scale: 0, rotate: -15 }}
                            animate={{ scale: 1, rotate: -5 }}
                            className="bg-slate-900 text-white text-[8px] sm:text-[10px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-black uppercase tracking-widest shadow-xl shrink-0"
                          >
                            Top Deal
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 sm:pt-6 border-t border-slate-300/60 mt-auto">
                      <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Savings / মোট সঞ্চয়</p>
                      <p className="text-lg sm:text-xl font-bold text-emerald-600 mt-1 sm:mt-2 flex items-center gap-2">
                        <TrendingDown className="w-4 sm:w-5 h-4 sm:h-5" />
                        Saved {formatCurrency(results.amount)}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center space-y-4 sm:space-y-6 py-6 sm:py-10"
                  >
                    <div className="bg-white p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] shadow-sm border border-black flex items-center justify-center">
                      <Calculator className="w-8 sm:w-10 h-8 sm:h-10 text-slate-200" />
                    </div>
                    <div>
                      <p className="text-orange-500 font-black text-[9px] sm:text-[11px] uppercase tracking-[0.2em]">Ready to calculate</p>
                      <p className="text-orange-400 text-xs mt-1 sm:mt-2 font-bold">হিসাব দেখতে মূল্য প্রদান করুন</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <Tag className="absolute -bottom-6 sm:-bottom-10 -right-6 sm:-right-10 w-32 sm:w-48 h-32 sm:h-48 text-slate-200/20 rotate-12 group-hover/panel:rotate-6 transition-transform duration-700 pointer-events-none" />
            </div>

            {/* 3. GENERAL CALCULATOR PANEL */}
            <div className="md:col-span-2 lg:col-span-1 lg:border-l lg:border-slate-100 lg:pl-10">
              <GeneralCalculator />
            </div>

          </div>
        </div>

        {/* Footer Info Strip */}
        <div className="bg-[#F8FAFC] px-6 sm:px-12 py-4 sm:py-6 border-t border-black flex flex-row justify-between items-center gap-4 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-300">
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-slate-400">Head Gear System</span>
            <span className="hidden sm:inline h-1 w-1 bg-slate-300 rounded-full"></span>
            <span className="hidden sm:inline">Secure Analysis</span>
          </div>
          <div className="text-slate-400">
            © {new Date().getFullYear()} HEAD GEAR
          </div>
        </div>
      </motion.div>

      <style>{`
        .no-spinner::-webkit-inner-spin-button, 
        .no-spinner::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        .no-spinner {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}

function GeneralCalculator() {
  const [display, setDisplay] = useState("");
  const [equation, setEquation] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAction = (val: string) => {
    if (val === "AC") {
      setDisplay("");
      setEquation("");
    } else if (val === "C" || val === "Backspace") {
      setDisplay(prev => prev.slice(0, -1));
    } else if (val === "√") {
      try {
        const num = display === "" ? 0 : Number(display);
        const result = Math.sqrt(num);
        setEquation("√" + (display || "0") + " =");
        setDisplay(String(Number(result.toFixed(4))).replace(/\.0000$/, ""));
      } catch {
        setDisplay("Error");
      }
    } else if (val === "%") {
      setDisplay(prev => prev + "%");
    } else if (val === "=" || val === "Enter") {
      if (!display) return;
      try {
        let cleanDisplay = display.replace(/×/g, "*").replace(/÷/g, "/");
        
        // Handle percentage calculation: "1000-10%" -> "1000-(1000*10/100)"
        // Logic: find pattern [number][operator][number]%
        cleanDisplay = cleanDisplay.replace(/(\d+(\.\d+)?)\s*([+-])\s*(\d+(\.\d+)?)%/g, '($1$3($1*$4/100))');
        
        // Handle basic percentage: "1000*10%" -> "1000*10/100"
        cleanDisplay = cleanDisplay.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

        // eslint-disable-next-line no-eval
        const result = eval(cleanDisplay);
        setEquation(display + " =");
        const formattedResult = String(Number(result).toFixed(2)).replace(/\.00$/, "");
        setDisplay(formattedResult);
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay(prev => prev + val);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow digits, dots, and operators
    const sanitized = val.replace(/[^0-9.+*×/÷-]/g, "");
    setDisplay(sanitized);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAction("=");
    } else if (e.key === "Escape") {
      handleAction("AC");
    }
  };

  const buttons = [
    "AC", "C", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "√", "="
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <label className="block text-[10px] sm:text-[11px] font-black text-black uppercase tracking-widest mb-1 ml-1">
          General Calculator / সাধারণ ক্যালকুলেটর
        </label>
        <div 
          className="bg-slate-900 rounded-[24px] p-6 text-right min-h-[100px] flex flex-col justify-end shadow-inner border border-black relative cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="text-white/70 text-[10px] uppercase font-bold tracking-widest mb-1 h-4 overflow-hidden text-ellipsis">
            {equation}
          </div>
          <input
            ref={inputRef}
            type="text"
            value={display}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="0"
            className="bg-transparent border-none outline-none text-right w-full text-white text-3xl font-heading font-black tracking-tight tabular-nums placeholder:text-slate-800"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 flex-1">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleAction(btn)}
            className={`
              py-4 sm:py-5 rounded-[18px] sm:rounded-[24px] font-black text-sm sm:text-base transition-all
              ${btn === "=" ? "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20" : 
                btn === "AC" || btn === "C" ? "bg-slate-100 text-slate-600 hover:bg-slate-200" :
                ["÷", "×", "-", "+", "√", "%"].includes(btn) ? "bg-slate-900 text-white hover:bg-black" :
                "bg-white border border-slate-200 text-slate-800 hover:border-black hover:bg-slate-50"}
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
