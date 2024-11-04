import { fail, redirect } from "@sveltejs/kit";

interface ReturnObject {
  success: boolean;
  errors: string[];
  email: string;
  password: string;
  confirmPassword?: never;
}

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    // handling the form data
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const returnObject: ReturnObject = {
      success: true,
      errors: [],
      email: email,
      password: password,
    };

    //validation
    if (!email || !password) {
      returnObject.success = false;
      returnObject.errors.push("Email and password are required");
      return returnObject;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      returnObject.success = false;
      returnObject.errors.push("Incorrect email or password");
      return fail(400, returnObject as any);
    }
    redirect(303, "/wills");
  },
};
