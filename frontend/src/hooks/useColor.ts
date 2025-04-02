export default function useColor(author_name:string){
    const colors = [
        "bg-violet-300",
        "bg-indigo-300",
        "bg-blue-300",
        "bg-green-300",
        "bg-yellow-300",
        "bg-orange-300",
        "bg-red-300",
        "bg-amber-300",
        "bg-emerald-300",
        "bg-cyan-300",
      ];
      return colors[author_name.charCodeAt(0) % 10];
}