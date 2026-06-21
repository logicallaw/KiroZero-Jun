export function formatWon(value: number): string {
  return `${new Intl.NumberFormat("ko-KR").format(value)}원`;
}

export function perMealCost(groceryCost: number, meals: number): number {
  return Math.round(groceryCost / meals / 100) * 100;
}
