import { actions, isInputError } from "astro:actions";
import { useState } from "react";
import type { FormEventHandler } from "react";

const ideaDescriptionForm = () => {
  const [ideaDescription, setIdeaDescription] = useState("")
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setErrorMessage("")

    const { data, error } = await actions.generateNames({ description: ideaDescription })
    if (isInputError(error)) {
      const startIdx = error?.message.indexOf("[")
      const parsedResponse = JSON.parse(error?.message.slice(startIdx)!)[0]
      setErrorMessage(parsedResponse?.message)
    }

    if (data?.error) {
      return setErrorMessage(data.message)
    }

    console.log(data?.data)
  };

  return (
    <form method="POST" onSubmit={onSubmit} className="p-3 mx-auto max-w-lg">
      <label className="block font-bold text-lg">
        Idea Description:
        <textarea
          id="idea"
          name="idea"
          value={ideaDescription}
          onChange={(e) => setIdeaDescription(e.target.value)}
          className="px-1 w-full h-40 block border border-slate-200"
        ></textarea>
      </label>
      <p hidden={errorMessage === ""} className="text-sm text-red-500">{errorMessage !== "" ? errorMessage : null}</p>

      <button
        type="submit"
        className="my-8 max-w-[220px] w-full px-3 py-3 bg-black text-slate-50 rounded-lg"
      >
        Generate Ideas
      </button>
    </form>
  );
};

export default ideaDescriptionForm;
