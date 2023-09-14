export function getFormattedDate(date: Date): string {
  const year = date.getFullYear()
  const month = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ][date.getMonth()]
  const day = String(date.getDate()).padStart(2, '0')

  return `${month} ${day}, ${year}`
}
