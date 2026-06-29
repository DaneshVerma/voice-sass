import { SignUp } from "@clerk/nextjs";

export default function SignUpage() {
  return (
    <div className='flex  min-h-screen items-center justify-center bg-background'>
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg",
          },
        }}
      />
    </div>
  );
}
