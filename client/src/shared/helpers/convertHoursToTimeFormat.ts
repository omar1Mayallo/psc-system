export default function convertHoursToTimeFormat(hrs: number): string {
  // 2.26 hours i need to convert this to form "2 hours : 0.26*60 minutes"

  const hours = Math.floor(hrs);
  const minutes = Math.round((hrs % 1) * 60);

  return `${hours} hours: ${minutes} minutes`;
}
