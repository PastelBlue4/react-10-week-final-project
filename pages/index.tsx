import useUser from "../libs/client/useUser";

import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Home() {
  const [getTweet, setGetTweet] = useState();
  const { user, isLoading } = useUser();

  const { data } = useSWR("/api/tweets");
  useEffect(() => {}, [user]);
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-10">
      <div className="flex justify-end w-full">
        <Link href={"/tweets/create"} className="">
          <div className="flex p-2 mt-10 mr-10 cursor-pointer ">
            <span className="mr-2 text-sm">트윗 쓰러가기</span>
          </div>
        </Link>
      </div>

      <div className="w-2/3 py-10 space-y-7">
        {data?.getTweets.length > 0 ? null : (
          <div className="text-lg text-center ">표시할 트윗이가 없어용 ㅠ</div>
        )}
        {data?.getTweets?.map((tweet: any) => {
          return (
            <>
              <Link href={`/tweets/${tweet.id}`} className="">
                <div className="flex flex-col justify-between p-5 bg-blue-100 rounded-lg h-52">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-200 rounded-full"></div>
                    <p className="p-2 font-semibold">{tweet.user.name}</p>
                  </div>

                  <div>
                    <p className="p-2 text-sm">{tweet.contents}</p>
                  </div>

                  <div className="flex items-end justify-end space-x-2 ">
                    <div className="flex items-center space-x-1 text-gray-900 ">
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                      </svg>
                      <span>{tweet._count.Like}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
}
