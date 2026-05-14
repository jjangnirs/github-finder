import React from 'react';
import type { GitHubRepo } from '../types/github';

interface RepoListProps {
  repos: GitHubRepo[];
}

/**
 * 프로그래밍 언어별 색상 매핑
 * GitHub 공식 색상 참고
 */
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-blue-400',
  Java: 'bg-orange-500',
  'C++': 'bg-pink-500',
  C: 'bg-gray-500',
  'C#': 'bg-purple-500',
  Go: 'bg-cyan-400',
  Rust: 'bg-orange-600',
  Ruby: 'bg-red-500',
  PHP: 'bg-indigo-400',
  Swift: 'bg-orange-400',
  Kotlin: 'bg-purple-400',
  Dart: 'bg-blue-300',
  HTML: 'bg-orange-500',
  CSS: 'bg-blue-600',
  Shell: 'bg-green-500',
  Vue: 'bg-green-400',
  Svelte: 'bg-orange-500',
};

/**
 * 저장소 목록 컴포넌트
 * - 최신 저장소 5개를 카드 형태로 표시
 * - 스타 수, 포크 수, 사용 언어 배지 포함
 * - 라이트/다크 모드 지원
 */
const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  if (repos.length === 0) return null;

  /**
   * 날짜를 상대적 시간으로 변환 (예: "3일 전")
   */
  const getRelativeTime = (dateStr: string): string => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '어제';
    if (diffDays < 7) return `${diffDays}일 전`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
    return `${Math.floor(diffDays / 365)}년 전`;
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        {/* 저장소 아이콘 */}
        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        최근 저장소
        <span className="text-sm text-gray-400 dark:text-gray-500 font-normal">({repos.length}개)</span>
      </h3>

      <div className="space-y-3">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              block
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              rounded-xl
              p-4
              hover:border-blue-400 dark:hover:border-blue-500
              hover:shadow-md dark:hover:shadow-none
              hover:bg-gray-50 dark:hover:bg-gray-750
              transition-all
              duration-200
              group
            "
          >
            {/* 저장소 이름 + 포크 배지 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <svg
                  className="w-4 h-4 text-gray-400 dark:text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span className="text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 font-medium truncate transition-colors duration-200">
                  {repo.name}
                </span>
                {repo.fork && (
                  <span className="text-xs text-gray-400 dark:text-gray-500 border border-gray-300 dark:border-gray-600 rounded-full px-2 py-0.5 flex-shrink-0">
                    Fork
                  </span>
                )}
              </div>

              {/* 외부 링크 아이콘 */}
              <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 flex-shrink-0 ml-2 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>

            {/* 저장소 설명 */}
            {repo.description && (
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">
                {repo.description}
              </p>
            )}

            {/* 메타 정보: 언어, 스타, 포크, 업데이트 */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
              {/* 사용 언어 */}
              {repo.language && (
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-3 h-3 rounded-full ${LANGUAGE_COLORS[repo.language] ?? 'bg-gray-400'}`}
                  />
                  <span>{repo.language}</span>
                </div>
              )}

              {/* 스타 수 */}
              {repo.stargazers_count > 0 && (
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>{repo.stargazers_count.toLocaleString()}</span>
                </div>
              )}

              {/* 포크 수 */}
              {repo.forks_count > 0 && (
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span>{repo.forks_count.toLocaleString()}</span>
                </div>
              )}

              {/* 마지막 업데이트 */}
              <div className="flex items-center gap-1 ml-auto">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>업데이트: {getRelativeTime(repo.updated_at)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RepoList;
