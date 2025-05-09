"use client";
import { subscribeAction } from "@/data/actions";
import type { SubscribeProps } from "@/types";
import { useActionState } from "react";

const INITIAL_STATE = {
  zodErrors: undefined as Record<string, string[]> | undefined,
  strapiErrors: undefined as Record<string, string> | undefined,
  errorMessage: undefined as string | undefined,
  successMessage: undefined as string | undefined,
};

export function Subscribe({
  headline,
  content,
  placeholder,
  buttonText,
}: Readonly<SubscribeProps>) {

  const [formState, formAction] = useActionState(subscribeAction, INITIAL_STATE);
  const zodErrors = formState.zodErrors?.email[0];
  const strapiErrors = formState.strapiErrors?.message;
  console.log(strapiErrors, "Strapi errors");
  const errorMessage = strapiErrors || zodErrors || formState.errorMessage;
  const successMessage = formState?.successMessage;


  console.log(formState, "Form state");

  return (
    <section className="newsletter container">
      <div className="newsletter__info">
        <h4>{headline}</h4>
        <p className="copy">{content}</p>
      </div>
      <form className="newsletter__form" action={formAction}>
        <input
          name="email"
          type="text"
          placeholder={errorMessage || successMessage || placeholder}
          className={`newsletter__email ${errorMessage ? "newsletter__email--error" : "" }`}
        />
        <button
          type="submit"
          className="newsletter__subscribe btn btn--turquoise btn--medium"
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
}