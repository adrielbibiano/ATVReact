// components/Dado.tsx
import Image from 'next/image';

interface DadoProps {
  valor: number;
}

export default function Dado({ valor }: DadoProps) {
  return (
    <div className="w-24 h-24 relative bg-white border-2 border-gray-300 rounded-xl shadow-md flex items-center justify-center">
      {valor > 0 ? (
        <Image 
          src={`/dados/${valor}.png`} 
          alt={`Dado valor ${valor}`} 
          width={80} 
          height={80}
          className="object-contain"
        />
      ) : (
        <div className="text-gray-300 text-4xl">?</div>
      )}
    </div>
  );
}