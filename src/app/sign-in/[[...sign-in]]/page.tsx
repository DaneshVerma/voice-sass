import { SignIn } from "@clerk/nextjs";

export default function SingInPage() {
  return (
    <div className='flex  min-h-screen items-center justify-center bg-background'>
      <SignIn
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
