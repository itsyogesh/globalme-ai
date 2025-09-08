# Global Me AI

Global Me AI is an application for creative self-expression, allowing users to transform a single selfie into a multitude of artistic and cultural personas. This is an experiment to unravel the unique capabilities of Google's Gemini API for realistic, context-aware image generation.

![Global Me AI Screenshot](https://raw.githubusercontent.com/itsyogesh/globalme-ai/main/public/screenshot.png)

## ✨ Key Features

-   **AI-Powered Portraits**: Upload a selfie and see yourself reimagined as if you were from dozens of different countries.
-   **Dynamic Gallery**: Your generated portraits appear in a clean, responsive gallery.
-   **Country Detection**: Automatically suggests your origin country based on your location for a smoother UX.
-   **Light & Dark Mode**: A sleek, modern UI that adapts to your system's theme preference.
-   **Responsive Design**: A seamless experience across desktop, tablet, and mobile devices.

## 🚀 Technology Stack

-   **Frontend**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
-   **AI Model**: [Google Gemini 2.5 Flash Image](https://deepmind.google/technologies/gemini/) for image generation.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a utility-first approach.
-   **Icons**: [Lucide React](https://lucide.dev/) for a clean and consistent icon set.

## 🛠️ Getting Started & Local Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   You need a Google Gemini API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/itsyogesh/globalme-ai.git
    cd globalme-ai
    ```
2.  **Set up your environment variables:**
    The application loads the Gemini API key from the environment. You will need to ensure that `process.env.API_KEY` is available in the execution context where you run the application. The method for this will depend on your local development server or hosting environment.

    For example, if using a tool like Vite, you would create a `.env.local` file in the project root:
    ```
    VITE_API_KEY=YOUR_GEMINI_API_KEY
    ```
    And then reference it in your code as `import.meta.env.VITE_API_KEY`. Since this project is set up without a build step, you may need to run it in an environment that injects this variable for you.

3.  **Open `index.html` in your browser:**
    You can use a simple local server or an extension like Live Server in VS Code to serve the project.

## 🏗️ Project Architecture

The application is designed with a modern, component-based frontend architecture.

-   **`components/`**: Contains reusable UI components like `ImageCard`, `Header`, `Footer`, and `Modals`. This keeps the UI modular and easy to manage.
-   **`pages/`**: Holds the main page components. `HomePage.tsx` is the primary view, managing the application's state and logic.
-   **`services/`**: Includes modules that interact with external APIs. `geminiService.ts` handles all the logic for communicating with the Google Gemini API, including formatting prompts and processing responses.
-   **`contexts/`**: Manages global state using React's Context API. This is used for theme management (`ThemeContext`) and user authentication (`AuthContext`).
-   **`hooks/`**: Custom hooks like `useTheme` and `useAuth` provide easy access to context values within components.
-   **`constants.ts`**: Stores static data used throughout the application, such as the list of available countries.

The core functionality revolves around the `HomePage` component, which orchestrates state changes, user inputs, and calls to the `geminiService` to generate images.

## 🤝 How to Contribute

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
