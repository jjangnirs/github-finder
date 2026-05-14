# 🔍 GitHub Finder

GitHub 사용자를 실시간으로 검색하여 프로필 정보와 최신 저장소를 확인할 수 있는 SPA(Single Page Application)입니다.

![GitHub Finder Preview](https://via.placeholder.com/800x400/1f2937/60a5fa?text=GitHub+Finder)

---

## 📋 목차

- [프로젝트 목적](#-프로젝트-목적)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [시작하기](#-시작하기)
- [트러블슈팅](#-트러블슈팅)
- [AI 협업 전략](#-ai-협업-전략)

---

## 🎯 프로젝트 목적

GitHub REST API를 활용하여 사용자 정보를 검색하고 시각화하는 React 애플리케이션입니다.  
커스텀 훅, 디바운스, 스켈레톤 UI 등 현대적인 React 패턴을 실습하는 것을 목표로 합니다.

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 🔍 **실시간 검색** | 입력과 동시에 검색 (500ms 디바운스 적용) |
| 👤 **사용자 프로필** | 아바타, 이름, 바이오, 팔로워/팔로잉/저장소 수 표시 |
| 📁 **저장소 목록** | 최신 저장소 5개 (스타, 포크, 언어 배지 포함) |
| ⏳ **스켈레톤 UI** | 로딩 중 실제 레이아웃과 유사한 플레이스홀더 표시 |
| ❌ **에러 처리** | 404(사용자 없음), Rate Limit, 네트워크 오류 구분 처리 |
| 📱 **반응형 디자인** | 모바일/태블릿/데스크톱 완벽 지원 |
| 🌙 **다크 테마** | GitHub 스타일의 다크 모드 UI |

---

## 🛠 기술 스택

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **API**: GitHub REST API v3
- **상태 관리**: React Hooks (useState, useEffect)
- **빌드 도구**: Vite

---

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── SearchBar.tsx      # 검색 입력 컴포넌트 (초기화 버튼 포함)
│   ├── UserProfile.tsx    # 사용자 프로필 카드
│   ├── RepoList.tsx       # 저장소 목록 (언어 색상 배지)
│   ├── SkeletonLoader.tsx # 로딩 스켈레톤 UI
│   ├── ErrorMessage.tsx   # 에러/빈 상태 메시지
│   └── InitialState.tsx   # 초기 안내 화면
├── hooks/
│   └── useGitHub.ts       # GitHub API 커스텀 훅 (디바운스 포함)
├── types/
│   └── github.ts          # GitHub API 응답 TypeScript 타입 정의
├── App.tsx                # 메인 앱 컴포넌트
├── main.tsx               # 앱 진입점
└── index.css              # Tailwind CSS 설정
```

---

## 🚀 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

개발 서버 실행 후 브라우저에서 `http://localhost:5173` 접속

---

## 🔧 트러블슈팅

### 1. API Rate Limit (403 에러)

**문제**: GitHub API는 비인증 요청을 IP당 시간당 60회로 제한합니다. 이를 초과하면 403 에러가 발생합니다.

**증상**:
```json
{
  "message": "API rate limit exceeded for ...",
  "documentation_url": "https://docs.github.com/..."
}
```

**해결 방법**:
- 디바운스(500ms)를 적용하여 불필요한 API 호출 최소화
- 에러 메시지에서 `rate limit` 키워드를 감지하여 사용자에게 명확한 안내 메시지 표시
- 장기적 해결책: GitHub Personal Access Token을 Authorization 헤더에 추가하면 시간당 5,000회로 증가

```typescript
// Rate Limit 에러 처리 코드 (useGitHub.ts)
if (userResponse.status === 403) {
  const errorData = await userResponse.json();
  if (errorData.message?.includes('rate limit')) {
    setError('API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.');
  }
}
```

---

### 2. 404 에러 (사용자 없음)

**문제**: 존재하지 않는 사용자명 입력 시 GitHub API가 404를 반환합니다.

**해결 방법**:
- HTTP 상태 코드를 명시적으로 체크하여 404와 기타 에러를 구분
- 사용자에게 검색한 사용자명과 함께 명확한 안내 메시지 표시

```typescript
// 404 처리 코드 (useGitHub.ts)
if (userResponse.status === 404) {
  setError('사용자를 찾을 수 없습니다.');
  return;
}
```

---

### 3. 디바운스 구현 시 메모리 누수

**문제**: `useEffect` 내에서 `setTimeout`을 사용할 때 컴포넌트 언마운트 시 타이머가 정리되지 않으면 메모리 누수가 발생합니다.

**해결 방법**: `useEffect`의 클린업 함수에서 `clearTimeout`을 호출하여 이전 타이머를 취소합니다.

```typescript
useEffect(() => {
  const timer = setTimeout(async () => {
    // API 호출 로직
  }, 500);

  // 클린업: 컴포넌트 언마운트 또는 username 변경 시 타이머 취소
  return () => clearTimeout(timer);
}, [username]);
```

---

### 4. TypeScript strict 모드에서 null 처리

**문제**: GitHub API 응답의 일부 필드(name, bio, location 등)는 `null`일 수 있어 TypeScript strict 모드에서 타입 오류가 발생합니다.

**해결 방법**: 인터페이스에서 `string | null` 유니온 타입으로 명시하고, 렌더링 시 조건부 렌더링(`&&`)을 사용합니다.

```typescript
// 타입 정의
interface GitHubUser {
  name: string | null;
  bio: string | null;
}

// 조건부 렌더링
{user.bio && <p>{user.bio}</p>}
```

---

## 🤖 AI 협업 전략

### 사용 도구
- **Cline (Claude Sonnet)**: 전체 프로젝트 아키텍처 설계 및 코드 생성

### 주요 프롬프트 전략

#### 1. 역할 기반 프롬프트 (Role Prompting)
```
"React + TypeScript + Tailwind CSS를 사용하는 시니어 프론트엔드 개발자로서,
GitHub API를 활용한 사용자 검색 앱을 설계해주세요."
```
→ 기술 스택과 역할을 명확히 지정하여 일관된 코드 스타일 유지

#### 2. 구조 분리 요청 (Separation of Concerns)
```
"API 호출 로직은 useGitHub 커스텀 훅으로 분리하고,
UI 컴포넌트는 순수하게 렌더링만 담당하도록 설계해주세요."
```
→ Clean Architecture 원칙을 명시하여 유지보수성 높은 코드 생성

#### 3. 에러 케이스 명시 (Edge Case Specification)
```
"404 에러, API Rate Limit(403), 네트워크 오류를 각각 구분하여
사용자에게 다른 메시지를 보여주는 에러 처리 로직을 구현해주세요."
```
→ 구체적인 에러 케이스를 나열하여 견고한 에러 처리 구현

#### 4. UX 패턴 지정 (UX Pattern Specification)
```
"로딩 중에는 실제 레이아웃과 동일한 형태의 스켈레톤 UI를 표시하고,
Tailwind의 animate-pulse를 활용해주세요."
```
→ 구체적인 UX 패턴과 구현 방법을 함께 제시하여 정확한 결과 도출

#### 5. 접근성 고려 요청 (Accessibility)
```
"aria-label, aria-hidden 등 접근성 속성을 포함하고,
키보드 네비게이션이 가능하도록 구현해주세요."
```
→ 접근성 요구사항을 명시하여 포용적인 UI 구현

### 실제 사용한 프롬프트

이번 프로젝트에서 Cline(AI)에게 실제로 입력한 프롬프트 전문입니다.

---

#### 📌 프롬프트 1 — 프로젝트 전체 설계 요청

```
GitHub Finder 애플리케이션 개발 가이드

1. 기술 스택 및 환경 설정
Framework: React (Vite 기반)
Styling: Tailwind CSS (반응형 레이아웃 필수)
API: GitHub REST API (https://api.github.com/users/{username})
Target: 현대적이고 깔끔한 UI/UX를 제공하는 SPA

2. 핵심 요구사항 (Core Logic)
Custom Hook 구현: API 호출 로직은 UI 구성 요소와 분리하여 useGitHub와 같은 커스텀 훅으로 관리하세요.
실시간 검색: 사용자 입력을 감지하되, API 호출 최적화를 위해 Debounce(디바운스) 로직을 적용하세요.
데이터 연동:
  - 사용자 프로필(아바타, 이름, 바이오, 팔로워 수 등) 수신.
  - 사용자의 최신 저장소(Repositories) 목록 5개를 수신하여 리스트업하세요.

3. UI/UX 상세 지침
Layout: 모바일과 데스크톱 모두에서 완벽하게 작동하는 Responsive Design을 적용하세요.
Feedback:
  - Loading: 데이터를 가져오는 동안 스켈레톤 UI 또는 Spinner를 표시하세요.
  - Empty/404: 검색 결과가 없거나 잘못된 사용자명 입력 시 "사용자를 찾을 수 없습니다"라는 명확한 시각적 메시지를 노출하세요.
  - Initial State: 첫 화면에서 검색어가 없을 때의 안내 화면을 구성하세요.

4. 트러블슈팅 및 문서화
README.md 파일을 생성하고 다음 내용을 포함하세요.
  - 프로젝트의 목적과 주요 기능.
  - 개발 중 발생한 주요 에러(예: API Rate Limit, 404 Error)와 해결 과정.
  - AI(Cursor)와 협업하며 적용한 주요 프롬프트 전략 및 코드 개선 사항.

5. 코드 품질
Clean Code 원칙을 준수하고, 적절한 주석을 작성하세요.
TypeScript를 사용하는 경우, GitHub API 응답값에 대한 Interface/Type을 명확히 정의하세요.
```

**→ 결과**: 프로젝트 전체 구조(파일 트리), 기술 스택, 단계별 구현 계획이 수립되었습니다.

---

#### 📌 프롬프트 2 — README.md에 실제 프롬프트 추가 요청

```
README.md 에 실행했던 프롬프트도 추가해줘
```

**→ 결과**: AI 협업 전략 섹션에 실제 사용 프롬프트 전문이 추가되었습니다.

---

### 코드 개선 사항

| 개선 전 | 개선 후 | 이유 |
|---------|---------|------|
| `useEffect` 내 직접 fetch | 커스텀 훅 `useGitHub`로 분리 | 재사용성 및 테스트 용이성 향상 |
| 단순 `setTimeout` | 클린업 함수로 타이머 취소 | 메모리 누수 방지 |
| `any` 타입 사용 | 명확한 인터페이스 정의 | 타입 안전성 확보 |
| 단일 에러 메시지 | 에러 유형별 구분 처리 | 사용자 경험 개선 |
| 단순 로딩 스피너 | 스켈레톤 UI | 레이아웃 시프트 방지 |

---

## 📄 라이선스

MIT License

---

*Built with ❤️ using React + TypeScript + Tailwind CSS*
