import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <h1
        className='flex items-center
      gap-4'
      >
        Welcome to Roons
      </h1>
      <OrganizationSwitcher />
      <UserButton />
    </div>
  );
}
