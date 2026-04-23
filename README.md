#Portfolio

A stunning, interactive, and responsive portfolio designed for modern web developers. Built with Next.js, Tailwind CSS, Three.js, and Framer Motion. This portfolio focuses on dynamic visual aesthetics, smooth animations, and providing a premium user experience.

## ✨ Features

- **Dark Theme Aesthetics**: Premium "Clouded Stone" custom dark theme with true black backgrounds.
- **Interactive 3D Elements**: Integration of Three.js via `@react-three/fiber` and `@react-three/drei` for engaging 3D visuals.
- **Physics-Based UI**: Interactive tech stack elements using `@react-three/rapier` for realistic 3D collision physics.
- **Dynamic Animations**: Smooth scroll animations, hover effects, and entrance animations powered by Framer Motion.
- **Bento Grid Layout**: A modern, asymmetrical grid layout to showcase skills, tech stack, and background.
- **EmailJS Integration**: Fully functional "Send Query" popup that delivers messages directly to your inbox without a backend.
- **Fully Responsive**: Optimized for mobile, tablet, and desktop viewing experiences.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Physics**: [@react-three/rapier](https://github.com/pmndrs/react-three-rapier)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Email Service**: [EmailJS](https://www.emailjs.com/)

## 🚀 Getting Started

First, clone the repository and install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Setup

If you wish to use the EmailJS functionality, ensure you replace the `service_id`, `template_id`, and `publicKey` in `components/ui/QueryPopup.tsx` with your own credentials from [EmailJS](https://www.emailjs.com/).

### Running Locally

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/app`: Next.js app router files, global CSS, and main layout.
- `/components`: Reusable UI components (Hero, Grid, Projects, Experience, Footer).
- `/components/ui`: Granular UI components, animated wrappers, and 3D scenes.
- `/data`: Centralized data file (`index.ts`) containing copy, project info, and static content.
- `/public`: Static assets (images, SVGs).

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
