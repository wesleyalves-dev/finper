import bcrypt from 'bcryptjs'

interface Pass {
  hash(text: string): Promise<string>
  compare(text: string, pass: string): Promise<boolean>
}

async function hash(text: string): Promise<string> {
  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(text, salt)

  return hash
}

async function compare(text: string, hash: string): Promise<boolean> {
  const result = await bcrypt.compare(text, hash)

  return result
}

export const pass: Pass = {
  hash,
  compare
}
