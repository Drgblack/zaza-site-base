export const formatBytes = (n: number): string => {
  if (n < 1024) return `${n} B`;
  const u = ['KB', 'MB', 'GB']; 
  let i = -1;
  do { 
    n = n / 1024; 
    i++; 
  } while (n >= 1024 && i < u.length - 1);
  return `${n.toFixed(1)} ${u[i]}`;
};