// import { AnchorIdl, rootNodeFromAnchorWithoutDefaultVisitor } from "@codama/nodes-from-anchor";
// import { renderJavaScriptUmiVisitor, renderJavaScriptVisitor, renderRustVisitor } from "@codama/renderers";
// import { visit } from "@codama/visitors-core";
// import anchorIdl from "./target/idl/blueshift_anchor_escrow.json"; // Note: if you initiated your project with a different name, you may need to change this path

// async function generateClients() {
//     const node = rootNodeFromAnchorWithoutDefaultVisitor(anchorIdl as AnchorIdl);

//     const clients = [
//         { type: "JS", dir: "clients/generated/js/src", renderVisitor: renderJavaScriptVisitor },
//         { type: "Umi", dir: "clients/generated/umi/src", renderVisitor: renderJavaScriptUmiVisitor },
//         { type: "Rust", dir: "clients/generated/rust/src", renderVisitor: renderRustVisitor }
//     ];

//     for (const client of clients) {
//         try {
//             await visit(
//                 node,
//                 await client.renderVisitor(client.dir)
//             ); console.log(`✅ Successfully generated ${client.type} client for directory: ${client.dir}!`);
//         } catch (e) {
//             console.error(`Error in ${client.renderVisitor.name}:`, e);
//             throw e;
//         }
//     }
// }

// generateClients();

// Based on https://solana.stackexchange.com/questions/16703/can-anchor-client-be-used-with-solana-web3-js-2-0rc
import { createFromRoot } from "codama";
import { rootNodeFromAnchor } from "@codama/nodes-from-anchor";
import { renderJavaScriptVisitor } from "@codama/renderers";
import path from "path";
import { promises as fs } from "fs";

// Find the Anchor IDL file and return the JSON object
const loadAnchorIDL = async () => {
  const basePath = path.join("target", "idl");
  const dirPath = path.join(basePath);

  try {
    // Read the directory contents
    const files = await fs.readdir(dirPath);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    if (!jsonFiles.length) {
      throw new Error(`No JSON files found in ${dirPath}`);
    }

    if (jsonFiles.length > 1) {
      throw new Error(
        `Multiple JSON files found in ${dirPath}. Please specify which one to use.`
      );
    }

    const filePath = path.join(dirPath, jsonFiles[0]);
    return JSON.parse(await fs.readFile(filePath, "utf-8"));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      throw new Error(`Failed to load IDL: ${dirPath} does not exist`);
    }
    throw error;
  }
};

// Instantiate Codama
const idl = await loadAnchorIDL();

const codama = createFromRoot(rootNodeFromAnchor(idl));

// Render JavaScript.
const generatedPath = path.join("dist", "js-client");
codama.accept(renderJavaScriptVisitor(generatedPath));