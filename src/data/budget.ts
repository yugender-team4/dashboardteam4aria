// Auto-ported from ARIA Cost sheet (Meeting held on 19-01-26, Team4 corporate office)
// Row shape: [sNo, description, amount, rateBua, rateSale, rateNyla, diffVsNyla, category]
export type BudgetCategory =
  "Structure"
  | "Finishes"
  | "MEP"
  | "External"
  | "Soft Costs"
  | "Contingency & Statutory"

export interface BudgetItem {
  sNo: string
  description: string
  amount: number
  rateBua: number | string | null
  rateSale: number | string | null
  rateNyla: number | string | null
  diffVsNyla: number | null
  category: BudgetCategory
}

export const BUDGET_ITEMS: BudgetItem[] = [
  { sNo: "1", description: "Earthwork", amount: 92375156.48, rateBua: 10.849508, rateSale: 15.535393, rateNyla: 17.833707, diffVsNyla: -2.298314, category: "Structure" },
  { sNo: "2", description: "PCC", amount: 54060000, rateBua: 6.349374, rateSale: 9.091658, rateNyla: "Included in RCC Cost", diffVsNyla: 9.091658, category: "Structure" },
  { sNo: "3", description: "Steel Reinforcement", amount: 4517968000, rateBua: 530.637609, rateSale: 759.819109, rateNyla: 588.675071, diffVsNyla: 171.144038, category: "Structure" },
  { sNo: "4", description: "Formwork", amount: 2400124369.183019, rateBua: 281.895812, rateSale: 403.646143, rateNyla: 386.679267, diffVsNyla: 16.966877, category: "Structure" },
  { sNo: "5", description: "RCC+Misc Masonry +Plaster", amount: 4077898908.52703, rateBua: 478.951274, rateSale: 685.809531, rateNyla: 595.124128, diffVsNyla: 90.685403, category: "Structure" },
  { sNo: "6", description: "Water Proofing", amount: 160350604.65992, rateBua: 18.833259, rateSale: 26.967312, rateNyla: 39.47648, diffVsNyla: -12.509168, category: "Finishes" },
  { sNo: "7", description: "Flooring", amount: 1067661923.055674, rateBua: 125.397429, rateSale: 179.556369, rateNyla: 173.329007, diffVsNyla: 6.227363, category: "Finishes" },
  { sNo: "8", description: "Doors", amount: 666506946.56, rateBua: 78.281575, rateSale: 112.091257, rateNyla: 98.546909, diffVsNyla: 13.544348, category: "Finishes" },
  { sNo: "9", description: "Windows", amount: 346059937.44, rateBua: 40.644913, rateSale: 58.199384, rateNyla: 67.208089, diffVsNyla: -9.008705, category: "Finishes" },
  { sNo: "10", description: "Railing and Shaft Covering", amount: 253548809.312, rateBua: 29.779435, rateSale: 42.641123, rateNyla: 35.831237, diffVsNyla: 6.809886, category: "Finishes" },
  { sNo: "11", description: "Painting Works", amount: 817250125.74, rateBua: 95.986437, rateSale: 137.44282, rateNyla: 94.749186, diffVsNyla: 42.693634, category: "Finishes" },
  { sNo: "12", description: "False Ceiling", amount: 151655974, rateBua: 17.81207, rateSale: 25.505074, rateNyla: 28.601456, diffVsNyla: -3.096383, category: "Finishes" },
  { sNo: "13", description: "Internal Electrical Works", amount: 818321026.01616, rateBua: 96.112215, rateSale: 137.622921, rateNyla: 114.578514, diffVsNyla: 23.044407, category: "MEP" },
  { sNo: "14", description: "External Electrical Works", amount: 953301813.81264, rateBua: 111.965777, rateSale: 160.323609, rateNyla: 140.80834, diffVsNyla: 19.515269, category: "MEP" },
  { sNo: "15", description: "ELV Works(CCTV,FAPA,BMS,Communication)", amount: 134980787.79648, rateBua: 15.853561, rateSale: 22.700688, rateNyla: 12.619254, diffVsNyla: 10.081434, category: "MEP" },
  { sNo: "16", description: "Plumbing Works and Water Meter Works", amount: 818321026.01616, rateBua: 96.112215, rateSale: 137.622921, rateNyla: 109.583807, diffVsNyla: 28.039113, category: "MEP" },
  { sNo: "17", description: "Sewage Treatment Plant", amount: 99120000, rateBua: 11.641694, rateSale: 16.669722, rateNyla: 10.685502, diffVsNyla: 5.98422, category: "MEP" },
  { sNo: "18", description: "Water Treatment Plant", amount: 21850015.024555, rateBua: 2.566295, rateSale: 3.674674, rateNyla: 1.67915, diffVsNyla: 1.995524, category: "MEP" },
  { sNo: "19", description: "OWC and Garbage Chute", amount: 42181496.1864, rateBua: 4.954238, rateSale: 7.093965, rateNyla: "Not in NYLA", diffVsNyla: 7.093965, category: "MEP" },
  { sNo: "20", description: "Elevators", amount: 755200000, rateBua: 88.698619, rateSale: 127.007405, rateNyla: 78.206344, diffVsNyla: 48.80106, category: "MEP" },
  { sNo: "21", description: "Fire Fighting Works", amount: 759266931.3552, rateBua: 89.176282, rateSale: 127.69137, rateNyla: 103.404963, diffVsNyla: 24.286407, category: "MEP" },
  { sNo: "22", description: "LPG Gas Bank System", amount: 43400000, rateBua: 5.097352, rateSale: 7.29889, rateNyla: 7.237871, diffVsNyla: 0.061018, category: "MEP" },
  { sNo: "23", description: "Copper Piping Works", amount: 210907480.932, rateBua: 24.77119, rateSale: 35.469825, rateNyla: 29.101799, diffVsNyla: 6.368026, category: "MEP" },
  { sNo: "24", description: "Mechanical Ventilation Works", amount: 101235590.84736, rateBua: 11.890171, rateSale: 17.025516, rateNyla: 18.186686, diffVsNyla: -1.16117, category: "MEP" },
  { sNo: "25", description: "EV Charging Works", amount: 210907480.932, rateBua: 24.77119, rateSale: 35.469825, rateNyla: "Included in External Electrical", diffVsNyla: 35.469825, category: "MEP" },
  { sNo: "26", description: "Solar Provisions 280 Kw", amount: 7423943.328806, rateBua: 0.871946, rateSale: 1.248538, rateNyla: 1.6, diffVsNyla: -0.351462, category: "MEP" },
  { sNo: "27", description: "Façade Lights", amount: 25055808.734722, rateBua: 2.942817, rateSale: 4.213815, rateNyla: "Not in NYLA", diffVsNyla: 4.213815, category: "MEP" },
  { sNo: "28", description: "Compound Wall", amount: 25308897.71184, rateBua: 2.972543, rateSale: 4.256379, rateNyla: 1.027317, diffVsNyla: 3.229062, category: "External" },
  { sNo: "29", description: "Softscape and Irrigation Works", amount: 59054094.66096, rateBua: 6.935933, rateSale: 9.931551, rateNyla: 10.476856, diffVsNyla: -0.545305, category: "External" },
  { sNo: "30", description: "Hardscape Works", amount: 84362992.3728, rateBua: 9.908476, rateSale: 14.18793, rateNyla: 15.522561, diffVsNyla: -1.334631, category: "External" },
  { sNo: "31", description: "Signages and Branding", amount: 8436299.23728, rateBua: 0.990848, rateSale: 1.418793, rateNyla: 8.435035, diffVsNyla: -7.016242, category: "External" },
  { sNo: "32", description: "Car Parking", amount: 8436299.23728, rateBua: 0.990848, rateSale: 1.418793, rateNyla: null, diffVsNyla: 1.418793, category: "External" },
  { sNo: "33", description: "External MEP Works", amount: 84362992.3728, rateBua: 9.908476, rateSale: 14.18793, rateNyla: 3.301095, diffVsNyla: 10.886835, category: "External" },
  { sNo: "34", description: "Main Gate Works", amount: 25308897.71184, rateBua: 2.972543, rateSale: 4.256379, rateNyla: 5.612523, diffVsNyla: -1.356144, category: "External" },
  { sNo: "35", description: "Amenities Block & Club Houses", amount: 408408922.41552, rateBua: 47.967833, rateSale: 68.68506, rateNyla: 109.265657, diffVsNyla: -40.580596, category: "External" },
  { sNo: "36", description: "Ground Floor Amenities", amount: 84362992.3728, rateBua: 9.908476, rateSale: 14.18793, rateNyla: 20.989379, diffVsNyla: -6.801449, category: "External" },
  { sNo: "b", description: "Salaries Partners", amount: 475688800, rateBua: 55.869888, rateSale: 80, rateNyla: 127.01337, diffVsNyla: null, category: "Soft Costs" },
  { sNo: "c", description: "Finance Cost", amount: 891916500, rateBua: 104.756041, rateSale: 150, rateNyla: 182.879581, diffVsNyla: null, category: "Soft Costs" },
  { sNo: "d", description: "Sales Commission", amount: 594611000, rateBua: 69.83736, rateSale: 100, rateNyla: 66.08, diffVsNyla: null, category: "Soft Costs" },
  { sNo: "e", description: "Marketing Expenses", amount: 594611000, rateBua: 69.83736, rateSale: 100, rateNyla: 66.08, diffVsNyla: null, category: "Soft Costs" },
  { sNo: "f", description: "Occupancy Expenses", amount: 118922200, rateBua: 13.967472, rateSale: 20, rateNyla: 10, diffVsNyla: null, category: "Soft Costs" },
  { sNo: "g", description: "Handing Over & Post Handing Over Expenses", amount: 178383300, rateBua: 20.951208, rateSale: 30, rateNyla: 50, diffVsNyla: null, category: "Soft Costs" },
  { sNo: "h", description: "Consultancy plus", amount: 891916500, rateBua: 104.756041, rateSale: 150, rateNyla: null, diffVsNyla: null, category: "Soft Costs" },
  { sNo: "39", description: "Contingencies @ 5%", amount: 1207051292.201663, rateBua: 141.76878, rateSale: 202.99848, rateNyla: 0, diffVsNyla: null, category: "Contingency & Statutory" },
  { sNo: "40", description: "Consultants", amount: 513218137.2114, rateBua: 60.277728, rateSale: 86.311578, rateNyla: 110.346229, diffVsNyla: null, category: "Contingency & Statutory" },
  { sNo: "41", description: "Statutory Approvals", amount: 1273309438, rateBua: 149.550833, rateSale: 214.141588, rateNyla: 135.495502, diffVsNyla: null, category: "Contingency & Statutory" },
  { sNo: "42", description: "Overheads (Salaries, Electricity, Security etc.)", amount: 970761988.75, rateBua: 114.016483, rateSale: 163.260012, rateNyla: 118.602706, diffVsNyla: null, category: "Contingency & Statutory" },
]

export const budgetSummary = {
  buaSft: 8514225,
  salableSftAria: 5946110,
  salableSftNyla: 1546020,
  totalConstruction: 20394976544.03325,
  netTotal: 24141025844.03325,
  grandTotal: 28105366700.196312,
}

export const budgetCategoryOrder: BudgetCategory[] = [
  "Structure",
  "Finishes",
  "MEP",
  "External",
  "Soft Costs",
  "Contingency & Statutory",
]
