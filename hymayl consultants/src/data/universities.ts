export interface University {
  id: string;
  name: string;
  chineseName: string;
  category: 'MBBS' | 'BDS' | 'TECH_ENGINEERING' | 'SCHOLARSHIP_POSTGRAD';
  city: string;
  province: string;
  moeListed: boolean;
  pmdcApproved: boolean;
  ranking: string;
  tuitionFeeRMB: number;
  hostelFeeRMB: number;
  intakeSeason: 'March 2025' | 'September 2025' | 'Both Intakes Open';
  seatsRemaining: number;
  hospitalBeds?: number;
  language: '100% English Medium' | 'Bilingual (English + HSK)';
  scholarshipCoverage?: string;
  features: string[];
  image: string;
  badge?: string;
}

export const RMB_TO_PKR_RATE = 39.5;

export const UNIVERSITIES: University[] = [
  {
    id: 'shihezi-university',
    name: 'Shihezi University School of Medicine',
    chineseName: '石河子大学医学院',
    category: 'MBBS',
    city: 'Shihezi',
    province: 'Xinjiang',
    moeListed: true,
    pmdcApproved: true,
    ranking: 'Top 30 Medical in China | Double First-Class',
    tuitionFeeRMB: 30000,
    hostelFeeRMB: 4000,
    intakeSeason: 'September 2025',
    seatsRemaining: 18,
    hospitalBeds: 5200,
    language: '100% English Medium',
    scholarshipCoverage: 'Performance based up to 15,000 RMB/yr',
    features: [
      'Official MOE English Medium (Gazetted)',
      '1,800+ Pakistani Alumni Practicing in Pakistan',
      'Affiliated 4 Grade-A Tertiary Hospitals',
      'Dedicated Halal Mess on Campus',
      'PM&DC / USMLE / PLAB Eligible'
    ],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    badge: 'Most Popular for Pakistanis'
  },
  {
    id: 'ningxia-medical-university',
    name: 'Ningxia Medical University (NXMU)',
    chineseName: '宁夏医科大学',
    category: 'MBBS',
    city: 'Yinchuan',
    province: 'Ningxia',
    moeListed: true,
    pmdcApproved: true,
    ranking: 'Top Tier Medical Academy in Northwest China',
    tuitionFeeRMB: 29800,
    hostelFeeRMB: 3600,
    intakeSeason: 'Both Intakes Open',
    seatsRemaining: 14,
    hospitalBeds: 4600,
    language: '100% English Medium',
    scholarshipCoverage: 'Ningxia Silk Road Scholarship Available',
    features: [
      'Heart of China’s Muslim Cultural Region (100% Halal City)',
      'Highest Passing Ratio in PM&DC NLE Exam',
      'State-of-the-Art Robotic Simulation Lab',
      'Direct Flights from Urumqi / Beijing',
      'Separate Girls Hostel with Biometric Security'
    ],
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',
    badge: '100% Halal Environment'
  },
  {
    id: 'zhengzhou-university',
    name: 'Zhengzhou University (ZZU)',
    chineseName: '郑州大学',
    category: 'MBBS',
    city: 'Zhengzhou',
    province: 'Henan',
    moeListed: true,
    pmdcApproved: true,
    ranking: 'National "Double First-Class" | World Top 400',
    tuitionFeeRMB: 35000,
    hostelFeeRMB: 4500,
    intakeSeason: 'September 2025',
    seatsRemaining: 9,
    hospitalBeds: 10000,
    language: '100% English Medium',
    scholarshipCoverage: 'Presidential Full & Partial Scholarships',
    features: [
      'First Affiliated Hospital is World’s Largest with 10,000+ Beds',
      'Global Recognition by WHO, ECFMG (USA), PM&DC, GMC (UK)',
      'High-speed train nexus directly connected to Beijing & Shanghai',
      'Comprehensive research laboratories and clinical rotations'
    ],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    badge: 'Highest Global Prestige'
  },
  {
    id: 'jinzhou-medical-university',
    name: 'Jinzhou Medical University (JZMU)',
    chineseName: '锦州医科大学',
    category: 'MBBS',
    city: 'Jinzhou',
    province: 'Liaoning',
    moeListed: true,
    pmdcApproved: true,
    ranking: 'Historic Medical Institution Est. 1946',
    tuitionFeeRMB: 32000,
    hostelFeeRMB: 3800,
    intakeSeason: 'March 2025',
    seatsRemaining: 22,
    hospitalBeds: 3800,
    language: '100% English Medium',
    scholarshipCoverage: 'Provincial Government Grant up to 10,000 RMB',
    features: [
      'March 2025 Spring Intake Open (Save 6 Months)',
      'Highly economical living costs in Liaoning province',
      'Over 25 years of teaching international medical scholars',
      'BDS & Pharmacy options also available'
    ],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    badge: 'March 2025 Intake Open'
  },
  {
    id: 'wenzhou-medical-university',
    name: 'Wenzhou Medical University (WMU)',
    chineseName: '温州医科大学',
    category: 'BDS',
    city: 'Wenzhou',
    province: 'Zhejiang',
    moeListed: true,
    pmdcApproved: true,
    ranking: 'China Top 3 for Ophthalmology & Dentistry (BDS)',
    tuitionFeeRMB: 30000,
    hostelFeeRMB: 4000,
    intakeSeason: 'September 2025',
    seatsRemaining: 11,
    hospitalBeds: 4200,
    language: '100% English Medium',
    features: [
      'Premier hub for BDS (Dental Surgery) & Ophthalmology',
      'Located in prosperous coastal Zhejiang province',
      'International clinic rotations with foreign faculty',
      'Recognized by British General Dental Council & PM&DC'
    ],
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80',
    badge: 'Top Choice for BDS'
  },
  {
    id: 'zhejiang-university-tech',
    name: 'Zhejiang University (ZJU) — Computer & AI',
    chineseName: '浙江大学',
    category: 'TECH_ENGINEERING',
    city: 'Hangzhou',
    province: 'Zhejiang',
    moeListed: true,
    pmdcApproved: false,
    ranking: 'World #44 QS Ranking | China C9 Ivy League',
    tuitionFeeRMB: 28800,
    hostelFeeRMB: 6000,
    intakeSeason: 'September 2025',
    seatsRemaining: 7,
    language: '100% English Medium',
    scholarshipCoverage: 'CSC Type A & B Full Scholarship (Tuition + Free Hostel + 3,000 RMB/mo)',
    features: [
      'Adjacent to Alibaba Global HQ in Hangzhou (direct internships)',
      'World-leading laboratories in Generative AI, Robotics & Quantum',
      'Dual-Track placement: Silicon Valley, Shenzhen, or Europe',
      'Graduates employed at Microsoft, ByteDance, Huawei'
    ],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    badge: 'C9 Ivy League Tech'
  },
  {
    id: 'harbin-institute-tech',
    name: 'Harbin Institute of Technology (HIT)',
    chineseName: '哈尔滨工业大学',
    category: 'TECH_ENGINEERING',
    city: 'Harbin',
    province: 'Heilongjiang',
    moeListed: true,
    pmdcApproved: false,
    ranking: 'World #5 Best Engineering University (US News)',
    tuitionFeeRMB: 26000,
    hostelFeeRMB: 3500,
    intakeSeason: 'September 2025',
    seatsRemaining: 15,
    language: '100% English Medium',
    scholarshipCoverage: 'Chinese Government Scholarship (CSC) 100% Covered',
    features: [
      'Global pioneer in Aerospace, Robotics, Civil & Software Engineering',
      'Full government research funding and English mentorship',
      'Massive campus with heated modern indoor student facilities',
      'Highest international graduate employment record'
    ],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    badge: 'World #5 Engineering'
  },
  {
    id: 'xian-jiaotong-university',
    name: 'Xi’an Jiaotong University (XJTU) — CSC Master & PhD',
    chineseName: '西安交通大学',
    category: 'SCHOLARSHIP_POSTGRAD',
    city: 'Xi’an',
    province: 'Shaanxi',
    moeListed: true,
    pmdcApproved: true,
    ranking: 'China C9 Ivy League | World Top 150',
    tuitionFeeRMB: 0,
    hostelFeeRMB: 0,
    intakeSeason: 'September 2025',
    seatsRemaining: 25,
    language: '100% English Medium',
    scholarshipCoverage: '100% Free Tuition + Free Single Room Hostel + 3,500 RMB/month Cash Stipend',
    features: [
      'Official CSC Silk Road & University Postgrad Program',
      'Full monthly stipend paid directly into student ICBC bank account',
      'Professor acceptance letter assistance by Humayl advisory team',
      'End-to-end research proposal crafting & interview coaching'
    ],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    badge: '100% Fully Funded + Stipend'
  }
];
