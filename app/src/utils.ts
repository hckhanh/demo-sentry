export function formatCurrency(
  value: { toString: () => string } | number | string,
) {
  const formatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })

  const currencyValue =
    typeof value === 'number'
      ? value
      : Number(typeof value === 'string' ? value : value.toString())

  return formatter.format(currencyValue)
}

export function formatPercent(value: number | string) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })

  return formatter.format(Number(value))
}
