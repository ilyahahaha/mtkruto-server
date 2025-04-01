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

import { parseArgs } from "std/cli/mod.ts";

interface CliArgs {
  addUser: boolean;
}

/**
 * Parses CLI arguments. Returns a string describing the error if failed or {@link CliArgs} if succeeded.
 */
export function parseCliArgs(argsList: string[]): string | CliArgs {
  const args = parseArgs(argsList);
  const addUser = args["add-user"] ?? false;
  if (typeof addUser !== "boolean") {
    return "Invalid value for --add-user.";
  }
  for (const arg of Object.keys(args)) {
    if (
      !["_", "api-id", "api-hash", "workers", "stats", "port", "add-user"]
        .includes(arg)
    ) {
      return `Invalid argument: ${arg}`;
    }
  }
  if (args._.length) {
    return `Invalid argument: ${args._[0]}`;
  }
  return {
    addUser,
  };
}
