# Voicee - AI-Powered Interview Practice Platform

An intelligent platform that helps job seekers practice interviews using AI-powered voice interactions and receive detailed feedback to improve their performance.

## 🚀 Features

- **AI Voice Interviews**: Practice with an AI interviewer using real-time voice interaction
- **Personalized Questions**: Generate custom interview questions based on role, experience level, and tech stack
- **Detailed Feedback**: Receive comprehensive analysis with scores across multiple categories
- **Authentication**: Secure user authentication with Firebase
- **Interview History**: Track your progress and review past interview performances
- **Tech Stack Visualization**: Display technology icons for interview focus areas

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend & AI
- **Firebase** - Authentication and Firestore database
- **Google AI (Gemini)** - Question generation and feedback analysis
- **Vapi AI** - Voice interaction and speech processing

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide Icons** - Icon library
- **Sonner** - Toast notifications
- **Next Themes** - Theme management

## 📁 Project Structure

```
voicee/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (root)/            # Main application pages
│   │   ├── interview/     # Interview-related pages
│   │   └── page.tsx       # Dashboard
│   ├── api/               # API routes
│   │   └── vapi/          # Vapi integration endpoints
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI component library
│   ├── Agent.tsx         # Voice interaction component
│   ├── AuthForm.tsx      # Authentication forms
│   └── InterviewCard.tsx # Interview display cards
├── constants/            # Application constants
├── firebase/             # Firebase configuration
├── lib/                  # Utility functions and actions
│   ├── actions/          # Server actions
│   └── utils.ts          # Helper functions
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Firebase project
- Vapi AI account
- Google AI API access

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key

# Vapi AI
NEXT_PUBLIC_VAPI_WEB_TOKEN=your-vapi-web-token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your-workflow-id

# Google AI
GOOGLE_AI_API_KEY=your-google-ai-key
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd voicee
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up Firebase:
   - Create a Firebase project
   - Enable Authentication and Firestore
   - Add your Firebase configuration

4. Configure Vapi AI:
   - Sign up for Vapi AI
   - Create a voice assistant
   - Get your API tokens

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Core Features Explained

### 1. Voice Interview System
The [`Agent`](components/Agent.tsx) component handles real-time voice interactions:
- Connects to Vapi AI for speech processing
- Manages call states (inactive, connecting, active, finished)
- Records conversation transcripts
- Handles different interview types (generate vs. interview)

### 2. AI Question Generation
The [`/api/vapi/generate`](app/api/vapi/generate/route.ts) endpoint:
- Uses Google's Gemini AI to generate interview questions
- Customizes questions based on role, level, and tech stack
- Stores generated interviews in Firestore

### 3. Feedback Analysis
The [`createFeedback`](lib/actions/general.action.ts) function:
- Analyzes interview transcripts using AI
- Provides scores across 5 categories:
  - Communication Skills
  - Technical Knowledge
  - Problem Solving
  - Cultural Fit
  - Confidence and Clarity
- Generates personalized improvement suggestions

### 4. Authentication System
Firebase Authentication with custom session management:
- [`signUp`](lib/actions/auth.action.ts) - User registration
- [`signInParams`](lib/actions/auth.action.ts) - User login
- [`getCurrentUser`](lib/actions/auth.action.ts) - Session verification

## 🎨 UI Components

The project uses a custom design system built on Radix UI:

- **Forms**: [`FormField`](components/FormField.tsx) with validation
- **Buttons**: Styled variants in [`Button`](components/ui/button.tsx)
- **Cards**: Interview cards and feedback displays
- **Icons**: Tech stack visualization with [`DisplayTechIcons`](components/DisplayTechIcons.tsx)

## 📊 Data Models

### Interview Interface
```typescript
interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
}
```

### Feedback Interface
```typescript
interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎨 Styling

The project uses a custom design system with:
- **Color Palette**: Primary, secondary, success, and destructive variants
- **Custom Utilities**: Gradients, layouts, and animations
- **Dark Theme**: Default dark mode with theme switching capability
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## 🔐 Security Features

- Server-side authentication verification
- Protected routes with middleware
- Session-based authentication with Firebase Admin
- Input validation with Zod schemas
- CSRF protection with secure cookies

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support, email [your-email] or create an issue in the repository.

## 🙏 Acknowledgments

- [Vapi AI](https://vapi.ai) for voice processing capabilities
- [Google AI](https://ai.google.dev) for intelligent question generation
- [Firebase](https://firebase.google.com) for backend services
- [Radix UI](https://radix-ui.com) for accessible components