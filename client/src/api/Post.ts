import { useEffect, useState } from "react";
import z from "zod";
import { validateRespose } from "./validateResponse";

export const PostSchema = z.object({
  id: z.string(),
  text: z.string(),
  authorId: z.string(),
  createdAt: z.number(),
});

export type Post = z.infer<typeof PostSchema>;

export const PostList = z.array(PostSchema);

export type PostList = z.infer<typeof PostList>;

export const FetchPostListSchema = z.object({
  list: PostList,
});

type FetchPostListResponse = z.infer<typeof FetchPostListSchema>;

export function fetchPostList(): Promise<FetchPostListResponse> {
  return fetch("/api/posts")
    .then((response) => response.json())
    .then((data) => FetchPostListSchema.parse(data));
}

interface IdleReqvestState {
  status: "Idle";
}

interface LoadingReqvestState {
  status: "pending";
}

interface SuccessReqvestState {
  status: "success";
  data: PostList;
}

interface ErrorReqvestState {
  status: "error";
  error: unknown;
}

type RequestState =
  | IdleReqvestState
  | LoadingReqvestState
  | SuccessReqvestState
  | ErrorReqvestState;

export function usePostList() {
  const [state, setState] = useState<RequestState>({ status: "Idle" });

  useEffect(() => {
    if (state.status === "pending") {
      fetchPostList()
        .then((data) => {
          setState({ status: "success", data: data.list });
        })
        .catch((error) => {
          setState({ status: "error", error: error.message });
        });
    }
  }, [state]);

  useEffect(() => {
    setState({ status: "pending" });
  }, []);

  const refetch = () => {
    setState({ status: "pending" });
  };

  return {
    state,
    refetch,
  };
}

export function createPost(text: string): Promise<void> {
  return fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, }),
  })
    .then(validateRespose)
    .then(() => undefined);
}

// function isPost(data: unknown): data is Post {
//     return (
//       typeof data === "object" &&
//       data !== null &&
//      "id" in data &&
//       typeof data.id === "string" &&
//       "text" in data &&
//       typeof data.text === "string" &&
//       "authorId" in data &&
//       typeof data.authorId === "string" &&
//       "createdAt" in data &&
//       typeof data.createdAt === "number"
//     );
//   }

// export interface Post {
//     /**
//      * Идентификатор поста.
//      */
//     id: string;
//     text: string;
//     authorId: string;
//     createdAt: number;
//   }

// export type PostList = Post[];
