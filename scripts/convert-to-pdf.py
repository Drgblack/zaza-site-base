#!/usr/bin/env python3
import os
import sys
from pathlib import Path

# Try to import required packages
try:
    from reportlab.lib.pagesizes import letter, A4
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.lib.colors import HexColor
except ImportError:
    print("Installing required packages...")
    os.system("pip install reportlab")
    from reportlab.lib.pagesizes import letter, A4
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.lib.colors import HexColor

def markdown_to_pdf(markdown_file, output_pdf):
    """Convert markdown file to PDF with proper formatting."""
    
    # Read markdown content
    with open(markdown_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Create PDF document
    doc = SimpleDocTemplate(output_pdf, pagesize=letter, 
                          rightMargin=72, leftMargin=72,
                          topMargin=72, bottomMargin=18)
    
    # Define styles
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=30,
        textColor=HexColor('#7E3AF2'),
        alignment=1  # Center
    )
    
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=16,
        spaceAfter=20,
        textColor=HexColor('#475569'),
        alignment=1  # Center
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=18,
        spaceBefore=20,
        spaceAfter=12,
        textColor=HexColor('#7E3AF2')
    )
    
    subheading_style = ParagraphStyle(
        'CustomSubheading',
        parent=styles['Heading3'],
        fontSize=14,
        spaceBefore=16,
        spaceAfter=8,
        textColor=HexColor('#6C2BD9')
    )
    
    code_style = ParagraphStyle(
        'CustomCode',
        parent=styles['Code'],
        fontSize=10,
        leftIndent=20,
        rightIndent=20,
        spaceBefore=8,
        spaceAfter=8,
        backColor=HexColor('#F8F9FA')
    )
    
    # Build content
    story = []
    lines = content.split('\n')
    in_code_block = False
    code_lines = []
    
    for line in lines:
        line = line.strip()
        
        if line.startswith('```'):
            if in_code_block:
                # End of code block
                if code_lines:
                    code_text = '\n'.join(code_lines)
                    story.append(Paragraph(code_text.replace('\n', '<br/>'), code_style))
                    story.append(Spacer(1, 12))
                code_lines = []
                in_code_block = False
            else:
                # Start of code block
                in_code_block = True
            continue
        
        if in_code_block:
            code_lines.append(line)
            continue
        
        if line.startswith('# ') and '##' not in line:
            # Main title
            title_text = line[2:].strip()
            story.append(Paragraph(title_text, title_style))
            story.append(Spacer(1, 12))
            
        elif line.startswith('## '):
            # Section heading
            heading_text = line[3:].strip()
            story.append(Paragraph(heading_text, heading_style))
            story.append(Spacer(1, 8))
            
        elif line.startswith('### '):
            # Subsection heading
            subheading_text = line[4:].strip()
            story.append(Paragraph(subheading_text, subheading_style))
            story.append(Spacer(1, 6))
            
        elif line.startswith('*') and line.endswith('*') and len(line) > 20:
            # Subtitle/emphasis
            subtitle_text = line[1:-1].strip()
            story.append(Paragraph(subtitle_text, subtitle_style))
            story.append(Spacer(1, 12))
            
        elif line.startswith('- ') or line.startswith('* '):
            # Bullet point
            bullet_text = '• ' + line[2:]
            story.append(Paragraph(bullet_text, styles['Normal']))
            story.append(Spacer(1, 4))
            
        elif line.startswith('1. ') or line.startswith('2. ') or line.startswith('3. '):
            # Numbered list
            story.append(Paragraph(line, styles['Normal']))
            story.append(Spacer(1, 4))
            
        elif line == '---':
            # Horizontal rule / page break
            story.append(Spacer(1, 20))
            
        elif line and not line.startswith('#'):
            # Regular paragraph
            # Handle bold text
            line = line.replace('**', '<b>').replace('**', '</b>')
            story.append(Paragraph(line, styles['Normal']))
            story.append(Spacer(1, 6))
    
    # Build PDF
    doc.build(story)
    print(f"PDF created: {output_pdf}")

if __name__ == "__main__":
    # Convert the AI grading prompts content
    markdown_file = "public/resources/ai-grading-prompts-content.md"
    output_pdf = "public/resources/ai-grading-prompts.pdf"
    
    if os.path.exists(markdown_file):
        markdown_to_pdf(markdown_file, output_pdf)
    else:
        print(f"Markdown file not found: {markdown_file}")