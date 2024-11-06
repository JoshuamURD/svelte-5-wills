import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { getContext, setContext } from "svelte";

interface UserStateProps {
  session: Session | null;
  supabase: SupabaseClient | null;
  user: User | null;
}

export class UserState {
  session = $state<Session | null>(null);
  supabase = $state<SupabaseClient | null>(null);
  user = $state<User | null>(null);
  constructor(data: UserStateProps) {
    this.updateState(data);
  }

  updateState(data: UserStateProps) {
    this.session = data.session;
    this.supabase = data.supabase;
    this.user = data.user;
  }

  async logout() {
    console.log("Logout called, supabase instance:", this.supabase);
    if (!this.supabase) {
      console.error("No Supabase instance available");
      return;
    }

    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) {
        console.error("Error during signOut:", error);
      }
    } catch (e) {
      console.error("Exception during signOut:", e);
    }
  }
}
const USER_STATE_KEY = Symbol("USER_STATE");

export function setUserState(data: UserStateProps) {
  return setContext(USER_STATE_KEY, new UserState(data));
}

export function getUserState() {
  return getContext<ReturnType<typeof setUserState>>(USER_STATE_KEY);
}
