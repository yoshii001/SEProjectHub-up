import { format } from 'date-fns';

interface ClientInfo {
  name: string;
  company: string;
  email: string;
  phone: string;
}

interface ProjectRequirements {
  title: string;
  problemToSolve: string;
  description: string;
  targetUsers: string;
  goals: string;
  coreFeatures: string[];
  dataFields: string[];
  adminAccess: string;
  fileUploads: string;
  uiPreferences: {
    designInspiration: string;
    themeMode: string;
    animations: string;
    mustHaveComponents: string[];
  };
  technicalDetails: {
    hosting: string;
    database: string;
    adminDashboard: boolean;
    payments: boolean;
    paymentGateway?: string;
  };
  timeline: {
    deadline: string;
    budget: string;
    mvpFirst: boolean;
  };
  phases: Array<{
    name: string;
    duration: string;
  }>;
}

export const generateProjectRequirementsReport = (
  clientInfo: ClientInfo,
  requirements: ProjectRequirements
): string => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const reportHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Requirements Report - ${requirements.title}</title>
    <style>
        @page {
            size: A4;
            margin: 2cm;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #2d3748;
            background: white;
            font-size: 11pt;
        }
        
        .report-container {
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            background: white;
            min-height: 297mm;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #3182ce;
        }
        
        .header h1 {
            color: #2b6cb0;
            font-size: 24pt;
            font-weight: 700;
            margin-bottom: 8px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        
        .header .subtitle {
            color: #4a5568;
            font-size: 12pt;
            font-weight: 500;
        }
        
        .header .date {
            color: #718096;
            font-size: 10pt;
            margin-top: 8px;
        }
        
        .client-info {
            background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%);
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 25px;
            border-left: 5px solid #3182ce;
        }
        
        .client-info h2 {
            color: #2b6cb0;
            font-size: 14pt;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
        }
        
        .client-info h2::before {
            content: "👤";
            margin-right: 8px;
            font-size: 16pt;
        }
        
        .client-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }
        
        .client-detail {
            display: flex;
            align-items: center;
        }
        
        .client-detail strong {
            color: #2d3748;
            margin-right: 8px;
            min-width: 80px;
        }
        
        .section {
            margin-bottom: 25px;
            page-break-inside: avoid;
        }
        
        .section-header {
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 15px;
            border-left: 4px solid #4299e1;
        }
        
        .section-header h2 {
            color: #2b6cb0;
            font-size: 14pt;
            font-weight: 600;
            display: flex;
            align-items: center;
        }
        
        .section-content {
            padding: 0 16px;
        }
        
        .project-overview {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .project-title {
            color: #2b6cb0;
            font-size: 18pt;
            font-weight: 700;
            margin-bottom: 12px;
            text-align: center;
        }
        
        .overview-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 15px;
        }
        
        .overview-item h4 {
            color: #2d3748;
            font-size: 11pt;
            font-weight: 600;
            margin-bottom: 6px;
        }
        
        .overview-item p {
            color: #4a5568;
            font-size: 10pt;
            line-height: 1.5;
        }
        
        .feature-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-top: 10px;
        }
        
        .feature-item {
            background: #f0fff4;
            padding: 8px 12px;
            border-radius: 6px;
            border-left: 3px solid #38a169;
            font-size: 10pt;
            display: flex;
            align-items: center;
        }
        
        .feature-item::before {
            content: "✓";
            color: #38a169;
            font-weight: bold;
            margin-right: 8px;
        }
        
        .data-field {
            background: #fffaf0;
            padding: 6px 10px;
            border-radius: 4px;
            border-left: 2px solid #ed8936;
            margin: 4px 0;
            font-size: 10pt;
        }
        
        .tech-stack {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 10px;
        }
        
        .tech-item {
            background: #f0f4f8;
            padding: 10px;
            border-radius: 6px;
            text-align: center;
        }
        
        .tech-item strong {
            color: #2b6cb0;
            display: block;
            margin-bottom: 4px;
        }
        
        .timeline-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .timeline-table th {
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            font-size: 11pt;
        }
        
        .timeline-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 10pt;
        }
        
        .timeline-table tr:nth-child(even) {
            background: #f8f9fa;
        }
        
        .timeline-table tr:hover {
            background: #e6fffa;
        }
        
        .phase-duration {
            background: #e6fffa;
            color: #2c7a7b;
            padding: 4px 8px;
            border-radius: 4px;
            font-weight: 600;
        }
        
        .budget-highlight {
            background: linear-gradient(135deg, #fed7d7, #feb2b2);
            color: #c53030;
            padding: 8px 12px;
            border-radius: 6px;
            text-align: center;
            font-weight: 600;
            margin: 10px 0;
        }
        
        .component-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 8px;
            margin-top: 10px;
        }
        
        .component-item {
            background: #e6fffa;
            color: #2c7a7b;
            padding: 6px 10px;
            border-radius: 4px;
            text-align: center;
            font-size: 9pt;
            font-weight: 500;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
            text-align: center;
            color: #718096;
            font-size: 9pt;
        }
        
        .signature-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 30px;
        }
        
        .signature-box {
            text-align: center;
            padding: 20px;
            border: 1px dashed #cbd5e0;
            border-radius: 6px;
        }
        
        .signature-line {
            border-bottom: 1px solid #2d3748;
            margin: 20px 0 8px 0;
            height: 1px;
        }
        
        @media print {
            .report-container {
                padding: 0;
                box-shadow: none;
            }
            
            .section {
                page-break-inside: avoid;
            }
        }
        
        .emoji {
            font-size: 14pt;
            margin-right: 8px;
        }
    </style>
</head>
<body>
    <div class="report-container">
        <!-- Header -->
        <div class="header">
            <h1>Project Requirements Report</h1>
            <div class="subtitle">Comprehensive Project Specification Document</div>
            <div class="date">Generated on ${currentDate}</div>
        </div>

        <!-- Client Information -->
        <div class="client-info">
            <h2>Client Information</h2>
            <div class="client-details">
                <div class="client-detail">
                    <strong>Name:</strong> ${clientInfo.name}
                </div>
                <div class="client-detail">
                    <strong>Company:</strong> ${clientInfo.company}
                </div>
                <div class="client-detail">
                    <strong>Email:</strong> ${clientInfo.email}
                </div>
                <div class="client-detail">
                    <strong>Phone:</strong> ${clientInfo.phone}
                </div>
            </div>
        </div>

        <!-- Project Overview -->
        <div class="section">
            <div class="section-header">
                <h2><span class="emoji">📌</span>Project Overview</h2>
            </div>
            <div class="section-content">
                <div class="project-overview">
                    <div class="project-title">${requirements.title}</div>
                    <div class="overview-grid">
                        <div class="overview-item">
                            <h4>Problem Statement</h4>
                            <p>${requirements.problemToSolve}</p>
                        </div>
                        <div class="overview-item">
                            <h4>Target Users</h4>
                            <p>${requirements.targetUsers}</p>
                        </div>
                    </div>
                    <div style="margin-top: 15px;">
                        <h4>Project Description</h4>
                        <p>${requirements.description}</p>
                    </div>
                    <div style="margin-top: 15px;">
                        <h4>Main Goals</h4>
                        <p>${requirements.goals}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Core Requirements -->
        <div class="section">
            <div class="section-header">
                <h2><span class="emoji">🧱</span>Core Requirements</h2>
            </div>
            <div class="section-content">
                <h4>Main Features</h4>
                <div class="feature-list">
                    ${requirements.coreFeatures.map(feature => `<div class="feature-item">${feature}</div>`).join('')}
                </div>
            </div>
        </div>

        <!-- Data Fields -->
        <div class="section">
            <div class="section-header">
                <h2><span class="emoji">📋</span>Data Requirements</h2>
            </div>
            <div class="section-content">
                <h4>Required Data Fields</h4>
                ${requirements.dataFields.map(field => `<div class="data-field">${field}</div>`).join('')}
                
                <div style="margin-top: 15px;">
                    <h4>Admin Access</h4>
                    <p>${requirements.adminAccess}</p>
                </div>
                
                <div style="margin-top: 10px;">
                    <h4>File Upload Requirements</h4>
                    <p>${requirements.fileUploads}</p>
                </div>
            </div>
        </div>

        <!-- UI/UX Preferences -->
        <div class="section">
            <div class="section-header">
                <h2><span class="emoji">🖼</span>UI/UX Preferences</h2>
            </div>
            <div class="section-content">
                <div class="overview-grid">
                    <div class="overview-item">
                        <h4>Design Inspiration</h4>
                        <p>${requirements.uiPreferences.designInspiration}</p>
                    </div>
                    <div class="overview-item">
                        <h4>Theme Mode</h4>
                        <p>${requirements.uiPreferences.themeMode}</p>
                    </div>
                </div>
                
                <div style="margin-top: 15px;">
                    <h4>Animation Preference</h4>
                    <p>${requirements.uiPreferences.animations}</p>
                </div>
                
                <div style="margin-top: 15px;">
                    <h4>Must-Have Components</h4>
                    <div class="component-grid">
                        ${requirements.uiPreferences.mustHaveComponents.map(component => 
                            `<div class="component-item">${component}</div>`
                        ).join('')}
                    </div>
                </div>
            </div>
        </div>

        <!-- Technical Details -->
        <div class="section">
            <div class="section-header">
                <h2><span class="emoji">⚙</span>Technical Specifications</h2>
            </div>
            <div class="section-content">
                <div class="tech-stack">
                    <div class="tech-item">
                        <strong>Hosting Platform</strong>
                        ${requirements.technicalDetails.hosting}
                    </div>
                    <div class="tech-item">
                        <strong>Database</strong>
                        ${requirements.technicalDetails.database}
                    </div>
                    <div class="tech-item">
                        <strong>Admin Dashboard</strong>
                        ${requirements.technicalDetails.adminDashboard ? 'Required' : 'Not Required'}
                    </div>
                    <div class="tech-item">
                        <strong>Payment Processing</strong>
                        ${requirements.technicalDetails.payments ? 
                            `Yes - ${requirements.technicalDetails.paymentGateway}` : 'Not Required'}
                    </div>
                </div>
            </div>
        </div>

        <!-- Timeline & Budget -->
        <div class="section">
            <div class="section-header">
                <h2><span class="emoji">🕒</span>Timeline & Budget</h2>
            </div>
            <div class="section-content">
                <div class="overview-grid">
                    <div class="overview-item">
                        <h4>Project Deadline</h4>
                        <p>${requirements.timeline.deadline}</p>
                    </div>
                    <div class="overview-item">
                        <h4>Development Approach</h4>
                        <p>${requirements.timeline.mvpFirst ? 'MVP First, then scale' : 'Full development'}</p>
                    </div>
                </div>
                
                <div class="budget-highlight">
                    Budget Range: ${requirements.timeline.budget}
                </div>
            </div>
        </div>

        <!-- Project Timeline -->
        <div class="section">
            <div class="section-header">
                <h2><span class="emoji">📆</span>Project Timeline</h2>
            </div>
            <div class="section-content">
                <table class="timeline-table">
                    <thead>
                        <tr>
                            <th>Phase</th>
                            <th>Duration</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${requirements.phases.map(phase => `
                            <tr>
                                <td><strong>${phase.name}</strong></td>
                                <td><span class="phase-duration">${phase.duration}</span></td>
                                <td>${getPhaseDescription(phase.name)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Signature Section -->
        <div class="signature-section">
            <div class="signature-box">
                <strong>Client Approval</strong>
                <div class="signature-line"></div>
                <div>${clientInfo.name}</div>
                <div style="font-size: 9pt; color: #718096;">Date: ___________</div>
            </div>
            <div class="signature-box">
                <strong>Project Manager</strong>
                <div class="signature-line"></div>
                <div>SE Project Hub Team</div>
                <div style="font-size: 9pt; color: #718096;">Date: ___________</div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>SE Project Hub</strong> - Professional Software Development Services</p>
            <p>This document serves as the official project requirements specification.</p>
            <p>Generated automatically on ${currentDate}</p>
        </div>
    </div>
</body>
</html>`;

  return reportHTML;
};

function getPhaseDescription(phaseName: string): string {
  const descriptions: { [key: string]: string } = {
    'Requirement Analysis': 'Detailed analysis of project requirements, stakeholder interviews, and technical feasibility study.',
    'UI/UX Design': 'User interface design, user experience optimization, wireframing, and prototype development.',
    'Development': 'Core application development, feature implementation, and integration of all components.',
    'Testing': 'Comprehensive testing including unit tests, integration tests, and user acceptance testing.',
    'Deployment': 'Production deployment, final configuration, and go-live activities.'
  };
  
  return descriptions[phaseName] || 'Project phase execution and deliverable completion.';
}

export const downloadReportAsPDF = async (
  clientInfo: ClientInfo,
  requirements: ProjectRequirements
): Promise<void> => {
  try {
    const reportHTML = generateProjectRequirementsReport(clientInfo, requirements);
    
    // Create a new window with the report
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(reportHTML);
      printWindow.document.close();
      
      // Wait for content to load, then trigger print
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        
        // Close the window after printing (optional)
        setTimeout(() => {
          printWindow.close();
        }, 1000);
      }, 500);
    } else {
      throw new Error('Unable to open print window. Please check your browser settings.');
    }
  } catch (error) {
    console.error('Error generating PDF report:', error);
    throw new Error('Failed to generate PDF report');
  }
};

export const downloadReportAsHTML = (
  clientInfo: ClientInfo,
  requirements: ProjectRequirements
): void => {
  try {
    const reportHTML = generateProjectRequirementsReport(clientInfo, requirements);
    
    const blob = new Blob([reportHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${requirements.title.replace(/\s+/g, '_')}_Requirements_Report.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading HTML report:', error);
    throw new Error('Failed to download HTML report');
  }
};