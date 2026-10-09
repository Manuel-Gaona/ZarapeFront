const formatoMoneda = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

// 40 -> "$40"     15.5 -> "$15.5"
export function precio(cantidad) {
  return formatoMoneda.format(cantidad)
}

// "09:00" -> "09:00 a.m."     "19:00" -> "07:00 p.m."
export function hora12(hora) {
  if (!hora) return ''
  const [horas, minutos] = hora.split(':').map(Number)
  const sufijo = horas < 12 ? 'a.m.' : 'p.m.'
  const horas12 = horas % 12 || 12
  return `${String(horas12).padStart(2, '0')}:${String(minutos).padStart(2, '0')} ${sufijo}`
}
