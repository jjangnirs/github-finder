import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * 검색 입력 컴포넌트
 * - 실시간 입력 감지 (디바운스는 useGitHub 훅에서 처리)
 * - 접근성을 위한 label 및 aria 속성 포함
 * - 라이트/다크 모드 지원
 */
const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        {/* 검색 아이콘 */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* 검색 입력 필드 */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="GitHub 사용자명을 입력하세요..."
          aria-label="GitHub 사용자 검색"
          className="
            w-full
            pl-12 pr-12 py-4
            bg-gray-100 dark:bg-gray-800
            border border-gray-300 dark:border-gray-600
            rounded-xl
            text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-400
            text-base
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-transparent
            transition-all
            duration-200
          "
        />

        {/* 입력 초기화 버튼 */}
        {value && (
          <button
            onClick={() => onChange('')}
            className="
              absolute inset-y-0 right-0 pr-4
              flex items-center
              text-gray-400
              hover:text-gray-600 dark:hover:text-white
              transition-colors duration-200
            "
            aria-label="검색어 지우기"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
