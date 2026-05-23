export function detectAnomalies(data: any[], key: string, threshold = 2) {
  if (data.length < 5) return []
  const values = data.map(d => d[key])
  const avg = values.reduce((a, b) => a + b, 0) / values.length
  const std = Math.sqrt(values.map(v => Math.pow(v - avg, 2)).reduce((a, b) => a + b, 0) / values.length)
  
  return data.filter(d => Math.abs(d[key] - avg) > threshold * std)
}
