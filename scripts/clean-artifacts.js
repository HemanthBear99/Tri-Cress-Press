const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const toRemove = [
  'lint-output.txt',
  'lint-output-2.txt',
  'tsconfig.tsbuildinfo'
]

for (const p of toRemove) {
  const full = path.join(root, p)
  try {
    if (fs.existsSync(full)) {
      fs.unlinkSync(full)
      console.log('removed', full)
    }
  } catch (err) {
    console.error('failed to remove', full, err.message)
  }
}

// remove .next (local build) if present
const nextDir = path.join(root, '.next')
try {
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true })
    console.log('removed', nextDir)
  }
} catch (err) {
  console.error('failed to remove', nextDir, err.message)
}

console.log('clean-artifacts complete')
