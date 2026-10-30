#!/usr/bin/env bash
# One-shot deploy script for the portfolio site.
# Run this from your own machine (or a local Claude Code session) —
# it needs real network access to github.com and vercel.com, which a
# sandboxed cloud session may not have.
#
# What it does:
#   1. Creates a new GitHub repo under your account and pushes this code.
#   2. Deploys the project to Vercel (free tier) and prints the live URL.
#
# Auth: it uses your existing `gh` and `vercel` CLI logins if you have them.
# If not, set GH_TOKEN and VERCEL_TOKEN env vars first (fresh, short-lived
# tokens — see README.md for where to create them), e.g.:
#   export GH_TOKEN=ghp_xxx
#   export VERCEL_TOKEN=xxx
#   ./deploy.sh

set -euo pipefail

REPO_NAME="${REPO_NAME:-taro-portfolio}"
GITHUB_USER="${GITHUB_USER:-GlowZw}"

echo "== 1. GitHub =="
if ! command -v gh >/dev/null 2>&1; then
  echo "Installing GitHub CLI..."
  type -p curl >/dev/null || (sudo apt update && sudo apt install -y curl)
  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
  sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
  sudo apt update && sudo apt install -y gh
fi

if ! gh auth status >/dev/null 2>&1; then
  if [ -n "${GH_TOKEN:-}" ]; then
    echo "$GH_TOKEN" | gh auth login --with-token
  else
    echo "Not logged into gh and no GH_TOKEN set — running interactive login:"
    gh auth login
  fi
fi

if ! gh repo view "$GITHUB_USER/$REPO_NAME" >/dev/null 2>&1; then
  echo "Creating repo $GITHUB_USER/$REPO_NAME..."
  gh repo create "$GITHUB_USER/$REPO_NAME" --public --source=. --remote=origin --push
else
  echo "Repo already exists, pushing..."
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
  git branch -M main
  git push -u origin main
fi

echo
echo "== 2. Vercel =="
if ! command -v vercel >/dev/null 2>&1; then
  echo "Installing Vercel CLI..."
  npm install -g vercel
fi

VERCEL_ARGS=()
if [ -n "${VERCEL_TOKEN:-}" ]; then
  VERCEL_ARGS+=(--token "$VERCEL_TOKEN")
fi

vercel "${VERCEL_ARGS[@]}" link --yes
vercel "${VERCEL_ARGS[@]}" --prod --yes

echo
echo "Done. Your repo: https://github.com/$GITHUB_USER/$REPO_NAME"
echo "Your live site URL was printed above by the vercel command."
