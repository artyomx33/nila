# Create Pull Request

Create a well-formatted pull request with Git Flow conventions.

## Usage
```bash
/create-pr
```

## What It Does
- Verifies branch is pushed to remote
- Analyzes git diff for changes summary
- Generates PR title and body
- Creates PR using gh CLI
- Adds appropriate labels
- Links related issues

## Process
```bash
# Push current branch
git push -u origin [current-branch]

# Create PR
gh pr create --title "[type]: [description]" \
  --body "$(cat <<'EOF'
## Summary
- Key changes

## Test Plan
- Testing steps

🤖 Generated with Claude Code
EOF
)"
```

## PR Template
- Summary of changes
- Type of change (feature/fix/hotfix)
- Test plan checklist
- Gate verification status

## Integration with Gate System
- Gate 4 must pass before PR creation
- PR triggers automated tests
- Merge requires Gate 5 approval
