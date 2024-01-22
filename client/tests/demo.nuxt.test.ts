// @vitest-environment nuxt
import { expect, it } from 'vitest'

function sum(a: number, b: number): number {
  return a + b
}

it('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

it.fails('adds 1 + 4 to equal 3', () => {
  expect(sum(1, 4)).toBe(3)
})
