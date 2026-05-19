import NewSampleForm from "./NewSampleForm";

export default function NewSamplePage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <h1 className="text-3xl font-serif">Mostër e re</h1>
        <p className="text-sm text-ink-soft mt-1">
          Pas ruajtjes, sistemi gjeneron automatikisht kodin e gjurmimit (LF-VVVV-NNNN).
        </p>
      </header>
      <NewSampleForm />
    </div>
  );
}
