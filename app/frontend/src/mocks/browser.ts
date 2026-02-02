/**
 * MSW Browser Setup
 * Development/testing uchun mock API
 */
import { setupWorker } from "msw/browser"
import { handlers } from "./handlers"

export const worker = setupWorker(...handlers)
