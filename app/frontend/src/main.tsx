import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { ApiError, OpenAPI } from "./client"
import { ThemeProvider } from "./components/theme-provider"
import { LanguageProvider } from "./hooks/useLanguage"
import { Toaster } from "./components/ui/sonner"
import "./index.css"
import { routeTree } from "./routeTree.gen"

OpenAPI.BASE = import.meta.env.VITE_API_URL
OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || ""
}

const handleApiError = (error: Error) => {
  if (error instanceof ApiError) {
    const basePath = import.meta.env.BASE_URL || "/"
    const loginPath = `${basePath}login`.replace("//", "/")
    if (error.status === 401 && !error.url.includes("/login/access-token") && !window.location.pathname.includes("/login")) {
      localStorage.removeItem("access_token")
      window.location.href = loginPath
    }
  }
}
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleApiError,
  }),
  mutationCache: new MutationCache({
    onError: handleApiError,
  }),
})

// GitHub Pages uchun basepath
const basePath = import.meta.env.BASE_URL || "/"

const router = createRouter({ 
  routeTree,
  basepath: basePath,
})
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

// MSW Mock API - faqat development/testing uchun
async function enableMocking() {
  // GitHub Pages yoki VITE_ENABLE_MOCK=true bo'lganda mock yoqiladi
  const isGitHubPages = window.location.hostname.includes("github.io")
  const isMockEnabled = import.meta.env.VITE_ENABLE_MOCK === "true"
  
  if (!isGitHubPages && !isMockEnabled) {
    return
  }

  console.log("🔶 Mock API enabled")
  const { worker } = await import("./mocks/browser")
  return worker.start({
    onUnhandledRequest: "bypass", // Mock bo'lmagan so'rovlarni o'tkazib yuborish
  })
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster richColors closeButton />
          </QueryClientProvider>
        </LanguageProvider>
      </ThemeProvider>
    </StrictMode>,
  )
})
