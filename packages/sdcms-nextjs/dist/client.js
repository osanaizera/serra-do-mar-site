"use client";
// @sdcms/nextjs/client - Client hooks (SWR)
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client-entry.ts
var client_entry_exports = {};
__export(client_entry_exports, {
  useBlogPosts: () => useBlogPosts,
  useSDCMSMetadata: () => useSDCMSMetadata
});
module.exports = __toCommonJS(client_entry_exports);

// src/hooks/useSDCMSMetadata.ts
var import_swr = __toESM(require("swr"));
function useSDCMSMetadata(apiUrl, clientSlug, options) {
  const {
    autoRefetch = true,
    refetchInterval = 36e5
    // 1 hour
  } = options || {};
  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`);
    }
    return response.json();
  };
  const { data, error, isLoading, mutate } = (0, import_swr.default)(
    `${apiUrl}/api/public/seo-metadata?slug=${clientSlug}`,
    fetcher,
    {
      refreshInterval: autoRefetch ? refetchInterval : 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 1e4
    }
  );
  return {
    metadata: data,
    error,
    isLoading,
    refetch: mutate
  };
}

// src/hooks/useBlogPosts.ts
var import_react = require("react");
function useBlogPosts(apiUrl, clientSlug, options) {
  const { metadata, error, isLoading } = useSDCMSMetadata(apiUrl, clientSlug);
  const limit = options?.limit ?? 10;
  const offset = options?.offset ?? 0;
  const type = options?.type;
  const lang = options?.lang;
  const tagsKey = options?.tags?.join(",") ?? "";
  const posts = (0, import_react.useMemo)(() => {
    if (!metadata?.posts) return [];
    let filtered = [...metadata.posts];
    if (tagsKey) {
      const tags = tagsKey.split(",");
      filtered = filtered.filter(
        (post) => tags.some((tag) => post.tags.includes(tag))
      );
    }
    if (type) {
      filtered = filtered.filter((post) => post.type === type);
    }
    if (lang) {
      filtered = filtered.filter((post) => post.lang === lang);
    }
    filtered = filtered.slice(offset, offset + limit);
    return filtered;
  }, [metadata, limit, offset, type, lang, tagsKey]);
  return {
    posts,
    total: metadata?.posts.length || 0,
    error,
    isLoading
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useBlogPosts,
  useSDCMSMetadata
});
//# sourceMappingURL=client.js.map