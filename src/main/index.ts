type Name = string;

export function hello(name: Name): string {
  return `Hello, ${name}!`;
}

export async function asyncHello(name: Name): Promise<string> {
  return `Hello, ${name}!`;
}

console.log(hello('world'));
