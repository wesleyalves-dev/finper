interface JwtMocked {
  sign: jest.Mock
  verify: jest.Mock
  decode: jest.Mock
}

export function createJwtMocked(): JwtMocked {
  return {
    sign: jest.fn(),
    verify: jest.fn(),
    decode: jest.fn()
  }
}
