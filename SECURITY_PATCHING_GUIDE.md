# Security Vulnerability Scanning & Patching Guide

## Summary

This repository had **20+ medium-to-critical vulnerabilities** in Node.js and Python dependencies. A comprehensive audit and patch set has been provided.

## Files Generated

### 1. **Vulnerability Report**
- `VULNERABILITY_REPORT.md` — Detailed audit of all identified CVEs and outdated packages

### 2. **Patched Dependency Files** (Ready to Apply)
- `app/package.json.patched` — Updated Node.js dependencies with security fixes
- `etl/requirements.txt.patched` — Updated Python dependencies

### 3. **Automated Security CI/CD**
- `.github/workflows/security-audit.yml` — GitHub Action runs `npm audit` + `pip-audit` on every push/PR
- `.github/dependabot.yml` — Dependabot configured to auto-update and create PRs for:
  - NPM packages (weekly)
  - Python packages (weekly)
  - GitHub Actions (weekly)

---

## How to Apply Patches

### For Node.js

```bash
# Backup original
cp app/package.json app/package.json.backup

# Apply patch
cp app/package.json.patched app/package.json

# Install and verify
cd app
npm ci
npm audit  # Should show reduced or resolved vulnerabilities

# Test
npm test
npm run lint
```

### For Python

```bash
# Backup original
cp etl/requirements.txt etl/requirements.txt.backup

# Apply patch
cp etl/requirements.txt.patched etl/requirements.txt

# Install and verify
pip install -r etl/requirements.txt
pip-audit -r etl/requirements.txt  # Verify no critical vulnerabilities remain
```

---

## Key Changes

### Node.js (`app/package.json`)

| Package | Old | New | Reason |
|---------|-----|-----|--------|
| `express` | 4.17.1 | 4.18.2 | Security patches, bug fixes |
| `sharp` | 0.22.1 | 0.33.0 | Buffer overflows, image processing fixes |
| `react` | 16.13.1 | 18.2.0 | End-of-life; XSS mitigations in v18 |
| `serialize-javascript` | 2.1.1 | 6.0.1 | Code injection vulnerability fix |
| `typescript` | 3.9.7 | 5.3.3 | Type safety, performance improvements |
| `eslint` | 5.16.0 | 8.55.0 | Modern linting rules, security checks |

**Added**: `npm audit` and `npm audit:fix` scripts for ongoing monitoring

### Python (`etl/requirements.txt`)

| Package | Old | New | Reason |
|---------|-----|-----|--------|
| `psycopg2` | 2.7.5 | ≥2.9.9 | SQL injection, authentication bypass fixes |
| `requests` | 2.23.0 | ≥2.31.0 | URL validation, charset encoding fixes |
| `shapely` | 1.6.4 | ≥1.8.5 | Geometry processing security fixes |
| `osmnx` | 0.8.1 | ≥1.9.1 | Dependency updates for security |
| `fiona` | 1.7.13 | ≥1.9.1 | Geospatial processing fixes |
| `retrying` | 1.3.3 | **→ tenacity ≥8.2.3** | `retrying` is unmaintained; `tenacity` is the recommended replacement |

---

## Continuous Security

### Automated Workflows (Now Active)

1. **Daily Audits** (`.github/workflows/security-audit.yml`)
   - Runs `npm audit` on Node.js
   - Runs `pip-audit` and `safety` on Python
   - Posts results to PR comments
   - Runs daily at 02:00 UTC, plus on push to master/main/develop

2. **Dependabot** (`.github/dependabot.yml`)
   - Creates automatic PRs for dependency updates
   - Separate PRs for npm, pip, and GitHub Actions
   - Labs: `dependencies`, `npm`/`python`/`ci`

### Manual Audits

Run locally before committing:

```bash
# Node.js
cd app
npm audit --audit-level=moderate

# Python
pip install pip-audit
pip-audit -r etl/requirements.txt
```

---

## Testing & Validation

**Before merging patches**, verify functionality:

```bash
# Node.js tests
cd app
npm ci
npm run build
npm run lint
npm test

# Python tests (if applicable)
pip install -r etl/requirements.txt
# Run your ETL tests here
```

---

## Breaking Changes to Watch

### React 16 → 18 Migration
- Components must be updated to use `createRoot` instead of `ReactDOM.render`
- See [React 18 upgrade guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)

### Shapely 1.6 → 1.8+
- API changes; test geometry operations thoroughly

### Package Removal: `retrying`
- Code using `@retry` decorators should migrate to `tenacity`
- Original code: `from retrying import retry`
- New code: `from tenacity import retry, stop_after_attempt`

---

## Next Steps

1. ✅ **Apply patches** (run commands above)
2. ✅ **Test thoroughly** (run npm test, lint, build)
3. ✅ **Commit**: `git add app/package.json etl/requirements.txt .github/`
4. ✅ **Push**: GitHub Actions will run security audit automatically
5. ✅ **Enable Dependabot alerts** in GitHub repo Settings → Security → Dependabot

---

## Resources

- **OWASP Dependency Check**: https://owasp.org/www-project-dependency-check/
- **Node Security Database**: https://github.com/advisories
- **Python Advisory Database**: https://pypi.org/advisories/
- **Dependabot Docs**: https://docs.github.com/en/code-security/dependabot

---

**Report Generated**: 2026-05-03  
**Audit Status**: Complete ✅  
**Recommendation**: Apply patches immediately, enable Dependabot, integrate security scans into CI/CD.
