import { LLMID } from "@/types"

export const SIDEBAR_WIDTH = 260

export const Routes = {
  Home: "/",
  Auth: "/auth",
  Login: "/login",
  SignUp: "/signup",
  Setup: "/setup",
  NewChat: "/chat?new",
  Chat: "/chat",
  Images: "/images",
  Collections: "/collections",
  Toolbox: "/toolbox",
  Explore: "/explore",
  Settings: "/settings",
  Profile: "/profile",
  Support: "/support",
  NotFound: "/404"
}

export const GUEST_LLM_LIST: LLMID[] = ["gpt-3.5-turbo-1106"]
