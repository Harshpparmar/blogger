import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthProvider"
import Layout from "./components/Layout"
import ProtectedRoute from "./utils/ProtectedRoute"
import BlogPage from "./pages/BlogPage"
import BlogDetail from "./pages/BlogDetail"
import LoginPage from "./pages/LoginPage"
import AdminPage from "./pages/AdminPage"
import PostEditor from "./pages/PostEditor"
import { ThemeProvider } from "./contexts/ThemeProvider"

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<BlogPage />} />
              <Route path="/posts/:slug" element={<BlogDetail />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/posts/new"
                element={
                  <ProtectedRoute>
                    <PostEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/posts/edit/:slug"
                element={
                  <ProtectedRoute>
                    <PostEditor />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App