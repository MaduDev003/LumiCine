export function renderAgeClassificationColor(age_rating: string) {
    switch (age_rating) {
      case "L":
        return "bg-green-400 group-hover:bg-green-400/70";

      case "10":
        return "bg-blue-400/70 group-hover:bg-blue-400";

      case "12":
        return "bg-yellow-400/70 group-hover:bg-yellow-400";

      case "14":
        return "bg-orange-400/70 group-hover:bg-orange-400";

      case "16":
        return "bg-red-400/70 group-hover:bg-red-400";

      case "18":
        return "bg-black text-white group-hover:bg-black/70";

      default:
        return "bg-gray-500 group-hover:bg-gray-500/70 text-font-dark text-[15px] pt-1";
    }
  }