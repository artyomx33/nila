# Smart Commit

Create conventional commit with proper formatting.

## Usage
```bash
/commit
```

## What It Does
- Analyzes staged changes
- Suggests commit type (feat/fix/docs/etc)
- Generates commit message
- Follows Conventional Commits spec
- Adds Claude Code attribution

## Commit Format
```
<type>(<scope>): <description>

[optional body]

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

## Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructure
- `test`: Add tests
- `chore`: Maintenance

## Integration with Git Flow
- Validates commit follows conventions
- Analyzes changes for appropriate type
- Ensures description is clear
