import { envSchema } from "@/schema";
import { zodToTs, printNode } from "zod-to-ts";

function genTypeFile() {
  const envSchemaTs = zodToTs(envSchema, "ImportMetaEnv");

  const viteEnvContent = `
/// <reference types="vite/client" />

interface ImportMetaEnv ${printNode(envSchemaTs.node)} 

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
`;

  const path = "./src/vite-env.d.ts";
  Bun.write(path, viteEnvContent);

  console.log("Env Types Added Successfully");
}

export { genTypeFile };
