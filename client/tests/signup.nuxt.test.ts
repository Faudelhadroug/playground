import { describe, expect, it } from 'vitest'

describe('checkPseudoLength', () => {
  it('should return false if argument are invalid', () => {
    // @ts-expect-error:TS2554
    expect(checkPseudoLength()).toBe(false)
    // @ts-expect-error:TS2554
    expect(checkPasswordVariety('aaa', 'bbb')).toBe(false)
  })
  it('should return false when < 4', () => {
    expect(checkPasswordLength('')).toBe(false)
    expect(checkPseudoLength('123')).toBe(false)
  })
  it('should return false > 18', () => {
    expect(checkPseudoLength('12345123451234512345')).toBe(false)
  })
  it('should return true when > 4 && < 18', () => {
    expect(checkPseudoLength('123451234512345123')).toBe(true)
  })
})

describe('checkPasswordLength', () => {
  it('should return false if argument are invalid', () => {
    // @ts-expect-error:TS2554
    expect(checkPasswordLength()).toBe(false)
    // @ts-expect-error:TS2554
    expect(checkPasswordVariety('aaa', 'bbb')).toBe(false)
  })
  it('should return false when < 8', () => {
    expect(checkPasswordLength('')).toBe(false)
    expect(checkPasswordLength('12345')).toBe(false)
  })
  it('should return false when > 32', () => {
    expect(checkPasswordLength('123451234512345123451234512345123')).toBe(false)
  })
  it('should return true when < 8 && > 32', () => {
    expect(checkPasswordLength('12345678')).toBe(true)
    expect(checkPasswordLength('12345123451234512345123451234512')).toBe(true)
    expect(checkPasswordLength('MarcoPoloVIII')).toBe(true)
  })
})

describe('checkPasswordVariety', () => {
  it('should return false if argument are invalid', () => {
    // @ts-expect-error:TS2554
    expect(checkPasswordVariety()).toBe(false)
    // @ts-expect-error:TS2554
    expect(checkPasswordVariety('aaa', 'bbb')).toBe(false)
  })
  it('should return false only string', () => {
    expect(checkPasswordVariety('aaaaa')).toBe(false)
  })
  it('should return false only string', () => {
    expect(checkPasswordVariety('aaaaa')).toBe(false)
  })
  it('should return false only number', () => {
    expect(checkPasswordVariety('412')).toBe(false)
  })
  it('should return false only symbol', () => {
    expect(checkPasswordVariety('@!-')).toBe(false)
  })
  it('should return true string + number', () => {
    expect(checkPasswordVariety('aaaaa123')).toBe(true)
  })
  it('should return true symbol + number', () => {
    expect(checkPasswordVariety('@!-{123')).toBe(true)
  })
  it('should return true string + symbol', () => {
    expect(checkPasswordVariety('aaaaa@(-')).toBe(true)
  })
  it('should return true string + number + symbol', () => {
    expect(checkPasswordVariety('aaaaa123(@-')).toBe(true)
    expect(checkPasswordVariety('aa(-bca123(@-14')).toBe(true)
  })
})

function checkPseudoLength(pseudo: string): boolean {
  if (!pseudo || pseudo.length < 4 || pseudo.length > 18)
    return false
  return true
}

function checkPasswordLength(password: string): boolean {
  if (!password || password.length < 8 || password.length > 32)
    return false
  return true
}

function checkPasswordVariety(password: string): boolean {
  if(!password) return false
  const options = [
    /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
    /[a-zA-Z]/,
    /[0-9]/,
  ]
  const count = options.reduce((acc, option) => acc + (option.test(password) ? 1 : 0), 0)
  return count >= 2 ? true : false
}
/*

import { expect, describe, test} from 'vitest'

function sum(a: number, b: number): number {
  return a + b
}

describe('Demo with sum', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })

  test.fails('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 4)).toBe(3)
  })
})

*/
