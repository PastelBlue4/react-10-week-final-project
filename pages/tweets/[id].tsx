import useMutation from "../../libs/client/useMutation";
import { classNameHandler } from "../../libs/client/utils";

import { useRouter } from "next/router";
import useSWR from "swr";

export default function Detail() {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  const { data, mutate } = useSWR(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  const [toggleLike] = useMutation(`/api/tweets/${router.query.id}/like`);
  const onLikeClick = () => {
    if (!data) return;
    mutate((prev: any) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    toggleLike({});
  };
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex w-full mt-10 ">
        <h2 className="flex items-center justify-center w-full gap-2 mx-auto text-xl font-extrabol">
          <button onClick={onClick} className="p-2 ">
            <svg
              className="w-5 h-5"
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
          {data?.tweet.id}번째 트윗이에용
        </h2>
      </div>

      <div className="w-2/3 mt-10">
        <div className="flex flex-col justify-between p-5 bg-blue-100 rounded-lg h-52">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-200 rounded-full"></div>
            <p className="p-2 font-semibold">{data?.tweet.user.name}</p>
          </div>

          <div>
            <p className="p-2 text-sm">{data?.tweet.contents}</p>
          </div>

          <div className="flex items-center justify-end py-1 space-x-2">
            <button
              onClick={onLikeClick}
              className={classNameHandler(
                "p-3 rounded-md flex items-center hover:bg-blue-200 justify-center",
                data?.isLiked
                  ? "text-yellow-400  hover:text-yellow-500"
                  : "text-gray-400 hover:bg-blue-200 hover:text-gray-500"
              )}
            >
              {data?.isLiked ? (
                <svg
                  className="w-6 h-6 "
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
