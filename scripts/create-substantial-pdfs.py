#!/usr/bin/env python3
import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor

def create_ai_grading_prompts_pdf():
    """Create a comprehensive AI Grading Prompts PDF."""
    
    doc = SimpleDocTemplate("public/resources/ai-grading-prompts.pdf", pagesize=letter,
                          rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'Title', parent=styles['Heading1'], fontSize=24, spaceAfter=30,
        textColor=HexColor('#7E3AF2'), alignment=1
    )
    
    heading_style = ParagraphStyle(
        'Heading', parent=styles['Heading2'], fontSize=18,
        spaceBefore=20, spaceAfter=12, textColor=HexColor('#7E3AF2')
    )
    
    content = []
    
    # Title
    content.append(Paragraph("AI Grading Prompts - Complete Teacher's Toolkit", title_style))
    content.append(Paragraph("50+ Ready-to-Use Prompts for Efficient Student Feedback", styles['Heading3']))
    content.append(Spacer(1, 20))
    
    # Introduction
    content.append(Paragraph("Quick Start Guide", heading_style))
    content.append(Paragraph("Save 5+ hours per week while providing better feedback than ever before. These AI prompts help you generate meaningful, personalized feedback quickly and efficiently.", styles['Normal']))
    content.append(Spacer(1, 12))
    
    content.append(Paragraph("How to Use These Prompts:", styles['Heading4']))
    content.append(Paragraph("1. Copy the prompt that matches your grading situation", styles['Normal']))
    content.append(Paragraph("2. Replace [bracketed placeholders] with specific details", styles['Normal']))
    content.append(Paragraph("3. Paste into your AI tool (ChatGPT, Claude, Bard, etc.)", styles['Normal']))
    content.append(Paragraph("4. Review and personalize the generated feedback", styles['Normal']))
    content.append(Paragraph("5. Copy the result into your gradebook", styles['Normal']))
    content.append(Spacer(1, 20))
    
    # Core Prompts
    content.append(Paragraph("Essential Grading Prompts", heading_style))
    
    # Prompt 1
    content.append(Paragraph("Prompt 1: Comprehensive Assignment Feedback", styles['Heading4']))
    prompt1 = """Acting as an experienced teacher, provide constructive feedback for a [grade level] student's [assignment type] on [topic].

Student's work summary: [paste/describe student work]
Assignment criteria: [list 3-4 key criteria]

Please provide:
1. Two specific strengths in their work
2. One area for improvement with specific suggestions  
3. An encouraging closing statement
4. Suggested next steps for learning

Tone: Encouraging, constructive, age-appropriate for [grade level]"""
    
    content.append(Paragraph(prompt1, styles['Code']))
    content.append(Spacer(1, 12))
    
    # Prompt 2
    content.append(Paragraph("Prompt 2: Quick Assessment Feedback", styles['Heading4']))
    prompt2 = """Generate brief, positive feedback for a [grade level] student's [assignment type].

Student performance: [describe performance level - excellent/good/needs improvement]
Key achievement: [what they did well]
Area to develop: [what needs work]

Provide a 2-3 sentence comment that celebrates their success and motivates continued learning. Keep it encouraging and specific."""
    
    content.append(Paragraph(prompt2, styles['Code']))
    content.append(Spacer(1, 12))
    
    # Subject-Specific Section
    content.append(Paragraph("Subject-Specific Prompts", heading_style))
    
    # Math Prompt
    content.append(Paragraph("Mathematics: Problem Solving Feedback", styles['Heading4']))
    math_prompt = """Provide feedback for a [grade level] student's math work on [topic]:

Student's solution: [describe their approach and answer]
Correct answer: [if different from student's]
Key math skills assessed: [list 2-3 skills]

Generate feedback that:
- Recognizes correct mathematical reasoning
- Addresses any misconceptions clearly
- Suggests strategies for improvement
- Builds confidence in math problem-solving"""
    
    content.append(Paragraph(math_prompt, styles['Code']))
    content.append(Spacer(1, 12))
    
    # Writing Prompt
    content.append(Paragraph("English Language Arts: Writing Assessment", styles['Heading4']))
    writing_prompt = """Evaluate this [grade level] student's [writing type - essay/story/report]:

Writing sample: [paste excerpt or describe main elements]
Focus areas: [content/organization/voice/conventions]

Provide:
- Celebration of their strongest writing element
- Specific suggestions for improvement
- One concrete next step for writing development
- Encouragement related to their growth as a writer"""
    
    content.append(Paragraph(writing_prompt, styles['Code']))
    content.append(Spacer(1, 12))
    
    # Time-Saving Tips
    content.append(Paragraph("Time-Saving Strategies", heading_style))
    content.append(Paragraph("Batch Processing: Group similar assignments together and use the same prompt template for efficiency.", styles['Normal']))
    content.append(Paragraph("Custom Libraries: Save your modified prompts in a document for quick access.", styles['Normal']))
    content.append(Paragraph("Voice Input: Use speech-to-text to quickly input student work descriptions.", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # Parent Communication
    content.append(Paragraph("Parent Communication Prompts", heading_style))
    parent_prompt = """Generate a positive progress email to parents about their [grade level] child's recent work:

Student achievements: [specific accomplishments]
Growth areas: [what they're improving]
Classroom behavior: [positive observations]

Create an email that celebrates specific successes, shows you know their child well, and encourages continued support at home."""
    
    content.append(Paragraph(parent_prompt, styles['Code']))
    content.append(Spacer(1, 12))
    
    # Conclusion
    content.append(Paragraph("Implementation Tips", heading_style))
    content.append(Paragraph("Start with 2-3 prompts that match your immediate needs. Always review AI-generated feedback before sharing. Personalize with specific student details and classroom context.", styles['Normal']))
    content.append(Spacer(1, 12))
    
    content.append(Paragraph("Expected Benefits:", styles['Normal']))
    content.append(Paragraph("• Save 5-8 hours per week on grading", styles['Normal']))
    content.append(Paragraph("• Provide more frequent, specific feedback", styles['Normal']))
    content.append(Paragraph("• Maintain consistent, encouraging tone", styles['Normal']))
    content.append(Paragraph("• Reduce teacher burnout and stress", styles['Normal']))
    
    doc.build(content)
    print("Created: public/resources/ai-grading-prompts.pdf")

def create_assessment_rubric_pdf():
    """Create a comprehensive Assessment Rubric Template PDF."""
    
    doc = SimpleDocTemplate("public/resources/assessment-rubric-template.pdf", pagesize=letter,
                          rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
    
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'Title', parent=styles['Heading1'], fontSize=24, spaceAfter=30,
        textColor=HexColor('#7E3AF2'), alignment=1
    )
    
    heading_style = ParagraphStyle(
        'Heading', parent=styles['Heading2'], fontSize=18,
        spaceBefore=20, spaceAfter=12, textColor=HexColor('#7E3AF2')
    )
    
    content = []
    
    # Title
    content.append(Paragraph("Assessment Rubric Templates", title_style))
    content.append(Paragraph("Professional Rubrics for Various Subjects and Projects", styles['Heading3']))
    content.append(Spacer(1, 20))
    
    # Introduction
    content.append(Paragraph("Why Use Rubrics?", heading_style))
    content.append(Paragraph("Rubrics provide clear expectations, ensure consistent grading, and help students understand quality standards. They save time while improving assessment accuracy.", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # Generic Rubric Template
    content.append(Paragraph("4-Point Generic Rubric Template", heading_style))
    content.append(Paragraph("Criterion 1: [Content Knowledge]", styles['Heading4']))
    content.append(Paragraph("4 - Exemplary: Demonstrates exceptional understanding with detailed examples and connections", styles['Normal']))
    content.append(Paragraph("3 - Proficient: Shows solid understanding with some examples and connections", styles['Normal']))
    content.append(Paragraph("2 - Developing: Shows basic understanding with limited examples", styles['Normal']))
    content.append(Paragraph("1 - Beginning: Shows minimal understanding with little to no examples", styles['Normal']))
    content.append(Spacer(1, 12))
    
    content.append(Paragraph("Criterion 2: [Communication/Presentation]", styles['Heading4']))
    content.append(Paragraph("4 - Exemplary: Clear, engaging, well-organized with excellent use of language", styles['Normal']))
    content.append(Paragraph("3 - Proficient: Generally clear and organized with good use of language", styles['Normal']))
    content.append(Paragraph("2 - Developing: Somewhat clear with adequate organization and language use", styles['Normal']))
    content.append(Paragraph("1 - Beginning: Unclear or disorganized with poor language use", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # Subject-Specific Templates
    content.append(Paragraph("Writing Assignment Rubric", heading_style))
    content.append(Paragraph("Focus/Ideas (25%): How well does the writing address the topic with clear main ideas?", styles['Normal']))
    content.append(Paragraph("Organization (25%): How well is the writing structured with logical flow?", styles['Normal']))
    content.append(Paragraph("Voice/Style (25%): How engaging and appropriate is the writing voice?", styles['Normal']))
    content.append(Paragraph("Conventions (25%): How accurate are grammar, spelling, and mechanics?", styles['Normal']))
    content.append(Spacer(1, 12))
    
    content.append(Paragraph("Science Project Rubric", heading_style))
    content.append(Paragraph("Scientific Method: Following proper procedures and methodology", styles['Normal']))
    content.append(Paragraph("Data Collection: Accuracy and completeness of observations/measurements", styles['Normal']))
    content.append(Paragraph("Analysis: Quality of conclusions drawn from evidence", styles['Normal']))
    content.append(Paragraph("Presentation: Clarity of communication and visual aids", styles['Normal']))
    content.append(Spacer(1, 12))
    
    content.append(Paragraph("Group Project Rubric", heading_style))
    content.append(Paragraph("Collaboration: How well team members worked together", styles['Normal']))
    content.append(Paragraph("Individual Contribution: Quality and quantity of each member's work", styles['Normal']))
    content.append(Paragraph("Final Product: Overall quality of the completed project", styles['Normal']))
    content.append(Paragraph("Process: Time management and problem-solving throughout", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # Implementation Guide
    content.append(Paragraph("Implementation Tips", heading_style))
    content.append(Paragraph("1. Share rubrics with students before assignments begin", styles['Normal']))
    content.append(Paragraph("2. Use rubrics for self-assessment and peer feedback", styles['Normal']))
    content.append(Paragraph("3. Provide specific examples for each performance level", styles['Normal']))
    content.append(Paragraph("4. Allow students to ask questions about criteria", styles['Normal']))
    content.append(Paragraph("5. Use rubric language in your feedback comments", styles['Normal']))
    
    doc.build(content)
    print("Created: public/resources/assessment-rubric-template.pdf")

def create_formative_assessment_pdf():
    """Create a Formative Assessment Checklist PDF."""
    
    doc = SimpleDocTemplate("public/resources/formative-assessment-checklist.pdf", pagesize=letter,
                          rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
    
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'Title', parent=styles['Heading1'], fontSize=24, spaceAfter=30,
        textColor=HexColor('#7E3AF2'), alignment=1
    )
    
    heading_style = ParagraphStyle(
        'Heading', parent=styles['Heading2'], fontSize=18,
        spaceBefore=20, spaceAfter=12, textColor=HexColor('#7E3AF2')
    )
    
    content = []
    
    # Title
    content.append(Paragraph("Formative Assessment Checklist", title_style))
    content.append(Paragraph("Quick Reference for Effective Assessment Strategies", styles['Heading3']))
    content.append(Spacer(1, 20))
    
    # Daily Strategies
    content.append(Paragraph("Daily Formative Assessment Strategies", heading_style))
    content.append(Paragraph("□ Exit tickets: 3-5 minute responses at lesson end", styles['Normal']))
    content.append(Paragraph("□ Thumbs up/down: Quick understanding check", styles['Normal']))
    content.append(Paragraph("□ Think-pair-share: Partner discussions before sharing", styles['Normal']))
    content.append(Paragraph("□ Whiteboards: Individual responses shown simultaneously", styles['Normal']))
    content.append(Paragraph("□ One thing learned: Students share key takeaway", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # Weekly Strategies
    content.append(Paragraph("Weekly Assessment Techniques", heading_style))
    content.append(Paragraph("□ Learning journals: Student reflection on progress", styles['Normal']))
    content.append(Paragraph("□ Peer feedback: Students assess each other's work", styles['Normal']))
    content.append(Paragraph("□ Gallery walks: Review and comment on displayed work", styles['Normal']))
    content.append(Paragraph("□ Self-assessment checklists: Students evaluate own learning", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # Digital Tools
    content.append(Paragraph("Digital Formative Assessment Tools", heading_style))
    content.append(Paragraph("□ Online polls (Mentimeter, Poll Everywhere)", styles['Normal']))
    content.append(Paragraph("□ Quiz platforms (Kahoot, Quizizz)", styles['Normal']))
    content.append(Paragraph("□ Collaborative documents (Google Docs, Padlet)", styles['Normal']))
    content.append(Paragraph("□ Video responses (Flipgrid, Loom)", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # Implementation Checklist
    content.append(Paragraph("Implementation Checklist", heading_style))
    content.append(Paragraph("Before the Lesson:", styles['Heading4']))
    content.append(Paragraph("□ Identify specific learning targets to assess", styles['Normal']))
    content.append(Paragraph("□ Choose appropriate assessment strategy", styles['Normal']))
    content.append(Paragraph("□ Prepare materials or digital tools", styles['Normal']))
    content.append(Spacer(1, 8))
    
    content.append(Paragraph("During the Lesson:", styles['Heading4']))
    content.append(Paragraph("□ Observe student responses and engagement", styles['Normal']))
    content.append(Paragraph("□ Ask follow-up questions for clarification", styles['Normal']))
    content.append(Paragraph("□ Note misconceptions or gaps in understanding", styles['Normal']))
    content.append(Spacer(1, 8))
    
    content.append(Paragraph("After the Lesson:", styles['Heading4']))
    content.append(Paragraph("□ Review collected data quickly", styles['Normal']))
    content.append(Paragraph("□ Identify students needing additional support", styles['Normal']))
    content.append(Paragraph("□ Plan next lesson adjustments based on feedback", styles['Normal']))
    content.append(Paragraph("□ Provide timely feedback to students", styles['Normal']))
    
    doc.build(content)
    print("Created: public/resources/formative-assessment-checklist.pdf")

if __name__ == "__main__":
    # Create substantial PDFs to replace placeholder content
    create_ai_grading_prompts_pdf()
    create_assessment_rubric_pdf()
    create_formative_assessment_pdf()
    print("Substantial PDF content created successfully!")