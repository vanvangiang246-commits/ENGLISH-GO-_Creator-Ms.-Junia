import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen } from 'lucide-react';
import { VocabularyItem } from '../types/content';

interface VocabularyCardProps {
  item: VocabularyItem;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({ item }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(item.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.85; // slightly slower for primary school children

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-400 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Visual Illustration Area */}
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 mb-4 flex items-center justify-center">
          {!imageError ? (
            <img
              src={item.imageUrl}
              alt={item.word}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center text-slate-400">
              <BookOpen className="w-10 h-10 mb-1 text-slate-300" />
              <span className="text-xs font-semibold">{item.word}</span>
            </div>
          )}

          {/* Letter / Sound Badge */}
          {item.soundFocus && (
            <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs border border-slate-200 text-slate-800 px-2 py-0.5 rounded-lg text-xs font-black shadow-xs">
              Sound {item.soundFocus}
            </div>
          )}

          {/* Speech Audio Button */}
          <button
            onClick={handleSpeak}
            className={`absolute bottom-2.5 right-2.5 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-150 cursor-pointer ${
              isPlaying
                ? 'bg-amber-500 text-white scale-110'
                : 'bg-white/95 text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-105'
            }`}
            aria-label={`Listen to pronunciation of ${item.word}`}
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Word Title & Phonetic IPA */}
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h4 className="font-display font-extrabold text-2xl text-slate-900 group-hover:text-blue-700 transition-colors">
            {item.word}
          </h4>
          <span className="text-xs sm:text-sm font-mono text-slate-500 font-semibold">
            {item.pronunciation}
          </span>
        </div>

        {/* Meaning */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
          {item.meaning}
        </p>
      </div>

      {/* Example Sentence Pill */}
      <div className="pt-2.5 border-t border-slate-100 flex items-start gap-1.5 text-xs text-slate-500">
        <span className="font-bold text-blue-600 shrink-0">Ex:</span>
        <span className="italic font-medium text-slate-700">&ldquo;{item.example}&rdquo;</span>
      </div>
    </div>
  );
};
