import { Button } from "@/components/ui/button";
import { UserMinusIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { EventHandler, FormEventHandler, HtmlHTMLAttributes, useEffect, useState } from "react";
import { string } from "zod";

export default function Login() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | string[]>('')
  const [isError, setIsError] = useState(false)

  const email: string | string[] = router?.query!.email!;
  // const ure = email
  useEffect(() => {
    if (!router.isReady) {
      return;  // NOTE: router.query might be empty during initial render
    }
    setUserEmail(email)
    // setUserInfo({ ...userInfo, email: email })
        
  }, [email, router.isReady])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (userEmail !== '') {
      const res = await signIn('credentials', {
        email: userEmail,
        redirect: true

      })
    } else {
      setIsError(true)
    }
  }
  const { next } = router.query as { next?: string };

  return (
    <div className="flex h-screen w-screen justify-center">
      <div
        className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>
      <div className="z-10 mt-[calc(30vh)] h-fit w-full mx-5 sm:mx-0 max-w-md overflow-hidden border border-border bg-gray-50 dark:bg-gray-900 rounded-lg sm:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16">
          <Link href="/">
            <span className="text-xl font-bold tracking-tighter text-foreground">
            PitchReview.ai
            </span>
          </Link>
          <h3 className="text-2xl text-foreground font-medium">
            Start sharing documents
          </h3>
          
          <form onSubmit={handleSubmit} >
            {isError && <div className="text-left text-red-900">Email address cannot be empty!</div>}
            <div className="mb-4">
              <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                E-mail: 
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email" placeholder="example@example.com" defaultValue={userEmail}
                onChange={({target}) => setUserEmail(target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
            
          </form>


        </div>

        <div className="flex flex-col px-4 py-8 sm:px-16">
          <Button
            onClick={() => {
              signIn("google", {
                ...(next && next.length > 0 ? { callbackUrl: next } : {}),
              });
            }}
            className="flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
              fill="currentColor"
              className="h-4 w-4 mr-2"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
            <span>Continue with Google</span>
          </Button>
        </div>
        
      </div>
    </div>
  );
}
