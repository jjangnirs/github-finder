import React from 'react';

interface ErrorMessageProps {
  message: string;
  username: string;
}

/**
 * 에러 및 빈 상태 메시지 컴포넌트
 * - 404 (사용자 없음) 또는 기타 에러 상태를 시각적으로 표시
 * - 에러 유형에 따라 다른 아이콘과 메시지 표시
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, username }) => {
  // 404 에러 여부 판단
  const isNotFound = message.includes('찾을 수 없습니다');
  // Rate Limit 에러 여부 판단
  const isRateLimit = message.includes('한도를 초과');

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* 에러 아이콘 */}
      <div className="mb-6">
        {isNotFound ? (
          /* 사용자 없음 아이콘 */
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700">
            <svg
              className="w-12 h-12 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M18 18l-4-4"
              />
            </svg>
          </div>
        ) : isRateLimit ? (
          /* Rate Limit 아이콘 */
          <div className="w-24 h-24 bg-yellow-900/30 rounded-full flex items-center justify-center border-2 border-yellow-700/50">
            <svg
              className="w-12 h-12 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        ) : (
          /* 일반 에러 아이콘 */
          <div className="w-24 h-24 bg-red-900/30 rounded-full flex items-center justify-center border-2 border-red-700/50">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* 에러 제목 */}
      <h3 className="text-xl font-bold text-white mb-2">
        {isNotFound ? '사용자를 찾을 수 없습니다' : isRateLimit ? 'API 한도 초과' : '오류 발생'}
      </h3>

      {/* 검색한 사용자명 표시 (404인 경우) */}
      {isNotFound && username && (
        <p className="text-gray-400 mb-2">
          <span className="text-blue-400 font-mono">"{username}"</span>
          에 해당하는 GitHub 계정이 없습니다.
        </p>
      )}

      {/* 에러 메시지 */}
      <p className="text-gray-500 text-sm max-w-sm">{message}</p>

      {/* 도움말 텍스트 */}
      {isNotFound && (
        <p className="mt-4 text-gray-600 text-xs">
          사용자명의 대소문자와 철자를 확인해주세요.
        </p>
      )}
    </div>
  );
};

export default ErrorMessage;
