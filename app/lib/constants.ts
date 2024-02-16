import { LLMID } from "@/app/lib/types"

// This flag is used for handling logic, NOT enabling/disabling email verification
export const EMAIL_VERIFICATION = false

export const SIDEBAR_WIDTH = 260
export const SIDEBAR_ICON_SIZE = 28

export const Routes = {
  Home: "/",
  Login: "/login",
  SignUp: "/signup",
  Setup: "/setup",
  Chat: "/chat",
  Images: "/images",
  Collections: "/collections",
  Toolbox: "/toolbox",
  Games: "/games",
  Explore: "/explore",
  Settings: "/settings",
  Profile: "/profile",
  Support: "/support",
  NotFound: "/404"
}

export const GUEST_LLM_LIST: LLMID[] = ["gpt-3.5-turbo"]
