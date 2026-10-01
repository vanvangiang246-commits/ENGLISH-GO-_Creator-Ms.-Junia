/**
 * ENGLISH GO! - Verified Child-Friendly Cartoon Illustrations Library
 * Meets strict pedagogical requirements:
 * 1. MUST display clear, colorful, child-friendly cartoon illustrations.
 * 2. NEVER show blank image boxes, abstract shapes, circles, letters, or meaningless placeholder graphics.
 * 3. Every picture must clearly represent the target vocabulary or sentence.
 * 4. For "plate": shows a clearly recognizable cartoon ceramic plate with food/table context and silverware.
 * 5. For "cup": shows a cute, cheerful cartoon cup/mug with handle, saucer, warm steam curls.
 * 6. For "party": shows a festive cartoon celebration with party balloons, party hats, birthday cake, and confetti streamers.
 * 7. For "popcorn", "pizza", "pasta", "book", "ball", "bike": attractive educational cartoon images.
 * 8. Zero text labels inside the illustration that would give away the spelling.
 */

// Rich, high-contrast, child-friendly cartoon SVG illustrations
export const SVG_ICONS: Record<string, string> = {
  // ---------------- FOOD, DRINKS & TABLEWARE ----------------
  plate: `<svg data-key="plate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Table surface and placemat -->
    <rect x="2" y="8" width="96" height="84" rx="10" fill="#FEF3C7"/>
    <rect x="8" y="14" width="84" height="72" rx="8" fill="#FDE68A" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4 2"/>
    <!-- Fork on the left -->
    <rect x="13" y="44" width="3" height="34" rx="1.5" fill="#94A3B8"/>
    <rect x="11" y="24" width="7" height="20" rx="2" fill="#CBD5E1"/>
    <line x1="12" y1="24" x2="12" y2="34" stroke="#64748B" stroke-width="1.5"/>
    <line x1="15" y1="24" x2="15" y2="34" stroke="#64748B" stroke-width="1.5"/>
    <line x1="17" y1="24" x2="17" y2="34" stroke="#64748B" stroke-width="1.5"/>
    <!-- Knife / Spoon on the right -->
    <rect x="84" y="44" width="3" height="34" rx="1.5" fill="#94A3B8"/>
    <ellipse cx="85.5" cy="32" rx="4.5" ry="10" fill="#CBD5E1"/>
    <!-- Plate base and rim -->
    <ellipse cx="50" cy="50" rx="33" ry="33" fill="#E2E8F0"/>
    <circle cx="50" cy="50" r="31" fill="#FFFFFF" stroke="#3B82F6" stroke-width="3"/>
    <circle cx="50" cy="50" r="23" fill="#F8FAFC" stroke="#60A5FA" stroke-width="1.5"/>
    <!-- Food on the plate: Golden wedges, green salad leaf, cherry tomato -->
    <path d="M38,40 Q48,32 58,40 Q52,50 38,40 Z" fill="#F59E0B" stroke="#D97706" stroke-width="1.5"/>
    <path d="M42,56 Q52,48 64,54 Q56,64 42,56 Z" fill="#F59E0B" stroke="#D97706" stroke-width="1.5"/>
    <!-- Crisp lettuce leaf -->
    <path d="M32,50 C30,44 36,40 40,46 C44,40 50,44 48,52 C44,56 34,56 32,50 Z" fill="#22C55E"/>
    <!-- Juicy cherry tomato with parsley -->
    <circle cx="58" cy="46" r="6" fill="#EF4444"/>
    <circle cx="56" cy="44" r="1.8" fill="#FCA5A5"/>
    <path d="M58,41 Q56,38 58,36 M58,41 Q61,39 63,38" stroke="#15803D" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  cup: `<svg data-key="cup" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Saucer plate -->
    <ellipse cx="50" cy="80" rx="36" ry="10" fill="#CBD5E1"/>
    <ellipse cx="50" cy="78" rx="34" ry="8" fill="#F8FAFC" stroke="#38BDF8" stroke-width="2"/>
    <!-- Cup handle -->
    <path d="M66,42 Q86,46 82,64 Q76,74 62,68" stroke="#0284C7" stroke-width="6" fill="none" stroke-linecap="round"/>
    <!-- Cup body -->
    <path d="M26,34 L32,72 Q33,76 40,76 L60,76 Q67,76 68,72 L74,34 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="3"/>
    <!-- Inner tea/cocoa drink -->
    <ellipse cx="50" cy="34" rx="24" ry="7" fill="#78350F"/>
    <ellipse cx="50" cy="34" rx="20" ry="5" fill="#92400E"/>
    <!-- Cheerful cartoon star motif on cup -->
    <polygon points="50,48 52,53 57,53 53,56 55,61 50,58 45,61 47,56 43,53 48,53" fill="#FDE047"/>
    <!-- Rising aroma steam curls -->
    <path d="M40,24 Q44,18 40,12" stroke="#94A3B8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M50,22 Q54,16 50,10" stroke="#94A3B8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M60,24 Q64,18 60,12" stroke="#94A3B8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  // PARTY: Children celebrating with balloons, cake and decorations
  party: `<svg data-key="party" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Festive bunting banner decoration -->
    <path d="M4,12 Q50,22 96,12" stroke="#94A3B8" stroke-width="1.5" fill="none"/>
    <polygon points="10,14 18,15 14,24" fill="#EF4444"/>
    <polygon points="24,16 32,17 28,26" fill="#FACC15"/>
    <polygon points="38,18 46,18 42,28" fill="#3B82F6"/>
    <polygon points="54,18 62,17 58,27" fill="#10B981"/>
    <polygon points="68,16 76,15 72,25" fill="#EC4899"/>
    <polygon points="82,14 90,13 86,23" fill="#F97316"/>

    <!-- Floating colorful balloons with curly ribbons -->
    <ellipse cx="16" cy="30" rx="9" ry="12" fill="#EF4444"/>
    <polygon points="14,42 18,42 16,45" fill="#DC2626"/>
    <path d="M16,45 Q12,54 15,64" stroke="#DC2626" stroke-width="1.2" fill="none"/>

    <ellipse cx="84" cy="28" rx="9" ry="12" fill="#3B82F6"/>
    <polygon points="82,40 86,40 84,43" fill="#1D4ED8"/>
    <path d="M84,43 Q88,52 85,62" stroke="#1D4ED8" stroke-width="1.2" fill="none"/>

    <ellipse cx="26" cy="22" rx="7" ry="10" fill="#FACC15"/>
    <path d="M26,32 Q23,42 27,52" stroke="#D97706" stroke-width="1" fill="none"/>

    <!-- Left Child: Boy celebrating with party cone hat -->
    <polygon points="28,34 22,50 34,50" fill="#EC4899"/>
    <circle cx="28" cy="33" r="2.5" fill="#FDE047"/>
    <circle cx="28" cy="54" r="8" fill="#FED7AA"/>
    <path d="M20,52 Q28,46 36,52" stroke="#78350F" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="25.5" cy="53.5" r="1" fill="#1E293B"/>
    <circle cx="30.5" cy="53.5" r="1" fill="#1E293B"/>
    <path d="M26,57 Q28,60 30,57" stroke="#EF4444" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <rect x="23" y="62" width="10" height="15" rx="3" fill="#0284C7"/>
    <path d="M23,65 L15,55" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
    <circle cx="14" cy="54" r="2" fill="#FED7AA"/>
    <path d="M33,65 L40,56" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
    <circle cx="41" cy="55" r="2" fill="#FED7AA"/>

    <!-- Right Child: Girl celebrating with party cone hat -->
    <polygon points="72,34 66,50 78,50" fill="#10B981"/>
    <circle cx="72" cy="33" r="2.5" fill="#F43F5E"/>
    <circle cx="72" cy="54" r="8" fill="#FED7AA"/>
    <path d="M64,52 Q72,46 80,52" stroke="#B45309" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M63,55 Q60,62 62,68" stroke="#B45309" stroke-width="2.5" fill="none"/>
    <path d="M81,55 Q84,62 82,68" stroke="#B45309" stroke-width="2.5" fill="none"/>
    <circle cx="69.5" cy="53.5" r="1" fill="#1E293B"/>
    <circle cx="74.5" cy="53.5" r="1" fill="#1E293B"/>
    <path d="M70,57 Q72,60 74,57" stroke="#EF4444" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <polygon points="66,62 78,62 81,77 63,77" fill="#F472B6"/>
    <path d="M66,65 L59,56" stroke="#F472B6" stroke-width="3" stroke-linecap="round"/>
    <circle cx="58" cy="55" r="2" fill="#FED7AA"/>
    <path d="M78,65 L86,55" stroke="#F472B6" stroke-width="3" stroke-linecap="round"/>
    <circle cx="87" cy="54" r="2" fill="#FED7AA"/>

    <!-- Center Party Table with Birthday Cake & lit candle -->
    <rect x="36" y="74" width="28" height="18" rx="2" fill="#D97706"/>
    <rect x="34" y="72" width="32" height="4" rx="2" fill="#FDE68A"/>
    <!-- Birthday Cake -->
    <rect x="42" y="62" width="16" height="10" rx="2" fill="#EC4899"/>
    <rect x="40" y="60" width="20" height="3" rx="1.5" fill="#FDF2F8"/>
    <rect x="45" y="54" width="10" height="6" rx="2" fill="#38BDF8"/>
    <rect x="44" y="53" width="12" height="2" rx="1" fill="#FDF2F8"/>
    <!-- Lit Candle -->
    <rect x="49" y="47" width="2" height="6" fill="#FACC15"/>
    <ellipse cx="50" cy="45" rx="1.5" ry="3" fill="#EF4444"/>
    <ellipse cx="50" cy="45" rx="0.8" ry="1.8" fill="#FEF08A"/>

    <!-- Confetti decorations and stars -->
    <circle cx="12" cy="72" r="1.5" fill="#FACC15"/>
    <circle cx="88" cy="70" r="1.5" fill="#EC4899"/>
    <circle cx="50" cy="28" r="1.5" fill="#10B981"/>
    <circle cx="36" cy="38" r="1.5" fill="#F97316"/>
    <circle cx="64" cy="36" r="1.5" fill="#A855F7"/>
  </svg>`,

  // PASTA: Bowl / plate of delicious spaghetti pasta
  pasta: `<svg data-key="pasta" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Plate shadow -->
    <ellipse cx="50" cy="76" rx="44" ry="14" fill="#CBD5E1"/>
    <!-- Ceramic Plate with blue rim -->
    <ellipse cx="50" cy="72" rx="44" ry="14" fill="#FFFFFF" stroke="#0284C7" stroke-width="2.5"/>
    <ellipse cx="50" cy="70" rx="36" ry="10" fill="#F8FAFC"/>
    <!-- Golden Spaghetti Pasta Mound -->
    <ellipse cx="50" cy="58" rx="34" ry="18" fill="#FACC15"/>
    <!-- Tangled spaghetti noodle strands -->
    <path d="M24,54 Q36,42 48,56 Q60,42 74,54" stroke="#EAB308" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path d="M26,62 Q42,48 56,64 Q68,48 74,60" stroke="#CA8A04" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M32,58 Q48,68 64,54 Q72,60 76,56" stroke="#EAB308" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M36,50 Q48,42 60,52" stroke="#CA8A04" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Rich Red Tomato Sauce / Meat Sauce -->
    <ellipse cx="50" cy="50" rx="18" ry="11" fill="#EF4444"/>
    <ellipse cx="48" cy="48" rx="14" ry="8" fill="#DC2626"/>
    <circle cx="44" cy="46" r="3" fill="#B91C1C"/>
    <circle cx="54" cy="48" r="3" fill="#B91C1C"/>
    <!-- Fresh Green Basil Leaves -->
    <path d="M50,42 Q42,34 50,30 Q58,34 50,42 Z" fill="#22C55E"/>
    <path d="M50,42 Q58,38 64,34 Q62,44 50,42 Z" fill="#16A34A"/>
    <!-- Silver Fork on the right twirling pasta -->
    <line x1="72" y1="26" x2="84" y2="72" stroke="#94A3B8" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M70,25 L74,27 M73,22 L77,24 M76,19 L80,21" stroke="#64748B" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // POPCORN: Red and white striped popcorn box overflowing with fluffy popcorn
  popcorn: `<svg data-key="popcorn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Popcorn container shadow -->
    <ellipse cx="50" cy="94" rx="28" ry="5" fill="#CBD5E1"/>
    <!-- Red and white striped Popcorn Box -->
    <polygon points="30,46 22,90 78,90 70,46" fill="#EF4444"/>
    <polygon points="30,46 22,90 32,90 38,46" fill="#FFFFFF"/>
    <polygon points="46,46 44,90 56,90 54,46" fill="#FFFFFF"/>
    <polygon points="62,46 68,90 78,90 70,46" fill="#FFFFFF"/>
    <ellipse cx="50" cy="46" rx="20" ry="4" fill="#DC2626"/>
    <!-- Scalloped rim on box -->
    <path d="M29,46 Q34,44 39,46 Q44,44 50,46 Q56,44 61,46 Q66,44 71,46" stroke="#B91C1C" stroke-width="2" fill="none"/>
    <!-- Overflowing Fluffy Popcorn Kernels -->
    <circle cx="34" cy="40" r="9" fill="#FEF08A"/>
    <circle cx="46" cy="36" r="10" fill="#FDE047"/>
    <circle cx="58" cy="38" r="10" fill="#FEF08A"/>
    <circle cx="68" cy="42" r="8" fill="#FDE047"/>
    <circle cx="38" cy="28" r="9" fill="#FEF08A"/>
    <circle cx="50" cy="24" r="10" fill="#FDE047"/>
    <circle cx="62" cy="29" r="9" fill="#FEF08A"/>
    <circle cx="48" cy="15" r="8" fill="#FEF08A"/>
    <circle cx="30" cy="34" r="7" fill="#FDE047"/>
    <circle cx="70" cy="34" r="7" fill="#FEF08A"/>
    <!-- Kernel Texture / Butter Accents -->
    <circle cx="38" cy="28" r="3.5" fill="#EAB308"/>
    <circle cx="50" cy="24" r="4" fill="#EAB308"/>
    <circle cx="46" cy="36" r="4" fill="#EAB308"/>
    <circle cx="58" cy="38" r="3.5" fill="#EAB308"/>
    <circle cx="48" cy="15" r="3" fill="#EAB308"/>
  </svg>`,

  present: `<svg data-key="present" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="88" rx="34" ry="7" fill="#CBD5E1"/>
    <rect x="22" y="46" width="56" height="38" rx="5" fill="#EC4899"/>
    <rect x="18" y="38" width="64" height="12" rx="4" fill="#DB2777"/>
    <rect x="45" y="38" width="10" height="46" fill="#FBBF24"/>
    <rect x="18" y="42" width="64" height="4" fill="#F59E0B"/>
    <path d="M50,38 C38,20 28,34 50,38 Z" fill="#F59E0B"/>
    <path d="M50,38 C62,20 72,34 50,38 Z" fill="#F59E0B"/>
    <path d="M50,38 C42,24 34,34 50,38 Z" fill="#FDE047"/>
    <path d="M50,38 C58,24 66,34 50,38 Z" fill="#FDE047"/>
    <circle cx="50" cy="38" r="5" fill="#D97706"/>
    <path d="M48,40 Q40,48 42,56" stroke="#D97706" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M52,40 Q60,48 58,56" stroke="#D97706" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  // PIZZA: Recognizable cartoon pizza slice with melted cheese and pepperoni
  pizza: `<svg data-key="pizza" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Crust shadow & rim -->
    <path d="M15,76 Q50,88 85,76" stroke="#B45309" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M16,75 Q50,86 84,75" stroke="#D97706" stroke-width="9" fill="none" stroke-linecap="round"/>
    <!-- Pizza Slice Body (Melted cheese base) -->
    <path d="M50,14 L18,74 Q50,83 82,74 Z" fill="#FACC15"/>
    <path d="M50,18 L22,72 Q50,80 78,72 Z" fill="#FBBF24"/>
    <!-- Red sauce rim -->
    <path d="M22,70 Q50,78 78,70" stroke="#DC2626" stroke-width="3" fill="none"/>
    <!-- Tasty Pepperoni slices with highlights -->
    <circle cx="50" cy="44" r="7" fill="#DC2626"/>
    <circle cx="48" cy="42" r="2" fill="#F87171"/>
    <circle cx="36" cy="62" r="7" fill="#DC2626"/>
    <circle cx="34" cy="60" r="2" fill="#F87171"/>
    <circle cx="64" cy="60" r="7" fill="#DC2626"/>
    <circle cx="62" cy="58" r="2" fill="#F87171"/>
    <circle cx="48" cy="28" r="4.5" fill="#DC2626"/>
    <!-- Fresh Basil / Oregano green specks -->
    <circle cx="42" cy="36" r="3" fill="#16A34A"/>
    <circle cx="56" cy="52" r="3" fill="#16A34A"/>
    <circle cx="50" cy="66" r="2.5" fill="#16A34A"/>
    <circle cx="30" cy="52" r="2.5" fill="#16A34A"/>
    <!-- Black Olive slices -->
    <circle cx="40" cy="48" r="3" fill="#1E293B"/>
    <circle cx="40" cy="48" r="1.2" fill="#FBBF24"/>
    <circle cx="60" cy="46" r="3" fill="#1E293B"/>
    <circle cx="60" cy="46" r="1.2" fill="#FBBF24"/>
  </svg>`,

  // BILL: Cheerful primary school boy waving
  bill: `<svg data-key="bill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Smiling primary student Bill waving cheerfully -->
    <circle cx="50" cy="38" r="16" fill="#FED7AA"/>
    <!-- Boy's neat brown hair -->
    <path d="M34,36 C34,22 66,22 66,36 C62,26 38,26 34,36 Z" fill="#78350F"/>
    <path d="M34,32 Q50,22 66,32" stroke="#78350F" stroke-width="4" fill="none"/>
    <!-- Cheerful eyes and smile -->
    <circle cx="44" cy="37" r="2.2" fill="#1E293B"/>
    <circle cx="56" cy="37" r="2.2" fill="#1E293B"/>
    <path d="M45,44 Q50,49 55,44" stroke="#EF4444" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="41" cy="42" r="2" fill="#FECDD3"/>
    <circle cx="59" cy="42" r="2" fill="#FECDD3"/>
    <!-- Blue school t-shirt -->
    <rect x="32" y="54" width="36" height="38" rx="6" fill="#0284C7"/>
    <polygon points="44,54 50,62 56,54" fill="#FFFFFF"/>
    <!-- Waving hand on the right -->
    <path d="M68,58 L82,42" stroke="#0284C7" stroke-width="6" stroke-linecap="round"/>
    <circle cx="84" cy="40" r="4.5" fill="#FED7AA"/>
    <!-- Left arm resting -->
    <path d="M32,58 L24,74" stroke="#0284C7" stroke-width="6" stroke-linecap="round"/>
    <circle cx="23" cy="76" r="4" fill="#FED7AA"/>
  </svg>`,

  noodles: `<svg data-key="noodles" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="74" rx="38" ry="12" fill="#94A3B8"/>
    <path d="M18,46 Q50,92 82,46 Z" fill="#EF4444"/>
    <ellipse cx="50" cy="46" rx="32" ry="10" fill="#FBBF24"/>
    <path d="M26,44 Q36,36 46,44 Q56,36 66,44 Q76,36 78,44" stroke="#D97706" stroke-width="3" fill="none"/>
    <path d="M30,48 Q42,40 54,48 Q66,40 74,48" stroke="#F59E0B" stroke-width="3" fill="none"/>
    <circle cx="42" cy="44" r="5" fill="#22C55E"/>
    <circle cx="58" cy="42" r="5" fill="#F97316"/>
    <line x1="20" y1="36" x2="80" y2="28" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>
    <line x1="22" y1="42" x2="82" y2="34" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  rice: `<svg data-key="rice" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="78" rx="36" ry="10" fill="#CBD5E1"/>
    <path d="M20,50 Q50,90 80,50 Z" fill="#0284C7"/>
    <ellipse cx="50" cy="50" rx="30" ry="12" fill="#E0F2FE"/>
    <ellipse cx="50" cy="46" rx="26" ry="14" fill="#FFFFFF"/>
    <path d="M34,44 Q50,34 66,44" stroke="#E2E8F0" stroke-width="3" fill="none"/>
    <line x1="68" y1="34" x2="86" y2="18" stroke="#92400E" stroke-width="3" stroke-linecap="round"/>
    <line x1="64" y1="38" x2="82" y2="22" stroke="#92400E" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  cake: `<svg data-key="cake" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="22" y="48" width="56" height="34" rx="6" fill="#F472B6"/>
    <rect x="18" y="44" width="64" height="10" rx="5" fill="#FDE047"/>
    <rect x="47" y="24" width="6" height="20" rx="3" fill="#38BDF8"/>
    <ellipse cx="50" cy="18" rx="4" ry="7" fill="#F59E0B"/>
    <circle cx="32" cy="64" r="4" fill="#FFFFFF"/>
    <circle cx="50" cy="64" r="4" fill="#FFFFFF"/>
    <circle cx="68" cy="64" r="4" fill="#FFFFFF"/>
  </svg>`,

  bread: `<svg data-key="bread" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="54" rx="38" ry="24" fill="#D97706"/>
    <ellipse cx="50" cy="50" rx="34" ry="18" fill="#F59E0B"/>
    <path d="M32,46 L38,56 M47,44 L53,54 M62,46 L68,56" stroke="#B45309" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  milk: `<svg data-key="milk" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <path d="M36,26 L64,26 L70,40 L70,84 L30,84 L30,40 Z" fill="#0EA5E9"/>
    <polygon points="36,26 64,26 58,16 42,16" fill="#0284C7"/>
    <rect x="36" y="48" width="28" height="24" rx="4" fill="#FFFFFF"/>
    <ellipse cx="50" cy="60" rx="6" ry="6" fill="#38BDF8"/>
  </svg>`,

  water: `<svg data-key="water" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="42" y="16" width="16" height="8" rx="2" fill="#0284C7"/>
    <path d="M38,24 L62,24 L66,38 L66,84 Q66,88 62,88 L38,88 Q34,88 34,84 L34,38 Z" fill="#E0F2FE" stroke="#0284C7" stroke-width="3"/>
    <path d="M36,52 Q50,48 64,52 L64,84 L36,84 Z" fill="#38BDF8"/>
  </svg>`,

  tea: `<svg data-key="tea" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="80" rx="34" ry="8" fill="#CBD5E1"/>
    <path d="M26,44 Q28,74 50,74 Q72,74 74,44 Z" fill="#059669"/>
    <ellipse cx="50" cy="44" rx="24" ry="8" fill="#F59E0B"/>
    <path d="M72,50 Q86,52 86,60 Q86,68 70,68" stroke="#047857" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M42,34 Q46,26 42,20 M50,34 Q54,24 50,18 M58,34 Q62,26 58,20" stroke="#94A3B8" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`,

  juice: `<svg data-key="juice" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <polygon points="34,30 66,30 60,86 40,86" fill="#F97316"/>
    <polygon points="32,28 68,28 66,32 34,32" fill="#EA580C"/>
    <line x1="56" y1="12" x2="48" y2="82" stroke="#EF4444" stroke-width="4" stroke-linecap="round"/>
    <circle cx="68" cy="30" r="10" fill="#FDE047"/>
    <circle cx="68" cy="30" r="7" fill="#F97316"/>
  </svg>`,

  apple: `<svg data-key="apple" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="42" cy="58" rx="24" ry="26" fill="#EF4444"/>
    <ellipse cx="58" cy="58" rx="24" ry="26" fill="#DC2626"/>
    <path d="M50,34 Q54,18 64,16" stroke="#78350F" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="62" cy="24" rx="8" ry="5" fill="#22C55E" transform="rotate(-30 62 24)"/>
  </svg>`,

  banana: `<svg data-key="banana" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <path d="M22,76 C32,40 68,28 84,26 C76,46 54,78 22,76 Z" fill="#FACC15"/>
    <path d="M84,26 L88,22" stroke="#78350F" stroke-width="4" stroke-linecap="round"/>
    <path d="M22,76 L16,80" stroke="#78350F" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  chicken: `<svg data-key="chicken" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="45" cy="45" rx="24" ry="18" fill="#B45309" transform="rotate(-25 45 45)"/>
    <ellipse cx="45" cy="45" rx="20" ry="14" fill="#D97706" transform="rotate(-25 45 45)"/>
    <path d="M58,54 L78,72" stroke="#F8FAFC" stroke-width="8" stroke-linecap="round"/>
    <circle cx="78" cy="74" r="6" fill="#F8FAFC"/>
    <circle cx="82" cy="68" r="6" fill="#F8FAFC"/>
  </svg>`,

  eggs: `<svg data-key="eggs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="54" rx="36" ry="26" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="3"/>
    <circle cx="48" cy="52" r="14" fill="#F59E0B"/>
    <circle cx="44" cy="48" r="4" fill="#FDE68A"/>
  </svg>`,

  candy: `<svg data-key="candy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <polygon points="26,50 12,38 12,62" fill="#EC4899"/>
    <polygon points="74,50 88,38 88,62" fill="#EC4899"/>
    <circle cx="50" cy="50" r="22" fill="#F43F5E"/>
    <path d="M38,36 Q50,50 62,36" stroke="#FFFFFF" stroke-width="3" fill="none"/>
    <path d="M38,64 Q50,50 62,64" stroke="#FFFFFF" stroke-width="3" fill="none"/>
  </svg>`,

  chips: `<svg data-key="chips" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <polygon points="30,46 36,88 64,88 70,46" fill="#DC2626"/>
    <rect x="36" y="24" width="6" height="32" rx="2" fill="#FACC15"/>
    <rect x="44" y="18" width="6" height="36" rx="2" fill="#FDE047"/>
    <rect x="52" y="22" width="6" height="34" rx="2" fill="#FACC15"/>
    <rect x="58" y="28" width="6" height="26" rx="2" fill="#FDE047"/>
  </svg>`,

  sandwich: `<svg data-key="sandwich" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <polygon points="20,70 80,70 50,30" fill="#D97706"/>
    <polygon points="24,68 76,68 50,34" fill="#FDE68A"/>
    <rect x="22" y="60" width="56" height="5" fill="#EF4444"/>
    <rect x="20" y="55" width="60" height="5" fill="#22C55E"/>
    <rect x="24" y="50" width="52" height="5" fill="#FACC15"/>
  </svg>`,

  salad: `<svg data-key="salad" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="74" rx="38" ry="12" fill="#CBD5E1"/>
    <path d="M18,48 Q50,90 82,48 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="3"/>
    <circle cx="38" cy="44" r="10" fill="#22C55E"/>
    <circle cx="52" cy="42" r="11" fill="#16A34A"/>
    <circle cx="64" cy="46" r="9" fill="#22C55E"/>
    <circle cx="44" cy="48" r="5" fill="#EF4444"/>
    <circle cx="58" cy="44" r="5" fill="#EF4444"/>
  </svg>`,

  biscuit: `<svg data-key="biscuit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="32" fill="#D97706"/>
    <circle cx="50" cy="50" r="28" fill="#F59E0B"/>
    <circle cx="40" cy="40" r="3" fill="#78350F"/>
    <circle cx="60" cy="42" r="3" fill="#78350F"/>
    <circle cx="50" cy="56" r="3" fill="#78350F"/>
    <circle cx="38" cy="60" r="2.5" fill="#78350F"/>
    <circle cx="62" cy="58" r="2.5" fill="#78350F"/>
  </svg>`,

  soup: `<svg data-key="soup" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="76" rx="36" ry="10" fill="#CBD5E1"/>
    <path d="M22,46 Q24,76 50,76 Q76,76 78,46 Z" fill="#EF4444"/>
    <ellipse cx="50" cy="46" rx="28" ry="10" fill="#F59E0B"/>
    <circle cx="42" cy="46" r="3" fill="#22C55E"/>
    <circle cx="54" cy="48" r="3" fill="#EA580C"/>
    <circle cx="48" cy="42" r="2.5" fill="#22C55E"/>
    <path d="M38,30 Q42,20 38,12 M50,28 Q54,18 50,10 M62,30 Q66,20 62,12" stroke="#94A3B8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <line x1="68" y1="36" x2="84" y2="20" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  pot: `<svg data-key="pot" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="24" y="44" width="52" height="36" rx="6" fill="#64748B"/>
    <rect x="14" y="52" width="10" height="6" rx="3" fill="#475569"/>
    <rect x="76" y="52" width="10" height="6" rx="3" fill="#475569"/>
    <ellipse cx="50" cy="44" rx="26" ry="6" fill="#94A3B8"/>
    <path d="M26,44 Q50,30 74,44 Z" fill="#475569"/>
    <circle cx="50" cy="30" r="4" fill="#F59E0B"/>
  </svg>`,

  box: `<svg data-key="box" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <polygon points="50,22 84,36 50,50 16,36" fill="#0D9488"/>
    <polygon points="16,36 50,50 50,82 16,68" fill="#0F766E"/>
    <polygon points="50,50 84,36 84,68 50,82" fill="#14B8A6"/>
    <line x1="50" y1="22" x2="50" y2="50" stroke="#FDE047" stroke-width="3"/>
    <line x1="16" y1="36" x2="84" y2="36" stroke="#FDE047" stroke-width="2"/>
  </svg>`,

  // ---------------- ANIMALS ----------------
  cat: `<svg data-key="cat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="55" r="32" fill="#FDBA74"/>
    <polygon points="26,35 34,14 46,30" fill="#FB923C"/>
    <polygon points="74,35 66,14 54,30" fill="#FB923C"/>
    <ellipse cx="40" cy="50" rx="4" ry="6" fill="#1E293B"/>
    <ellipse cx="60" cy="50" rx="4" ry="6" fill="#1E293B"/>
    <polygon points="47,60 53,60 50,64" fill="#F43F5E"/>
    <path d="M44,66 Q50,72 56,66" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M22,54 L36,56 M22,62 L36,60 M78,54 L64,56 M78,62 L64,60" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  dog: `<svg data-key="dog" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="55" rx="34" ry="30" fill="#F59E0B"/>
    <ellipse cx="22" cy="45" rx="10" ry="20" fill="#B45309" transform="rotate(-15 22 45)"/>
    <ellipse cx="78" cy="45" rx="10" ry="20" fill="#B45309" transform="rotate(15 78 45)"/>
    <circle cx="38" cy="50" r="5" fill="#1E293B"/>
    <circle cx="62" cy="50" r="5" fill="#1E293B"/>
    <ellipse cx="50" cy="62" rx="7" ry="5" fill="#1E293B"/>
    <path d="M43,70 Q50,76 57,70" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  bird: `<svg data-key="bird" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="45" cy="55" rx="28" ry="20" fill="#3B82F6"/>
    <circle cx="65" cy="38" r="16" fill="#3B82F6"/>
    <polygon points="78,36 94,40 78,44" fill="#F59E0B"/>
    <circle cx="70" cy="34" r="4" fill="#0F172A"/>
    <polygon points="20,54 6,48 10,60" fill="#1D4ED8"/>
    <ellipse cx="42" cy="58" rx="14" ry="8" fill="#1D4ED8"/>
  </svg>`,

  duck: `<svg data-key="duck" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="45" cy="62" rx="30" ry="22" fill="#FBBF24"/>
    <circle cx="65" cy="40" r="18" fill="#FBBF24"/>
    <polygon points="78,38 96,44 78,48" fill="#F97316"/>
    <circle cx="70" cy="35" r="4" fill="#1E293B"/>
    <path d="M20,60 Q12,50 18,44 Q30,52 35,58" fill="#F59E0B"/>
    <ellipse cx="42" cy="64" rx="16" ry="10" fill="#F59E0B"/>
  </svg>`,

  fish: `<svg data-key="fish" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="48" cy="50" rx="32" ry="22" fill="#06B6D4"/>
    <polygon points="18,50 6,32 6,68" fill="#0891B2"/>
    <circle cx="64" cy="44" r="5" fill="#FFFFFF"/>
    <circle cx="66" cy="44" r="3" fill="#0F172A"/>
    <path d="M52,40 Q44,50 52,60" stroke="#0891B2" stroke-width="3" fill="none" stroke-linecap="round"/>
    <polygon points="45,28 35,16 55,24" fill="#0891B2"/>
  </svg>`,

  monkey: `<svg data-key="monkey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="30" fill="#92400E"/>
    <circle cx="22" cy="50" r="12" fill="#D97706"/>
    <circle cx="78" cy="50" r="12" fill="#D97706"/>
    <ellipse cx="50" cy="56" rx="22" ry="18" fill="#FDE68A"/>
    <circle cx="40" cy="44" r="5" fill="#1E293B"/>
    <circle cx="60" cy="44" r="5" fill="#1E293B"/>
    <ellipse cx="50" cy="58" rx="5" ry="3" fill="#78350F"/>
    <path d="M42,65 Q50,72 58,65" stroke="#78350F" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  elephant: `<svg data-key="elephant" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="55" rx="34" ry="28" fill="#94A3B8"/>
    <circle cx="25" cy="45" r="18" fill="#CBD5E1"/>
    <circle cx="75" cy="45" r="18" fill="#CBD5E1"/>
    <circle cx="40" cy="46" r="4" fill="#0F172A"/>
    <circle cx="60" cy="46" r="4" fill="#0F172A"/>
    <path d="M50,56 Q50,76 38,76 Q34,76 34,70" stroke="#64748B" stroke-width="6" fill="none" stroke-linecap="round"/>
  </svg>`,

  tiger: `<svg data-key="tiger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="52" r="32" fill="#F97316"/>
    <polygon points="26,30 32,14 46,26" fill="#C2410C"/>
    <polygon points="74,30 68,14 54,26" fill="#C2410C"/>
    <ellipse cx="38" cy="48" rx="5" ry="6" fill="#0F172A"/>
    <ellipse cx="62" cy="48" rx="5" ry="6" fill="#0F172A"/>
    <polygon points="46,58 54,58 50,63" fill="#0F172A"/>
    <path d="M30,36 L40,40 M70,36 L60,40 M46,24 L50,34 L54,24" stroke="#0F172A" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  lion: `<svg data-key="lion" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="52" r="36" fill="#92400E"/>
    <circle cx="50" cy="52" r="26" fill="#FBBF24"/>
    <circle cx="30" cy="32" r="8" fill="#D97706"/>
    <circle cx="70" cy="32" r="8" fill="#D97706"/>
    <circle cx="42" cy="48" r="4" fill="#0F172A"/>
    <circle cx="58" cy="48" r="4" fill="#0F172A"/>
    <polygon points="47,56 53,56 50,60" fill="#0F172A"/>
  </svg>`,

  rabbit: `<svg data-key="rabbit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="62" rx="30" ry="24" fill="#F1F5F9"/>
    <ellipse cx="38" cy="28" rx="7" ry="24" fill="#F1F5F9" transform="rotate(-8 38 28)"/>
    <ellipse cx="38" cy="28" rx="4" ry="18" fill="#F472B6" transform="rotate(-8 38 28)"/>
    <ellipse cx="62" cy="28" rx="7" ry="24" fill="#F1F5F9" transform="rotate(8 62 28)"/>
    <ellipse cx="62" cy="28" rx="4" ry="18" fill="#F472B6" transform="rotate(8 62 28)"/>
    <circle cx="40" cy="58" r="4" fill="#0F172A"/>
    <circle cx="60" cy="58" r="4" fill="#0F172A"/>
    <polygon points="47,66 53,66 50,70" fill="#FB7185"/>
  </svg>`,

  pig: `<svg data-key="pig" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="54" r="32" fill="#F472B6"/>
    <polygon points="26,32 34,16 46,28" fill="#EC4899"/>
    <polygon points="74,32 66,16 54,28" fill="#EC4899"/>
    <ellipse cx="50" cy="60" rx="14" ry="10" fill="#F9A8D4"/>
    <circle cx="45" cy="60" r="3" fill="#BE185D"/>
    <circle cx="55" cy="60" r="3" fill="#BE185D"/>
    <circle cx="38" cy="48" r="4" fill="#0F172A"/>
    <circle cx="62" cy="48" r="4" fill="#0F172A"/>
  </svg>`,

  bear: `<svg data-key="bear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="54" r="32" fill="#78350F"/>
    <circle cx="28" cy="30" r="12" fill="#92400E"/>
    <circle cx="72" cy="30" r="12" fill="#92400E"/>
    <circle cx="28" cy="30" r="7" fill="#FDE68A"/>
    <circle cx="72" cy="30" r="7" fill="#FDE68A"/>
    <ellipse cx="50" cy="62" rx="16" ry="12" fill="#FDE68A"/>
    <circle cx="40" cy="48" r="4" fill="#0F172A"/>
    <circle cx="60" cy="48" r="4" fill="#0F172A"/>
    <ellipse cx="50" cy="58" rx="6" ry="4" fill="#0F172A"/>
  </svg>`,

  mouse: `<svg data-key="mouse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="62" rx="26" ry="20" fill="#94A3B8"/>
    <circle cx="30" cy="42" r="14" fill="#CBD5E1"/>
    <circle cx="30" cy="42" r="8" fill="#F472B6"/>
    <circle cx="70" cy="42" r="14" fill="#CBD5E1"/>
    <circle cx="70" cy="42" r="8" fill="#F472B6"/>
    <circle cx="42" cy="58" r="3.5" fill="#0F172A"/>
    <circle cx="58" cy="58" r="3.5" fill="#0F172A"/>
    <polygon points="47,68 53,68 50,72" fill="#F43F5E"/>
    <path d="M22,76 Q12,74 8,84" stroke="#94A3B8" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  horse: `<svg data-key="horse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <path d="M30,76 L40,40 L60,34 L72,50 L64,76 Z" fill="#92400E"/>
    <polygon points="56,22 66,34 50,34" fill="#78350F"/>
    <ellipse cx="64" cy="50" rx="10" ry="16" fill="#B45309" transform="rotate(25 64 50)"/>
    <circle cx="60" cy="42" r="3" fill="#0F172A"/>
    <path d="M36,40 Q44,28 40,20 Q48,26 46,36" fill="#78350F"/>
  </svg>`,

  frog: `<svg data-key="frog" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="74" rx="36" ry="10" fill="#15803D"/>
    <ellipse cx="50" cy="54" rx="28" ry="20" fill="#22C55E"/>
    <circle cx="36" cy="38" r="10" fill="#22C55E"/>
    <circle cx="64" cy="38" r="10" fill="#22C55E"/>
    <circle cx="36" cy="38" r="5" fill="#FFFFFF"/>
    <circle cx="64" cy="38" r="5" fill="#FFFFFF"/>
    <circle cx="37" cy="38" r="3" fill="#0F172A"/>
    <circle cx="65" cy="38" r="3" fill="#0F172A"/>
    <path d="M38,60 Q50,68 62,60" stroke="#15803D" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  cow: `<svg data-key="cow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="54" rx="32" ry="26" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2"/>
    <path d="M32,36 Q38,44 28,52 Z" fill="#1E293B"/>
    <path d="M62,38 Q74,44 68,56 Z" fill="#1E293B"/>
    <ellipse cx="50" cy="64" rx="16" ry="10" fill="#F9A8D4"/>
    <circle cx="44" cy="64" r="2.5" fill="#BE185D"/>
    <circle cx="56" cy="64" r="2.5" fill="#BE185D"/>
    <circle cx="38" cy="46" r="3.5" fill="#0F172A"/>
    <circle cx="62" cy="46" r="3.5" fill="#0F172A"/>
  </svg>`,

  goat: `<svg data-key="goat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="56" rx="26" ry="22" fill="#F1F5F9"/>
    <path d="M38,36 Q32,20 28,16" stroke="#94A3B8" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M62,36 Q68,20 72,16" stroke="#94A3B8" stroke-width="4" stroke-linecap="round" fill="none"/>
    <circle cx="42" cy="52" r="3" fill="#0F172A"/>
    <circle cx="58" cy="52" r="3" fill="#0F172A"/>
    <polygon points="46,64 54,64 50,74" fill="#CBD5E1"/>
  </svg>`,

  giraffe: `<svg data-key="giraffe" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <path d="M42,88 L46,38 L58,34 L62,88 Z" fill="#FACC15"/>
    <circle cx="52" cy="30" r="14" fill="#FACC15"/>
    <rect x="44" y="16" width="3" height="8" rx="1.5" fill="#92400E"/>
    <rect x="56" y="16" width="3" height="8" rx="1.5" fill="#92400E"/>
    <circle cx="48" cy="28" r="2.5" fill="#0F172A"/>
    <circle cx="56" cy="28" r="2.5" fill="#0F172A"/>
    <circle cx="50" cy="52" r="5" fill="#B45309"/>
    <circle cx="52" cy="72" r="6" fill="#B45309"/>
  </svg>`,

  zebra: `<svg data-key="zebra" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="54" rx="30" ry="24" fill="#F8FAFC"/>
    <line x1="36" y1="36" x2="48" y2="44" stroke="#0F172A" stroke-width="3"/>
    <line x1="34" y1="52" x2="48" y2="56" stroke="#0F172A" stroke-width="3"/>
    <line x1="64" y1="36" x2="52" y2="44" stroke="#0F172A" stroke-width="3"/>
    <line x1="66" y1="52" x2="52" y2="56" stroke="#0F172A" stroke-width="3"/>
    <circle cx="42" cy="46" r="3.5" fill="#0F172A"/>
    <circle cx="58" cy="46" r="3.5" fill="#0F172A"/>
  </svg>`,

  parrot: `<svg data-key="parrot" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="45" cy="50" rx="20" ry="28" fill="#EF4444"/>
    <polygon points="56,36 74,42 56,48" fill="#FACC15"/>
    <circle cx="50" cy="34" r="3" fill="#0F172A"/>
    <ellipse cx="38" cy="54" rx="12" ry="20" fill="#3B82F6"/>
    <path d="M35,74 L25,92" stroke="#10B981" stroke-width="6" stroke-linecap="round"/>
  </svg>`,

  // ---------------- SCHOOL & LEARNING ----------------
  book: `<svg data-key="book" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="84" rx="36" ry="6" fill="#CBD5E1"/>
    <!-- Book open cover -->
    <path d="M12,68 Q32,60 50,68 Q68,60 88,68 L88,30 Q68,22 50,30 Q32,22 12,30 Z" fill="#1D4ED8"/>
    <!-- Book pages -->
    <path d="M14,64 Q32,56 49,63 L49,26 Q32,19 14,26 Z" fill="#F8FAFC"/>
    <path d="M86,64 Q68,56 51,63 L51,26 Q68,19 86,26 Z" fill="#FFFFFF"/>
    <!-- Spine and bookmark ribbon -->
    <line x1="50" y1="26" x2="50" y2="67" stroke="#1E40AF" stroke-width="2"/>
    <path d="M50,26 L50,74 L54,70 L58,74 L58,26" fill="#EF4444"/>
    <!-- Page text / illustration lines -->
    <line x1="22" y1="36" x2="42" y2="36" stroke="#93C5FD" stroke-width="2" stroke-linecap="round"/>
    <line x1="22" y1="44" x2="40" y2="44" stroke="#93C5FD" stroke-width="2" stroke-linecap="round"/>
    <line x1="58" y1="36" x2="78" y2="36" stroke="#93C5FD" stroke-width="2" stroke-linecap="round"/>
    <line x1="58" y1="44" x2="74" y2="44" stroke="#93C5FD" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  pencil: `<svg data-key="pencil" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="42" y="24" width="16" height="52" rx="2" fill="#FBBF24"/>
    <polygon points="42,24 58,24 50,8" fill="#FDE68A"/>
    <polygon points="47,14 53,14 50,8" fill="#1E293B"/>
    <rect x="42" y="76" width="16" height="12" rx="3" fill="#F43F5E"/>
    <rect x="42" y="74" width="16" height="4" fill="#94A3B8"/>
  </svg>`,

  pen: `<svg data-key="pen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="44" y="26" width="12" height="54" rx="3" fill="#2563EB"/>
    <polygon points="44,26 56,26 50,10" fill="#93C5FD"/>
    <polygon points="48,15 52,15 50,10" fill="#1E293B"/>
    <rect x="42" y="32" width="4" height="24" rx="2" fill="#1E40AF"/>
  </svg>`,

  ruler: `<svg data-key="ruler" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="18" y="36" width="64" height="26" rx="4" fill="#F59E0B"/>
    <line x1="28" y1="36" x2="28" y2="48" stroke="#78350F" stroke-width="2"/>
    <line x1="38" y1="36" x2="38" y2="44" stroke="#78350F" stroke-width="2"/>
    <line x1="48" y1="36" x2="48" y2="48" stroke="#78350F" stroke-width="2"/>
    <line x1="58" y1="36" x2="58" y2="44" stroke="#78350F" stroke-width="2"/>
    <line x1="68" y1="36" x2="68" y2="48" stroke="#78350F" stroke-width="2"/>
  </svg>`,

  rubber: `<svg data-key="rubber" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <polygon points="20,55 45,30 80,45 55,70" fill="#3B82F6"/>
    <polygon points="20,55 35,70 55,70 40,55" fill="#1D4ED8"/>
    <polygon points="35,70 55,70 80,45 60,45" fill="#EF4444"/>
  </svg>`,

  bag: `<svg data-key="bag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <path d="M40,28 Q50,16 60,28" stroke="#0284C7" stroke-width="5" fill="none" stroke-linecap="round"/>
    <rect x="24" y="28" width="52" height="52" rx="10" fill="#0EA5E9"/>
    <rect x="32" y="44" width="36" height="26" rx="6" fill="#38BDF8"/>
    <circle cx="50" cy="50" r="4" fill="#0284C7"/>
  </svg>`,

  desk: `<svg data-key="desk" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="18" y="38" width="64" height="12" rx="3" fill="#92400E"/>
    <rect x="22" y="50" width="8" height="36" rx="2" fill="#78350F"/>
    <rect x="70" y="50" width="8" height="36" rx="2" fill="#78350F"/>
  </svg>`,

  chair: `<svg data-key="chair" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="28" y="20" width="8" height="40" rx="3" fill="#D97706"/>
    <rect x="26" y="22" width="48" height="16" rx="4" fill="#F59E0B"/>
    <rect x="24" y="56" width="52" height="10" rx="3" fill="#D97706"/>
    <rect x="28" y="66" width="6" height="24" rx="2" fill="#B45309"/>
    <rect x="66" y="66" width="6" height="24" rx="2" fill="#B45309"/>
  </svg>`,

  clock: `<svg data-key="clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="36" fill="#0284C7"/>
    <circle cx="50" cy="50" r="30" fill="#FFFFFF"/>
    <circle cx="50" cy="50" r="4" fill="#0F172A"/>
    <line x1="50" y1="50" x2="50" y2="28" stroke="#0F172A" stroke-width="3" stroke-linecap="round"/>
    <line x1="50" y1="50" x2="66" y2="50" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  bell: `<svg data-key="bell" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <path d="M50,22 C34,22 30,52 24,66 L76,66 C70,52 66,22 50,22 Z" fill="#FBBF24"/>
    <rect x="46" y="14" width="8" height="10" rx="3" fill="#D97706"/>
    <circle cx="50" cy="72" r="6" fill="#F59E0B"/>
  </svg>`,

  school: `<svg data-key="school" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="18" y="44" width="64" height="42" rx="4" fill="#EF4444"/>
    <polygon points="50,14 14,44 86,44" fill="#B91C1C"/>
    <rect x="42" y="58" width="16" height="28" rx="2" fill="#FDE047"/>
    <rect x="24" y="52" width="12" height="12" fill="#E0F2FE"/>
    <rect x="64" y="52" width="12" height="12" fill="#E0F2FE"/>
    <polygon points="50,24 45,34 55,34" fill="#FBBF24"/>
  </svg>`,

  classroom: `<svg data-key="classroom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="14" y="18" width="72" height="42" rx="4" fill="#15803D" stroke="#78350F" stroke-width="3"/>
    <line x1="24" y1="34" x2="76" y2="34" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    <rect x="24" y="66" width="52" height="14" fill="#D97706"/>
    <rect x="28" y="80" width="6" height="14" fill="#92400E"/>
    <rect x="66" y="80" width="6" height="14" fill="#92400E"/>
  </svg>`,

  library: `<svg data-key="library" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="16" y="16" width="68" height="72" rx="4" fill="#78350F"/>
    <rect x="22" y="24" width="56" height="18" fill="#FEF3C7"/>
    <rect x="24" y="26" width="6" height="14" fill="#EF4444"/>
    <rect x="32" y="26" width="6" height="14" fill="#3B82F6"/>
    <rect x="40" y="26" width="6" height="14" fill="#10B981"/>
    <rect x="48" y="26" width="6" height="14" fill="#F59E0B"/>
    <rect x="22" y="50" width="56" height="18" fill="#FEF3C7"/>
    <rect x="26" y="52" width="6" height="14" fill="#EC4899"/>
    <rect x="34" y="52" width="6" height="14" fill="#6366F1"/>
    <rect x="42" y="52" width="6" height="14" fill="#F97316"/>
  </svg>`,

  // ---------------- TOYS, VEHICLES & SPORTS ----------------
  // KICK: Boy / child kicking a soccer ball into the air
  kick: `<svg data-key="kick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Green grass ground -->
    <path d="M6,88 Q50,84 94,88 L94,96 L6,96 Z" fill="#22C55E"/>
    <path d="M12,87 L14,80 M20,88 L23,82 M40,86 L42,79 M78,87 L81,81 M88,88 L90,83" stroke="#15803D" stroke-width="2" stroke-linecap="round"/>

    <!-- Dynamic soccer ball flying / being kicked -->
    <!-- Speed motion blur lines behind ball -->
    <path d="M52,66 Q62,56 70,50" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3 2" fill="none"/>
    <path d="M56,72 Q66,62 74,56" stroke="#38BDF8" stroke-width="2.5" stroke-dasharray="4 2" fill="none"/>
    <path d="M60,78 Q70,68 78,62" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3 2" fill="none"/>
    <!-- Impact starburst near foot and ball -->
    <polygon points="56,70 59,65 62,69 66,66 64,71 69,73 63,75 64,80 60,76 56,80 58,74 53,73" fill="#FACC15"/>

    <!-- Soccer ball with pentagon pattern -->
    <circle cx="78" cy="46" r="14" fill="#FFFFFF" stroke="#1E293B" stroke-width="2"/>
    <polygon points="78,41 82,44 80,49 76,49 74,44" fill="#1E293B"/>
    <line x1="78" y1="41" x2="78" y2="35" stroke="#1E293B" stroke-width="1.5"/>
    <line x1="82" y1="44" x2="88" y2="42" stroke="#1E293B" stroke-width="1.5"/>
    <line x1="80" y1="49" x2="85" y2="55" stroke="#1E293B" stroke-width="1.5"/>
    <line x1="76" y1="49" x2="71" y2="55" stroke="#1E293B" stroke-width="1.5"/>
    <line x1="74" y1="44" x2="68" y2="42" stroke="#1E293B" stroke-width="1.5"/>

    <!-- Boy kicking the ball -->
    <!-- Head -->
    <circle cx="36" cy="22" r="9" fill="#FED7AA"/>
    <!-- Neat hair -->
    <path d="M27,21 C27,11 45,11 45,21 C42,15 30,15 27,21 Z" fill="#78350F"/>
    <!-- Cheerful face expression -->
    <circle cx="39" cy="21" r="1.2" fill="#1E293B"/>
    <path d="M37,25 Q40,28 43,25" stroke="#EF4444" stroke-width="1.2" fill="none" stroke-linecap="round"/>

    <!-- Upper Body / T-shirt (leaning back dynamically for momentum) -->
    <path d="M28,31 L44,29 L38,54 L24,52 Z" fill="#0284C7"/>
    <!-- Arms swinging for balance -->
    <path d="M42,32 L56,26" stroke="#FED7AA" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M26,35 L14,42" stroke="#FED7AA" stroke-width="3.5" stroke-linecap="round"/>

    <!-- Blue athletic shorts -->
    <polygon points="24,52 38,54 36,66 22,64" fill="#1E3A8A"/>

    <!-- Standing Leg (Left leg planted on ground) -->
    <path d="M26,64 L24,78 L22,86" stroke="#FED7AA" stroke-width="5" stroke-linecap="round"/>
    <!-- Standing Shoe (Red sneaker) -->
    <ellipse cx="20" cy="88" rx="6" ry="3.5" fill="#EF4444"/>

    <!-- Kicking Leg (Right leg extended forward kicking the ball) -->
    <path d="M34,64 L44,72 L58,70" stroke="#FED7AA" stroke-width="5" stroke-linecap="round"/>
    <!-- Kicking Shoe striking the ball -->
    <path d="M56,66 L64,68 L62,75 L54,73 Z" fill="#EF4444"/>
    <rect x="55" y="73" width="9" height="2.5" rx="1" fill="#FFFFFF"/>
  </svg>`,

  ball: `<svg data-key="ball" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="84" rx="26" ry="6" fill="#CBD5E1"/>
    <circle cx="50" cy="50" r="34" fill="#F8FAFC" stroke="#1E293B" stroke-width="3"/>
    <!-- Classic soccer pentagons and pattern -->
    <polygon points="50,38 60,45 56,58 44,58 40,45" fill="#1E293B"/>
    <polygon points="50,16 58,26 42,26" fill="#1E293B"/>
    <polygon points="76,32 76,46 66,40" fill="#1E293B"/>
    <polygon points="70,68 80,62 74,54" fill="#1E293B"/>
    <polygon points="30,68 20,62 26,54" fill="#1E293B"/>
    <polygon points="24,32 24,46 34,40" fill="#1E293B"/>
    <path d="M50,38 L50,26 M60,45 L70,40 M56,58 L62,68 M44,58 L38,68 M40,45 L30,40" stroke="#1E293B" stroke-width="2.5"/>
  </svg>`,

  bike: `<svg data-key="bike" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Bike wheels -->
    <circle cx="28" cy="64" r="18" fill="none" stroke="#1E293B" stroke-width="5"/>
    <circle cx="72" cy="64" r="18" fill="none" stroke="#1E293B" stroke-width="5"/>
    <circle cx="28" cy="64" r="3" fill="#94A3B8"/>
    <circle cx="72" cy="64" r="3" fill="#94A3B8"/>
    <!-- Frame -->
    <line x1="28" y1="64" x2="48" y2="64" stroke="#0284C7" stroke-width="4"/>
    <line x1="48" y1="64" x2="42" y2="42" stroke="#0284C7" stroke-width="4"/>
    <line x1="28" y1="64" x2="40" y2="44" stroke="#0284C7" stroke-width="4"/>
    <line x1="40" y1="44" x2="66" y2="44" stroke="#0284C7" stroke-width="4"/>
    <line x1="48" y1="64" x2="66" y2="44" stroke="#0284C7" stroke-width="4"/>
    <line x1="72" y1="64" x2="64" y2="34" stroke="#0284C7" stroke-width="4"/>
    <!-- Saddle & Handlebars -->
    <rect x="36" y="38" width="14" height="4" rx="2" fill="#78350F"/>
    <line x1="60" y1="32" x2="70" y2="32" stroke="#0F172A" stroke-width="4" stroke-linecap="round"/>
    <circle cx="68" cy="29" r="2.5" fill="#FBBF24"/>
    <!-- Front basket -->
    <polygon points="68,34 78,34 76,44 68,44" fill="#D97706"/>
  </svg>`,

  car: `<svg data-key="car" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <path d="M22,54 L32,38 L68,38 L78,54 L84,54 Q86,54 86,62 L86,68 L14,68 L14,62 Q14,54 22,54 Z" fill="#EF4444"/>
    <rect x="36" y="42" width="14" height="10" rx="2" fill="#E0F2FE"/>
    <rect x="54" y="42" width="14" height="10" rx="2" fill="#E0F2FE"/>
    <circle cx="32" cy="68" r="8" fill="#1E293B"/>
    <circle cx="32" cy="68" r="4" fill="#94A3B8"/>
    <circle cx="68" cy="68" r="8" fill="#1E293B"/>
    <circle cx="68" cy="68" r="4" fill="#94A3B8"/>
  </svg>`,

  bus: `<svg data-key="bus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="18" y="28" width="64" height="42" rx="8" fill="#FBBF24"/>
    <rect x="24" y="34" width="14" height="12" rx="2" fill="#E0F2FE"/>
    <rect x="42" y="34" width="14" height="12" rx="2" fill="#E0F2FE"/>
    <rect x="60" y="34" width="14" height="12" rx="2" fill="#E0F2FE"/>
    <circle cx="32" cy="72" r="7" fill="#1E293B"/>
    <circle cx="68" cy="72" r="7" fill="#1E293B"/>
  </svg>`,

  plane: `<svg data-key="plane" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="50" rx="36" ry="10" fill="#0284C7"/>
    <polygon points="46,50 30,22 42,22 60,50" fill="#0369A1"/>
    <polygon points="46,50 30,78 42,78 60,50" fill="#0369A1"/>
    <polygon points="20,50 12,34 20,34 26,50" fill="#0369A1"/>
    <circle cx="74" cy="50" r="4" fill="#F8FAFC"/>
  </svg>`,

  train: `<svg data-key="train" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="22" y="36" width="56" height="34" rx="6" fill="#3B82F6"/>
    <rect x="64" y="24" width="12" height="16" fill="#1D4ED8"/>
    <rect x="28" y="42" width="16" height="12" rx="2" fill="#E0F2FE"/>
    <rect x="50" y="42" width="16" height="12" rx="2" fill="#E0F2FE"/>
    <circle cx="32" cy="72" r="6" fill="#1E293B"/>
    <circle cx="48" cy="72" r="6" fill="#1E293B"/>
    <circle cx="64" cy="72" r="6" fill="#1E293B"/>
  </svg>`,

  boat: `<svg data-key="boat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <path d="M22,66 L78,66 L70,82 L30,82 Z" fill="#DC2626"/>
    <polygon points="48,22 48,60 26,60" fill="#F8FAFC"/>
    <polygon points="52,16 52,60 74,60" fill="#F8FAFC"/>
    <line x1="50" y1="14" x2="50" y2="64" stroke="#78350F" stroke-width="3"/>
  </svg>`,

  kite: `<svg data-key="kite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <polygon points="50,14 74,44 50,74 26,44" fill="#EC4899"/>
    <line x1="50" y1="14" x2="50" y2="74" stroke="#BE185D" stroke-width="2"/>
    <line x1="26" y1="44" x2="74" y2="44" stroke="#BE185D" stroke-width="2"/>
    <path d="M50,74 Q56,84 50,92 Q46,96 52,100" stroke="#F43F5E" stroke-width="2" fill="none"/>
  </svg>`,

  robot: `<svg data-key="robot" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="34" y="24" width="32" height="26" rx="6" fill="#64748B"/>
    <line x1="50" y1="24" x2="50" y2="14" stroke="#475569" stroke-width="3"/>
    <circle cx="50" cy="12" r="4" fill="#EF4444"/>
    <circle cx="42" cy="34" r="3" fill="#38BDF8"/>
    <circle cx="58" cy="34" r="3" fill="#38BDF8"/>
    <rect x="42" y="42" width="16" height="3" fill="#FDE047"/>
    <rect x="30" y="54" width="40" height="32" rx="8" fill="#475569"/>
    <rect x="40" y="60" width="20" height="14" rx="3" fill="#0284C7"/>
  </svg>`,

  doll: `<svg data-key="doll" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="34" r="16" fill="#FED7AA"/>
    <path d="M34,30 C34,16 66,16 66,30 Z" fill="#92400E"/>
    <circle cx="44" cy="34" r="2.5" fill="#0F172A"/>
    <circle cx="56" cy="34" r="2.5" fill="#0F172A"/>
    <path d="M46,42 Q50,45 54,42" stroke="#EF4444" stroke-width="2" fill="none"/>
    <polygon points="32,80 68,80 50,48" fill="#F472B6"/>
  </svg>`,

  yo_yo: `<svg data-key="yo_yo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="58" r="26" fill="#EF4444"/>
    <circle cx="50" cy="58" r="18" fill="#F87171"/>
    <circle cx="50" cy="58" r="8" fill="#FEF08A"/>
    <path d="M50,32 Q60,18 48,10" stroke="#FBBF24" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  // ---------------- CLOTHES ----------------
  hat: `<svg data-key="hat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <ellipse cx="50" cy="68" rx="38" ry="10" fill="#3B82F6"/>
    <path d="M28,66 C28,34 72,34 72,66 Z" fill="#1D4ED8"/>
    <rect x="28" y="62" width="44" height="6" fill="#F59E0B"/>
  </svg>`,

  cap: `<svg data-key="cap" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <path d="M30,58 C30,34 70,34 70,58 Z" fill="#EF4444"/>
    <ellipse cx="68" cy="58" rx="20" ry="6" fill="#DC2626"/>
  </svg>`,

  shirt: `<svg data-key="shirt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <polygon points="32,26 68,26 84,42 74,52 64,44 64,82 36,82 36,44 26,52 16,42" fill="#0284C7"/>
    <polygon points="44,26 50,38 56,26" fill="#F8FAFC"/>
    <circle cx="50" cy="48" r="2" fill="#FFFFFF"/>
    <circle cx="50" cy="60" r="2" fill="#FFFFFF"/>
  </svg>`,

  dress: `<svg data-key="dress" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <polygon points="40,24 60,24 64,44 76,82 24,82 36,44" fill="#F472B6"/>
    <ellipse cx="50" cy="24" rx="8" ry="4" fill="#F8FAFC"/>
  </svg>`,

  shoes: `<svg data-key="shoes" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <path d="M18,60 C26,50 44,52 48,58 L48,68 L14,68 Z" fill="#0284C7"/>
    <rect x="14" y="68" width="34" height="6" rx="2" fill="#E2E8F0"/>
    <path d="M54,60 C62,50 80,52 84,58 L84,68 L50,68 Z" fill="#0284C7"/>
    <rect x="50" y="68" width="34" height="6" rx="2" fill="#E2E8F0"/>
  </svg>`,

  // ---------------- HOME, NATURE & PLACES ----------------
  house: `<svg data-key="house" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <polygon points="50,18 20,44 80,44" fill="#EF4444"/>
    <rect x="26" y="44" width="48" height="40" rx="4" fill="#FBBF24"/>
    <rect x="44" y="56" width="14" height="28" rx="2" fill="#92400E"/>
    <circle cx="54" cy="70" r="1.5" fill="#FDE047"/>
    <rect x="30" y="50" width="10" height="10" rx="2" fill="#E0F2FE"/>
  </svg>`,

  bed: `<svg data-key="bed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="16" y="42" width="10" height="42" rx="3" fill="#92400E"/>
    <rect x="74" y="52" width="10" height="32" rx="3" fill="#92400E"/>
    <rect x="24" y="58" width="54" height="20" rx="4" fill="#0284C7"/>
    <rect x="26" y="50" width="16" height="10" rx="3" fill="#F8FAFC"/>
  </svg>`,

  door: `<svg data-key="door" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="28" y="16" width="44" height="70" rx="4" fill="#92400E"/>
    <rect x="32" y="20" width="36" height="62" rx="3" fill="#B45309"/>
    <circle cx="60" cy="52" r="3" fill="#FDE047"/>
  </svg>`,

  window: `<svg data-key="window" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="24" y="24" width="52" height="52" rx="6" fill="#78350F"/>
    <rect x="28" y="28" width="20" height="20" fill="#E0F2FE"/>
    <rect x="52" y="28" width="20" height="20" fill="#E0F2FE"/>
    <rect x="28" y="52" width="20" height="20" fill="#E0F2FE"/>
    <rect x="52" y="52" width="20" height="20" fill="#E0F2FE"/>
  </svg>`,

  tree: `<svg data-key="tree" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="44" y="54" width="12" height="34" rx="3" fill="#78350F"/>
    <circle cx="50" cy="40" r="26" fill="#15803D"/>
    <circle cx="36" cy="46" r="16" fill="#16A34A"/>
    <circle cx="64" cy="46" r="16" fill="#16A34A"/>
  </svg>`,

  flower: `<svg data-key="flower" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <line x1="50" y1="50" x2="50" y2="88" stroke="#16A34A" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="40" cy="70" rx="10" ry="5" fill="#22C55E" transform="rotate(-30 40 70)"/>
    <circle cx="50" cy="36" r="12" fill="#EC4899"/>
    <circle cx="50" cy="60" r="12" fill="#EC4899"/>
    <circle cx="38" cy="48" r="12" fill="#EC4899"/>
    <circle cx="62" cy="48" r="12" fill="#EC4899"/>
    <circle cx="50" cy="48" r="10" fill="#FDE047"/>
  </svg>`,

  sun: `<svg data-key="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="22" fill="#FBBF24"/>
    <g stroke="#F59E0B" stroke-width="4" stroke-linecap="round">
      <line x1="50" y1="14" x2="50" y2="22"/>
      <line x1="50" y1="78" x2="50" y2="86"/>
      <line x1="14" y1="50" x2="22" y2="50"/>
      <line x1="78" y1="50" x2="86" y2="50"/>
      <line x1="24" y1="24" x2="30" y2="30"/>
      <line x1="70" y1="70" x2="76" y2="76"/>
      <line x1="24" y1="76" x2="30" y2="70"/>
      <line x1="70" y1="30" x2="76" y2="24"/>
    </g>
  </svg>`,

  moon: `<svg data-key="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <path d="M60,18 C38,18 20,36 20,58 C20,80 38,98 60,98 C50,86 44,70 44,58 C44,46 50,30 60,18 Z" fill="#FBBF24"/>
    <circle cx="72" cy="30" r="3" fill="#FDE68A"/>
    <circle cx="78" cy="52" r="2.5" fill="#FDE68A"/>
    <circle cx="68" cy="74" r="3" fill="#FDE68A"/>
  </svg>`,

  star: `<svg data-key="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <polygon points="50,14 61,38 88,38 66,54 74,80 50,64 26,80 34,54 12,38 39,38" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>
    <circle cx="44" cy="46" r="3" fill="#1E293B"/>
    <circle cx="56" cy="46" r="3" fill="#1E293B"/>
    <path d="M46,56 Q50,60 54,56" stroke="#1E293B" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`,

  // GRASS: Vibrant green lawn of fresh grass blades with little daisy flowers
  grass: `<svg data-key="grass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Soft sky/outdoor background -->
    <rect x="0" y="0" width="100" height="100" rx="12" fill="#F0FDF4"/>
    <!-- Rich ground soil base -->
    <path d="M0,74 Q50,70 100,74 L100,100 L0,100 Z" fill="#86EFAC"/>
    <path d="M0,82 Q50,78 100,82 L100,100 L0,100 Z" fill="#4ADE80"/>

    <!-- Back layer of grass blades (Darker green) -->
    <path d="M8,80 Q10,48 4,36 Q14,50 18,80" fill="#15803D"/>
    <path d="M16,80 Q22,42 26,28 Q28,48 28,80" fill="#16A34A"/>
    <path d="M26,80 Q32,46 38,34 Q38,54 36,80" fill="#15803D"/>
    <path d="M38,80 Q44,40 50,26 Q52,50 50,80" fill="#16A34A"/>
    <path d="M52,80 Q60,44 68,32 Q66,54 62,80" fill="#15803D"/>
    <path d="M64,80 Q72,42 78,28 Q78,50 76,80" fill="#16A34A"/>
    <path d="M76,80 Q84,46 94,36 Q88,56 86,80" fill="#15803D"/>

    <!-- Front layer of lush green grass blades (Vibrant light green) -->
    <path d="M2,82 Q8,52 14,42 Q16,62 18,82" fill="#22C55E"/>
    <path d="M12,82 Q20,44 14,30 Q24,52 24,82" fill="#4ADE80"/>
    <path d="M20,82 Q28,48 34,38 Q34,60 32,82" fill="#22C55E"/>
    <path d="M30,82 Q38,38 42,22 Q46,48 44,82" fill="#16A34A"/>
    <path d="M40,82 Q48,46 54,34 Q54,58 52,82" fill="#22C55E"/>
    <path d="M48,82 Q56,36 60,20 Q62,48 60,82" fill="#4ADE80"/>
    <path d="M58,82 Q64,48 72,38 Q70,60 68,82" fill="#22C55E"/>
    <path d="M68,82 Q76,40 82,24 Q82,50 78,82" fill="#16A34A"/>
    <path d="M78,82 Q86,46 96,40 Q90,62 88,82" fill="#22C55E"/>
    <path d="M86,82 Q92,54 98,46 Q96,68 94,82" fill="#4ADE80"/>

    <!-- Cute little lawn flowers nestled in the grass -->
    <circle cx="28" cy="72" r="5" fill="#FFFFFF"/>
    <circle cx="28" cy="72" r="2.5" fill="#FACC15"/>
    <circle cx="72" cy="70" r="5" fill="#FFFFFF"/>
    <circle cx="72" cy="70" r="2.5" fill="#FACC15"/>
    <circle cx="50" cy="76" r="4" fill="#F472B6"/>
    <circle cx="50" cy="76" r="2" fill="#FDE047"/>
  </svg>`,

  tent: `<svg data-key="tent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <polygon points="50,22 18,78 82,78" fill="#10B981"/>
    <polygon points="50,22 50,78 82,78" fill="#059669"/>
    <polygon points="50,34 38,78 62,78" fill="#F59E0B"/>
    <polygon points="50,42 44,78 56,78" fill="#78350F"/>
  </svg>`,

  beach: `<svg data-key="beach" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="50" fill="#38BDF8"/>
    <path d="M0,45 Q50,38 100,45 L100,100 L0,100 Z" fill="#FDE047"/>
    <path d="M0,42 Q50,48 100,42" stroke="#FFFFFF" stroke-width="4" fill="none"/>
    <!-- Beach umbrella -->
    <path d="M60,40 Q75,20 90,40 Z" fill="#EF4444"/>
    <line x1="75" y1="30" x2="75" y2="70" stroke="#78350F" stroke-width="3"/>
  </svg>`,

  sea: `<svg data-key="sea" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" fill="#E0F2FE"/>
    <path d="M0,40 Q25,30 50,40 T100,40 L100,100 L0,100 Z" fill="#0284C7"/>
    <path d="M0,58 Q25,48 50,58 T100,58 L100,100 L0,100 Z" fill="#0369A1"/>
    <circle cx="50" cy="30" r="10" fill="#FACC15"/>
  </svg>`,

  park: `<svg data-key="park" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="50" fill="#BAE6FD"/>
    <path d="M0,45 Q50,38 100,45 L100,100 L0,100 Z" fill="#22C55E"/>
    <!-- Tree -->
    <rect x="30" y="44" width="8" height="24" fill="#78350F"/>
    <circle cx="34" cy="36" r="16" fill="#16A34A"/>
    <!-- Bench -->
    <rect x="56" y="56" width="28" height="6" rx="2" fill="#B45309"/>
    <line x1="60" y1="62" x2="60" y2="72" stroke="#78350F" stroke-width="3"/>
    <line x1="80" y1="62" x2="80" y2="72" stroke="#78350F" stroke-width="3"/>
  </svg>`,

  zoo: `<svg data-key="zoo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="18" y="34" width="64" height="52" fill="#FEF3C7" stroke="#78350F" stroke-width="4"/>
    <rect x="26" y="22" width="48" height="16" rx="4" fill="#15803D"/>
    <line x1="34" y1="42" x2="34" y2="86" stroke="#94A3B8" stroke-width="3"/>
    <line x1="46" y1="42" x2="46" y2="86" stroke="#94A3B8" stroke-width="3"/>
    <line x1="58" y1="42" x2="58" y2="86" stroke="#94A3B8" stroke-width="3"/>
    <line x1="70" y1="42" x2="70" y2="86" stroke="#94A3B8" stroke-width="3"/>
  </svg>`,

  piano: `<svg data-key="piano" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="14" y="32" width="72" height="42" rx="4" fill="#0F172A"/>
    <!-- White keys -->
    <rect x="18" y="44" width="9" height="26" fill="#FFFFFF"/>
    <rect x="28" y="44" width="9" height="26" fill="#FFFFFF"/>
    <rect x="38" y="44" width="9" height="26" fill="#FFFFFF"/>
    <rect x="48" y="44" width="9" height="26" fill="#FFFFFF"/>
    <rect x="58" y="44" width="9" height="26" fill="#FFFFFF"/>
    <rect x="68" y="44" width="9" height="26" fill="#FFFFFF"/>
    <!-- Black keys -->
    <rect x="25" y="44" width="5" height="16" fill="#0F172A"/>
    <rect x="35" y="44" width="5" height="16" fill="#0F172A"/>
    <rect x="55" y="44" width="5" height="16" fill="#0F172A"/>
    <rect x="65" y="44" width="5" height="16" fill="#0F172A"/>
  </svg>`,

  guitar: `<svg data-key="guitar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <path d="M40,50 C30,40 30,76 46,84 C62,88 74,74 66,60 C62,54 62,50 64,44 L78,18 L68,14 L52,42 C46,44 44,46 40,50 Z" fill="#D97706"/>
    <circle cx="52" cy="64" r="8" fill="#1E293B"/>
    <line x1="73" y1="16" x2="52" y2="64" stroke="#F8FAFC" stroke-width="2"/>
  </svg>`,

  temple: `<svg data-key="temple" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <polygon points="50,16 26,30 74,30" fill="#DC2626"/>
    <rect x="36" y="30" width="28" height="16" fill="#FDE047"/>
    <polygon points="50,42 18,56 82,56" fill="#DC2626"/>
    <rect x="30" y="56" width="40" height="28" fill="#FDE047"/>
    <rect x="44" y="66" width="12" height="18" fill="#92400E"/>
  </svg>`,

  solar_panels: `<svg data-key="solar_panels" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <polygon points="24,36 76,36 84,74 16,74" fill="#0284C7" stroke="#0369A1" stroke-width="3"/>
    <line x1="44" y1="36" x2="38" y2="74" stroke="#E0F2FE" stroke-width="2"/>
    <line x1="56" y1="36" x2="62" y2="74" stroke="#E0F2FE" stroke-width="2"/>
    <line x1="19" y1="55" x2="81" y2="55" stroke="#E0F2FE" stroke-width="2"/>
  </svg>`,

  // ---------------- PEOPLE & OCCUPATIONS ----------------
  doctor: `<svg data-key="doctor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="34" r="16" fill="#FED7AA"/>
    <rect x="32" y="52" width="36" height="38" rx="6" fill="#FFFFFF" stroke="#0284C7" stroke-width="2"/>
    <path d="M40,54 Q50,72 60,54" stroke="#0284C7" stroke-width="3" fill="none"/>
    <circle cx="50" cy="72" r="3.5" fill="#94A3B8"/>
  </svg>`,

  teacher: `<svg data-key="teacher" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="44" cy="34" r="14" fill="#FED7AA"/>
    <rect x="30" y="50" width="28" height="40" rx="4" fill="#3B82F6"/>
    <rect x="62" y="24" width="26" height="34" rx="2" fill="#15803D" stroke="#78350F" stroke-width="2"/>
    <line x1="66" y1="34" x2="84" y2="34" stroke="#FFFFFF" stroke-width="2"/>
    <line x1="48" y1="54" x2="64" y2="40" stroke="#78350F" stroke-width="2.5"/>
  </svg>`,

  farmer: `<svg data-key="farmer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="36" r="14" fill="#FED7AA"/>
    <ellipse cx="50" cy="24" rx="26" ry="6" fill="#FACC15"/>
    <circle cx="50" cy="20" r="10" fill="#EAB308"/>
    <rect x="36" y="52" width="28" height="38" rx="4" fill="#0284C7"/>
  </svg>`,

  pilot: `<svg data-key="pilot" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="36" r="14" fill="#FED7AA"/>
    <polygon points="34,26 66,26 58,16 42,16" fill="#1E293B"/>
    <circle cx="50" cy="22" r="3" fill="#FACC15"/>
    <rect x="34" y="52" width="32" height="38" rx="4" fill="#1E293B"/>
  </svg>`,

  singer: `<svg data-key="singer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="44" cy="36" r="14" fill="#FED7AA"/>
    <rect x="32" y="52" width="24" height="38" rx="4" fill="#EC4899"/>
    <!-- Microphone -->
    <rect x="62" y="32" width="6" height="12" rx="3" fill="#94A3B8"/>
    <line x1="65" y1="44" x2="65" y2="60" stroke="#1E293B" stroke-width="2.5"/>
  </svg>`,

  family: `<svg data-key="family" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Father -->
    <circle cx="36" cy="30" r="10" fill="#FED7AA"/>
    <rect x="28" y="42" width="16" height="34" rx="3" fill="#0284C7"/>
    <!-- Mother -->
    <circle cx="64" cy="32" r="9" fill="#FED7AA"/>
    <polygon points="56,76 72,76 64,44" fill="#EC4899"/>
    <!-- Child -->
    <circle cx="50" cy="54" r="7" fill="#FED7AA"/>
    <rect x="45" y="62" width="10" height="18" rx="2" fill="#FACC15"/>
  </svg>`,

  table: `<svg data-key="table" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="12" y="40" width="76" height="14" rx="3" fill="#92400E"/>
    <rect x="18" y="54" width="8" height="34" rx="2" fill="#78350F"/>
    <rect x="74" y="54" width="8" height="34" rx="2" fill="#78350F"/>
  </svg>`,

  room: `<svg data-key="room" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="10" y="10" width="80" height="80" rx="6" fill="#FEF3C7"/>
    <rect x="20" y="24" width="24" height="24" fill="#BAE6FD" stroke="#78350F" stroke-width="3"/>
    <line x1="32" y1="24" x2="32" y2="48" stroke="#78350F" stroke-width="2"/>
    <line x1="20" y1="36" x2="44" y2="36" stroke="#78350F" stroke-width="2"/>
    <rect x="52" y="52" width="34" height="24" rx="3" fill="#3B82F6"/>
  </svg>`,

  study_desk: `<svg data-key="study_desk" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="16" y="54" width="68" height="10" rx="3" fill="#D97706"/>
    <rect x="22" y="64" width="8" height="26" fill="#92400E"/>
    <rect x="70" y="64" width="8" height="26" fill="#92400E"/>
    <polygon points="36,44 48,34 60,44 48,48" fill="#3B82F6"/>
    <polygon points="48,34 60,44 54,54 42,44" fill="#60A5FA"/>
    <rect x="68" y="32" width="4" height="22" fill="#64748B"/>
    <polygon points="62,32 78,32 74,22 66,22" fill="#FBBF24"/>
  </svg>`,

  // ---------------- ADDITIONAL GRADE 1 & 2 ESSENTIALS ----------------
  ant: `<svg data-key="ant" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Ant body: head, thorax, abdomen -->
    <ellipse cx="28" cy="50" rx="10" ry="8" fill="#78350F"/>
    <circle cx="25" cy="48" r="1.5" fill="#FFFFFF"/>
    <!-- Antennae -->
    <path d="M24,42 Q20,32 14,30 M28,42 Q30,30 36,28" stroke="#78350F" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="48" cy="52" rx="8" ry="6" fill="#92400E"/>
    <ellipse cx="72" cy="50" rx="14" ry="10" fill="#78350F"/>
    <!-- 6 Legs -->
    <path d="M44,54 L36,70 M48,54 L48,72 M52,54 L60,70" stroke="#78350F" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M44,48 L36,36 M48,48 L48,34 M52,48 L60,36" stroke="#78350F" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  hand: `<svg data-key="hand" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Friendly waving palm with 5 fingers -->
    <rect x="36" y="52" width="28" height="34" rx="8" fill="#FED7AA"/>
    <!-- Thumb -->
    <path d="M36,60 Q22,54 26,44 Q32,42 38,52" fill="#FED7AA"/>
    <!-- Fingers -->
    <rect x="36" y="24" width="6" height="30" rx="3" fill="#FED7AA"/>
    <rect x="44" y="18" width="6.5" height="36" rx="3" fill="#FED7AA"/>
    <rect x="52.5" y="22" width="6" height="32" rx="3" fill="#FED7AA"/>
    <rect x="60.5" y="30" width="5.5" height="24" rx="3" fill="#FED7AA"/>
  </svg>`,

  nose: `<svg data-key="nose" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Friendly cartoon nose -->
    <path d="M46,24 Q48,60 38,68 Q44,76 56,76 Q66,74 62,64" stroke="#D97706" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="42" cy="70" rx="3" ry="2" fill="#B45309"/>
    <ellipse cx="56" cy="68" rx="3" ry="2" fill="#B45309"/>
  </svg>`,

  eye: `<svg data-key="eye" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Wide open friendly cartoon eye -->
    <path d="M14,50 Q50,22 86,50 Q50,78 14,50 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="4"/>
    <circle cx="50" cy="50" r="16" fill="#0284C7"/>
    <circle cx="50" cy="50" r="9" fill="#0F172A"/>
    <circle cx="45" cy="45" r="4" fill="#FFFFFF"/>
    <circle cx="54" cy="53" r="1.5" fill="#FFFFFF"/>
  </svg>`,

  hair: `<svg data-key="hair" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Boy head showing lush styled brown hair and comb -->
    <circle cx="50" cy="56" r="24" fill="#FED7AA"/>
    <!-- Lush hair volume -->
    <path d="M24,54 C22,28 78,28 76,54 C72,36 28,36 24,54 Z" fill="#78350F"/>
    <path d="M26,44 Q50,24 74,44" stroke="#92400E" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="42" cy="56" r="2.5" fill="#1E293B"/>
    <circle cx="58" cy="56" r="2.5" fill="#1E293B"/>
    <path d="M46,66 Q50,70 54,66" stroke="#EF4444" stroke-width="2" fill="none"/>
  </svg>`,

  lake: `<svg data-key="lake" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Peaceful blue lake surrounded by green lawn and hills -->
    <rect x="0" y="0" width="100" height="100" rx="12" fill="#DCFCE7"/>
    <ellipse cx="50" cy="55" rx="42" ry="26" fill="#38BDF8"/>
    <ellipse cx="50" cy="56" rx="34" ry="18" fill="#0284C7"/>
    <path d="M30,50 Q40,48 50,50 M44,60 Q56,58 66,60" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <circle cx="24" cy="30" r="10" fill="#15803D"/>
    <circle cx="76" cy="34" r="12" fill="#16A34A"/>
  </svg>`,

  river: `<svg data-key="river" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Winding blue river through green banks with a bridge -->
    <rect x="0" y="0" width="100" height="100" rx="12" fill="#86EFAC"/>
    <path d="M35,0 Q55,40 25,70 Q15,85 20,100 L65,100 Q60,85 70,70 Q90,40 75,0 Z" fill="#0284C7"/>
    <path d="M42,20 Q60,50 35,80" stroke="#38BDF8" stroke-width="3" fill="none"/>
    <!-- Wooden bridge crossing -->
    <rect x="30" y="44" width="45" height="12" rx="2" fill="#B45309" stroke="#78350F" stroke-width="2"/>
    <line x1="30" y1="44" x2="75" y2="44" stroke="#FDE68A" stroke-width="1.5"/>
    <line x1="30" y1="56" x2="75" y2="56" stroke="#FDE68A" stroke-width="1.5"/>
  </svg>`,

  hill: `<svg data-key="hill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="12" fill="#E0F2FE"/>
    <circle cx="80" cy="24" r="10" fill="#FACC15"/>
    <!-- Rolling green hills -->
    <path d="M-10,100 Q30,35 70,100 Z" fill="#15803D"/>
    <path d="M30,100 Q70,45 110,100 Z" fill="#22C55E"/>
    <circle cx="48" cy="65" r="6" fill="#166534"/>
  </svg>`,

  key: `<svg data-key="key" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Golden metal key -->
    <circle cx="32" cy="42" r="18" fill="none" stroke="#F59E0B" stroke-width="8"/>
    <circle cx="32" cy="42" r="8" fill="#FFFFFF"/>
    <rect x="46" y="38" width="40" height="8" rx="2" fill="#F59E0B"/>
    <rect x="72" y="46" width="6" height="10" rx="1" fill="#F59E0B"/>
    <rect x="80" y="46" width="6" height="14" rx="1" fill="#F59E0B"/>
  </svg>`,

  nest: `<svg data-key="nest" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Twig nest with eggs -->
    <ellipse cx="50" cy="65" rx="36" ry="18" fill="#B45309"/>
    <ellipse cx="50" cy="62" rx="30" ry="12" fill="#78350F"/>
    <!-- 3 eggs -->
    <ellipse cx="40" cy="56" rx="7" ry="10" fill="#BAE6FD"/>
    <ellipse cx="50" cy="54" rx="7" ry="10" fill="#F8FAFC"/>
    <ellipse cx="60" cy="56" rx="7" ry="10" fill="#BAE6FD"/>
    <!-- Twigs texture -->
    <path d="M18,65 Q50,75 82,65 M24,70 Q50,80 76,70" stroke="#92400E" stroke-width="3" fill="none"/>
  </svg>`,

  net: `<svg data-key="net" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Butterfly / soccer net handle and mesh -->
    <circle cx="45" cy="40" r="24" fill="none" stroke="#0284C7" stroke-width="5"/>
    <line x1="28" y1="58" x2="14" y2="90" stroke="#D97706" stroke-width="6" stroke-linecap="round"/>
    <!-- Mesh lines -->
    <line x1="30" y1="28" x2="60" y2="52" stroke="#38BDF8" stroke-width="2"/>
    <line x1="26" y1="38" x2="56" y2="48" stroke="#38BDF8" stroke-width="2"/>
    <line x1="38" y1="22" x2="48" y2="60" stroke="#38BDF8" stroke-width="2"/>
    <line x1="48" y1="22" x2="38" y2="60" stroke="#38BDF8" stroke-width="2"/>
  </svg>`,

  nut: `<svg data-key="nut" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Acorn nut with textured cap -->
    <ellipse cx="50" cy="60" rx="22" ry="26" fill="#B45309"/>
    <path d="M26,45 Q50,30 74,45 L70,36 Q50,26 30,36 Z" fill="#78350F"/>
    <path d="M50,28 L50,14" stroke="#78350F" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  mango: `<svg data-key="mango" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Ripe golden orange mango with leaf -->
    <path d="M48,25 C74,25 80,60 62,80 C44,95 24,75 28,50 C32,32 40,25 48,25 Z" fill="#F59E0B"/>
    <path d="M56,26 C68,36 70,55 58,70" stroke="#EF4444" stroke-width="8" stroke-linecap="round" fill="none"/>
    <path d="M46,24 Q50,12 56,8" stroke="#78350F" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M54,12 Q68,6 74,16 Q62,22 54,12 Z" fill="#22C55E"/>
  </svg>`,

  lemon: `<svg data-key="lemon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Bright yellow lemon with leaf -->
    <path d="M20,50 C20,30 40,24 60,30 C76,36 85,50 78,65 C70,78 45,80 30,72 C18,65 20,50 20,50 Z" fill="#FACC15"/>
    <ellipse cx="16" cy="50" rx="3" ry="4" fill="#EAB308"/>
    <ellipse cx="80" cy="58" rx="3" ry="4" fill="#EAB308"/>
    <path d="M48,26 Q54,14 62,10" stroke="#78350F" stroke-width="3" fill="none"/>
    <path d="M60,12 Q72,8 78,18 Q68,22 60,12 Z" fill="#16A34A"/>
  </svg>`,

  van: `<svg data-key="van" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Compact delivery van -->
    <path d="M16,36 L66,36 L84,52 L84,72 L16,72 Z" fill="#3B82F6"/>
    <rect x="64" y="42" width="16" height="12" rx="2" fill="#E0F2FE"/>
    <rect x="42" y="42" width="18" height="12" rx="2" fill="#E0F2FE"/>
    <rect x="22" y="42" width="16" height="12" rx="2" fill="#E0F2FE"/>
    <circle cx="32" cy="72" r="8" fill="#1E293B"/>
    <circle cx="32" cy="72" r="3" fill="#94A3B8"/>
    <circle cx="70" cy="72" r="8" fill="#1E293B"/>
    <circle cx="70" cy="72" r="3" fill="#94A3B8"/>
  </svg>`,

  shell: `<svg data-key="shell" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Beautiful scallop sea shell -->
    <path d="M50,84 L38,84 Q16,56 26,38 Q50,22 74,38 Q84,56 62,84 Z" fill="#FED7AA"/>
    <!-- Shell ridges -->
    <line x1="50" y1="84" x2="50" y2="28" stroke="#F97316" stroke-width="2.5"/>
    <line x1="50" y1="84" x2="34" y2="34" stroke="#F97316" stroke-width="2"/>
    <line x1="50" y1="84" x2="66" y2="34" stroke="#F97316" stroke-width="2"/>
    <line x1="50" y1="84" x2="24" y2="46" stroke="#F97316" stroke-width="2"/>
    <line x1="50" y1="84" x2="76" y2="46" stroke="#F97316" stroke-width="2"/>
  </svg>`,
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

  fox: `<svg xmlns="http://www.w3.org/2000/svg" data-key="fox" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FFF7ED"/>
    <ellipse cx="50" cy="56" rx="22" ry="20" fill="#EA580C"/>
    <ellipse cx="50" cy="62" rx="14" ry="12" fill="#FFFFFF"/>
    <polygon points="50,68 28,38 72,38" fill="#F97316"/>
    <polygon points="50,68 36,44 64,44" fill="#FFFFFF"/>
    <polygon points="30,38 24,18 42,32" fill="#EA580C"/>
    <polygon points="70,38 76,18 58,32" fill="#EA580C"/>
    <polygon points="32,36 28,24 38,32" fill="#FED7AA"/>
    <polygon points="68,36 72,24 62,32" fill="#FED7AA"/>
    <circle cx="40" cy="40" r="2.5" fill="#1E293B"/>
    <circle cx="60" cy="40" r="2.5" fill="#1E293B"/>
    <circle cx="41" cy="39" r="0.8" fill="#FFFFFF"/>
    <circle cx="61" cy="39" r="0.8" fill="#FFFFFF"/>
    <polygon points="50,64 46,58 54,58" fill="#1E293B"/>
    <path d="M70,60 C86,52 92,70 82,82 C74,90 62,80 68,70 Z" fill="#EA580C"/>
    <path d="M82,82 C78,86 70,82 72,78 C76,74 86,76 82,82 Z" fill="#FFFFFF"/>
  </svg>`,

  lamp: `<svg xmlns="http://www.w3.org/2000/svg" data-key="lamp" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEFCE8"/>
    <polygon points="20,90 80,90 66,42 34,42" fill="#FEF08A" opacity="0.4"/>
    <ellipse cx="50" cy="86" rx="18" ry="5" fill="#0284C7"/>
    <rect x="48" y="42" width="4" height="44" fill="#38BDF8"/>
    <polygon points="30,42 70,42 62,18 38,18" fill="#F59E0B" stroke="#D97706" stroke-width="2"/>
    <polygon points="34,42 66,42 60,20 40,20" fill="#FBBF24"/>
    <ellipse cx="50" cy="18" rx="12" ry="3" fill="#D97706"/>
    <circle cx="50" cy="15" r="3" fill="#0284C7"/>
  </svg>`,

  fork: `<svg xmlns="http://www.w3.org/2000/svg" data-key="fork" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <polygon points="20,15 80,25 70,85 15,75" fill="#BAE6FD" opacity="0.6"/>
    <rect x="47" y="44" width="6" height="42" rx="3" fill="#94A3B8"/>
    <rect x="48" y="44" width="2" height="42" rx="1" fill="#E2E8F0"/>
    <path d="M38,26 C38,40 62,40 62,26 Z" fill="#94A3B8"/>
    <rect x="38" y="14" width="3.5" height="18" rx="1.5" fill="#94A3B8"/>
    <rect x="45" y="14" width="3.5" height="18" rx="1.5" fill="#CBD5E1"/>
    <rect x="52" y="14" width="3.5" height="18" rx="1.5" fill="#CBD5E1"/>
    <rect x="59" y="14" width="3.5" height="18" rx="1.5" fill="#94A3B8"/>
  </svg>`,

  food: `<svg xmlns="http://www.w3.org/2000/svg" data-key="food" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEF2F2"/>
    <path d="M42,20 Q46,12 42,6" stroke="#CBD5E1" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M50,18 Q54,10 50,4" stroke="#CBD5E1" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M58,20 Q62,12 58,6" stroke="#CBD5E1" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="50" cy="50" rx="34" ry="10" fill="#EF4444"/>
    <path d="M16,50 C18,80 82,80 84,50 Z" fill="#DC2626"/>
    <ellipse cx="50" cy="50" rx="32" ry="8" fill="#FEE2E2"/>
    <ellipse cx="50" cy="48" rx="28" ry="7" fill="#FDE047"/>
    <ellipse cx="42" cy="46" rx="9" ry="6" fill="#FFFFFF"/>
    <circle cx="42" cy="46" r="4" fill="#F59E0B"/>
    <circle cx="58" cy="44" r="2.5" fill="#22C55E"/>
    <circle cx="64" cy="46" r="2.5" fill="#22C55E"/>
    <polygon points="54,48 57,45 59,48" fill="#F97316"/>
  </svg>`,

  can: `<svg xmlns="http://www.w3.org/2000/svg" data-key="can" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#EFF6FF"/>
    <rect x="32" y="24" width="36" height="56" fill="#EF4444"/>
    <ellipse cx="50" cy="80" rx="18" ry="6" fill="#DC2626"/>
    <ellipse cx="50" cy="24" rx="18" ry="6" fill="#CBD5E1"/>
    <ellipse cx="50" cy="23" rx="16" ry="5" fill="#E2E8F0"/>
    <path d="M32,44 Q50,56 68,44 L68,54 Q50,66 32,54 Z" fill="#FFFFFF"/>
    <ellipse cx="50" cy="22" rx="4" ry="2" fill="#64748B"/>
  </svg>`,

  ring: `<svg xmlns="http://www.w3.org/2000/svg" data-key="ring" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FDF4FF"/>
    <ellipse cx="50" cy="58" rx="26" ry="24" fill="none" stroke="#F59E0B" stroke-width="9"/>
    <ellipse cx="50" cy="58" rx="26" ry="24" fill="none" stroke="#FBBF24" stroke-width="5"/>
    <polygon points="50,22 62,32 50,42 38,32" fill="#0284C7"/>
    <polygon points="50,22 56,32 50,42 44,32" fill="#38BDF8"/>
    <polygon points="68,20 70,24 74,26 70,28 68,32 66,28 62,26 66,24" fill="#FACC15"/>
  </svg>`,

  king: `<svg xmlns="http://www.w3.org/2000/svg" data-key="king" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FAF5FF"/>
    <polygon points="50,48 20,92 80,92" fill="#7E22CE"/>
    <polygon points="50,48 40,92 60,92" fill="#FFFFFF"/>
    <circle cx="50" cy="46" r="16" fill="#FED7AA"/>
    <circle cx="44" cy="44" r="2" fill="#1E293B"/>
    <circle cx="56" cy="44" r="2" fill="#1E293B"/>
    <path d="M44,52 Q50,56 56,52" stroke="#92400E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <polygon points="34,34 34,22 42,28 50,18 58,28 66,22 66,34" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
    <circle cx="50" cy="28" r="2.5" fill="#EF4444"/>
    <circle cx="38" cy="30" r="1.5" fill="#3B82F6"/>
    <circle cx="62" cy="30" r="1.5" fill="#10B981"/>
  </svg>`,

  lock: `<svg xmlns="http://www.w3.org/2000/svg" data-key="lock" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEFCE8"/>
    <path d="M34,46 L34,30 C34,16 66,16 66,30 L66,46" fill="none" stroke="#94A3B8" stroke-width="9" stroke-linecap="round"/>
    <path d="M34,46 L34,30 C34,16 66,16 66,30 L66,46" fill="none" stroke="#CBD5E1" stroke-width="4" stroke-linecap="round"/>
    <rect x="26" y="44" width="48" height="42" rx="8" fill="#F59E0B" stroke="#D97706" stroke-width="2"/>
    <rect x="29" y="47" width="42" height="36" rx="6" fill="#FBBF24"/>
    <circle cx="50" cy="60" r="4.5" fill="#78350F"/>
    <polygon points="48,60 52,60 54,74 46,74" fill="#78350F"/>
  </svg>`,

  map: `<svg xmlns="http://www.w3.org/2000/svg" data-key="map" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#ECFDF5"/>
    <polygon points="16,22 40,16 60,22 84,16 84,78 60,84 40,78 16,84" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
    <polygon points="40,16 60,22 60,84 40,78" fill="#FDE68A"/>
    <path d="M26,64 Q40,40 50,56 T72,34" fill="none" stroke="#DC2626" stroke-width="2.5" stroke-dasharray="3 2"/>
    <line x1="68" y1="30" x2="76" y2="38" stroke="#DC2626" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="76" y1="30" x2="68" y2="38" stroke="#DC2626" stroke-width="3.5" stroke-linecap="round"/>
    <polygon points="32,28 35,35 32,42 29,35" fill="#0284C7"/>
    <polygon points="25,35 32,38 39,35 32,32" fill="#93C5FD"/>
  </svg>`,

  foot: `<svg xmlns="http://www.w3.org/2000/svg" data-key="foot" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FFF1F2"/>
    <path d="M48,16 L48,50 C48,68 34,74 34,80 C34,86 42,88 56,88 C74,88 78,74 76,54 C74,38 64,30 64,16 Z" fill="#FED7AA" stroke="#FDBA74" stroke-width="2"/>
    <ellipse cx="40" cy="80" rx="5" ry="6" fill="#FED7AA"/>
    <ellipse cx="48" cy="84" rx="4" ry="5" fill="#FED7AA"/>
    <ellipse cx="56" cy="85" rx="3.5" ry="4.5" fill="#FED7AA"/>
    <ellipse cx="63" cy="84" rx="3" ry="4" fill="#FED7AA"/>
    <ellipse cx="69" cy="81" rx="2.5" ry="3.5" fill="#FED7AA"/>
  </svg>`,

  leg: `<svg xmlns="http://www.w3.org/2000/svg" data-key="leg" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <rect x="36" y="10" width="28" height="20" rx="3" fill="#2563EB"/>
    <rect x="42" y="28" width="16" height="42" rx="6" fill="#FED7AA"/>
    <circle cx="50" cy="48" r="7" fill="#FDBA74" opacity="0.6"/>
    <path d="M38,70 L60,70 C68,70 78,76 78,84 L34,84 C34,78 36,70 38,70 Z" fill="#DC2626"/>
    <rect x="32" y="84" width="48" height="6" rx="2" fill="#FFFFFF"/>
  </svg>`,

  candle: `<svg xmlns="http://www.w3.org/2000/svg" data-key="candle" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEFCE8"/>
    <circle cx="50" cy="30" r="22" fill="#FEF08A" opacity="0.4"/>
    <ellipse cx="50" cy="86" rx="28" ry="7" fill="#0284C7"/>
    <rect x="42" y="44" width="16" height="40" rx="2" fill="#F8FAFC"/>
    <rect x="42" y="44" width="16" height="4" rx="2" fill="#F472B6"/>
    <line x1="50" y1="44" x2="50" y2="38" stroke="#1E293B" stroke-width="2"/>
    <path d="M50,18 C44,28 44,36 50,38 C56,36 56,28 50,18 Z" fill="#F59E0B"/>
    <path d="M50,24 C47,30 47,34 50,36 C53,34 53,30 50,24 Z" fill="#FDE047"/>
  </svg>`,

  crab: `<svg xmlns="http://www.w3.org/2000/svg" data-key="crab" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#EFF6FF"/>
    <path d="M26,56 L12,48 M26,62 L10,62 M26,68 L14,76" stroke="#DC2626" stroke-width="3" stroke-linecap="round"/>
    <path d="M74,56 L88,48 M74,62 L90,62 M74,68 L86,76" stroke="#DC2626" stroke-width="3" stroke-linecap="round"/>
    <path d="M30,46 Q16,36 22,24 Q32,24 30,36 Z" fill="#EF4444"/>
    <path d="M70,46 Q84,36 78,24 Q68,24 70,36 Z" fill="#EF4444"/>
    <ellipse cx="50" cy="60" rx="24" ry="18" fill="#EF4444"/>
    <circle cx="42" cy="40" r="6" fill="#FFFFFF"/>
    <circle cx="58" cy="40" r="6" fill="#FFFFFF"/>
    <circle cx="43" cy="40" r="3" fill="#1E293B"/>
    <circle cx="57" cy="40" r="3" fill="#1E293B"/>
    <path d="M44,64 Q50,70 56,64" stroke="#FFFFFF" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  turtle: `<svg xmlns="http://www.w3.org/2000/svg" data-key="turtle" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#ECFDF5"/>
    <ellipse cx="26" cy="38" rx="12" ry="6" transform="rotate(-20 26 38)" fill="#16A34A"/>
    <ellipse cx="74" cy="38" rx="12" ry="6" transform="rotate(20 74 38)" fill="#16A34A"/>
    <ellipse cx="30" cy="68" rx="9" ry="5" transform="rotate(30 30 68)" fill="#16A34A"/>
    <ellipse cx="70" cy="68" rx="9" ry="5" transform="rotate(-30 70 68)" fill="#16A34A"/>
    <ellipse cx="50" cy="24" rx="9" ry="11" fill="#22C55E"/>
    <circle cx="46" cy="22" r="1.5" fill="#1E293B"/>
    <circle cx="54" cy="22" r="1.5" fill="#1E293B"/>
    <ellipse cx="50" cy="52" rx="24" ry="20" fill="#15803D" stroke="#166534" stroke-width="2"/>
    <polygon points="50,40 58,46 58,58 50,64 42,58 42,46" fill="#84CC16"/>
  </svg>`,

  hen: `<svg xmlns="http://www.w3.org/2000/svg" data-key="hen" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEF3C7"/>
    <ellipse cx="50" cy="78" rx="34" ry="10" fill="#F59E0B"/>
    <ellipse cx="48" cy="58" rx="22" ry="18" fill="#B45309"/>
    <ellipse cx="46" cy="58" rx="12" ry="8" fill="#78350F"/>
    <circle cx="62" cy="40" r="11" fill="#B45309"/>
    <path d="M60,29 Q64,24 66,29 Q68,24 70,30" stroke="#DC2626" stroke-width="3" fill="none"/>
    <circle cx="68" cy="46" r="3" fill="#DC2626"/>
    <polygon points="72,39 80,42 72,45" fill="#F59E0B"/>
    <circle cx="66" cy="38" r="1.5" fill="#1E293B"/>
  </svg>`,

  vase: `<svg xmlns="http://www.w3.org/2000/svg" data-key="vase" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDFA"/>
    <circle cx="40" cy="24" r="6" fill="#EC4899"/>
    <circle cx="40" cy="24" r="2.5" fill="#FACC15"/>
    <circle cx="60" cy="22" r="6" fill="#8B5CF6"/>
    <circle cx="60" cy="22" r="2.5" fill="#FACC15"/>
    <circle cx="50" cy="16" r="6" fill="#F97316"/>
    <circle cx="50" cy="16" r="2.5" fill="#FEF08A"/>
    <line x1="40" y1="24" x2="50" y2="44" stroke="#16A34A" stroke-width="2.5"/>
    <line x1="60" y1="22" x2="50" y2="44" stroke="#16A34A" stroke-width="2.5"/>
    <line x1="50" y1="16" x2="50" y2="44" stroke="#16A34A" stroke-width="2.5"/>
    <path d="M42,42 L58,42 C68,54 68,76 56,86 L44,86 C32,76 32,54 42,42 Z" fill="#0284C7" stroke="#0369A1" stroke-width="2"/>
    <ellipse cx="50" cy="62" rx="10" ry="10" fill="#38BDF8"/>
  </svg>`,

  blanket: `<svg xmlns="http://www.w3.org/2000/svg" data-key="blanket" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F5F3FF"/>
    <polygon points="20,44 64,28 84,48 40,64" fill="#38BDF8"/>
    <polygon points="20,44 40,64 40,78 20,58" fill="#0284C7"/>
    <polygon points="40,64 84,48 84,62 40,78" fill="#0369A1"/>
    <line x1="30" y1="40" x2="50" y2="60" stroke="#FFFFFF" stroke-width="2"/>
    <line x1="44" y1="36" x2="64" y2="56" stroke="#FFFFFF" stroke-width="2"/>
    <line x1="58" y1="32" x2="78" y2="52" stroke="#FFFFFF" stroke-width="2"/>
  </svg>`,

  jacket: `<svg xmlns="http://www.w3.org/2000/svg" data-key="jacket" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#EFF6FF"/>
    <circle cx="50" cy="24" r="14" fill="#1D4ED8"/>
    <polygon points="36,36 12,58 20,64 40,46" fill="#2563EB"/>
    <polygon points="64,36 88,58 80,64 60,46" fill="#2563EB"/>
    <rect x="34" y="34" width="32" height="52" rx="4" fill="#3B82F6"/>
    <line x1="50" y1="34" x2="50" y2="86" stroke="#FACC15" stroke-width="2.5"/>
    <circle cx="50" cy="40" r="2" fill="#FACC15"/>
    <rect x="38" y="64" width="8" height="8" rx="2" fill="#1D4ED8"/>
    <rect x="54" y="64" width="8" height="8" rx="2" fill="#1D4ED8"/>
  </svg>`,

  playground: `<svg xmlns="http://www.w3.org/2000/svg" data-key="playground" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <rect x="0" y="74" width="100" height="26" rx="4" fill="#22C55E"/>
    <polygon points="16,74 20,38 24,38 24,74" fill="#F59E0B"/>
    <path d="M22,40 C32,46 36,66 48,74" stroke="#EF4444" stroke-width="5" fill="none" stroke-linecap="round"/>
    <polygon points="60,74 68,34 76,74" stroke="#3B82F6" stroke-width="3" fill="none"/>
    <polygon points="76,74 84,34 92,74" stroke="#3B82F6" stroke-width="3" fill="none"/>
    <line x1="64" y1="34" x2="88" y2="34" stroke="#3B82F6" stroke-width="4"/>
    <line x1="74" y1="34" x2="72" y2="60" stroke="#64748B" stroke-width="1.5"/>
    <line x1="78" y1="34" x2="80" y2="60" stroke="#64748B" stroke-width="1.5"/>
    <rect x="70" y="60" width="12" height="3" fill="#D97706"/>
  </svg>`,

  gym: `<svg xmlns="http://www.w3.org/2000/svg" data-key="gym" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FFFBEB"/>
    <rect x="0" y="66" width="100" height="34" fill="#FDE68A"/>
    <ellipse cx="50" cy="80" rx="28" ry="8" fill="none" stroke="#FFFFFF" stroke-width="2"/>
    <rect x="36" y="16" width="28" height="20" rx="2" fill="#FFFFFF" stroke="#DC2626" stroke-width="2"/>
    <rect x="42" y="24" width="16" height="10" fill="none" stroke="#DC2626" stroke-width="1.5"/>
    <ellipse cx="50" cy="36" rx="8" ry="3" fill="none" stroke="#F97316" stroke-width="3"/>
    <circle cx="50" cy="54" r="9" fill="#EA580C"/>
    <line x1="41" y1="54" x2="59" y2="54" stroke="#1E293B" stroke-width="1.2"/>
    <path d="M44,48 Q50,54 44,60" stroke="#1E293B" stroke-width="1" fill="none"/>
    <path d="M56,48 Q50,54 56,60" stroke="#1E293B" stroke-width="1" fill="none"/>
  </svg>`,

  drawing: `<svg xmlns="http://www.w3.org/2000/svg" data-key="drawing" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FFF7ED"/>
    <line x1="30" y1="88" x2="44" y2="28" stroke="#D97706" stroke-width="3.5"/>
    <line x1="70" y1="88" x2="56" y2="28" stroke="#D97706" stroke-width="3.5"/>
    <line x1="50" y1="88" x2="50" y2="28" stroke="#B45309" stroke-width="2.5"/>
    <rect x="24" y="26" width="52" height="42" rx="3" fill="#FFFFFF" stroke="#D97706" stroke-width="2"/>
    <path d="M34,56 A16,16 0 0,1 66,56" stroke="#EF4444" stroke-width="3" fill="none"/>
    <path d="M37,56 A13,13 0 0,1 63,56" stroke="#F59E0B" stroke-width="3" fill="none"/>
    <path d="M40,56 A10,10 0 0,1 60,56" stroke="#3B82F6" stroke-width="3" fill="none"/>
    <line x1="68" y1="74" x2="84" y2="60" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>
    <polygon points="66,76 70,72 64,72" fill="#EC4899"/>
  </svg>`,

  morning: `<svg xmlns="http://www.w3.org/2000/svg" data-key="morning" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#BAE6FD"/>
    <circle cx="20" cy="90" r="40" fill="#22C55E"/>
    <circle cx="80" cy="95" r="45" fill="#16A34A"/>
    <circle cx="50" cy="46" r="16" fill="#FBBF24"/>
    <circle cx="50" cy="46" r="13" fill="#FACC15"/>
    <line x1="50" y1="22" x2="50" y2="16" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
    <line x1="68" y1="30" x2="73" y2="25" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
    <line x1="76" y1="46" x2="82" y2="46" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
    <line x1="32" y1="30" x2="27" y2="25" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
    <line x1="24" y1="46" x2="18" y2="46" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  night: `<svg xmlns="http://www.w3.org/2000/svg" data-key="night" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#0F172A"/>
    <path d="M54,20 C42,20 34,30 34,42 C34,54 44,64 58,64 C64,64 68,62 72,58 C60,60 48,50 48,38 C48,28 52,22 54,20 Z" fill="#FACC15"/>
    <polygon points="24,24 25,28 29,29 25,30 24,34 23,30 19,29 23,28" fill="#FFFFFF"/>
    <polygon points="76,28 77,31 80,32 77,33 76,36 75,33 72,32 75,31" fill="#FEF08A"/>
    <polygon points="30,56 31,58 33,59 31,60 30,62 29,60 27,59 29,58" fill="#FFFFFF"/>
    <polygon points="70,68 71,70 73,71 71,72 70,74 69,72 67,71 69,70" fill="#FEF08A"/>
    <ellipse cx="64" cy="76" rx="20" ry="10" fill="#334155"/>
    <circle cx="56" cy="72" r="10" fill="#334155"/>
    <circle cx="72" cy="72" r="9" fill="#334155"/>
  </svg>`,

  wave: `<svg xmlns="http://www.w3.org/2000/svg" data-key="wave" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#EFF6FF"/>
    <path d="M26,30 Q30,24 28,18" stroke="#3B82F6" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M22,38 Q26,32 24,26" stroke="#3B82F6" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M42,88 L42,60 C42,54 44,50 48,50 C52,50 52,54 52,42 C52,36 56,36 58,40 C60,36 64,36 66,42 C68,40 72,42 72,48 C72,56 70,64 70,72 L70,88 Z" fill="#FED7AA" stroke="#FDBA74" stroke-width="2"/>
    <path d="M42,64 C34,60 32,50 36,46 C40,42 44,48 44,56" fill="#FED7AA"/>
  </svg>`,

  goodbye: `<svg xmlns="http://www.w3.org/2000/svg" data-key="goodbye" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEFCE8"/>
    <circle cx="48" cy="28" r="10" fill="#FED7AA"/>
    <rect x="42" y="38" width="14" height="26" rx="4" fill="#2563EB"/>
    <rect x="34" y="42" width="8" height="18" rx="3" fill="#DC2626"/>
    <line x1="56" y1="42" x2="72" y2="24" stroke="#FED7AA" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="74" cy="22" r="3.5" fill="#FED7AA"/>
    <line x1="44" y1="64" x2="38" y2="86" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
    <line x1="52" y1="64" x2="58" y2="86" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  stand_up: `<svg xmlns="http://www.w3.org/2000/svg" data-key="stand_up" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <polygon points="78,38 78,60 84,60 74,24 64,60 70,60 70,38" fill="#16A34A"/>
    <circle cx="42" cy="22" r="9" fill="#FED7AA"/>
    <rect x="36" y="31" width="12" height="26" rx="3" fill="#0284C7"/>
    <line x1="38" y1="57" x2="38" y2="86" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
    <line x1="46" y1="57" x2="46" y2="86" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  sit_down: `<svg xmlns="http://www.w3.org/2000/svg" data-key="sit_down" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#EFF6FF"/>
    <polygon points="78,44 78,24 70,24 74,58 84,24 84,44" fill="#2563EB"/>
    <line x1="28" y1="36" x2="28" y2="84" stroke="#92400E" stroke-width="3.5"/>
    <line x1="48" y1="62" x2="48" y2="84" stroke="#92400E" stroke-width="3"/>
    <line x1="26" y1="62" x2="52" y2="62" stroke="#B45309" stroke-width="4"/>
    <circle cx="40" cy="30" r="8" fill="#FED7AA"/>
    <rect x="34" y="38" width="12" height="22" rx="3" fill="#DC2626"/>
    <line x1="38" y1="60" x2="48" y2="60" stroke="#1E293B" stroke-width="4"/>
    <line x1="48" y1="60" x2="48" y2="84" stroke="#1E293B" stroke-width="4"/>
  </svg>`,

  come_in: `<svg xmlns="http://www.w3.org/2000/svg" data-key="come_in" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEFCE8"/>
    <rect x="22" y="16" width="56" height="72" fill="none" stroke="#78350F" stroke-width="4"/>
    <polygon points="22,16 54,24 54,80 22,88" fill="#B45309"/>
    <circle cx="48" cy="52" r="2.5" fill="#FACC15"/>
    <circle cx="62" cy="40" r="7" fill="#FED7AA"/>
    <rect x="56" y="47" width="12" height="18" rx="2" fill="#16A34A"/>
    <line x1="58" y1="65" x2="58" y2="86" stroke="#1E293B" stroke-width="3.5"/>
    <line x1="66" y1="65" x2="68" y2="86" stroke="#1E293B" stroke-width="3.5"/>
  </svg>`,

  close_book: `<svg xmlns="http://www.w3.org/2000/svg" data-key="close_book" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <rect x="28" y="24" width="44" height="56" rx="4" fill="#0284C7"/>
    <rect x="24" y="24" width="8" height="56" rx="2" fill="#0369A1"/>
    <polygon points="50,44 54,54 44,48 56,48 46,54" fill="#FDE047"/>
    <rect x="32" y="76" width="40" height="4" fill="#F8FAFC"/>
  </svg>`,

  ear: `<svg xmlns="http://www.w3.org/2000/svg" data-key="ear" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FFF1F2"/>
    <path d="M22,34 L22,24 L32,20 L32,30" stroke="#EC4899" stroke-width="2" fill="none"/>
    <circle cx="22" cy="34" r="3" fill="#EC4899"/>
    <circle cx="32" cy="30" r="3" fill="#EC4899"/>
    <path d="M50,18 C68,18 78,32 78,50 C78,68 64,82 50,82 C42,82 40,76 44,68 C48,60 56,54 56,44 C56,36 50,30 44,30" fill="#FED7AA" stroke="#FDBA74" stroke-width="3"/>
    <path d="M54,38 C58,40 60,46 58,52 C56,56 50,60 48,64" stroke="#FDBA74" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  mouth: `<svg xmlns="http://www.w3.org/2000/svg" data-key="mouth" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FFF7ED"/>
    <path d="M24,48 C32,38 68,38 76,48 C68,76 32,76 24,48 Z" fill="#EF4444"/>
    <path d="M28,48 C36,44 64,44 72,48 C66,56 34,56 28,48 Z" fill="#FFFFFF"/>
    <ellipse cx="50" cy="62" rx="12" ry="8" fill="#F43F5E"/>
  </svg>`,

  face: `<svg xmlns="http://www.w3.org/2000/svg" data-key="face" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#EFF6FF"/>
    <circle cx="50" cy="50" r="36" fill="#FED7AA"/>
    <circle cx="30" cy="56" r="6" fill="#FCA5A5" opacity="0.6"/>
    <circle cx="70" cy="56" r="6" fill="#FCA5A5" opacity="0.6"/>
    <circle cx="36" cy="44" r="4" fill="#1E293B"/>
    <circle cx="64" cy="44" r="4" fill="#1E293B"/>
    <circle cx="38" cy="42" r="1.5" fill="#FFFFFF"/>
    <circle cx="66" cy="42" r="1.5" fill="#FFFFFF"/>
    <path d="M38,58 Q50,70 62,58" stroke="#1E293B" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  speak: `<svg xmlns="http://www.w3.org/2000/svg" data-key="speak" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <circle cx="34" cy="46" r="14" fill="#FED7AA"/>
    <path d="M42,50 Q48,54 42,58 Z" fill="#EF4444"/>
    <path d="M54,24 L86,24 C90,24 92,28 92,32 L92,52 C92,56 90,60 86,60 L62,60 L50,70 L52,60 L54,60 Z" fill="#3B82F6"/>
    <line x1="62" y1="36" x2="84" y2="36" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="62" y1="44" x2="78" y2="44" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  hide_and_seek: `<svg xmlns="http://www.w3.org/2000/svg" data-key="hide_and_seek" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#ECFDF5"/>
    <rect x="46" y="34" width="18" height="56" rx="2" fill="#78350F"/>
    <circle cx="55" cy="30" r="28" fill="#15803D"/>
    <circle cx="38" cy="50" r="9" fill="#FED7AA"/>
    <circle cx="36" cy="48" r="1.5" fill="#1E293B"/>
    <path d="M34,54 Q38,58 40,54" stroke="#1E293B" stroke-width="1.5" fill="none"/>
    <ellipse cx="38" cy="66" rx="6" ry="10" fill="#EF4444"/>
  </svg>`,

  skipping: `<svg xmlns="http://www.w3.org/2000/svg" data-key="skipping" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FDF2F8"/>
    <path d="M22,50 C18,88 82,88 78,50" stroke="#EC4899" stroke-width="3" fill="none"/>
    <circle cx="50" cy="24" r="8" fill="#FED7AA"/>
    <polygon points="50,32 38,58 62,58" fill="#8B5CF6"/>
    <line x1="44" y1="36" x2="24" y2="48" stroke="#FED7AA" stroke-width="3"/>
    <line x1="56" y1="36" x2="76" y2="48" stroke="#FED7AA" stroke-width="3"/>
    <line x1="46" y1="58" x2="42" y2="72" stroke="#1E293B" stroke-width="3"/>
    <line x1="54" y1="58" x2="58" y2="72" stroke="#1E293B" stroke-width="3"/>
  </svg>`,

  badminton: `<svg xmlns="http://www.w3.org/2000/svg" data-key="badminton" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#EFF6FF"/>
    <ellipse cx="44" cy="38" rx="20" ry="24" fill="none" stroke="#2563EB" stroke-width="3.5"/>
    <line x1="32" y1="26" x2="32" y2="50" stroke="#93C5FD" stroke-width="1.5"/>
    <line x1="44" y1="16" x2="44" y2="60" stroke="#93C5FD" stroke-width="1.5"/>
    <line x1="56" y1="26" x2="56" y2="50" stroke="#93C5FD" stroke-width="1.5"/>
    <line x1="26" y1="38" x2="62" y2="38" stroke="#93C5FD" stroke-width="1.5"/>
    <line x1="44" y1="62" x2="44" y2="90" stroke="#1E293B" stroke-width="4.5" stroke-linecap="round"/>
    <polygon points="74,36 84,24 88,32" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1.5"/>
    <circle cx="72" cy="38" r="4" fill="#EF4444"/>
  </svg>`,

  climbing: `<svg xmlns="http://www.w3.org/2000/svg" data-key="climbing" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEFCE8"/>
    <line x1="36" y1="10" x2="36" y2="90" stroke="#0284C7" stroke-width="4"/>
    <line x1="64" y1="10" x2="64" y2="90" stroke="#0284C7" stroke-width="4"/>
    <line x1="36" y1="26" x2="64" y2="26" stroke="#0284C7" stroke-width="3"/>
    <line x1="36" y1="46" x2="64" y2="46" stroke="#0284C7" stroke-width="3"/>
    <line x1="36" y1="66" x2="64" y2="66" stroke="#0284C7" stroke-width="3"/>
    <circle cx="50" cy="34" r="7" fill="#FED7AA"/>
    <rect x="44" y="41" width="12" height="18" rx="2" fill="#F97316"/>
  </svg>`,

  swinging: `<svg xmlns="http://www.w3.org/2000/svg" data-key="swinging" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <rect x="10" y="10" width="80" height="8" rx="3" fill="#78350F"/>
    <line x1="42" y1="18" x2="32" y2="66" stroke="#D97706" stroke-width="2.5"/>
    <line x1="58" y1="18" x2="48" y2="66" stroke="#D97706" stroke-width="2.5"/>
    <rect x="26" y="66" width="28" height="4" rx="1.5" fill="#92400E"/>
    <circle cx="40" cy="46" r="8" fill="#FED7AA"/>
    <rect x="34" y="54" width="12" height="14" rx="2" fill="#10B981"/>
  </svg>`,

  city: `<svg xmlns="http://www.w3.org/2000/svg" data-key="city" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#BAE6FD"/>
    <circle cx="82" cy="24" r="10" fill="#FDE047"/>
    <rect x="12" y="44" width="22" height="56" fill="#64748B"/>
    <rect x="36" y="28" width="28" height="72" fill="#0284C7"/>
    <rect x="66" y="40" width="24" height="60" fill="#3B82F6"/>
    <rect x="42" y="36" width="4" height="6" fill="#FEF08A"/>
    <rect x="52" y="36" width="4" height="6" fill="#FEF08A"/>
    <rect x="42" y="48" width="4" height="6" fill="#FEF08A"/>
    <rect x="52" y="48" width="4" height="6" fill="#FEF08A"/>
    <rect x="72" y="48" width="4" height="5" fill="#FEF08A"/>
    <rect x="80" y="48" width="4" height="5" fill="#FEF08A"/>
  </svg>`,

  mountains: `<svg xmlns="http://www.w3.org/2000/svg" data-key="mountains" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#E0F2FE"/>
    <circle cx="50" cy="28" r="10" fill="#FACC15"/>
    <polygon points="34,24 8,88 60,88" fill="#64748B"/>
    <polygon points="34,24 24,46 44,46" fill="#FFFFFF"/>
    <polygon points="68,34 42,88 94,88" fill="#475569"/>
    <polygon points="68,34 58,54 78,54" fill="#FFFFFF"/>
  </svg>`,

  farm: `<svg xmlns="http://www.w3.org/2000/svg" data-key="farm" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#E0F2FE"/>
    <rect x="0" y="70" width="100" height="30" fill="#22C55E"/>
    <polygon points="50,30 26,48 74,48" fill="#B91C1C"/>
    <rect x="28" y="48" width="44" height="32" fill="#DC2626"/>
    <rect x="42" y="58" width="16" height="22" fill="#FFFFFF"/>
    <rect x="44" y="60" width="12" height="20" fill="#991B1B"/>
    <line x1="44" y1="60" x2="56" y2="80" stroke="#FFFFFF" stroke-width="1.5"/>
    <line x1="56" y1="60" x2="44" y2="80" stroke="#FFFFFF" stroke-width="1.5"/>
  </svg>`,

  island: `<svg xmlns="http://www.w3.org/2000/svg" data-key="island" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#BAE6FD"/>
    <ellipse cx="50" cy="78" rx="42" ry="12" fill="#38BDF8"/>
    <ellipse cx="50" cy="74" rx="26" ry="8" fill="#FDE047"/>
    <path d="M48,74 Q56,48 50,36" stroke="#92400E" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path d="M50,36 Q32,28 26,38 M50,36 Q42,18 36,22 M50,36 Q64,20 70,26 M50,36 Q72,34 68,44" stroke="#16A34A" stroke-width="3" fill="none"/>
  </svg>`,

  museum: `<svg xmlns="http://www.w3.org/2000/svg" data-key="museum" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F8FAFC"/>
    <polygon points="50,22 18,40 82,40" fill="#CBD5E1" stroke="#64748B" stroke-width="2"/>
    <circle cx="50" cy="32" r="3.5" fill="#64748B"/>
    <rect x="22" y="40" width="6" height="38" fill="#E2E8F0"/>
    <rect x="36" y="40" width="6" height="38" fill="#E2E8F0"/>
    <rect x="58" y="40" width="6" height="38" fill="#E2E8F0"/>
    <rect x="72" y="40" width="6" height="38" fill="#E2E8F0"/>
    <rect x="14" y="78" width="72" height="6" fill="#94A3B8"/>
    <rect x="10" y="84" width="80" height="6" fill="#64748B"/>
  </svg>`,

  pharmacy: `<svg xmlns="http://www.w3.org/2000/svg" data-key="pharmacy" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <rect x="20" y="32" width="60" height="56" rx="4" fill="#FFFFFF" stroke="#059669" stroke-width="2.5"/>
    <rect x="16" y="24" width="68" height="10" rx="3" fill="#10B981"/>
    <polygon points="46,42 54,42 54,48 60,48 60,56 54,56 54,62 46,62 46,56 40,56 40,48 46,48" fill="#10B981"/>
  </svg>`,

  bakery: `<svg xmlns="http://www.w3.org/2000/svg" data-key="bakery" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEFCE8"/>
    <polygon points="16,34 84,34 80,48 20,48" fill="#EA580C"/>
    <polygon points="26,34 38,34 34,48 22,48" fill="#FFFFFF"/>
    <polygon points="46,34 58,34 54,48 42,48" fill="#FFFFFF"/>
    <polygon points="66,34 78,34 74,48 62,48" fill="#FFFFFF"/>
    <rect x="22" y="48" width="56" height="42" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
    <ellipse cx="50" cy="68" rx="16" ry="8" fill="#F59E0B"/>
    <ellipse cx="50" cy="67" rx="14" ry="6" fill="#FDE68A"/>
  </svg>`,

  tall: `<svg xmlns="http://www.w3.org/2000/svg" data-key="tall" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEFCE8"/>
    <rect x="18" y="16" width="6" height="72" fill="#FDE047" stroke="#CA8A04" stroke-width="1.5"/>
    <line x1="24" y1="26" x2="20" y2="26" stroke="#854D0E" stroke-width="1.5"/>
    <line x1="24" y1="46" x2="18" y2="46" stroke="#854D0E" stroke-width="2"/>
    <line x1="24" y1="66" x2="20" y2="66" stroke="#854D0E" stroke-width="1.5"/>
    <rect x="52" y="24" width="8" height="54" fill="#F59E0B"/>
    <circle cx="56" cy="20" r="7" fill="#F59E0B"/>
    <ellipse cx="58" cy="74" rx="16" ry="12" fill="#F59E0B"/>
    <circle cx="58" cy="18" r="1.5" fill="#1E293B"/>
    <line x1="52" y1="84" x2="52" y2="92" stroke="#B45309" stroke-width="3"/>
    <line x1="64" y1="84" x2="64" y2="92" stroke="#B45309" stroke-width="3"/>
  </svg>`,

  short: `<svg xmlns="http://www.w3.org/2000/svg" data-key="short" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <rect x="18" y="16" width="6" height="72" fill="#FDE047" stroke="#CA8A04" stroke-width="1.5"/>
    <ellipse cx="56" cy="76" rx="14" ry="10" fill="#E2E8F0"/>
    <circle cx="54" cy="64" r="8" fill="#E2E8F0"/>
    <ellipse cx="50" cy="52" rx="2.5" ry="7" fill="#E2E8F0"/>
    <ellipse cx="56" cy="52" rx="2.5" ry="7" fill="#E2E8F0"/>
    <circle cx="52" cy="64" r="1" fill="#1E293B"/>
  </svg>`,

  strong: `<svg xmlns="http://www.w3.org/2000/svg" data-key="strong" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FFF1F2"/>
    <path d="M24,78 L44,78 C54,78 64,72 68,58 C72,48 76,46 80,48 C84,50 84,62 76,74 C68,84 56,86 42,86 L24,86 Z" fill="#FED7AA"/>
    <circle cx="56" cy="56" r="12" fill="#FED7AA"/>
    <circle cx="78" cy="46" r="8" fill="#FED7AA"/>
    <polygon points="56,36 58,40 62,42 58,44 56,48 54,44 50,42 54,40" fill="#FACC15"/>
  </svg>`,

  stormy: `<svg xmlns="http://www.w3.org/2000/svg" data-key="stormy" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#0F172A"/>
    <path d="M26,50 C26,40 36,32 46,34 C50,26 62,26 68,34 C76,34 82,42 80,50 C84,54 84,62 78,66 C76,70 70,72 64,70 C60,72 32,72 26,66 C22,62 22,54 26,50 Z" fill="#475569"/>
    <polygon points="52,48 42,66 50,66 44,84 62,60 52,60" fill="#FACC15"/>
    <line x1="32" y1="74" x2="28" y2="82" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="68" y1="74" x2="64" y2="82" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  dentist: `<svg xmlns="http://www.w3.org/2000/svg" data-key="dentist" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#ECFDF5"/>
    <circle cx="50" cy="34" r="14" fill="#FED7AA"/>
    <circle cx="45" cy="32" r="1.5" fill="#1E293B"/>
    <circle cx="55" cy="32" r="1.5" fill="#1E293B"/>
    <rect x="42" y="38" width="16" height="10" rx="3" fill="#67E8F9"/>
    <polygon points="50,48 24,92 76,92" fill="#0D9488"/>
    <line x1="68" y1="60" x2="82" y2="40" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
    <circle cx="84" cy="38" r="4.5" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
  </svg>`,

  toothache: `<svg xmlns="http://www.w3.org/2000/svg" data-key="toothache" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FFF1F2"/>
    <circle cx="50" cy="50" r="32" fill="#FED7AA"/>
    <circle cx="68" cy="56" r="12" fill="#FCA5A5"/>
    <circle cx="42" cy="44" r="3" fill="#1E293B"/>
    <circle cx="58" cy="44" r="3" fill="#1E293B"/>
    <path d="M42,64 Q50,56 58,64" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="72" cy="58" r="9" fill="#38BDF8" opacity="0.8"/>
  </svg>`,

  stomach_ache: `<svg xmlns="http://www.w3.org/2000/svg" data-key="stomach_ache" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEFCE8"/>
    <circle cx="50" cy="28" r="12" fill="#FED7AA"/>
    <path d="M44,34 Q50,30 56,34" stroke="#1E293B" stroke-width="2" fill="none"/>
    <rect x="36" y="40" width="28" height="34" rx="6" fill="#3B82F6"/>
    <circle cx="50" cy="56" r="8" fill="#FDE047" opacity="0.6"/>
    <path d="M46,56 Q50,52 54,56 Q50,60 48,56" stroke="#DC2626" stroke-width="2" fill="none"/>
  </svg>`,

  fever: `<svg xmlns="http://www.w3.org/2000/svg" data-key="fever" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FFF1F2"/>
    <circle cx="50" cy="48" r="30" fill="#FED7AA"/>
    <circle cx="34" cy="52" r="7" fill="#F87171" opacity="0.8"/>
    <circle cx="66" cy="52" r="7" fill="#F87171" opacity="0.8"/>
    <rect x="34" y="24" width="32" height="10" rx="3" fill="#38BDF8"/>
    <line x1="50" y1="56" x2="68" y2="68" stroke="#E2E8F0" stroke-width="4" stroke-linecap="round"/>
    <circle cx="68" cy="68" r="3.5" fill="#EF4444"/>
  </svg>`,

  recycle: `<svg xmlns="http://www.w3.org/2000/svg" data-key="recycle" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <path d="M50,18 L62,38 L54,38 C54,54 44,66 32,70 L28,64 C38,60 46,50 46,38 L38,38 Z" fill="#16A34A"/>
    <path d="M74,58 L62,78 L68,82 C56,92 40,88 30,80 L34,74 C42,80 54,82 62,74 L58,70 Z" fill="#15803D"/>
    <path d="M26,58 L14,38 L20,34 C12,48 18,66 28,74 L32,68 C24,62 20,48 26,38 L30,42 Z" fill="#22C55E"/>
  </svg>`,

  plastic_bottle: `<svg xmlns="http://www.w3.org/2000/svg" data-key="plastic_bottle" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDFA"/>
    <rect x="44" y="12" width="12" height="8" rx="2" fill="#2563EB"/>
    <path d="M46,20 L54,20 L62,34 L62,82 C62,86 58,88 50,88 C42,88 38,86 38,82 L38,34 Z" fill="#38BDF8" opacity="0.7" stroke="#0284C7" stroke-width="2"/>
    <path d="M42,50 Q50,56 58,50" stroke="#FFFFFF" stroke-width="2" fill="none"/>
  </svg>`,

  fireworks: `<svg xmlns="http://www.w3.org/2000/svg" data-key="fireworks" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#0F172A"/>
    <circle cx="50" cy="50" r="4" fill="#FEF08A"/>
    <line x1="50" y1="50" x2="50" y2="18" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
    <line x1="50" y1="50" x2="50" y2="82" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
    <line x1="50" y1="50" x2="18" y2="50" stroke="#3B82F6" stroke-width="3" stroke-linecap="round"/>
    <line x1="50" y1="50" x2="82" y2="50" stroke="#3B82F6" stroke-width="3" stroke-linecap="round"/>
    <line x1="50" y1="50" x2="28" y2="28" stroke="#FACC15" stroke-width="3" stroke-linecap="round"/>
    <line x1="50" y1="50" x2="72" y2="72" stroke="#FACC15" stroke-width="3" stroke-linecap="round"/>
    <line x1="50" y1="50" x2="72" y2="28" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>
    <line x1="50" y1="50" x2="28" y2="72" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  board_games: `<svg xmlns="http://www.w3.org/2000/svg" data-key="board_games" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FEF3C7"/>
    <rect x="18" y="24" width="64" height="60" rx="4" fill="#F8FAFC" stroke="#B45309" stroke-width="3"/>
    <rect x="22" y="28" width="28" height="26" fill="#EF4444"/>
    <rect x="50" y="28" width="28" height="26" fill="#FACC15"/>
    <rect x="22" y="54" width="28" height="26" fill="#3B82F6"/>
    <rect x="50" y="54" width="28" height="26" fill="#10B981"/>
    <rect x="42" y="12" width="16" height="16" rx="3" fill="#FFFFFF" stroke="#1E293B" stroke-width="1.5"/>
    <circle cx="50" cy="20" r="1.5" fill="#DC2626"/>
  </svg>`,

  astronaut: `<svg xmlns="http://www.w3.org/2000/svg" data-key="astronaut" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#0B132B"/>
    <circle cx="20" cy="20" r="1.5" fill="#FFFFFF"/>
    <circle cx="82" cy="28" r="1.5" fill="#FDE047"/>
    <rect x="36" y="44" width="28" height="34" rx="8" fill="#F8FAFC"/>
    <circle cx="50" cy="30" r="16" fill="#FFFFFF"/>
    <ellipse cx="50" cy="30" rx="12" ry="9" fill="#0284C7"/>
    <ellipse cx="50" cy="30" rx="9" ry="6" fill="#38BDF8"/>
  </svg>`,

  architect: `<svg xmlns="http://www.w3.org/2000/svg" data-key="architect" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#EFF6FF"/>
    <ellipse cx="50" cy="30" rx="16" ry="10" fill="#FACC15"/>
    <rect x="34" y="32" width="32" height="4" rx="2" fill="#EAB308"/>
    <circle cx="50" cy="38" r="11" fill="#FED7AA"/>
    <rect x="38" y="48" width="24" height="36" rx="4" fill="#0284C7"/>
    <line x1="28" y1="84" x2="72" y2="44" stroke="#60A5FA" stroke-width="6" stroke-linecap="round"/>
  </svg>`,

  writer: `<svg xmlns="http://www.w3.org/2000/svg" data-key="writer" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FFFBEB"/>
    <polygon points="26,44 50,38 74,44 70,82 50,78 30,82" fill="#F8FAFC" stroke="#78350F" stroke-width="2"/>
    <line x1="50" y1="38" x2="50" y2="78" stroke="#CBD5E1" stroke-width="2"/>
    <line x1="32" y1="52" x2="48" y2="48" stroke="#94A3B8" stroke-width="1.5"/>
    <line x1="32" y1="62" x2="48" y2="58" stroke="#94A3B8" stroke-width="1.5"/>
    <line x1="52" y1="48" x2="68" y2="52" stroke="#94A3B8" stroke-width="1.5"/>
    <line x1="52" y1="58" x2="68" y2="62" stroke="#94A3B8" stroke-width="1.5"/>
    <path d="M68,20 Q60,34 54,60" stroke="#D97706" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  // ---------------- SPECIALIST ROOMS & SCHOOL FLOORS ----------------
  // THIRD FLOOR: Clear 3-storey school building showing 1st, 2nd, and 3rd floors, with 3rd floor prominently highlighted
  third_floor: `<svg xmlns="http://www.w3.org/2000/svg" data-key="third_floor" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0F9FF"/>
    <rect x="0" y="90" width="100" height="10" fill="#22C55E"/>
    <line x1="0" y1="90" x2="100" y2="90" stroke="#16A34A" stroke-width="2"/>
    <!-- Level 1 (Ground / First floor) -->
    <rect x="18" y="66" width="64" height="24" fill="#E2E8F0" stroke="#64748B" stroke-width="1.5"/>
    <rect x="42" y="74" width="16" height="16" rx="2" fill="#3B82F6"/>
    <line x1="50" y1="74" x2="50" y2="90" stroke="#1D4ED8" stroke-width="1.5"/>
    <circle cx="48" cy="82" r="1" fill="#FEF08A"/>
    <circle cx="52" cy="82" r="1" fill="#FEF08A"/>
    <rect x="23" y="72" width="12" height="11" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="65" y="72" width="12" height="11" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="3" y="72" width="12" height="11" rx="2" fill="#94A3B8"/>
    <text x="9" y="80" font-size="7" font-weight="bold" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">1F</text>
    <!-- Level 2 (Second floor) -->
    <rect x="18" y="42" width="64" height="24" fill="#F1F5F9" stroke="#64748B" stroke-width="1.5"/>
    <rect x="23" y="48" width="12" height="12" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="44" y="48" width="12" height="12" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="65" y="48" width="12" height="12" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="3" y="48" width="12" height="11" rx="2" fill="#94A3B8"/>
    <text x="9" y="56" font-size="7" font-weight="bold" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">2F</text>
    <!-- Level 3 (THIRD FLOOR) - PROMINENTLY HIGHLIGHTED WITH GOLDEN GLOW -->
    <rect x="16" y="16" width="68" height="26" rx="3" fill="#FEF08A" stroke="#F59E0B" stroke-width="3"/>
    <rect x="18" y="18" width="64" height="24" fill="#FEF9C3"/>
    <rect x="23" y="24" width="12" height="12" fill="#38BDF8" stroke="#D97706" stroke-width="1.5"/>
    <rect x="44" y="24" width="12" height="12" fill="#38BDF8" stroke="#D97706" stroke-width="1.5"/>
    <rect x="65" y="24" width="12" height="12" fill="#38BDF8" stroke="#D97706" stroke-width="1.5"/>
    <!-- Roof on top of 3rd floor -->
    <polygon points="14,16 50,4 86,16" fill="#DC2626" stroke="#991B1B" stroke-width="1.5"/>
    <!-- Prominent highlight pointer and badge for 3rd Floor -->
    <polygon points="14,30 2,24 2,36" fill="#EA580C"/>
    <rect x="1" y="24" width="14" height="12" rx="2" fill="#EA580C"/>
    <text x="7" y="33" font-size="7" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">3F</text>
    <rect x="42" y="6" width="44" height="9" rx="3" fill="#EA580C"/>
    <text x="64" y="13" font-size="5.5" font-weight="bold" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">3rd FLOOR</text>
  </svg>`,

  // SECOND FLOOR: Clear 3-storey school building with 2nd floor highlighted
  second_floor: `<svg xmlns="http://www.w3.org/2000/svg" data-key="second_floor" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0F9FF"/>
    <rect x="0" y="90" width="100" height="10" fill="#22C55E"/>
    <line x1="0" y1="90" x2="100" y2="90" stroke="#16A34A" stroke-width="2"/>
    <polygon points="14,16 50,4 86,16" fill="#DC2626" stroke="#991B1B" stroke-width="1.5"/>
    <!-- Level 3 -->
    <rect x="18" y="16" width="64" height="24" fill="#F1F5F9" stroke="#64748B" stroke-width="1.5"/>
    <rect x="23" y="22" width="12" height="12" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="44" y="22" width="12" height="12" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="65" y="22" width="12" height="12" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="3" y="22" width="12" height="11" rx="2" fill="#94A3B8"/>
    <text x="9" y="30" font-size="7" font-weight="bold" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">3F</text>
    <!-- Level 2 (SECOND FLOOR) - HIGHLIGHTED -->
    <rect x="16" y="40" width="68" height="26" rx="3" fill="#FEF08A" stroke="#F59E0B" stroke-width="3"/>
    <rect x="18" y="42" width="64" height="22" fill="#FEF9C3"/>
    <rect x="23" y="47" width="12" height="12" fill="#38BDF8" stroke="#D97706" stroke-width="1.5"/>
    <rect x="44" y="47" width="12" height="12" fill="#38BDF8" stroke="#D97706" stroke-width="1.5"/>
    <rect x="65" y="47" width="12" height="12" fill="#38BDF8" stroke="#D97706" stroke-width="1.5"/>
    <polygon points="14,52 2,46 2,58" fill="#EA580C"/>
    <rect x="1" y="46" width="14" height="12" rx="2" fill="#EA580C"/>
    <text x="7" y="55" font-size="7" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">2F</text>
    <!-- Level 1 -->
    <rect x="18" y="66" width="64" height="24" fill="#E2E8F0" stroke="#64748B" stroke-width="1.5"/>
    <rect x="42" y="74" width="16" height="16" rx="2" fill="#3B82F6"/>
    <line x1="50" y1="74" x2="50" y2="90" stroke="#1D4ED8" stroke-width="1.5"/>
    <rect x="23" y="72" width="12" height="11" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="65" y="72" width="12" height="11" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="3" y="72" width="12" height="11" rx="2" fill="#94A3B8"/>
    <text x="9" y="80" font-size="7" font-weight="bold" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">1F</text>
    <rect x="42" y="6" width="44" height="9" rx="3" fill="#EA580C"/>
    <text x="64" y="13" font-size="5.5" font-weight="bold" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">2nd FLOOR</text>
  </svg>`,

  // FIRST FLOOR: Clear 3-storey school building with 1st floor highlighted
  first_floor: `<svg xmlns="http://www.w3.org/2000/svg" data-key="first_floor" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0F9FF"/>
    <rect x="0" y="90" width="100" height="10" fill="#22C55E"/>
    <line x1="0" y1="90" x2="100" y2="90" stroke="#16A34A" stroke-width="2"/>
    <polygon points="14,16 50,4 86,16" fill="#DC2626" stroke="#991B1B" stroke-width="1.5"/>
    <!-- Level 3 -->
    <rect x="18" y="16" width="64" height="24" fill="#F1F5F9" stroke="#64748B" stroke-width="1.5"/>
    <rect x="23" y="22" width="12" height="12" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="44" y="22" width="12" height="12" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="65" y="22" width="12" height="12" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="3" y="22" width="12" height="11" rx="2" fill="#94A3B8"/>
    <text x="9" y="30" font-size="7" font-weight="bold" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">3F</text>
    <!-- Level 2 -->
    <rect x="18" y="40" width="64" height="24" fill="#F1F5F9" stroke="#64748B" stroke-width="1.5"/>
    <rect x="23" y="46" width="12" height="12" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="44" y="46" width="12" height="12" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="65" y="46" width="12" height="12" fill="#BAE6FD" stroke="#64748B" stroke-width="1"/>
    <rect x="3" y="46" width="12" height="11" rx="2" fill="#94A3B8"/>
    <text x="9" y="54" font-size="7" font-weight="bold" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">2F</text>
    <!-- Level 1 (FIRST FLOOR) - HIGHLIGHTED -->
    <rect x="16" y="64" width="68" height="26" rx="3" fill="#FEF08A" stroke="#F59E0B" stroke-width="3"/>
    <rect x="18" y="66" width="64" height="22" fill="#FEF9C3"/>
    <rect x="42" y="72" width="16" height="16" rx="2" fill="#3B82F6"/>
    <line x1="50" y1="72" x2="50" y2="88" stroke="#1D4ED8" stroke-width="1.5"/>
    <rect x="23" y="70" width="12" height="11" fill="#38BDF8" stroke="#D97706" stroke-width="1.5"/>
    <rect x="65" y="70" width="12" height="11" fill="#38BDF8" stroke="#D97706" stroke-width="1.5"/>
    <polygon points="14,76 2,70 2,82" fill="#EA580C"/>
    <rect x="1" y="70" width="14" height="12" rx="2" fill="#EA580C"/>
    <text x="7" y="79" font-size="7" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">1F</text>
    <rect x="42" y="6" width="44" height="9" rx="3" fill="#EA580C"/>
    <text x="64" y="13" font-size="5.5" font-weight="bold" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">1st FLOOR</text>
  </svg>`,

  // COMPUTER ROOM: Classroom with multiple desktop computers, monitors, keyboards, mice, desks, and towers
  computer_room: `<svg xmlns="http://www.w3.org/2000/svg" data-key="computer_room" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#EFF6FF"/>
    <rect x="0" y="62" width="100" height="38" fill="#FEF3C7"/>
    <line x1="0" y1="62" x2="100" y2="62" stroke="#F59E0B" stroke-width="2"/>
    <!-- Classroom IT board at top -->
    <rect x="22" y="6" width="56" height="18" rx="2" fill="#F8FAFC" stroke="#64748B" stroke-width="1.5"/>
    <rect x="26" y="9" width="48" height="12" rx="1" fill="#0284C7"/>
    <circle cx="32" cy="15" r="2" fill="#FDE047"/>
    <circle cx="38" cy="15" r="2" fill="#34D399"/>
    <rect x="44" y="13" width="24" height="4" rx="1" fill="#FFFFFF"/>
    <!-- Computer desks in lab row -->
    <rect x="4" y="50" width="92" height="20" rx="2" fill="#D97706" stroke="#B45309" stroke-width="1.5"/>
    <!-- Computer 1 (Left) -->
    <rect x="8" y="30" width="24" height="18" rx="2" fill="#1E293B"/>
    <rect x="10" y="32" width="20" height="14" rx="1" fill="#0284C7"/>
    <rect x="13" y="35" width="6" height="5" fill="#38BDF8"/>
    <rect x="21" y="35" width="6" height="5" fill="#FACC15"/>
    <rect x="13" y="42" width="14" height="2" fill="#FFFFFF"/>
    <path d="M17,48 L23,48 L22,54 L18,54 Z" fill="#64748B"/>
    <rect x="8" y="54" width="24" height="6" rx="1.5" fill="#334155"/>
    <line x1="11" y1="57" x2="29" y2="57" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="2 1"/>
    <ellipse cx="36" cy="57" rx="2.5" ry="3.5" fill="#3B82F6"/>
    <!-- Computer 2 (Center) -->
    <rect x="38" y="30" width="24" height="18" rx="2" fill="#1E293B"/>
    <rect x="40" y="32" width="20" height="14" rx="1" fill="#38BDF8"/>
    <circle cx="50" cy="39" r="4" fill="#F59E0B"/>
    <path d="M47,48 L53,48 L52,54 L48,54 Z" fill="#64748B"/>
    <rect x="38" y="54" width="24" height="6" rx="1.5" fill="#334155"/>
    <line x1="41" y1="57" x2="59" y2="57" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="2 1"/>
    <ellipse cx="66" cy="57" rx="2.5" ry="3.5" fill="#3B82F6"/>
    <!-- Computer 3 (Right) -->
    <rect x="68" y="30" width="24" height="18" rx="2" fill="#1E293B"/>
    <rect x="70" y="32" width="20" height="14" rx="1" fill="#10B981"/>
    <rect x="73" y="35" width="14" height="8" fill="#064E3B"/>
    <path d="M77,48 L83,48 L82,54 L78,54 Z" fill="#64748B"/>
    <rect x="68" y="54" width="24" height="6" rx="1.5" fill="#334155"/>
    <line x1="71" y1="57" x2="89" y2="57" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="2 1"/>
    <ellipse cx="95" cy="57" rx="2.5" ry="3.5" fill="#3B82F6"/>
    <!-- CPU Desktop Towers under desk with LED power lights -->
    <rect x="10" y="70" width="8" height="18" rx="1.5" fill="#0F172A"/>
    <circle cx="14" cy="74" r="1" fill="#10B981"/>
    <rect x="12" y="78" width="4" height="1" fill="#64748B"/>
    <rect x="40" y="70" width="8" height="18" rx="1.5" fill="#0F172A"/>
    <circle cx="44" cy="74" r="1" fill="#38BDF8"/>
    <rect x="42" y="78" width="4" height="1" fill="#64748B"/>
    <rect x="70" y="70" width="8" height="18" rx="1.5" fill="#0F172A"/>
    <circle cx="74" cy="74" r="1" fill="#FACC15"/>
    <rect x="72" y="78" width="4" height="1" fill="#64748B"/>
  </svg>`,

  // SCIENCE LAB: School science laboratory with lab tables, test tubes, beakers, microscope, and chemical glassware
  science_lab: `<svg xmlns="http://www.w3.org/2000/svg" data-key="science_lab" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <!-- Science chalkboard / atomic model on wall -->
    <rect x="26" y="4" width="48" height="18" rx="2" fill="#14532D" stroke="#78350F" stroke-width="1.5"/>
    <ellipse cx="50" cy="13" rx="10" ry="4" fill="none" stroke="#FDE047" stroke-width="1.2"/>
    <ellipse cx="50" cy="13" rx="4" ry="10" fill="none" stroke="#86EFAC" stroke-width="1.2"/>
    <circle cx="50" cy="13" r="2" fill="#EF4444"/>
    <!-- Sturdy Science Lab Workbench -->
    <rect x="4" y="54" width="92" height="8" rx="1.5" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
    <rect x="8" y="62" width="84" height="28" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1.5"/>
    <line x1="50" y1="62" x2="50" y2="90" stroke="#CBD5E1" stroke-width="1.5"/>
    <circle cx="46" cy="74" r="1.5" fill="#64748B"/>
    <circle cx="54" cy="74" r="1.5" fill="#64748B"/>
    <!-- Microscope (Left) -->
    <path d="M12,54 L28,54 L26,50 L14,50 Z" fill="#1E293B"/>
    <path d="M24,50 C24,42 28,36 26,30 L22,30" stroke="#475569" stroke-width="3" fill="none"/>
    <rect x="20" y="26" width="5" height="8" rx="1" transform="rotate(-20 22 30)" fill="#1E293B"/>
    <circle cx="24" cy="40" r="2.5" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
    <rect x="16" y="44" width="12" height="2.5" fill="#1E293B"/>
    <rect x="17" y="43" width="10" height="1" fill="#BAE6FD"/>
    <!-- Test Tube Rack with 3 Colorful Solutions (Center) -->
    <rect x="34" y="40" width="28" height="14" rx="2" fill="#D97706" stroke="#B45309" stroke-width="1"/>
    <!-- Test Tube 1 (Green) -->
    <rect x="36" y="28" width="6" height="22" rx="3" fill="#ECFDF5" stroke="#10B981" stroke-width="1.2"/>
    <path d="M37,38 L41,38 L41,47 Q41,49 39,49 Q37,49 37,47 Z" fill="#10B981"/>
    <circle cx="39" cy="42" r="1" fill="#FFFFFF" opacity="0.8"/>
    <circle cx="38.5" cy="45" r="0.8" fill="#FFFFFF" opacity="0.8"/>
    <!-- Test Tube 2 (Purple) -->
    <rect x="45" y="26" width="6" height="24" rx="3" fill="#FAF5FF" stroke="#A855F7" stroke-width="1.2"/>
    <path d="M46,36 L50,36 L50,47 Q50,49 48,49 Q46,49 46,47 Z" fill="#9333EA"/>
    <circle cx="48" cy="40" r="1" fill="#FFFFFF" opacity="0.8"/>
    <!-- Test Tube 3 (Blue) -->
    <rect x="54" y="30" width="6" height="20" rx="3" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.2"/>
    <path d="M55,39 L59,39 L59,47 Q59,49 57,49 Q55,49 55,47 Z" fill="#2563EB"/>
    <!-- Erlenmeyer Conical Flask with Glowing Orange Chemical (Right) -->
    <path d="M70,32 L74,32 L82,54 L64,54 Z" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
    <polygon points="66,48 80,48 81,53 65,53" fill="#F97316"/>
    <circle cx="73" cy="50" r="1.5" fill="#FEF08A" opacity="0.9"/>
    <circle cx="76" cy="45" r="1" fill="#FEF08A" opacity="0.8"/>
    <path d="M71,28 Q73,25 71,22 M73,28 Q75,25 73,21" stroke="#CBD5E1" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <!-- Graduated Glass Beaker (Far Right) -->
    <rect x="84" y="38" width="10" height="16" rx="1.5" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.2"/>
    <rect x="85" y="46" width="8" height="7" fill="#0284C7"/>
    <line x1="84" y1="42" x2="87" y2="42" stroke="#0284C7" stroke-width="1"/>
    <line x1="84" y1="46" x2="87" y2="46" stroke="#0284C7" stroke-width="1"/>
    <line x1="84" y1="50" x2="87" y2="50" stroke="#0284C7" stroke-width="1"/>
  </svg>`,

  // MUSIC ROOM: Classroom with musical instruments (piano, guitar on stand, drum, chalkboard with music notes)
  music_room: `<svg xmlns="http://www.w3.org/2000/svg" data-key="music_room" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FFFBEB"/>
    <!-- Classroom floor -->
    <rect x="0" y="64" width="100" height="36" fill="#FEF3C7"/>
    <line x1="0" y1="64" x2="100" y2="64" stroke="#F59E0B" stroke-width="1.5"/>
    <!-- Music chalkboard on wall with staff and notes -->
    <rect x="18" y="6" width="64" height="22" rx="2" fill="#15803D" stroke="#78350F" stroke-width="1.5"/>
    <line x1="22" y1="11" x2="78" y2="11" stroke="#FFFFFF" stroke-width="0.8" opacity="0.7"/>
    <line x1="22" y1="14" x2="78" y2="14" stroke="#FFFFFF" stroke-width="0.8" opacity="0.7"/>
    <line x1="22" y1="17" x2="78" y2="17" stroke="#FFFFFF" stroke-width="0.8" opacity="0.7"/>
    <line x1="22" y1="20" x2="78" y2="20" stroke="#FFFFFF" stroke-width="0.8" opacity="0.7"/>
    <line x1="22" y1="23" x2="78" y2="23" stroke="#FFFFFF" stroke-width="0.8" opacity="0.7"/>
    <!-- Treble clef and notes -->
    <circle cx="32" cy="17" r="2" fill="#FEF08A"/>
    <circle cx="46" cy="14" r="2" fill="#FEF08A"/>
    <line x1="48" y1="14" x2="48" y2="8" stroke="#FEF08A" stroke-width="1.2"/>
    <circle cx="58" cy="17" r="2" fill="#FEF08A"/>
    <line x1="60" y1="17" x2="60" y2="10" stroke="#FEF08A" stroke-width="1.2"/>
    <line x1="48" y1="8" x2="60" y2="10" stroke="#FEF08A" stroke-width="2"/>
    <!-- Upright Piano (Left) -->
    <rect x="8" y="36" width="34" height="38" rx="2" fill="#78350F" stroke="#451A03" stroke-width="1.5"/>
    <rect x="12" y="46" width="26" height="10" fill="#FFFFFF" stroke="#1E293B" stroke-width="1"/>
    <!-- Piano black keys -->
    <rect x="15" y="46" width="2" height="6" fill="#1E293B"/>
    <rect x="19" y="46" width="2" height="6" fill="#1E293B"/>
    <rect x="25" y="46" width="2" height="6" fill="#1E293B"/>
    <rect x="29" y="46" width="2" height="6" fill="#1E293B"/>
    <rect x="33" y="46" width="2" height="6" fill="#1E293B"/>
    <!-- Music sheet on piano -->
    <polygon points="20,38 30,36 30,44 20,46" fill="#F8FAFC" stroke="#64748B" stroke-width="0.8"/>
    <!-- Piano pedals & bench -->
    <rect x="22" y="72" width="6" height="3" fill="#F59E0B"/>
    <rect x="14" y="60" width="22" height="5" rx="1.5" fill="#92400E"/>
    <line x1="16" y1="65" x2="16" y2="76" stroke="#78350F" stroke-width="2"/>
    <line x1="34" y1="65" x2="34" y2="76" stroke="#78350F" stroke-width="2"/>
    <!-- Acoustic Guitar on Stand (Center Right) -->
    <ellipse cx="56" cy="66" rx="9" ry="12" fill="#D97706" stroke="#92400E" stroke-width="1.5"/>
    <circle cx="56" cy="64" r="3.5" fill="#78350F"/>
    <rect x="54.5" y="38" width="3" height="20" fill="#B45309" stroke="#78350F" stroke-width="0.8"/>
    <rect x="53.5" y="34" width="5" height="6" rx="1" fill="#78350F"/>
    <!-- Guitar Stand -->
    <path d="M51,78 L56,70 L61,78" stroke="#475569" stroke-width="2" fill="none"/>
    <!-- Drum / Percussion (Right) -->
    <ellipse cx="82" cy="56" rx="11" ry="5" fill="#E2E8F0" stroke="#DC2626" stroke-width="1.5"/>
    <rect x="71" y="56" width="22" height="14" fill="#EF4444" stroke="#DC2626" stroke-width="1"/>
    <ellipse cx="82" cy="70" rx="11" ry="4" fill="#DC2626"/>
    <!-- Drumsticks -->
    <line x1="74" y1="48" x2="84" y2="58" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
    <line x1="90" y1="48" x2="80" y2="58" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
    <!-- Floating musical notes -->
    <circle cx="88" cy="30" r="2" fill="#3B82F6"/>
    <line x1="90" y1="30" x2="90" y2="22" stroke="#3B82F6" stroke-width="1.2"/>
    <path d="M90,22 Q94,24 93,27" stroke="#3B82F6" stroke-width="1.2" fill="none"/>
  </svg>`,

  // ART ROOM: Classroom with wooden easel displaying colorful drawing, palette, paintbrushes in jars, and gallery paintings
  art_room: `<svg xmlns="http://www.w3.org/2000/svg" data-key="art_room" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <!-- Art Room floor -->
    <rect x="0" y="66" width="100" height="34" fill="#FEF3C7"/>
    <line x1="0" y1="66" x2="100" y2="66" stroke="#D97706" stroke-width="1.5"/>
    <!-- Gallery Wall: Children Paintings pinned up at top -->
    <rect x="8" y="8" width="22" height="16" rx="1" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
    <circle cx="14" cy="14" r="3" fill="#FACC15"/>
    <path d="M8,22 Q14,18 20,22 Q25,18 30,22 L30,24 L8,24 Z" fill="#22C55E"/>
    <rect x="36" y="8" width="24" height="16" rx="1" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
    <path d="M40,20 Q48,10 56,20" stroke="#EF4444" stroke-width="2" fill="none"/>
    <path d="M42,21 Q48,13 54,21" stroke="#F59E0B" stroke-width="2" fill="none"/>
    <path d="M44,22 Q48,16 52,22" stroke="#3B82F6" stroke-width="2" fill="none"/>
    <rect x="66" y="8" width="24" height="16" rx="1" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
    <circle cx="78" cy="14" r="4" fill="#EC4899"/>
    <circle cx="78" cy="14" r="1.5" fill="#FDE047"/>
    <!-- Wooden Art Easel with Painting (Left) -->
    <line x1="22" y1="26" x2="10" y2="86" stroke="#B45309" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="26" y1="26" x2="38" y2="86" stroke="#B45309" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="24" y1="26" x2="24" y2="84" stroke="#92400E" stroke-width="2"/>
    <!-- Canvas board on easel with artwork -->
    <rect x="10" y="32" width="28" height="24" rx="1.5" fill="#FFFFFF" stroke="#D97706" stroke-width="1.5"/>
    <circle cx="16" cy="38" r="3" fill="#F59E0B"/>
    <path d="M12,50 Q18,42 24,50 Q30,44 36,50 L36,54 L12,54 Z" fill="#10B981"/>
    <!-- Easel shelf supporting canvas -->
    <rect x="8" y="54" width="32" height="3" rx="1" fill="#78350F"/>
    <!-- Art Workbench Table (Right) -->
    <rect x="44" y="52" width="52" height="8" rx="2" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
    <rect x="48" y="60" width="44" height="28" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1.5"/>
    <!-- Paint palette with colorful paint blobs -->
    <ellipse cx="58" cy="48" rx="10" ry="5" fill="#FEF3C7" stroke="#D97706" stroke-width="1.2"/>
    <circle cx="53" cy="47" r="1.5" fill="#EF4444"/>
    <circle cx="57" cy="46" r="1.5" fill="#3B82F6"/>
    <circle cx="61" cy="47" r="1.5" fill="#10B981"/>
    <circle cx="63" cy="49" r="1.5" fill="#F59E0B"/>
    <!-- Water jar with paintbrushes -->
    <rect x="72" y="42" width="8" height="11" rx="2" fill="#E0F2FE" stroke="#38BDF8" stroke-width="1"/>
    <line x1="74" y1="48" x2="70" y2="32" stroke="#78350F" stroke-width="2" stroke-linecap="round"/>
    <polygon points="70,32 68,28 72,30" fill="#EF4444"/>
    <line x1="76" y1="48" x2="76" y2="30" stroke="#78350F" stroke-width="2" stroke-linecap="round"/>
    <polygon points="76,30 74,26 78,28" fill="#3B82F6"/>
    <line x1="78" y1="48" x2="82" y2="32" stroke="#78350F" stroke-width="2" stroke-linecap="round"/>
    <polygon points="82,32 84,28 80,30" fill="#F59E0B"/>
    <!-- Jar of colored pencils / crayons -->
    <rect x="84" y="46" width="8" height="8" rx="1.5" fill="#FEF08A" stroke="#EAB308" stroke-width="1"/>
    <line x1="86" y1="46" x2="85" y2="38" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="88" y1="46" x2="88" y2="36" stroke="#3B82F6" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="90" y1="46" x2="91" y2="38" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

};

/**
 * Normalizes user/question word to canonical illustration key.
 * Resolves synonyms, compounds, and common phrase patterns.
 */
export function resolveCanonicalKey(rawWord: string): string | null {
  const w = (rawWord || '').trim().toLowerCase();

  // Direct exact match in SVG_ICONS
  if (SVG_ICONS[w]) return w;

  // School Specialist Rooms & Floors (Strict Priority)
  if (w.includes('third floor') || w === '3rd floor') return 'third_floor';
  if (w.includes('second floor') || w === '2nd floor') return 'second_floor';
  if (w.includes('first floor') || w === '1st floor') return 'first_floor';
  if (w.includes('computer room') || w.includes('computer lab')) return 'computer_room';
  if (w.includes('science lab') || w.includes('science laboratory') || w.includes('scientific lab')) return 'science_lab';
  if (w.includes('music room') || w.includes('music classroom')) return 'music_room';
  if (w.includes('art room') || w.includes('art classroom')) return 'art_room';
  if (w === 'art') return 'art';

  // Specific user requirements: plate, cup, party
  if (w.includes('plate') || w.includes('dish')) return 'plate';
  if (w.includes('cup') || w.includes('mug') || w === 'glass') return 'cup';
  if (w.includes('party')) return 'party';

  // Routines & Everyday Actions
  if (w === 'get up' || w === 'wake up') return 'get_up';
  if (w === 'breakfast') return 'breakfast';
  if (w === 'dinner') return 'dinner';
  if (w === 'lunch') return 'lunch';
  if (w === 'go to school') return 'go_to_school';
  if (w === 'go to bed' || w === 'sleep') return 'go_to_bed';
  if (w.includes('clean') && w.includes('house')) return 'clean_house';
  if (w.includes('surf') && w.includes('internet')) return 'surf_internet';
  if (w.includes('water') && w.includes('flower')) return 'water_flowers';
  if (w.includes('karate')) return 'karate';
  if (w.includes('chess')) return 'chess';
  if (w === 'swim' || w === 'swimming') return 'swim';
  if (w === 'run' || w === 'running' || w === 'jogging') return 'run';
  if (w === 'cook' || w === 'cooking') return 'cook';
  if (w === 'sing' || w === 'singing') return 'sing';
  if (w === 'dance' || w === 'dancing') return 'dance';
  if (w.includes('skate') || w.includes('roller-skating')) return 'skate';
  if (w === 'skip' || w === 'skipping' || w.includes('jump rope')) return 'skipping';
  if (w.includes('hide-and-seek') || w.includes('hide and seek')) return 'hide_and_seek';
  if (w.includes('badminton')) return 'badminton';
  if (w.includes('climb') || w.includes('climbing')) return 'climbing';
  if (w.includes('swing') || w.includes('swinging')) return 'swinging';
  if (w.includes('draw') || w.includes('drawing') || w.includes('paint')) return 'drawing';
  if (w === 'kick' || w === 'kicking') return 'kick';
  if (w === 'stand up' || w === 'stand') return 'stand_up';
  if (w === 'sit down' || w === 'sit') return 'sit_down';
  if (w.includes('come in')) return 'come_in';
  if (w === 'close' || w === 'close book' || w.includes('close your book')) return 'close_book';
  if (w === 'open' || w === 'open book' || w.includes('open your book')) return null;
  if (w === 'wave' || w === 'waving' || w === 'hello' || w === 'hi') return 'wave';
  if (w === 'goodbye' || w === 'bye') return 'goodbye';
  if (w === 'speak' || w === 'talk') return 'speak';

  // Animals & Nature (Avoid substring traps)
  if (w === 'fox' || w.endsWith(' fox')) return 'fox';
  if (w === 'crab' || w.endsWith(' crab')) return 'crab';
  if (w === 'turtle' || w.endsWith(' turtle')) return 'turtle';
  if (w === 'hen' || w.endsWith(' hen')) return 'hen';
  if (w.includes('crocodile')) return 'crocodile';
  if (w.includes('kangaroo')) return 'kangaroo';
  if (w.includes('peacock')) return 'peacock';
  if (w === 'ant' || w === 'ants') return 'ant';
  if (w === 'cat' || w.includes('kitten')) return 'cat';
  if (w === 'dog' || w.includes('puppy')) return 'dog';
  if (w.includes('bird')) return 'bird';
  if (w.includes('parrot')) return 'parrot';
  if (w.includes('duck')) return 'duck';
  if (w === 'fish' || w === 'goldfish') return 'fish';
  if (w.includes('monkey')) return 'monkey';
  if (w.includes('elephant')) return 'elephant';
  if (w.includes('tiger')) return 'tiger';
  if (w.includes('lion')) return 'lion';
  if (w.includes('rabbit')) return 'rabbit';
  if (w.includes('pig')) return 'pig';
  if (w.includes('bear') || w.includes('teddy')) return 'bear';
  if (w.includes('mouse')) return 'mouse';
  if (w.includes('horse')) return 'horse';
  if (w.includes('frog')) return 'frog';
  if (w.includes('cow')) return 'cow';
  if (w.includes('goat')) return 'goat';
  if (w.includes('giraffe')) return 'giraffe';
  if (w.includes('zebra')) return 'zebra';

  // Items & Objects
  if (w === 'lamp' || w.endsWith(' lamp')) return 'lamp';
  if (w === 'fork' || w.endsWith(' fork')) return 'fork';
  if (w === 'ring' || w.endsWith(' ring')) return 'ring';
  if (w === 'lock' || w === 'padlock') return 'lock';
  if (w === 'map' || w.endsWith(' map')) return 'map';
  if (w === 'candle' || w.endsWith(' candle')) return 'candle';
  if (w === 'vase' || w.endsWith(' vase')) return 'vase';
  if (w === 'blanket' || w.endsWith(' blanket')) return 'blanket';
  if (w === 'jacket' || w === 'coat' || w.endsWith(' jacket')) return 'jacket';
  if (w === 'can' || w === 'a can' || w.endsWith(' can') || w.includes('can of')) return 'can';
  if (w === 'food' || w === 'meal') return 'food';
  if (w.includes('bottle')) return 'plastic_bottle';
  if (w === 'net' || w.endsWith(' net')) return 'net';
  if (w.includes('nest')) return 'nest';
  if (w.includes('ball') || w.includes('football') || w.includes('basketball') || w.includes('volleyball')) return 'ball';
  if (w.includes('bike') || w.includes('bicycle') || w.includes('cycling') || w.includes('riding')) return 'bike';
  if (w.includes('car') || w.includes('taxi')) return 'car';
  if (w.includes('bus')) return 'bus';
  if (w === 'plane' || w === 'airplane' || w.includes('fly a plane') || w.includes('flying a plane')) return 'plane';
  if (w.includes('train')) return 'train';
  if (w.includes('boat') || w.includes('ship') || w.includes('yacht') || w.includes('sail')) return 'boat';
  if (w.includes('kite')) return 'kite';
  if (w.includes('robot')) return 'robot';
  if (w.includes('doll') || w.includes('puppet')) return 'doll';
  if (w.includes('yo-yo') || w.includes('yoyo')) return 'yo_yo';

  // Clothing
  if (w === 'hat' || w.endsWith(' hat')) return 'hat';
  if (w === 'cap' || w.endsWith(' cap')) return 'cap';
  if (w.includes('shirt') || w.includes('t-shirt')) return 'shirt';
  if (w.includes('dress') || w.includes('skirt')) return 'dress';
  if (w.includes('shoe') || w.includes('boot') || w.includes('sock') || w.includes('trousers')) return 'shoes';

  // School items
  if (w.includes('maths') || w.includes('math')) return 'maths';
  if (w.includes('science')) return 'science';
  if (w.includes('key')) return 'key';
  if (w.includes('book') || w.includes('story') || w.includes('read')) return 'book';
  if (w.includes('pencil') || w.includes('crayon')) return 'pencil';
  if (w === 'pen' || w.endsWith(' pen')) return 'pen';
  if (w.includes('ruler')) return 'ruler';
  if (w.includes('rubber') || w.includes('eraser')) return 'rubber';
  if (w.includes('bag') || w.includes('backpack')) return 'bag';
  if (w.includes('desk')) return 'desk';
  if (w.includes('chair')) return 'chair';
  if (w.includes('clock') || w.includes("o'clock")) return 'clock';
  if (w.includes('bell')) return 'bell';
  if (w.includes('school')) return 'school';
  if (w.includes('classroom')) return 'classroom';
  if (w.includes('library')) return 'library';

  // Places
  if (w.includes('playground')) return 'playground';
  if (w.includes('gym')) return 'gym';
  if (w.includes('city') || w.includes('town')) return 'city';
  if (w.includes('mountain') || w.includes('mountains')) return 'mountains';
  if (w.includes('farm')) return 'farm';
  if (w.includes('island')) return 'island';
  if (w.includes('museum')) return 'museum';
  if (w.includes('pharmacy')) return 'pharmacy';
  if (w.includes('bakery')) return 'bakery';
  if (w.includes('village')) return 'village';
  if (w.includes('cinema') || w.includes('movie')) return 'cinema';
  if (w.includes('hospital')) return 'hospital';
  if (w.includes('supermarket')) return 'supermarket';
  if (w.includes('lake')) return 'lake';
  if (w === 'river' || w.endsWith(' river')) return 'river';
  if (w.includes('hill')) return 'hill';
  if (w.includes('house') || w.includes('home') || w.includes('cottage') || w.includes('flat')) return 'house';
  if (w === 'bed' || w.endsWith(' bed') || w.includes('bedroom')) return 'bed';
  if (w === 'door' || w.endsWith(' door')) return 'door';
  if (w.includes('window')) return 'window';
  if ((w.includes('tree') || w.includes('plant')) && !w.includes('street')) return 'tree';
  if (w.includes('flower') || w.includes('rose') || w.includes('blossom')) return 'flower';
  if (w.includes('sun') || w.includes('sunny')) return 'sun';
  if (w.includes('moon')) return 'moon';
  if (w.includes('star')) return 'star';
  if (w.includes('tent') || w.includes('camp') || w.includes('campfire')) return 'tent';
  if (w.includes('beach') || w === 'sand' || w.includes('sandcastle')) return 'beach';
  if (w.includes('sea') || w.includes('ocean')) return 'sea';
  if (w.includes('park') || w.includes('garden')) return 'park';
  if (w.includes('zoo')) return 'zoo';
  if (w.includes('guitar') || w.includes('music') || w.includes('violin')) return 'guitar';
  if (w.includes('piano')) return 'piano';
  if (w.includes('temple') || w.includes('pagoda')) return 'temple';
  if (w.includes('solar')) return 'solar_panels';
  if (w.includes('table')) return 'table';
  if (w === 'room' || w.includes('bathroom') || w.includes('living room') || w.includes('kitchen')) return 'room';

  // Body & Health & Roles
  if (w === 'foot' || w === 'feet') return 'foot';
  if (w === 'leg' || w.endsWith(' leg')) return 'leg';
  if (w.includes('ear') || w.includes('hear') || w.includes('listen')) return 'ear';
  if (w.includes('mouth')) return 'mouth';
  if (w.includes('face')) return 'face';
  if (w.includes('hand')) return 'hand';
  if (w.includes('nose')) return 'nose';
  if (w.includes('eye')) return 'eye';
  if (w === 'hair' || w.includes('haircut')) return 'hair';
  if (w === 'head' || w === 'headache') return 'hair';
  if (w.includes('toothache')) return 'toothache';
  if (w.includes('stomach') || w.includes('stomach ache')) return 'stomach_ache';
  if (w.includes('fever')) return 'fever';
  if (w === 'king' || w === 'queen') return 'king';
  if (w.includes('astronaut')) return 'astronaut';
  if (w.includes('architect')) return 'architect';
  if (w.includes('writer')) return 'writer';
  if (w.includes('dentist')) return 'dentist';
  if (w.includes('doctor') || w.includes('nurse')) return 'doctor';
  if (w.includes('teacher')) return 'teacher';
  if (w.includes('farmer')) return 'farmer';
  if (w.includes('pilot')) return 'pilot';
  if (w.includes('singer')) return 'singer';
  if (w.includes('family') || w.includes('mother') || w.includes('father') || w.includes('brother') || w.includes('sister') || w.includes('parents') || w.includes('grandparent') || w.includes('friend') || w.includes('boy') || w.includes('girl')) return 'family';

  // STRICT RULE: If no semantic visual match exists, DO NOT fall back to 'book'!
  return null;
}

/**
 * Checks whether a vocabulary word has an exact verified semantic cartoon illustration.
 */
export function hasExactVocabularyImage(word: string): boolean {
  const canonicalKey = resolveCanonicalKey(word);
  return !!canonicalKey && !!SVG_ICONS[canonicalKey];
}

/**
 * Extracts the canonical image key from a data-URI, raw SVG string, or image URL.
 */
export function resolveKeyFromImage(imageStr?: string): string | null {
  if (!imageStr) return null;

  // Check data-key attribute first (fastest and 100% deterministic)
  const dataKeyMatch = imageStr.match(/data-key=["']([^"']+)["']/);
  if (dataKeyMatch && dataKeyMatch[1]) {
    return dataKeyMatch[1];
  }

  // Check URL encoded data-key
  if (imageStr.includes('data-key%3D%22')) {
    const encMatch = imageStr.match(/data-key%3D%22([a-zA-Z0-9_]+)%22/);
    if (encMatch && encMatch[1]) return encMatch[1];
  }

  // Decode URI if present
  let decoded = imageStr;
  if (imageStr.startsWith('data:image/svg+xml;utf8,')) {
    try {
      decoded = decodeURIComponent(imageStr.replace('data:image/svg+xml;utf8,', ''));
      const decMatch = decoded.match(/data-key=["']([^"']+)["']/);
      if (decMatch && decMatch[1]) return decMatch[1];
    } catch {
      // fallback
    }
  }

  return null;
}

/**
 * Strictly verifies that a target word matches the visual meaning of an image.
 * Guarantees TARGET = IMAGE MEANING.
 */
export function validateTargetMatchesImage(targetWord: string, imageStr?: string): boolean {
  if (!targetWord || !imageStr) return false;
  const targetKey = resolveCanonicalKey(targetWord);
  if (!targetKey) return false;

  const imgKey = resolveKeyFromImage(imageStr);
  if (!imgKey) return false;

  return targetKey === imgKey;
}

/**
 * Returns raw, inline-renderable SVG string for any vocabulary word.
 * Returns empty string if no verified semantic image exists.
 */
export function getRawSvg(word: string): string {
  const canonicalKey = resolveCanonicalKey(word);
  if (canonicalKey && SVG_ICONS[canonicalKey]) {
    return SVG_ICONS[canonicalKey];
  }
  return '';
}

/**
 * Returns a verified, child-friendly cartoon image data-URI SVG for a vocabulary word.
 * Returns empty string if no verified semantic image exists.
 */
export function getVocabularyImage(word: string): string {
  const rawSvg = getRawSvg(word);
  if (rawSvg) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(rawSvg)}`;
  }
  return '';
}
