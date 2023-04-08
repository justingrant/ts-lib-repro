function later(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export async function sayHi(name: string) {
  await later(100);
  console.log(`Hi, ${name}`);
}
