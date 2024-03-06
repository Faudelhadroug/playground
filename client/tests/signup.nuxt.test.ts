import { afterEach, describe, expect, it, vi } from 'vitest'

describe('signUp Component Integration Test', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  describe('when Signup is called', () => {
    it('should submits the form with valid data', async () => {

    })
  })
})

describe('checkPseudoLength', () => {
  describe('when checkPseudo is called', () => {
    it('should return false if argument are invalid', () => {
      // @ts-expect-error:TS2554
      expect(checkPseudoLength()).toBe(false)
    })
    it('should return false when < 4', () => {
      expect(checkPseudoLength('123')).toBe(false)
    })
    it('should return false > 18', () => {
      expect(checkPseudoLength('12345123451234512345')).toBe(false)
    })
    it('should return true when > 4 && < 18', () => {
      expect(checkPseudoLength('123451234512345123')).toBe(true)
    })
  })
})

describe('checkPasswordLength', () => {
  describe('when checkPasswordLength is called', () => {
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
})

describe('checkPasswordVariety', () => {
  describe('when checkPasswordVariety is called', () => {
    it('should return false if argument are invalid', () => {
      // @ts-expect-error:TS2554
      expect(checkPasswordVariety()).toBe(false)
      // @ts-expect-error:TS2554
      expect(checkPasswordVariety('aaa', 'bbb')).toBe(false)
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
  if (!password)
    return false
  const options = [
    /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
    /[a-zA-Z]/,
    /[0-9]/,
  ]
  const count = options.reduce((acc, option) => acc + (option.test(password) ? 1 : 0), 0)
  return count >= 2
}
