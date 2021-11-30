const LRUCache = require('./index');

describe('Test cache at capacity 2', () => {
  const cache = new LRUCache(2)

  test('capacity is correct', () => {
    expect(cache.capacity).toBe(2)
  })
  test('put method is working', () => {
    cache.put(1, 1)
    cache.put(2, 2)
    expect(cache.size).toBe(2)
  })
  test('get method is working', () => {
    expect(cache.get(1)).toBe(1)
    expect(cache.get(2)).toBe(2)
  })
  test('delete method is working', () => {
    expect(cache.delete(1)).toBe(1)
    expect(cache.size).toBe(1)
    expect(cache.get(1)).toBe(-1)
    expect(cache.head).toBe(cache.cache[2])
    expect(cache.tail).toBe(cache.cache[2])
  })
  test('LRU node is deleted when over capacity', () => {
    cache.put(3, 3)
    cache.put(4, 4)

    expect(cache.get(2)).toBe(-1)
    expect(cache.get(3)).toBe(3)
    expect(cache.get(4)).toBe(4)
  })
})
