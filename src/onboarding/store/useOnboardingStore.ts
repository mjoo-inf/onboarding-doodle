import { create } from 'zustand';

export interface OnboardingState {
  currentStep: number;
  purpose: string[];
  customPurposeText: string;
  interests: string[];
  customInterestText: string;
  skills: string[];
  customSkillText: string;
  isCompleted: boolean;
}

interface OnboardingActions {
  setPurpose: (purpose: string[]) => void;
  togglePurpose: (value: string) => void;
  setCustomPurposeText: (text: string) => void;
  setInterests: (interests: string[]) => void;
  toggleInterest: (value: string) => void;
  setCustomInterestText: (text: string) => void;
  setSkills: (skills: string[]) => void;
  toggleSkill: (value: string) => void;
  setCustomSkillText: (text: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  complete: () => void;
  reset: () => void;
}

const initialState: OnboardingState = {
  currentStep: 1,
  purpose: [],
  customPurposeText: '',
  interests: [],
  customInterestText: '',
  skills: [],
  customSkillText: '',
  isCompleted: false,
};

export const useOnboardingStore = create<OnboardingState & OnboardingActions>(
  (set, get) => ({
    ...initialState,

    setPurpose: (purpose) => set({ purpose }),

    setCustomPurposeText: (text) => set({ customPurposeText: text }),

    togglePurpose: (value) => {
      const { purpose } = get();
      // "잘 모르겠다" 선택 시 기존 선택 모두 해제
      if (value === 'unsure') {
        if (purpose.includes('unsure')) {
          set({ purpose: [] });
        } else {
          set({ purpose: ['unsure'] });
        }
        return;
      }
      // "직접 입력" 선택 시 "잘 모르겠다" 해제
      if (value === 'custom') {
        const filtered = purpose.filter((p) => p !== 'unsure');
        if (filtered.includes('custom')) {
          set({ purpose: filtered.filter((p) => p !== 'custom') });
        } else {
          set({ purpose: [...filtered, 'custom'] });
        }
        return;
      }
      // "잘 모르겠다"가 선택된 상태에서 다른 항목 선택 시 "잘 모르겠다" 해제
      const filtered = purpose.filter((p) => p !== 'unsure' && p !== 'custom');
      if (filtered.includes(value)) {
        set({ purpose: filtered.filter((p) => p !== value) });
      } else {
        set({ purpose: [...filtered, value] });
      }
    },

    setInterests: (interests) => set({ interests }),

    setCustomInterestText: (text) => set({ customInterestText: text }),

    toggleInterest: (value) => {
      const { interests } = get();
      // "잘 모르겠다" 선택 시 기존 선택 모두 해제
      if (value === 'unsure') {
        if (interests.includes('unsure')) {
          set({ interests: [] });
        } else {
          set({ interests: ['unsure'] });
        }
        return;
      }
      // "직접 입력" 선택 시 "잘 모르겠다" 해제
      if (value === 'custom') {
        const filtered = interests.filter((i) => i !== 'unsure');
        if (filtered.includes('custom')) {
          set({ interests: filtered.filter((i) => i !== 'custom') });
        } else {
          set({ interests: [...filtered, 'custom'] });
        }
        return;
      }
      // "잘 모르겠다"가 선택된 상태에서 다른 항목 선택 시 "잘 모르겠다" 해제
      const filtered = interests.filter((i) => i !== 'unsure' && i !== 'custom');
      if (filtered.includes(value)) {
        set({ interests: filtered.filter((i) => i !== value) });
      } else {
        set({ interests: [...filtered, value] });
      }
    },

    setSkills: (skills) => set({ skills }),

    setCustomSkillText: (text) => set({ customSkillText: text }),

    toggleSkill: (value) => {
      const { skills } = get();
      // "잘 모르겠다" 선택 시 기존 선택 모두 해제
      if (value === 'unsure') {
        if (skills.includes('unsure')) {
          set({ skills: [] });
        } else {
          set({ skills: ['unsure'] });
        }
        return;
      }
      // "직접 입력" 선택 시 "잘 모르겠다" 해제
      if (value === 'custom') {
        const filtered = skills.filter((s) => s !== 'unsure');
        if (filtered.includes('custom')) {
          set({ skills: filtered.filter((s) => s !== 'custom') });
        } else {
          set({ skills: [...filtered, 'custom'] });
        }
        return;
      }
      // "잘 모르겠다"가 선택된 상태에서 다른 항목 선택 시 "잘 모르겠다" 해제
      const filteredSkills = skills.filter((s) => s !== 'unsure' && s !== 'custom');
      if (filteredSkills.includes(value)) {
        set({ skills: filteredSkills.filter((s) => s !== value) });
      } else {
        set({ skills: [...filteredSkills, value] });
      }
    },

    nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),

    prevStep: () =>
      set((state) => ({
        currentStep: Math.max(0, state.currentStep - 1),
      })),

    goToStep: (step) => set({ currentStep: step }),

    complete: () => set({ isCompleted: true }),

    reset: () => set(initialState),
  })
);
