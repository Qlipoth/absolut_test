export function generateTestData() {
  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    age: Math.floor(Math.random() * (60 - 18 + 1)) + 18, // Случайный возраст от 18 до 60
  }));
}