import { useState, useEffect } from 'react';
import type { GitHubUser, GitHubRepo, UseGitHubReturn } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';
const DEBOUNCE_DELAY = 500; // 500ms 디바운스
const REPOS_COUNT = 5;       // 최신 저장소 5개

/**
 * GitHub 사용자 정보를 가져오는 커스텀 훅
 * - Debounce 로직 내장 (500ms)
 * - 사용자 프로필 + 최신 저장소 5개 동시 fetch
 * @param username - 검색할 GitHub 사용자명
 */
export function useGitHub(username: string): UseGitHubReturn {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 빈 문자열이면 상태 초기화 후 종료
    if (!username.trim()) {
      setUser(null);
      setRepos([]);
      setError(null);
      setLoading(false);
      return;
    }

    // 로딩 상태 즉시 표시 (UX 개선)
    setLoading(true);
    setError(null);

    // 디바운스: 사용자 입력이 멈춘 후 500ms 뒤에 API 호출
    const timer = setTimeout(async () => {
      try {
        // 사용자 프로필과 저장소를 병렬로 fetch (성능 최적화)
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`${GITHUB_API_BASE}/users/${encodeURIComponent(username)}`),
          fetch(
            `${GITHUB_API_BASE}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=${REPOS_COUNT}`
          ),
        ]);

        // 404: 사용자를 찾을 수 없는 경우
        if (userResponse.status === 404) {
          setUser(null);
          setRepos([]);
          setError('사용자를 찾을 수 없습니다.');
          return;
        }

        // API Rate Limit 초과 (403)
        if (userResponse.status === 403) {
          const errorData = await userResponse.json();
          if (errorData.message?.includes('rate limit')) {
            setError('API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.');
          } else {
            setError('접근이 거부되었습니다.');
          }
          return;
        }

        // 기타 HTTP 에러 처리
        if (!userResponse.ok) {
          setError(`오류가 발생했습니다. (${userResponse.status})`);
          return;
        }

        const userData: GitHubUser = await userResponse.json();
        const reposData: GitHubRepo[] = reposResponse.ok
          ? await reposResponse.json()
          : [];

        setUser(userData);
        setRepos(reposData);
        setError(null);
      } catch (err) {
        // 네트워크 오류 등 예외 처리
        console.error('GitHub API 호출 오류:', err);
        setError('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
        setUser(null);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_DELAY);

    // 클린업: 다음 렌더링 전에 이전 타이머 취소
    return () => clearTimeout(timer);
  }, [username]);

  return { user, repos, loading, error };
}
