#!/usr/bin/env python3
import os
import re
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor

def parse_frontmatter_and_content(content):
    """Parse YAML frontmatter and content from markdown."""
    if content.startswith('---'):
        try:
            end_idx = content.index('---', 3)
            frontmatter = content[3:end_idx].strip()
            body = content[end_idx + 3:].strip()
            
            # Simple YAML parsing for our known structure
            metadata = {}
            for line in frontmatter.split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    key = key.strip()
                    value = value.strip().strip('"\'')
                    metadata[key] = value
            
            return metadata, body
        except ValueError:
            return {}, content
    return {}, content

def markdown_to_pdf_simple(md_file, output_dir):
    """Convert markdown to PDF using reportlab with basic styling."""
    
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    metadata, body = parse_frontmatter_and_content(content)
    
    title = metadata.get('title', 'Resource')
    slug = metadata.get('slug', 'resource')
    category = metadata.get('category', 'general')
    version = metadata.get('version', '1.0')
    lang = metadata.get('lang', 'en')
    
    # Create output directory
    category_dir = Path(output_dir) / category
    category_dir.mkdir(parents=True, exist_ok=True)
    
    # Create PDF filename
    pdf_path = category_dir / f"{slug}-v{version}-{lang}.pdf"
    
    # Create PDF
    doc = SimpleDocTemplate(str(pdf_path), pagesize=letter,
                          rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
    
    styles = getSampleStyleSheet()
    
    # Custom styles matching the theme
    title_style = ParagraphStyle(
        'Title', parent=styles['Heading1'], fontSize=24, spaceAfter=20,
        textColor=HexColor('#0b1220'), alignment=0
    )
    
    heading_style = ParagraphStyle(
        'Heading', parent=styles['Heading2'], fontSize=18,
        spaceBefore=16, spaceAfter=8, textColor=HexColor('#7c3aed')
    )
    
    subheading_style = ParagraphStyle(
        'SubHeading', parent=styles['Heading3'], fontSize=14,
        spaceBefore=12, spaceAfter=6, textColor=HexColor('#0b1220')
    )
    
    content_elements = []
    
    # Add title
    content_elements.append(Paragraph(title, title_style))
    
    # Add subtitle if present
    if 'summary' in metadata:
        content_elements.append(Paragraph(metadata['summary'], styles['Heading3']))
    
    content_elements.append(Spacer(1, 12))
    
    # Process markdown content
    lines = body.split('\n')
    
    for line in lines:
        line = line.strip()
        
        if not line:
            content_elements.append(Spacer(1, 6))
            continue
            
        if line.startswith('# '):
            # H1 - Main title (skip, already added)
            continue
        elif line.startswith('## '):
            # H2 - Section heading
            heading_text = line[3:].strip()
            content_elements.append(Paragraph(heading_text, heading_style))
        elif line.startswith('### '):
            # H3 - Subsection
            subheading_text = line[4:].strip()
            content_elements.append(Paragraph(subheading_text, subheading_style))
        elif line.startswith('- ') or line.startswith('* '):
            # Bullet point
            bullet_text = '• ' + line[2:]
            content_elements.append(Paragraph(bullet_text, styles['Normal']))
        elif line.startswith('<div class="callout'):
            # Skip HTML callout start
            continue
        elif line.startswith('</div>'):
            # Skip HTML callout end
            continue
        elif line.startswith('<div class="footer">'):
            # Add footer
            footer_text = lines[lines.index(line) + 1] if lines.index(line) + 1 < len(lines) else ''
            content_elements.append(Spacer(1, 20))
            content_elements.append(Paragraph(footer_text, styles['Italic']))
            break
        elif '|' in line and line.count('|') > 2:
            # Simple table handling - just make it a paragraph for now
            content_elements.append(Paragraph(line.replace('|', ' | '), styles['Normal']))
        elif line and not line.startswith('<'):
            # Regular paragraph
            # Clean up some markdown formatting
            line = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', line)  # Bold
            line = re.sub(r'\*(.*?)\*', r'<i>\1</i>', line)      # Italic
            line = re.sub(r'{{(.*?)}}', r'[\1]', line)           # Template placeholders
            
            content_elements.append(Paragraph(line, styles['Normal']))
            content_elements.append(Spacer(1, 4))
    
    # Build PDF
    doc.build(content_elements)
    print(f"[resources] wrote: {pdf_path}")
    return True

def main():
    """Generate PDFs from markdown files."""
    src_dir = Path('resources-src')
    output_dir = Path('public/resources')
    
    if not src_dir.exists():
        print(f"Source directory {src_dir} does not exist")
        return
    
    md_files = list(src_dir.glob('*.md'))
    count = 0
    
    for md_file in md_files:
        try:
            if markdown_to_pdf_simple(md_file, output_dir):
                count += 1
        except Exception as e:
            print(f"Error processing {md_file}: {e}")
    
    print(f"[resources] generated PDFs: {count}")

if __name__ == "__main__":
    main()