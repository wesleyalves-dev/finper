import bcrypt from 'bcryptjs'

interface PasswordUtil {
  readonly hash: (value: string) => Promise<string>
  readonly compare: (value: string, hash: string) => Promise<boolean>
}

export const passwordUtil: PasswordUtil = {
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(value, salt)
  },

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
