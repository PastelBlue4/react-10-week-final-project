import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useMutation from "../../libs/client/useMutation";
import useUser from "../../libs/client/useUser";

export default function createTweets() {
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [createTweet, { loading, data }] = useMutation("/api/tweets");
  const createTweetSubmit = (data: any) => {
    if (loading) return;
    createTweet(data);
  };
  useEffect(() => {
    if (data?.ok) {
      router.push(`/`);
    }
  }, [data, router]);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center w-2/3 h-12 mt-10">
        <button
          onClick={() => {
            router.back();
          }}
          className=""
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        작성 취소
      </div>
      <form
        onSubmit={handleSubmit(createTweetSubmit)}
        className="w-2/3 p-4 space-y-2 py-11"
      >
        <div>
          <textarea
            {...register("contents", {
              required: true,
            })}
            id="tweet"
            className="w-full h-64 p-5 mt-1 border-2 border-blue-100 rounded-md shadow-sm outline-none resize-none focus:border-blue-300 "
            required
            placeholder="무슨일이 일어나고 있수꽝?"
          ></textarea>
        </div>
        <button className="w-full p-2 bg-blue-200 rounded-lg text-gray-50 hover:bg-blue-300 ">
          완료!
        </button>
      </form>
    </div>
  );
}
