export function getNowIso(): string {
  return new Date().toISOString();
}

export function formatDisplayDate(isoString: string): string {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return 'Unknown date';
  }

  const datePart = date.toLocaleDateString();
  const timePart = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${datePart} ${timePart}`;
}
