// frontend/src/services/pdfExport.js

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

/**
 * Export Friction Report as PDF
 */
export const exportFrictionReport = async (data, title = 'Friction_Report') => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const margin = 15
    let y = 20

    // === HEADER ===
    pdf.setFillColor(5, 8, 22)
    pdf.rect(0, 0, pageWidth, 35, 'F')
    
    pdf.setFontSize(22)
    pdf.setTextColor(124, 92, 255)
    pdf.text('AuraGen', margin, 18)
    
    pdf.setFontSize(10)
    pdf.setTextColor(156, 163, 175)
    pdf.text('Self-Healing Generative UI', margin, 26)

    // Report Title
    y = 45
    pdf.setFontSize(18)
    pdf.setTextColor(255, 255, 255)
    pdf.text(title.replace(/_/g, ' '), margin, y)
    y += 10

    // Timestamp
    pdf.setFontSize(10)
    pdf.setTextColor(156, 163, 175)
    const timestamp = new Date().toLocaleString()
    pdf.text(`Generated: ${timestamp}`, margin, y)
    y += 12

    // Divider
    pdf.setDrawColor(124, 92, 255, 0.3)
    pdf.line(margin, y, pageWidth - margin, y)
    y += 10

    // === FRICTION SCORE ===
    pdf.setFontSize(14)
    pdf.setTextColor(255, 255, 255)
    pdf.text('Friction Score Overview', margin, y)
    y += 8

    pdf.setFontSize(28)
    pdf.setTextColor(124, 92, 255)
    pdf.text(`${data.totalScore || 0}/100`, margin, y)
    y += 6

    pdf.setFontSize(10)
    pdf.setTextColor(156, 163, 175)
    const level = data.totalScore > 70 ? 'High' : data.totalScore > 40 ? 'Medium' : 'Low'
    pdf.text(`Level: ${level} Friction`, margin, y)
    y += 14

    // === FRICTION FACTORS ===
    pdf.setFontSize(14)
    pdf.setTextColor(255, 255, 255)
    pdf.text('Friction Factors', margin, y)
    y += 8

    if (data.factors && data.factors.length > 0) {
      data.factors.forEach((factor) => {
        if (y > 270) {
          pdf.addPage()
          y = 20
        }
        
        pdf.setFontSize(11)
        pdf.setTextColor(200, 200, 200)
        pdf.text(`${factor.label}: ${factor.value}%`, margin + 5, y)
        
        // Draw progress bar
        const barX = margin + 5
        const barY = y + 2
        const barWidth = 100
        const barHeight = 4
        
        pdf.setDrawColor(40, 40, 60)
        pdf.setFillColor(40, 40, 60)
        pdf.rect(barX, barY, barWidth, barHeight, 'F')
        
        pdf.setFillColor(factor.color || '#7C5CFF')
        const fillWidth = Math.min((factor.value / 100) * barWidth, barWidth)
        pdf.rect(barX, barY, fillWidth, barHeight, 'F')
        
        pdf.setFontSize(9)
        pdf.setTextColor(156, 163, 175)
        const detail = factor.detail || ''
        if (detail.length > 30) {
          pdf.text(detail.substring(0, 30) + '...', margin + 110, y + 1)
        } else {
          pdf.text(detail, margin + 110, y + 1)
        }
        
        y += 10
      })
    } else {
      pdf.setFontSize(10)
      pdf.setTextColor(156, 163, 175)
      pdf.text('No friction factors data available', margin + 5, y)
      y += 6
    }
    y += 6

    // === SCORE BREAKDOWN ===
    if (y > 250) {
      pdf.addPage()
      y = 20
    }
    
    pdf.setFontSize(14)
    pdf.setTextColor(255, 255, 255)
    pdf.text('Score Breakdown', margin, y)
    y += 8

    if (data.breakdown && data.breakdown.length > 0) {
      data.breakdown.forEach((item) => {
        if (y > 270) {
          pdf.addPage()
          y = 20
        }
        
        pdf.setFontSize(11)
        pdf.setTextColor(200, 200, 200)
        pdf.text(`${item.icon || '•'} ${item.label}: ${item.value}${item.contribution ? ' ' + item.contribution : ''}`, margin + 5, y)
        y += 8
      })
    } else {
      pdf.setFontSize(10)
      pdf.setTextColor(156, 163, 175)
      pdf.text('No breakdown data available', margin + 5, y)
      y += 6
    }
    y += 6

    // === RECENT EVENTS ===
    if (data.events && data.events.length > 0) {
      if (y > 240) {
        pdf.addPage()
        y = 20
      }
      
      pdf.setFontSize(14)
      pdf.setTextColor(255, 255, 255)
      pdf.text('Recent Friction Events', margin, y)
      y += 8

      data.events.slice(0, 5).forEach((event) => {
        if (y > 270) {
          pdf.addPage()
          y = 20
        }
        
        pdf.setFontSize(10)
        pdf.setTextColor(200, 200, 200)
        pdf.text(`• ${event.event || 'Unknown'}`, margin + 5, y)
        pdf.setFontSize(8)
        pdf.setTextColor(156, 163, 175)
        const severityColor = event.severity === 'High' ? '🔴' : 
                             event.severity === 'Medium' ? '🟡' : '🟢'
        pdf.text(`  ${severityColor} User: ${event.user || 'Unknown'} | Page: ${event.page || 'Unknown'} | Score: ${event.score || 0}`, margin + 10, y + 5)
        y += 12
      })
      y += 5
    }

    // === FOOTER ===
    if (y > 270) {
      pdf.addPage()
      y = 20
    }
    
    pdf.setDrawColor(40, 40, 60)
    pdf.line(margin, 280, pageWidth - margin, 280)
    
    pdf.setFontSize(8)
    pdf.setTextColor(100, 100, 120)
    pdf.text('Generated by AuraGen - Self-Healing Generative UI', margin, 288)
    pdf.text(`Page 1`, pageWidth - margin - 15, 288)

    // Save PDF
    const fileName = `${title.toLowerCase().replace(/\s/g, '_')}_${Date.now()}.pdf`
    pdf.save(fileName)
    return true
    
  } catch (error) {
    console.error('Error exporting friction report:', error)
    throw error
  }
}

/**
 * Export Dashboard as PDF
 */
export const exportDashboardPDF = async (elementId, title = 'Dashboard_Report') => {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`)
    }

    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#050816',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    // Add title
    pdf.setFontSize(18)
    pdf.setTextColor(124, 92, 255)
    pdf.text('AuraGen Dashboard', 15, 15)

    // Add timestamp
    pdf.setFontSize(10)
    pdf.setTextColor(128, 128, 128)
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 15, 25)

    // Add image
    const imgHeight = Math.min(pdfHeight - 40, 260)
    pdf.addImage(imgData, 'PNG', 15, 32, pdfWidth - 30, imgHeight)

    // Add footer
    pdf.setFontSize(8)
    pdf.setTextColor(100, 100, 120)
    pdf.text('Generated by AuraGen - Self-Healing Generative UI', 15, pdf.internal.pageSize.getHeight() - 10)

    const fileName = `${title.toLowerCase().replace(/\s/g, '_')}_${Date.now()}.pdf`
    pdf.save(fileName)
    return true
    
  } catch (error) {
    console.error('Error exporting dashboard PDF:', error)
    throw error
  }
}

/**
 * Export Sessions Report as PDF
 */
export const exportSessionsReport = async (sessions, title = 'Sessions_Report') => {
  try {
    const pdf = new jsPDF('l', 'mm', 'a4') // Landscape
    const margin = 15
    let y = 20
    const pageWidth = pdf.internal.pageSize.getWidth()

    // Header
    pdf.setFontSize(20)
    pdf.setTextColor(124, 92, 255)
    pdf.text('AuraGen - Sessions Report', margin, y)
    y += 10

    pdf.setFontSize(10)
    pdf.setTextColor(128, 128, 128)
    pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, y)
    y += 12

    // Table Headers
    pdf.setFontSize(10)
    pdf.setTextColor(255, 255, 255)
    const headers = ['Session ID', 'User', 'Page', 'Friction', 'Duration', 'Status', 'Generated UI']
    const colWidths = [40, 45, 45, 35, 35, 40, 45]
    let x = margin

    // Draw header background
    pdf.setFillColor(124, 92, 255, 0.2)
    pdf.rect(margin, y - 4, colWidths.reduce((a, b) => a + b, 0), 10, 'F')

    headers.forEach((header, i) => {
      pdf.text(header, x, y + 3)
      x += colWidths[i]
    })
    y += 12

    // Table Rows
    pdf.setFontSize(9)
    pdf.setTextColor(200, 200, 200)
    
    const rows = sessions.slice(0, 20) // Limit to 20 rows
    rows.forEach((session) => {
      if (y > 180) {
        pdf.addPage()
        y = 20
        // Re-draw headers on new page
        pdf.setFontSize(10)
        pdf.setTextColor(255, 255, 255)
        pdf.setFillColor(124, 92, 255, 0.2)
        pdf.rect(margin, y - 4, colWidths.reduce((a, b) => a + b, 0), 10, 'F')
        x = margin
        headers.forEach((header, i) => {
          pdf.text(header, x, y + 3)
          x += colWidths[i]
        })
        y += 12
        pdf.setFontSize(9)
        pdf.setTextColor(200, 200, 200)
      }
      
      x = margin
      const rowData = [
        session.id || 'Unknown',
        session.user || 'Unknown',
        session.page || 'Unknown',
        `${session.friction || 0}%`,
        session.duration || '0m',
        session.status || 'Unknown',
        session.generatedUI || 'N/A'
      ]
      
      rowData.forEach((data, i) => {
        // Truncate long text
        const displayText = data.length > 15 ? data.substring(0, 15) + '...' : data
        pdf.text(displayText, x, y + 2)
        x += colWidths[i]
      })
      y += 8
    })

    // Footer
    pdf.setFontSize(8)
    pdf.setTextColor(100, 100, 120)
    pdf.text(`Total Sessions: ${sessions.length}`, margin, pdf.internal.pageSize.getHeight() - 10)
    pdf.text('Generated by AuraGen', pageWidth - margin - 40, pdf.internal.pageSize.getHeight() - 10)

    const fileName = `${title.toLowerCase().replace(/\s/g, '_')}_${Date.now()}.pdf`
    pdf.save(fileName)
    return true
    
  } catch (error) {
    console.error('Error exporting sessions report:', error)
    throw error
  }
}

export default {
  exportFrictionReport,
  exportDashboardPDF,
  exportSessionsReport
}