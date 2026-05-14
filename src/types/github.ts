/**
 * GitHub API 응답 타입 정의
 * GitHub REST API v3 기반
 */

/** GitHub 사용자 프로필 인터페이스 */
export interface GitHubUser {
  login: string;           // 사용자명 (username)
  id: number;              // 고유 ID
  avatar_url: string;      // 프로필 이미지 URL
  html_url: string;        // GitHub 프로필 페이지 URL
  name: string | null;     // 실제 이름 (없을 수 있음)
  company: string | null;  // 소속 회사
  blog: string | null;     // 블로그/웹사이트 URL
  location: string | null; // 위치
  email: string | null;    // 이메일
  bio: string | null;      // 자기소개
  twitter_username: string | null; // 트위터 사용자명
  public_repos: number;    // 공개 저장소 수
  public_gists: number;    // 공개 Gist 수
  followers: number;       // 팔로워 수
  following: number;       // 팔로잉 수
  created_at: string;      // 계정 생성일
  updated_at: string;      // 마지막 업데이트일
}

/** GitHub 저장소 인터페이스 */
export interface GitHubRepo {
  id: number;                      // 저장소 고유 ID
  name: string;                    // 저장소 이름
  full_name: string;               // 전체 이름 (owner/repo)
  html_url: string;                // 저장소 URL
  description: string | null;      // 저장소 설명
  fork: boolean;                   // 포크 여부
  stargazers_count: number;        // 스타 수
  watchers_count: number;          // 워처 수
  forks_count: number;             // 포크 수
  language: string | null;         // 주요 사용 언어
  updated_at: string;              // 마지막 업데이트일
  pushed_at: string;               // 마지막 푸시일
  topics: string[];                // 토픽 태그
  visibility: string;              // 공개/비공개 여부
  default_branch: string;          // 기본 브랜치
  open_issues_count: number;       // 열린 이슈 수
}

/** API 에러 응답 인터페이스 */
export interface GitHubApiError {
  message: string;
  documentation_url?: string;
}

/** useGitHub 훅 반환 타입 */
export interface UseGitHubReturn {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}
