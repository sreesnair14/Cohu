import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

// Renders the given DOM node into a single landscape A4 PDF page.
// Captures the current filter state exactly as shown on screen.
export async function exportChartToPdf(node) {
  const canvas = await html2canvas(node, {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true,
  })

  const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()
  const margin = 28

  const availW = pageW - margin * 2
  const availH = pageH - margin * 2
  const ratio = Math.min(availW / canvas.width, availH / canvas.height)
  const imgW = canvas.width * ratio
  const imgH = canvas.height * ratio
  const x = (pageW - imgW) / 2
  const y = margin

  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, imgW, imgH)

  pdf.setFontSize(8)
  pdf.setTextColor(120)
  pdf.text(
    'The Corporate — Double Materiality Assessment 2025 — Confidential',
    pageW / 2,
    pageH - 16,
    { align: 'center' },
  )

  pdf.save('The-Corporate-Double-Materiality-Matrix-2025.pdf')
}
