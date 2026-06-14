/* ==========================================================================
   Professional Skills Development (PSD) Portfolio JavaScript
   Designed for: Kavishka Shenal
   Features: Single-Page Scroll Navigation, Active Section IntersectionObserver,
             Interactive Lectures Hub Engine, Dynamic SVG Radar Chart
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     0. Light / Dark Theme Switcher
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');

    if (isLight) {
      themeIcon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'light');
    } else {
      themeIcon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'dark');
    }
    // Redraw radar charts on theme switch to update point backgrounds
    initRadarChart();
    if (growthAnimated) {
      initGrowthRadarChart();
    }
  });

  // Apply saved theme preference on page load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.className = 'fas fa-moon';
  } else {
    document.body.classList.remove('light-mode');
    themeIcon.className = 'fas fa-sun';
  }

  /* ==========================================================================
     1. Scroll Spy Navigation Highlight
     ========================================================================== */
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the active middle portion of the screen
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  /* ==========================================================================
     2. Sticky Header Adjustments
     ========================================================================== */
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     3. Mobile Navigation Slider
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    mobileToggle.classList.toggle('active');
  });

  // Close menus on clicking links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
    });
  });

  /* ==========================================================================
     4. Lectures Database & Hub Injection Engine
     ========================================================================== */
  const lecturesData = {
    "1": {
      meta: "Lecture 01",
      title: "Self-Awareness & Johari Window",
      icon: "fa-border-all",
      intro: "\"Self-awareness is the foundation of all professional development. Without knowing who we are, we cannot begin to lead others.\"",
      keySkill: "Self-Analysis & Feedback Reception",
      learnings: [
        {
          concept: "Personality Structures",
          explanation: "Character, values, beliefs, and attitudes form the core of our professional behavior and guide our choices.",
          application: "Evaluating value systems during software engineering design decisions to align with coding ethics."
        },
        {
          concept: "The Johari Window Model",
          explanation: "A cognitive framework mapping personal information across four zones: Arena, Blind Spot, Facade, and Unknown.",
          application: "Using transparent code documentation to widen the Arena and reduce project coordination overhead."
        },
        {
          concept: "Constructive Feedback",
          explanation: "Actively seeking peer inputs to convert blind spots into open, collaborative knowledge.",
          application: "Using 360-degree sprint reviews to examine personal communication tendencies under close deadlines."
        },
        {
          concept: "Behavioral Adaptability",
          explanation: "Shifting communication styles consciously to bridge differences in team working habits.",
          application: "Adjusting technical language when presenting systems architecture to business stakeholders."
        }
      ],
      appColumns: {
        university: "Opening communications during lab sessions to share technical blockades early.",
        internships: "Actively asking mentors for weekly evaluations of code quality and code styling.",
        workplace: "Enabling psychological safety by documenting failure points in post-mortem reports.",
        leadership: "Guiding project groups by aligning work distribution with each developer's self-assessed strengths.",
        career: "Regularly auditing professional capabilities against shifting technology trends."
      },
      reflection: {
        learned: "I learned that team collaboration is not just a scheduling exercise. The Johari Window revealed that how I share and receive information directly drives project velocity.",
        perspective: "Previously, I treated coding as an individual task. Now I realize my blind spot: when deadlines approach, I become overly direct, which can alienate team members.",
        apply: "I will actively ask my peers for feedback after sprint milestones to ensure my communication style remains open, supportive, and constructive."
      },
      skills: ["Self-Analysis", "Constructive Feedback", "Interpersonal Alignment", "Style Adaptation"],
      takeaways: {
        insight: "Growth starts where self-deception ends.",
        lesson: "Exposing blind spots through active feedback reception is the fastest route to team maturity.",
        future: "Establishing transparent collaboration processes in my future software projects.",
        relevance: "High self-awareness stabilizes dev team dynamics during critical, high-stress release windows."
      }
    },
    "2": {
      meta: "Lecture 02",
      title: "Emotional Intelligence (EQ)",
      icon: "fa-brain",
      intro: "\"IQ gets you through the door, but EQ determines how far you will rise in your career.\"",
      keySkill: "Self-Regulation & Empathy",
      learnings: [
        {
          concept: "Goleman's EQ Domains",
          explanation: "A model dividing emotional intelligence into self-awareness, self-management, social awareness, and relationship management.",
          application: "Recognizing high-stress triggers during database crashes to maintain calm problem-solving."
        },
        {
          concept: "Emotional Leakage",
          explanation: "The accidental projection of stress or frustration onto team members through tone or body language.",
          application: "Slowing down vocal pacing during client presentations to project composure and authority."
        },
        {
          concept: "Active Empathy",
          explanation: "Sensing and acknowledging other people's emotions to build trust and psychological safety.",
          application: "Supporting a junior colleague who is struggling to debug a critical API gateway error."
        },
        {
          concept: "Self-Regulation",
          explanation: "Managing internal impulses and adapting dynamically to changing project constraints.",
          application: "Reframing negative client feedback on a UI prototype as an opportunity to iterate."
        }
      ],
      appColumns: {
        university: "Staying calm and supportive when project teammates miss intermediate task deadlines.",
        internships: "Managing stress during production deployments by practicing composed documentation reviews.",
        workplace: "Resolving architecture design disputes by focusing on interests rather than egos.",
        leadership: "Fostering an inclusive atmosphere during team stand-ups where every voice is heard.",
        career: "Building long-term mentor networks through consistent emotional maturity and trust."
      },
      reflection: {
        learned: "I realized that technical competency is only half the battle. Managing my emotional state and understanding others' perspectives is critical for collaborative success.",
        perspective: "I used to think that venting frustration was harmless. Now I see how emotional leakage can disrupt team focus and lower morale.",
        apply: "During stressful release windows, I will practice self-regulation by pausing to breathe before responding to critical messages."
      },
      skills: ["Self-Regulation", "Active Empathy", "Stress Management", "Conflict De-escalation"],
      takeaways: {
        insight: "Composure under pressure is a core technical asset.",
        lesson: "Empathy is not a soft skill; it is a strategic tool for team alignment.",
        future: "Applying active listening to understand the root causes of team friction.",
        relevance: "High-EQ developers build strong, resilient engineering cultures that survive crises."
      }
    },
    "3": {
      meta: "Lecture 03",
      title: "Strategic Portfolio Management",
      icon: "fa-folder-open",
      intro: "\"Your portfolio is a living testament to your growth, not a static archive of your past projects.\"",
      keySkill: "Strategic Planning & Competency Mapping",
      learnings: [
        {
          concept: "Portfolio Typologies",
          explanation: "Distinguishing between assessment, employment, and developmental portfolios to target audiences.",
          application: "Structuring this PSD portfolio specifically to demonstrate professional readiness to recruiters."
        },
        {
          concept: "Evidence-Based Curation",
          explanation: "Selecting and displaying concrete artifacts that verify skill claims rather than making empty assertions.",
          application: "Linking coding accomplishments directly to verified GitHub commits and project metrics."
        },
        {
          concept: "Reflective Writing",
          explanation: "Documenting the lessons learned and personal growth behind every major technical project.",
          application: "Explaining how managing API refactoring taught me project management and patience."
        },
        {
          concept: "Continuous Documentation",
          explanation: "Maintaining a regular habit of recording achievements and learning experiences as they happen.",
          application: "Updating my digital brand workspace weekly to reflect my current academic and personal projects."
        }
      ],
      appColumns: {
        university: "Connecting course project milestones directly to public portfolio updates.",
        internships: "Documenting internship achievements and client feedback for future reference.",
        workplace: "Keeping a self-assessment log of completed projects to support annual performance reviews.",
        leadership: "Sharing my portfolio architecture to help peers organize their development journeys.",
        career: "Maintaining a clear, updated professional brand profile to attract career opportunities."
      },
      reflection: {
        learned: "I learned that a portfolio is an active reflection space. It forces me to analyze what I did, why it mattered, and how I grew.",
        perspective: "Previously, I viewed a resume as a simple checklist. Now I see it as a story that needs verified evidence to support my skills.",
        apply: "I will update this portfolio regularly with reflective logs to document my continuous learning journey."
      },
      skills: ["Competency Mapping", "Evidence Curation", "Reflective Writing", "Brand Management"],
      takeaways: {
        insight: "Evidence speaks louder than assertions.",
        lesson: "Reflective documentation converts experience into permanent learning.",
        future: "Using my portfolio as a continuous development tracker throughout my career.",
        relevance: "Recruiters favor candidates who can prove their soft and hard skills with real evidence."
      }
    },
    "4": {
      meta: "Lecture 04",
      title: "CV & ATS Optimization",
      icon: "fa-file-invoice",
      intro: "\"Your resume must speak to both the machine and the human. Structure it for clarity, optimize it for relevance.\"",
      keySkill: "Professional Marketing & Keyword Optimization",
      learnings: [
        {
          concept: "ATS Parsing Engines",
          explanation: "Understanding how Applicant Tracking Systems scan, filter, and score CVs based on keywords and layouts.",
          application: "Removing nested tables, graphics, and non-standard fonts that break resume parsing engines."
        },
        {
          concept: "Action-Impact Formatting",
          explanation: "Writing CV bullet points using strong action verbs followed by quantified business results.",
          application: "Refactoring a CV line to: 'Optimized SQL queries, reducing API response times by 35%.'"
        },
        {
          concept: "Keyword Alignment",
          explanation: "Tailoring resume vocabulary to match the specific terms used in the target job description.",
          application: "Aligning CV skill lists with the exact database and framework names listed in job posts."
        },
        {
          concept: "Value Proposition",
          explanation: "A concise summary at the top of the resume highlighting core competencies and career focus.",
          application: "Crafting a clear profile stating technical expertise and a commitment to collaborative engineering."
        }
      ],
      appColumns: {
        university: "Structuring student club project achievements with quantified impact metrics.",
        internships: "Highlighting specific project delivery results in internship applications.",
        workplace: "Aligning internal promotion requests with corporate skill matrix terms.",
        leadership: "Helping team members format their resumes to pass automated screening.",
        career: "Positioning myself as a business-aware engineer who understands product outcomes."
      },
      reflection: {
        learned: "I learned that a CV is a targeted marketing document, not a comprehensive autobiography. It must show impact clearly.",
        perspective: "I used to write generic task descriptions. Now I know that using action verbs and data metrics makes my work stand out.",
        apply: "I will rewrite my experience statements to follow the Action-Impact model and update my CV for each application."
      },
      skills: ["ATS Compliance", "Action-Impact Writing", "Semantic Keywords", "Self-Positioning"],
      takeaways: {
        insight: "Your CV is your value proposition.",
        lesson: "Quantified outcomes validate your technical claims.",
        future: "Tailoring my CV to match the specific requirements of target engineering roles.",
        relevance: "ATS-optimized resumes ensure your application reaches human recruiters."
      }
    },
    "5": {
      meta: "Lecture 05",
      title: "High-Impact Interviews",
      icon: "fa-comments",
      intro: "\"An interview is not an interrogation. It is a collaborative dialogue to evaluate mutual fit.\"",
      keySkill: "STAR Storytelling & Vocal Composure",
      learnings: [
        {
          concept: "The Communication Mix",
          explanation: "Recognizing that body language (55%) and voice (38%) carry more weight in interviews than words alone (7%).",
          application: "Maintaining good eye contact and open posture during online video interviews."
        },
        {
          concept: "The STAR Framework",
          explanation: "Structuring behavioral answers using Situation, Task, Action, and Result to ensure complete stories.",
          application: "Answering team conflict questions by detailing the setup, my task, my action, and the outcome."
        },
        {
          concept: "Composure & Pacing",
          explanation: "Controlling vocal delivery and using pauses to eliminate filler words and project confidence.",
          application: "Taking a brief pause to structure my thoughts before answering a complex technical query."
        },
        {
          concept: "Strategic Questioning",
          explanation: "Asking the interviewer insightful questions about team culture and engineering processes.",
          application: "Inquiring about a team's code review practices to show interest in engineering quality."
        }
      ],
      appColumns: {
        university: "Using the STAR method to describe project contributions in course assessments.",
        internships: "Communicating coding approaches clearly during technical internship panels.",
        workplace: "Presenting system designs confidently to stakeholders during design reviews.",
        leadership: "Conducting mock interview panels to help junior students practice their communication.",
        career: "Negotiating role expectations and career growth paths during job interviews."
      },
      reflection: {
        learned: "I learned that my delivery style matters just as much as my technical knowledge. How I speak is highly influential.",
        perspective: "Previously, I rushed my answers to show quick thinking. Now I see that calm pacing and structure show confidence.",
        apply: "I will use the STAR framework to organize my experiences into structured stories and practice my pacing."
      },
      skills: ["STAR Storytelling", "Vocal Pacing", "Non-verbal Presence", "Active Listening"],
      takeaways: {
        insight: "Structure brings clarity under pressure.",
        lesson: "Vocal control and pauses project authority.",
        future: "Using mock interviews to refine my presentation style.",
        relevance: "Engineers who communicate their thoughts clearly excel in technical and collaborative panels."
      }
    },
    "6": {
      meta: "Lecture 06",
      title: "Professional Etiquette",
      icon: "fa-envelope",
      intro: "\"Etiquette is the code of respect that keeps team collaboration smooth and builds professional trust.\"",
      keySkill: "Digital Communication & Professional Ethics",
      learnings: [
        {
          concept: "Digital Discipline",
          explanation: "Managing written communication with structure, clarity, and appropriate phrasing.",
          application: "Writing structured email updates with clear action points for my team members."
        },
        {
          concept: "The THINK Filter",
          explanation: "Reviewing messages before sending to ensure they are True, Helpful, Inspiring, Necessary, and Kind.",
          application: "Refactoring a pull request review comment to focus entirely on the code quality."
        },
        {
          concept: "Telephone Etiquette",
          explanation: "Greeting callers professionally, taking accurate notes, and summarizing next steps clearly.",
          application: "Handling client calls with polite openings and summarizing action items before hanging up."
        },
        {
          concept: "Respecting Boundaries",
          explanation: "Adhering to professional norms regarding message response times and workplace spaces.",
          application: "Avoiding late-night messaging unless it is a critical production emergency."
        }
      ],
      appColumns: {
        university: "Writing polite, clear emails to professors and project team members.",
        internships: "Using standard channels and professional language to communicate progress to mentors.",
        workplace: "Structuring pull requests and slack updates for readability and clarity.",
        leadership: "Setting communication expectations for group projects to avoid coordination friction.",
        career: "Maintaining high professional standards in all business relationships."
      },
      reflection: {
        learned: "I learned that professional communication requires intentional structure. Informality can lead to misunderstandings.",
        perspective: "I used to write quick, unstructured messages. Now I understand that clear, polite writing shows respect for others' time.",
        apply: "I will apply the THINK filter to all my written communication, especially during technical discussions."
      },
      skills: ["THINK Filter", "Digital Correspondence", "Vocal Polite Rules", "Time Boundary Management"],
      takeaways: {
        insight: "Etiquette is about showing respect.",
        lesson: "Clean, structured communications build long-term credibility.",
        future: "Ensuring all my written documentation and code reviews remain polite and constructive.",
        relevance: "As remote work increases, professional digital etiquette is essential for smooth team collaboration."
      }
    },
    "7": {
      meta: "Lecture 07",
      title: "Negotiation & BATNA",
      icon: "fa-handshake",
      intro: "\"Negotiation is not about defeating the other side. It is about finding a win-win path forward.\"",
      keySkill: "Collaborative Bargaining & Conflict Resolution",
      learnings: [
        {
          concept: "The BATNA Concept",
          explanation: "Best Alternative to a Negotiated Agreement: identifying your walk-away point before negotiating.",
          application: "Knowing my market rate and alternative offers before discussing internship compensation."
        },
        {
          concept: "Strategy Matrix",
          explanation: "Choosing negotiation styles (Collaborate, Accommodate, Avoid, Compete) based on outcome and relationship value.",
          application: "Selecting collaboration to resolve feature scope issues with a product manager."
        },
        {
          concept: "Interest-Based Focus",
          explanation: "Focusing on underlying interests instead of rigid positions to find creative solutions.",
          application: "Resolving a database dispute by focusing on data performance rather than tool preferences."
        },
        {
          concept: "Value Creation",
          explanation: "Expanding the negotiation scope to trade items of differing value and reach win-win agreements.",
          application: "Trading design responsibilities for testing tasks in a group project."
        }
      ],
      appColumns: {
        university: "Negotiating tasks and contributions in group assignments based on strengths.",
        internships: "Aligning task scope and learning outcomes with my internship supervisor.",
        workplace: "Collaborating with product managers to set realistic sprint goals.",
        leadership: "Resolving resource and time conflicts within student organizations.",
        career: "Negotiating employment offers and development opportunities with recruiters."
      },
      reflection: {
        learned: "I learned that negotiation is an analytical process. Having a clear BATNA gives me confidence and prevents poor agreements.",
        perspective: "Previously, I avoided negotiation because I associated it with conflict. Now I see it as a way to solve problems together.",
        apply: "I will establish my BATNA before any negotiation and use a collaborative style to find win-win solutions."
      },
      skills: ["BATNA Calculation", "Interest Analysis", "Collaborative Style", "Value Creation"],
      takeaways: {
        insight: "Always prepare your walk-away boundary.",
        lesson: "Win-win solutions build long-term collaborative partnerships.",
        future: "Using collaborative negotiation to resolve project scope issues.",
        relevance: "Software engineers negotiate requirements, resources, and salaries throughout their careers."
      }
    },
    "8": {
      meta: "Lecture 08",
      title: "Grooming & Boundaries",
      icon: "fa-user-tie",
      intro: "\"Grooming shows respect for yourself and your workspace. Boundaries protect your focus and well-being.\"",
      keySkill: "Professional Presence & Focus Management",
      learnings: [
        {
          concept: "Grooming as Respect",
          explanation: "Maintaining clean personal presentation to show respect for clients and team members.",
          application: "Dressing appropriately for client-facing demo meetings and online presentations."
        },
        {
          concept: "Workplace Boundaries",
          explanation: "Establishing limits across physical, emotional, digital, and conversational areas.",
          application: "Communicating core work hours to teammates to protect personal focus time."
        },
        {
          concept: "Digital Boundaries",
          explanation: "Managing availability and notification settings to prevent burnout and focus on deep work.",
          application: "Setting Slack status to 'Away' during deep programming sessions to reduce distractions."
        },
        {
          concept: "Conversational Boundaries",
          explanation: "Keeping workspace discussions professional and avoiding topics that could cause discomfort.",
          application: "Politely redirecting personal discussions back to project-relevant topics during standby periods."
        }
      ],
      appColumns: {
        university: "Setting work boundaries with project teams to balance academic workloads.",
        internships: "Dressing professionally to match the organizational culture.",
        workplace: "Protecting deep work blocks on my calendar to maintain output quality.",
        leadership: "Helping team members set clear work-life boundaries to prevent burnout.",
        career: "Maintaining a consistent, professional personal brand image across all public channels."
      },
      reflection: {
        learned: "I learned that grooming and boundaries show discipline. They ensure my ideas are the focus, rather than distractions.",
        perspective: "I used to think boundaries were selfish. Now I see they are essential for long-term productivity and health.",
        apply: "I will establish clear work hours, communicate them to my team, and maintain a professional appearance."
      },
      skills: ["Professional Presence", "Boundary Setting", "Focus Protection", "Self-Discipline"],
      takeaways: {
        insight: "Discipline shows respect for your work.",
        lesson: "Clear boundaries build team trust and prevent misunderstandings.",
        future: "Setting clear availability guidelines in my engineering projects.",
        relevance: "Reliable developers show discipline in their presentation, communications, and code."
      }
    },
    "9": {
      meta: "Lecture 09",
      title: "Dining Social Grace",
      icon: "fa-utensils",
      intro: "\"Table manners reflect your social confidence. Executive dining grace helps you network comfortably.\"",
      keySkill: "Social Confidence & Relationship Building",
      learnings: [
        {
          concept: "The BMW Rule",
          explanation: "Table geography: Bread plate on the left, Meal plate in the center, Water/drink glasses on the right.",
          application: "Confidently identifying my bread plate at a formal corporate networking dinner."
        },
        {
          concept: "Utensil Progression",
          explanation: "Using flatware from the outside in as the courses progress throughout the meal.",
          application: "Selecting the correct salad fork for the first course without hesitation."
        },
        {
          concept: "Utensil Language",
          explanation: "Placing cutlery in specific positions to signal 'Pause' or 'Finished' to service staff.",
          application: "Crossing utensils to signal a pause while speaking with a potential employer."
        },
        {
          concept: "Networking dining rules",
          explanation: "Focusing on relationship-building and conversation rather than the food.",
          application: "Answering recruiter questions politely between small bites during a dinner interview."
        }
      ],
      appColumns: {
        university: "Hosting delegates and speakers with confidence during student events.",
        internships: "Participating in team lunches and networking dinners with confidence.",
        workplace: "Representing the company professionally at client dinners and banquets.",
        leadership: "Coordinating formal networking dinners for student associations.",
        career: "Building business relationships over meals with clients and executives."
      },
      reflection: {
        learned: "I learned that mastering table geography and utensil language removes social anxiety and allows me to focus on networking.",
        perspective: "Previously, formal dining felt stressful. Now I see it as a structured protocol that makes social interactions easier.",
        apply: "I will practice the BMW rule and utensil placement signals to ensure dining environments are comfortable spaces for connection."
      },
      skills: ["Table Geography", "Utensil Language", "Business Socializing", "Networking Composure"],
      takeaways: {
        insight: "Social confidence is built on protocols.",
        lesson: "Composure at the table shows you can represent your company.",
        future: "Participating in corporate dining events without anxiety.",
        relevance: "Important business connections are often built over meals. Composure signals professionalism."
      }
    },
    "10": {
      meta: "Lecture 10",
      title: "Community Milestone",
      icon: "fa-hands-holding-child",
      intro: "\"True professionalism includes social responsibility. Leadership means serving the community.\"",
      keySkill: "Project Management & Social Impact",
      learnings: [
        {
          concept: "Social Responsibility",
          explanation: "Applying professional skills to support and uplift vulnerable groups in our community.",
          application: "Planning an event to support 12 elder residents at the Sri Lankadhara Society."
        },
        {
          concept: "Adaptive Leadership",
          explanation: "Managing volunteers, aid packages, and schedules under changing local conditions.",
          application: "Adjusting timeline schedules dynamically when transit delays threatened the event start."
        },
        {
          concept: "Logistics Coordination",
          explanation: "Managing budgets, purchasing, and transport schedules to execute an event successfully.",
          application: "Coordinating budget splits and deliveries for personal care aid packages."
        },
        {
          concept: "Team Coordination",
          explanation: "Directing volunteer teams and assigning roles based on project needs and individual strengths.",
          application: "Managing 24 student volunteers during tea service and acoustic music sessions."
        }
      ],
      appColumns: {
        university: "Coordinating student volunteer projects and community support events.",
        internships: "Supporting corporate social responsibility initiatives in my firm.",
        workplace: "Applying agile project management to organize community events.",
        leadership: "Guiding teams with accountability and social purpose.",
        career: "Using my professional skills to create positive community impact."
      },
      reflection: {
        learned: "I learned that project management is about managing real-world uncertainties. Teamwork and adaptability are essential.",
        perspective: "Organizing the Sri Lankadhara Society project showed me that leadership is about service, responsibility, and empathy.",
        apply: "I will apply the project management and crisis adaptation lessons I learned here to my software engineering assignments."
      },
      skills: ["Project Management", "Adaptive Leadership", "Logistics Control", "Empathy & Service"],
      takeaways: {
        insight: "Leadership is about responsibility and service.",
        lesson: "Agile adaptation keeps teams aligned during unexpected changes.",
        future: "Organizing community support projects that use my technical and soft skills.",
        relevance: "Software delivery requires teamwork, budgeting, and adaptability. Community projects build these skills."
      }
    }
  };

  const detailsPane = document.getElementById('lecture-details-pane');
  const tabButtons = document.querySelectorAll('.lecture-tab-btn');

  function injectLecture(id) {
    if (id === "10") {
      injectModule10Showcase();
      return;
    }
    const data = lecturesData[id];
    if (!data) return;

    // Trigger details panel fade out/in transition
    detailsPane.classList.remove('fade-switch');
    void detailsPane.offsetWidth; // Force reflow
    detailsPane.classList.add('fade-switch');

    // Build learnings cards
    const learningsHTML = data.learnings.map(l => `
      <div class="glass-card learning-card">
        <div class="concept-name"><i class="fas fa-bookmark text-cyan"></i> ${l.concept}</div>
        <div class="concept-explanation">${l.explanation}</div>
        <div class="concept-application"><i class="fas fa-lightbulb"></i> ${l.application}</div>
      </div>
    `).join('');

    // Build skills tags
    const skillsHTML = data.skills.map(s => `
      <span class="gained-skill-tag"><i class="fas fa-check-circle"></i> ${s}</span>
    `).join('');

    // Build comparison grid
    const comparisonHTML = `
      <div class="app-comparison-grid">
        <div class="glass-card app-comparison-card">
          <div class="app-column-header"><i class="fas fa-graduation-cap"></i> University</div>
          <div class="app-column-text">${data.appColumns.university}</div>
        </div>
        <div class="glass-card app-comparison-card">
          <div class="app-column-header"><i class="fas fa-laptop-code"></i> Internships</div>
          <div class="app-column-text">${data.appColumns.internships}</div>
        </div>
        <div class="glass-card app-comparison-card">
          <div class="app-column-header"><i class="fas fa-briefcase"></i> Workplace</div>
          <div class="app-column-text">${data.appColumns.workplace}</div>
        </div>
        <div class="glass-card app-comparison-card">
          <div class="app-column-header"><i class="fas fa-users-gear"></i> Leadership</div>
          <div class="app-column-text">${data.appColumns.leadership}</div>
        </div>
        <div class="glass-card app-comparison-card">
          <div class="app-column-header"><i class="fas fa-rocket"></i> Career</div>
          <div class="app-column-text">${data.appColumns.career}</div>
        </div>
      </div>
    `;

    // Build Visual Framework Section conditionally
    let visualFrameworkHTML = '';
    if (id === "3") {
      visualFrameworkHTML = `
      <div>
        <h3 class="lecture-section-header"><i class="fas fa-cubes"></i> My Professional Portfolio</h3>
        <div class="glass-card visual-framework-container portfolio-gallery-container">
          <div class="portfolio-gallery-grid">
            <div class="portfolio-gallery-card glass-card">
              <div class="portfolio-image-wrapper">
                <img src="media__1781246958125.jpg" alt="Portfolio Mockup - Home Hero" class="portfolio-gallery-image" />
                <div class="portfolio-image-overlay">
                  <span class="portfolio-image-tag"><i class="fas fa-home"></i> Home Hero Section</span>
                </div>
              </div>
              <div class="portfolio-gallery-info">
                <h4 class="portfolio-gallery-title">Hero Home Page Mockup</h4>
              </div>
            </div>
            <div class="portfolio-gallery-card glass-card">
              <div class="portfolio-image-wrapper">
                <img src="media__1781246958120.jpg" alt="Portfolio Mockup - About Page" class="portfolio-gallery-image" />
                <div class="portfolio-image-overlay">
                  <span class="portfolio-image-tag"><i class="fas fa-id-card"></i> About Me Section</span>
                </div>
              </div>
              <div class="portfolio-gallery-info">
                <h4 class="portfolio-gallery-title">About Me Layout Mockup</h4>
              </div>
            </div>
          </div>
          <div class="portfolio-gallery-actions">
            <a href="https://shlezorg.github.io/Portfolio/" target="_blank" class="btn btn-primary">
              <i class="fas fa-external-link-alt"></i> Visit Live Portfolio Site
            </a>
          </div>
        </div>
      </div>
      `;
    } else if (id === "4") {
      visualFrameworkHTML = `
      <div>
        <h3 class="lecture-section-header"><i class="fas fa-file-invoice"></i> ATS-Optimized CV Showcase</h3>
        <div class="glass-card visual-framework-container cv-showcase-container">
          <div class="cv-showcase-grid">
            <div class="glass-card cv-preview-card">
              <div class="cv-preview-image-wrapper">
                <img src="media__1781249055062.jpeg" alt="Kavishka Shenal CV Preview" class="cv-preview-image" />
                <div class="cv-preview-overlay">
                  <button class="btn btn-primary open-cv-btn"><i class="fas fa-expand"></i> View Full CV</button>
                </div>
              </div>
              <h4 class="cv-preview-title">Verified ATS-Optimized CV</h4>
            </div>
            
            <div class="svg-display-column">
              <div class="svg-display-card" id="svg-container"></div>
              <div class="svg-details-card glass-card">
                <h4 class="svg-details-title" id="svg-details-title">
                  <i class="fas fa-info-circle text-cyan"></i> Interactive Blueprint
                </h4>
                <p class="svg-details-text" id="svg-details-text">
                  Click or hover on diagram elements to view detailed reflective analysis and application guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    } else {
      visualFrameworkHTML = `
      <div>
        <h3 class="lecture-section-header"><i class="fas fa-circle-nodes"></i> Interactive Visual Framework</h3>
        <div class="glass-card visual-framework-container">
          <div class="svg-display-card" id="svg-container"></div>
          <div class="svg-details-card glass-card">
            <h4 class="svg-details-title" id="svg-details-title">
              <i class="fas fa-info-circle text-cyan"></i> Interactive Blueprint
            </h4>
            <p class="svg-details-text" id="svg-details-text">
              Click or hover on diagram elements to view detailed reflective analysis and application guidelines.
            </p>
          </div>
        </div>
      </div>
      `;
    }

    detailsPane.innerHTML = `
      <!-- 1. Hero Section -->
      <div class="glass-card lecture-hero" style="background-image: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%), url('module_${id.padStart(2, '0')}_banner.png'); background-size: cover; background-position: center;">
        <div class="lecture-hero-header">
          <span class="lecture-hero-num">${data.meta}</span>
          <span class="lecture-hero-skill"><i class="fas fa-bullseye"></i> Key Skill: ${data.keySkill}</span>
        </div>
        <h2 class="lecture-hero-title">${data.title}</h2>
        <blockquote class="lecture-hero-intro">${data.intro}</blockquote>
      </div>

      <!-- 2. Key Learnings -->
      <div>
        <h3 class="lecture-section-header"><i class="fas fa-book-open"></i> Key Concepts & Learnings</h3>
        <div class="key-learnings-grid">
          ${learningsHTML}
        </div>
      </div>

      <!-- 3. Visual Framework -->
      ${visualFrameworkHTML}

      <!-- 4. Professional Applications -->
      <div>
        <h3 class="lecture-section-header"><i class="fas fa-network-wired"></i> Professional Applications Dashboard</h3>
        ${comparisonHTML}
      </div>

      <!-- 5. Reflective Journal -->
      <div class="glass-card journal-reflection-card">
        <div class="journal-card-header"><i class="fas fa-feather-pointed"></i> Reflective Journal Entry</div>
        <div class="journal-card-body">
          <p><strong>What I Learned:</strong> ${data.reflection.learned}</p>
          <p><strong>Shift in Perspective:</strong> ${data.reflection.perspective}</p>
          <p><strong>Future Application:</strong> ${data.reflection.apply}</p>
        </div>
      </div>

      <!-- 6. Skills Gained Section -->
      <div>
        <h3 class="lecture-section-header"><i class="fas fa-dumbbell"></i> Competencies Developed</h3>
        <div class="skills-gained-list">
          ${skillsHTML}
        </div>
      </div>

      <!-- 7. Lecture Takeaways Section -->
      <div>
        <h3 class="lecture-section-header"><i class="fas fa-lightbulb"></i> Core Takeaways & Relevance</h3>
        <div class="glass-card takeaway-quote-card">
          <div class="takeaway-grid">
            <div class="takeaway-item">
              <div class="takeaway-item-label"><i class="fas fa-brain"></i> Key Insight</div>
              <div class="takeaway-item-text">${data.takeaways.insight}</div>
            </div>
            <div class="takeaway-item">
              <div class="takeaway-item-label"><i class="fas fa-quote-left"></i> Memorable Lesson</div>
              <div class="takeaway-item-text">${data.takeaways.lesson}</div>
            </div>
            <div class="takeaway-item">
              <div class="takeaway-item-label"><i class="fas fa-arrow-trend-up"></i> Future Application</div>
              <div class="takeaway-item-text">${data.takeaways.future}</div>
            </div>
            <div class="takeaway-item">
              <div class="takeaway-item-label"><i class="fas fa-shield-halved"></i> Professional Relevance</div>
              <div class="takeaway-item-text">${data.takeaways.relevance}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Render the SVG visual framework inside the pane
    renderSVG(id, document.getElementById('svg-container'));
  }

  function injectModule10Showcase() {
    detailsPane.classList.remove('fade-switch');
    void detailsPane.offsetWidth;
    detailsPane.classList.add('fade-switch');

    detailsPane.innerHTML = `
      <div class="mod10-showcase">
        <!-- 1. Hero / Overview -->
        <div class="glass-card lecture-hero mod10-hero" style="background-image: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%), url('module_10_banner.png'); background-size: cover; background-position: center;">
          <h2 class="mod10-hero-title">Community Service Project Case Study</h2>
          <div class="mod10-hero-subtitle">Sri Lankadhara Society Elders' Home Outreach</div>
          <p class="lecture-hero-quote" style="margin-bottom: 2rem; font-style: italic;">
            "True professionalism is not only about delivering clean code; it is about serving the society we exist in. Leadership finds its highest expression in empathy and community service."
          </p>
          <div class="mod10-meta-grid">
            <div class="glass-card mod10-meta-card">
              <div class="mod10-meta-lbl">Date</div>
              <div class="mod10-meta-val">April 26, 2026</div>
            </div>
            <div class="glass-card mod10-meta-card">
              <div class="mod10-meta-lbl">Location</div>
              <div class="mod10-meta-val">Colombo 06, Sri Lanka</div>
            </div>
            <div class="glass-card mod10-meta-card">
              <div class="mod10-meta-lbl">Duration</div>
              <div class="mod10-meta-val">4 Weeks (Prep to Event Day)</div>
            </div>
            <div class="glass-card mod10-meta-card">
              <div class="mod10-meta-lbl">Reciprocal Value</div>
              <div class="mod10-meta-val">Social Responsibility & Care</div>
            </div>
          </div>
        </div>

        <!-- 2. Impact Dashboard -->
        <div>
          <h3 class="lecture-section-header"><i class="fas fa-chart-line"></i> Campaign Impact Dashboard</h3>
          <div class="mod10-impact-grid">
            <div class="glass-card mod10-impact-card">
              <div class="mod10-impact-icon"><i class="fas fa-users"></i></div>
              <div class="mod10-impact-num">24</div>
              <div class="mod10-impact-lbl">Volunteer Team Members</div>
            </div>
            <div class="glass-card mod10-impact-card">
              <div class="mod10-impact-icon"><i class="fas fa-heart"></i></div>
              <div class="mod10-impact-num">12</div>
              <div class="mod10-impact-lbl">Elders Supported</div>
            </div>
            <div class="glass-card mod10-impact-card">
              <div class="mod10-impact-icon"><i class="fas fa-hand-holding-dollar"></i></div>
              <div class="mod10-impact-num">LKR 40,700</div>
              <div class="mod10-impact-lbl">Total Funds Raised</div>
            </div>
            <div class="glass-card mod10-impact-card">
              <div class="mod10-impact-icon"><i class="fas fa-receipt"></i></div>
              <div class="mod10-impact-num">LKR 38,410</div>
              <div class="mod10-impact-lbl">Utilized Budget</div>
            </div>
            <div class="glass-card mod10-impact-card">
              <div class="mod10-impact-icon"><i class="fas fa-box-open"></i></div>
              <div class="mod10-impact-num">9</div>
              <div class="mod10-impact-lbl">Essential Items Per Package</div>
            </div>
            <div class="glass-card mod10-impact-card">
              <div class="mod10-impact-icon"><i class="fas fa-calendar-check"></i></div>
              <div class="mod10-impact-num">1</div>
              <div class="mod10-impact-lbl">Successful Community Event</div>
            </div>
          </div>
        </div>

        <!-- 3. Timeline -->
        <div>
          <h3 class="lecture-section-header"><i class="fas fa-route"></i> Project Roadmap & Timeline</h3>
          <div class="mod10-timeline-container">
            <div class="mod10-timeline-item">
              <div class="mod10-timeline-badge"><i class="fas fa-compass"></i></div>
              <div class="glass-card mod10-timeline-content">
                <h4 class="mod10-timeline-title">Phase 01: Initial Planning & Team Formation</h4>
                <p class="mod10-timeline-desc">Assigned coordinator roles, mapped competencies (financial, logistics, entertainment), established communication protocols, and researched the Sri Lankadhara elders' home guidelines.</p>
              </div>
            </div>
            <div class="mod10-timeline-item">
              <div class="mod10-timeline-badge"><i class="fas fa-coins"></i></div>
              <div class="glass-card mod10-timeline-content">
                <h4 class="mod10-timeline-title">Phase 02: Fund Collection & Financial Control</h4>
                <p class="mod10-timeline-desc">Collected personal contributions of LKR 1,700 per member, raising LKR 40,700 total. Established a digital ledger to track expenditures, ensuring high accountability.</p>
              </div>
            </div>
            <div class="mod10-timeline-item">
              <div class="mod10-timeline-badge"><i class="fas fa-cart-shopping"></i></div>
              <div class="glass-card mod10-timeline-content">
                <h4 class="mod10-timeline-title">Phase 03: Procurement & Logistics Management</h4>
                <p class="mod10-timeline-desc">Audited local wholesale suppliers, compared prices, and purchased 9 types of health and personal care hygiene supplies for 12 custom care packages.</p>
              </div>
            </div>
            <div class="mod10-timeline-item">
              <div class="mod10-timeline-badge"><i class="fas fa-box-open"></i></div>
              <div class="glass-card mod10-timeline-content">
                <h4 class="mod10-timeline-title">Phase 04: Care Package Assembly</h4>
                <p class="mod10-timeline-desc">Volunteers gathered to inspect, pack, and label 12 personal care boxes. Verified each care kit contains exactly the 9 essential items with personalized cards.</p>
              </div>
            </div>
            <div class="mod10-timeline-item">
              <div class="mod10-timeline-badge"><i class="fas fa-van-shuttle"></i></div>
              <div class="glass-card mod10-timeline-content">
                <h4 class="mod10-timeline-title">Phase 05: Travel & Event Setup</h4>
                <p class="mod10-timeline-desc">Traveled to the facility. Managed unexpected Colombo traffic blockades dynamically, deploying a setup crew early to coordinate stage setups and acoustic systems check.</p>
              </div>
            </div>
            <div class="mod10-timeline-item">
              <div class="mod10-timeline-badge"><i class="fas fa-music"></i></div>
              <div class="glass-card mod10-timeline-content">
                <h4 class="mod10-timeline-title">Phase 06: Acoustic Music & Interaction Session</h4>
                <p class="mod10-timeline-desc">Hosted an interactive entertainment segment with acoustic songs and stories. Built immediate emotional connection with the residents, dissolving initial boundaries.</p>
              </div>
            </div>
            <div class="mod10-timeline-item">
              <div class="mod10-timeline-badge"><i class="fas fa-mug-hot"></i></div>
              <div class="glass-card mod10-timeline-content">
                <h4 class="mod10-timeline-title">Phase 07: Afternoon Tea & Food Service</h4>
                <p class="mod10-timeline-desc">Served warm herbal tea alongside sugar-free sweets and soft traditional cakes, ensuring diabetic residents' dietary restrictions were carefully followed.</p>
              </div>
            </div>
            <div class="mod10-timeline-item">
              <div class="mod10-timeline-badge"><i class="fas fa-gift"></i></div>
              <div class="glass-card mod10-timeline-content">
                <h4 class="mod10-timeline-title">Phase 08: Gift & Care Pack Distribution</h4>
                <p class="mod10-timeline-desc">Hand-delivered the custom hygiene care packages to all 12 residents. Exchanged wishes, stories, and reflections with each grandmother individually.</p>
              </div>
            </div>
            <div class="mod10-timeline-item">
              <div class="mod10-timeline-badge"><i class="fas fa-check-double"></i></div>
              <div class="glass-card mod10-timeline-content">
                <h4 class="mod10-timeline-title">Phase 09: Project Completion & Retrospective</h4>
                <p class="mod10-timeline-desc">Concluded the visit, gathered team feedback, reconciled the financial ledger, and compiled this case study outlining leadership learnings.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Budget Analytics -->
        <div>
          <h3 class="lecture-section-header"><i class="fas fa-calculator"></i> Budget & Resource Allocation</h3>
          <div class="mod10-budget-grid">
            <div class="mod10-budget-metrics">
              <div class="glass-card mod10-budget-card">
                <div class="mod10-budget-lbl">Total Funds Raised</div>
                <div class="mod10-budget-val">LKR 40,700</div>
              </div>
              <div class="glass-card mod10-budget-card">
                <div class="mod10-budget-lbl">Total Expenses</div>
                <div class="mod10-budget-val">LKR 38,410</div>
              </div>
              <div class="glass-card mod10-budget-card">
                <div class="mod10-budget-lbl">Remaining Balance</div>
                <div class="mod10-budget-val">LKR 2,290</div>
              </div>
              <div class="glass-card mod10-budget-card">
                <div class="mod10-budget-lbl">Personal Contribution</div>
                <div class="mod10-budget-val">LKR 1,700</div>
              </div>
              <div class="glass-card mod10-budget-card" style="grid-column: span 2;">
                <div class="mod10-budget-lbl">Cost Per Care Package</div>
                <div class="mod10-budget-val">LKR 2,012.50</div>
              </div>
            </div>
            <div class="glass-card mod10-budget-visual">
              <div class="mod10-budget-svg-wrapper">
                <svg viewBox="0 0 200 200" class="mod10-donut-svg" id="mod10-donut-svg"></svg>
                <div class="mod10-donut-center">
                  <div class="mod10-donut-center-lbl">Utilized</div>
                  <div class="mod10-donut-center-val">94.4%</div>
                </div>
              </div>
              <div class="mod10-budget-legend">
                <div class="mod10-legend-item">
                  <span class="mod10-legend-color" style="background-color: #06B6D4;"></span> Care Packages (62.9%)
                </div>
                <div class="mod10-legend-item">
                  <span class="mod10-legend-color" style="background-color: #38BDF8;"></span> Food & Event (25.1%)
                </div>
                <div class="mod10-legend-item">
                  <span class="mod10-legend-color" style="background-color: #10B981;"></span> Transport & Logistics (12.0%)
                </div>
              </div>
              <div class="glass-card" style="width: 100%; padding: 0.85rem; text-align: center; font-size: 0.85rem;" id="mod10-donut-details">
                Hover or click a donut segment to view details.
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Care Package Breakdown -->
        <div>
          <h3 class="lecture-section-header"><i class="fas fa-boxes-packing"></i> Care Package Inventory (12 Units Total)</h3>
          <div class="mod10-inventory-grid">
            <div class="glass-card mod10-inventory-card">
              <div class="mod10-inv-header">
                <div class="mod10-inv-name">Bath Towels</div>
                <span class="mod10-inv-qty">12 Pcs</span>
              </div>
              <div class="mod10-inv-purpose">High-quality soft cotton bath towels for personal hygiene and daily comfort.</div>
            </div>
            <div class="glass-card mod10-inventory-card">
              <div class="mod10-inv-header">
                <div class="mod10-inv-name">Antiseptic Liquid</div>
                <span class="mod10-inv-qty">12 Pcs</span>
              </div>
              <div class="mod10-inv-purpose">For bathing and personal grooming to prevent infections and skin irritation.</div>
            </div>
            <div class="glass-card mod10-inventory-card">
              <div class="mod10-inv-header">
                <div class="mod10-inv-name">Medicated Soap</div>
                <span class="mod10-inv-qty">24 Pcs</span>
              </div>
              <div class="mod10-inv-purpose">Gentle, moisturizing antiseptic soaps specifically chosen for elderly skin health.</div>
            </div>
            <div class="glass-card mod10-inventory-card">
              <div class="mod10-inv-header">
                <div class="mod10-inv-name">Herbal Toothpaste</div>
                <span class="mod10-inv-qty">12 Pcs</span>
              </div>
              <div class="mod10-inv-purpose">Organic toothpastes for oral hygiene and sensitive gums maintenance.</div>
            </div>
            <div class="glass-card mod10-inventory-card">
              <div class="mod10-inv-header">
                <div class="mod10-inv-name">Soft Hairbrush</div>
                <span class="mod10-inv-qty">12 Pcs</span>
              </div>
              <div class="mod10-inv-purpose">Flexible-bristle hairbrushes for gentle scalp grooming and neatness.</div>
            </div>
            <div class="glass-card mod10-inventory-card">
              <div class="mod10-inv-header">
                <div class="mod10-inv-name">Talcum Powder</div>
                <span class="mod10-inv-qty">12 Pcs</span>
              </div>
              <div class="mod10-inv-purpose">Mild body powders to maintain dryness, comfort, and a pleasant scent.</div>
            </div>
            <div class="glass-card mod10-inventory-card">
              <div class="mod10-inv-header">
                <div class="mod10-inv-name">Hand Sanitizer</div>
                <span class="mod10-inv-qty">12 Pcs</span>
              </div>
              <div class="mod10-inv-purpose">Alcohol-based rub gels to ensure personal sanitation and health safety.</div>
            </div>
            <div class="glass-card mod10-inventory-card">
              <div class="mod10-inv-header">
                <div class="mod10-inv-name">Moisturizing Cream</div>
                <span class="mod10-inv-qty">12 Pcs</span>
              </div>
              <div class="mod10-inv-purpose">Hydrating body moisturizers to protect sensitive elderly skin from dry weather.</div>
            </div>
            <div class="glass-card mod10-inventory-card">
              <div class="mod10-inv-header">
                <div class="mod10-inv-name">First-Aid Gauze</div>
                <span class="mod10-inv-qty">24 Pcs</span>
              </div>
              <div class="mod10-inv-purpose">Sterile dressings and roll bandages to keep in the medical facility cabinet.</div>
            </div>
          </div>
        </div>

        <!-- 6. Event Activities -->
        <div>
          <h3 class="lecture-section-header"><i class="fas fa-champagne-glasses"></i> Event Activities & Interactions</h3>
          <div class="mod10-activities-grid">
            <div class="glass-card mod10-activity-card">
              <div class="mod10-act-title"><i class="fas fa-hourglass-start"></i> Arrival & Setup</div>
              <div class="mod10-act-body">
                <div><span class="mod10-act-lbl">Objective:</span> Coordinate the transport van, unload care kits, and setup acoustic gear.</div>
                <div><span class="mod10-act-lbl">Outcome:</span> Managed 24 volunteers. Set up staging in under 15 minutes.</div>
              </div>
            </div>
            <div class="glass-card mod10-activity-card">
              <div class="mod10-act-title"><i class="fas fa-handshake"></i> Welcome & Ice-Breaker</div>
              <div class="mod10-act-body">
                <div><span class="mod10-act-lbl">Objective:</span> Break initial barriers and establish a warm rapport with the grandmothers.</div>
                <div><span class="mod10-act-lbl">Outcome:</span> Sat down with grandmothers, introduced ourselves, and heard their life journeys.</div>
              </div>
            </div>
            <div class="glass-card mod10-activity-card">
              <div class="mod10-act-title"><i class="fas fa-guitar"></i> Acoustic Music Session</div>
              <div class="mod10-act-body">
                <div><span class="mod10-act-lbl">Objective:</span> Perform traditional, nostalgic Sinhala songs (from the 1960s-80s era).</div>
                <div><span class="mod10-act-lbl">Outcome:</span> Residents sang along, clapped, and shared emotional reflections on music.</div>
              </div>
            </div>
            <div class="glass-card mod10-activity-card">
              <div class="mod10-act-title"><i class="fas fa-cookie-bite"></i> Tea Service & Care</div>
              <div class="mod10-act-body">
                <div><span class="mod10-act-lbl">Objective:</span> Serve warm tea and diabetic-friendly snacks while chatting with residents.</div>
                <div><span class="mod10-act-lbl">Outcome:</span> Provided physical support for drinking and eating, ensuring safety and comfort.</div>
              </div>
            </div>
            <div class="glass-card mod10-activity-card">
              <div class="mod10-act-title"><i class="fas fa-gift"></i> Package Distribution</div>
              <div class="mod10-act-body">
                <div><span class="mod10-act-lbl">Objective:</span> Distribute the custom hygiene care packs to each resident.</div>
                <div><span class="mod10-act-lbl">Outcome:</span> Hand-delivered packages, sharing smiles and a moment of gratitude.</div>
              </div>
            </div>
            <div class="glass-card mod10-activity-card">
              <div class="mod10-act-title"><i class="fas fa-hourglass-end"></i> Closing & Farewell</div>
              <div class="mod10-act-body">
                <div><span class="mod10-act-lbl">Objective:</span> Express thanks to the staff and residents; take a unified team group photo.</div>
                <div><span class="mod10-act-lbl">Outcome:</span> Very emotional parting. Several grandmothers gave traditional Sinhala blessings.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 7. Challenges & Solutions -->
        <div>
          <h3 class="lecture-section-header"><i class="fas fa-circle-exclamation"></i> Crisis Management: Challenges & Solutions</h3>
          <div class="mod10-case-study-list">
            <div class="mod10-case-card">
              <div class="mod10-case-title"><i class="fas fa-triangle-exclamation"></i> Challenge 01: Colombo Traffic Blockade & Transit Delay</div>
              <div class="mod10-case-flow">
                <div class="mod10-flow-step challenge-step">
                  <div class="mod10-flow-step-lbl">Problem</div>
                  <div class="mod10-flow-step-val">Unexpected road closures near the elders' home caught the primary volunteer vehicle in massive traffic, threatening a 30-minute delay.</div>
                </div>
                <div class="mod10-flow-step impact-step">
                  <div class="mod10-flow-step-lbl">Impact</div>
                  <div class="mod10-flow-step-val">A delay would truncate the entertainment program, reducing the emotional connection time with the grandmothers.</div>
                </div>
                <div class="mod10-flow-step action-step">
                  <div class="mod10-flow-step-lbl">Action</div>
                  <div class="mod10-flow-step-val">Dispatched the setup crew early via local bikes to handle staging; adjusted tea service sequence dynamically.</div>
                </div>
                <div class="mod10-flow-step result-step">
                  <div class="mod10-flow-step-lbl">Result</div>
                  <div class="mod10-flow-step-val">Staging set up on time; delayed items arrived just before distribution; zero program truncation.</div>
                </div>
              </div>
            </div>
            <div class="mod10-case-card">
              <div class="mod10-case-title"><i class="fas fa-shield-cat"></i> Challenge 02: Diabetic Restrictions & Food Safety</div>
              <div class="mod10-case-flow">
                <div class="mod10-flow-step challenge-step">
                  <div class="mod10-flow-step-lbl">Problem</div>
                  <div class="mod10-flow-step-val">Initial catering order included high-sugar pastries, which were completely unsafe for diabetic grandmothers.</div>
                </div>
                <div class="mod10-flow-step impact-step">
                  <div class="mod10-flow-step-lbl">Impact</div>
                  <div class="mod10-flow-step-val">Risk of health spikes or causing grandmothers to feel excluded from eating with us.</div>
                </div>
                <div class="mod10-flow-step action-step">
                  <div class="mod10-flow-step-lbl">Action</div>
                  <div class="mod10-flow-step-val">Audited the home's records, cancelled the pastries, and procured diabetic-friendly biscuits, local cakes, and sugar-free herbal tea.</div>
                </div>
                <div class="mod10-flow-step result-step">
                  <div class="mod10-flow-step-lbl">Result</div>
                  <div class="mod10-flow-step-val">100% participation; residents felt safe, cared for, and completely included in the tea time.</div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- 9. Photo Gallery -->
        <div>
          <h3 class="lecture-section-header"><i class="fas fa-images"></i> Project Photo Gallery</h3>
          <div class="mod10-gallery-filters">
            <button class="mod10-filter-btn active" data-filter="all">All</button>
            <button class="mod10-filter-btn" data-filter="activities">Activities</button>
            <button class="mod10-filter-btn" data-filter="packages">Care Packages</button>
            <button class="mod10-filter-btn" data-filter="group">Group & Closing</button>
          </div>
          <div class="mod10-gallery-masonry" id="mod10-gallery">
            <div class="mod10-gallery-item" data-category="packages">
              <div class="mod10-gallery-art">
                <img src="media__1781183444025.jpg" alt="Dining Room Interaction" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="mod10-gallery-overlay">
                <div class="mod10-gallery-cat">Care Packages</div>
                <div class="mod10-gallery-title">Tea & Interaction in Dining Hall</div>
              </div>
            </div>
            <div class="mod10-gallery-item span-h" data-category="packages">
              <div class="mod10-gallery-art">
                <img src="media__1781183444088.jpg" alt="Courtyard Assembly" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="mod10-gallery-overlay">
                <div class="mod10-gallery-cat">Care Packages</div>
                <div class="mod10-gallery-title">Courtyard Assembly & Setup</div>
              </div>
            </div>
            <div class="mod10-gallery-item" data-category="packages">
              <div class="mod10-gallery-art">
                <img src="media__1781183444168.jpg" alt="Dining Hall Conversation" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="mod10-gallery-overlay">
                <div class="mod10-gallery-cat">Care Packages</div>
                <div class="mod10-gallery-title">Personalized Care Dialogue</div>
              </div>
            </div>
            <div class="mod10-gallery-item" data-category="packages">
              <div class="mod10-gallery-art">
                <img src="media__1781183444201.jpg" alt="Food Service Distribution" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="mod10-gallery-overlay">
                <div class="mod10-gallery-cat">Care Packages</div>
                <div class="mod10-gallery-title">Staging & Mealtime Service</div>
              </div>
            </div>
            <div class="mod10-gallery-item" data-category="activities">
              <div class="mod10-gallery-art">
                <img src="media__1781177568104.jpg" alt="Acoustic Session Performance" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="mod10-gallery-overlay">
                <div class="mod10-gallery-cat">Activities</div>
                <div class="mod10-gallery-title">Acoustic Session & Melodic Connection</div>
              </div>
            </div>
            <div class="mod10-gallery-item span-h" data-category="activities">
              <div class="mod10-gallery-art">
                <img src="media__1781177568349.jpg" alt="Guitar Performance" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="mod10-gallery-overlay">
                <div class="mod10-gallery-cat">Activities</div>
                <div class="mod10-gallery-title">Guitar & Vocal Duet Performance</div>
              </div>
            </div>
            <div class="mod10-gallery-item" data-category="activities">
              <div class="mod10-gallery-art">
                <img src="media__1781177568450.jpg" alt="Interactive Sing-Along" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="mod10-gallery-overlay">
                <div class="mod10-gallery-cat">Activities</div>
                <div class="mod10-gallery-title">Shared Music Joy with Elders</div>
              </div>
            </div>
            <div class="mod10-gallery-item span-h" data-category="activities">
              <div class="mod10-gallery-art">
                <img src="media__1781177568521.jpg" alt="Lead Vocalist" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="mod10-gallery-overlay">
                <div class="mod10-gallery-cat">Activities</div>
                <div class="mod10-gallery-title">Empathy-Driven Musical Performance</div>
              </div>
            </div>
            <div class="mod10-gallery-item" data-category="activities">
              <div class="mod10-gallery-art">
                <img src="media__1781177568570.jpg" alt="Acoustic Trio" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="mod10-gallery-overlay">
                <div class="mod10-gallery-cat">Activities</div>
                <div class="mod10-gallery-title">Coordinating the Performance Flow</div>
              </div>
            </div>
            <div class="mod10-gallery-item" data-category="activities">
              <div class="mod10-gallery-art">
                <img src="media__1781177844788.jpg" alt="Volunteers and Residents Gathering" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="mod10-gallery-overlay">
                <div class="mod10-gallery-cat">Activities</div>
                <div class="mod10-gallery-title">Warm Shared Courtyard Reunion</div>
              </div>
            </div>
            <div class="mod10-gallery-item span-h" data-category="activities">
              <div class="mod10-gallery-art">
                <img src="media__1781177844835.jpg" alt="Active Listening & Dialogue" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="mod10-gallery-overlay">
                <div class="mod10-gallery-cat">Activities</div>
                <div class="mod10-gallery-title">Giving a Voice: Sharing Stories</div>
              </div>
            </div>
            <div class="mod10-gallery-item" data-category="activities">
              <div class="mod10-gallery-art">
                <img src="media__1781177844878.jpg" alt="Empathetic Conversations" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="mod10-gallery-overlay">
                <div class="mod10-gallery-cat">Activities</div>
                <div class="mod10-gallery-title">Empathetic Personal Interlocking</div>
              </div>
            </div>
            <div class="mod10-gallery-item span-h" data-category="group">
              <div class="mod10-gallery-art">
                <img src="media__1781183831812.jpg" alt="Volunteer closing speech" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="mod10-gallery-overlay">
                <div class="mod10-gallery-cat">Group & Closing</div>
                <div class="mod10-gallery-title">Volunteer Reflection & Closing Words</div>
              </div>
            </div>
            <div class="mod10-gallery-item span-h" data-category="group">
              <div class="mod10-gallery-art">
                <img src="media__1781184381990.jpg" alt="Final Group Selfie" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="mod10-gallery-overlay">
                <div class="mod10-gallery-cat">Group & Closing</div>
                <div class="mod10-gallery-title">Final Group Selfie Celebration</div>
              </div>
            </div>
            <div class="mod10-gallery-item" data-category="group">
              <div class="mod10-gallery-art">
                <img src="media__1781184381991.jpg" alt="Sri Lankadhara Memories" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="mod10-gallery-overlay">
                <div class="mod10-gallery-cat">Group & Closing</div>
                <div class="mod10-gallery-title">Memories of Sri Lankadhara Outreach</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 10. Reciprocal Social Impact -->
        <div>
          <h3 class="lecture-section-header"><i class="fas fa-hand-holding-heart"></i> Reciprocal Social Impact</h3>
          <div class="mod10-impact-panels">
            <div class="glass-card mod10-impact-info-card">
              <div class="mod10-impact-info-title"><i class="fas fa-user-check"></i> Impact on Elderly Residents</div>
              <ul class="mod10-impact-info-list">
                <li class="mod10-impact-info-item">
                  <i class="fas fa-plus"></i>
                  <div class="mod10-impact-info-item-text">
                    <strong>Hygiene and Daily Comfort:</strong> Receiving high-quality bath towels, medicated soaps, and grooming items enhanced personal health and dignity.
                  </div>
                </li>
                <li class="mod10-impact-info-item">
                  <i class="fas fa-plus"></i>
                  <div class="mod10-impact-info-item-text">
                    <strong>Emotional and Social Activation:</strong> Nostalgic Sinhala acoustic songs broke their daily isolation, stimulating memories and a sense of belonging.
                  </div>
                </li>
                <li class="mod10-impact-info-item">
                  <i class="fas fa-plus"></i>
                  <div class="mod10-impact-info-item-text">
                    <strong>Active Companionship:</strong> One-on-one tea time talk showed that young software engineering students genuinely respect, care, and listen to them.
                  </div>
                </li>
              </ul>
            </div>
            <div class="glass-card mod10-impact-info-card">
              <div class="mod10-impact-info-title"><i class="fas fa-graduation-cap"></i> Learning Value for Volunteers</div>
              <ul class="mod10-impact-info-list">
                <li class="mod10-impact-info-item">
                  <i class="fas fa-plus"></i>
                  <div class="mod10-impact-info-item-text">
                    <strong>Real-world Project Control:</strong> Handled a fixed budget, purchase logistics, inventory counts, and timeline constraints under strict conditions.
                  </div>
                </li>
                <li class="mod10-impact-info-item">
                  <i class="fas fa-plus"></i>
                  <div class="mod10-impact-info-item-text">
                    <strong>Adaptive Teamwork & Agility:</strong> Resolved unexpected road closure traffic blockages and dietary restrictions, executing rapid adaptations.
                  </div>
                </li>
                <li class="mod10-impact-info-item">
                  <i class="fas fa-plus"></i>
                  <div class="mod10-impact-info-item-text">
                    <strong>Social Responsibility & Leadership:</strong> Shifted focus from self-accomplishment to community service, learning to lead with empathy.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 11. Lessons Learned -->
        <div>
          <h3 class="lecture-section-header"><i class="fas fa-clipboard-question"></i> Reflection & Lessons Learned</h3>
          <div class="mod10-lessons-board">
            <div class="glass-card mod10-lesson-note">
              <div class="mod10-lesson-header">What Worked Well</div>
              <div class="mod10-lesson-body">Structured delegation of duties. Splitting the team into Logistics, Finance, and Staging groups allowed parallel progress and high efficiency.</div>
            </div>
            <div class="glass-card mod10-lesson-note">
              <div class="mod10-lesson-header">What Could Be Improved</div>
              <div class="mod10-lesson-body">Transit buffer times. Traffic near Central Colombo is highly volatile; future projects must allocate an extra 45 minutes for logistics transport.</div>
            </div>
            <div class="glass-card mod10-lesson-note">
              <div class="mod10-lesson-header">Biggest Challenge</div>
              <div class="mod10-lesson-body">Budget optimization. Getting high-quality medicated supplies within LKR 2,012.50 per pack required intense supplier price comparison and negotiation.</div>
            </div>
            <div class="glass-card mod10-lesson-note">
              <div class="mod10-lesson-header">Most Rewarding Moment</div>
              <div class="mod10-lesson-body">Seeing a blind grandmother who was sitting quietly begin to clap, smile, and sing along when the acoustic guitar started playing old songs.</div>
            </div>
            <div class="glass-card mod10-lesson-note">
              <div class="mod10-lesson-header">Skills Gained</div>
              <div class="mod10-lesson-body">Adaptive leadership, logistics tracking, active listening, negotiation, and high accountability for social project deliverables.</div>
            </div>
            <div class="glass-card mod10-lesson-note">
              <div class="mod10-lesson-header">Future Application</div>
              <div class="mod10-lesson-body">I will apply these crisis-adaptation and team coordination lessons when managing software release pipelines and agile sprints.</div>
            </div>
          </div>
        </div>

        <!-- 12. Project Testimonials Section -->
        <div>
          <h3 class="lecture-section-header"><i class="fas fa-quote-left"></i> Project Testimonials</h3>
          <div class="mod10-testimonials-grid">
            <div class="glass-card mod10-testimonial-card">
              <div class="mod10-testimonial-quote">
                "Managing 24 volunteers during a time-sensitive event day was the ultimate test of our communication protocols. We couldn't rely on slack or email; we had to adapt on-site. Seeing the team coordinate setup and distribution so cohesively showed how much our teamwork skills have matured."
              </div>
              <div class="mod10-testimonial-author">
                <div class="mod10-avatar">TL</div>
                <div class="mod10-author-details">
                  <div class="mod10-author-name">Volunteer Coordinator</div>
                  <div class="mod10-author-title">PSD Group Leader</div>
                </div>
              </div>
            </div>
            <div class="glass-card mod10-testimonial-card">
              <div class="mod10-testimonial-quote">
                "I was initially unsure if we could make a meaningful impact in just one afternoon, but seeing the residents' reaction to our music and talks was extremely grounding. As software engineering undergraduates, we spend so much time in front of screens. This project connected us to the real world."
              </div>
              <div class="mod10-testimonial-author">
                <div class="mod10-avatar">KS</div>
                <div class="mod10-author-details">
                  <div class="mod10-author-name">Kavishka Shenal</div>
                  <div class="mod10-author-title">Software Intern & Volunteer</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 13. Final Project Reflection -->
        <div>
          <h3 class="lecture-section-header"><i class="fas fa-feather-pointed"></i> Executive Journal Synthesis</h3>
          <div class="glass-card mod10-story-card">
            <div class="mod10-story-content">
              <p>Organizing the Sri Lankadhara Society outreach campaign was a watershed moment in my professional growth. Managing a large group of 24 team members required moving away from task micro-management and instead focusing on empowerment and dynamic responsibility sharing. Every volunteer had a dedicated mandate, and keeping them aligned during unexpected changes was an exercise in pure leadership.</p>
              <p>The campaign threw real-world curveballs at us: the Colombo transit blockade caught our supplies transport in gridlock, and we discovered critical dietary restrictions for sugar intake that clashed with our pastries plan. These challenges required immediate agile adaptation. We dispatched setup crews on local bikes to prep the elders' home early and negotiated a diabetic-safe tea menu with local bakeries in minutes. We learned that a plan is only a starting point; leadership is what carries a project to success when variables shift.</p>
              <p>Most importantly, the outreach built a profound level of empathy. Sitting with the grandmothers, performing acoustic music, and hearing their life journeys showed me that the technology we build must serve human purposes. Returning to my software engineering studies, I carry a deep sense of social responsibility. I am committed to applying my technical capability, budgeting composure, and leadership agility to build digital products that make a positive impact on our communities.</p>
            </div>
            <div class="mod10-signature">
              <div class="mod10-signature-name">Kavishka Shenal</div>
              <div class="mod10-signature-sub">Undergraduate Software Engineer | PSD Portfolio 2026</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Render interactive donut chart
    renderModule10BudgetDonut();
    // Setup gallery filtering
    setupGalleryFilter();
    // Animate skill bars
    animateModule10Skills();
  }

  function renderModule10BudgetDonut() {
    const container = document.getElementById('mod10-donut-svg');
    if (!container) return;
    container.innerHTML = '';

    const svgNS = "http://www.w3.org/2000/svg";
    const segments = [
      { stroke: "#06B6D4", length: 276.7, offset: 0, name: "Care Packages", amount: "LKR 24,150", pct: "62.9%", desc: "Purchase of 12 sets of hygiene items, soaps, towels, and hand sanitizers." },
      { stroke: "#38BDF8", length: 110.4, offset: -276.7, name: "Food & Event", amount: "LKR 9,660", pct: "25.1%", desc: "Acoustic sound equipment rental, decorations, tea, sugar-free sweets, and soft cakes." },
      { stroke: "#10B981", length: 52.8, offset: -387.1, name: "Logistics & Transport", amount: "LKR 4,600", pct: "12.0%", desc: "Hiring volunteer group van, packaging materials, and travel transport logistics." }
    ];

    const detailsBox = document.getElementById('mod10-donut-details');

    segments.forEach(seg => {
      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", "100");
      circle.setAttribute("cy", "100");
      circle.setAttribute("r", "70");
      circle.setAttribute("class", "mod10-donut-segment");
      circle.setAttribute("stroke", seg.stroke);
      circle.setAttribute("stroke-dasharray", `${seg.length} 440`);
      circle.setAttribute("stroke-dashoffset", seg.offset.toString());
      circle.setAttribute("transform", "rotate(-90 100 100)");
      circle.setAttribute("stroke-width", "16");

      circle.addEventListener("click", () => {
        container.querySelectorAll('.mod10-donut-segment').forEach(c => c.setAttribute("stroke-width", "16"));
        circle.setAttribute("stroke-width", "20");
        if (detailsBox) {
          detailsBox.innerHTML = `<strong>${seg.name}:</strong> ${seg.amount} (${seg.pct}) - ${seg.desc}`;
        }
      });

      circle.addEventListener("mouseenter", () => {
        circle.setAttribute("stroke-width", "20");
      });

      circle.addEventListener("mouseleave", () => {
        if (!detailsBox || !detailsBox.innerHTML.includes(seg.name)) {
          circle.setAttribute("stroke-width", "16");
        }
      });

      container.appendChild(circle);
    });
  }

  function setupGalleryFilter() {
    const filterBtns = document.querySelectorAll('.mod10-filter-btn');
    const galleryItems = document.querySelectorAll('.mod10-gallery-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'flex';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  function animateModule10Skills() {
    const fills = document.querySelectorAll('.mod10-skill-fill');
    fills.forEach(fill => {
      const target = fill.getAttribute('data-width');
      setTimeout(() => {
        fill.style.width = target;
      }, 200);
    });
  }

  // Dynamic SVG Drawing Engine
  function renderSVG(id, container) {
    if (!container) return;
    const isDark = !document.body.classList.contains('light-mode');
    const accentCyan = "#06B6D4";
    const accentSky = "#38BDF8";
    const fillLight = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.03)";
    const strokeBorder = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(15, 23, 42, 0.12)";
    const textMainColor = isDark ? "#E2E8F0" : "#1E293B";
    const textSubColor = isDark ? "#94A3B8" : "#64748B";

    const detailsTitle = document.getElementById('svg-details-title');
    const detailsText = document.getElementById('svg-details-text');

    function updateDetails(title, text) {
      if (detailsTitle && detailsText) {
        detailsTitle.innerHTML = `<i class="fas fa-info-circle text-cyan"></i> ${title}`;
        detailsText.textContent = text;
      }
    }

    let svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 400 320");
    svg.setAttribute("class", "svg-framework");

    if (id === "1") {
      // Johari Window
      const quadrants = [
        { name: "Arena (Open)", desc: "Known to Self & Others: Technical skills, design layouts, project plans. Active communication keeps this zone large.", title: "Arena Quadrant", x: 15, y: 15, key: "arena" },
        { name: "Blind Spot", desc: "Unknown to Self, Known to Others: Communication tone under pressure. Solved by code reviews and retrospective critique.", title: "Blind Spot Quadrant", x: 205, y: 15, key: "blind" },
        { name: "Facade (Hidden)", desc: "Known to Self, Unknown to Others: Unspoken technical doubts or design preferences. Shared during brainstorming sessions.", title: "Facade Quadrant", x: 15, y: 165, key: "facade" },
        { name: "Unknown", desc: "Unknown to Self & Others: Hidden leadership potentials, adaptabilities, and capacities. Unlocked through crisis management.", title: "Unknown Quadrant", x: 205, y: 165, key: "unknown" }
      ];

      quadrants.forEach(q => {
        let group = document.createElementNS(svgNS, "g");
        group.setAttribute("class", "svg-interactive-node");

        let rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", q.x);
        rect.setAttribute("y", q.y);
        rect.setAttribute("width", "180");
        rect.setAttribute("height", "140");
        rect.setAttribute("rx", "8");
        rect.setAttribute("fill", fillLight);
        rect.setAttribute("stroke", strokeBorder);
        rect.setAttribute("stroke-width", "1.5");

        let text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", q.x + 90);
        text.setAttribute("y", q.y + 70);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("class", "svg-text-label");
        text.setAttribute("fill", textMainColor);
        text.textContent = q.name;

        group.appendChild(rect);
        group.appendChild(text);

        group.addEventListener("click", () => {
          group.parentElement.querySelectorAll("rect").forEach(r => r.setAttribute("stroke", strokeBorder));
          rect.setAttribute("stroke", accentCyan);
          updateDetails(q.title, q.desc);
        });
        group.addEventListener("mouseenter", () => {
          rect.setAttribute("fill", isDark ? "rgba(6, 182, 212, 0.08)" : "rgba(6, 182, 212, 0.05)");
        });
        group.addEventListener("mouseleave", () => {
          rect.setAttribute("fill", fillLight);
        });

        svg.appendChild(group);
      });

    } else if (id === "2") {
      // EQ Radar / 4 Quadrant Chart
      const axes = [
        { name: "Self-Awareness", val: 0.85, x: 200, y: 40, align: "middle", anchor: "bottom", desc: "My self-assessment score is 85%. I track stress triggers, noting sleep and performance variations during deadlines." },
        { name: "Self-Management", val: 0.80, x: 340, y: 160, align: "start", anchor: "middle", desc: "My self-assessment score is 80%. I stay composed under deployment errors, using calm breathing and pauses to avoid emotional leakage." },
        { name: "Social Awareness", val: 0.90, x: 200, y: 280, align: "middle", anchor: "top", desc: "My self-assessment score is 90%. I practice active listening and empathetic sensing, noting team fatigue and non-verbal signals." },
        { name: "Relationship Management", val: 0.85, x: 60, y: 160, align: "end", anchor: "middle", desc: "My self-assessment score is 85%. I focus on influence rather than authority, resolving code review differences collaboratively." }
      ];

      // Draw background grid lines
      for (let r = 0.25; r <= 1.0; r += 0.25) {
        let poly = document.createElementNS(svgNS, "polygon");
        let points = [
          `200,${160 - 120 * r}`,
          `${200 + 140 * r},160`,
          `200,${160 + 120 * r}`,
          `${200 - 140 * r},160`
        ].join(" ");
        poly.setAttribute("points", points);
        poly.setAttribute("fill", "none");
        poly.setAttribute("stroke", strokeBorder);
        poly.setAttribute("stroke-width", "1");
        poly.setAttribute("stroke-dasharray", "4 4");
        svg.appendChild(poly);
      }

      // Draw Axes
      let axisGroup = document.createElementNS(svgNS, "g");
      let lineH = document.createElementNS(svgNS, "line");
      lineH.setAttribute("x1", "50"); lineH.setAttribute("y1", "160");
      lineH.setAttribute("x2", "350"); lineH.setAttribute("y2", "160");
      lineH.setAttribute("stroke", strokeBorder);
      axisGroup.appendChild(lineH);

      let lineV = document.createElementNS(svgNS, "line");
      lineV.setAttribute("x1", "200"); lineV.setAttribute("y1", "30");
      lineV.setAttribute("x2", "200"); lineV.setAttribute("y2", "290");
      lineV.setAttribute("stroke", strokeBorder);
      axisGroup.appendChild(lineV);
      svg.appendChild(axisGroup);

      // Draw EQ Value polygon
      let eqPoly = document.createElementNS(svgNS, "polygon");
      let p1 = `200,${160 - 120 * 0.85}`;
      let p2 = `${200 + 140 * 0.80},160`;
      let p3 = `200,${160 + 120 * 0.90}`;
      let p4 = `${200 - 140 * 0.85},160`;
      eqPoly.setAttribute("points", `${p1} ${p2} ${p3} ${p4}`);
      eqPoly.setAttribute("fill", "rgba(6, 182, 212, 0.15)");
      eqPoly.setAttribute("stroke", accentCyan);
      eqPoly.setAttribute("stroke-width", "2");
      svg.appendChild(eqPoly);

      // Draw Nodes
      axes.forEach(a => {
        let nodeGroup = document.createElementNS(svgNS, "g");
        nodeGroup.setAttribute("class", "svg-interactive-node");

        let px = a.x === 200 ? 200 : (a.x > 200 ? 200 + 140 * a.val : 200 - 140 * a.val);
        let py = a.y === 160 ? 160 : (a.y > 160 ? 160 + 120 * a.val : 160 - 120 * a.val);

        let c = document.createElementNS(svgNS, "circle");
        c.setAttribute("cx", px);
        c.setAttribute("cy", py);
        c.setAttribute("r", "6");
        c.setAttribute("fill", accentSky);
        c.setAttribute("stroke", textMainColor);
        c.setAttribute("stroke-width", "1.5");

        let label = document.createElementNS(svgNS, "text");
        label.setAttribute("x", a.x);
        label.setAttribute("y", a.y + (a.y < 160 ? -10 : a.y > 160 ? 15 : 4));
        label.setAttribute("text-anchor", a.align);
        label.setAttribute("class", "svg-text-label");
        label.setAttribute("fill", textMainColor);
        label.textContent = a.name;

        nodeGroup.appendChild(c);
        nodeGroup.appendChild(label);

        nodeGroup.addEventListener("click", () => {
          nodeGroup.parentElement.querySelectorAll("circle").forEach(circle => circle.setAttribute("fill", accentSky));
          c.setAttribute("fill", accentCyan);
          updateDetails(a.name, a.desc);
        });
        nodeGroup.addEventListener("mouseenter", () => {
          c.setAttribute("r", "8");
        });
        nodeGroup.addEventListener("mouseleave", () => {
          c.setAttribute("r", "6");
        });

        svg.appendChild(nodeGroup);
      });

    } else if (id === "3") {
      // Portfolio CI/CD Pipeline
      const pipeline = [
        { name: "Source Curation", sub: "Stage 01", desc: "Curation: Identifying files, design folders, and Github commits to act as base portfolio evidence.", x: 40 },
        { name: "Reflective Write", sub: "Stage 02", desc: "Reflection: Writing detailed, authentic reports connecting hard skills to soft-skill targets.", x: 120 },
        { name: "Asset Audit", sub: "Stage 03", desc: "Audit: Cleaning layout tables, responsive styles, images, and validation metrics.", x: 200 },
        { name: "Peer Review", sub: "Stage 04", desc: "Review: Exposing portfolio layouts to senior mentors and academic coordinators for critiques.", x: 280 },
        { name: "Deploy Vercel", sub: "Stage 05", desc: "Deployment: Hosting files online via Git pipeline setups for recruiter evaluations.", x: 360 }
      ];

      // Draw connection lines
      let line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", "40"); line.setAttribute("y1", "160");
      line.setAttribute("x2", "360"); line.setAttribute("y2", "160");
      line.setAttribute("stroke", strokeBorder);
      line.setAttribute("stroke-width", "2");
      svg.appendChild(line);

      pipeline.forEach(p => {
        let node = document.createElementNS(svgNS, "g");
        node.setAttribute("class", "svg-interactive-node");

        let c = document.createElementNS(svgNS, "circle");
        c.setAttribute("cx", p.x);
        c.setAttribute("cy", "160");
        c.setAttribute("r", "10");
        c.setAttribute("fill", fillLight);
        c.setAttribute("stroke", accentCyan);
        c.setAttribute("stroke-width", "2");

        let label = document.createElementNS(svgNS, "text");
        label.setAttribute("x", p.x);
        label.setAttribute("y", "130");
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("class", "svg-text-label");
        label.setAttribute("fill", textMainColor);
        label.textContent = p.name;

        let subLabel = document.createElementNS(svgNS, "text");
        subLabel.setAttribute("x", p.x);
        subLabel.setAttribute("y", "190");
        subLabel.setAttribute("text-anchor", "middle");
        subLabel.setAttribute("class", "svg-text-sublabel");
        subLabel.setAttribute("fill", textSubColor);
        subLabel.textContent = p.sub;

        node.appendChild(c);
        node.appendChild(label);
        node.appendChild(subLabel);

        node.addEventListener("click", () => {
          node.parentElement.querySelectorAll("circle").forEach(circle => circle.setAttribute("fill", fillLight));
          c.setAttribute("fill", accentCyan);
          updateDetails(p.name + " (" + p.sub + ")", p.desc);
        });
        node.addEventListener("mouseenter", () => {
          c.setAttribute("stroke", accentSky);
        });
        node.addEventListener("mouseleave", () => {
          c.setAttribute("stroke", accentCyan);
        });

        svg.appendChild(node);
      });

    } else if (id === "4") {
      // ATS Optimization Workflow
      const nodes = [
        { name: "CV Input", type: "input", x: 40, y: 160, desc: "Submit optimized resume PDF/DOCX containing semantic search descriptors." },
        { name: "ATS Filter Engine", type: "process", x: 150, y: 160, desc: "The parsing parser matches text structure, discarding embedded graphics, tables, or non-standard headers." },
        { name: "Keyword Audit", type: "output", x: 290, y: 80, desc: "Scans skill keyword density, evaluating matches against target job parameters." },
        { name: "Structure Audit", type: "output", x: 290, y: 160, desc: "Validates layout tags, bullet formatting, and structural font readability." },
        { name: "Recruiter Pass", type: "output", x: 290, y: 240, desc: "Successful pass leads to human screening and shortlisting phase." }
      ];

      // Draw workflow connection lines
      let path1 = document.createElementNS(svgNS, "line");
      path1.setAttribute("x1", "40"); path1.setAttribute("y1", "160");
      path1.setAttribute("x2", "150"); path1.setAttribute("y2", "160");
      path1.setAttribute("stroke", strokeBorder);
      path1.setAttribute("stroke-width", "1.5");
      svg.appendChild(path1);

      let paths = [80, 160, 240];
      paths.forEach(y => {
        let p = document.createElementNS(svgNS, "line");
        p.setAttribute("x1", "150"); p.setAttribute("y1", "160");
        p.setAttribute("x2", "290"); p.setAttribute("y2", y);
        p.setAttribute("stroke", strokeBorder);
        p.setAttribute("stroke-width", "1.5");
        svg.appendChild(p);
      });

      nodes.forEach(n => {
        let node = document.createElementNS(svgNS, "g");
        node.setAttribute("class", "svg-interactive-node");

        let rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", n.x - 35);
        rect.setAttribute("y", n.y - 25);
        rect.setAttribute("width", "70");
        rect.setAttribute("height", "50");
        rect.setAttribute("rx", "6");
        rect.setAttribute("fill", fillLight);
        rect.setAttribute("stroke", accentCyan);
        rect.setAttribute("stroke-width", "1.5");

        let label = document.createElementNS(svgNS, "text");
        label.setAttribute("x", n.x);
        label.setAttribute("y", n.y + 5);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("style", "font-size: 8px; font-weight: 700;");
        label.setAttribute("fill", textMainColor);
        label.textContent = n.name;

        node.appendChild(rect);
        node.appendChild(label);

        node.addEventListener("click", () => {
          node.parentElement.querySelectorAll("rect").forEach(r => r.setAttribute("stroke", accentCyan));
          rect.setAttribute("stroke", accentSky);
          updateDetails(n.name, n.desc);
        });
        node.addEventListener("mouseenter", () => {
          rect.setAttribute("fill", "rgba(6, 182, 212, 0.08)");
        });
        node.addEventListener("mouseleave", () => {
          rect.setAttribute("fill", fillLight);
        });

        svg.appendChild(node);
      });

    } else if (id === "5") {
      // STAR Method Chevrons
      const steps = [
        { name: "S - Situation", label: "Context", x: 15, desc: "Situation: Present a detailed context or bottleneck. E.g., 'API latency spiked 300% during database load tests.'" },
        { name: "T - Task", label: "Target", x: 105, desc: "Task: Explain your exact role and objective. E.g., 'Identify the bottleneck and restore latency metrics.'" },
        { name: "A - Action", label: "Strategy", x: 195, desc: "Action: Break down specific engineering steps you executed. E.g., 'Profiled queries, added composite keys, and built Redis cache.'" },
        { name: "R - Result", label: "Outcome", x: 285, desc: "Result: Quantify positive business impact. E.g., 'Response times fell 70%; system supported 2x active sessions.'" }
      ];

      steps.forEach(s => {
        let node = document.createElementNS(svgNS, "g");
        node.setAttribute("class", "svg-interactive-node");

        let rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", s.x);
        rect.setAttribute("y", "100");
        rect.setAttribute("width", "80");
        rect.setAttribute("height", "100");
        rect.setAttribute("rx", "6");
        rect.setAttribute("fill", fillLight);
        rect.setAttribute("stroke", strokeBorder);
        rect.setAttribute("stroke-width", "1.5");

        let txtName = document.createElementNS(svgNS, "text");
        txtName.setAttribute("x", s.x + 40);
        txtName.setAttribute("y", "140");
        txtName.setAttribute("text-anchor", "middle");
        txtName.setAttribute("class", "svg-text-label");
        txtName.setAttribute("fill", textMainColor);
        txtName.textContent = s.name.split(" - ")[0];

        let txtSub = document.createElementNS(svgNS, "text");
        txtSub.setAttribute("x", s.x + 40);
        txtSub.setAttribute("y", "165");
        txtSub.setAttribute("text-anchor", "middle");
        txtSub.setAttribute("class", "svg-text-sublabel");
        txtSub.setAttribute("fill", textSubColor);
        txtSub.textContent = s.label;

        node.appendChild(rect);
        node.appendChild(txtName);
        node.appendChild(txtSub);

        node.addEventListener("click", () => {
          node.parentElement.querySelectorAll("rect").forEach(r => r.setAttribute("stroke", strokeBorder));
          rect.setAttribute("stroke", accentCyan);
          updateDetails(s.name, s.desc);
        });
        node.addEventListener("mouseenter", () => {
          rect.setAttribute("fill", "rgba(6, 182, 212, 0.08)");
        });
        node.addEventListener("mouseleave", () => {
          rect.setAttribute("fill", fillLight);
        });

        svg.appendChild(node);
      });

    } else if (id === "6") {
      // Email Hotspots mock UI
      // Draw background browser email box
      let shell = document.createElementNS(svgNS, "rect");
      shell.setAttribute("x", "15"); shell.setAttribute("y", "15");
      shell.setAttribute("width", "370"); shell.setAttribute("height", "290");
      shell.setAttribute("rx", "6");
      shell.setAttribute("fill", fillLight);
      shell.setAttribute("stroke", strokeBorder);
      shell.setAttribute("stroke-width", "1.5");
      svg.appendChild(shell);

      // Lines representing fields
      let headers = ["To: recruiter@enterprise.com", "Subject: Kavishka Shenal - Software Intern Application"];
      headers.forEach((h, index) => {
        let text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", "30"); text.setAttribute("y", 45 + index * 25);
        text.setAttribute("style", "font-family: var(--font-sans); font-size: 10px; font-weight:600;");
        text.setAttribute("fill", textMainColor);
        text.textContent = h;
        svg.appendChild(text);

        let hr = document.createElementNS(svgNS, "line");
        hr.setAttribute("x1", "15"); hr.setAttribute("y1", 55 + index * 25);
        hr.setAttribute("x2", "385"); hr.setAttribute("y2", 55 + index * 25);
        hr.setAttribute("stroke", strokeBorder);
        svg.appendChild(hr);
      });

      // Body lines placeholder
      let bodyLines = [
        "Dear hiring lead,",
        "Following your posting for a software development intern, I present my portfolio details...",
        "Applying the THINK Filter parameters, I ensure this request remains True, Helpful, and concise...",
        "Regards,",
        "Kavishka Shenal"
      ];
      bodyLines.forEach((bl, index) => {
        let text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", "30"); text.setAttribute("y", 130 + index * 22);
        text.setAttribute("style", "font-family: var(--font-sans); font-size: 8.5px;");
        text.setAttribute("fill", textSubColor);
        text.textContent = bl;
        svg.appendChild(text);
      });

      // Hotspots
      const hotspots = [
        { name: "Subject Line", x: 300, y: 70, desc: "Subject: Keep it clear, referencing role, name, and application target. No uppercase shouting." },
        { name: "Salutation", x: 120, y: 126, desc: "Salutation: Begin with formal respect. Double-check name spelling and professional suffixes." },
        { name: "THINK Filter Body", x: 300, y: 172, desc: "Body Content: Run every paragraph through the THINK filter to ensure messaging is True, Helpful, Inspiring, Necessary, and Kind." },
        { name: "Sign-Off & Contact", x: 120, y: 220, desc: "Signature: Include phone, GitHub links, and professional email credentials." }
      ];

      hotspots.forEach(h => {
        let node = document.createElementNS(svgNS, "g");
        node.setAttribute("class", "svg-interactive-node");

        let outerC = document.createElementNS(svgNS, "circle");
        outerC.setAttribute("cx", h.x); outerC.setAttribute("cy", h.y);
        outerC.setAttribute("r", "10");
        outerC.setAttribute("fill", "rgba(6, 182, 212, 0.2)");

        let innerC = document.createElementNS(svgNS, "circle");
        innerC.setAttribute("cx", h.x); innerC.setAttribute("cy", h.y);
        innerC.setAttribute("r", "5");
        innerC.setAttribute("fill", accentCyan);

        node.appendChild(outerC);
        node.appendChild(innerC);

        node.addEventListener("click", () => {
          node.parentElement.querySelectorAll("circle[r='5']").forEach(c => c.setAttribute("fill", accentCyan));
          innerC.setAttribute("fill", accentSky);
          updateDetails(h.name, h.desc);
        });

        svg.appendChild(node);
      });

    } else if (id === "7") {
      // BATNA quadrants
      const matrix = [
        { name: "Collaborate", sub: "Win-Win", x: 205, y: 15, desc: "Collaborate: High Outcome & High Relationship. Essential for dev teams where shared goals and code integration require cooperation." },
        { name: "Compete", sub: "Win-Lose", x: 15, y: 15, desc: "Compete: High Outcome & Low Relationship. Pursuing specific targets aggressively. Best avoided inside team development." },
        { name: "Accommodate", sub: "Lose-Win", x: 205, y: 165, desc: "Accommodate: Low Outcome & High Relationship. Yielding points to build trust or relationship strength for future releases." },
        { name: "Avoid", sub: "Lose-Lose", x: 15, y: 165, desc: "Avoid: Low Outcome & Low Relationship. Postponing negotiation when timing or issue details aren't ready." }
      ];

      // Draw background axes labels
      let yLabel = document.createElementNS(svgNS, "text");
      yLabel.setAttribute("x", "10"); yLabel.setAttribute("y", "20");
      yLabel.setAttribute("style", "font-size: 8px; font-weight:700;");
      yLabel.setAttribute("fill", textSubColor);
      yLabel.textContent = "↑ Relationship Importance";
      svg.appendChild(yLabel);

      let xLabel = document.createElementNS(svgNS, "text");
      xLabel.setAttribute("x", "300"); xLabel.setAttribute("y", "310");
      xLabel.setAttribute("style", "font-size: 8px; font-weight:700;");
      xLabel.setAttribute("fill", textSubColor);
      xLabel.textContent = "Outcome Importance →";
      svg.appendChild(xLabel);

      matrix.forEach(m => {
        let node = document.createElementNS(svgNS, "g");
        node.setAttribute("class", "svg-interactive-node");

        let rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", m.x);
        rect.setAttribute("y", m.y);
        rect.setAttribute("width", "180");
        rect.setAttribute("height", "130");
        rect.setAttribute("rx", "6");
        rect.setAttribute("fill", fillLight);
        rect.setAttribute("stroke", strokeBorder);
        rect.setAttribute("stroke-width", "1.5");

        let title = document.createElementNS(svgNS, "text");
        title.setAttribute("x", m.x + 90);
        title.setAttribute("y", m.y + 60);
        title.setAttribute("text-anchor", "middle");
        title.setAttribute("class", "svg-text-label");
        title.setAttribute("fill", textMainColor);
        title.textContent = m.name;

        let subt = document.createElementNS(svgNS, "text");
        subt.setAttribute("x", m.x + 90);
        subt.setAttribute("y", m.y + 80);
        subt.setAttribute("text-anchor", "middle");
        subt.setAttribute("class", "svg-text-sublabel");
        subt.setAttribute("fill", textSubColor);
        subt.textContent = m.sub;

        node.appendChild(rect);
        node.appendChild(title);
        node.appendChild(subt);

        node.addEventListener("click", () => {
          node.parentElement.querySelectorAll("rect").forEach(r => r.setAttribute("stroke", strokeBorder));
          rect.setAttribute("stroke", accentCyan);
          updateDetails(m.name + " (" + m.sub + ")", m.desc);
        });
        node.addEventListener("mouseenter", () => {
          rect.setAttribute("fill", "rgba(6, 182, 212, 0.08)");
        });
        node.addEventListener("mouseleave", () => {
          rect.setAttribute("fill", fillLight);
        });

        svg.appendChild(node);
      });

    } else if (id === "8") {
      // Concentric Rings
      const rings = [
        { r: 130, name: "Outer Ring: Public Reputation", color: accentSky, desc: "Outer Ring: Public Reputation and Professional Brand perception. Sustained by reliable execution and consistent etiquette reviews." },
        { r: 90, name: "Middle Ring: Professional Brand", color: accentCyan, desc: "Middle Ring: Professional Portrayals. LinkedIn files, active GitHub project commits, and this PSD portfolio Hub representation." },
        { r: 50, name: "Inner Ring: Core Identity", color: "#F43F5E", desc: "Inner Ring: Core Identity, Integrity, and Academic Values. The foundational center driving career motivation." }
      ];

      rings.forEach(rng => {
        let node = document.createElementNS(svgNS, "g");
        node.setAttribute("class", "svg-interactive-node");

        let c = document.createElementNS(svgNS, "circle");
        c.setAttribute("cx", "200"); c.setAttribute("cy", "160");
        c.setAttribute("r", rng.r);
        c.setAttribute("fill", "none");
        c.setAttribute("stroke", rng.color);
        c.setAttribute("stroke-width", "8");
        c.setAttribute("opacity", "0.7");

        node.appendChild(c);

        node.addEventListener("click", () => {
          node.parentElement.querySelectorAll("circle").forEach(cir => cir.setAttribute("opacity", "0.5"));
          c.setAttribute("opacity", "1.0");
          updateDetails(rng.name, rng.desc);
        });
        node.addEventListener("mouseenter", () => {
          c.setAttribute("stroke-width", "12");
        });
        node.addEventListener("mouseleave", () => {
          c.setAttribute("stroke-width", "8");
        });

        svg.appendChild(node);
      });

      // Label at center
      let cLabel = document.createElementNS(svgNS, "text");
      cLabel.setAttribute("x", "200"); cLabel.setAttribute("y", "163");
      cLabel.setAttribute("text-anchor", "middle");
      cLabel.setAttribute("style", "font-size: 8px; font-weight:700;");
      cLabel.setAttribute("fill", textMainColor);
      cLabel.textContent = "Identity Brand Model";
      svg.appendChild(cLabel);

    } else if (id === "9") {
      // Dining Etiquette Layout Plate/Cutlery Diagram with Toggle
      // Render plate
      let plate = document.createElementNS(svgNS, "circle");
      plate.setAttribute("cx", "200"); plate.setAttribute("cy", "160");
      plate.setAttribute("r", "70");
      plate.setAttribute("class", "cutlery-plate-outline");
      svg.appendChild(plate);

      // Add fork line and knife line
      let fork = document.createElementNS(svgNS, "line");
      fork.setAttribute("class", "cutlery-fork-line");
      svg.appendChild(fork);

      let knife = document.createElementNS(svgNS, "line");
      knife.setAttribute("class", "cutlery-knife-line");
      svg.appendChild(knife);

      // UTILS for updating line values
      function setCutlery(state) {
        if (state === "pause") {
          // Fork points at top-right, knife points at top-left, forming inverted V
          fork.setAttribute("x1", "150"); fork.setAttribute("y1", "210");
          fork.setAttribute("x2", "190"); fork.setAttribute("y2", "140");

          knife.setAttribute("x1", "250"); knife.setAttribute("y1", "210");
          knife.setAttribute("x2", "210"); knife.setAttribute("y2", "140");
          updateDetails("Pause State", "Inverted V: Indicates you are pausing but not finished eating. Utensils stay on the plate while speaking with delegates.");
        } else if (state === "finish") {
          // Parallel pointing straight up
          fork.setAttribute("x1", "190"); fork.setAttribute("y1", "220");
          fork.setAttribute("x2", "190"); fork.setAttribute("y2", "100");

          knife.setAttribute("x1", "210"); knife.setAttribute("y1", "220");
          knife.setAttribute("x2", "210"); knife.setAttribute("y2", "100");
          updateDetails("Finished State", "Parallel utensils: Signals the meal is complete. Flatware points straight up or at 10:20 so waitstaff can remove elements.");
        } else if (state === "next") {
          // Fork pointing straight up, knife horizontal across it
          fork.setAttribute("x1", "200"); fork.setAttribute("y1", "220");
          fork.setAttribute("x2", "200"); fork.setAttribute("y2", "100");

          knife.setAttribute("x1", "140"); knife.setAttribute("y1", "160");
          knife.setAttribute("x2", "260"); knife.setAttribute("y2", "160");
          updateDetails("Ready for Next Plate", "Crossed position: Form a cross with the fork vertical and the knife horizontal. This signals to waitstaff that you are ready for the Next Plate.");
        } else if (state === "excellent") {
          // Parallel horizontal, pointing right
          fork.setAttribute("x1", "140"); fork.setAttribute("y1", "150");
          fork.setAttribute("x2", "260"); fork.setAttribute("y2", "150");

          knife.setAttribute("x1", "140"); knife.setAttribute("y1", "170");
          knife.setAttribute("x2", "260"); knife.setAttribute("y2", "170");
          updateDetails("Compliment / Excellent", "Parallel horizontal: Fork and knife placed side-by-side horizontally across the center of the plate, pointing right. Signals you thoroughly enjoyed the meal.");
        } else if (state === "dontlike") {
          // Crossed inverted V (protest)
          fork.setAttribute("x1", "160"); fork.setAttribute("y1", "210");
          fork.setAttribute("x2", "220"); fork.setAttribute("y2", "110");

          knife.setAttribute("x1", "240"); knife.setAttribute("y1", "210");
          knife.setAttribute("x2", "180"); knife.setAttribute("y2", "110");
          updateDetails("Disliked / Protest", "Crossed inverted V: Knife blade inserted through the tines of the fork (or crossed at an angle). Signals that you did not enjoy the meal.");
        }
      }

      // Default state
      setCutlery("pause");

      // Inject buttons in container
      let buttonContainer = document.createElement("div");
      buttonContainer.setAttribute("class", "dining-toggle-bar");

      let buttons = [];

      function createBtn(state, text) {
        let btn = document.createElement("button");
        btn.setAttribute("class", "dining-btn");
        if (state === "pause") btn.classList.add("active");
        btn.textContent = text;
        btn.addEventListener("click", () => {
          buttons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          setCutlery(state);
        });
        buttons.push(btn);
        buttonContainer.appendChild(btn);
      }

      createBtn("pause", "Pause Position");
      createBtn("finish", "Finished Position");
      createBtn("next", "Next Plate");
      createBtn("excellent", "Excellent");
      createBtn("dontlike", "Don't Like");

      container.parentElement.insertBefore(buttonContainer, container);

    } else if (id === "10") {
      // Community service gauges
      const gauges = [
        { name: "Planning & Logistics", val: 90, cx: 80, desc: "Planning & Logistics (Score: 90%): Budget coordination, care package supply purchases, and transit tracking." },
        { name: "Volunteer Coord.", val: 95, cx: 200, desc: "Volunteer Management (Score: 95%): Directing task roles, communication guidelines, and schedules for 24 volunteers." },
        { name: "Elder Engagement", val: 100, cx: 320, desc: "Elder Empathy (Score: 100%): Personal aid delivery, afternoon tea service, and acoustic sessions at Sri Lankadhara Society." }
      ];

      gauges.forEach(g => {
        let node = document.createElementNS(svgNS, "g");
        node.setAttribute("class", "svg-interactive-node");

        // Background circle
        let bgCircle = document.createElementNS(svgNS, "circle");
        bgCircle.setAttribute("cx", g.cx); bgCircle.setAttribute("cy", "150");
        bgCircle.setAttribute("r", "40");
        bgCircle.setAttribute("fill", "none");
        bgCircle.setAttribute("stroke", strokeBorder);
        bgCircle.setAttribute("stroke-width", "6");
        node.appendChild(bgCircle);

        // Value circle (arc approximation via dasharray)
        let circVal = document.createElementNS(svgNS, "circle");
        circVal.setAttribute("cx", g.cx); circVal.setAttribute("cy", "150");
        circVal.setAttribute("r", "40");
        circVal.setAttribute("fill", "none");
        circVal.setAttribute("stroke", accentCyan);
        circVal.setAttribute("stroke-width", "6");
        let len = 2 * Math.PI * 40;
        circVal.setAttribute("stroke-dasharray", len);
        circVal.setAttribute("stroke-dashoffset", len * (1 - g.val / 100));
        circVal.setAttribute("transform", `rotate(-90 ${g.cx} 150)`);
        node.appendChild(circVal);

        // Text value
        let valText = document.createElementNS(svgNS, "text");
        valText.setAttribute("x", g.cx); valText.setAttribute("y", "155");
        valText.setAttribute("text-anchor", "middle");
        valText.setAttribute("style", "font-size: 14px; font-weight:700;");
        valText.setAttribute("fill", textMainColor);
        valText.textContent = g.val + "%";
        node.appendChild(valText);

        // Label
        let label = document.createElementNS(svgNS, "text");
        label.setAttribute("x", g.cx); label.setAttribute("y", "215");
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("style", "font-size: 9px; font-weight:600;");
        label.setAttribute("fill", textSubColor);
        label.textContent = g.name;
        node.appendChild(label);

        node.addEventListener("click", () => {
          node.parentElement.querySelectorAll("circle[stroke='" + accentSky + "']").forEach(c => c.setAttribute("stroke", accentCyan));
          circVal.setAttribute("stroke", accentSky);
          updateDetails(g.name, g.desc);
        });

        svg.appendChild(node);
      });
    }

    container.appendChild(svg);
  }

  // Bind side-bar buttons click events to change tabs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lectureId = btn.getAttribute('data-lecture');
      injectLecture(lectureId);
    });
  });

  // Timeline roadmap click redirection to lectures hub
  document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', () => {
      const lectureId = item.getAttribute('data-lecture');

      // Select corresponding tab button
      const targetBtn = document.querySelector(`.lecture-tab-btn[data-lecture="${lectureId}"]`);
      if (targetBtn) {
        tabButtons.forEach(b => b.classList.remove('active'));
        targetBtn.classList.add('active');
        injectLecture(lectureId);
      }

      // Smooth scroll to the lectures section
      const targetSection = document.getElementById('lectures');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Inject initial lecture on load
  injectLecture("1");

  /* ==========================================================================
     5. Skill Progress Bars Animation
     ========================================================================== */
  const skillBarFills = document.querySelectorAll('.skill-bar-fill');

  function animateHomeProgressBars() {
    skillBarFills.forEach(bar => {
      const targetWidth = bar.parentElement.previousElementSibling.querySelector('.skill-val').textContent;
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 150);
    });
  }

  // Growth tracker comparison bars observer
  const growthSection = document.getElementById('growth');
  let growthAnimated = false;

  const growthObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !growthAnimated) {
        growthAnimated = true;
        initGrowthRadarChart();
        selectGrowthCompetency(0);
      }
    });
  }, { threshold: 0.1 });

  if (growthSection) {
    growthObserver.observe(growthSection);
  }

  // Animate landing page elements immediately on DOM load
  setTimeout(() => {
    animateHomeProgressBars();
    initRadarChart();
  }, 100);

  /* ==========================================================================
     6. Dynamic Interactive SVG Radar Chart (Goleman EQ Model)
     ========================================================================== */
  const radarChart = document.getElementById('radarChart');
  const tooltip = document.getElementById('radarTooltip');

  const eqData = [
    { name: 'Self-Awareness', score: 80, desc: 'Understanding emotional cycles and blind spots.' },
    { name: 'Self-Management', score: 90, desc: 'Stress regulation and high adaptability.' },
    { name: 'Social Awareness', score: 85, desc: 'Decoding team environments and non-verbal cues.' },
    { name: 'Relationship Mgmt', score: 90, desc: 'Resolving group conflict and clear presentation.' },
    { name: 'Motivation', score: 95, desc: 'Intrinsic drive and growth mindset.' }
  ];

  const maxRadius = 135;
  const levels = 5;
  const numAxes = eqData.length;

  function initRadarChart() {
    if (!radarChart) return;
    radarChart.innerHTML = ''; // Clear SVG

    // Draw grid concentric levels
    for (let level = levels; level > 0; level--) {
      const radius = (level / levels) * maxRadius;
      const points = [];

      for (let i = 0; i < numAxes; i++) {
        const angle = i * (2 * Math.PI / numAxes) - Math.PI / 2;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        points.push(`${x},${y}`);
      }

      const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.setAttribute('points', points.join(' '));
      polygon.setAttribute('class', 'radar-grid');
      radarChart.appendChild(polygon);
    }

    // Draw axis lines and labels
    for (let i = 0; i < numAxes; i++) {
      const angle = i * (2 * Math.PI / numAxes) - Math.PI / 2;
      const xMax = maxRadius * Math.cos(angle);
      const yMax = maxRadius * Math.sin(angle);

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', '0');
      line.setAttribute('x2', xMax.toString());
      line.setAttribute('y2', yMax.toString());
      line.setAttribute('class', 'radar-grid-line');
      radarChart.appendChild(line);

      // Label text alignment and placement offsets
      const labelOffset = 25;
      const xLabel = (maxRadius + labelOffset) * Math.cos(angle);
      const yLabel = (maxRadius + labelOffset) * Math.sin(angle);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', xLabel.toString());
      text.setAttribute('y', (yLabel + (yLabel > 5 ? 5 : -2)).toString());
      text.setAttribute('class', 'radar-axis-label');
      text.textContent = eqData[i].name;

      text.addEventListener('mouseenter', (e) => showTooltip(e, eqData[i]));
      text.addEventListener('mouseleave', hideTooltip);

      radarChart.appendChild(text);
    }

    // Plot scores polygon area shape
    const dataPoints = [];
    for (let i = 0; i < numAxes; i++) {
      const radius = (eqData[i].score / 100) * maxRadius;
      const angle = i * (2 * Math.PI / numAxes) - Math.PI / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      dataPoints.push(`${x},${y}`);
    }

    const dataArea = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    dataArea.setAttribute('points', dataPoints.join(' '));
    dataArea.setAttribute('class', 'radar-area');
    radarChart.appendChild(dataArea);

    // Plot interactive circular nodes
    for (let i = 0; i < numAxes; i++) {
      const radius = (eqData[i].score / 100) * maxRadius;
      const angle = i * (2 * Math.PI / numAxes) - Math.PI / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      point.setAttribute('cx', x.toString());
      point.setAttribute('cy', y.toString());
      point.setAttribute('r', '6');
      point.setAttribute('class', 'radar-point');

      point.addEventListener('mouseenter', (e) => showTooltip(e, eqData[i]));
      point.addEventListener('mouseleave', hideTooltip);
      point.addEventListener('mousemove', moveTooltip);

      radarChart.appendChild(point);
    }
  }

  // Tooltip positions
  function showTooltip(e, data) {
    tooltip.innerHTML = `
      <div class="radar-tooltip-title">${data.name}</div>
      <div class="radar-tooltip-val">Quotient: ${data.score}%</div>
      <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">${data.desc}</div>
    `;
    tooltip.style.opacity = '1';
    moveTooltip(e);
  }

  function moveTooltip(e) {
    const parentRect = radarChart.parentElement.getBoundingClientRect();
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    let x = e.clientX - parentRect.left - tooltipWidth / 2;
    let y = e.clientY - parentRect.top - tooltipHeight - 15;

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }

  function hideTooltip() {
    tooltip.style.opacity = '0';
  }

  /* ==========================================================================
     7. Dynamic Interactive SVG Growth Radar Chart (Growth Tracker)
     ========================================================================== */
  const growthRadar = document.getElementById('growthRadarChart');
  const growthPlaceholder = document.getElementById('growth-details-placeholder');
  const growthActive = document.getElementById('growth-details-active');
  const compName = document.getElementById('active-comp-name');
  const scoreStart = document.getElementById('comp-score-start');
  const scoreEnd = document.getElementById('comp-score-end');
  const activeBarStart = document.getElementById('active-bar-start');
  const activeBarEnd = document.getElementById('active-bar-end');
  const compBaseline = document.getElementById('active-comp-baseline');
  const compDesc = document.getElementById('active-comp-desc');

  const growthData = [
    {
      name: 'Communication',
      start: 50,
      end: 90,
      baseline: 'Struggled to deliver formal speeches and academic pitches confidently, relying on raw text slides.',
      desc: 'Mastered direct client engagement, clear structured messaging, and dynamic presentation methods across all portfolio presentations.'
    },
    {
      name: 'Emotional Intelligence',
      start: 60,
      end: 85,
      baseline: 'Understood self-motivation but struggled with dynamic group empathy and active listening during crises.',
      desc: 'Applied active listening and dialogue protocols, resolving diabetic diet menu hazards and travel delays in community outreach tasks.'
    },
    {
      name: 'Confidence',
      start: 45,
      end: 90,
      baseline: 'Shy to raise issues or suggestions in team meetings, preferring task execution over design leading.',
      desc: 'Shifted into a proactive technical developer leadership voice, chairing setup operations and project delivery sequences.'
    },
    {
      name: 'Negotiation',
      start: 40,
      end: 80,
      baseline: 'Used yielding or compromising styles in arguments, failing to leverage BATNA options.',
      desc: 'Utilized win-win value alignment principles to settle supplier quotes and balance logistics constraints.'
    },
    {
      name: 'Leadership',
      start: 60,
      end: 95,
      baseline: 'Capable of guiding small codebase sub-teams but inexperienced in running cross-functional campaigns.',
      desc: 'Elected campaign lead for the Sri Lankadhara elders outreach project, coordinating 24 volunteers and budgeting LKR 40,700.'
    },
    {
      name: 'Teamwork',
      start: 70,
      end: 95,
      baseline: 'Focused heavily on individual task completions, leaving group integration to others.',
      desc: 'Instituted clear role charts and feedback channels, syncing setup, logistics, and catering sub-teams seamlessly.'
    },
    {
      name: 'Professionalism',
      start: 50,
      end: 90,
      baseline: 'Lacked exposure to formal corporate etiquette, business dining protocols, and stakeholder speech.',
      desc: 'Learned dining etiquette guidelines, professional attire standards, and ATS scan optimization procedures.'
    },
    {
      name: 'Career Readiness',
      start: 35,
      end: 85,
      baseline: 'Unoptimized CV lacking technical keyword matching or value metrics, with minimal professional networking footprint.',
      desc: 'Created an ATS-optimized CV, updated LinkedIn, and practiced mock behavioral interview techniques.'
    }
  ];

  function initGrowthRadarChart() {
    if (!growthRadar) return;
    growthRadar.innerHTML = ''; // Clear SVG

    const svgNS = 'http://www.w3.org/2000/svg';
    const numAxes = growthData.length;
    const maxRadius = 150;
    const levels = 5;

    // Draw concentric levels (grid)
    for (let level = levels; level > 0; level--) {
      const radius = (level / levels) * maxRadius;
      const points = [];

      for (let i = 0; i < numAxes; i++) {
        const angle = i * (2 * Math.PI / numAxes) - Math.PI / 2;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        points.push(`${x},${y}`);
      }

      const polygon = document.createElementNS(svgNS, 'polygon');
      polygon.setAttribute('points', points.join(' '));
      polygon.setAttribute('class', 'radar-grid');
      growthRadar.appendChild(polygon);
    }

    // Draw axis lines and labels
    for (let i = 0; i < numAxes; i++) {
      const angle = i * (2 * Math.PI / numAxes) - Math.PI / 2;
      const xMax = maxRadius * Math.cos(angle);
      const yMax = maxRadius * Math.sin(angle);

      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', '0');
      line.setAttribute('x2', xMax.toString());
      line.setAttribute('y2', yMax.toString());
      line.setAttribute('class', 'radar-grid-line');
      growthRadar.appendChild(line);

      // Label positioning
      const labelOffset = 30;
      const xLabel = (maxRadius + labelOffset) * Math.cos(angle);
      const yLabel = (maxRadius + labelOffset) * Math.sin(angle);

      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', xLabel.toString());
      const yAdjust = yLabel > 10 ? 8 : (yLabel < -10 ? -2 : 3);
      text.setAttribute('y', (yLabel + yAdjust).toString());
      text.setAttribute('class', 'radar-axis-label');
      text.textContent = growthData[i].name;

      text.addEventListener('click', () => selectGrowthCompetency(i));

      growthRadar.appendChild(text);
    }

    // Plot Starting scores area
    const startPoints = [];
    for (let i = 0; i < numAxes; i++) {
      const radius = (growthData[i].start / 100) * maxRadius;
      const angle = i * (2 * Math.PI / numAxes) - Math.PI / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      startPoints.push(`${x},${y}`);
    }
    const startArea = document.createElementNS(svgNS, 'polygon');
    startArea.setAttribute('points', startPoints.join(' '));
    startArea.setAttribute('class', 'radar-area-start');
    growthRadar.appendChild(startArea);

    // Plot Current scores area
    const endPoints = [];
    for (let i = 0; i < numAxes; i++) {
      const radius = (growthData[i].end / 100) * maxRadius;
      const angle = i * (2 * Math.PI / numAxes) - Math.PI / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      endPoints.push(`${x},${y}`);
    }
    const endArea = document.createElementNS(svgNS, 'polygon');
    endArea.setAttribute('points', endPoints.join(' '));
    endArea.setAttribute('class', 'radar-area-end');
    growthRadar.appendChild(endArea);

    // Plot Starting nodes
    for (let i = 0; i < numAxes; i++) {
      const radius = (growthData[i].start / 100) * maxRadius;
      const angle = i * (2 * Math.PI / numAxes) - Math.PI / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', x.toString());
      circle.setAttribute('cy', y.toString());
      circle.setAttribute('r', '4');
      circle.setAttribute('class', 'radar-point-start');
      circle.setAttribute('title', `${growthData[i].name} (Start): ${growthData[i].start}%`);
      circle.addEventListener('click', () => selectGrowthCompetency(i));
      growthRadar.appendChild(circle);
    }

    // Plot Current nodes
    for (let i = 0; i < numAxes; i++) {
      const radius = (growthData[i].end / 100) * maxRadius;
      const angle = i * (2 * Math.PI / numAxes) - Math.PI / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', x.toString());
      circle.setAttribute('cy', y.toString());
      circle.setAttribute('r', '5.5');
      circle.setAttribute('class', 'radar-point-end');
      circle.setAttribute('title', `${growthData[i].name} (Current): ${growthData[i].end}%`);
      circle.addEventListener('click', () => selectGrowthCompetency(i));
      growthRadar.appendChild(circle);
    }
  }

  window.initGrowthRadarChart = initGrowthRadarChart;
  window.selectGrowthCompetency = selectGrowthCompetency;

  function selectGrowthCompetency(index) {
    const data = growthData[index];
    if (!data) return;

    if (growthPlaceholder) growthPlaceholder.style.display = 'none';
    if (growthActive) growthActive.style.display = 'flex';

    compName.textContent = data.name + ' Growth';
    scoreStart.textContent = data.start + '%';
    scoreEnd.textContent = data.end + '%';
    compBaseline.textContent = data.baseline;
    compDesc.textContent = data.desc;

    // Reset bar animations
    activeBarStart.style.width = '0%';
    activeBarEnd.style.width = '0%';

    // Trigger animation
    setTimeout(() => {
      activeBarStart.style.width = data.start + '%';
      activeBarEnd.style.width = data.end + '%';
    }, 50);

    // Highlight labels
    const labels = growthRadar.querySelectorAll('.radar-axis-label');
    labels.forEach((lbl, idx) => {
      if (idx === index) {
        lbl.classList.add('active');
        lbl.style.fill = 'var(--accent-cyan)';
        lbl.style.fontWeight = '700';
      } else {
        lbl.classList.remove('active');
        lbl.style.fill = '';
        lbl.style.fontWeight = '';
      }
    });
  }

  // CV Modal logic
  const cvModal = document.getElementById('cv-modal');
  const closeModal = document.querySelector('.close-modal');

  function openCVModal() {
    if (cvModal) {
      cvModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCVModalFunc() {
    if (cvModal) {
      cvModal.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  }

  if (closeModal) {
    closeModal.addEventListener('click', closeCVModalFunc);
  }

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        closeCVModalFunc();
      }
    });
  }

  // Event delegation to catch clicks on any open-cv-btn (including dynamic ones)
  document.addEventListener('click', (e) => {
    if (e.target.closest('.open-cv-btn')) {
      openCVModal();
    }
  });

});
