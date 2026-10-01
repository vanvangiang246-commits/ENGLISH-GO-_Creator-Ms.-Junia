import * as fs from 'fs';
import * as path from 'path';

export const NEW_ICONS: Record<string, string> = {
  get_up: `<svg xmlns="http://www.w3.org/2000/svg" data-key="get_up" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#EFF6FF"/>
    <rect x="68" y="10" width="24" height="24" rx="4" fill="#FEF08A" stroke="#F59E0B" stroke-width="2"/>
    <line x1="80" y1="10" x2="80" y2="34" stroke="#F59E0B" stroke-width="1.5"/>
    <line x1="68" y1="22" x2="92" y2="22" stroke="#F59E0B" stroke-width="1.5"/>
    <rect x="8" y="48" width="14" height="42" rx="3" fill="#B45309"/>
    <rect x="18" y="66" width="74" height="20" rx="3" fill="#D97706"/>
    <rect x="18" y="62" width="70" height="12" rx="3" fill="#93C5FD"/>
    <path d="M46,62 L88,62 Q90,62 90,66 L90,80 L46,80 Z" fill="#3B82F6"/>
    <circle cx="40" cy="36" r="9" fill="#FED7AA"/>
    <path d="M31,34 Q40,24 49,34 Q40,29 31,34 Z" fill="#78350F"/>
    <circle cx="37" cy="36" r="1.2" fill="#1E293B"/>
    <circle cx="43" cy="36" r="1.2" fill="#1E293B"/>
    <path d="M38,40 Q40,43 42,40" stroke="#EF4444" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <rect x="33" y="46" width="14" height="18" rx="4" fill="#FDE047"/>
    <path d="M34,48 L22,30" stroke="#FDE047" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="21" cy="29" r="2.5" fill="#FED7AA"/>
    <path d="M46,48 L58,30" stroke="#FDE047" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="59" cy="29" r="2.5" fill="#FED7AA"/>
    <circle cx="15" cy="40" r="6" fill="#EF4444"/>
    <circle cx="15" cy="40" r="4.5" fill="#FFFFFF"/>
    <line x1="15" y1="40" x2="15" y2="37" stroke="#1E293B" stroke-width="1"/>
    <line x1="15" y1="40" x2="17" y2="40" stroke="#1E293B" stroke-width="1"/>
  </svg>`,

  breakfast: `<svg xmlns="http://www.w3.org/2000/svg" data-key="breakfast" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEFCE8"/>
    <ellipse cx="50" cy="82" rx="44" ry="12" fill="#FDE68A"/>
    <ellipse cx="36" cy="62" rx="22" ry="14" fill="#E2E8F0"/>
    <ellipse cx="36" cy="60" rx="20" ry="12" fill="#FFFFFF" stroke="#38BDF8" stroke-width="2"/>
    <ellipse cx="36" cy="60" rx="16" ry="9" fill="#FFFBEB"/>
    <circle cx="30" cy="59" r="3" fill="#EF4444"/>
    <circle cx="38" cy="62" r="2.5" fill="#EF4444"/>
    <circle cx="42" cy="58" r="2.5" fill="#F59E0B"/>
    <path d="M48,52 L58,38" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
    <path d="M64,50 Q74,44 82,50 L84,72 Q74,74 62,70 Z" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
    <rect x="68" y="56" width="7" height="7" rx="1.5" fill="#FEF08A"/>
    <path d="M72,24 L74,44 Q77,48 83,48 Q89,48 90,44 L92,24 Z" fill="#FFFFFF" stroke="#60A5FA" stroke-width="1.5"/>
    <path d="M74,30 L90,30 L88,44 Q83,46 76,44 Z" fill="#BFDBFE"/>
    <line x1="84" y1="14" x2="80" y2="40" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  dinner: `<svg xmlns="http://www.w3.org/2000/svg" data-key="dinner" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F1F5F9"/>
    <ellipse cx="50" cy="80" rx="46" ry="14" fill="#CBD5E1"/>
    <circle cx="50" cy="56" r="30" fill="#E2E8F0"/>
    <circle cx="50" cy="56" r="26" fill="#FFFFFF" stroke="#3B82F6" stroke-width="2"/>
    <ellipse cx="44" cy="54" rx="12" ry="8" fill="#B45309"/>
    <circle cx="58" cy="50" r="4" fill="#22C55E"/>
    <circle cx="64" cy="54" r="3.5" fill="#22C55E"/>
    <circle cx="60" cy="60" r="3.5" fill="#22C55E"/>
    <polygon points="40,64 48,60 46,68" fill="#F97316"/>
    <rect x="48" y="18" width="4" height="16" rx="1" fill="#DC2626"/>
    <path d="M50,12 Q53,16 50,18 Q47,16 50,12 Z" fill="#FACC15"/>
    <rect x="12" y="44" width="3" height="24" rx="1" fill="#94A3B8"/>
    <rect x="85" y="44" width="3" height="24" rx="1" fill="#94A3B8"/>
  </svg>`,

  lunch: `<svg xmlns="http://www.w3.org/2000/svg" data-key="lunch" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEF3C7"/>
    <rect x="14" y="26" width="72" height="52" rx="10" fill="#F59E0B" stroke="#D97706" stroke-width="2"/>
    <rect x="18" y="30" width="32" height="44" rx="6" fill="#FFFFFF"/>
    <circle cx="34" cy="46" r="7" fill="#F87171"/>
    <circle cx="34" cy="60" r="4" fill="#10B981"/>
    <rect x="54" y="30" width="28" height="20" rx="4" fill="#FDE68A"/>
    <ellipse cx="68" cy="40" rx="8" ry="5" fill="#92400E"/>
    <rect x="54" y="54" width="28" height="20" rx="4" fill="#93C5FD"/>
    <circle cx="68" cy="64" r="5" fill="#EF4444"/>
  </svg>`,

  go_to_school: `<svg xmlns="http://www.w3.org/2000/svg" data-key="go_to_school" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#ECFDF5"/>
    <circle cx="16" cy="18" r="9" fill="#FACC15"/>
    <rect x="52" y="24" width="42" height="46" fill="#F87171" stroke="#DC2626" stroke-width="1.5"/>
    <polygon points="50,24 73,8 96,24" fill="#B91C1C"/>
    <circle cx="73" cy="20" r="4" fill="#FFFFFF"/>
    <rect x="67" y="52" width="12" height="18" rx="2" fill="#78350F"/>
    <path d="M0,86 Q40,78 73,70 L73,100 L0,100 Z" fill="#A7F3D0"/>
    <circle cx="28" cy="44" r="8" fill="#FED7AA"/>
    <path d="M20,42 Q28,32 36,42 Z" fill="#78350F"/>
    <rect x="22" y="53" width="12" height="16" rx="3" fill="#2563EB"/>
    <rect x="14" y="54" width="8" height="12" rx="2" fill="#F59E0B"/>
    <line x1="25" y1="69" x2="20" y2="86" stroke="#1E293B" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="31" y1="69" x2="36" y2="85" stroke="#1E293B" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`,

  go_to_bed: `<svg xmlns="http://www.w3.org/2000/svg" data-key="go_to_bed" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#1E1B4B"/>
    <path d="M82,12 A10,10 0 0 1 76,26 A10,10 0 1 0 82,12 Z" fill="#FDE047"/>
    <polygon points="60,14 61,17 64,17 61,19 62,22 60,20 58,22 59,19 56,17 59,17" fill="#FDE047"/>
    <rect x="8" y="52" width="12" height="38" rx="2" fill="#92400E"/>
    <rect x="16" y="68" width="76" height="18" rx="2" fill="#B45309"/>
    <ellipse cx="28" cy="62" rx="10" ry="7" fill="#FFFFFF"/>
    <circle cx="32" cy="58" r="7.5" fill="#FED7AA"/>
    <path d="M26,56 Q32,48 38,56 Z" fill="#78350F"/>
    <path d="M30,59 Q32,61 34,59" stroke="#1E293B" stroke-width="1.2" fill="none"/>
    <path d="M28,64 L88,64 Q90,64 90,68 L90,84 L26,84 Q26,64 28,64 Z" fill="#6366F1"/>
    <circle cx="48" cy="74" r="2.5" fill="#FDE047"/>
    <circle cx="68" cy="74" r="2.5" fill="#FDE047"/>
  </svg>`,

  happy: `<svg xmlns="http://www.w3.org/2000/svg" data-key="happy" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEF9C3"/>
    <circle cx="50" cy="50" r="38" fill="#FDE047" stroke="#EAB308" stroke-width="3"/>
    <path d="M32,42 Q40,32 46,42" stroke="#713F12" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path d="M54,42 Q62,32 70,42" stroke="#713F12" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <circle cx="28" cy="54" r="6" fill="#FCA5A5" opacity="0.8"/>
    <circle cx="72" cy="54" r="6" fill="#FCA5A5" opacity="0.8"/>
    <path d="M32,56 Q50,82 68,56 Z" fill="#DC2626"/>
    <path d="M36,56 Q50,66 64,56 Z" fill="#FFFFFF"/>
  </svg>`,

  sad: `<svg xmlns="http://www.w3.org/2000/svg" data-key="sad" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#EFF6FF"/>
    <circle cx="50" cy="50" r="38" fill="#93C5FD" stroke="#3B82F6" stroke-width="3"/>
    <path d="M30,38 L42,42" stroke="#1E3A8A" stroke-width="3" stroke-linecap="round"/>
    <path d="M70,38 L58,42" stroke="#1E3A8A" stroke-width="3" stroke-linecap="round"/>
    <circle cx="36" cy="46" r="3.5" fill="#1E3A8A"/>
    <circle cx="64" cy="46" r="3.5" fill="#1E3A8A"/>
    <path d="M34,70 Q50,54 66,70" stroke="#1E3A8A" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M70,54 Q74,60 70,64 Q66,60 70,54 Z" fill="#2563EB"/>
  </svg>`,

  angry: `<svg xmlns="http://www.w3.org/2000/svg" data-key="angry" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEF2F2"/>
    <circle cx="50" cy="50" r="38" fill="#F87171" stroke="#DC2626" stroke-width="3"/>
    <line x1="28" y1="36" x2="44" y2="44" stroke="#7F1D1D" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="72" y1="36" x2="56" y2="44" stroke="#7F1D1D" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="37" cy="48" r="3.5" fill="#7F1D1D"/>
    <circle cx="63" cy="48" r="3.5" fill="#7F1D1D"/>
    <rect x="36" y="62" width="28" height="10" rx="3" fill="#FFFFFF" stroke="#7F1D1D" stroke-width="2"/>
    <line x1="43" y1="62" x2="43" y2="72" stroke="#7F1D1D" stroke-width="1.5"/>
    <line x1="50" y1="62" x2="50" y2="72" stroke="#7F1D1D" stroke-width="1.5"/>
    <line x1="57" y1="62" x2="57" y2="72" stroke="#7F1D1D" stroke-width="1.5"/>
  </svg>`,

  sleepy: `<svg xmlns="http://www.w3.org/2000/svg" data-key="sleepy" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F5F3FF"/>
    <circle cx="50" cy="52" r="36" fill="#DDD6FE" stroke="#8B5CF6" stroke-width="3"/>
    <path d="M30,46 Q38,50 44,46" stroke="#4C1D95" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M56,46 Q62,50 70,46" stroke="#4C1D95" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="50" cy="66" rx="8" ry="12" fill="#5B21B6"/>
    <text x="74" y="24" font-family="sans-serif" font-weight="bold" font-size="14" fill="#7C3AED">Z</text>
    <text x="82" y="34" font-family="sans-serif" font-weight="bold" font-size="11" fill="#8B5CF6">z</text>
    <text x="88" y="42" font-family="sans-serif" font-weight="bold" font-size="9" fill="#A78BFA">z</text>
  </svg>`,

  clean_house: `<svg xmlns="http://www.w3.org/2000/svg" data-key="clean_house" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <polygon points="50,14 16,42 84,42" fill="#DC2626"/>
    <rect x="22" y="42" width="56" height="42" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
    <line x1="72" y1="46" x2="52" y2="82" stroke="#78350F" stroke-width="3.5" stroke-linecap="round"/>
    <polygon points="46,80 58,74 62,88 50,92" fill="#F59E0B"/>
    <polygon points="26,48 29,54 35,54 30,58 32,64 26,60 21,64 23,58 18,54 24,54" fill="#FACC15"/>
    <polygon points="76,64 78,68 82,68 79,71 80,75 76,72 72,75 73,71 70,68 74,68" fill="#FACC15"/>
  </svg>`,

  surf_internet: `<svg xmlns="http://www.w3.org/2000/svg" data-key="surf_internet" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F8FAFC"/>
    <rect x="18" y="22" width="64" height="44" rx="4" fill="#1E293B"/>
    <rect x="22" y="26" width="56" height="36" rx="2" fill="#38BDF8"/>
    <circle cx="36" cy="44" r="6" fill="#FFFFFF"/>
    <circle cx="50" cy="44" r="6" fill="#FACC15"/>
    <circle cx="64" cy="44" r="6" fill="#EF4444"/>
    <path d="M10,66 L90,66 L82,78 L18,78 Z" fill="#94A3B8"/>
    <rect x="42" y="70" width="16" height="5" rx="1" fill="#CBD5E1"/>
  </svg>`,

  water_flowers: `<svg xmlns="http://www.w3.org/2000/svg" data-key="water_flowers" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FDF4FF"/>
    <rect x="18" y="32" width="28" height="24" rx="4" fill="#0284C7"/>
    <path d="M18,36 Q8,44 18,52" stroke="#0284C7" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M46,40 L64,30 L66,36 L52,48 Z" fill="#0284C7"/>
    <circle cx="66" cy="42" r="1.5" fill="#38BDF8"/>
    <circle cx="68" cy="50" r="1.5" fill="#38BDF8"/>
    <circle cx="64" cy="56" r="1.5" fill="#38BDF8"/>
    <line x1="74" y1="56" x2="74" y2="82" stroke="#16A34A" stroke-width="3"/>
    <circle cx="74" cy="54" r="5" fill="#FACC15"/>
    <circle cx="74" cy="46" r="4" fill="#EF4444"/>
    <circle cx="82" cy="54" r="4" fill="#EF4444"/>
    <circle cx="74" cy="62" r="4" fill="#EF4444"/>
    <circle cx="66" cy="54" r="4" fill="#EF4444"/>
  </svg>`,

  swim: `<svg xmlns="http://www.w3.org/2000/svg" data-key="swim" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#E0F2FE"/>
    <path d="M0,64 Q25,56 50,64 T100,64 L100,100 L0,100 Z" fill="#0284C7"/>
    <path d="M0,74 Q25,66 50,74 T100,74 L100,100 L0,100 Z" fill="#0369A1"/>
    <circle cx="36" cy="46" r="8" fill="#FED7AA"/>
    <path d="M30,44 Q36,36 42,44 Z" fill="#0284C7"/>
    <rect x="34" y="44" width="8" height="5" rx="2" fill="#1E293B"/>
    <path d="M40,52 L68,54 L84,48" stroke="#FED7AA" stroke-width="6" stroke-linecap="round"/>
    <path d="M26,50 L44,40" stroke="#FED7AA" stroke-width="5" stroke-linecap="round"/>
  </svg>`,

  run: `<svg xmlns="http://www.w3.org/2000/svg" data-key="run" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FFF7ED"/>
    <circle cx="56" cy="24" r="8" fill="#FED7AA"/>
    <path d="M50,22 Q56,14 62,22 Z" fill="#78350F"/>
    <line x1="54" y1="32" x2="48" y2="54" stroke="#EA580C" stroke-width="9" stroke-linecap="round"/>
    <line x1="52" y1="38" x2="34" y2="44" stroke="#FED7AA" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="52" y1="38" x2="68" y2="34" stroke="#FED7AA" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="48" y1="54" x2="66" y2="68" stroke="#1E293B" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="66" y1="68" x2="78" y2="82" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
    <line x1="48" y1="54" x2="32" y2="66" stroke="#1E293B" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="32" y1="66" x2="22" y2="62" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  cook: `<svg xmlns="http://www.w3.org/2000/svg" data-key="cook" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEFCE8"/>
    <polygon points="40,16 60,16 64,28 36,28" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1.5"/>
    <circle cx="42" cy="18" r="6" fill="#FFFFFF"/>
    <circle cx="58" cy="18" r="6" fill="#FFFFFF"/>
    <circle cx="50" cy="14" r="7" fill="#FFFFFF"/>
    <circle cx="42" cy="58" r="22" fill="#334155"/>
    <circle cx="42" cy="58" r="18" fill="#F97316"/>
    <circle cx="42" cy="58" r="6" fill="#FACC15"/>
    <rect x="64" y="55" width="28" height="6" rx="3" fill="#1E293B"/>
    <path d="M38,44 Q42,38 38,32" stroke="#CBD5E1" stroke-width="2" fill="none"/>
    <path d="M46,44 Q50,38 46,32" stroke="#CBD5E1" stroke-width="2" fill="none"/>
  </svg>`,

  sing: `<svg xmlns="http://www.w3.org/2000/svg" data-key="sing" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FAF5FF"/>
    <circle cx="40" cy="38" r="12" fill="#FED7AA"/>
    <path d="M28,34 Q40,22 52,34 Z" fill="#78350F"/>
    <circle cx="36" cy="36" r="1.5" fill="#1E293B"/>
    <circle cx="44" cy="36" r="1.5" fill="#1E293B"/>
    <ellipse cx="40" cy="44" rx="4" ry="5" fill="#EF4444"/>
    <rect x="54" y="44" width="8" height="14" rx="4" fill="#94A3B8"/>
    <line x1="58" y1="58" x2="58" y2="78" stroke="#1E293B" stroke-width="3"/>
    <path d="M68,22 Q72,16 78,22 L78,34" stroke="#9333EA" stroke-width="2.5" fill="none"/>
    <circle cx="76" cy="34" r="3" fill="#9333EA"/>
    <path d="M80,30 Q84,24 90,30 L90,40" stroke="#EC4899" stroke-width="2.5" fill="none"/>
    <circle cx="88" cy="40" r="3" fill="#EC4899"/>
  </svg>`,

  dance: `<svg xmlns="http://www.w3.org/2000/svg" data-key="dance" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FFF1F2"/>
    <circle cx="50" cy="22" r="8" fill="#FED7AA"/>
    <path d="M42,20 Q50,12 58,20 Z" fill="#92400E"/>
    <polygon points="50,30 36,62 64,62" fill="#F43F5E"/>
    <path d="M44,36 L26,24" stroke="#FED7AA" stroke-width="4" stroke-linecap="round"/>
    <path d="M56,36 L74,28" stroke="#FED7AA" stroke-width="4" stroke-linecap="round"/>
    <line x1="42" y1="62" x2="36" y2="84" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
    <line x1="58" y1="62" x2="68" y2="80" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  chess: `<svg xmlns="http://www.w3.org/2000/svg" data-key="chess" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F1F5F9"/>
    <rect x="14" y="24" width="72" height="56" rx="4" fill="#D97706" stroke="#92400E" stroke-width="2"/>
    <rect x="22" y="32" width="14" height="10" fill="#FFFFFF"/>
    <rect x="36" y="32" width="14" height="10" fill="#1E293B"/>
    <rect x="50" y="32" width="14" height="10" fill="#FFFFFF"/>
    <rect x="64" y="32" width="14" height="10" fill="#1E293B"/>
    <rect x="22" y="42" width="14" height="10" fill="#1E293B"/>
    <rect x="36" y="42" width="14" height="10" fill="#FFFFFF"/>
    <rect x="50" y="42" width="14" height="10" fill="#1E293B"/>
    <rect x="64" y="42" width="14" height="10" fill="#FFFFFF"/>
    <polygon points="43,26 40,36 46,36" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1"/>
    <polygon points="57,26 54,36 60,36" fill="#1E293B"/>
  </svg>`,

  karate: `<svg xmlns="http://www.w3.org/2000/svg" data-key="karate" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F8FAFC"/>
    <circle cx="44" cy="22" r="8" fill="#FED7AA"/>
    <rect x="38" y="16" width="12" height="4" fill="#DC2626"/>
    <rect x="36" y="30" width="16" height="26" rx="3" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
    <rect x="34" y="42" width="20" height="5" fill="#1E293B"/>
    <line x1="38" y1="36" x2="22" y2="40" stroke="#FED7AA" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="50" y1="36" x2="68" y2="30" stroke="#FED7AA" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="42" y1="56" x2="42" y2="82" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
    <line x1="48" y1="54" x2="80" y2="52" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
  </svg>`,

  village: `<svg xmlns="http://www.w3.org/2000/svg" data-key="village" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#ECFDF5"/>
    <circle cx="82" cy="18" r="10" fill="#FACC15"/>
    <polygon points="26,38 12,50 40,50" fill="#DC2626"/>
    <rect x="16" y="50" width="20" height="20" fill="#FEF3C7"/>
    <polygon points="66,34 50,48 82,48" fill="#B91C1C"/>
    <rect x="54" y="48" width="24" height="22" fill="#FFFFFF"/>
    <rect x="62" y="56" width="8" height="14" fill="#78350F"/>
    <circle cx="45" cy="52" r="9" fill="#15803D"/>
    <path d="M0,86 Q35,74 70,82 L100,84 L100,100 L0,100 Z" fill="#86EFAC"/>
  </svg>`,

  cinema: `<svg xmlns="http://www.w3.org/2000/svg" data-key="cinema" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#0F172A"/>
    <rect x="16" y="16" width="68" height="42" rx="4" fill="#38BDF8" stroke="#0284C7" stroke-width="2"/>
    <polygon points="46,32 58,37 46,42" fill="#FFFFFF"/>
    <ellipse cx="50" cy="84" rx="40" ry="12" fill="#DC2626"/>
    <ellipse cx="50" cy="76" rx="34" ry="10" fill="#EF4444"/>
    <rect x="70" y="52" width="14" height="20" fill="#FACC15"/>
    <circle cx="74" cy="50" r="3" fill="#FFFFFF"/>
    <circle cx="80" cy="50" r="3" fill="#FFFFFF"/>
  </svg>`,

  hospital: `<svg xmlns="http://www.w3.org/2000/svg" data-key="hospital" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <rect x="18" y="28" width="64" height="56" rx="4" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
    <rect x="44" y="12" width="12" height="16" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
    <rect x="47" y="15" width="6" height="10" fill="#EF4444"/>
    <rect x="45" y="17" width="10" height="6" fill="#EF4444"/>
    <rect x="28" y="38" width="10" height="12" rx="2" fill="#93C5FD"/>
    <rect x="62" y="38" width="10" height="12" rx="2" fill="#93C5FD"/>
    <rect x="44" y="60" width="12" height="24" rx="2" fill="#10B981"/>
  </svg>`,

  supermarket: `<svg xmlns="http://www.w3.org/2000/svg" data-key="supermarket" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEFCE8"/>
    <path d="M14,24 L24,24 L36,58 L76,58 L84,32 L28,32" stroke="#2563EB" stroke-width="3" fill="none" stroke-linecap="round"/>
    <line x1="36" y1="42" x2="80" y2="42" stroke="#2563EB" stroke-width="1.5"/>
    <line x1="48" y1="32" x2="44" y2="58" stroke="#2563EB" stroke-width="1.5"/>
    <line x1="64" y1="32" x2="60" y2="58" stroke="#2563EB" stroke-width="1.5"/>
    <circle cx="42" cy="72" r="7" fill="#1E293B"/>
    <circle cx="70" cy="72" r="7" fill="#1E293B"/>
    <circle cx="42" cy="72" r="2.5" fill="#FFFFFF"/>
    <circle cx="70" cy="72" r="2.5" fill="#FFFFFF"/>
    <rect x="42" y="20" width="12" height="16" rx="2" fill="#F87171"/>
    <rect x="58" y="16" width="10" height="20" rx="2" fill="#FDE047"/>
  </svg>`,

  rainy: `<svg xmlns="http://www.w3.org/2000/svg" data-key="rainy" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0F9FF"/>
    <ellipse cx="44" cy="40" rx="22" ry="14" fill="#94A3B8"/>
    <circle cx="60" cy="36" r="14" fill="#94A3B8"/>
    <circle cx="32" cy="40" r="12" fill="#94A3B8"/>
    <line x1="28" y1="62" x2="24" y2="76" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
    <line x1="44" y1="62" x2="40" y2="76" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
    <line x1="60" y1="62" x2="56" y2="76" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
    <line x1="74" y1="62" x2="70" y2="76" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  windy: `<svg xmlns="http://www.w3.org/2000/svg" data-key="windy" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F8FAFC"/>
    <path d="M12,32 L68,32 Q78,32 78,24 Q78,16 70,16 Q62,16 64,24" stroke="#38BDF8" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M20,50 L80,50 Q90,50 90,42 Q90,34 82,34 Q74,34 76,42" stroke="#38BDF8" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M16,68 L58,68 Q68,68 68,60 Q68,52 60,52 Q52,52 54,60" stroke="#38BDF8" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M36,78 Q46,74 52,82" stroke="#22C55E" stroke-width="3" fill="none"/>
  </svg>`,

  cloudy: `<svg xmlns="http://www.w3.org/2000/svg" data-key="cloudy" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F1F5F9"/>
    <circle cx="36" cy="38" r="16" fill="#FDE047"/>
    <ellipse cx="54" cy="56" rx="26" ry="16" fill="#CBD5E1"/>
    <circle cx="70" cy="50" r="16" fill="#CBD5E1"/>
    <circle cx="38" cy="54" r="14" fill="#CBD5E1"/>
    <ellipse cx="50" cy="54" rx="24" ry="14" fill="#FFFFFF"/>
    <circle cx="66" cy="48" r="14" fill="#FFFFFF"/>
    <circle cx="36" cy="52" r="12" fill="#FFFFFF"/>
  </svg>`,

  snowy: `<svg xmlns="http://www.w3.org/2000/svg" data-key="snowy" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#E0F2FE"/>
    <circle cx="50" cy="68" r="22" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1.5"/>
    <circle cx="50" cy="42" r="14" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1.5"/>
    <circle cx="46" cy="39" r="1.5" fill="#1E293B"/>
    <circle cx="54" cy="39" r="1.5" fill="#1E293B"/>
    <polygon points="50,43 56,45 50,47" fill="#F97316"/>
    <rect x="42" y="52" width="16" height="5" rx="2" fill="#EF4444"/>
    <circle cx="20" cy="24" r="3" fill="#FFFFFF"/>
    <circle cx="78" cy="22" r="3" fill="#FFFFFF"/>
    <circle cx="82" cy="56" r="2.5" fill="#FFFFFF"/>
  </svg>`,

  maths: `<svg xmlns="http://www.w3.org/2000/svg" data-key="maths" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <rect x="14" y="18" width="72" height="48" rx="4" fill="#14532D" stroke="#78350F" stroke-width="3"/>
    <text x="24" y="48" font-family="sans-serif" font-weight="black" font-size="18" fill="#FACC15">1+2=3</text>
    <rect x="22" y="74" width="56" height="12" rx="2" fill="#FBBF24" stroke="#D97706" stroke-width="1.5"/>
    <line x1="32" y1="74" x2="32" y2="80" stroke="#78350F" stroke-width="1"/>
    <line x1="42" y1="74" x2="42" y2="80" stroke="#78350F" stroke-width="1"/>
    <line x1="52" y1="74" x2="52" y2="80" stroke="#78350F" stroke-width="1"/>
    <line x1="62" y1="74" x2="62" y2="80" stroke="#78350F" stroke-width="1"/>
  </svg>`,

  science: `<svg xmlns="http://www.w3.org/2000/svg" data-key="science" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F5F3FF"/>
    <path d="M42,20 L58,20 L58,36 L76,74 Q78,78 74,82 L26,82 Q22,78 24,74 L42,36 Z" fill="#E2E8F0" stroke="#6366F1" stroke-width="2"/>
    <path d="M30,62 L70,62 L74,78 Q74,80 72,80 L28,80 Q26,80 26,78 Z" fill="#22C55E"/>
    <circle cx="44" cy="70" r="3" fill="#FFFFFF" opacity="0.8"/>
    <circle cx="56" cy="66" r="2" fill="#FFFFFF" opacity="0.8"/>
    <circle cx="50" cy="74" r="2.5" fill="#FFFFFF" opacity="0.8"/>
  </svg>`,

  art: `<svg xmlns="http://www.w3.org/2000/svg" data-key="art" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FFFBEB"/>
    <path d="M22,36 Q16,72 50,78 Q74,82 82,64 Q86,46 68,36 Q42,22 22,36 Z" fill="#FDE68A" stroke="#D97706" stroke-width="2"/>
    <circle cx="34" cy="42" r="5" fill="#EF4444"/>
    <circle cx="48" cy="38" r="5" fill="#3B82F6"/>
    <circle cx="62" cy="44" r="5" fill="#22C55E"/>
    <circle cx="68" cy="58" r="5" fill="#A855F7"/>
    <circle cx="38" cy="62" r="5" fill="#F97316"/>
    <line x1="72" y1="20" x2="52" y2="60" stroke="#78350F" stroke-width="4" stroke-linecap="round"/>
    <polygon points="52,60 48,68 54,64" fill="#1E293B"/>
  </svg>`,

  crocodile: `<svg xmlns="http://www.w3.org/2000/svg" data-key="crocodile" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <ellipse cx="44" cy="56" rx="30" ry="16" fill="#15803D"/>
    <path d="M44,40 L90,44 L86,58 L44,60 Z" fill="#16A34A"/>
    <polygon points="60,44 64,50 68,44 72,50 76,44" fill="#FFFFFF"/>
    <circle cx="48" cy="38" r="4.5" fill="#FEF08A"/>
    <circle cx="48" cy="38" r="2" fill="#1E293B"/>
    <path d="M16,56 Q6,50 8,36" stroke="#15803D" stroke-width="5" stroke-linecap="round"/>
  </svg>`,

  kangaroo: `<svg xmlns="http://www.w3.org/2000/svg" data-key="kangaroo" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEF3C7"/>
    <ellipse cx="46" cy="60" rx="18" ry="24" fill="#B45309"/>
    <circle cx="56" cy="30" r="9" fill="#B45309"/>
    <polygon points="52,22 50,8 57,20" fill="#92400E"/>
    <polygon points="59,22 62,8 64,20" fill="#92400E"/>
    <circle cx="58" cy="30" r="1.5" fill="#1E293B"/>
    <ellipse cx="48" cy="68" rx="10" ry="8" fill="#FDE68A"/>
    <path d="M30,66 Q14,70 12,84" stroke="#92400E" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="46" cy="84" rx="12" ry="4" fill="#78350F"/>
  </svg>`,

  peacock: `<svg xmlns="http://www.w3.org/2000/svg" data-key="peacock" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDFA"/>
    <ellipse cx="50" cy="50" rx="36" ry="28" fill="#0D9488"/>
    <circle cx="32" cy="38" r="4" fill="#FDE047"/>
    <circle cx="50" cy="30" r="4" fill="#FDE047"/>
    <circle cx="68" cy="38" r="4" fill="#FDE047"/>
    <ellipse cx="50" cy="62" rx="10" ry="16" fill="#1D4ED8"/>
    <circle cx="50" cy="42" r="7" fill="#1D4ED8"/>
    <polygon points="50,42 46,46 54,46" fill="#F59E0B"/>
  </svg>`,
};

console.log('New icons dictionary prepared, length:', Object.keys(NEW_ICONS).length);
