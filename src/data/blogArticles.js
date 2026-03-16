const paragraph = (text) => ({ type: 'paragraph', text });
const list = (items) => ({ type: 'list', items });
const code = (language, snippet, caption) => ({ type: 'code', language, snippet, caption });

const estimateReadingTime = (sections) => {
  const words = sections.reduce((count, section) => (
    count + section.blocks.reduce((blockCount, block) => {
      if (block.type === 'list') return blockCount + block.items.join(' ').split(/\s+/).filter(Boolean).length;
      if (block.type === 'code') return blockCount + Math.ceil(block.snippet.split(/\s+/).filter(Boolean).length * 0.35);
      return blockCount + block.text.split(/\s+/).filter(Boolean).length;
    }, 0)
  ), 0);

  return `${Math.max(3, Math.ceil(words / 180))} min read`;
};

const rawBlogArticles = [
  {
    slug: 'how-i-built-my-portfolio-website-from-scratch',
    cardLabel: 'Frontend',
    title: 'How I Built My Portfolio Website from Scratch',
    date: 'March 16, 2026',
    excerpt: 'A grounded breakdown of how I planned, built, refined, and deployed my portfolio using the same structure and tools found in this repository.',
    thumbnailImage: `${process.env.PUBLIC_URL}/carla-joves-portfolio-homepage.png`,
    articleImage: `${process.env.PUBLIC_URL}/carla-joves-portfolio-homepage.png`,
    tags: ['Portfolio', 'React', 'Frontend', 'Case Study'],
    sections: [
      {
        id: 'why-i-decided-to-build-it',
        title: 'Why I Decided to Build It',
        blocks: [
          paragraph('I built this portfolio because I wanted one place that could show more than finished screenshots. I wanted it to communicate how I think, how I structure information, and how I move from design ideas into real frontend implementation. A portfolio can easily become a gallery with no depth, and I did not want that. I wanted the site itself to become part of the proof.'),
          paragraph('That decision shaped everything that followed. Instead of making a single landing page with a short introduction and a few links, I built a full single-page experience with dedicated sections for Home, About, Projects, Blog, and Contact. Each section has a specific purpose. Home creates the first impression. About adds credibility. Projects shows the work in more detail. Blog adds reflection and context. Contact makes it easy to continue the conversation. That structure gave me a stronger foundation than designing section by section without a plan.'),
          paragraph('One thing I am more aware of in 2026 is that people respond to clarity and trust signals faster than they respond to decoration alone. Because of that, I tried to make this site feel intentional, not just stylish. The content hierarchy, project data structure, contact flow, and even the certifications section all had to support that goal.')
        ]
      },
      {
        id: 'how-i-planned-the-layout',
        title: 'How I Planned the Layout',
        blocks: [
          paragraph('I started by thinking about sequence before visuals. I asked myself what a recruiter, collaborator, or client would need to understand in the first few seconds. That led to a clear progression: introduction first, supporting context second, proof of work third, written thinking fourth, and contact last. Once that content map was clear, layout decisions became easier because every section already had a job.'),
          list([
            'Home introduces my role, visual style, and featured work.',
            'About expands into skills, credentials, and direction.',
            'Projects acts like a case-study space instead of a flat gallery.',
            'Blog gives room for technical notes, process, and reflection.',
            'Contact keeps the next step practical with links and a working form.'
          ]),
          code('jsx', `return (
  <>
    <GlobalBackground />
    <Header />
    <div className="app-content-shell single-page">
      <Home />
      <About />
      <Projects />
      <Blog />
      <Contact />
    </div>
    <Footer />
  </>
);`, 'The full portfolio is composed as one continuous experience inside App.js.'),
          paragraph('Planning the site this way also helped me avoid a common mistake: overdesigning one section while the rest of the experience stayed weak. Once the structure was stable, I could experiment more safely with visuals, animation, and interaction. That balance made the project feel more complete and more maintainable.')
        ]
      },
      {
        id: 'tools-features-and-implementation',
        title: 'Tools, Features, and Implementation',
        blocks: [
          paragraph('This portfolio runs on React with react-scripts, and most of the UI is handled with custom CSS instead of a component framework. I chose that approach because I wanted more control over the rhythm of the interface. The site also uses Netlify for deployment and a Netlify function with Resend for the contact form. That gave me a setup that is mostly static, but still practical for real communication.'),
          paragraph('A few features matter more to me than flashy effects. The project section uses a sticky storytelling layout. Shared project data keeps descriptions, technologies, and screenshots aligned across sections. Project details open in a modal instead of forcing a route change. The blog section uses a horizontal card carousel so the content feels more editorial than list-like. Even the certification section was structured to make trust signals easier to scan.'),
          code('toml', `[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "build"`, 'Netlify handles the production build and the serverless contact function from the same repository.'),
          paragraph('I also wanted practical trust signals built into the project rather than added as marketing language. That is why the site includes real project links, dated credentials, a functioning contact pipeline, section-specific metadata, and blog posts grounded in the actual repository rather than generic advice.')
        ]
      },
      {
        id: 'challenges-and-what-i-learned',
        title: 'Challenges and What I Learned',
        blocks: [
          paragraph('The hardest part was not writing the first version. It was refining the site after the structure started growing. Once projects had screenshots, modals, shared data, and different display contexts, consistency became more important than speed. I had to keep checking that the same project content still made sense in the home section, the projects section, and the modal. That kind of maintenance work is not glamorous, but it is where a lot of real frontend thinking happens.'),
          paragraph('I also learned that good design decisions become easier to defend when the implementation is clean. If the content model is organized, the layout is easier to improve. If the build process is reliable, deployment feels calmer. If the interaction patterns are intentional, motion feels helpful instead of distracting. The portfolio taught me that trust on the web is built through details: working links, thoughtful hierarchy, stable behavior, and honest writing.'),
          paragraph('If I keep evolving this site, I want to strengthen it in the same way: not by making it louder, but by making it clearer, more useful, and more representative of how I actually work.')
        ]
      }
    ]
  },
  {
    slug: 'designing-a-modern-developer-portfolio-ui',
    cardLabel: 'Design',
    title: 'Designing a Modern Developer Portfolio UI',
    date: 'March 14, 2026',
    excerpt: 'A practical look at the design decisions behind the portfolio, from hierarchy and type to responsiveness and perceived trust.',
    thumbnailImage: `${process.env.PUBLIC_URL}/carla-joves-ui-ux-wireframe-portfolio.webp`,
    articleImage: `${process.env.PUBLIC_URL}/carla-joves-ui-ux-wireframe-portfolio.webp`,
    tags: ['UI Design', 'Portfolio', 'Visual System', 'Responsive'],
    sections: [
      {
        id: 'what-makes-a-portfolio-effective',
        title: 'What Makes a Portfolio Effective',
        blocks: [
          paragraph('A portfolio is most effective when it removes uncertainty quickly. The person visiting it should not have to work hard to figure out who I am, what I make, what I know, and how to contact me. That sounds simple, but a lot of portfolios become visually impressive while still leaving basic questions unanswered. I wanted to avoid that.'),
          paragraph('For me, that meant the UI had to support trust, not just taste. The page needed clear section boundaries, readable type, strong spacing, and enough visual contrast to make scanning easy. I wanted the site to feel polished, but also calm. In 2026, good design is not just about looking modern. It is also about feeling dependable, readable, and clearly maintained.'),
          paragraph('That is why I think of the UI here as a communication system first. The goal was not only to impress, but to guide. Every section needed a purpose, every call to action needed context, and every visual decision needed to support clarity instead of competing with it.')
        ]
      },
      {
        id: 'structuring-the-experience',
        title: 'Structuring the Experience',
        blocks: [
          paragraph('The structure of the site follows the logic of how people evaluate work. First comes identity. Then context. Then proof. Then reflection. Then contact. That sequence became the foundation of the interface, and it helped me make design decisions more confidently because I was not styling random sections in isolation.'),
          list([
            'Hero creates the first impression and tone.',
            'About adds skill, direction, and credibility.',
            'Projects becomes the strongest proof layer.',
            'Blog adds voice, reflection, and technical thinking.',
            'Contact turns interest into action.'
          ]),
          paragraph('I also wanted different sections to feel distinct without making the site feel disconnected. That is where rhythm mattered. Some sections are more immersive and atmospheric. Others are quieter and more content-heavy. As long as the hierarchy, typography, and spacing stay consistent, the whole site can still feel like one product.')
        ]
      },
      {
        id: 'palette-type-and-mobile-thinking',
        title: 'Palette, Type, and Mobile Thinking',
        blocks: [
          paragraph('I chose a warm neutral palette with gold accents because it felt more personal and more editorial than a colder default portfolio aesthetic. It also supported the blend I wanted between design thinking and frontend execution. The colors are soft enough to feel inviting, but still give enough contrast for section titles, labels, and calls to action.'),
          paragraph('Typography carries a lot of identity here. Sora keeps the interface readable and modern, while Playfair Display gives the headings more confidence and character. That pairing helps the site feel less generic without hurting clarity. I like using type this way because it adds mood without needing extra visual noise.'),
          paragraph('Mobile responsiveness influenced these decisions from the beginning. A strong layout on desktop can still fail badly if it becomes cramped or awkward on smaller screens. I kept checking whether the same hierarchy still worked when content stacked vertically, whether buttons still felt tappable, and whether cards still had enough breathing room. That kind of responsive review is part of design quality, not an afterthought.')
        ]
      },
      {
        id: 'how-eeat-shows-up-in-ui',
        title: 'How E-E-A-T Shows Up in the UI',
        blocks: [
          paragraph('What people call E-E-A-T often gets discussed as a content strategy topic, but it also shows up in interface design. Experience appears when a site feels considered rather than improvised. Expertise appears when the structure reflects real priorities instead of random sections. Authority grows when project details, credentials, and writing all support the same story. Trust grows when the interface feels maintained and the actions behave exactly as expected.'),
          paragraph('That is why I cared about things like real project links, consistent naming, dated credentials, readable layouts, and a working contact form. Those choices may feel small, but they shape how believable the whole portfolio feels. People do not experience trust as a single feature. They experience it as the sum of many small, quiet signals.'),
          paragraph('For me, designing this UI was not about chasing a trendy look. It was about building an experience that feels human, credible, and easy to trust at first glance and on deeper review.')
        ]
      }
    ]
  },
  {
    slug: 'how-i-implemented-a-project-showcase-section',
    cardLabel: 'Projects',
    title: 'How I Implemented a Project Showcase Section',
    date: 'March 12, 2026',
    excerpt: 'A closer look at the sticky project layout, screenshot handling, preview behavior, and the choices that made it feel more like a case study.',
    thumbnailImage: `${process.env.PUBLIC_URL}/carla-joves-wander-project-portfolio.png`,
    articleImage: `${process.env.PUBLIC_URL}/carla-joves-wander-project-portfolio.png`,
    tags: ['Projects', 'Frontend', 'React', 'Interaction Design'],
    sections: [
      {
        id: 'what-i-wanted-the-section-to-do',
        title: 'What I Wanted the Section to Do',
        blocks: [
          paragraph('I never wanted the project section to feel like a generic row of cards where everything looked equally important. My goal was to create a showcase that gave each project a little more presence. I wanted visitors to spend enough time with the content to understand what the project was, why it mattered, and what kind of work it represented.'),
          paragraph('That is why the section became more editorial. Instead of putting all the information inside repeating thumbnail cards, I separated the descriptive copy from the image previews. That gave the content room to breathe and helped the visuals act like supporting evidence rather than decoration.')
        ]
      },
      {
        id: 'how-the-layout-works',
        title: 'How the Layout Works',
        blocks: [
          paragraph('On desktop, the section uses a sticky shell with two columns. The left side holds the active project description, technologies, screenshots, and links. The right side holds the preview rail. As the user scrolls the preview area, the active project index updates and the copy column responds. That makes the whole section feel more intentional than a normal static layout.'),
          code('js', `const [selectedScreenshots, setSelectedScreenshots] = useState(() =>
  Object.fromEntries(projects.map((project) => [project.id, 0]))
);

const activeProject = projects[activeProjectIndex] ?? projects[0];
const selectedScreenshotIndex = selectedScreenshots[activeProject.id] ?? 0;`, 'The section preserves screenshot state per project instead of treating every image swap as a one-off interaction.'),
          paragraph('That structure also helped me keep the project section aligned with the rest of the portfolio. The user can read the narrative without losing the visual context, and the screenshots still feel interactive rather than static.')
        ]
      },
      {
        id: 'working-with-images-and-responsiveness',
        title: 'Working with Images and Responsiveness',
        blocks: [
          paragraph('Image handling turned out to be one of the most difficult parts. Some screenshots are tall, some are wide, and not every project image behaves the same way inside a fixed card. At first, that sounds like a visual issue, but it becomes a product issue quickly because poor image treatment can make the work look less polished than it actually is.'),
          paragraph('To manage that better, I moved project content into shared data so screenshots, technologies, and links could stay aligned across sections. I also used a small image utility for cases that needed special treatment. That was a much better solution than scattering project-specific fixes across multiple components.'),
          paragraph('On mobile, the layout changes completely. I did not try to force the desktop sticky interaction onto small screens because it would have felt heavy and less usable. Instead, the section becomes a stacked list of project entries with previews, supporting text, and screenshots. Keeping the interaction lighter on mobile made the section feel more respectful of the device instead of simply compressed.')
        ]
      },
      {
        id: 'what-this-taught-me-about-ux',
        title: 'What This Taught Me About UX',
        blocks: [
          paragraph('The biggest lesson was that project presentation is really about reducing friction. Visitors should not have to guess what a project is, where to click, or why a screenshot matters. If the section gives them a clear summary, visible technologies, a few strong screenshots, and direct links, it becomes much easier to trust what they are seeing.'),
          paragraph('This is one of the places where E-E-A-T becomes practical. Experience shows in the specificity of the content. Expertise shows in how the interface handles state and responsiveness. Authority grows when the project details are consistent. Trust improves when the user can inspect real outputs instead of vague descriptions.'),
          paragraph('That is why I like this section. It is not just there to look good. It works like a guided explanation of the work.')
        ]
      }
    ]
  },
  {
    slug: 'deploying-my-website-using-modern-hosting-platforms',
    cardLabel: 'Hosting',
    title: 'Deploying My Website Using Modern Hosting Platforms',
    date: 'March 10, 2026',
    excerpt: 'How I prepared this portfolio for deployment, why Netlify fits the workflow, and what I learned from thinking beyond local development.',
    thumbnailImage: `${process.env.PUBLIC_URL}/carla-joves-netlify-deployment-portfolio.png`,
    articleImage: `${process.env.PUBLIC_URL}/carla-joves-netlify-deployment-portfolio.png`,
    tags: ['Deployment', 'Netlify', 'GitHub', 'Serverless'],
    sections: [
      {
        id: 'preparing-the-project-for-deployment',
        title: 'Preparing the Project for Deployment',
        blocks: [
          paragraph('A site does not feel real to me until it can build reliably and be deployed without confusion. That mindset changed how I think about development. Local work matters, but deployment is where a project proves whether it is actually maintainable. For this portfolio, I wanted a workflow where content, code, and updates could move through one clean release path.'),
          paragraph('That meant the project needed a predictable production build, clear public assets, and a structure that would not fall apart once it left the local environment. I leaned on the standard build flow from react-scripts because it gave me a stable baseline without adding unnecessary complexity at this stage.')
        ]
      },
      {
        id: 'github-and-automation',
        title: 'GitHub and Automatic Deployments',
        blocks: [
          paragraph('A Git-based workflow fits portfolio work especially well because every push is both a record and a release candidate. It turns progress into a visible sequence of decisions rather than a pile of local edits. That matters to me because this portfolio changes often. Projects get updated, credentials get added, blog posts evolve, and the UI keeps improving.'),
          paragraph('When deployment is connected to the repository, those changes move through a consistent path. That creates a quieter kind of trust. I know the same process is being used every time, and anyone reviewing the project can see that it is maintained through real versioned work rather than random manual updates.')
        ]
      },
      {
        id: 'why-netlify-made-sense',
        title: 'Why Netlify Made Sense for This Site',
        blocks: [
          paragraph('Netlify fits this project because it handles the two things I need most right now: static frontend deployment and simple serverless support. The portfolio is mostly content and interface work, but the contact form still needs real backend behavior. Netlify lets me keep those concerns inside one workflow instead of splitting the site into separate systems too early.'),
          code('toml', `[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "build"`, 'The hosting config keeps the frontend output and the serverless function in the same deployment setup.'),
          code('js', `const response = await fetch('/.netlify/functions/send-contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, subject, message })
});`, 'The contact form posts to a function instead of exposing email logic directly in the browser.'),
          paragraph('That arrangement also supports a better trust story. A visitor is not just looking at a visual shell. The site actually supports a working inquiry flow, which makes the portfolio feel more complete and more credible.')
        ]
      },
      {
        id: 'troubleshooting-and-trust',
        title: 'Troubleshooting and the Trust Side of Deployment',
        blocks: [
          paragraph('The most common deployment problems are usually simple ones: missing environment variables, incorrect asset paths, function configuration mistakes, or production behavior that was not tested carefully enough. Because of that, I treat production builds as part of the development process, not just the final step. Running a build after meaningful changes is one of the easiest habits that improves confidence.'),
          paragraph('This also ties back to E-E-A-T in a practical way. Experience shows when deployment decisions reflect real maintenance needs. Expertise shows when hosting, environment variables, and frontend behavior line up cleanly. Trust grows when a site behaves consistently outside the local machine.'),
          paragraph('For me, deployment is not only technical. It is part of how a project proves it is ready to be seen.')
        ]
      }
    ]
  },
  {
    slug: 'cybersecurity-basics-every-web-developer-should-know',
    cardLabel: 'Security',
    title: 'Cybersecurity Basics Every Web Developer Should Know',
    date: 'March 8, 2026',
    excerpt: 'A practical security-focused post grounded in the validation, sanitization, and deployment choices already present in this portfolio project.',
    thumbnailImage: `${process.env.PUBLIC_URL}/carla-joves-cybersecurity-portfolio.webp`,
    articleImage: `${process.env.PUBLIC_URL}/carla-joves-cybersecurity-portfolio.webp`,
    tags: ['Cybersecurity', 'Validation', 'Frontend', 'Backend Basics'],
    sections: [
      {
        id: 'why-security-matters-for-developers',
        title: 'Why Security Matters for Developers',
        blocks: [
          paragraph('One of the easiest mistakes a developer can make is treating security as something separate from normal implementation. In reality, it starts with ordinary choices: how we validate input, where we store secrets, whether we trust the client too much, and whether we handle user data carefully. Even a small portfolio with a contact form can create risk if those details are ignored.'),
          paragraph('I think this matters even more in 2026 because trust online is more fragile. People are more aware of phishing, spam, fake forms, and careless handling of personal information. That means developers need to build interfaces that are not only polished, but also responsible. Security is part of credibility now.')
        ]
      },
      {
        id: 'the-risks-that-show-up-often',
        title: 'The Risks That Show Up Often',
        blocks: [
          paragraph('For many frontend and small full-stack projects, the most common issues are not exotic attacks. They are normal mistakes repeated in enough places to become dangerous. Unsanitized input, weak validation, leaked secrets, missing HTTPS, and client-only assumptions are all common because they feel small during development.'),
          list([
            'Unsafe input can break logic or inject malicious content.',
            'Output that is not escaped can create XSS problems.',
            'Secrets committed to frontend code become public immediately.',
            'Client-only checks are not real protection.',
            'Weak deployment habits can expose forms and APIs to avoidable abuse.'
          ]),
          paragraph('The reason these matter is simple: real users do not experience security as a technical checklist. They experience it as whether a site feels safe, trustworthy, and stable.')
        ]
      },
      {
        id: 'what-this-portfolio-already-does',
        title: 'What This Portfolio Already Does',
        blocks: [
          paragraph('This portfolio already includes a few security-minded choices that I think are worth keeping visible. The contact form trims input, validates email format, blocks some obvious typo domains, and sends requests through a Netlify function instead of pushing email logic directly into the frontend. On the function side, values are escaped before they are used in generated HTML email output.'),
          code('js', `if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
  return {
    statusCode: 400,
    body: JSON.stringify({ error: 'Please complete all required fields.' })
  };
}`, 'Basic validation is not glamorous, but it prevents a surprising amount of trouble.'),
          code('js', `function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}`, 'Escaping output matters whenever user-controlled content is inserted into generated markup.'),
          paragraph('These are not advanced security systems, and I do not want to pretend they are. But they are practical steps, and practical steps are exactly what many projects are missing.')
        ]
      },
      {
        id: 'how-i-think-about-security-now',
        title: 'How I Think About Security Now',
        blocks: [
          paragraph('The biggest mindset shift for me is that security is not separate from user experience. A trustworthy product validates responsibly, stores sensitive values in the right place, uses HTTPS, and avoids exposing more than it needs to expose. Those are product decisions as much as technical ones.'),
          paragraph('This is also where E-E-A-T becomes useful in a grounded way. Experience means understanding where real mistakes happen. Expertise means knowing how to reduce those risks through implementation. Authority grows when security choices are visible in the structure of the app. Trust is what the user feels when the site behaves responsibly.'),
          paragraph('I am still learning, but that is exactly why I take security basics seriously. Strong habits built early are easier to scale than panic-driven fixes added too late.')
        ]
      }
    ]
  },
  {
    slug: 'lessons-i-learned-from-building-real-projects',
    cardLabel: 'Growth',
    title: 'Lessons I Learned from Building Real Projects',
    date: 'March 6, 2026',
    excerpt: 'A more personal reflection on mistakes, debugging, documentation, and the habits that helped me improve through real work.',
    thumbnailImage: `${process.env.PUBLIC_URL}/carla-joves-public-speaking.jpg`,
    articleImage: `${process.env.PUBLIC_URL}/carla-joves-public-speaking.jpg`,
    tags: ['Lessons', 'Growth', 'Workflow', 'Developer Journey'],
    sections: [
      {
        id: 'the-mistakes-that-stayed-with-me',
        title: 'The Mistakes That Stayed With Me',
        blocks: [
          paragraph('One of the biggest lessons I learned from real projects is that polish can hide weak thinking. I used to feel relieved once a screen looked finished, but real work kept teaching me that visual completion does not mean structural completion. A feature can look great and still contain duplicated data, awkward state handling, or unclear content that becomes a problem later.'),
          paragraph('That happened to me more than once while improving this portfolio. Project content appeared in multiple places. Images behaved differently depending on context. Small UI decisions that looked harmless started creating maintenance friction. Those moments were frustrating, but they were also honest. They showed me exactly where my habits still needed to grow.')
        ]
      },
      {
        id: 'debugging-and-learning-under-pressure',
        title: 'Debugging and Learning Under Pressure',
        blocks: [
          paragraph('The hardest bugs were not dramatic crashes. They were usually mismatches between data, layout, and expectation. Something might look correct in one section but feel inconsistent in another. A modal might work visually while still using the wrong source content. A responsive layout might technically fit while still feeling clumsy.'),
          paragraph('What helped me most was changing how I debug. I try to trace the problem in order now: data first, layout second, visuals last. That keeps me from wasting time styling around the symptom instead of fixing the source. I also learned to trust slower debugging. Rushing usually created more noise than progress.')
        ]
      },
      {
        id: 'tools-documentation-and-growth',
        title: 'Tools, Documentation, and Growth',
        blocks: [
          paragraph('Real projects also changed how I think about tools. React, Git, Figma, Netlify functions, and even simple shared data files started making much more sense once they were solving actual problems instead of being isolated concepts. I think that is why project-based learning stays with me more than abstract tutorials.'),
          code('js', `const projectsById = Object.fromEntries(
  projects.map((project) => [project.id, project])
);`, 'Small patterns like this reduced repeated edits and made the content model easier to maintain.'),
          paragraph('Documentation became more important too. I do not mean formal documentation only. I mean naming things clearly, keeping content centralized, running builds after meaningful changes, and making sure the project tells the truth about itself. Those habits are not flashy, but they reduce confusion and make future work easier.')
        ]
      },
      {
        id: 'the-advice-i-would-give-now',
        title: 'The Advice I Would Give Now',
        blocks: [
          paragraph('If I were giving advice to someone starting out, I would say this: build real things early, and let those projects expose your weak spots. It is much better to discover where your structure is weak, where your debugging is shaky, or where your communication is vague while working on something real than to stay comfortable in endless preparation.'),
          paragraph('I would also say: do not wait until you feel fully ready to claim ownership of your work. Real growth happens when you finish imperfect projects, reflect on them honestly, and improve the next version with more care. That is how I have learned the most.'),
          paragraph('What I appreciate most now is that real projects do not just show what I can build. They show how I respond when something is incomplete, messy, or harder than expected. That response is where a lot of professional growth really happens.')
        ]
      }
    ]
  }
];

const blogArticles = rawBlogArticles.map((article) => ({
  ...article,
  readingTime: estimateReadingTime(article.sections)
}));

export { blogArticles };
