"use server";

import { z } from "zod";
import { subscribeService } from "@/data/services";

const subscribeSchema = z.object({ 
  email: z.string().email("Please enter a valid email address")
});

type SubscribeState = {
  zodErrors?: Record<string, string[]>;
  strapiErrors?: Record<string, string>;
  errorMessage?: string;
  successMessage?: string;
};

export async function subscribeAction(
  prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  console.log("Our first server action");

  const email = formData.get("email");
  const validateFields = subscribeSchema.safeParse({ email });

  if (!validateFields.success) {
    console.dir(validateFields.error.flatten().fieldErrors, { depth: null });

    return {
      ...prevState,
      zodErrors: validateFields.error.flatten().fieldErrors,
      strapiErrors: undefined,
    };
  }
console.log('---------------------------------------')
  const response = await subscribeService(validateFields.data.email);

  if(!response) {
    return {
      ...prevState,
      zodErrors: undefined,
      strapiErrors: undefined,
      errorMessage: "Something went wrong, please try again later.",
    };
  }

  if(response.error) {
    return {
      ...prevState,
      zodErrors: undefined,
      strapiErrors: response.error,
      errorMessage: undefined,
    };
  }

  return {
    ...prevState,
    zodErrors: undefined,
    strapiErrors: undefined,
    errorMessage: undefined,
    successMessage: "You have successfully subscribed to our newsletter.",
  }

}
