/**
 * MTKruto Server
 * Copyright (C) 2024 Roj <https://roj.im/>
 *
 * This file is part of MTKruto Server.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import * as path from "std/path/mod.ts";
import { promptSecret } from "std/cli/prompt_secret.ts";

import { Client, DC } from "mtkruto/mod.ts";
import { StorageDenoKV } from "mtkruto/storage/1_storage_deno_kv.ts";

import { ClientManager } from "./client_manager.ts";

export async function addUser(apiId: number, apiHash: string): Promise<never> {
  const id = "user" + crypto.randomUUID();
  ClientManager.createKvPath();
  const storage = new StorageDenoKV(path.join(ClientManager.KV_PATH, id));

  // yep thats crap but why not
  const promptDc = prompt("DC [1, 2, 3, 4, 5, 1-test, 2-test, 3-test] (default 2):")?.trim();
  let initialDc: DC = "2";

  if (promptDc && (["1", "2", "3", "4", "5", "1-test", "2-test", "3-test"].includes(promptDc))) {
    console.log("Using DC:", promptDc);
    initialDc = promptDc as DC;
  } else {
    console.log("Invalid DC, using 2");
  }

  const client = new Client({ storage, apiId, apiHash, initialDc });

  await client.start({
    phone: () => prompt("Phone number:")!,
    code: () => prompt("Code:")!,
    password: () => promptSecret("Password:")!,
  });

  console.log("Endpoint path:", "/" + id);
  await client.disconnect();
  Deno.exit();
}
