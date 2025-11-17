import LoadingProjectCard from "./LoadingProjectCard";

function LoadingProjects({ numOfProjects = 2 }: { numOfProjects: number }) {
  return Array.from({ length: numOfProjects }, (_, i) => (
    <LoadingProjectCard key={i} />
  ));
}

export default LoadingProjects;
