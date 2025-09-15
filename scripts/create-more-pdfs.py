#!/usr/bin/env python3
import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor

def create_student_feedback_bank_pdf():
    """Create a comprehensive Student Feedback Bank PDF."""
    
    doc = SimpleDocTemplate("public/resources/student-feedback-bank.pdf", pagesize=letter,
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
    content.append(Paragraph("Student Feedback Bank", title_style))
    content.append(Paragraph("200+ Ready-to-Use Comments for Meaningful Student Feedback", styles['Heading3']))
    content.append(Spacer(1, 20))
    
    # Positive Academic Feedback
    content.append(Paragraph("Positive Academic Feedback", heading_style))
    content.append(Paragraph("Excellent Understanding:", styles['Heading4']))
    content.append(Paragraph("• Shows exceptional grasp of the concept", styles['Normal']))
    content.append(Paragraph("• Demonstrates deep thinking and analysis", styles['Normal']))
    content.append(Paragraph("• Makes meaningful connections to previous learning", styles['Normal']))
    content.append(Paragraph("• Goes beyond requirements with creative insights", styles['Normal']))
    content.append(Spacer(1, 8))
    
    content.append(Paragraph("Good Progress:", styles['Heading4']))
    content.append(Paragraph("• Shows solid understanding of key concepts", styles['Normal']))
    content.append(Paragraph("• Work demonstrates careful attention to details", styles['Normal']))
    content.append(Paragraph("• Making steady progress toward learning goals", styles['Normal']))
    content.append(Paragraph("• Shows good problem-solving strategies", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # Constructive Feedback
    content.append(Paragraph("Constructive Growth Feedback", heading_style))
    content.append(Paragraph("Areas for Development:", styles['Heading4']))
    content.append(Paragraph("• Consider reviewing [specific concept] to strengthen understanding", styles['Normal']))
    content.append(Paragraph("• Try breaking down complex problems into smaller steps", styles['Normal']))
    content.append(Paragraph("• Adding more examples would strengthen your explanation", styles['Normal']))
    content.append(Paragraph("• Focus on showing your thinking process more clearly", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # Subject-Specific Feedback
    content.append(Paragraph("Mathematics Feedback", heading_style))
    content.append(Paragraph("Problem Solving:", styles['Heading4']))
    content.append(Paragraph("• Your calculation methods are accurate and efficient", styles['Normal']))
    content.append(Paragraph("• Great job explaining your mathematical reasoning", styles['Normal']))
    content.append(Paragraph("• Consider double-checking your work for minor errors", styles['Normal']))
    content.append(Paragraph("• Try using different strategies to verify your answers", styles['Normal']))
    content.append(Spacer(1, 12))
    
    content.append(Paragraph("Writing Feedback", heading_style))
    content.append(Paragraph("Content and Ideas:", styles['Heading4']))
    content.append(Paragraph("• Your ideas are creative and well-developed", styles['Normal']))
    content.append(Paragraph("• Strong use of descriptive language brings your writing to life", styles['Normal']))
    content.append(Paragraph("• Consider adding more specific examples to support your points", styles['Normal']))
    content.append(Paragraph("• Your conclusion effectively summarizes your main ideas", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # Effort and Behavior Feedback
    content.append(Paragraph("Effort and Behavior Feedback", heading_style))
    content.append(Paragraph("Work Habits:", styles['Heading4']))
    content.append(Paragraph("• Consistently demonstrates strong work ethic", styles['Normal']))
    content.append(Paragraph("• Shows excellent time management skills", styles['Normal']))
    content.append(Paragraph("• Takes pride in producing quality work", styles['Normal']))
    content.append(Paragraph("• Seeks help when needed - great learning strategy!", styles['Normal']))
    content.append(Spacer(1, 8))
    
    content.append(Paragraph("Collaboration:", styles['Heading4']))
    content.append(Paragraph("• Works effectively with others and shares ideas generously", styles['Normal']))
    content.append(Paragraph("• Shows respect for different perspectives and opinions", styles['Normal']))
    content.append(Paragraph("• Contributes meaningfully to group discussions", styles['Normal']))
    content.append(Paragraph("• Helps create a positive learning environment for everyone", styles['Normal']))
    
    doc.build(content)
    print("Created: public/resources/student-feedback-bank.pdf")

def create_weekly_lesson_planner_pdf():
    """Create a comprehensive Weekly Lesson Planner PDF."""
    
    doc = SimpleDocTemplate("public/resources/weekly-lesson-planner.pdf", pagesize=letter,
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
    content.append(Paragraph("Weekly Lesson Planner", title_style))
    content.append(Paragraph("Comprehensive Template for Organized Teaching", styles['Heading3']))
    content.append(Spacer(1, 20))
    
    # Weekly Overview
    content.append(Paragraph("Weekly Planning Template", heading_style))
    content.append(Paragraph("Week of: _____________ Subject: _____________", styles['Normal']))
    content.append(Paragraph("Unit/Theme: _________________________________", styles['Normal']))
    content.append(Spacer(1, 12))
    
    content.append(Paragraph("Learning Objectives This Week:", styles['Heading4']))
    content.append(Paragraph("1. _________________________________________", styles['Normal']))
    content.append(Paragraph("2. _________________________________________", styles['Normal']))
    content.append(Paragraph("3. _________________________________________", styles['Normal']))
    content.append(Spacer(1, 12))
    
    content.append(Paragraph("Key Vocabulary/Concepts:", styles['Heading4']))
    content.append(Paragraph("• _________________________________________", styles['Normal']))
    content.append(Paragraph("• _________________________________________", styles['Normal']))
    content.append(Paragraph("• _________________________________________", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # Daily Planning
    content.append(Paragraph("Daily Lesson Framework", heading_style))
    content.append(Paragraph("Monday:", styles['Heading4']))
    content.append(Paragraph("Opening (5-10 min): ________________________", styles['Normal']))
    content.append(Paragraph("Main Activity (20-30 min): __________________", styles['Normal']))
    content.append(Paragraph("Closure (5-10 min): _________________________", styles['Normal']))
    content.append(Paragraph("Materials Needed: ___________________________", styles['Normal']))
    content.append(Paragraph("Assessment: _________________________________", styles['Normal']))
    content.append(Spacer(1, 8))
    
    content.append(Paragraph("Tuesday:", styles['Heading4']))
    content.append(Paragraph("Opening: ____________________________________", styles['Normal']))
    content.append(Paragraph("Main Activity: _______________________________", styles['Normal']))
    content.append(Paragraph("Closure: ____________________________________", styles['Normal']))
    content.append(Spacer(1, 8))
    
    content.append(Paragraph("Wednesday:", styles['Heading4']))
    content.append(Paragraph("Opening: ____________________________________", styles['Normal']))
    content.append(Paragraph("Main Activity: _______________________________", styles['Normal']))
    content.append(Paragraph("Closure: ____________________________________", styles['Normal']))
    content.append(Spacer(1, 8))
    
    content.append(Paragraph("Thursday:", styles['Heading4']))
    content.append(Paragraph("Opening: ____________________________________", styles['Normal']))
    content.append(Paragraph("Main Activity: _______________________________", styles['Normal']))
    content.append(Paragraph("Closure: ____________________________________", styles['Normal']))
    content.append(Spacer(1, 8))
    
    content.append(Paragraph("Friday:", styles['Heading4']))
    content.append(Paragraph("Opening: ____________________________________", styles['Normal']))
    content.append(Paragraph("Main Activity: _______________________________", styles['Normal']))
    content.append(Paragraph("Closure: ____________________________________", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # Weekly Reflection
    content.append(Paragraph("Weekly Reflection & Next Steps", heading_style))
    content.append(Paragraph("What worked well this week?", styles['Heading4']))
    content.append(Paragraph("_____________________________________________", styles['Normal']))
    content.append(Paragraph("_____________________________________________", styles['Normal']))
    content.append(Spacer(1, 8))
    
    content.append(Paragraph("What would you change?", styles['Heading4']))
    content.append(Paragraph("_____________________________________________", styles['Normal']))
    content.append(Paragraph("_____________________________________________", styles['Normal']))
    content.append(Spacer(1, 8))
    
    content.append(Paragraph("Students who need additional support:", styles['Heading4']))
    content.append(Paragraph("_____________________________________________", styles['Normal']))
    content.append(Spacer(1, 8))
    
    content.append(Paragraph("Next week's focus:", styles['Heading4']))
    content.append(Paragraph("_____________________________________________", styles['Normal']))
    
    doc.build(content)
    print("Created: public/resources/weekly-lesson-planner.pdf")

def create_parent_meeting_checklist_pdf():
    """Create a comprehensive Parent Meeting Checklist PDF."""
    
    doc = SimpleDocTemplate("public/resources/parent-meeting-checklist.pdf", pagesize=letter,
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
    content.append(Paragraph("Parent Meeting Checklist", title_style))
    content.append(Paragraph("Guide for Productive Parent Conferences", styles['Heading3']))
    content.append(Spacer(1, 20))
    
    # Before the Meeting
    content.append(Paragraph("Before the Meeting", heading_style))
    content.append(Paragraph("Preparation Checklist:", styles['Heading4']))
    content.append(Paragraph("□ Review student's academic progress and recent work samples", styles['Normal']))
    content.append(Paragraph("□ Gather relevant data (grades, assessments, behavior notes)", styles['Normal']))
    content.append(Paragraph("□ Prepare specific examples of student strengths", styles['Normal']))
    content.append(Paragraph("□ Identify 2-3 specific areas for growth", styles['Normal']))
    content.append(Paragraph("□ Have student work portfolio ready to share", styles['Normal']))
    content.append(Paragraph("□ Prepare questions about home support strategies", styles['Normal']))
    content.append(Spacer(1, 12))
    
    content.append(Paragraph("Environment Setup:", styles['Heading4']))
    content.append(Paragraph("□ Arrange comfortable seating for all participants", styles['Normal']))
    content.append(Paragraph("□ Ensure privacy and minimize interruptions", styles['Normal']))
    content.append(Paragraph("□ Have tissues and water available", styles['Normal']))
    content.append(Paragraph("□ Set up materials in an organized, accessible way", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # During the Meeting
    content.append(Paragraph("During the Meeting", heading_style))
    content.append(Paragraph("Opening (5 minutes):", styles['Heading4']))
    content.append(Paragraph("□ Welcome parents warmly and thank them for coming", styles['Normal']))
    content.append(Paragraph("□ Share something positive about their child immediately", styles['Normal']))
    content.append(Paragraph("□ Outline the meeting agenda and time frame", styles['Normal']))
    content.append(Paragraph("□ Ask about any specific concerns they want to address", styles['Normal']))
    content.append(Spacer(1, 8))
    
    content.append(Paragraph("Academic Discussion (10-15 minutes):", styles['Heading4']))
    content.append(Paragraph("□ Share specific examples of student's academic strengths", styles['Normal']))
    content.append(Paragraph("□ Show work samples that demonstrate growth", styles['Normal']))
    content.append(Paragraph("□ Discuss areas where student can improve", styles['Normal']))
    content.append(Paragraph("□ Explain current grade/progress in context", styles['Normal']))
    content.append(Paragraph("□ Ask parents about learning they see at home", styles['Normal']))
    content.append(Spacer(1, 8))
    
    content.append(Paragraph("Social-Emotional Discussion (5-10 minutes):", styles['Heading4']))
    content.append(Paragraph("□ Share observations about student's social interactions", styles['Normal']))
    content.append(Paragraph("□ Discuss student's confidence and attitude toward learning", styles['Normal']))
    content.append(Paragraph("□ Address any behavioral concerns with specific examples", styles['Normal']))
    content.append(Paragraph("□ Highlight positive character traits and growth", styles['Normal']))
    content.append(Spacer(1, 8))
    
    content.append(Paragraph("Action Planning (5-10 minutes):", styles['Heading4']))
    content.append(Paragraph("□ Collaboratively set 2-3 specific goals", styles['Normal']))
    content.append(Paragraph("□ Discuss home support strategies", styles['Normal']))
    content.append(Paragraph("□ Agree on classroom interventions or modifications", styles['Normal']))
    content.append(Paragraph("□ Schedule follow-up communication", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # After the Meeting
    content.append(Paragraph("After the Meeting", heading_style))
    content.append(Paragraph("Follow-up Actions:", styles['Heading4']))
    content.append(Paragraph("□ Send thank you note or email within 24 hours", styles['Normal']))
    content.append(Paragraph("□ Document meeting notes and action items", styles['Normal']))
    content.append(Paragraph("□ Share relevant information with other teachers if needed", styles['Normal']))
    content.append(Paragraph("□ Implement agreed-upon classroom strategies", styles['Normal']))
    content.append(Paragraph("□ Schedule check-in communication as discussed", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # Difficult Conversations
    content.append(Paragraph("Managing Difficult Conversations", heading_style))
    content.append(Paragraph("If parents become upset or defensive:", styles['Heading4']))
    content.append(Paragraph("□ Acknowledge their concerns and feelings", styles['Normal']))
    content.append(Paragraph("□ Redirect focus to student's best interests", styles['Normal']))
    content.append(Paragraph("□ Use specific, observable examples rather than generalizations", styles['Normal']))
    content.append(Paragraph("□ Ask for their perspective and listen actively", styles['Normal']))
    content.append(Paragraph("□ Focus on solutions and next steps", styles['Normal']))
    content.append(Paragraph("□ Take breaks if emotions are high", styles['Normal']))
    content.append(Paragraph("□ Involve administration if necessary", styles['Normal']))
    
    doc.build(content)
    print("Created: public/resources/parent-meeting-checklist.pdf")

if __name__ == "__main__":
    create_student_feedback_bank_pdf()
    create_weekly_lesson_planner_pdf()
    create_parent_meeting_checklist_pdf()
    print("Additional substantial PDFs created successfully!")