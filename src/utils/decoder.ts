export function decode(data: object) {
  return Object.values(data)
    .map((value: any) => {
      return String.fromCharCode(Number(value));
    })
    .join('');
}
