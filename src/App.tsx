/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
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

function StatusImage({ src, alt, fallback }: { src: string; alt: string; fallback: string }) {
  const [error, setError] = useState(false);
  if (error) return <span className="text-3xl">{fallback}</span>;
  return (
    <img 
      src={src} 
      alt={alt} 
      className="w-12 h-12 object-contain" 
      referrerPolicy="no-referrer" 
      onError={() => setError(true)} 
    />
  );
}

function StatusIcon({ percentage }: { percentage: number }) {
  return (
    <motion.div 
      key={percentage >= 30 ? 'dance' : 'static'}
      initial={{ scale: 0 }}
      animate={percentage >= 30 ? { 
        scale: [1, 1.15, 1, 1.15, 1],
        rotate: [0, -12, 12, -12, 12, 0],
        y: [0, -6, 0, -6, 0]
      } : { scale: 1 }}
      transition={percentage >= 30 ? { 
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      } : { duration: 0.3 }}
      className="inline-block relative"
    >
      {percentage >= 100 ? (
        <StatusImage src="/input_file_0.png" alt="Impossible" fallback="🚀" />
      ) : percentage >= 90 ? (
        <StatusImage src="/input_file_1.png" alt="Sigma" fallback="🗿" />
      ) : percentage >= 80 ? (
        <span className="text-3xl sm:text-4xl">☠️</span>
      ) : percentage >= 70 ? (
        <span className="text-3xl sm:text-4xl">🤴</span>
      ) : percentage >= 60 ? (
        <span className="text-3xl sm:text-4xl">😎</span>
      ) : percentage >= 50 ? (
        <StatusImage src="/input_file_1.png" alt="Sigma" fallback="☠️" />
      ) : percentage >= 40 ? (
        <StatusImage src="/input_file_2.png" alt="Superb" fallback="😎" />
      ) : percentage >= 30 ? (
        <StatusImage src="/input_file_3.png" alt="OK" fallback="👌" />
      ) : percentage >= 20 ? (
        <span className="text-3xl sm:text-4xl">✨</span>
      ) : (
        <span className="text-3xl sm:text-4xl">👌</span>
      )}
    </motion.div>
  );
}

export default function App() {
  const [mrp, setMrp] = useState<string>("");
  const [discountPrice, setDiscountPrice] = useState<string>("");
  const [resetKey, setResetKey] = useState(0);
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
    setResetKey(prev => prev + 1);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value) + " BDT";
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] flex flex-col items-center py-2 sm:py-6 px-4 sm:px-6 font-sans antialiased">
      <motion.div 
        initial={{ opacity: 0, scale: 0.99, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white w-full max-w-7xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1),0_0_1px_rgba(0,0,0,0.1)] rounded-[40px] sm:rounded-[60px] border-2 border-black overflow-hidden flex flex-col"
      >
        {/* Header Section */}
        <header className="sticky top-0 z-50 bg-slate-900 py-4 sm:py-6 px-6 sm:px-10 text-white flex flex-row justify-between items-center gap-4 relative overflow-hidden border-b-2 border-black">
          <div className="relative z-10">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-heading font-black tracking-tighter uppercase leading-none whitespace-nowrap">
              HEAD GEAR
            </h1>
            <p className="text-slate-500 text-[8px] sm:text-[10px] mt-1 tracking-[0.3em] uppercase font-black opacity-80">
              DISCOUNT CALCULATOR
            </p>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6 relative z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="px-4 sm:px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-[9px] sm:text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-black backdrop-blur-md"
            >
              <RotateCcw className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              Reset All
            </motion.button>
            <div className="hidden md:flex h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-black items-center justify-center bg-white/5 backdrop-blur-md">
              <ShoppingBag className="w-4 sm:w-5 h-4 sm:h-5 text-white/40" />
            </div>
          </div>

          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.03] rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"></div>
        </header>

        {/* Main Content Layout */}
        <div className="p-4 sm:p-5 lg:p-6 flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-full gap-4 lg:gap-6">
            
            {/* 1. DISCOUNT ANALYSIS SECTION */}
            <section className="border-2 border-black rounded-[32px] p-4 sm:p-5 bg-white shadow-sm relative group flex flex-col h-full overflow-hidden">
              <div className="flex justify-center w-full mb-3 sm:mb-4">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 border-2 border-black rounded-full bg-slate-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="text-[10px] font-black text-black uppercase tracking-[0.2em] whitespace-nowrap">
                    1. DISCOUNT ANALYSIS
                  </h2>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col gap-4 overflow-y-auto lg:overflow-visible">
                {/* Input Panel */}
                <div className="space-y-4">
                  <div className="group space-y-2">
                    <label htmlFor="mrp" className="block text-[10px] font-black text-black uppercase tracking-[0.2em] ml-1">
                      MRP Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">৳</span>
                      <input
                        id="mrp"
                        type="number"
                        placeholder="0.00"
                        value={mrp}
                        onChange={(e) => setMrp(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-black rounded-[20px] text-lg font-black text-slate-900 placeholder:text-slate-200 focus:bg-white transition-all outline-none no-spinner"
                      />
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <label htmlFor="discountPrice" className="block text-[10px] font-black text-black uppercase tracking-[0.2em] ml-1">
                      Selling Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">৳</span>
                      <input
                        id="discountPrice"
                        type="number"
                        placeholder="0.00"
                        value={discountPrice}
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-black rounded-[20px] text-lg font-black text-slate-900 placeholder:text-slate-200 focus:bg-white transition-all outline-none no-spinner"
                      />
                    </div>
                  </div>
                </div>

                {/* Result Panel */}
                <div className="bg-slate-900 rounded-[28px] p-5 flex-1 flex flex-col justify-between border-4 border-black relative overflow-hidden text-white min-h-[180px] lg:min-h-0 group/result">
                  <AnimatePresence mode="wait">
                    {results.isValid ? (
                      <motion.div
                        key="results-content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4 flex-1 flex flex-col justify-center relative z-10"
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Discount Amount</p>
                            <p className="text-2xl font-heading font-black text-white tabular-nums tracking-tighter">
                              {formatCurrency(results.amount).split(' ')[0]} <span className="text-[10px] text-slate-500">BDT</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <StatusIcon percentage={results.percentage} />
                            <p className="text-[8px] font-black text-orange-400 uppercase tracking-widest mt-1">
                              {results.percentage >= 100 ? 'IMPOSSIBLE' : 
                               results.percentage >= 90 ? 'INSANE DEAL' : 
                               results.percentage >= 80 ? 'LEGENDARY' : 
                               results.percentage >= 70 ? 'EPIC SAVE' : 
                               results.percentage >= 60 ? 'MASTER CLASS' :
                               results.percentage >= 50 ? 'SIGMA MODE' : 
                               results.percentage >= 40 ? 'UNBELIEVABLE' : 
                               results.percentage >= 30 ? 'SUPER SAVER' : 
                               results.percentage >= 20 ? 'BEST DEAL' : 'GOOD SAVE'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Off Percentage</p>
                          <div className="flex items-baseline gap-1">
                            <p className="text-4xl lg:text-5xl font-heading font-black text-white tabular-nums leading-none tracking-tighter">
                              {Math.round(results.percentage)}
                            </p>
                            <span className="text-xl font-black text-orange-500">%</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/5 mt-auto">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400">
                            <TrendingDown className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-black uppercase tracking-widest leading-none">Saved {results.amount} BDT</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-full text-center space-y-3 px-2"
                      >
                        <div className="bg-white/5 p-4 rounded-[24px] border border-black flex items-center justify-center group-hover/result:bg-white/10 transition-colors">
                          <Calculator className="w-8 h-8 text-slate-700" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-orange-500 font-black text-[9px] uppercase tracking-[0.3em]">Ready to analyze</p>
                          <p className="text-slate-500 text-[10px] font-bold leading-tight max-w-[140px]">Enter both prices to see magic ✨</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* 2. DISCOUNT CALCULATOR SECTION */}
            <section className="border-2 border-black rounded-[32px] p-4 sm:p-5 bg-white shadow-sm relative group flex flex-col h-full overflow-hidden">
              <div className="flex justify-center w-full mb-3">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 border-2 border-black rounded-full bg-slate-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="text-[10px] font-black text-black uppercase tracking-[0.2em] whitespace-nowrap">
                    2. DISCOUNT CALCULATOR
                  </h2>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto lg:overflow-visible">
                <QuickPriceAdjustment key={resetKey} />
              </div>
            </section>

            {/* 3. GENERAL CALCULATOR SECTION */}
            <section className="border-2 border-black rounded-[32px] p-4 sm:p-5 bg-white shadow-sm relative group flex flex-col h-full overflow-hidden">
              <div className="flex justify-center w-full mb-3">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 border-2 border-black rounded-full bg-slate-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="text-[10px] font-black text-black uppercase tracking-[0.2em] whitespace-nowrap">
                    3. GENERAL CALCULATOR
                  </h2>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto lg:overflow-visible">
                <GeneralCalculator key={resetKey} />
              </div>
            </section>
          </div>
        </div>

        {/* Footer Info Strip */}
        <footer className="bg-slate-50 border-t border-black px-8 sm:px-12 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <div className="flex items-center gap-6">
            <span className="text-slate-900/40">© 2026 ELIAS MIAH</span>
          </div>
          <div className="flex flex-col sm:items-end">
            <p className="text-slate-900/30">created by ELIAS MIAH</p>
          </div>
        </footer>
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

function QuickPriceAdjustment() {
  const [price, setPrice] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<string>("");
  const [isVatAdded, setIsVatAdded] = useState(false);

  const p = parseFloat(price) || 0;
  const pct = parseFloat(percentage) || 0;
  const result = p - (p * pct / 100);
  const vat = result * 0.075;
  const finalPrice = result + vat;

  const handlePriceChange = (val: string) => {
    setPrice(val);
    const pVal = parseFloat(val);
    const pctVal = parseFloat(percentage);
    if (!isNaN(pVal) && !isNaN(pctVal)) {
      setDiscountAmount(String(Number((pVal * pctVal / 100).toFixed(2))));
    } else {
      setDiscountAmount("");
    }
    setIsVatAdded(false);
  };

  const handlePercentageChange = (val: string) => {
    setPercentage(val);
    const pVal = parseFloat(price);
    const pctVal = parseFloat(val);
    if (!isNaN(pVal) && !isNaN(pctVal)) {
      setDiscountAmount(String(Number((pVal * pctVal / 100).toFixed(2))));
    } else {
      setDiscountAmount("");
    }
    setIsVatAdded(false);
  };

  const handleDiscountAmountChange = (val: string) => {
    setDiscountAmount(val);
    const pVal = parseFloat(price);
    const amtVal = parseFloat(val);
    if (!isNaN(pVal) && pVal > 0 && !isNaN(amtVal)) {
      setPercentage(String(Number(((amtVal / pVal) * 100).toFixed(2))));
    } else {
      setPercentage("");
    }
    setIsVatAdded(false);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="space-y-3">
        <div className="group space-y-1">
          <label className="block text-[10px] font-black text-black uppercase tracking-[0.2em] ml-1">Target Price</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">৳</span>
            <input
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-full pl-10 pr-4 py-4 bg-slate-50 border-2 border-black rounded-[20px] text-lg font-black outline-none no-spinner focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="group space-y-2">
            <label className="block text-[10px] font-black text-black uppercase tracking-[0.2em] ml-1">Percent</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">%</span>
              <input
                type="number"
                placeholder="0"
                value={percentage}
                onChange={(e) => handlePercentageChange(e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-slate-50 border-2 border-black rounded-[20px] text-lg font-black outline-none no-spinner focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="group space-y-2">
            <label className="block text-[10px] font-black text-black uppercase tracking-[0.2em] ml-1">Discount BDT</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">৳</span>
              <input
                type="number"
                placeholder="0"
                value={discountAmount}
                onChange={(e) => handleDiscountAmountChange(e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-slate-50 border-2 border-black rounded-[20px] text-lg font-black outline-none no-spinner focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[32px] p-4 text-white min-h-[160px] flex flex-col justify-between border-4 border-black shadow-xl group/result">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Base Result</p>
            <p className="text-3xl font-heading font-black tabular-nums tracking-tighter">৳{result.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>

          <AnimatePresence>
            {isVatAdded && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="pt-4 border-t border-black space-y-1"
              >
                <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest">Total with 7.5% VAT</p>
                <p className="text-3xl font-heading font-black text-orange-500 tabular-nums tracking-tighter">
                  ৳{finalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsVatAdded(!isVatAdded)}
          className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest mt-4 transition-all flex items-center justify-center gap-2 border-2 ${
            isVatAdded 
              ? "bg-white/5 text-slate-400 border-black hover:bg-white/10" 
              : "bg-orange-500 text-white border-black shadow-lg shadow-orange-500/20 hover:bg-orange-600"
          }`}
        >
          {isVatAdded ? "Remove VAT" : "Add 7.5% VAT"}
        </motion.button>
      </div>
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
        <div 
          className="bg-slate-900 border-4 border-black rounded-[32px] p-4 sm:p-6 flex flex-col items-end justify-center min-h-[100px] shadow-inner cursor-text group/calc relative overflow-hidden"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="text-[10px] sm:text-[11px] font-black text-slate-600 uppercase tracking-[0.4em] mb-2 h-4 overflow-hidden text-ellipsis w-full text-right transition-colors group-hover/calc:text-slate-400">
            {equation}
          </div>
          <input
            ref={inputRef}
            type="text"
            value={display}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="0"
            className="bg-transparent border-none outline-none text-right w-full text-3xl sm:text-4xl font-heading font-black tracking-tighter tabular-nums text-white placeholder:text-slate-800"
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
              py-3 sm:py-4 rounded-[20px] font-black text-sm sm:text-base transition-all border-2 border-black
              ${btn === "=" ? "bg-orange-500 text-white hover:bg-orange-600 shadow-xl shadow-orange-500/30" : 
                btn === "AC" || btn === "C" ? "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900" :
                ["÷", "×", "-", "+", "√", "%"].includes(btn) ? "bg-slate-900 text-white hover:bg-black" :
                "bg-white text-slate-800 hover:bg-slate-50"}
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
