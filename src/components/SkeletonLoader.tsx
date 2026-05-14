import React from 'react';

/**
 * 스켈레톤 로딩 UI 컴포넌트
 * - 데이터 로딩 중 실제 콘텐츠와 유사한 형태의 플레이스홀더 표시
 * - Tailwind의 animate-pulse 클래스로 부드러운 애니메이션 효과
 */
const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* 프로필 카드 스켈레톤 */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        {/* 헤더: 아바타 + 기본 정보 */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* 아바타 스켈레톤 */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-700 flex-shrink-0" />

          {/* 텍스트 정보 스켈레톤 */}
          <div className="flex-1 w-full space-y-3">
            {/* 이름 */}
            <div className="h-7 bg-gray-700 rounded-lg w-48 mx-auto sm:mx-0" />
            {/* 사용자명 */}
            <div className="h-5 bg-gray-700 rounded-lg w-32 mx-auto sm:mx-0" />
            {/* 바이오 */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-4/5" />
            </div>
            {/* 가입일 */}
            <div className="h-3 bg-gray-700 rounded w-36 mx-auto sm:mx-0" />
          </div>
        </div>

        {/* 통계 스켈레톤 */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-700 rounded-xl p-4 text-center">
              <div className="h-7 bg-gray-600 rounded-lg w-16 mx-auto mb-2" />
              <div className="h-3 bg-gray-600 rounded w-12 mx-auto" />
            </div>
          ))}
        </div>

        {/* 부가 정보 스켈레톤 */}
        <div className="mt-5 space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-700 rounded flex-shrink-0" />
              <div className="h-4 bg-gray-700 rounded w-40" />
            </div>
          ))}
        </div>
      </div>

      {/* 저장소 목록 스켈레톤 */}
      <div className="mt-6">
        {/* 섹션 제목 */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-gray-700 rounded" />
          <div className="h-5 bg-gray-700 rounded w-28" />
        </div>

        {/* 저장소 카드 스켈레톤 5개 */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-gray-800 border border-gray-700 rounded-xl p-4"
            >
              {/* 저장소 이름 */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 bg-gray-700 rounded flex-shrink-0" />
                <div className="h-4 bg-gray-700 rounded w-40" />
              </div>
              {/* 설명 */}
              <div className="space-y-2 mb-3">
                <div className="h-3 bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-700 rounded w-3/4" />
              </div>
              {/* 메타 정보 */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-gray-700 rounded-full" />
                  <div className="h-3 bg-gray-700 rounded w-16" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3.5 h-3.5 bg-gray-700 rounded" />
                  <div className="h-3 bg-gray-700 rounded w-8" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
