import LoginForm from "./LoginForm";

export const metadata = { title: "Hyrja administrative — LaboraFood" };

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-alt px-6 py-12">
      <LoginForm />
    </div>
  );
}
