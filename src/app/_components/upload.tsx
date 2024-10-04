"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function Upload() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const [file, setFile] = useState<FileList>();
  const createPost = api.post.uploadFile.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      console.log("Success");
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={async (_event) => {
          _event.preventDefault();
          const form = new FormData();
          form.set("name", name); // Use the name from state instead of a hardcoded value
          form.set("image", file![0]!, file![0]!.name);

          console.log(form);

          await createPost.mutateAsync(form);
        }}
        className="flex flex-col gap-2"
        encType="multipart/form-data"
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files!)}
          className="w-full rounded-full px-4 py-2 text-black"
        />

        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
