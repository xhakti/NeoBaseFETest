export function truncateAddress(input: string): string {
  const truncated = input.substr(0, 5);
  return truncated + "..." + input.substr(input.length - 5);
}
