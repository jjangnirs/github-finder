import React from 'react';
import type { GitHubUser } from '../types/github';

interface UserProfileProps {
  user: GitHubUser;
}

/**
 * GitHub 사용자 프로필 카드 컴포넌트
 * - 아바타, 이름, 바이오, 통계(팔로워/팔로잉/저장소) 표시
 * - 위치, 블로그, 회사, 트위터 등 부가 정보 표시
 * - 라이트/다크 모드 지원
 */
const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  /**
   * 숫자를 읽기 쉬운 형식으로 변환 (예: 1200 → 1.2k)
   */
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  /**
   * 날짜 문자열을 한국어 형식으로 변환
   */
  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-xl transition-colors duration-300">
      {/* 프로필 헤더: 아바타 + 기본 정보 */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* 아바타 이미지 */}
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0"
        >
          <img
            src={user.avatar_url}
            alt={`${user.login}의 프로필 이미지`}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-blue-500 hover:border-blue-400 transition-colors duration-200 shadow-lg"
          />
        </a>

        {/* 이름 및 기본 정보 */}
        <div className="flex-1 text-center sm:text-left">
          {/* 실제 이름 */}
          {user.name && (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h2>
          )}
          {/* 사용자명 */}
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 text-lg font-medium transition-colors duration-200"
          >
            @{user.login}
          </a>

          {/* 바이오 */}
          {user.bio && (
            <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{user.bio}</p>
          )}

          {/* 가입일 */}
          <p className="mt-2 text-gray-400 dark:text-gray-500 text-xs">
            가입일: {formatDate(user.created_at)}
          </p>
        </div>
      </div>

      {/* 통계 섹션: 팔로워 / 팔로잉 / 저장소 */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(user.followers)}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">팔로워</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(user.following)}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">팔로잉</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(user.public_repos)}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">저장소</p>
        </div>
      </div>

      {/* 부가 정보 섹션 */}
      <div className="mt-5 space-y-2">
        {/* 위치 */}
        {user.location && (
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{user.location}</span>
          </div>
        )}

        {/* 블로그/웹사이트 */}
        {user.blog && (
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 flex-shrink-0 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <a
              href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 truncate transition-colors duration-200"
            >
              {user.blog}
            </a>
          </div>
        )}

        {/* 회사 */}
        {user.company && (
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{user.company}</span>
          </div>
        )}

        {/* 트위터 */}
        {user.twitter_username && (
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 flex-shrink-0 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <a
              href={`https://twitter.com/${user.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200"
            >
              @{user.twitter_username}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
