import { z } from "zod";
import { zfd } from "zod-form-data";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { writeFileToDisk } from "~/server/utils/writeFileToDisk";

const uploadFileSchema = zfd.formData({
  name: zfd.text(),
  image: zfd.file(z.instanceof(File)),
});

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  uploadFile: publicProcedure.input(uploadFileSchema).mutation(async (opts) => {
    return {
      image: await writeFileToDisk(opts.input.image),
    };
  }),
});
