import React from 'react';

/**
 * 초기 상태 안내 화면 컴포넌트
 * - 검색어가 없을 때 표시되는 웰컴 화면
 * - GitHub 아이콘과 사용 안내 문구 포함
 * - 라이트/다크 모드 지원
 */
const InitialState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* GitHub 로고 아이콘 */}
      <div className="mb-8">
        <div className="w-28 h-28 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 shadow-xl dark:shadow-2xl">
          <svg
            className="w-16 h-16 text-gray-600 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* 메인 타이틀 */}
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
        GitHub Finder
      </h2>

      {/* 서브 타이틀 */}
      <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-md">
        GitHub 사용자를 검색하여 프로필과 저장소 정보를 확인하세요.
      </p>

      {/* 사용 방법 안내 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
        {/* 단계 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
            <span className="text-white font-bold text-sm">1</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">검색</p>
          <p className="text-gray-400 dark:text-gray-500 text-xs">
            위 검색창에 GitHub 사용자명을 입력하세요
          </p>
        </div>

        {/* 단계 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
            <span className="text-white font-bold text-sm">2</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">프로필 확인</p>
          <p className="text-gray-400 dark:text-gray-500 text-xs">
            아바타, 바이오, 팔로워 등 프로필 정보를 확인하세요
          </p>
        </div>

        {/* 단계 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
            <span className="text-white font-bold text-sm">3</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">저장소 탐색</p>
          <p className="text-gray-400 dark:text-gray-500 text-xs">
            최신 저장소 5개를 확인하고 바로 방문하세요
          </p>
        </div>
      </div>

      {/* 예시 검색어 힌트 */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <p className="text-gray-400 dark:text-gray-600 text-xs w-full mb-2">예시 검색어:</p>
        {['torvalds', 'gaearon', 'sindresorhus', 'yyx990803'].map((name) => (
          <span
            key={name}
            className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1 font-mono"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InitialState;
