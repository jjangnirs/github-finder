import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import RepoList from './components/RepoList';
import SkeletonLoader from './components/SkeletonLoader';
import ErrorMessage from './components/ErrorMessage';
import InitialState from './components/InitialState';
import { useGitHub } from './hooks/useGitHub';

/**
 * GitHub Finder 메인 앱 컴포넌트
 * - 검색어 상태 관리
 * - 다크/라이트 모드 토글 관리
 * - 조건부 렌더링: 초기 상태 / 로딩 / 에러 / 결과
 * - 반응형 레이아웃 (모바일 우선)
 */
const App: React.FC = () => {
  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 다크 모드 상태 (localStorage에서 초기값 로드, 기본값: 다크)
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  // isDark 변경 시 <html> 태그에 'dark' 클래스 토글 및 localStorage 저장
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // GitHub API 커스텀 훅 (디바운스 포함)
  const { user, repos, loading, error } = useGitHub(searchQuery);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* 헤더 */}
      <header className="bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 py-4">
          {/* 로고 + 타이틀 + 다크 모드 토글 */}
          <div className="flex items-center justify-between mb-4">
            {/* 왼쪽: 로고 + 타이틀 */}
            <div className="flex items-center gap-3">
              <svg
                className="w-7 h-7 text-gray-900 dark:text-white"
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
              <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                GitHub Finder
              </h1>
            </div>

            {/* 오른쪽: 다크 모드 토글 버튼 */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="
                flex items-center gap-2
                px-3 py-2
                rounded-lg
                bg-gray-100 dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                text-gray-600 dark:text-gray-300
                hover:bg-gray-200 dark:hover:bg-gray-700
                hover:text-gray-900 dark:hover:text-white
                transition-all duration-200
                text-sm font-medium
              "
              aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
              title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
            >
              {isDark ? (
                /* 라이트 모드 아이콘 (해) */
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="hidden sm:inline">라이트</span>
                </>
              ) : (
                /* 다크 모드 아이콘 (달) */
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span className="hidden sm:inline">다크</span>
                </>
              )}
            </button>
          </div>

          {/* 검색 바 */}
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* 조건부 렌더링 */}

        {/* 1. 초기 상태: 검색어 없음 */}
        {!searchQuery.trim() && !loading && (
          <InitialState />
        )}

        {/* 2. 로딩 상태: 스켈레톤 UI */}
        {loading && (
          <SkeletonLoader />
        )}

        {/* 3. 에러 상태 */}
        {!loading && error && (
          <ErrorMessage message={error} username={searchQuery} />
        )}

        {/* 4. 결과 표시: 사용자 프로필 + 저장소 목록 */}
        {!loading && !error && user && (
          <div>
            <UserProfile user={user} />
            <RepoList repos={repos} />
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 py-6 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gray-400 dark:text-gray-600 text-xs">
            GitHub REST API를 사용합니다. 비인증 요청은 시간당 60회로 제한됩니다.
          </p>
          <p className="text-gray-300 dark:text-gray-700 text-xs mt-1">
            Built with React + TypeScript + Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
