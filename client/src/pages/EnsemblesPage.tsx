import React from "react";
import EnsembleCard from "@/components/EnsembleCards";

const ensembles = [
  {
    name: "String Quartet",
    description:
      "A group of four string players: two violins, a viola, and a cello.",
  },
  {
    name: "Jazz Trio",
    description:
      "A group featuring a pianist, bassist, and drummer playing jazz standards.",
  },
  {
    name: "Brass Band",
    description:
      "A large group of brass instrument players and percussionists.",
  },
  {
    name: "Brass Band",
    description:
      "A large group of brass instrument players and percussionists.",
  },
  {
    name: "Brass Band",
    description:
      "A large group of brass instrument players and percussionists.",
  },
  {
    name: "Brass Band",
    description:
      "A large group of brass instrument players and percussionists.",
  },
];

const EnsemblePage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10">
        {ensembles.map((ensemble, index) => (
          <EnsembleCard
            key={index}
            name={ensemble.name}
            description={ensemble.description}
          />
        ))}
      </div>
    </main>
  );
};

export default EnsemblePage;
