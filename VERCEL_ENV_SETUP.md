# Vercel 환경 변수 설정 가이드

Vercel에 배포하기 전에 다음 환경 변수들을 설정해야 합니다.

## 필요한 환경 변수

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Supabase 프로젝트 URL
   - 예: `https://xxxxx.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY**
   - Supabase Anon/Public Key
   - Supabase Dashboard → Settings → API에서 확인 가능

3. **OPENAI_API_KEY**
   - OpenAI API 키 (AI 기능 사용 시)
   - OpenAI Platform에서 발급

## Vercel에서 환경 변수 설정 방법

### 방법 1: Vercel Dashboard 사용 (권장)

1. [Vercel Dashboard](https://vercel.com/dashboard)에 로그인
2. 배포하려는 프로젝트 선택
3. **Settings** 탭 클릭
4. 왼쪽 메뉴에서 **Environment Variables** 클릭
5. 다음 환경 변수들을 추가:

   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://your-project.supabase.co
   Environment: Production, Preview, Development (모두 선택)
   ```

   ```
   Name: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
   Value: your-anon-key-here
   Environment: Production, Preview, Development (모두 선택)
   ```

   ```
   Name: OPENAI_API_KEY
   Value: sk-...
   Environment: Production, Preview, Development (모두 선택)
   ```

6. 각 환경 변수 추가 후 **Save** 클릭
7. 환경 변수 추가가 완료되면 **Redeploy** 버튼을 클릭하여 재배포

### 방법 2: Vercel CLI 사용

```bash
# Vercel CLI 설치 (이미 설치되어 있다면 생략)
npm i -g vercel

# 프로젝트 디렉토리에서 로그인
vercel login

# 환경 변수 추가
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY production
vercel env add OPENAI_API_KEY production

# 개발 환경에도 추가
vercel env add NEXT_PUBLIC_SUPABASE_URL development
vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY development
vercel env add OPENAI_API_KEY development
```

## 환경 변수 확인

환경 변수가 제대로 설정되었는지 확인하려면:

1. Vercel Dashboard → Project → Settings → Environment Variables
2. 추가한 환경 변수들이 목록에 표시되는지 확인
3. 각 환경 변수의 값이 올바른지 확인 (민감한 정보는 `•••`로 표시됨)

## 문제 해결

### 환경 변수가 인식되지 않는 경우

1. 환경 변수 추가 후 **Redeploy**를 실행했는지 확인
2. 환경 변수 이름이 정확한지 확인 (대소문자 구분)
3. 환경 변수가 올바른 Environment에 추가되었는지 확인 (Production, Preview, Development)

### 빌드 에러가 발생하는 경우

1. Vercel Dashboard → Deployments에서 빌드 로그 확인
2. 환경 변수 누락 에러 메시지 확인
3. 필요한 모든 환경 변수가 추가되었는지 확인

