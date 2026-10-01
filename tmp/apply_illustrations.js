const fs = require('fs');
let content = fs.readFileSync('src/data/curriculum/illustrations.ts', 'utf8');

const newSchoolSvgs = `
  third_floor: \`<svg xmlns="http://www.w3.org/2000/svg" data-key="third_floor" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0F9FF"/>
    <!-- Ground Grass -->
    <rect x="0" y="90" width="100" height="10" rx="2" fill="#15803D"/>
    <!-- School Clock Tower & Roof -->
    <polygon points="45,4 38,16 52,16" fill="#DC2626"/>
    <rect x="41" y="14" width="8" height="6" fill="#FFFFFF" stroke="#991B1B" stroke-width="1"/>
    <circle cx="45" cy="17" r="2.2" fill="#FBBF24"/>
    <polygon points="12,20 45,8 78,20" fill="#B91C1C"/>
    <!-- Main 3-Storey School Building Structure -->
    <rect x="14" y="20" width="62" height="70" fill="#F8FAFC" stroke="#64748B" stroke-width="2"/>
    
    <!-- LEVEL 3: THIRD FLOOR - VIBRANTLY HIGHLIGHTED -->
    <rect x="14" y="20" width="62" height="23" fill="#FEF08A" stroke="#F59E0B" stroke-width="2.5"/>
    <!-- Warm Illuminated Windows on 3rd Floor -->
    <rect x="20" y="24" width="14" height="13" rx="2" fill="#FFFFFF" stroke="#D97706" stroke-width="1.5"/>
    <line x1="27" y1="24" x2="27" y2="37" stroke="#D97706" stroke-width="1"/>
    <line x1="20" y1="30.5" x2="34" y2="30.5" stroke="#D97706" stroke-width="1"/>
    <rect x="38" y="24" width="14" height="13" rx="2" fill="#FFFFFF" stroke="#D97706" stroke-width="1.5"/>
    <line x1="45" y1="24" x2="45" y2="37" stroke="#D97706" stroke-width="1"/>
    <line x1="38" y1="30.5" x2="52" y2="30.5" stroke="#D97706" stroke-width="1"/>
    <rect x="56" y="24" width="14" height="13" rx="2" fill="#FFFFFF" stroke="#D97706" stroke-width="1.5"/>
    <line x1="63" y1="24" x2="63" y2="37" stroke="#D97706" stroke-width="1"/>
    <line x1="56" y1="30.5" x2="70" y2="30.5" stroke="#D97706" stroke-width="1"/>
    
    <!-- Floor separator ledge -->
    <rect x="12" y="43" width="66" height="3" fill="#94A3B8"/>
    
    <!-- LEVEL 2: SECOND FLOOR (Middle Level - Standard Facade) -->
    <rect x="15" y="46" width="60" height="20" fill="#E2E8F0"/>
    <rect x="20" y="49" width="14" height="13" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    <line x1="27" y1="49" x2="27" y2="62" stroke="#64748B" stroke-width="1"/>
    <rect x="38" y="49" width="14" height="13" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    <line x1="45" y1="49" x2="45" y2="62" stroke="#64748B" stroke-width="1"/>
    <rect x="56" y="49" width="14" height="13" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    <line x1="63" y1="49" x2="63" y2="62" stroke="#64748B" stroke-width="1"/>
    
    <!-- Floor separator ledge -->
    <rect x="12" y="66" width="66" height="3" fill="#94A3B8"/>
    
    <!-- LEVEL 1: FIRST FLOOR (Ground Level with Entrance Doors) -->
    <rect x="15" y="69" width="60" height="21" fill="#CBD5E1"/>
    <rect x="20" y="72" width="12" height="14" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    <rect x="38" y="69" width="14" height="21" fill="#1E3A8A" stroke="#172554" stroke-width="1.5"/>
    <line x1="45" y1="69" x2="45" y2="90" stroke="#FFFFFF" stroke-width="1"/>
    <circle cx="43" cy="80" r="1" fill="#FACC15"/>
    <circle cx="47" cy="80" r="1" fill="#FACC15"/>
    <rect x="58" y="72" width="12" height="14" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    
    <!-- LEVEL BRACKETS ON RIGHT -->
    <!-- Third Floor Pointer: Glowing Golden Arrow pointing directly into 3rd floor -->
    <polygon points="78,31.5 84,25 84,38" fill="#EA580C"/>
    <rect x="84" y="22" width="14" height="19" rx="4" fill="#EA580C"/>
    <rect x="85.5" y="23.5" width="11" height="16" rx="3" fill="#FBBF24"/>
    <rect x="88" y="26" width="6" height="2.5" rx="1" fill="#9A3412"/>
    <rect x="88" y="30" width="6" height="2.5" rx="1" fill="#9A3412"/>
    <rect x="88" y="34" width="6" height="2.5" rx="1" fill="#9A3412"/>
    
    <!-- Second Floor (Muted Indicator) -->
    <rect x="84" y="47" width="13" height="16" rx="3" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
    <rect x="87.5" y="52" width="6" height="2" rx="1" fill="#94A3B8"/>
    <rect x="87.5" y="56" width="6" height="2" rx="1" fill="#94A3B8"/>
    
    <!-- First Floor (Muted Indicator) -->
    <rect x="84" y="70" width="13" height="16" rx="3" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
    <rect x="87.5" y="77" width="6" height="2" rx="1" fill="#94A3B8"/>
  </svg>\`,

  second_floor: \`<svg xmlns="http://www.w3.org/2000/svg" data-key="second_floor" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0F9FF"/>
    <rect x="0" y="90" width="100" height="10" rx="2" fill="#15803D"/>
    <!-- Roof -->
    <polygon points="45,4 38,16 52,16" fill="#DC2626"/>
    <rect x="41" y="14" width="8" height="6" fill="#FFFFFF" stroke="#991B1B" stroke-width="1"/>
    <circle cx="45" cy="17" r="2.2" fill="#FBBF24"/>
    <polygon points="12,20 45,8 78,20" fill="#B91C1C"/>
    <rect x="14" y="20" width="62" height="70" fill="#F8FAFC" stroke="#64748B" stroke-width="2"/>
    
    <!-- LEVEL 3: THIRD FLOOR (Muted Standard Facade) -->
    <rect x="15" y="21" width="60" height="22" fill="#E2E8F0"/>
    <rect x="20" y="24" width="14" height="13" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    <line x1="27" y1="24" x2="27" y2="37" stroke="#64748B" stroke-width="1"/>
    <rect x="38" y="24" width="14" height="13" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    <line x1="45" y1="24" x2="45" y2="37" stroke="#64748B" stroke-width="1"/>
    <rect x="56" y="24" width="14" height="13" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    <line x1="63" y1="24" x2="63" y2="37" stroke="#64748B" stroke-width="1"/>
    <rect x="12" y="43" width="66" height="3" fill="#94A3B8"/>
    
    <!-- LEVEL 2: SECOND FLOOR - VIBRANTLY HIGHLIGHTED -->
    <rect x="14" y="44" width="62" height="23" fill="#FEF08A" stroke="#F59E0B" stroke-width="2.5"/>
    <rect x="20" y="48" width="14" height="13" rx="2" fill="#FFFFFF" stroke="#D97706" stroke-width="1.5"/>
    <line x1="27" y1="48" x2="27" y2="61" stroke="#D97706" stroke-width="1"/>
    <line x1="20" y1="54.5" x2="34" y2="54.5" stroke="#D97706" stroke-width="1"/>
    <rect x="38" y="48" width="14" height="13" rx="2" fill="#FFFFFF" stroke="#D97706" stroke-width="1.5"/>
    <line x1="45" y1="48" x2="45" y2="61" stroke="#D97706" stroke-width="1"/>
    <line x1="38" y1="54.5" x2="52" y2="54.5" stroke="#D97706" stroke-width="1"/>
    <rect x="56" y="48" width="14" height="13" rx="2" fill="#FFFFFF" stroke="#D97706" stroke-width="1.5"/>
    <line x1="63" y1="48" x2="63" y2="61" stroke="#D97706" stroke-width="1"/>
    <line x1="56" y1="54.5" x2="70" y2="54.5" stroke="#D97706" stroke-width="1"/>
    <rect x="12" y="67" width="66" height="3" fill="#94A3B8"/>
    
    <!-- LEVEL 1: FIRST FLOOR (Ground Entrance) -->
    <rect x="15" y="70" width="60" height="20" fill="#CBD5E1"/>
    <rect x="20" y="73" width="12" height="14" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    <rect x="38" y="70" width="14" height="20" fill="#1E3A8A" stroke="#172554" stroke-width="1.5"/>
    <line x1="45" y1="70" x2="45" y2="90" stroke="#FFFFFF" stroke-width="1"/>
    <rect x="58" y="73" width="12" height="14" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    
    <!-- Indicator Arrow to Second Floor -->
    <rect x="84" y="24" width="13" height="16" rx="3" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
    <rect x="87.5" y="28" width="6" height="2" rx="1" fill="#94A3B8"/>
    <rect x="87.5" y="32" width="6" height="2" rx="1" fill="#94A3B8"/>
    <rect x="87.5" y="36" width="6" height="2" rx="1" fill="#94A3B8"/>
    
    <polygon points="78,55.5 84,49 84,62" fill="#EA580C"/>
    <rect x="84" y="46" width="14" height="19" rx="4" fill="#EA580C"/>
    <rect x="85.5" y="47.5" width="11" height="16" rx="3" fill="#FBBF24"/>
    <rect x="88" y="52" width="6" height="2.5" rx="1" fill="#9A3412"/>
    <rect x="88" y="57" width="6" height="2.5" rx="1" fill="#9A3412"/>
    
    <rect x="84" y="71" width="13" height="16" rx="3" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
    <rect x="87.5" y="78" width="6" height="2" rx="1" fill="#94A3B8"/>
  </svg>\`,

  first_floor: \`<svg xmlns="http://www.w3.org/2000/svg" data-key="first_floor" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0F9FF"/>
    <rect x="0" y="90" width="100" height="10" rx="2" fill="#15803D"/>
    <!-- Roof -->
    <polygon points="45,4 38,16 52,16" fill="#DC2626"/>
    <rect x="41" y="14" width="8" height="6" fill="#FFFFFF" stroke="#991B1B" stroke-width="1"/>
    <circle cx="45" cy="17" r="2.2" fill="#FBBF24"/>
    <polygon points="12,20 45,8 78,20" fill="#B91C1C"/>
    <rect x="14" y="20" width="62" height="70" fill="#F8FAFC" stroke="#64748B" stroke-width="2"/>
    
    <!-- LEVEL 3: THIRD FLOOR (Muted) -->
    <rect x="15" y="21" width="60" height="22" fill="#E2E8F0"/>
    <rect x="20" y="24" width="14" height="13" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    <rect x="38" y="24" width="14" height="13" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    <rect x="56" y="24" width="14" height="13" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    <rect x="12" y="43" width="66" height="3" fill="#94A3B8"/>
    
    <!-- LEVEL 2: SECOND FLOOR (Muted) -->
    <rect x="15" y="46" width="60" height="21" fill="#E2E8F0"/>
    <rect x="20" y="49" width="14" height="13" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    <rect x="38" y="49" width="14" height="13" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    <rect x="56" y="49" width="14" height="13" rx="2" fill="#BAE6FD" stroke="#64748B" stroke-width="1.5"/>
    <rect x="12" y="67" width="66" height="3" fill="#94A3B8"/>
    
    <!-- LEVEL 1: FIRST FLOOR - VIBRANTLY HIGHLIGHTED -->
    <rect x="14" y="68" width="62" height="23" fill="#FEF08A" stroke="#F59E0B" stroke-width="2.5"/>
    <rect x="20" y="72" width="12" height="15" rx="2" fill="#FFFFFF" stroke="#D97706" stroke-width="1.5"/>
    <rect x="38" y="69" width="14" height="21" fill="#1E3A8A" stroke="#B45309" stroke-width="2"/>
    <line x1="45" y1="69" x2="45" y2="90" stroke="#FFFFFF" stroke-width="1"/>
    <circle cx="43" cy="80" r="1.2" fill="#FACC15"/>
    <circle cx="47" cy="80" r="1.2" fill="#FACC15"/>
    <rect x="58" y="72" width="12" height="15" rx="2" fill="#FFFFFF" stroke="#D97706" stroke-width="1.5"/>
    
    <!-- Indicator Arrow to First Floor -->
    <rect x="84" y="24" width="13" height="16" rx="3" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
    <rect x="87.5" y="28" width="6" height="2" rx="1" fill="#94A3B8"/>
    <rect x="87.5" y="32" width="6" height="2" rx="1" fill="#94A3B8"/>
    <rect x="87.5" y="36" width="6" height="2" rx="1" fill="#94A3B8"/>
    <rect x="84" y="47" width="13" height="16" rx="3" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
    <rect x="87.5" y="52" width="6" height="2" rx="1" fill="#94A3B8"/>
    <rect x="87.5" y="56" width="6" height="2" rx="1" fill="#94A3B8"/>
    
    <polygon points="78,79.5 84,73 84,86" fill="#EA580C"/>
    <rect x="84" y="70" width="14" height="19" rx="4" fill="#EA580C"/>
    <rect x="85.5" y="71.5" width="11" height="16" rx="3" fill="#FBBF24"/>
    <rect x="88" y="78" width="6" height="3" rx="1" fill="#9A3412"/>
  </svg>\`,

  computer_room: \`<svg xmlns="http://www.w3.org/2000/svg" data-key="computer_room" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0F9FF"/>
    <!-- Classroom Wall & Floor -->
    <rect x="0" y="0" width="100" height="60" fill="#E0F2FE"/>
    <line x1="0" y1="60" x2="100" y2="60" stroke="#0284C7" stroke-width="1.5"/>
    <rect x="0" y="60" width="100" height="40" rx="2" fill="#E2E8F0"/>
    
    <!-- Wi-Fi / IT room banner on wall -->
    <rect x="36" y="8" width="28" height="12" rx="3" fill="#0284C7"/>
    <circle cx="50" cy="14" r="1.5" fill="#FFFFFF"/>
    <path d="M45,11 Q50,8 55,11" stroke="#38BDF8" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M43,8 Q50,4 57,8" stroke="#FFFFFF" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    
    <!-- Background Row of Desktop Computers -->
    <rect x="12" y="32" width="16" height="12" rx="1" fill="#1E293B"/>
    <rect x="13.5" y="33.5" width="13" height="9" fill="#38BDF8"/>
    <rect x="18" y="44" width="4" height="4" fill="#64748B"/>
    <rect x="42" y="32" width="16" height="12" rx="1" fill="#1E293B"/>
    <rect x="43.5" y="33.5" width="13" height="9" fill="#4ADE80"/>
    <rect x="48" y="44" width="4" height="4" fill="#64748B"/>
    <rect x="72" y="32" width="16" height="12" rx="1" fill="#1E293B"/>
    <rect x="73.5" y="33.5" width="13" height="9" fill="#A78BFA"/>
    <rect x="78" y="44" width="4" height="4" fill="#64748B"/>
    <rect x="6" y="48" width="88" height="5" rx="1" fill="#D97706"/>
    
    <!-- Foreground Computer Desks & Workstations -->
    <rect x="4" y="66" width="92" height="8" rx="2" fill="#B45309"/>
    
    <!-- Main Left Desktop PC (Front & Center) -->
    <rect x="14" y="46" width="28" height="19" rx="2" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
    <rect x="16" y="48" width="24" height="15" rx="1" fill="#0284C7"/>
    <rect x="18" y="50" width="10" height="2" fill="#FDE047"/>
    <rect x="18" y="53" width="16" height="2" fill="#FFFFFF"/>
    <rect x="18" y="56" width="13" height="2" fill="#4ADE80"/>
    <circle cx="34" cy="58" r="3" fill="#F43F5E"/>
    <rect x="26" y="65" width="4" height="5" fill="#64748B"/>
    <ellipse cx="28" cy="70" rx="8" ry="2" fill="#475569"/>
    <!-- Desktop Keyboard in front -->
    <polygon points="16,74 40,74 38,82 14,82" fill="#334155"/>
    <polygon points="17,75 39,75 37,81 15,81" fill="#1E293B"/>
    <line x1="18" y1="77" x2="38" y2="77" stroke="#94A3B8" stroke-width="1" stroke-dasharray="2 1"/>
    <line x1="16" y1="79" x2="36" y2="79" stroke="#94A3B8" stroke-width="1" stroke-dasharray="2 1"/>
    <!-- Mouse and Mousepad -->
    <rect x="43" y="74" width="7" height="9" rx="2" fill="#EF4444"/>
    <ellipse cx="46.5" cy="78" rx="2.5" ry="3.5" fill="#0284C7"/>
    <!-- Desktop CPU Tower -->
    <rect x="53" y="54" width="10" height="24" rx="2" fill="#1E293B" stroke="#475569" stroke-width="1"/>
    <circle cx="58" cy="58" r="1.5" fill="#22C55E"/>
    <rect x="55" y="62" width="6" height="1.5" fill="#64748B"/>
    <rect x="55" y="65" width="6" height="1.5" fill="#64748B"/>
    
    <!-- Right Workstation: Student working at desktop with headphones -->
    <rect x="66" y="48" width="24" height="17" rx="2" fill="#0F172A"/>
    <rect x="68" y="50" width="20" height="13" fill="#38BDF8"/>
    <circle cx="78" cy="62" r="8" fill="#FED7AA"/>
    <path d="M72,62 A6,6 0 0,1 84,62" stroke="#EA580C" stroke-width="3" fill="none"/>
    <rect x="70" y="59" width="3" height="6" rx="1.5" fill="#F97316"/>
    <rect x="83" y="59" width="3" height="6" rx="1.5" fill="#F97316"/>
    <rect x="71" y="70" width="16" height="18" rx="4" fill="#2563EB"/>
    <rect x="77" y="88" width="4" height="8" fill="#1E293B"/>
    <line x1="72" y1="96" x2="86" y2="96" stroke="#1E293B" stroke-width="3" stroke-linecap="round"/>
  </svg>\`,

  science_lab: \`<svg xmlns="http://www.w3.org/2000/svg" data-key="science_lab" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#F0FDF4"/>
    <!-- Lab Background Wall -->
    <rect x="0" y="0" width="100" height="54" fill="#DCFCE7"/>
    <!-- Science Chalkboard with Atom Model -->
    <rect x="28" y="6" width="44" height="24" rx="2" fill="#14532D" stroke="#854D0E" stroke-width="2"/>
    <circle cx="50" cy="18" r="3" fill="#FACC15"/>
    <ellipse cx="50" cy="18" rx="14" ry="5" fill="none" stroke="#BBF7D0" stroke-width="1" transform="rotate(-30 50 18)"/>
    <ellipse cx="50" cy="18" rx="14" ry="5" fill="none" stroke="#BBF7D0" stroke-width="1" transform="rotate(30 50 18)"/>
    
    <!-- Heavy Chemical Workbench / Laboratory Table -->
    <rect x="0" y="54" width="100" height="8" fill="#0F172A"/>
    <rect x="0" y="62" width="100" height="38" fill="#334155"/>
    <rect x="6" y="66" width="40" height="28" rx="2" fill="#1E293B"/>
    <rect x="54" y="66" width="40" height="28" rx="2" fill="#1E293B"/>
    <circle cx="42" cy="80" r="1.5" fill="#E2E8F0"/>
    <circle cx="58" cy="80" r="1.5" fill="#E2E8F0"/>
    
    <!-- 1. Compound Microscope on Left -->
    <ellipse cx="20" cy="54" rx="8" ry="3" fill="#1E293B"/>
    <path d="M18,52 C14,40 22,26 26,26" stroke="#475569" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <rect x="24" y="20" width="5" height="12" transform="rotate(-20 24 20)" fill="#0F172A"/>
    <circle cx="28" cy="18" r="2.5" fill="#94A3B8"/>
    <rect x="16" y="38" width="12" height="3" rx="1" fill="#0F172A"/>
    <line x1="20" y1="38" x2="20" y2="42" stroke="#CBD5E1" stroke-width="2"/>
    <circle cx="16" cy="44" r="1.5" fill="#F59E0B"/>
    
    <!-- 2. Test Tube Rack in Center with 4 Colorful Solutions -->
    <rect x="36" y="38" width="34" height="16" fill="none" stroke="#D97706" stroke-width="2"/>
    <line x1="36" y1="44" x2="70" y2="44" stroke="#D97706" stroke-width="2"/>
    <line x1="36" y1="53" x2="70" y2="53" stroke="#D97706" stroke-width="2.5"/>
    
    <!-- Test Tube 1: Cobalt Blue -->
    <rect x="39" y="32" width="5" height="20" rx="2.5" fill="#FFFFFF" stroke="#64748B" stroke-width="0.8"/>
    <rect x="39.5" y="40" width="4" height="11" rx="2" fill="#2563EB"/>
    <!-- Test Tube 2: Ruby Red -->
    <rect x="47" y="30" width="5" height="22" rx="2.5" fill="#FFFFFF" stroke="#64748B" stroke-width="0.8"/>
    <rect x="47.5" y="38" width="4" height="13" rx="2" fill="#DC2626"/>
    <!-- Test Tube 3: Emerald Green -->
    <rect x="55" y="33" width="5" height="19" rx="2.5" fill="#FFFFFF" stroke="#64748B" stroke-width="0.8"/>
    <rect x="55.5" y="42" width="4" height="9" rx="2" fill="#16A34A"/>
    <!-- Test Tube 4: Amber Yellow -->
    <rect x="63" y="31" width="5" height="21" rx="2.5" fill="#FFFFFF" stroke="#64748B" stroke-width="0.8"/>
    <rect x="63.5" y="39" width="4" height="12" rx="2" fill="#F59E0B"/>
    
    <!-- 3. Erlenmeyer Beaker / Flask with Bubbling Solution on Right -->
    <path d="M78,34 L84,34 L92,54 L72,54 Z" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/>
    <polygon points="74,53 90,53 87,44 76,44" fill="#A855F7"/>
    <circle cx="80" cy="40" r="1.5" fill="#FFFFFF"/>
    <circle cx="83" cy="36" r="1.2" fill="#FFFFFF"/>
    <circle cx="81" cy="30" r="2" fill="#A855F7" opacity="0.8"/>
    <circle cx="85" cy="26" r="1.5" fill="#C084FC" opacity="0.8"/>
    
    <!-- 4. Safety Lab Goggles resting on table -->
    <ellipse cx="44" cy="58" rx="5" ry="3" fill="#67E8F9" stroke="#0284C7" stroke-width="1.2"/>
    <ellipse cx="54" cy="58" rx="5" ry="3" fill="#67E8F9" stroke="#0284C7" stroke-width="1.2"/>
    <line x1="49" y1="58" x2="49" y2="58" stroke="#0284C7" stroke-width="2"/>
    <path d="M39,58 Q34,58 36,61" stroke="#0284C7" stroke-width="1.5" fill="none"/>
    <path d="M59,58 Q64,58 62,61" stroke="#0284C7" stroke-width="1.5" fill="none"/>
  </svg>\`,

  music_room: \`<svg xmlns="http://www.w3.org/2000/svg" data-key="music_room" viewBox="0 0 100 100" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" rx="16" fill="#FFFBEB"/>
    <rect x="0" y="0" width="100" height="66" fill="#FEF3C7"/>
    <line x1="0" y1="66" x2="100" y2="66" stroke="#D97706" stroke-width="1.5"/>
    <rect x="0" y="66" width="100" height="34" fill="#FDE68A"/>
    <path d="M38,20 L38,12 L50,8 L50,16" stroke="#EA580C" stroke-width="2" fill="none"/>
    <circle cx="38" cy="20" r="3" fill="#EA580C"/>
    <circle cx="50" cy="16" r="3" fill="#EA580C"/>
    <!-- Upright Piano in Center -->
    <rect x="20" y="32" width="42" height="42" rx="3" fill="#1E293B" stroke="#0F172A" stroke-width="1.5"/>
    <rect x="30" y="24" width="22" height="12" fill="#FFFFFF" stroke="#64748B" stroke-width="1"/>
    <line x1="34" y1="28" x2="48" y2="28" stroke="#1E293B" stroke-width="1"/>
    <line x1="34" y1="32" x2="46" y2="32" stroke="#1E293B" stroke-width="1"/>
    <rect x="18" y="52" width="46" height="8" rx="1" fill="#FFFFFF" stroke="#0F172A" stroke-width="1"/>
    <line x1="24" y1="52" x2="24" y2="60" stroke="#0F172A" stroke-width="0.8"/>
    <line x1="30" y1="52" x2="30" y2="60" stroke="#0F172A" stroke-width="0.8"/>
    <line x1="36" y1="52" x2="36" y2="60" stroke="#0F172A" stroke-width="0.8"/>
    <line x1="42" y1="52" x2="42" y2="60" stroke="#0F172A" stroke-width="0.8"/>
    <line x1="48" y1="52" x2="48" y2="60" stroke="#0F172A" stroke-width="0.8"/>
    <line x1="54" y1="52" x2="54" y2="60" stroke="#0F172A" stroke-width="0.8"/>
    <line x1="60" y1="52" x2="60" y2="60" stroke="#0F172A" stroke-width="0.8"/>
    <rect x="22" y="52" width="2.5" height="5" fill="#0F172A"/>
    <rect x="28" y="52" width="2.5" height="5" fill="#0F172A"/>
    <rect x="40" y="52" width="2.5" height="5" fill="#0F172A"/>
    <rect x="46" y="52" width="2.5" height="5" fill="#0F172A"/>
    <rect x="52" y="52" width="2.5" height="5" fill="#0F172A"/>
    <!-- Guitar on Stand -->
    <path d="M76,46 C70,46 68,54 74,60 C68,66 70,78 78,78 C86,78 88,66 82,60 C88,54 86,46 80,46 Z" fill="#D97706"/>
    <circle cx="78" cy="62" r="3.5" fill="#78350F"/>
    <rect x="77" y="30" width="2" height="18" fill="#B45309"/>
    <polygon points="76,30 80,30 79,24 77,24" fill="#78350F"/>
  </svg>\`,
`;

// Insert new SVGs before writer:
content = content.replace("writer: `<svg xmlns=\"http://www.w3.org/2000/svg\" data-key=\"writer\"", newSchoolSvgs + "\n  writer: `<svg xmlns=\"http://www.w3.org/2000/svg\" data-key=\"writer\"");

// Add priority mappings in resolveCanonicalKey right at the top
const priorityMappings = `
  // Specialist School Rooms & Multi-Storey Floors (Highest Priority)
  if (w.includes("third floor") || w.includes("3rd floor")) return "third_floor";
  if (w.includes("second floor") || w.includes("2nd floor")) return "second_floor";
  if (w.includes("first floor") || w.includes("1st floor") || w.includes("ground floor")) return "first_floor";
  if (w.includes("computer room") || w.includes("computer lab") || w.includes("it lab") || w.includes("it room")) return "computer_room";
  if (w.includes("science lab") || w.includes("science laboratory") || w.includes("laboratory") || w === "lab") return "science_lab";
  if (w.includes("music room")) return "music_room";
  if (w.includes("art room")) return "art";
`;

content = content.replace(
  "export function resolveCanonicalKey(rawWord: string): string | null {\n  const w = (rawWord || \x27\x27).trim().toLowerCase();\n\n  // Direct exact match\n  if (SVG_ICONS[w]) return w;",
  "export function resolveCanonicalKey(rawWord: string): string | null {\n  const w = (rawWord || \x27\x27).trim().toLowerCase();\n\n  // Direct exact match\n  if (SVG_ICONS[w]) return w;\n" + priorityMappings
);

// Fix the w.includes("hi") issue where "third" matched "wave"
content = content.replace(
  'if (w.includes("hello") || w.includes("hi") || w.includes("wave")) return "wave";',
  'if (w.includes("hello") || /\\bhi\\b/.test(w) || w.includes("wave")) return "wave";'
);

fs.writeFileSync("src/data/curriculum/illustrations.ts", content, "utf8");
console.log("Successfully updated illustrations.ts!");
