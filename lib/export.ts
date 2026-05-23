/**
 * Export utilities for CSV and PDF
 */

export function exportToCSV(data: Record<string, any>[], filename: string) {
  if (!data || data.length === 0) return
  const headers = Object.keys(data[0])
  const rows = data.map(row =>
    headers.map(h => {
      const val = row[h]
      if (val === null || val === undefined) return ''
      const str = String(val)
      return str.includes(',') || str.includes('"') || str.includes('\n')
        ? `"${str.replace(/"/g, '""')}"`
        : str
    }).join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${filename}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export async function exportToPDF(
  title: string,
  sections: { heading: string; data: Record<string, any>[]; columns?: string[] }[],
  filename: string
) {
  const { default: jsPDF } = await import('jspdf')
  const { default: autoTable } = await import('jspdf-autotable')

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })

  // Header
  doc.setFontSize(20)
  doc.setTextColor(255, 107, 53)
  doc.text('CloudPulse', 15, 18)
  doc.setFontSize(13)
  doc.setTextColor(60, 60, 60)
  doc.text(title, 15, 26)
  doc.setFontSize(9)
  doc.setTextColor(140, 140, 140)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 15, 32)

  let yOffset = 40

  for (const section of sections) {
    if (!section.data || section.data.length === 0) continue

    const cols = section.columns || Object.keys(section.data[0])

    doc.setFontSize(11)
    doc.setTextColor(40, 40, 40)
    doc.text(section.heading, 15, yOffset)
    yOffset += 4

    autoTable(doc, {
      startY: yOffset,
      head: [cols],
      body: section.data.map(row => cols.map(c => {
        const v = row[c]
        if (v === null || v === undefined) return ''
        return String(v)
      })),
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [255, 107, 53], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 249, 252] },
      margin: { left: 15, right: 15 },
    })

    yOffset = (doc as any).lastAutoTable.finalY + 10

    if (yOffset > 185) {
      doc.addPage()
      yOffset = 20
    }
  }

  doc.save(`${filename}.pdf`)
}
