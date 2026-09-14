# 서울대학교 환경대학원 소개 페이지

별도 빌드 과정이 필요 없는 정적 웹페이지입니다.

## 로컬 미리보기

```powershell
node preview-server.js
```

브라우저에서 `http://localhost:4173`을 엽니다.

## Cloudflare Pages 배포

Cloudflare 계정 인증 후 다음 명령으로 배포합니다.

```powershell
npx wrangler pages deploy . --project-name snu-gses-intro
```
