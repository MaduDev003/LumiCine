export function renderItemsPerPage(
  screenWidth: number,
  type: "home" | "session" | "lumibar"
) {
  switch (type) {
    case "lumibar":
      switch (true) {
        case screenWidth < 580:
          return 1;
        case screenWidth < 768:
          return 2;
        case screenWidth < 1024:
          return 3;
        default:
          return 3;
      }

    case "home":
      switch (true) {
        case screenWidth < 580:
          return 1;
        case screenWidth < 768:
          return 3;
        case screenWidth < 1024:
          return 4;
        default:
          return 6;
      }

    case "session":
      switch (true) {
        case screenWidth < 500:
          return 1;
        case screenWidth < 650:
          return 2;
        case screenWidth < 1024:
          return 3;
        default:
          return 3;
      }
  }
}