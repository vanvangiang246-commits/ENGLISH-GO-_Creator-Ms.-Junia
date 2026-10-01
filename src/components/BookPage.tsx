import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, X, Layers, Sparkles } from 'lucide-react';
import { ProgramInfo, UnitItem, getBookUnits, GlobalSuccessId } from '../types/curriculum';
import { UnitCard } from './UnitCard';

interface BookPageProps {
  program: ProgramInfo;
  onBackToHome: () => void;
  onSelectUnit: (unit: UnitItem) => void;
}

export const BookPage: React.FC<BookPageProps> = ({
  program,
  onBackToHome,
  onSelectUnit,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Retrieve strictly isolated unit list for THIS specific book
  const allUnits = useMemo(() => {
    const list = getBookUnits(program.id as GlobalSuccessId);
    // Strict numerical sort guarantee
    return [...list].sort((a, b) => a.unitNumber - b.unitNumber);
  }, [program.id]);

  // Filter units based on child's search input
  const filteredUnits = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return allUnits;

    // Remove optional "unit" word from query if child typed e.g. "unit 1"
    const cleanedQuery = query.replace(/^unit\s*/i, '').trim();

    return allUnits
      .filter((u) => {
        const unitNumStr = u.unitNumber.toString();
        const displayStr = u.displayName.toLowerCase();
        
        return (
          unitNumStr === cleanedQuery ||
          unitNumStr.startsWith(cleanedQuery) ||
          displayStr.includes(query) ||
          displayStr.includes(cleanedQuery)
        );
      })
      .sort((a, b) => a.unitNumber - b.unitNumber);
  }, [allUnits, searchQuery]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Navigation Top: Back Button and Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-xs transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Back to Home"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back</span>
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={onBackToHome} className="hover:text-slate-900 transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900 font-bold">{program.code}</span>
        </nav>
      </div>

      {/* Book & Grade Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-6 sm:mb-8">
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center text-3xl sm:text-4xl shadow-md shadow-sky-100 shrink-0">
              📘
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="inline-block px-3 py-0.5 bg-sky-100 text-sky-800 text-xs sm:text-sm font-black rounded-lg uppercase tracking-wider border border-sky-200">
                  {program.gradeDisplay}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold rounded-lg border border-slate-200">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>{program.unitCount} UNITS</span>
                </span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                {program.code}
              </h1>
            </div>
          </div>
        </div>

        {/* Section Lead: Choose a Unit */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Choose a Unit</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Select a unit below to start your English practice.
            </p>
          </div>
        </div>
      </div>

      {/* Search Unit Box */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔎 Search Unit... (e.g. 1, 10, 16)"
            aria-label="Search Unit"
            className="w-full pl-12 pr-12 py-3.5 sm:py-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 placeholder-slate-400 font-semibold text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-xs"
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Clear search"
            >
              <div className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-slate-600" />
              </div>
            </button>
          )}
        </div>

        {/* Search Feedback Info */}
        <div className="mt-2 px-1 flex items-center justify-between text-xs text-slate-500">
          <span>
            {searchQuery ? (
              <>
                Showing <strong>{filteredUnits.length}</strong> {filteredUnits.length === 1 ? 'Unit' : 'Units'} for &ldquo;{searchQuery}&rdquo;
              </>
            ) : (
              <>
                All <strong>{allUnits.length} Units</strong> in {program.code}
              </>
            )}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-600 hover:underline font-semibold"
            >
              Reset search
            </button>
          )}
        </div>
      </div>

      {/* Vertical Scrolling List of Units */}
      {filteredUnits.length > 0 ? (
        <div className="flex flex-col gap-3 sm:gap-3.5">
          {filteredUnits.map((unit) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              onSelect={onSelectUnit}
            />
          ))}
        </div>
      ) : (
        /* Friendly No Unit Found Message */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-dashed border-slate-200 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3 text-2xl">
            🔍
          </div>
          <h3 className="font-display font-bold text-lg text-slate-800 mb-1">
            No Unit found.
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto mb-4">
            No unit matches &ldquo;{searchQuery}&rdquo; in {program.code} ({program.unitCount} Units total).
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Bottom Back Button */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex justify-center">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Home</span>
        </button>
      </div>
    </div>
  );
};
