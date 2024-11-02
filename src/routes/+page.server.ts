import type { Actions } from "./$types";
import { createClient } from "@supabase/supabase-js";
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { fail, redirect } from "@sveltejs/kit";

interface ReturnObject {
  success: boolean;
  errors: string[];
}

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const returnObject: ReturnObject = {
      success: true,
      errors: [],
    };

    if (password !== confirmPassword && confirmPassword !== null) {
      returnObject.errors.push("Passwords do not match");
    }
    if (returnObject.errors.length > 0) {
      returnObject.success = false;
      return returnObject;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (confirmPassword == null) {
      console.log("confirmPassword is null");
      supabase.auth.signInWithPassword({ email, password });
    }

    //Handle errors
    if (error || !data.user) {
      console.log("there has been an error.", error);
      returnObject.success = false;
      return fail(400, returnObject as any);
    }

    redirect(303, "/wills");

    return returnObject;
  },
};
