import type { DataRecord, RecordType } from "@/types/record";

const STORAGE_KEY = "blackcube.records.v1";

let memory: DataRecord[] | null = null;

function uid() {
  return `rec_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

const FIRST = [
  "Aarav",
  "Priya",
  "Rahul",
  "Sneha",
  "Vikram",
  "Meera",
  "Arjun",
  "Ananya",
  "Kabir",
  "Isha",
  "Rohan",
  "Nisha",
  "Dev",
  "Tara",
  "Manish",
  "Kavya",
];
const LAST = [
  "Sharma",
  "Verma",
  "Iyer",
  "Kapoor",
  "Nair",
  "Reddy",
  "Bose",
  "Chopra",
  "Menon",
  "Gupta",
];
const ORGS = [
  "Delhi Public School",
  "BlackCube Solutions",
  "IIT Bombay",
  "Vidya Institute",
  "TechNova Labs",
  "Sunrise Academy",
  "Orion Consulting",
];
const CITIES = ["Mumbai", "Pune", "Bengaluru", "Delhi", "Hyderabad", "Chennai", "Jaipur"];
const TYPES: RecordType[] = [
  "Student",
  "Student",
  "Student",
  "Teacher",
  "Teacher",
  "Mentor",
  "Job Seeker",
  "Institute",
  "Other",
];

function seed(): DataRecord[] {
  const now = Date.now();
  return Array.from({ length: 46 }, (_, i) => {
    const first = FIRST[i % FIRST.length]!;
    const last = LAST[i % LAST.length]!;
    const type = TYPES[i % TYPES.length]!;
    return {
      id: uid(),
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.com`,
      phone: `+91 9${String(800000000 + i * 137171).slice(0, 9)}`,
      address: `${12 + i} MG Road, ${CITIES[i % CITIES.length]}`,
      organisation: ORGS[i % ORGS.length]!,
      type,
      linkStatus: i % 5 === 0 ? "Failed" : i % 3 === 0 ? "Pending" : "Sent",
      downloadStatus: i % 4 === 0 ? "Not Downloaded" : "Downloaded",
      createdAt: new Date(now - i * 19 * 60 * 60 * 1000).toISOString(),
    } satisfies DataRecord;
  });
}

function persist(records: DataRecord[]) {
  memory = records;
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    /* storage unavailable — memory copy still serves this session */
  }
}

/** Reads the persisted collection, seeding demo data on first run. */
export function readAll(): DataRecord[] {
  if (memory) return memory;
  if (typeof window === "undefined") {
    memory = seed();
    return memory;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DataRecord[];
      if (Array.isArray(parsed)) {
        memory = parsed;
        return memory;
      }
    }
  } catch {
    /* fall through to seed */
  }
  const seeded = seed();
  persist(seeded);
  return seeded;
}

export function writeAll(records: DataRecord[]) {
  persist(records);
}

export function newId() {
  return uid();
}
