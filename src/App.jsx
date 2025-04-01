import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";  
import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Home Layout
import HomeLayout from "./pages/HomeLayout";

// Import User Dashboard Components
import UserDashboard from "./pages/user/Dashboard";
import UserDashboardOverview from "./pages/user/DashboardOverview";
import LecturesAndMaterials from "./pages/user/LecturesAndMaterials";
import QuizzesAndAssessments from "./pages/user/QuizzesAndAssessments";
import QuizApp from "./pages/user/MakeQuizz";
import Certifications from "./pages/user/Certifications";
import DiscussionForum from "./pages/user/DiscussionForum";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LectureDetails from "./components/lectures/LectureDetails";
import LessonView from "./components/lectures/LessonView";

// Mock authentication check function (replace with real implementation)
const isAuthenticated = () => !!localStorage.getItem("token");

// Higher-Order Component to protect routes
const RequireAuth = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// Higher-Order Component to redirect logged-in users from login page
const RedirectIfAuthenticated = ({ children }) => {
    const previousPage = document.referrer || "/"; // Get the previous page or default to "/"
    return isAuthenticated() ? <Navigate to={previousPage} replace /> : children;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />
    },
    {
        path: "/login",
        element: (
            <RedirectIfAuthenticated>
                <LoginPage />
            </RedirectIfAuthenticated>
        )
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/user",
        element: (
            <RequireAuth>
                <UserDashboard />
            </RequireAuth>
        ),
        children: [
            {
                index: true,
                element: <UserDashboardOverview />,
            },
            {
                path: "lectures",
                element: <LecturesAndMaterials />,
            },
            {
                path: "lecture/:id",
                element: <LectureDetails />
            },
            {
                path: "learn/:course_id/lesson/:lesson_id",
                element: <LessonView />
            },
            {
                path: "quizzes",
                element: <QuizzesAndAssessments />,
            },
            {
                path: "quiz/:courseId/:quizId/take",
                element: <QuizApp />,
            },
            {
                path: "certifications",
                element: <Certifications />,
            },
            {
                path: "forum",
                element: <DiscussionForum />,
            }
        ],
    }
]);

function App() {
    return (
        <ThemeProvider>
            <RouterProvider router={router} />
            <ToastContainer position="top-right" autoClose={3000} />
        </ThemeProvider>
    );
}

export default App;
