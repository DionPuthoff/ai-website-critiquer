import CritiqueForm from '@/components/critique-form';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(18,68,58,0.35),transparent_35%),radial-gradient(circle_at_center,rgba(10,22,40,0.45),transparent_55%)]">
        <CritiqueForm />
      </div>
    </main>
  );
}