import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBriefcase,
  faBolt,
  faSeedling,
  faRocket,
  faCoins,
  faBookOpen,
  faPen,
  faCertificate,
  faHeart,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

export interface PurposeOption {
  value: string;
  label: string;
  icon: IconDefinition;
  description: string;
}

export interface InterestOption {
  value: string;
  label: string;
}

export const PURPOSE_OPTIONS: PurposeOption[] = [
  {
    value: 'job_seeking',
    label: '취업 · 이직',
    icon: faBriefcase,
    description: '면접 준비, 포트폴리오, 역량 증명',
  },
  {
    value: 'efficiency',
    label: '업무 역량',
    icon: faBolt,
    description: 'AI·도구 활용, 자동화, 생산성 향상, 실무 강화, 커뮤니케이션',
  },
  {
    value: 'new_start',
    label: '새로운 시작',
    icon: faSeedling,
    description: '처음 배우는 분야, 최신 기술, 입문/비전공자',
  },
  {
    value: 'advanced',
    label: '심화 역량',
    icon: faRocket,
    description: '전문성 강화, 고급 실무 역량, 시니어 레벨, 리더십',
  },
  {
    value: 'side_project',
    label: '부업 · 사이드 프로젝트',
    icon: faCoins,
    description: '내 서비스 만들기, 추가 수입, 재테크',
  },
  {
    value: 'certification',
    label: '자격증 · 시험',
    icon: faCertificate,
    description: '공인 시험/자격 취득 (IT, 어학, 전문)',
  },
  {
    value: 'self_development',
    label: '취미 · 교양 · 자기계발',
    icon: faHeart,
    description: '업무 외 개인적 성장 (외국어, 예술, 건강, 마인드 등)',
  },
  {
    value: 'knowledge_sharing',
    label: '지식공유 참여',
    icon: faBookOpen,
    description: '내 지식과 경험 나누기, 강의/챌린지/클립/멘토링 제작',
  },
];

export const INTEREST_OPTIONS: InterestOption[] = [
  { value: 'frontend', label: '프론트엔드' },
  { value: 'backend', label: '백엔드' },
  { value: 'mobile', label: '모바일' },
  { value: 'data', label: '데이터' },
  { value: 'ai', label: '인공지능' },
  { value: 'devops', label: '데브옵스' },
  { value: 'security', label: '보안' },
  { value: 'game', label: '게임' },
  { value: 'design', label: '디자인' },
  { value: 'planning', label: '기획' },
  { value: 'marketing', label: '마케팅' },
  { value: 'other', label: '기타' },
];

export interface SkillOption {
  value: string;
  label: string;
}

export const SKILL_OPTIONS: Record<string, SkillOption[]> = {
  frontend: [
    { value: 'html_css', label: 'HTML/CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'tailwind', label: 'Tailwind CSS' },
  ],
  backend: [
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'spring', label: 'Spring' },
    { value: 'django', label: 'Django' },
    { value: 'nestjs', label: 'NestJS' },
    { value: 'go', label: 'Go' },
    { value: 'database', label: 'Database' },
  ],
  mobile: [
    { value: 'react_native', label: 'React Native' },
    { value: 'flutter', label: 'Flutter' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'ios', label: 'iOS 개발' },
    { value: 'android', label: 'Android 개발' },
  ],
  data: [
    { value: 'sql', label: 'SQL' },
    { value: 'python_data', label: 'Python 데이터분석' },
    { value: 'pandas', label: 'Pandas' },
    { value: 'visualization', label: '데이터 시각화' },
    { value: 'bigquery', label: 'BigQuery' },
    { value: 'spark', label: 'Spark' },
    { value: 'tableau', label: 'Tableau' },
  ],
  ai: [
    { value: 'machine_learning', label: '머신러닝' },
    { value: 'deep_learning', label: '딥러닝' },
    { value: 'pytorch', label: 'PyTorch' },
    { value: 'tensorflow', label: 'TensorFlow' },
    { value: 'nlp', label: '자연어처리' },
    { value: 'computer_vision', label: '컴퓨터비전' },
    { value: 'llm', label: 'LLM/ChatGPT' },
  ],
  devops: [
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'aws', label: 'AWS' },
    { value: 'gcp', label: 'GCP' },
    { value: 'cicd', label: 'CI/CD' },
    { value: 'terraform', label: 'Terraform' },
    { value: 'linux', label: 'Linux' },
  ],
  security: [
    { value: 'web_security', label: '웹 보안' },
    { value: 'network_security', label: '네트워크 보안' },
    { value: 'encryption', label: '암호화' },
    { value: 'pentest', label: '모의해킹' },
    { value: 'security_cert', label: '보안 자격증' },
  ],
  game: [
    { value: 'unity', label: 'Unity' },
    { value: 'unreal', label: 'Unreal Engine' },
    { value: 'csharp_game', label: 'C# 게임개발' },
    { value: 'cpp_game', label: 'C++ 게임개발' },
    { value: 'game_design', label: '게임 기획' },
  ],
  design: [
    { value: 'figma', label: 'Figma' },
    { value: 'ux_design', label: 'UX 디자인' },
    { value: 'ui_design', label: 'UI 디자인' },
    { value: 'graphic_design', label: '그래픽 디자인' },
    { value: 'motion', label: '모션 그래픽' },
    { value: 'photoshop', label: 'Photoshop' },
  ],
  planning: [
    { value: 'product_management', label: '프로덕트 매니지먼트' },
    { value: 'agile', label: '애자일/스크럼' },
    { value: 'user_research', label: '사용자 리서치' },
    { value: 'data_analysis', label: '데이터 분석' },
    { value: 'prototyping', label: '프로토타이핑' },
  ],
  marketing: [
    { value: 'digital_marketing', label: '디지털 마케팅' },
    { value: 'growth_hacking', label: '그로스 해킹' },
    { value: 'seo', label: 'SEO' },
    { value: 'content_marketing', label: '콘텐츠 마케팅' },
    { value: 'analytics', label: '마케팅 분석' },
  ],
  other: [
    { value: 'excel', label: 'Excel' },
    { value: 'notion', label: 'Notion' },
    { value: 'automation', label: '업무 자동화' },
    { value: 'productivity', label: '생산성 도구' },
  ],
};

export const TOTAL_STEPS = 3;
