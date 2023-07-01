import { ArgumentsHost } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

export function getArgumentsHostMocked(): ArgumentsHost {
  return {
    getArgByIndex: jest.fn(() => ({} as any)),
    getArgs: jest.fn(() => ({} as any)),
    getType: jest.fn(() => ({} as any)),
    switchToHttp: jest.fn(() => {
      return {
        getNext: () => ({}),
        getRequest: () => ({}),
        getResponse: () => ({})
      } as any
    }),
    switchToRpc: jest.fn(() => ({} as any)),
    switchToWs: jest.fn(() => ({} as any))
  }
}

export function getHttpAdapterHostMocked(): HttpAdapterHost {
  const httpAdapterHost = new HttpAdapterHost()
  Object.assign(httpAdapterHost, {
    httpAdapter: {
      reply: jest.fn(() => undefined)
    }
  })

  return httpAdapterHost
}
